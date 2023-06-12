const {request} = require('express');
const { executeQuery } = require('../db/mySql')
const getTotalCovidData = async (req, res) => {
    try {
        console.log("inside Total covid get")
        var sql = "select * from overallCases";
        let getTotalCovidData = await executeQuery(sql, [])
        res.send(getTotalCovidData)
        
    }
    catch (err) {
        console.log('error in total covid get')
        res.send(err.message)
    }
}

const upsertOverallCovid = async (req, res) => {
    try {
        console.log("inside overall covid upsert")
        let covidOverAllKeys = Object.keys(req.body)
        let covidOverAllValues = Object.values(req.body)
        let result = {}
        const covidOverAllData = async (fieldname, vlaue) => {
            for (let i = 0; i < fieldname.length; i++) {
                
                result[fieldname[i]] = vlaue[i]
            }
        }
        covidOverAllData(covidOverAllKeys, covidOverAllValues)

        if(req.file){
            result.imageUrl =req.protocol+'://'+req.headers.host+'/'+req.file.filename
        }

        console.log("result is >>>");
        console.log(result);
        var sql = 'REPLACE INTO overallCases SET ?'
        let getCovidOverAllDatas = await executeQuery(sql, result)
        console.log(getCovidOverAllDatas);
        res.send("Covid Overall Cases saved Successfully")
    } catch (error) {
        res.send("error page in overallCases upsert " + error.message)
    }
}




const deleteCovidOverallData =async (request,res)=>{
    try {
        console.log("inside delete covid Data");
        console.log('query:', request.query.code);
        let deleteCovidOverallData = request.query.code
        var sql = 'DELETE FROM overallCases WHERE _id = ' + deleteCovidOverallData;
        let deleteCovidOverallDatas = await executeQuery(sql, [])
        res.send("Covid Overall Cases Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in covid OverAll Data deletion")
        res.send(err.message)
    }
}
module.exports = {getTotalCovidData, upsertOverallCovid,deleteCovidOverallData}