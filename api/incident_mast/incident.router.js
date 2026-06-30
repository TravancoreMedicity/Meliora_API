
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
    fetchAllInvolvedEmployeeDep,
    getAllDataCollectionEmployeeDetail,
    insertDataCollectionEmployeeDetail,
    updateDataCollectionEmployeeDetail,
    getAllActiveDataCollectionEmployeeDetail,
    getAllIncidentNature,
    insertIncidentNature,
    updateIncidentNature,
    getIncidentFromDashboard,
    getIncidentInitiator,
    getAllPgHsStaffDetail,
    getStartNewConverstion,
    getConversation,
    sendConversationMessage,
    getConversationMessages,
    getExternalEmployeeConversations,
    fetchMergedConversationMessages,
    DeletemessageDetail,
    EditMessageDetail,
    deleteConversationAttachment,
    getConversationEmployees,
    RemoveConversationMember,
    AddNewMembertoGroup,
    GetLastMessageId,
    GetConverstaionUnreadCount,
    MarkConverSationAsRead,
    getAllUnreadCount,
    insertWhatsappController,
    getWhatsappController,
    updateWhatsappController,
    getCurrentEmployeeLevelOne,
    insertEventController,
    getEventController,
    updateEventController,
    insertNotificationConfigController,
    getNotificationConfigController,
    updateNotificationConfigController,
} = require('./incident.controller');
const { uploadFileIncidentService,
    getIncidentFiles,
    getIncidenActiontFiles,
    uploadFileIncidentActionFiles,
    uploadFileIncidentDataCollectionFiles,
    getDataCollectionFiles,
    uploadChatConversationFiles
} = require("./UploadFile");



//incident category and subcategory master
router.post('/incidentcategoryinsert', normalRateLimiter, checkToken, IncidentCategoryMaster);
router.get('/allcategory', normalRateLimiter, checkToken, getAllIncidentCategory);
router.patch('/incidentcategoryupdate', normalRateLimiter, checkToken, IncidentCategoryUpdate);

router.post('/insertsubcatmast', normalRateLimiter, checkToken, IncidentSubCategoryInsert);
router.get('/getallsubcatmast', normalRateLimiter, checkToken, getAllIncidentSubCategory);
router.patch('/updatesubcatmast', normalRateLimiter, checkToken, IncidentSubCategoryUpdate);


//incident Registartion 
router.post('/getptdetail', normalRateLimiter, checkToken, getPatientDetail);
router.post('/getassetdtl', normalRateLimiter, checkToken, getAllassetDtl);


router.post('/getpssstaff', normalRateLimiter, checkToken, getProfessionalStaff);
router.post('/gethspgstaff', normalRateLimiter, checkToken, getHsPgStaffDetail);
//fetch all pghs 
router.get("/fetchallpghs", normalRateLimiter, checkToken, getAllPgHsStaffDetail);


router.post('/incregistration', normalRateLimiter, checkToken, IncidentRegistration);
router.post('/incidentupdation', normalRateLimiter, checkToken, IncidentUpdation);
router.post('/uploadFiles', normalRateLimiter, checkToken, uploadFileIncidentService); //uploading file 
router.post('/uploadActionFiles', normalRateLimiter, checkToken, uploadFileIncidentActionFiles); //uploading file 
router.post('/uploaddatacollectionFiles', normalRateLimiter, checkToken, uploadFileIncidentDataCollectionFiles); //uploading file 
router.post('/uploadchatconv', normalRateLimiter, checkToken, uploadChatConversationFiles); //uploading file 

router.post('/getallincident', normalRateLimiter, checkToken, getAllIncidentDetail)
router.get('/getincidentfile/:id', normalRateLimiter, checkToken, getIncidentFiles)// fetch files
router.get('/getincidentactionfile/:id', normalRateLimiter, checkToken, getIncidenActiontFiles)// fetch files
router.get('/getdatacollectionfiles/:id', normalRateLimiter, checkToken, getDataCollectionFiles)// fetch files

router.post('/fetchcurrentlevelapprvl', normalRateLimiter, checkToken, getAllCurrentLevelApproval);
router.post('/levelapproval', normalRateLimiter, checkToken, highLevelApprovals);
router.post('/reqdatacollection', normalRateLimiter, checkToken, requestDataCollection);
router.post('/getallinvolveddep', normalRateLimiter, checkToken, getAllInvolvedDepartment);
router.post('/getallinvolveddepemp', normalRateLimiter, checkToken, fetchAllInvolvedEmployeeDep);
router.post('/getemptype', normalRateLimiter, checkToken, getCurrentEmployeeType);
router.post('/getdepdatacollection', normalRateLimiter, checkToken, getDepartmentDataCollection);
router.post('/departmentactionsubmit', normalRateLimiter, checkToken, departmentRcaPreventiveSubmission);

router.post('/insertdcmm', normalRateLimiter, checkToken, insertDataCollectionMap);
router.get('/fetchalldcmm', normalRateLimiter, checkToken, FetchAllCollectionMap);
router.patch('/updatedcmm', normalRateLimiter, checkToken, updateDataCollectionMap);

router.get('/getalldeptype', normalRateLimiter, checkToken, FetchAllDepartmentType);
router.get('/getactivesettings', normalRateLimiter, checkToken, getAllSettings);

router.get('/commonsetting', normalRateLimiter, checkToken, getAllCommonSetting);
router.post('/insertcommonsetting', normalRateLimiter, checkToken, insertCommonSetting);
router.patch('/updatecommonsetting', normalRateLimiter, checkToken, updateCommonSetting);

router.get('/getallcsmapmaster', normalRateLimiter, checkToken, getAllCommonSettingMapMaster);
router.post('/insertcsmapmaster', normalRateLimiter, checkToken, insertCommonSettingMapMaster);
router.patch('/updatecsmapmaster', normalRateLimiter, checkToken, updateCommonSettingMapMaster);

router.get('/getdatacollectioncs', normalRateLimiter, checkToken, getAllDataCollectionCommonSetting);
router.post('/insertfishbone', normalRateLimiter, checkToken, insertFishBoneQuestion);
router.post('/getfishbonedetail', normalRateLimiter, checkToken, getFishboneDetails);

router.post('/getallfbadetail', normalRateLimiter, checkToken, getAllFishBoneAnalysisDetail);
router.get('/getallactivedepartment', normalRateLimiter, checkToken, getAllActiveDeparments);
router.post('/gethighlevelreview', normalRateLimiter, checkToken, getAllHighLevelReview);
router.post('/insertdepaction', normalRateLimiter, checkToken, InsertDepartmentAction);
router.post('/getalldepartmentaction', normalRateLimiter, checkToken, getAllDepartmentActions)
router.post('/getactiondetails', normalRateLimiter, checkToken, getAllActionDetails);
router.post('/getdepactions', normalRateLimiter, checkToken, getDepActions);
router.post('/depactionack', normalRateLimiter, checkToken, getDeparmentAcknowledge);

router.post('/updateFileStatus', normalRateLimiter, checkToken, UpdateFileStatus)
router.post('/updateddcfilestatus', normalRateLimiter, checkToken, UpdateDepartMentDataCollectionFileStatus)
router.post('/getlevelitems', normalRateLimiter, checkToken, getAllLevelItems)

// NEW
router.post('/getallincactionreview', normalRateLimiter, checkToken, FetchAllIncidentActionDetail);
// level master
router.post('/insertincactionmast', normalRateLimiter, checkToken, IncidentActionMaster);
router.patch('/updateinctactionmast', normalRateLimiter, checkToken, IndidentActionMasterUpdate)
router.get('/getallactiodetail', normalRateLimiter, checkToken, getallMasterActionDetail)

// level map master
router.get('/getinclevelitemmap', normalRateLimiter, checkToken, getAllLevelItemMapDetail)
router.post('/insertinclevelitemmap', normalRateLimiter, checkToken, InsertLevelItemMapDetail);
router.patch('/updateinclevelitemmap', normalRateLimiter, checkToken, UpdateLevelItemMapDetail)

// Fetching Level Master Detail Common Api for all Modules 
router.post('/common/leveldetail', normalRateLimiter, checkToken, getAllCommonLevelDetail)
router.post('/leveldetailmaster', normalRateLimiter, checkToken, getAllCommonLevelDetailMaster)
router.post('/updatelevelreview', normalRateLimiter, checkToken, UpdateLevelDetiails);

//new 
router.get('/dashboarddata', normalRateLimiter, checkToken, getAllDashboardIncident)
router.get('/getcompany', normalRateLimiter, checkToken, getCompanyDetail)
router.post('/approvaldeps', normalRateLimiter, checkToken, getAllEmployeeApprovalDepartments)
router.post('/insertDcEmpMap', normalRateLimiter, checkToken, insertDataCollectionEmployeeDetail)
router.get('/getalldatacollectionemp', normalRateLimiter, checkToken, getAllDataCollectionEmployeeDetail)
router.post('/getallactiveDcEmp', normalRateLimiter, checkToken, getAllActiveDataCollectionEmployeeDetail)
router.patch('/updateDcEmpMap', normalRateLimiter, checkToken, updateDataCollectionEmployeeDetail)

router.get('/getallincnature', normalRateLimiter, checkToken, getAllIncidentNature)
router.post('/insertNature', normalRateLimiter, checkToken, insertIncidentNature)
router.patch('/updateNature', normalRateLimiter, checkToken, updateIncidentNature)


router.post('/getincidentcommon', normalRateLimiter, checkToken, getIncidentFromDashboard)

router.post('/initiator', normalRateLimiter, checkToken, getIncidentInitiator)

router.post('/firstlevel', normalRateLimiter, checkToken, getCurrentEmployeeLevelOne)



// chat starts here
router.post('/start-conversation', normalRateLimiter, checkToken, getStartNewConverstion)

router.post(
    '/get-conversation',
    normalRateLimiter,
    checkToken,
    getConversation
);

router.post(
    '/send-message',
    checkToken,
    sendConversationMessage
);

router.post(
    '/get-conversation-messages',
    checkToken,
    getConversationMessages
);

router.post(
    '/exteranl-get-conversation',
    normalRateLimiter,
    checkToken,
    getExternalEmployeeConversations
);


router.post(
    '/merged-conversation-messages',
    checkToken,
    fetchMergedConversationMessages
);



router.get(
    '/delete-messages/:id',
    normalRateLimiter,
    checkToken,
    DeletemessageDetail
);
router.post(
    '/edit-messages',
    normalRateLimiter,
    checkToken,
    EditMessageDetail
);


router.post(
    '/delete-message-attachment/:attachment_id',
    normalRateLimiter,
    checkToken,
    deleteConversationAttachment
);

router.get(
    '/conversation-employees/:conversation_id',
    normalRateLimiter,
    checkToken,
    getConversationEmployees
);

router.patch(
    '/conversation-member/remove/:conversation_id/:emp_id',
    normalRateLimiter,
    checkToken,
    RemoveConversationMember
);


router.post(
    '/conversation-member/addmember',
    normalRateLimiter,
    checkToken,
    AddNewMembertoGroup
);

router.get(
    '/last-message/:conversation_id',
    checkToken,
    GetLastMessageId
);


router.get(
    '/unread-message/:empId',
    checkToken,
    GetConverstaionUnreadCount
);

router.post(
    '/mark-message-read',
    checkToken,
    MarkConverSationAsRead
);


router.get(
    '/all-unread-message/:empId',
    checkToken,
    getAllUnreadCount
);


router.post('/insert-inc-whatsapp',
    normalRateLimiter,
    checkToken,
    insertWhatsappController)


router.get('/getall-inc-whatsapp',
    normalRateLimiter,
    checkToken,
    getWhatsappController)



router.patch('/update-inc-whatsapp',
    normalRateLimiter,
    checkToken,
    updateWhatsappController)


router.post(
    '/insert-inc-event',
    normalRateLimiter,
    checkToken,
    insertEventController
);

router.get(
    '/getall-inc-event',
    normalRateLimiter,
    checkToken,
    getEventController
);

router.patch(
    '/update-inc-event',
    normalRateLimiter,
    checkToken,
    updateEventController
);

router.post(
    '/insert-inc-notification-config',
    normalRateLimiter,
    checkToken,
    insertNotificationConfigController
);

router.get(
    '/getall-inc-notification-config',
    normalRateLimiter,
    checkToken,
    getNotificationConfigController
);

router.patch(
    '/update-inc-notification-config',
    normalRateLimiter,
    checkToken,
    updateNotificationConfigController
);

/**
 * 
 * 
 * 
 * 
 * API CURRENTLY NOT USING 
 * THIS BELOW API ARE CREATED BASED ON PREVIOUSE REQUIUREMENTS BUT CURRENT NOT USING.
 * ONLY AFTER RECHECKING EVERYTHING THIS WOULD BE REMOVE FOR SAFETY PURPOSE AND DATA CONSISTENCY
 * 
 * 
 * */
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
router.post('/getempdeptype', checkToken, normalRateLimiter, getEmployeeDepartmentType);//not using

// PREVIOUS DEV ROUTES
router.post('/incidentsave', checkToken, IncidetDetailInsert);
router.patch('/incidentUpdate', checkToken, IncidentDetailsUpdate);
router.patch('/markIncident', checkToken, UpdateMarkedIncidentDetails);
router.post('/search', checkToken, SearchIncidentDetails);
router.post('/apprvcheck', checkToken, IncidentApprovalChecks);
// ipendoscopy
router.post('/ipIncidentSave', checkToken, InpatientIncidetDetailInsert);
router.patch('/ipincidentUpdate', checkToken, InpatientIncidetDetailsUpdate);


module.exports = router;