const util = require('util');
const cache = require('./postCache')
const WPAPI = require('wpapi');
const wp = new WPAPI({ 
  endpoint: process.env.API_ENDPOINT,
  username: process.env.API_USER,
  password: process.env.API_PASSWORD,
  auth: true
});
wp.custom_tags = wp.registerRoute( 'acf/v3', '/tags');
wp.custom_tag = wp.registerRoute( 'acf/v3', '/tags/(?P<id>)');

const student_page_limit = 100

let collected_posts_cache = {
  age: 0,
  posts: []
}

// class PostsCache {
  
//   constructor(expiry = 600000) {
//     this.age = 0
//     this.expiry = expiry
//     this.postCache = []
//   }
  
//   reset(){
//     this.age = 0
//     this.postCache = []
//   }
  
//   get isFresh(){
//     const currentTime = new Date().getTime()
//     return currentTime - this.age < this.expiry
//   }
  
//   get isExpired(){
//     return !this.isFresh()
//   }
  
//   get posts(){
//     return this.postCache
//   }
  
//   set posts(posts) {
//     this.postCache = posts
//     this.timestamp()
//   }
  
//   timestamp(){
//     const currentTime = new Date().getTime()
//     this.age = currentTime
//   }
  
// }

// const cache = new PostsCache()

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

  // if(!tag) {
    //TODO: create a tag-specific cache
    collected_posts_cache.age = currentTime
    collected_posts_cache.posts = all_posts
  // }
  return all_posts
}

const collect_all_draft_posts = async () => {


  //if cache is less than 10 minutes old, return cache
  if(cache.isFresh) {
    console.log("CLASS collected posts are fresh, returning cache")
    return cache.posts
  } else {
    console.log("CLASS post cache is out of date, refreshing")
  }


  let all_posts = []
  let done = false
  let page = 1
  while(!done) {
    
    const posts = await wp.posts().status(['draft']).perPage(100).page(page).get()
    
    const hydratedPosts = await Promise.all(posts.map(hydratePostByType))
    
    all_posts = all_posts.concat(hydratedPosts)
    
    if(posts.length === 100) {
      page++  
    } else {
      done = true  
    }
  }

  cache.posts = all_posts
  return cache.posts
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
    'link',
    'tags',
    '_links',
    // 'new ones for. 2021'
    'images',
    'slug'
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
  // try{
  //   post.tags = post.acf.taxonomy.tags.tags
  // } catch(e) {
  //   console.log("Why doesn't post.acf contain taxonomy?", e)
  // }
  //construct a better image representation
  
  // post.images = []
  // try {
  //   for(let i = 1; i<=max_images; i++) {
  //     if(`image_${i}` in post.acf) {
  //       post.images.push(post.acf[`image_${i}`])
  //     }
  //   }
  // } catch(e) {
  //   console.log("Legacy image workflow should probably be deleted in favor of Media")
  // }
  
  try {
    for (let item of Object.keys(post.acf)) {
      post[item] = post.acf[item]
    }
  } catch(e){
    console.log("Ok, so now there's no ACF???")
  } 
  
  //promote the url
  // try {
  //   post.url = post.acf.meta.optional.url || null
  // } catch (e) {
  //   console.log("No url")
  // }
  try {
    post.title = post.title.rendered
  } catch(e) {
    console.log("How can there be no title?!?")
  }
//   try {
//     post.instructor = post.acf.taxonomy.author.instructor
//   } catch(e) {
//     console.log("No instructor data...")
//   }
//   post.link = `/work/${post.slug}`
  
  

  //delete acf info
  delete post.acf

  //promote various things
  // try {
  //   post.artists = post.taxonomy.author.artist.map((artist)=>{
  //     artist.name_formatted = artist.name.split(', ').reverse().join(' ')
  //     artist.link = `/student/${artist.slug}`
  //     return artist
  //   })
  // } catch(e) {
  //   console.log("No valid artist taxonomy")
  // }

  try {
    post.categories = post.taxonomy.tags.category
  } catch(e) {
    console.log("No category, or taxonomy")
  }
  
  // try {
  //   delete post.taxonomy.author
  //   delete post.taxonomy.tags.tags
  //   delete post.taxonomy
  // } catch(e) {
  //   console.log("Tried to delete something that wasn't there")
  // }
  
  
  
  
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

  try{
    post.taxonomy.tags = JSON.parse(post.taxonomy.tags)
  } catch(e) {
    console.log("non-parsable tags:", post.taxonomy)
    // post.taxonomy.tags = null
  }
  
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

const hydratePostByType = async(post) => {
  try{
    return await filterPost(post).then(async (post)=>{
      // console.log(post)
      if(post.type === 'video') {
        //TODO: do something special for vimeo here...
        //https://vimeo.com/manage/videos/540938383
        const videoId = post.assets.media.shift()
        post.assets.media = {
          url:`https://vimeo.com/manage/videos/${videoId}`,
          videoId,
          videoFileLink: 'TODO: use vimeo api'
        }
      } else {
        post.assets.media = post.assets.media ? await Promise.all(post.assets.media.map(getMediaById)) : null
      }
      let previewId = JSON.parse(post.assets.preview).shift()
      post.assets.preview = await getMediaById(previewId)
      return post
    })
  } catch(e) {
    console.log("no", e)
    return {}
  }
}

const getPostById = async(id)=>{
  const post = await wp.posts().id(id).get()
  return await hydratePostByType(post)
  
}

const getMediaById = async(id)=>{
  const media =  await wp.media().id(id).get()  
  
  try {
    const {media_details, caption, source_url, originalname} = media
    const {thumbnail} = media_details.sizes
    return {
      id, 
      caption: caption.raw, 
      thumbnail, 
      source_url,
      originalname
    }
  } catch(e){
    console.log(e)
    return null
  }
}


const createTest = async () =>{
  // wp.artworkAPI = wp.registerRoute("acf/v3", "/test");
 
  console.log("createTest running in wp.js")
  let post = {
    "title": `Testing, testing, 1, 2, 3, ${Math.round(Math.random()*100)}`,
    "fields": {
      "taxonomy": {
        "author": {
          "artist": "Mike Stamm",
          "instructor": "Erin Sparling"
        },
        "tags": {
          "tags": "animation,awesomeness",
          "category": "fine art,nerdery"
        }
      },
      "external":{
        "vimeo_url": "vimeo://",
        "youtube_url": "youtube://",
        "soundcloud_url": "soundcloud://",
        "dropbox_url": "dropbox://"
      },
      "meta": {
        "description": `Testing, testing, 1, 2, 3, ${Math.round(Math.random()*10)}`,
        "optional": {
          "dimensions": "4x5 index card, pixels",
          "url": "https://my website"
        },
        "email": "ldap-email@cooper.edu"
      }
    }
  }
  
    
  try{
    return true
    let create = await wp.posts().create(post)
    console.log(create)
    return create
  } catch(e) {
    console.log(e)
    return e 
  }
  
}

const create = async (post) =>{
 
  console.log("create running in wp.js")
  console.log("data being submitted:", util.inspect(post, false, null))
  try{
    // return true
    let create = await wp.posts().create(post)
    console.log(create)
    return create
  } catch(e) {
    console.log(e)
    return e 
  }
  
}

const createMedia = async (media, meta)=>{
  console.log("createMedia is running in wp.js")
    
  try{
    let response = await wp.media().file(media.buffer, media.originalname).create(meta)
    response.originalname = media.originalname
    return response
  } catch(e) {
    console.log(e)
    return e
  }

}

const getAllPosts = async ()=>{
  return collect_all_draft_posts()
}

module.exports = {
  collect_all_tags,
  collect_all_posts,
  generate_limited_random,
  filterCategory,
  filterTag,
  filterPost,
  getPostById,
  getMediaById,
  getCategoryById,
  getCategoryByName,
  getAllCategories,
  getAllTags,
  getAllTagsRaw,
  getTagByName,
  create,
  createMedia,
  createTest,
  getAllPosts
}