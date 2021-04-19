const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({extended:true})

//multer configuration
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
var upload = multer({ storage: storage })

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
router.post('/formData', wpLogger, jsonParser, async (req, res, next)=>{
  console.log('creating a post for real')
  console.log(req.body)
  
  const body = {
    "title": "Testing, testing, 1, 2, 3, 1,000,000",
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
        "description": "Testing, testing, 1, 2, 3, 1,000,000",
        "optional": {
          "dimensions": "4x5 index card, pixels",
          "url": "https://my website"
        },
        "email": "ldap-email@cooper.edu"
      }
    }
  }
  
  
  try {
    let post = await wp.create(req.body)
    res.json(post)
  } catch (e) {
    res.status(500).json({error:e})
  }

})

router.get('/tags', wpLogger, async (req, res) => {
  const tags = await getAllCategories()  
  res.json(tags)
})

module.exports = router