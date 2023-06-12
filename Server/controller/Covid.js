const {request} = require('express');
const { executeQuery } = require('../db/mySql')
const getCovidData = async (req, res) => {
    try {
        console.log("inside covid get")
        var sql = "select * from todayCases";
        let getCovidData = await executeQuery(sql, [])
        res.send(getCovidData)
        
    }
    catch (err) {
        console.log('error in covid get')
        res.send(err.message)
    }
}

const upsertCovid = async (req, res) => {
    try {
        console.log("inside covid upsert")
        let covidKeys = Object.keys(req.body)
        let covidValues = Object.values(req.body)
        let result = {}
        const covidData = async (fieldname, vlaue) => {
            for (let i = 0; i < fieldname.length; i++) {
                
                result[fieldname[i]] = vlaue[i]
            }
        }
        covidData(covidKeys, covidValues)

        if(req.file){
            result.imageUrl =req.protocol+'://'+req.headers.host+'/'+req.file.filename
        }

        console.log("result is >>>");
        console.log(result);
        var sql = 'REPLACE INTO todayCases SET ?'
        let getCovidDatas = await executeQuery(sql, result)
        console.log(getCovidDatas);
        res.send("Covid Cases saved Successfully")
    } catch (error) {
        res.send("error page in todayCases upsert " + error.message)
    }
}




const deleteCovidData =async (request,res)=>{
    try {
        console.log("inside delete todayCases covid Data");
        console.log('query:', request.query.code);
        let deleteCovidData = request.query.code
        var sql = 'DELETE FROM todayCases WHERE _id = ' + deleteCovidData;
        let deleteCovidDatas = await executeQuery(sql, [])
        res.send("todayCases Covid Cases Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in covidData deletion")
        res.send(err.message)
    }
}
module.exports = {getCovidData, upsertCovid,deleteCovidData}