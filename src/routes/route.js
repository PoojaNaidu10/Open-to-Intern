const express = require('express');
const router = express.Router();
const CollegeController = require("../Controller/CollegeController")
const IntrenController = require("../Controller/InternController")

router.post("/colleges",CollegeController.CreateCollege)

router.post("/interns", IntrenController.CreateIntern)

router.get("/collegeDetails", CollegeController.GetcollegeDetails)



module.exports = router;