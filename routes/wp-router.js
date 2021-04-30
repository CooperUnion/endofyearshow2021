const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({extended:true})
const push = require('../lib/push');

//multer configuration
const multer = require('multer');
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`)
//   }
// })

var memoryStorage = multer.memoryStorage()

var upload = multer({ storage: memoryStorage })


// const uploadBuffer = multer({ storage: memoryStorage})


const pluck = (data)=>{
  return data.filter((item)=>{return item != ''})
}

const multiple = (data)=>{
   
  if(Array.isArray(data)) {
    return data
  }  
  
  try{
    const parsedData = JSON.parse(data)
    return pluck(parsedData)
  } catch(e){
    console.log("Could not parse, returning the string", data)
    return undefined
  }
}

const singular = (data)=>{
  try{
    return multiple(data).shift()
  } catch(e){
    console.log("Could not find a singular elemenet:", data)
    return undefined
  }  
}

const parse = (data)=>{
  try{
    return JSON.parse(data)
  } catch(e){
    console.log("Could not parse:", data)
    return undefined
  }  
}

const {
  getAllTags, 
  getAllCategories,
  ...wp
} = require('../lib/wp');

const wpLogger = (req, res, next) =>{
  console.log('hit /wp', req.path)
  next()
}

router.get('/', wpLogger, async (req, res, next)=>{
  
  return res.json({ok: true})
  
  console.log('running test')
  let test = await wp.create()
  res.json({ok:true, test})
})

router.post('/', wpLogger, upload.none(), async (req, res, next)=>{
  console.log('creating a post')
  console.log(req.body)
  try {
    let post = await wp.create(req.body)
    res.json("ok")
  } catch (e) {
    res.status(500).json({error:e})
  }

})

router.post('/json', wpLogger, jsonParser, async (req, res, next)=>{
  console.log('creating a post for real')
  console.log(req.body)
  try {
    let post = await wp.create(req.body)
    res.json(post)
  } catch (e) {
    res.status(500).json({error:e})
  }

})

//testing
router.post('/formData', wpLogger, upload.none(), async (req, res, next)=>{
  console.log('creating a post for real')
  console.log(req.body)
  
  const {
    worktitle,
    firstname,
    lastname,
    faculty,
    medium,
    description,
    dimensions,
    materials,
    email,
    project,
    media,
    artworkid,
    videoworkid,
    videoworktitle,
    workid,
    academicyear,
    documentationformat,
    thumbnailid,
    classproject,
    whichproject,
    typeofwork,
    url,
    workurl
  } = req.body
  
  console.log("special debug", firstname, lastname)
  
  const body = {
    title: worktitle,
    fields: {
      // type: typeofwork,
      type: documentationformat,      
      author: {
        first: firstname,
        last: lastname,
        formatted: `${firstname} ${lastname}`,
        academicyear,
        email
      },
      taxonomy: {
        tags: JSON.stringify(medium) || 'external',
        category: "NOT USED"
      },
      meta: {
        description,
        dimensions,
        materials
      },
      assets:{
        media: multiple(workid),
        preview: thumbnailid,
        url: url || workurl || "https://NOT.PROVIDED"        
      },
      class:{
        instructor: multiple(faculty) || null,
        project: multiple(whichproject) || null
      }
    }
  }
  
  try {
    // return res.json({ok:true})
    let post = await wp.create(body)
    res.json(post)
  } catch (e) {
    res.status(500).json({error:e})
  }

})

  
router.post('/image', wpLogger, upload.any(), async (req, res, next)=>{

    
  console.log(req.body)

  try {
    let media = await wp.createMedia(req.files[0], req.body)
    console.log(media)

    const {id, media_details, caption, source_url, originalname} = media
    const {thumbnail} = media_details.sizes
    res.json({
      id, 
      caption: caption.raw, 
      thumbnail, 
      source_url,
      originalname
    })
  } catch(e) {
    console.log(e)
    res.status(500).json({error:e})
  }
  
})

router.post('/imageArray', wpLogger, upload.any(), async (req, res, next)=>{

  console.log(req.body)
  
  const medias = req.files.map((file, i)=>{
    try {
      const meta = {}
      for (const key of Object.keys(req.body)) {
        console.log({key})
        const parsedItem = JSON.parse(req.body[key])[i]
        meta[key] = parsedItem
      }
      return wp.createMedia(req.files[i], meta)
    } catch (e){
      const errorMessage = `Error submitting file ${file.originalname}`
      console.log(errorMessage, e)
      throw new Error(e)
    }
  })
  
  const submitted = await Promise.all(medias)
  
  const formattedSubmissions = submitted.map((media)=>{
    console.log(media)

    const {id, media_details, caption, source_url, originalname} = media
    const {thumbnail} = media_details.sizes
    
    return {
      id, 
      caption: caption.raw, 
      thumbnail, 
      source_url,
      originalname
    }
  })
  
  try{ 
    res.json(formattedSubmissions)
  } catch(e) {
    console.log(e)
    res.status(500).json({error:e})
  }
   
})

router.get('/tags', wpLogger, async (req, res) => {
  const tags = await getAllCategories()  
  res.json(tags)
})

router.get('/post/:id', wpLogger, async (req,res)=>{
  const post = await wp.getPostById(req.params.id)
  
  //res.json(post)
  res.end(JSON.stringify(post, null, "\t"))
  
})


router.get('/media/:id', wpLogger, async (req,res)=>{
  const media = await wp.getMediaById(req.params.id)
  res.json(media)
  
})

module.exports = router