const WPAPI = require('wpapi');
const wp = new WPAPI({ endpoint: process.env.API_ENDPOINT });
wp.custom_tags = wp.registerRoute( 'acf/v3', '/tags');
wp.custom_tag = wp.registerRoute( 'acf/v3', '/tags/(?P<id>)');

const student_page_limit = 100

let collected_posts_cache = {
  age: 0,
  posts: []
}

const collect_all_tags = async (description_like = false) => {
  
  let all_tags = []
  let done = false
  let page = 1

  
  while(!done) {
    
    const tags = await wp.tags().perPage(100).page(page).get()
    all_tags = all_tags.concat(tags)
    
    if(tags.length === 100) {
      page++  
    } else {
      done = true  
    }
  }
  
  
  return (description_like != false) 
    ? all_tags.filter(tag=>tag.description.includes(description_like)) 
    : all_tags
}

const collect_all_posts = async (tag = false) => {


  //if cache is less than 10 minutes old, return cache
  const currentTime = new Date().getTime()
  if(!tag) {
    if(currentTime - collected_posts_cache.age < 600000 ) {
      console.log("collected posts are fresh, returning cache")
      return collected_posts_cache.posts
    } else {
      console.log("post cache is out of date, refreshing")
    }
  } else {
    console.log("cache disabled because tag-specific cache not enabled yet...")
  }

  let all_posts = []
  let done = false
  let page = 1
  while(!done) {
    
    const posts = tag !== false
      ? await wp.posts().tags(tag.id).perPage(100).page(page).get()
      : await wp.posts().perPage(100).page(page).get()
    all_posts = all_posts.concat(posts)
    
    if(posts.length === 100) {
      page++  
    } else {
      done = true  
    }
  }

  if(!tag) {
    //TODO: create a tag-specific cache
    collected_posts_cache.age = currentTime
    collected_posts_cache.posts = all_posts
  }
  return all_posts
}

const generate_limited_random = (limit, total) => {
  const results = new Set()
  while (results.size < total) {
    results.add(Math.floor(Math.random()*limit))
  }
  return Array.from(results);
}


const filterCategory = (category)=> {
  
  const to_delete = [
    'count', 
    // 'taxonomy',
    'link',
    'parent',
    'meta',
    'acf',
    '_links'
  ]
  
  to_delete.forEach((deletion)=>{
    delete category[deletion]
  })
  
  if((category.description === 'category') || (category.description === 'students')) {
    category.url = `https://eoys-vue-client-router.glitch.me/category/${category.slug}`
    category.path = `/category/${category.slug}`
  } else if(category.description === 'tags') {
    category.url = `https://eoys-vue-client-router.glitch.me/tags/${category.slug}`
    category.path = `/tags/${category.slug}`
  }
  
  return category
}

const filterTag = async (tag) => {
    
  // console.log(tag)
  const to_delete = [
    'count', 
    'taxonomy',
    'meta',
    'link',
    '_links'
  ]
  
  to_delete.forEach((deletion)=>{
    
    try{
      delete tag[deletion]
    } catch(e) {
      console.log("could not delete:", deletion)
    }
  })
  
  return tag
}

const filterPost = async (post)=>{
  const to_delete = [
    'date', 
    'guid',
    'date_gmt',
    'modified',
    'modified_gmt',
    'status',
    'type',
    'content',
    'excerpt',
    'author',
    'featured_media',
    'comment_status',
    'ping_status',
    'sticky',
    'template',
    'format',
    'meta',
    // 'slug',
    'link',
    'tags',
    '_links'
  ]
  
  const tag_delete = [
    'term_id',
    'term_group',
    'term_taxonomy_id',
    'taxonomy', 
    'parent',
    'count', 
    'filter',
    'description'
  ]
  
  const max_images = 20 
  
  //delete stuff that shouldn't exist
  to_delete.forEach((deletion)=>{
    delete post[deletion]
  })
  
  //promote tags out of acf
  try{
    post.tags = post.acf.taxonomy.tags.tags
  } catch(e) {
    console.log("Why doesn't post.acf contain taxonomy?", e)
  }
  //construct a better image representation
  
  post.images = []
  try {
    for(let i = 1; i<=max_images; i++) {
      if(`image_${i}` in post.acf) {
        post.images.push(post.acf[`image_${i}`])
      }
    }
  } catch(e) {
    console.log("Legacy image workflow should probably be deleted in favor of Media")
  }
  
  try {
    for (let item of Object.keys(post.acf)) {
      post[item] = post.acf[item]
    }
  } catch(e){
    console.log("Ok, so now there's no ACF???")
  } 
  
  //promote the url
  try {
    post.url = post.acf.meta.optional.url || null
  } catch (e) {
    console.log("No url")
  }
  try {
    post.title = post.title.rendered
  } catch(e) {
    console.log("How can there be no title?!?")
  }
  try {
    post.instructor = post.acf.taxonomy.author.instructor
  } catch(e) {
    console.log("No instructor data...")
  }
  post.link = `/work/${post.slug}`
  
  

  //delete acf info
  delete post.acf

  //promote various things
  try {
    post.artists = post.taxonomy.author.artist.map((artist)=>{
      artist.name_formatted = artist.name.split(', ').reverse().join(' ')
      artist.link = `/student/${artist.slug}`
      return artist
    })
  } catch(e) {
    console.log("No valid artist taxonomy")
  }

  try {
    post.categories = post.taxonomy.tags.category
  } catch(e) {
    console.log("No category, or taxonomy")
  }
  
  try {
    delete post.taxonomy.author
    delete post.taxonomy.tags.tags
    delete post.taxonomy
  } catch(e) {
    console.log("Tried to delete something that wasn't there")
  }
  
  
  
  
//   let tag_indexes_to_delete = []
//   post.tags.forEach((tag, i)=>{
//     if(tag.description === 'student') {
//       post.artists.push(tag.name)
//       tag_indexes_to_delete.push(i)
//     }

//     tag_delete.forEach((deletion)=>{
//       delete tag[deletion]
//     })

//   })

//   tag_indexes_to_delete.forEach((i)=>{
//     delete post.tags[i]
//   })

//   post.tags = post.tags.filter((tag)=>{
//     if(tag !== null) return true
//   })
  
//   post.categories = await Promise.all(post.categories.map(await getCategoryById))

  return post
  
}



const getCategoryById = async (id) => {
    const category = await wp.categories().id(id).get()
    return filterCategory(category)
}

const getCategoryByName = async (name) => {
  const categories = await wp.categories().get()
  const category = categories.filter((category)=>{
    if(category.name === name) return true
  }).pop()
  return filterCategory(category) 
}

const getAllCategories = async () => {
  const categories = await wp.categories().get()
  return categories.map((category)=>{
    return filterCategory(category)
  }).filter((category)=>{
    return (category.slug != 'uncategorized')
  })
}

const getAllTags = async() => {
  const tags = await collect_all_tags()
  return tags.map((tag)=>{
    return filterCategory(tag)
  })
}

const getAllTagsRaw = async() => {
  return await collect_all_tags()
}

const getTagByName = async(name) => {
  const tag = await wp.tags().search(name).perPage(1).get()
  console.log("getTagByName", tag)
  return filterTag(tag.pop())
}

module.exports = {
  collect_all_tags,
  collect_all_posts,
  generate_limited_random,
  filterCategory,
  filterTag,
  filterPost,
  getCategoryById,
  
}