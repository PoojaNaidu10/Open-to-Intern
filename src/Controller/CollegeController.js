const CollegeModel = require("../model/CollegeModel")
const IntrenModel = require("../model/InternModel")

const CreateCollege = async function(req, res){
    try{

        let name = req.body.name
        let fullName = req.body.fullName
        let logoLink = req.body.logoLink
        let data = req.body
        
        if(Object.keys(data) ==0) return res.status(400).send({status:false, msg:"No input provided"})
        if(!name) return res.status(400).send({status:false, msg:"name is required"})
        if(!fullName) return res.status(400).send({status:false, msg:"fullName is required"})
        if(!logoLink) return res.status(400).send({status:false, msg:"logoLink is required"})
        const isNameUsed = await CollegeModel.findOne({ name })
        if (isNameUsed) {
            return res.status(400).send({status:false, msg:"name is already used"})
         }
         const CollegeCreated = await CollegeModel.create(data)
    res.status(201).send({ status:true, msg:"College created successfuly",  data: CollegeCreated})
    }
    catch(error){
    res.status(500).send({status:false, msg:error.message})
}
}

const GetcollegeDetails = async function (req, res) {

    try {

        let fix = await CollegeModel.findOne({ name: req.query.CollegeName, isDeleted : false })
        console.log(fix)
        if (!fix) {
            res.status(400).send({ status: false, msg: " No college found" })
        }
        else {
            let ID = fix._id
            let data = fix
            let interns = await IntrenModel.find({ collegeId: ID, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
            if (!interns.length > 0) {
                return res.status(400).send({ status: false, msg: "No Interns applied for an internship" })
            }
            else {
                let details = { name: data.name, fullname: data.fullName, logolink: data.logoLink, interests: interns }
                return res.status(200).send({ status: true, data: details })
            }
        }

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports.CreateCollege=CreateCollege
module.exports.GetcollegeDetails = GetcollegeDetails