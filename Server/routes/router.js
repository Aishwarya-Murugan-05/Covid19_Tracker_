const express = require('express')
const router = express.Router()
const { fieldsUpload,Multer} = require('../multer/multer')
const  {getCovidData, upsertCovid,deleteCovidData} = require('../controller/Covid')
const  {getTotalCovidData, upsertOverallCovid,deleteCovidOverallData} = require('../controller/totalCovid')



// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
router.post('/',async (req,res)=>{
  console.log('inside the post')
  res.send("data table")

})
router.post('/getCovidData',getCovidData)
router.post('/upsertCovid',fieldsUpload,upsertCovid)
router.post('/deleteCovidData',deleteCovidData)

router.post('/getTotalCovidData',getTotalCovidData)
router.post('/upsertOverallCovid',fieldsUpload,upsertOverallCovid)
router.post('/deleteCovidOverallData',deleteCovidOverallData)



module.exports = router 