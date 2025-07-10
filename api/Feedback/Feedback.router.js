const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

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
    // getallscheduledate,
} = require("./Feedback.controller");


//categories
router.post('/insertcategory', checkToken, insertfeedbackcategory)
router.get('/getallCategories', checkToken, getallcategories)
router.post('/updatecategory', checkToken, updatecategory)

//subcategories
router.post('/insertsubcategory', checkToken, insertsubcategory)
router.get('/getallsubCategories', checkToken, getallsubCategories)
router.post('/updatesubcategory', checkToken, updatesubcategory)
//collectiontype
router.post('/insertcollectiontype', checkToken, insertcollectiontype)
router.get('/allfeedbackcollection', checkToken, allfeedbackcollection)
router.post('/updatecollectiontype', checkToken, updatecollectiontype)
router.post("/getfeedbacksubcategory", checkToken, getfeedbacksubcategory)
//feedback master
router.post('/insertfeedback', checkToken, insertFeedbackName)
router.get('/getallfeedback', checkToken, getFeedbackName)
router.post('/updatetfeedback', checkToken, UpdateFeedbackName)
// feedbackDetial master   
router.post('/insertfeedbackDetail', checkToken, insertfeedbackDetail)
router.get('/getallfeedbackDetail', checkToken, getallfeedbackDetail)
router.post('/updatefeedbackDetail', checkToken, updatefeedbackDetail)

router.post('/fetchFeedbackdtl', checkToken, fetchFeedbackdtl)
router.post('/fetchfbdisplay', fetchfbdisplay)// no check token
// feedback user transaction
router.post('/feedbackanswers', insertFeedbackanswers) // no check token
router.post('/getalluserfeedback', checkToken, getalluserfeedback)
//feedback all Masters
router.post('/insertmodulemaster', checkToken, insertmodulemaster)
router.post('/updatemodulemaster', checkToken, updatemodulemaster)
router.get('/getallmodulemaster', checkToken, getallmodulemaster)

router.post('/insertmenumaster', checkToken, insertmenumaster)
router.get('/getallmenumaster', checkToken, getallmenumaster)
router.post('/updatemenumaster', checkToken, updatemenumaster)


router.post('/insertgroupmaster', checkToken, insertgroupmaster)
router.post('/updategroupmaster', checkToken, updategroupmaster)
router.get('/getallgroupmaster', checkToken, getallgroupmaster)

router.post('/getallmodulemenu', checkToken, getallmodulemenu)
router.post('/insertuserright', checkToken, insertuserright)
router.post('/updateuserright', checkToken, updateuserright)

router.get("/deparment", checkToken, getDeptStatus)
router.get("/deparmentsec/:id", checkToken, getDepartmentSec)
router.get("/departmentemp/:id", checkToken, getDepartmentEmpid)

router.post('/employeerightinsert', checkToken, employeerightinsert)
router.get('/getallemployeeright', checkToken, getallemployeeright)
router.post('/employeerightupdate', checkToken, employeerightupdate)

router.post('/getallmenuitems', checkToken, getallmenuitems)
router.post('/insertusermodulemaster', checkToken, insertusermodulemaster)
router.post('/updateusermodulemaster', checkToken, updateusermodulemaster)
router.get('/getallusermodulemaster', checkToken, getallusermodulemaster)
router.post('/getallmoduleitems', checkToken, getallmoduleitems)

router.get('/getfeedbackcount', checkToken, getfeedbackcount)

router.post('/inserthkbeddetail', checkToken, insertHkdetails)

router.post('/nursestationinsert', checkToken, nursestationinsert)
router.post('/updatenursestation', checkToken, updatenursestation)
router.get('/getallnursestation', checkToken, getallnursestation)
router.post('/getpatientfeedback', checkToken, getpatientfeedback)

router.post('/getbed', checkToken, getNursingBed)
router.post('/inpatientdetil', checkToken, getCurrentPatient)

router.get('/getallblockedbed', checkToken, getallblockedbed) // check this later
router.get('/getchecklistbed', checkToken, getchecklistbed) // check this later

router.post('/insertbedremarks', checkToken, insertbedremarks) // maintainence
router.get('/getllbedremarks', checkToken, getllbedremarks)// check later this 


router.post('/getalldischargeform', checkToken, getalldischargeform)
router.post('/insertipfollowup', checkToken, insertipfollowup)
router.post("/getallipfollowup", checkToken, getallipfollowup)
router.post("/updateipfollowup", checkToken, updateipfollowup)



router.get('/getempdetail/:id', checkToken, getempdetail)
router.get('/getbedremarkDetail/:id', checkToken, getbedremarkDetail)
router.get('/getberremarkstatus', checkToken, getberremarkstatus)
router.get('/getallhkbeds', checkToken, getallHousekeepingBeds)

router.get('/getcomplaintdetail/:id', checkToken, getcomplaintdetail)
router.get('/getallroomassetdata/:id', checkToken, getallroomassetdata)


router.get('/getallroomdetail', checkToken, getallroomdetail)
router.get('/getallnewroomdetail', checkToken, getallnewroomdetail)
router.get('/getallbedmaster', checkToken, getallbedmaster)
router.post('/insertroommaster', checkToken, insertroommaster)
router.post('/updateroommaster', checkToken, updateroommaster)

router.get('/getallcomplaintdetail', checkToken, getAllComplaintDetail)
router.get('/getallComplaintType/:id', checkToken, getallComplaintType)
router.post('/complaintregistraion', checkToken, complaintregistraion)

router.post('/rectifycom', checkToken, rectifycomplaint)
router.post('/insertroomassetdetail', checkToken, insertroomassetdetail)
router.post('/updateroomassetdetail', checkToken, updateroomassetdetail)

router.post('/insertassetitem', checkToken, insertassetitem)
router.post('/updateassetitem', checkToken, updateassetitem)
router.get('/getassetitem', checkToken, getallassetItems)

router.post('/insertprocheckdetl', checkToken, insertprocheckdetl)



//get insethkbedassing
router.post('/inserthkbedassign', checkToken, inserthkbedassign)
router.post('/removeassign', checkToken, removeassign)
//get assined bed
router.get('/getallassignedbed/:id', checkToken, getallassignedbed)


router.post('/insertroomchecklist', checkToken, insertroomchecklist)
router.post('/updateroomchecklist', checkToken, updateroomchecklist)
router.get('/getroomchecklist', checkToken, getroomchecklist)
router.get('/getprocheckbed', checkToken, getprocheckbed)
router.get('/getprocheckcompletebed', checkToken, getprocheckcompletebed)

router.get('/getprochecklistdetail/:id', checkToken, getprochecklistdetail)

router.get('/getdischargeentrybed', checkToken, getdischargeentrybed)
router.get('/getdepassetonly/:id', checkToken, getdepassetonly)
router.get('/getroomassetdetail', checkToken, getroomassetdetail)


router.post('/inserthkitem', checkToken, insertdischargeroomitem)
router.post('/updatehkitem', checkToken, updatedischargeroomitem)
router.get('/getallhkitem', checkToken, getallhkitem)
router.get('/nurse', checkToken, getnursingstaiton)

router.get('/getallhkactiveitem', checkToken, getallhkactiveitem);
router.get('/getstarcount', checkToken, getstarcount);
router.get('/getcategorycount', checkToken, getcategorycount);

router.post('/inserthkempdtl', checkToken, inserthkempdtl)
router.post('/updatehkempdtl', checkToken, updatehkempdtl)
router.get('/getallhkempdtl', checkToken, getallhkempdtl)


router.post('/getdischargepatient', checkToken, getdischargepatient)
router.post('/ptnotresponding', checkToken, patientnotresponding)
router.post('/getptnotresponding', checkToken, getpatientnotresponding)

router.get('/getcurrentCompany', getCurrentCompany) // no check token
router.post('/getptimpression', checkToken, getptimpression)
router.post('/insertimpression', checkToken, insertimpression)
router.post('/insertimpremark', checkToken, insertimpremark)
router.post('/fetchimpremark', checkToken, fetchimpremark)
router.post('/getrelative', checkToken, getrelative)
router.post('/getbirthdetail', checkToken, getbirthdetail)


router.post('/gethkcheckdtl', checkToken, gethkcheckdtl)
router.post('/hkcmpreg', checkToken, houekeepingComplaintregistration)
router.post('/gethkcmpdetail', checkToken, gethkcomplaintdetails)
router.post('/gethkbeddetail', checkToken, gethkbedDetails)

router.post('/commonfbreport', checkToken, getCommonFeedbackReport);
router.post('/ipfbreport', checkToken, getIpFeedbackReport);

//edlider meliora table
// router.post('/insertbddetail', insertbddetail)
// router.post('/insertptdetailmlora', insertptdetailmlora)


module.exports = router;