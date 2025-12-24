const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");


const {
    insertfeedbackcategory,
    getallcategories,
    updatecategory,
    insertsubcategory,
    getallsubCategories,
    updatesubcategory,
    insertcollectiontype,
    allfeedbackcollection,
    updatecollectiontype,
    getDeptStatus,
    getfeedbacksubcategory,
    insertFeedbackName,
    getFeedbackName,
    UpdateFeedbackName,
    insertfeedbackDetail,
    getallfeedbackDetail,
    updatefeedbackDetail,
    fetchFeedbackdtl,
    fetchfbdisplay,
    insertFeedbackanswers,
    getalluserfeedback,
    insertmodulemaster,
    updatemodulemaster,
    getallmodulemaster,
    insertmenumaster,
    getallmenumaster,
    updatemenumaster,
    insertgroupmaster,
    getallgroupmaster,
    updategroupmaster,
    getallmodulemenu,
    insertuserright,
    updateuserright,
    getDepartmentSec,
    getDepartmentEmpid,
    employeerightinsert,
    getallemployeeright,
    employeerightupdate,
    getallmenuitems,
    insertusermodulemaster,
    updateusermodulemaster,
    getallusermodulemaster,
    getallmoduleitems,
    nursestationinsert,
    getallnursestation,
    updatenursestation,
    getpatientfeedback,
    // insertbddetail,
    // insertptdetailmlora,
    getNursingBed,
    getCurrentPatient,
    getallblockedbed,
    insertbedremarks,
    getllbedremarks,
    getempdetail,
    getbedremarkDetail,
    getberremarkstatus,
    getallHousekeepingBeds,
    getallroomdetail,
    getallbedmaster,
    insertroommaster,
    updateroommaster,
    getallnewroomdetail,
    getAllComplaintDetail,
    complaintregistraion,
    getcomplaintdetail,
    rectifycomplaint,
    insertassetitem,
    getallassetItems,
    updateassetitem,
    getdepassetonly,
    insertroomassetdetail,
    getroomassetdetail,
    updateroomassetdetail,
    getallroomassetdata,
    insertroomchecklist,
    updateroomchecklist,
    getroomchecklist,
    getdischargeentrybed,
    insertprocheckdetl,
    getprochecklistdetail,
    getprocheckbed,
    getprocheckcompletebed,
    insertdischargeroomitem,
    updatedischargeroomitem,
    getallhkitem,
    getallhkactiveitem,
    inserthkempdtl,
    updatehkempdtl,
    getallhkempdtl,
    getfeedbackcount,
    inserthkbedassign,
    getallassignedbed,
    getalldischargeform,
    removeassign,
    insertipfollowup,
    getallipfollowup,
    updateipfollowup,
    getdischargepatient,
    getCurrentCompany,
    getptimpression,
    insertimpression,
    insertimpremark,
    fetchimpremark,
    getrelative,
    getbirthdetail,
    patientnotresponding,
    getpatientnotresponding,
    getstarcount,
    getcategorycount,
    getnursingstaiton,
    insertHkdetails,
    gethkcheckdtl,
    houekeepingComplaintregistration,
    gethkcomplaintdetails,
    gethkbedDetails,
    getchecklistbed,
    getallComplaintType,
    getCommonFeedbackReport,
    getIpFeedbackReport,
    getAllPREMDetail,
    getNursingStationLastDate,
    getPatientDetail,
    InsertPatineDetail,
    checkIpAlreadyExist,
    getAllDischargedPatients,
    // getallscheduledate,
} = require("./Feedback.controller");


//categories
router.post('/insertcategory', verifyToken, insertfeedbackcategory)
router.get('/getallCategories', verifyToken, getallcategories)
router.post('/updatecategory', verifyToken, updatecategory)

//subcategories
router.post('/insertsubcategory', verifyToken, insertsubcategory)
router.get('/getallsubCategories', verifyToken, getallsubCategories)
router.post('/updatesubcategory', verifyToken, updatesubcategory)
//collectiontype
router.post('/insertcollectiontype', verifyToken, insertcollectiontype)
router.get('/allfeedbackcollection', verifyToken, allfeedbackcollection)
router.post('/updatecollectiontype', verifyToken, updatecollectiontype)
router.post("/getfeedbacksubcategory", verifyToken, getfeedbacksubcategory)
//feedback master
router.post('/insertfeedback', verifyToken, insertFeedbackName)
router.get('/getallfeedback', verifyToken, getFeedbackName)
router.post('/updatetfeedback', verifyToken, UpdateFeedbackName)
// feedbackDetial master   
router.post('/insertfeedbackDetail', verifyToken, insertfeedbackDetail)
router.get('/getallfeedbackDetail', verifyToken, getallfeedbackDetail)
router.post('/updatefeedbackDetail', verifyToken, updatefeedbackDetail)

router.post('/fetchFeedbackdtl', verifyToken, fetchFeedbackdtl)
router.post('/fetchfbdisplay', fetchfbdisplay)// no check token
// feedback user transaction
router.post('/feedbackanswers', insertFeedbackanswers) // no check token
router.post('/getalluserfeedback', verifyToken, getalluserfeedback)
//feedback all Masters
router.post('/insertmodulemaster', verifyToken, insertmodulemaster)
router.post('/updatemodulemaster', verifyToken, updatemodulemaster)
router.get('/getallmodulemaster', verifyToken, getallmodulemaster)

router.post('/insertmenumaster', verifyToken, insertmenumaster)
router.get('/getallmenumaster', verifyToken, getallmenumaster)
router.post('/updatemenumaster', verifyToken, updatemenumaster)


router.post('/insertgroupmaster', verifyToken, insertgroupmaster)
router.post('/updategroupmaster', verifyToken, updategroupmaster)
router.get('/getallgroupmaster', verifyToken, getallgroupmaster)

router.post('/getallmodulemenu', verifyToken, getallmodulemenu)
router.post('/insertuserright', verifyToken, insertuserright)
router.post('/updateuserright', verifyToken, updateuserright)

router.get("/deparment", verifyToken, getDeptStatus)
router.get("/deparmentsec/:id", verifyToken, getDepartmentSec)
router.get("/departmentemp/:id", verifyToken, getDepartmentEmpid)

router.post('/employeerightinsert', verifyToken, employeerightinsert)
router.get('/getallemployeeright', verifyToken, getallemployeeright)
router.post('/employeerightupdate', verifyToken, employeerightupdate)

router.post('/getallmenuitems', verifyToken, getallmenuitems)
router.post('/insertusermodulemaster', verifyToken, insertusermodulemaster)
router.post('/updateusermodulemaster', verifyToken, updateusermodulemaster)
router.get('/getallusermodulemaster', verifyToken, getallusermodulemaster)
router.post('/getallmoduleitems', verifyToken, getallmoduleitems)

router.get('/getfeedbackcount', verifyToken, getfeedbackcount)

router.post('/inserthkbeddetail', verifyToken, insertHkdetails)

router.post('/nursestationinsert', verifyToken, nursestationinsert)
router.post('/updatenursestation', verifyToken, updatenursestation)
router.get('/getallnursestation', verifyToken, getallnursestation)
router.post('/getpatientfeedback', verifyToken, getpatientfeedback)

router.post('/getbed', verifyToken, getNursingBed)
router.post('/inpatientdetil', verifyToken, getCurrentPatient)

router.get('/getallblockedbed', verifyToken, getallblockedbed) // check this later
router.get('/getchecklistbed', verifyToken, getchecklistbed) // check this later

router.post('/insertbedremarks', verifyToken, insertbedremarks) // maintainence
router.get('/getllbedremarks', verifyToken, getllbedremarks)// check later this 


router.post('/getalldischargeform', verifyToken, getalldischargeform)
router.post('/insertipfollowup', verifyToken, insertipfollowup)
router.post("/getallipfollowup", verifyToken, getallipfollowup)
router.post("/updateipfollowup", verifyToken, updateipfollowup)



router.get('/getempdetail/:id', verifyToken, getempdetail)
router.get('/getbedremarkDetail/:id', verifyToken, getbedremarkDetail)
router.get('/getberremarkstatus', verifyToken, getberremarkstatus)
router.get('/getallhkbeds', verifyToken, getallHousekeepingBeds)

router.get('/getcomplaintdetail/:id', verifyToken, getcomplaintdetail)
router.get('/getallroomassetdata/:id', verifyToken, getallroomassetdata)


router.get('/getallroomdetail', verifyToken, getallroomdetail)
router.get('/getallnewroomdetail', verifyToken, getallnewroomdetail)
router.get('/getallbedmaster', verifyToken, getallbedmaster)
router.post('/insertroommaster', verifyToken, insertroommaster)
router.post('/updateroommaster', verifyToken, updateroommaster)

router.get('/getallcomplaintdetail', verifyToken, getAllComplaintDetail)
router.get('/getallComplaintType/:id', verifyToken, getallComplaintType)
router.post('/complaintregistraion', verifyToken, complaintregistraion)

router.post('/rectifycom', verifyToken, rectifycomplaint)
router.post('/insertroomassetdetail', verifyToken, insertroomassetdetail)
router.post('/updateroomassetdetail', verifyToken, updateroomassetdetail)

router.post('/insertassetitem', verifyToken, insertassetitem)
router.post('/updateassetitem', verifyToken, updateassetitem)
router.get('/getassetitem', verifyToken, getallassetItems)

router.post('/insertprocheckdetl', verifyToken, insertprocheckdetl)



//get insethkbedassing
router.post('/inserthkbedassign', verifyToken, inserthkbedassign)
router.post('/removeassign', verifyToken, removeassign)
//get assined bed
router.get('/getallassignedbed/:id', verifyToken, getallassignedbed)


router.post('/insertroomchecklist', verifyToken, insertroomchecklist)
router.post('/updateroomchecklist', verifyToken, updateroomchecklist)
router.get('/getroomchecklist', verifyToken, getroomchecklist)
router.get('/getprocheckbed', verifyToken, getprocheckbed)
router.get('/getprocheckcompletebed', verifyToken, getprocheckcompletebed)

router.get('/getprochecklistdetail/:id', verifyToken, getprochecklistdetail)

router.get('/getdischargeentrybed', verifyToken, getdischargeentrybed) // NOT USING MODULE NOT UP YET
router.get('/getdepassetonly/:id', verifyToken, getdepassetonly)
router.get('/getroomassetdetail', verifyToken, getroomassetdetail)


router.post('/inserthkitem', verifyToken, insertdischargeroomitem)
router.post('/updatehkitem', verifyToken, updatedischargeroomitem)
router.get('/getallhkitem', verifyToken, getallhkitem)
router.get('/nurse', verifyToken, getnursingstaiton)

router.get('/getallhkactiveitem', verifyToken, getallhkactiveitem);
router.get('/getstarcount', verifyToken, getstarcount);
router.get('/getcategorycount', verifyToken, getcategorycount);

router.post('/inserthkempdtl', verifyToken, inserthkempdtl)
router.post('/updatehkempdtl', verifyToken, updatehkempdtl)
router.get('/getallhkempdtl', verifyToken, getallhkempdtl)


router.post('/getdischargepatient', verifyToken, getdischargepatient)
router.post('/ptnotresponding', verifyToken, patientnotresponding)
router.post('/getptnotresponding', verifyToken, getpatientnotresponding)

router.get('/getcurrentCompany', getCurrentCompany) // no check token
router.post('/getptimpression', verifyToken, getptimpression)
router.post('/insertimpression', verifyToken, insertimpression)
router.post('/insertimpremark', verifyToken, insertimpremark)
router.post('/fetchimpremark', verifyToken, fetchimpremark)
router.post('/getrelative', verifyToken, getrelative)
router.post('/getbirthdetail', verifyToken, getbirthdetail)


router.post('/gethkcheckdtl', verifyToken, gethkcheckdtl)
router.post('/hkcmpreg', verifyToken, houekeepingComplaintregistration)
router.post('/gethkcmpdetail', verifyToken, gethkcomplaintdetails)
router.post('/gethkbeddetail', verifyToken, gethkbedDetails)

router.post('/commonfbreport', verifyToken, getCommonFeedbackReport);
router.post('/ipfbreport', verifyToken, getIpFeedbackReport);


router.get('/premdetail', verifyToken, getAllPREMDetail)
router.get('/getlastnsupdate', verifyToken, getNursingStationLastDate)


router.post('/getpatientdetail', verifyToken, getPatientDetail)
router.post('/insertpatientdetail', verifyToken, InsertPatineDetail)
router.post('/checkipexist', verifyToken, checkIpAlreadyExist)
router.post('/dischargedpatient', verifyToken, getAllDischargedPatients)

//edlider meliora table
// router.post('/insertbddetail', insertbddetail)
// router.post('/insertptdetailmlora', insertptdetailmlora)


module.exports = router;