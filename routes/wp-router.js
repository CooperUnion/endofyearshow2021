const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({extended:true})

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
    project
  } = req.body
  
  const body = {
    title: worktitle,
    "fields": {
      "taxonomy": {
        "author": {
          "artist": `${firstname} ${lastname}`,
          "instructor": faculty
        },
        "tags": {
          "tags": medium,
          "category": "NOT USED"
        }
      },
      "external":{
        "vimeo_url": "vimeo://",
        "youtube_url": "NOT USED",
        "soundcloud_url": "NOT USED",
        "dropbox_url": "NOT USED"
      },
      "meta": {
        "description": description,
        "optional": {
          "dimensions": dimensions,
          "url": "https://NOT.USED"
        },
        "email": email,
        project
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
  
    let media = await wp.createMedia(req.files[0], req.body)
    console.log(media)
  
    const {id, caption, media_details, source_url} = media
    const {thumbnail} = media_details.sizes
    res.json({
      id, 
      caption: caption.raw, 
      thumbnail, 
      source_url
    })

})

router.get('/tags', wpLogger, async (req, res) => {
  const tags = await getAllCategories()  
  res.json(tags)
})

module.exports = router