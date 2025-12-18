
const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { strictRateLimiter, normalRateLimiter } = require("../../middleware/rateLimiter");

const { IncidetDetailInsert, IncidentDetailsUpdate, UpdateMarkedIncidentDetails, SearchIncidentDetails,
    IncidentApprovalChecks, InpatientIncidetDetailInsert, InpatientIncidetDetailsUpdate,
    IncidentCategoryMaster,
    getAllIncidentCategory,
    IncidentCategoryUpdate,
    IncidentSubCategoryUpdate,
    getAllIncidentSubCategory,
    IncidentSubCategoryInsert,
    getPatientDetail,
    getProfessionalStaff,
    getHsPgStaffDetail,
    getAllassetDtl,
    IncidentRegistration,
    getAllIncidentDetail,
    IncidentUpdation,
    getAllIncidentHodIncharge,
    InchargeApproval,
    hodApproval,
    fetchAllLevelApprovals,
    insertIncidentLevelApproval,
    updateIncidentLevelApproval,
    getAllQADIncident,
    QadApproval,
    hodRcaApproval,
    qadRcaApproval,
    hodCorrectiveApproval,
    qadPreventiveApproval,
    hodCorrectiveUpdate,
    hodPreventiveUpdate,
    qadEvalutaionUpdate,
    rcaUpdation,
    getAllCurrentLevelApproval,
    highLevelApprovals,
    requestDataCollection,
    getAllInvolvedDepartment,
    getCurrentEmployeeType,
    getDepartmentDataCollection,
    departmentRcaPreventiveSubmission,
    insertDataCollectionMap,
    FetchAllCollectionMap,
    updateDataCollectionMap,
    FetchAllDepartmentType,
    getEmployeeDepartmentType,
    getAllSettings,
    getAllCommonSetting,
    insertCommonSetting,
    updateCommonSetting,
    getAllCommonSettingMapMaster,
    insertCommonSettingMapMaster,
    updateCommonSettingMapMaster,
    getAllDataCollectionCommonSetting,
    insertFishBoneQuestion,
    getFishboneDetails,
    getAllFishBoneAnalysisDetail,
    getAllActiveDeparments,
    getAllHighLevelReview,
    InsertDepartmentAction,
    getAllDepartmentActions,
    getAllActionDetails,
    getDepActions,
    getDeparmentAcknowledge,
    UpdateIncidentReviews,
    UpdateFileStatus,
    IncidentActionMaster,
    IndidentActionMasterUpdate,
    getallMasterActionDetail,
    getAllLevelItemMapDetail,
    InsertLevelItemMapDetail,
    UpdateLevelItemMapDetail,
    getAllLevelItems,
    FetchAllIncidentActionDetail,
    UpdateDepartMentDataCollectionFileStatus,
    getAllCommonLevelDetail,
    UpdateLevelDetiails,
    getAllDashboardIncident,
    getCompanyDetail,
    getAllEmployeeApprovalDepartments,
    getAllCommonLevelDetailMaster,
    submitDepartmentDataCollectionController,
    getAllDepartmentDataCollection,
    IncidentSubCategoryMaster,
    IncidentRegistrationFileUpload,
} = require('./incident.controller');
const { uploadFileIncidentService,
    getIncidentFiles,
    syncFiles,
    getIncidenActiontFiles,
    uploadFileIncidentActionFiles,
    uploadFileIncidentDataCollectionFiles,
    getDataCollectionFiles
} = require("./UploadFile");

router.post('/incidentsave', checkToken, IncidetDetailInsert);
router.patch('/incidentUpdate', checkToken, IncidentDetailsUpdate);
router.patch('/markIncident', checkToken, UpdateMarkedIncidentDetails);
router.post('/search', checkToken, SearchIncidentDetails);
router.post('/apprvcheck', checkToken, IncidentApprovalChecks);
// ipendoscopy
router.post('/ipIncidentSave', checkToken, InpatientIncidetDetailInsert);
router.patch('/ipincidentUpdate', checkToken, InpatientIncidetDetailsUpdate);
//incident category and subcategory master
router.post('/incidentcategoryinsert', checkToken, normalRateLimiter, IncidentCategoryMaster);
router.get('/allcategory', checkToken, normalRateLimiter, getAllIncidentCategory)
router.patch('/incidentcategoryupdate', checkToken, normalRateLimiter, IncidentCategoryUpdate)

router.post('/insertsubcatmast', checkToken, normalRateLimiter, IncidentSubCategoryInsert);
router.get('/getallsubcatmast', checkToken, normalRateLimiter, getAllIncidentSubCategory)
router.patch('/updatesubcatmast', checkToken, normalRateLimiter, IncidentSubCategoryUpdate)
//incident Registartion 
router.post('/getptdetail', checkToken, normalRateLimiter, getPatientDetail);
router.post('/getpssstaff', checkToken, normalRateLimiter, getProfessionalStaff);
router.post('/gethspgstaff', checkToken, normalRateLimiter, getHsPgStaffDetail);
router.post('/getassetdtl', checkToken, normalRateLimiter, getAllassetDtl);

router.post('/incregistration', checkToken, strictRateLimiter, IncidentRegistration);
router.post('/incidentupdation', checkToken, strictRateLimiter, IncidentUpdation);
router.post('/uploadFiles', checkToken, strictRateLimiter, uploadFileIncidentService); //uploading file 
router.post('/uploadActionFiles', checkToken, strictRateLimiter, uploadFileIncidentActionFiles); //uploading file 
router.post('/uploaddatacollectionFiles', checkToken, strictRateLimiter, uploadFileIncidentDataCollectionFiles); //uploading file 

router.post('/getallincident', checkToken, normalRateLimiter, getAllIncidentDetail)
router.get('/getincidentfile/:id', checkToken, strictRateLimiter, getIncidentFiles)// fetch files
router.get('/getincidentactionfile/:id', checkToken, strictRateLimiter, getIncidenActiontFiles)// fetch files
router.get('/getdatacollectionfiles/:id', checkToken, normalRateLimiter, getDataCollectionFiles)// fetch files

router.post('/inchargeapproval', checkToken, strictRateLimiter, InchargeApproval)//not using 
router.post('/hodapproval', checkToken, strictRateLimiter, hodApproval) // not using 
router.post('/qadapproval', checkToken, strictRateLimiter, QadApproval) // not using
router.get('/fetchlevelapproval', checkToken, normalRateLimiter, fetchAllLevelApprovals) // not using but using 
router.post('/insertlevelapproval', checkToken, normalRateLimiter, insertIncidentLevelApproval) // no t using
router.patch('/updatelevelapproval', checkToken, normalRateLimiter, updateIncidentLevelApproval) // not using 
router.patch('/hodrcaapprovals', checkToken, strictRateLimiter, hodRcaApproval) // not using 
router.patch('/qadrcaapprovals', checkToken, strictRateLimiter, qadRcaApproval) // not using 
router.patch('/hodcrctiveapprovals', checkToken, strictRateLimiter, hodCorrectiveApproval) // not uisng 
router.patch('/qadprtvapprovals', checkToken, strictRateLimiter, qadPreventiveApproval)// not using 
router.get('/qadincidents', checkToken, normalRateLimiter, getAllQADIncident) // not using
router.patch('/hodcorrectiveupdate', checkToken, strictRateLimiter, hodCorrectiveUpdate) // not using 
router.patch('/hodpreventiveupdate', checkToken, strictRateLimiter, hodPreventiveUpdate) // not using 
router.patch('/qadevaluationupdate', checkToken, strictRateLimiter, qadEvalutaionUpdate) // not using 
router.post('/hodinchargeaprvl', checkToken, normalRateLimiter, getAllIncidentHodIncharge) // not using
router.patch('/rcaupdation', checkToken, strictRateLimiter, rcaUpdation); // not using 
router.post('/updateIncident', checkToken, strictRateLimiter, UpdateIncidentReviews) // not using

router.post('/fetchcurrentlevelapprvl', checkToken, normalRateLimiter, getAllCurrentLevelApproval);
router.post('/levelapproval', checkToken, strictRateLimiter, highLevelApprovals);
router.post('/reqdatacollection', checkToken, strictRateLimiter, requestDataCollection);
router.post('/getallinvolveddep', checkToken, normalRateLimiter, getAllInvolvedDepartment);
router.post('/getemptype', checkToken, strictRateLimiter, getCurrentEmployeeType);
router.post('/getdepdatacollection', checkToken, strictRateLimiter, getDepartmentDataCollection);
router.post('/departmentactionsubmit', checkToken, strictRateLimiter, departmentRcaPreventiveSubmission);

router.post('/insertdcmm', checkToken, normalRateLimiter, insertDataCollectionMap);
router.post('/getempdeptype', checkToken, normalRateLimiter, getEmployeeDepartmentType);
router.get('/fetchalldcmm', checkToken, normalRateLimiter, FetchAllCollectionMap);
router.patch('/updatedcmm', checkToken, normalRateLimiter, updateDataCollectionMap);

router.get('/getalldeptype', checkToken, normalRateLimiter, FetchAllDepartmentType);
router.get('/getactivesettings', checkToken, normalRateLimiter, getAllSettings);

router.get('/commonsetting', checkToken, normalRateLimiter, getAllCommonSetting);
router.post('/insertcommonsetting', checkToken, normalRateLimiter, insertCommonSetting);
router.patch('/updatecommonsetting', checkToken, normalRateLimiter, updateCommonSetting);

router.get('/getallcsmapmaster', checkToken, normalRateLimiter, getAllCommonSettingMapMaster);
router.post('/insertcsmapmaster', checkToken, normalRateLimiter, insertCommonSettingMapMaster);
router.patch('/updatecsmapmaster', checkToken, normalRateLimiter, updateCommonSettingMapMaster);

router.get('/getdatacollectioncs', checkToken, normalRateLimiter, getAllDataCollectionCommonSetting);
router.post('/insertfishbone', checkToken, strictRateLimiter, insertFishBoneQuestion);
router.post('/getfishbonedetail', checkToken, strictRateLimiter, getFishboneDetails);

router.post('/getallfbadetail', checkToken, strictRateLimiter, getAllFishBoneAnalysisDetail);
router.get('/getallactivedepartment', checkToken, normalRateLimiter, getAllActiveDeparments);
router.post('/gethighlevelreview', checkToken, normalRateLimiter, getAllHighLevelReview);
router.post('/insertdepaction', checkToken, normalRateLimiter, InsertDepartmentAction);
router.post('/getalldepartmentaction', checkToken, normalRateLimiter, getAllDepartmentActions)
router.post('/getactiondetails', checkToken, normalRateLimiter, getAllActionDetails);
router.post('/getdepactions', checkToken, normalRateLimiter, getDepActions);
router.post('/depactionack', checkToken, normalRateLimiter, getDeparmentAcknowledge);

router.post('/updateFileStatus', checkToken, strictRateLimiter, UpdateFileStatus)
router.post('/updateddcfilestatus', checkToken, strictRateLimiter, UpdateDepartMentDataCollectionFileStatus)
router.post('/getlevelitems', checkToken, normalRateLimiter, getAllLevelItems)

// NEW
router.post('/getallincactionreview', checkToken, normalRateLimiter, FetchAllIncidentActionDetail);
// level master
router.post('/insertincactionmast', checkToken, normalRateLimiter, IncidentActionMaster);
router.patch('/updateinctactionmast', checkToken, normalRateLimiter, IndidentActionMasterUpdate)
router.get('/getallactiodetail', checkToken, normalRateLimiter, getallMasterActionDetail)

// level map master
router.get('/getinclevelitemmap', checkToken, normalRateLimiter, getAllLevelItemMapDetail)
router.post('/insertinclevelitemmap', checkToken, normalRateLimiter, InsertLevelItemMapDetail);
router.patch('/updateinclevelitemmap', checkToken, normalRateLimiter, UpdateLevelItemMapDetail)

// Fetching Level Master Detail Common Api for all Modules 
router.post('/common/leveldetail', checkToken, normalRateLimiter, getAllCommonLevelDetail)
router.post('/leveldetailmaster', checkToken, normalRateLimiter, getAllCommonLevelDetailMaster)
router.post('/updatelevelreview', checkToken, normalRateLimiter, UpdateLevelDetiails);

//new 
router.get('/dashboarddata', checkToken, normalRateLimiter, getAllDashboardIncident)
router.get('/getcompany', checkToken, normalRateLimiter, getCompanyDetail)
router.post('/approvaldeps', checkToken, normalRateLimiter, getAllEmployeeApprovalDepartments)


// router.post('/getalldatacollection', checkToken, normalRateLimiter, getAllDepartmentDataCollection)
// router.post('/submitDepartmentDataCollection', checkToken, normalRateLimiter, submitDepartmentDataCollectionController );


module.exports = router;