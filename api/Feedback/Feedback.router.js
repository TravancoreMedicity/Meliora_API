const router = require("express").Router();
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
    // getallscheduledate,
} = require("./Feedback.controller");


//categories
router.post('/insertcategory', insertfeedbackcategory)
router.get('/getallCategories', getallcategories)
router.post('/updatecategory', updatecategory)

//subcategories
router.post('/insertsubcategory', insertsubcategory)
router.get('/getallsubCategories', getallsubCategories)
router.post('/updatesubcategory', updatesubcategory)
//collectiontype
router.post('/insertcollectiontype', insertcollectiontype)
router.get('/allfeedbackcollection', allfeedbackcollection)
router.post('/updatecollectiontype', updatecollectiontype)
router.post("/getfeedbacksubcategory", getfeedbacksubcategory)
//feedback master
router.post('/insertfeedback', insertFeedbackName)
router.get('/getallfeedback', getFeedbackName)
router.post('/updatetfeedback', UpdateFeedbackName)
// feedbackDetial master   
router.post('/insertfeedbackDetail', insertfeedbackDetail)
router.get('/getallfeedbackDetail', getallfeedbackDetail)
router.post('/updatefeedbackDetail', updatefeedbackDetail)

router.post('/fetchFeedbackdtl', fetchFeedbackdtl)
router.post('/fetchfbdisplay', fetchfbdisplay)
// feedback user transaction
router.post('/feedbackanswers', insertFeedbackanswers)
router.post('/getalluserfeedback', getalluserfeedback)
//feedback all Masters
router.post('/insertmodulemaster', insertmodulemaster)
router.post('/updatemodulemaster', updatemodulemaster)
router.get('/getallmodulemaster', getallmodulemaster)

router.post('/insertmenumaster', insertmenumaster)
router.get('/getallmenumaster', getallmenumaster)
router.post('/updatemenumaster', updatemenumaster)


router.post('/insertgroupmaster', insertgroupmaster)
router.post('/updategroupmaster', updategroupmaster)
router.get('/getallgroupmaster', getallgroupmaster)

router.post('/getallmodulemenu', getallmodulemenu)
router.post('/insertuserright', insertuserright)
router.post('/updateuserright', updateuserright)

router.get("/deparment", getDeptStatus)
router.get("/deparmentsec/:id", getDepartmentSec)
router.get("/departmentemp/:id", getDepartmentEmpid)

router.post('/employeerightinsert', employeerightinsert)
router.get('/getallemployeeright', getallemployeeright)
router.post('/employeerightupdate', employeerightupdate)

router.post('/getallmenuitems', getallmenuitems)
router.post('/insertusermodulemaster', insertusermodulemaster)
router.post('/updateusermodulemaster', updateusermodulemaster)
router.get('/getallusermodulemaster', getallusermodulemaster)
router.post('/getallmoduleitems', getallmoduleitems)

router.get('/getfeedbackcount', getfeedbackcount)

//nursingStation 

router.post('/nursestationinsert', nursestationinsert)
router.post('/updatenursestation', updatenursestation)
router.get('/getallnursestation', getallnursestation)
router.post('/getpatientfeedback', getpatientfeedback)

router.post('/getbed', getNursingBed)
router.post('/inpatientdetil', getCurrentPatient)

router.get('/getallblockedbed', getallblockedbed) // check this later

router.post('/insertbedremarks', insertbedremarks)
router.get('/getllbedremarks', getllbedremarks)// check later this 


router.post('/getalldischargeform', getalldischargeform)
router.post('/insertipfollowup', insertipfollowup)
router.post("/getallipfollowup", getallipfollowup)
router.post("/updateipfollowup", updateipfollowup)



router.get('/getempdetail/:id', getempdetail)
router.get('/getbedremarkDetail/:id', getbedremarkDetail)
router.get('/getberremarkstatus', getberremarkstatus)
router.get('/getallhkbeds', getallHousekeepingBeds)

router.get('/getcomplaintdetail/:id', getcomplaintdetail)
router.get('/getallroomassetdata/:id', getallroomassetdata)


router.get('/getallroomdetail', getallroomdetail)
router.get('/getallnewroomdetail', getallnewroomdetail)
router.get('/getallbedmaster', getallbedmaster)
router.post('/insertroommaster', insertroommaster)
router.post('/updateroommaster', updateroommaster)

router.get('/getallcomplaintdetail', getAllComplaintDetail)
router.post('/complaintregistraion', complaintregistraion)

router.post('/rectifycom', rectifycomplaint)
router.post('/insertroomassetdetail', insertroomassetdetail)
router.post('/updateroomassetdetail', updateroomassetdetail)

router.post('/insertassetitem', insertassetitem)
router.post('/updateassetitem', updateassetitem)
router.get('/getassetitem', getallassetItems)

router.post('/insertprocheckdetl', insertprocheckdetl)



//get insethkbedassing
router.post('/inserthkbedassign', inserthkbedassign)
router.post('/removeassign', removeassign)
//get assined bed
router.get('/getallassignedbed/:id', getallassignedbed)
// router.get('/gethktakenbed')

router.post('/insertroomchecklist', insertroomchecklist)
router.post('/updateroomchecklist', updateroomchecklist)
router.get('/getroomchecklist', getroomchecklist)
router.get('/getprocheckbed', getprocheckbed)
router.get('/getprocheckcompletebed', getprocheckcompletebed)

router.get('/getprochecklistdetail/:id', getprochecklistdetail)

router.get('/getdischargeentrybed', getdischargeentrybed)
router.get('/getdepassetonly/:id', getdepassetonly)
router.get('/getroomassetdetail', getroomassetdetail)


router.post('/inserthkitem', insertdischargeroomitem)
router.post('/updatehkitem', updatedischargeroomitem)
router.get('/getallhkitem', getallhkitem)
router.get('/nurse', getnursingstaiton)

router.get('/getallhkactiveitem', getallhkactiveitem);
router.get('/getstarcount', getstarcount);
router.get('/getcategorycount', getcategorycount);

router.post('/inserthkempdtl', inserthkempdtl)
router.post('/updatehkempdtl', updatehkempdtl)
router.get('/getallhkempdtl', getallhkempdtl)


router.post('/getdischargepatient', getdischargepatient)
router.post('/ptnotresponding', patientnotresponding)
router.post('/getptnotresponding', getpatientnotresponding)

router.get('/getcurrentCompany', getCurrentCompany)
router.post('/getptimpression', getptimpression)
router.post('/insertimpression', insertimpression)
router.post('/insertimpremark', insertimpremark)
router.post('/fetchimpremark', fetchimpremark)
router.post('/getrelative', getrelative)
router.post('/getbirthdetail', getbirthdetail)

//edlider meliora table
// router.post('/insertbddetail', insertbddetail)
// router.post('/insertptdetailmlora', insertptdetailmlora)


module.exports = router;