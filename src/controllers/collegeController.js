const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const createCollege = async function (req, res) {
    try {
        let data = req.body
        console.log(Object.keys(data))
        if (Object.keys(data).length = 0) {
            res.status(400).send({ status: false, data: "Bad Request" })      // (400) = {the server cannot or will not process the request due to something that is perceived to be a client error}
        }
        else {
            const { name, fullName, logoLink } = data;

            if (!isValid(name)) {
                return res.status(400).send({
                    status: false,
                    msg: "name is required"
                })

            }
            if (!isValid(fullName)) {
                return res.status(400).send({
                    status: false,
                    msg: "fullName is required"
                })

            }
            if (!isValid(logoLink)) {
                return res.status(400).send({
                    status: false,
                    msg: "logoLink is required"
                })

            }
            let savedData = await collegeModel.create(data)
            res.status(201).send({ status: true, data: savedData })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: "error", err: err.message })

    }
}



const getCollegeDetails = async function(req,res){
    try{
    let data = req.query.collegeName
    if(!isValid(data)){
        return res.status(400).send({status : false, msg : "give the college name" })
    }
    let small = collegeName.toLowerCase()
    let getCollege = await collegeModel.findOne({name: small, isDeleted : false})
    if(! getCollege){
        return res.status(400).send({status : false,})
    }
    let checkId = getCollege._id
    let name1 = getCollege.name
    let fullName1 = getCollege.fullName
    let logoLink1 = getCollege.logoLink

    const totalIntern = await internModel.find({collegeId : checkId ,isDeleted : false}).select({_id :1,name : 1,email:1,mobile : 1});
    if(totalIntern.length != 0){
        let Data = {
            name : name1,
            fullName : fullName1,
            logoLink : logoLink1,
            interests : totalIntern
        }
        return res.status(200).send({status : true, data : Data});
    }
    else{
        res.status(400).send({status:false, msg : "Bad Request" })
    }
}
    catch(err){
    console.log(err)
    res.status(500).send({status : false, msg:"error", err : err.message})
    }


}

module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails