
const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { IncidetDetailInsert, IncidentDetailsUpdate, UpdateMarkedIncidentDetails, SearchIncidentDetails,
    IncidentApprovalChecks, InpatientIncidetDetailInsert, InpatientIncidetDetailsUpdate,
    IncidentCategoryMaster,
    getAllIncidentCategory,
    IncidentCategoryUpdate,
    IncidentSubCategoryMaster,
    IncidentSubCategoryUpdate,
    getAllIncidentSubCategory,
    IncidentSubCategoryInsert,
    getPatientDetail,
    getProfessionalStaff,
    getHsPgStaffDetail,
    getAllassetDtl,
    IncidentRegistration,
    IncidentRegistrationFileUpload,
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

} = require('./incident.controller');
const { uploadFileIncidentService, getIncidentFiles, syncFiles, getIncidenActiontFiles, uploadFileIncidentActionFiles } = require("./UploadFile");
router.post('/incidentsave', checkToken, IncidetDetailInsert);
router.patch('/incidentUpdate', checkToken, IncidentDetailsUpdate);
router.patch('/markIncident', checkToken, UpdateMarkedIncidentDetails);
router.post('/search', checkToken, SearchIncidentDetails);
router.post('/apprvcheck', checkToken, IncidentApprovalChecks);
// ipendoscopy
router.post('/ipIncidentSave', checkToken, InpatientIncidetDetailInsert);
router.patch('/ipincidentUpdate', checkToken, InpatientIncidetDetailsUpdate);


//incident category and subcategory master
router.post('/incidentcategoryinsert', checkToken, IncidentCategoryMaster);
router.get('/allcategory', checkToken, getAllIncidentCategory)
router.patch('/incidentcategoryupdate', checkToken, IncidentCategoryUpdate)

router.post('/insertsubcatmast', checkToken, IncidentSubCategoryInsert);
router.get('/getallsubcatmast', checkToken, getAllIncidentSubCategory)
router.patch('/updatesubcatmast', checkToken, IncidentSubCategoryUpdate)

//incident Registartion 
router.post('/getptdetail', checkToken, getPatientDetail);
router.post('/getpssstaff', checkToken, getProfessionalStaff);
router.post('/gethspgstaff', checkToken, getHsPgStaffDetail);
router.post('/getassetdtl', checkToken, getAllassetDtl);

router.post('/incregistration', checkToken, IncidentRegistration);
router.post('/incidentupdation', checkToken, IncidentUpdation);
router.post('/uploadFiles', checkToken, uploadFileIncidentService); // uploading file 
router.post('/uploadActionFiles', checkToken, uploadFileIncidentActionFiles); // uploading file 

router.post('/getallincident', checkToken, getAllIncidentDetail)
router.post('/hodinchargeaprvl', checkToken, getAllIncidentHodIncharge)
router.get('/getincidentfile/:id', checkToken, getIncidentFiles)
router.get('/getincidentactionfile/:id', checkToken, getIncidenActiontFiles)

router.post('/inchargeapproval', checkToken, InchargeApproval)
router.post('/hodapproval', checkToken, hodApproval)
router.post('/qadapproval', checkToken, QadApproval)

//incident level masters
router.get('/fetchlevelapproval', checkToken, fetchAllLevelApprovals)
router.post('/insertlevelapproval', checkToken, insertIncidentLevelApproval)
router.patch('/updatelevelapproval', checkToken, updateIncidentLevelApproval)
router.get('/qadincidents', checkToken, getAllQADIncident)
router.patch('/hodrcaapprovals', checkToken, hodRcaApproval)

router.patch('/qadrcaapprovals', checkToken, qadRcaApproval)
router.patch('/hodcrctiveapprovals', checkToken, hodCorrectiveApproval)
router.patch('/qadprtvapprovals', checkToken, qadPreventiveApproval)

router.patch('/hodcorrectiveupdate', checkToken, hodCorrectiveUpdate)
router.patch('/hodpreventiveupdate', checkToken, hodPreventiveUpdate)
router.patch('/qadevaluationupdate', checkToken, qadEvalutaionUpdate)

router.patch('/rcaupdation', checkToken, rcaUpdation);

router.post('/fetchcurrentlevelapprvl', checkToken, getAllCurrentLevelApproval);
router.post('/levelapproval', checkToken, highLevelApprovals);
router.post('/reqdatacollection', checkToken, requestDataCollection);
router.post('/getallinvolveddep', checkToken, getAllInvolvedDepartment);
router.post('/getemptype', checkToken, getCurrentEmployeeType);
router.post('/getdepdatacollection', checkToken, getDepartmentDataCollection);
router.post('/departmentactionsubmit', checkToken, departmentRcaPreventiveSubmission);

router.post('/insertdcmm', checkToken, insertDataCollectionMap);
router.post('/getempdeptype', checkToken, getEmployeeDepartmentType);
router.get('/fetchalldcmm', checkToken, FetchAllCollectionMap);
router.patch('/updatedcmm', checkToken, updateDataCollectionMap);

router.get('/getalldeptype', checkToken, FetchAllDepartmentType);
router.get('/getactivesettings', checkToken, getAllSettings);

router.get('/commonsetting', checkToken, getAllCommonSetting);
router.post('/insertcommonsetting', checkToken, insertCommonSetting);
router.patch('/updatecommonsetting', checkToken, updateCommonSetting);

router.get('/getallcsmapmaster', checkToken, getAllCommonSettingMapMaster);
router.post('/insertcsmapmaster', checkToken, insertCommonSettingMapMaster);
router.patch('/updatecsmapmaster', checkToken, updateCommonSettingMapMaster);

router.get('/getdatacollectioncs', checkToken, getAllDataCollectionCommonSetting);
router.post('/insertfishbone', checkToken, insertFishBoneQuestion);
router.post('/getfishbonedetail', checkToken, getFishboneDetails);

router.post('/getallfbadetail', checkToken, getAllFishBoneAnalysisDetail);
router.get('/getallactivedepartment', checkToken, getAllActiveDeparments);
router.post('/gethighlevelreview', checkToken, getAllHighLevelReview);
router.post('/insertdepaction', checkToken, InsertDepartmentAction);
router.post('/getalldepartmentaction', checkToken, getAllDepartmentActions)
router.post('/getactiondetails', checkToken, getAllActionDetails);
router.post('/getdepactions', checkToken, getDepActions);
router.post('/depactionack', checkToken, getDeparmentAcknowledge);


router.post('/updateIncident', checkToken, UpdateIncidentReviews)
router.post('/updateFileStatus', checkToken, UpdateFileStatus)

module.exports = router;