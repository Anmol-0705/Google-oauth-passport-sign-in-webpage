const router = require('express').Router()
//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest ,(req, res) => {
    res.render('login')
  })

router.get("/log",ensureAuth, async(req,res)=>{
    res.render('index',{8100:req.user})
})
module.exports=router;