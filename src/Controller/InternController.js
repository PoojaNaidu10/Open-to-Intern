const IntrenModel = require("../model/InternModel")
const CollegeModel =require("../model/CollegeModel")

const CreateIntern = async function(req, res){
    try{
        let name = req.body.name
        let email = req.body.email
        let mobile = req.body.mobile
        let collegeId = req.body.collegeId
        let data = req.body
        
        if(Object.keys(data) ==0) return res.status(400).send({status:false, msg:"No input provided"})
        if(!name) return res.status(400).send({status:false, msg:"name is required"})
        if(!email) return res.status(400).send({status:false, msg:"email is required"})
        if(!mobile) return res.status(400).send({status:false, msg:"mobile is required"})
        if(!collegeId) return res.status(400).send({status:false, msg:"collegeId is required"})
        const isemailUsed = await IntrenModel.findOne({ email })
        if (isemailUsed) {
            return res.status(400).send({status:false, msg:"email is already used"})
         }

         const isMobileUsed = await IntrenModel.findOne({ mobile })
         if (isMobileUsed) {
            return res.status(400).send({status:false, msg:"Mobile Number is already used"})
         }

         if (!(/^[6-9]\d{9}$/.test(mobile))) {
            return res.status(400).send({ status: false, message: `Mobile number should be a valid number` })
            
        }

         const iscollegeIdExist = await CollegeModel.findOne({ _id:collegeId})
         if (!iscollegeIdExist) {
            return res.status(400).send({status:false, msg:"The collegeId doen't exist in college collection"})
         }
        
         const InternCreated = await IntrenModel.create(data)
         res.status(201).send({ status:true, msg:"Intern creataed successfuly", data: InternCreated})

    }
    catch(error){
        res.status(500).send({status:false, msg:error.message})
}

}

module.exports.CreateIntern=CreateIntern