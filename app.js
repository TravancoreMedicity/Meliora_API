// Outside Environment File for the configuration Credential
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./logger/logger");
const http = require("http");
const socketUtils = require("./socketio/socketUltil");
const cookieParser = require("cookie-parser");
// const lusca = require('lusca')

const app = express();
const fs = require("fs");

//sockect io configuration

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(lusca.csrf());

const allowedOrigins = [
  "http://192.168.10.88:9741",
  "http://192.168.10.88:9742",
  "https://192.168.10.88:9742",
  "https://travancoremedicity.in:9742",
  "http://travancoremedicity.in:9741",
  "http://192.168.10.88:3000",
  "http://tm.medicity.co.in:8888",
  "http://192.168.10.88:8888",
  "http://localhost:3002",
  "http://192.168.22.9:3000",
  "http://195.168.34.25:3001",
  "http://195.168.34.25:3000",
  "http://192.168.22.170:3000",
  "http://192.168.22.5:3000",
  "http://192.168.22.8:3000",
];



// Dynamically allow based on Origin
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// ----- logger display For Info ----
app.get("/info", (req, res) => {
  fs.readFile("./errorlog/info.log", (error, txtString) => {
    if (error) throw err;
    res.write(
      '<div id="content"><pre>' +
      txtString.toString().replace(/\n/g, "<br />") +
      "</pre>"
    );
    res.end();
  });
});
// ----- logger display For err ----
app.get("/error", (req, res) => {
  fs.readFile("./errorlog/error.log", (error, txtString) => {
    if (error) throw err;
    res.write(
      '<div id="content"><pre>' +
      txtString.toString().replace(/\n/g, "<br />") +
      "</pre>"
    );
    res.end();
  });
});

// ----- logger display For ward ----
app.get("/warn", (req, res) => {
  fs.readFile("./errorlog/warn.log", (error, txtString) => {
    if (error) throw err;
    res.write(
      '<div id="content"><pre>' +
      txtString.toString().replace(/\n/g, "<br />") +
      "</pre>"
    );
    res.end();
  });
});

const server = http.createServer(app);
const io = socketUtils.WSIO(server);
socketUtils.connection(io);

const socketIOMiddlewre = (req, res, next) => {
  req.io = io;
  next();
};


const userRouter = require("./api/user/user.router");
const employeeRouter = require("./api/employee/employee.router");
const usergroupRouter = require("./api/usergroup/usergroup.router");
const userrightsRouter = require("./api/module_user_right/userRight.router");
const deptmaster = require("./api/co_departmentmaster/department.router");
const deptsecmaster = require("./api/co_deptsectionmaster/deptsection.router");
const complaintDeptRouter = require("./api/cm_complaintdepartment/complaintdept.router");
const complainttypeRouter = require("./api/cm_complaintype/complainttype.router");
const hicpolicyRouter = require("./api/cm_hicpolicy/hicpolicy.router");
const assettypeRouter = require("./api/assettype/assettype.router");
const requesttypeRouter = require("./api/co_requesttype/requesttype.router");
const menumasterRouter = require("./api/menu_master/menuMaster.router");
const modulemasterRouter = require("./api/module_master/moduleMaster.router");
const modulegroupRouter = require("./api/module_group_mast/moduleGroup.router");
const commonRouter = require("./api/commoncode/common.router");
const usergrouprightsRouter = require("./api/user_group_right/groupRight.router");
const ModuleGroupRight = require("./api/module_group_right/modGroupRight.router");
const complaintregRouter = require("./api/complaint_master/complaintRegist.router");
const buildingRouter = require("./api/rm_buildingmast/building.router");
const floorRouter = require("./api/rm_floormast/floor.router");
const roomtypeRouter = require("./api/rm_roomtype/roomtype.router");
const dietRouter = require("./api/diet/diet.router");
const diettypeRouter = require("./api/diettype/diettype.router");
const roomcreationRouter = require("./api/rm_roomcreation/roomcreation.router");
const subroomcreationRouter = require("./api/rm_subroomcreation/subroom.router");
const dietMenudtlRouter = require("./api/dietmenusettingdetail/dietmenudetl.router");
const ratelistRouter = require("./api/ratelist/ratelist.router");
const itemgroupRouter = require("./api/item_group/itemgroup.router");
const kotitemRouter = require("./api/kot_item_master/kotitem.router");
const dietmenuprocessRouter = require("./api/diet_process_mast/dietprocess.router");
const dietplanRouter = require("./api/diet_plan_master/dietplan.router");
const dietorderRouter = require("./api/diet_order_list/dietOrder.router");
const dietdetlRouter = require("./api/Dietdetl/dietdetl.router");
const extraorderRouter = require("./api/dietextraorder/extraorder.router");
const deliveryRouter = require("./api/diet_delivery_mark/deliverymark.router");
const nurseStationRouter = require("./api/co_nursestation/nursestation.router");
const complaintassignRouter = require("./api/complaint_assign/complaintAssign.router");
const Rectifycomplit = require("./api/Rectifycomplit/Rectifycomplit.router");
const Wework = require("./api/WeWork/WeWork.router");
const dietReport = require("./api/diet_report/diet_report.router");
const cmdashboardRouter = require("./api/complaint_dashboard/cmDashboard.router");
const directcmregRouter = require("./api/cm_directcomplaintRegister/directcmReg.router");
const getHrmDatas = require("./api/hrm_data_get/data_get_insert.router");
const weworkdashboard = require("./api/WeworkDashboard/Wework.router");
const escalationRouter = require("./api/co_escalationtimemast/escalationtime.router");
const TimeescalationRouter = require("./api/time_escalation/timeescalation.router");
const EscalationmappingRouter = require("./api/co_escalationmapping/escalationmapping.router");
const TimeescalationRouter2 = require("./api/time_escalation2/time_esclvl2.router");
const TimeescalationRouter3 = require("./api/time_escalation3/time_esclvl3.router");
const TimeescalationRouter4 = require("./api/time_escalation4/time_esclvl4.router");
const TimeescalationToplvlRouter = require("./api/time_escalationToplvl/time_esctop.router");
const highantibiotic = require("./api/HighAntiBioticMaster/HighAntiBiotic.router");
const WeEmpMapping = require("./api/WeEmpMapping/WeEmpMapping.router");
const dietDashboard = require("./api/diet_dashboard/diet_dashboard.router");
const requestRegister = require("./api/crm_request_register/requestRegister.router");
const hallBookingRouter = require("./api/hall_booking/hallBooking.router");
const hallmaster = require("./api/HallMaster/Hallmaster.router");
const ndrfgRouter = require("./api/ndrf_request/ndrfrequest.router");
const fileUpload = require("./api/fileupload/fileupload.router");
const HicComplaint = require("./api/complaint_hic/complaintHic.router");
const omtableMast = require("./api/om_table_mast/omTableMast.router");
const omEmpMapping = require("./api/om_emp_mapping/omEmpMap.router");
const comEmpMapping = require("./api/com_emp_mapping/com_emp_mapping.router");
const compriority = require("./api/cm_prority_mst/cm_priority.router");
const campus = require("./api/rm_campus_master/campus_mast.router");
const building = require("./api/rm_building_master/building_mast.router");
const buildblock = require("./api/rm_buildblock_master/buildblock.router");
const insidebuildblock = require("./api/rm_insidebuilblock_master/insidebuildblock.router");
const floormaster = require("./api/rm_floor_master/floor_mast.router");
const roomcategory = require("./api/rm_room_category_master/room_category.router");
const roomtype = require("./api/rm_room_type_master/room_type.router");
const selectComponent = require("./api/rm_selectCompnents/select.router");
const floorcreation = require("./api/rm_floor_creation/rm_floor.router");
const roomnewcreation = require("./api/rm_roomnew_creation/rm_newroom.router");
const assettypee = require("./api/am_asset_type/am_asset_type.router");
const itemtype = require("./api/am_item_type/item_type.router");
const amcategory = require("./api/am_category/am_category.router");
const subcategory = require("./api/am_subcategory/am_subcategory.router");
const group = require("./api/am_group/am_group.router");
const subgroup = require("./api/am_sub_group/sub_group.router");
const manufacture = require("./api/am_manufacture/manufacture.router");
const complaintMobileapp = require("./api/cm_complaint_mobapp/cmmobapp.router");
const dashBoardData = require("./api/rm_dashboard/dashboard.router");
const getTatReports = require("./api/cms_reports/cms_report.router");
const amSelectComponent = require("./api/am_selectcomponents/select.router");
const primaryCustodian = require("./api/am_primary_custodian/primary.router");
const secondaryCustodian = require("./api/am_secondary_custodian/secondary.router");
const itemNameCreation = require("./api/am_item_name_creation/item.router");
const unitOfMeasurement = require("./api/am_uom/uom.router");
const model = require("./api/am_model/model.router");
const submodel = require("./api/am_submodel/sumodel.router");
const scheduletype = require("./api/it_scheduletypemast/scheduletype.router");
const scheduletime = require("./api/it_scheduletimemast/scheduletimemast.router");
const backupdetails = require("./api/it_backup_detailsmast/backupDetails.router");
const backupverify = require("./api/it_backup_verification/backupVerification.router");
const backupdashboard = require("./api/it_backupdashboard/backupdash.router");
const simType = require("./api/it_sim_type_master/sim_type.router");
const itSelectcomponent = require("./api/it_select_components/devicetypeSelect.router");
const communicationDeviceDetails = require("./api/it_communication_device_details/communication.router");
// const tarrifDetails = require('./api/it_tarrif/tarriffDetails.router')
const wifiManagement = require("./api/it_wifi_management/wifi.router");
const itemCreationDeptmap = require("./api/am_Item_creation_mast/item_creation_mast.router");
const CustodianDeptMast = require("./api/am_custodian_department/am_custodian_dept.router");
const ItemMapDetails = require("./api/am_item_creation_detail/am_itemdetail.router");
// const CrfImageUpload = require('./api/crf_fileupload/crf_fileupload.router')
const IiImageUpload = require("./api/it_managemnt_file_upload/it_file_upload.router");
const PasswordManagementMain = require("./api/it_password_management/password_management.router");
const PasswordCredentialType = require("./api/it_password_credential_type_master/password_credential.router");
const assetRackMast = require("./api/am_rack_master/am_rack.router");
const assetDeptTransfer = require("./api/am_asset_dept_transfer/asset_depttransfer.router");
const taskManagement = require("./api/tm_task_management/taskmanagement.router");
const TmFileUpload = require("./api/tm_task_file_upload/task_file_upload.router");
const TmTableView = require("./api/tm_task_views/tmview.router");
const TmDropDowns = require("./api/tm_dropdowns/tm_list.router");
const subRoomMaster = require("./api/rm_newsubroom_mast/rm_newsubroom_mast.router");
const crfDashBoard = require("./api/crf_dashboards/crfdashboard.router");
const amReport = require("./api/am_reports/am_reports.router");
const crmEmergncyType = require("./api/crm_emergncytype_mast/emergncy_tpe.router");
const assetInternalTrans = require("./api/am_asset_internaltrans/asset_internaltrans.router");
const qltyindicator = require("./api/qi_master/qltyIndicator.router");
const dailycensus = require("./api/qi_daily_census/daily_census.router");
const censusNursMast = require("./api/qicensusnursing_mast/census_nursing.router");
const TmReport = require("./api/tm_reports/tmreports.router");
const newCRFRegister = require("./api/crm_newrequest_registration/newRequestRegister.router");
const newCRFRegisterImages = require("./api/crm_new_file_upload/crm_fileupload.router");
const CRFRegisterApproval = require("./api/crm_req_approval/crmreq_approval.router");
const newCRFPurchase = require("./api/crm_new_purchase/crm_purchase.router");
const InchHODAuthorization = require("./api/co_inchhod_authriztn/inchhod_authoriztn.router");
const billCategory = require("./api/it_bill_category_master/bill_category.router");
const billType = require("./api/it_bill_type_master/bill_type.router");
const ItSimType = require("./api/it_select_components/devicetypeSelect.router");
const ItBillType = require("./api/it_select_components/devicetypeSelect.router");
const ItBillCategory = require("./api/it_select_components/devicetypeSelect.router");
const ItBillAdd = require("./api/it_bill_management/bill.router");
const ItBillVieww = require("./api/it_bill_vieww/bill_view.router");
const ItBillSuppDetails = require("./api/it_bill_supplier_detail_master/supp_detail.router");
const ItBillSupplierList = require("./api/it_select_components/devicetypeSelect.router");
const qideptmast = require("./api/qi_dept_mast/qi_dept.router");
const qiendoscopy = require("./api/qi_dailydetailsEndoscopy/qi_daily.router");
const newCRFStore = require("./api/crm_store_functns/crm_store.router");
const incidentMast = require("./api/incident_mast/incident.router");
const emergencyqi = require("./api/qi_dailydetailsEmergency/qi_emergency.router");
const qitypeList = require("./api/qi_list_type_mast/list_type.router");
const dialysisqi = require("./api/qi_dailydetailsDialysis/qi_dialysis.router");
const CrmNewApprovals = require("./api/crm_new_approvals/newReqApprovalsList.router");
const TmAllDeptTask = require("./api/tm_all_dept_task/tmalldept.router");
const AssetFileUpload = require("./api/am_file_upload/am_fileupload.router");
const qiEquipment = require("./api/qi_equipment_mast/equipment.router");
const TmGraph = require("./api/tm_graph_charts/tm_graph.router");
const qiInpatients = require("./api/qi_detailsIP/qi_ip.router");
const CrfReports = require("./api/crm_reports/crm_reports.router");
const SpareCondemService = require("./api/am_spare_condemnation/am_spare_condemnation.router");
const opAseessment = require("./api/qi_initial_assessment_details/assessment.router");
const feedbackdata = require("./api/feedback_module/feedback.router");
const qideptAccess = require("./api/qi_dept_access_mast/dept_access_router");
const complaintFileUpload = require("./api/cm_file_upload/cm_file_upload.router");
const complaintHoldReason = require("./api/cm_complaint_hold_reason_mast/hold_reason.router");
const assetSpareDetails = require("./api/am_spare_service_details/spare_service_details.router");
const AmServiceFileUpload = require("./api/am_asset_serviced_file_upload/service_file_upload.router");
const Amdashboard = require("./api/am_dashboard/am_dashboard.router");
const Ticketdashboard = require("./api/cm_dashboard/cm_dashboard.router");
const med_vallet_master = require("./api/med_vallet/med_vallet.router");
const mv_vehicle_registration = require("./api/mv_vehicle_registration/mv_vehicle.router");
const userRegistration = require("./api/usermanagement/user.router");
const feedbackforms = require("./api/Feedback/Feedback.router");
const backuptypemast = require("./api/it_backup_type_master/backup_type.router");
const simOperators = require("./api/it_sim_operators/sim_operators.router");
const notificationMenu = require("./api/notificationMenu/notification.router");
const { validateAccessToken, } = require("./api/tokenValidation/tokenValidation");
const AssetCondemnation = require("./api/am_condem_details/am_condem.router");
const condemApprovalLevel = require('./api/am_asset_condem_approval_level_mast/approval_level_mast.router')
const { validateTokenFrontend } = require("./authentication/ValidationCheck");
const crfDeliveryMarking = require("./api/crm_delivery_marking/delivery_marking_router");
const companyMast = require("./api/crm_company_mast/company.router");
const crmDashboard = require("./api/crm_dashboard/crmDasboard.router");
const approvalMapping = require("./api/crm_approval_mapping/approval.router");
const amsAntibiotic = require("./api/ams_antibiotic/ams.router");
const validateAuthentication = require("./api/validate_authentication/employeeData.router");
const melioraDepMaster = require("./api/Meliora_department_master/meliora_dep_master.router");
const ContractMaster = require("./api/contract_master/contract.router");
const condemMasters = require('./api/am_condemnation_master/condem_master.router')


app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
  // console.log(req);
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

// Outside Route Config
app.use("/api/user", userRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/usergroup", usergroupRouter);
app.use("/api/modulemaster", modulemasterRouter);
app.use("/api/menumaster", menumasterRouter);
app.use("/api/modulegroup", modulegroupRouter);
app.use("/api/userrights", userrightsRouter);
app.use("/api/usergroup/rights", usergrouprightsRouter);
app.use("/api/modulegroupright", ModuleGroupRight);
app.use("/api/deptmaster", deptmaster);
app.use("/api/deptsecmaster", deptsecmaster);
app.use("/api/complaintdept", complaintDeptRouter);
app.use("/api/complainttype", complainttypeRouter);
app.use("/api/hicpolicy", hicpolicyRouter);
app.use("/api/assettype", assettypeRouter);
app.use("/api/requesttype", requesttypeRouter);
app.use("/api/common", commonRouter);
app.use("/api/complaintreg", socketIOMiddlewre, complaintregRouter);
app.use("/api/building", buildingRouter);
app.use("/api/roomtype", roomtypeRouter);
app.use("/api/roomcreation", roomcreationRouter);
app.use("/api/subroomcreation", subroomcreationRouter);
app.use("/api/floor", floorRouter);
app.use("/api/diet", dietRouter);
app.use("/api/diettype", diettypeRouter);
app.use("/api/ratelist", ratelistRouter);
app.use("/api/itemgrp", itemgroupRouter);
app.use("/api/kotitem", kotitemRouter);
app.use("/api/dietprocess", dietmenuprocessRouter);
app.use("/api/dietplan", dietplanRouter);
app.use("/api/dietorder", dietorderRouter);
app.use("/api/dietmenudtl", dietMenudtlRouter);
app.use("/api/dietdetl", dietdetlRouter);
app.use("/api/extraorder", extraorderRouter);
app.use("/api/delivery", deliveryRouter);
app.use("/api/nursestation", nurseStationRouter);
app.use("/api/complaintassign", socketIOMiddlewre, complaintassignRouter);
app.use("/api/Rectifycomplit", socketIOMiddlewre, Rectifycomplit);
app.use("/api/WeWork", Wework);
app.use("/api/dietReport", dietReport);
app.use("/api/cmdashboard", cmdashboardRouter);
app.use("/api/directcmreg", directcmregRouter);
app.use("/api/hrmdataGet", getHrmDatas);
app.use("/api/wewrkdash", weworkdashboard);
app.use("/api/escalation", escalationRouter);
app.use("/api/timeescalation", TimeescalationRouter);
app.use("/api/escalationmaping", EscalationmappingRouter);
app.use("/api/timeescalation2", TimeescalationRouter2);
app.use("/api/timeescalation3", TimeescalationRouter3);
app.use("/api/timeescalation4", TimeescalationRouter4);
app.use("/api/timeescalationtoplvl", TimeescalationToplvlRouter);
app.use("/api/highBioticMast", highantibiotic);
app.use("/api/weEmpMap", WeEmpMapping);
app.use("/api/dietDashboard", dietDashboard);
app.use("/api/requestRegister", requestRegister);
app.use("/api/hallBooking", hallBookingRouter);
app.use("/api/hallmaster", hallmaster);
app.use("/api/ndrf", ndrfgRouter);
app.use("/api/fileupload", fileUpload);
app.use("/api/Hic", HicComplaint);
app.use("/api/omtableMast", omtableMast);
app.use("/api/omempmapping", omEmpMapping);
app.use("/api/comempmapping", comEmpMapping);
app.use("/api/compriority", compriority);
app.use("/api/campus", campus);
app.use("/api/building", building);
app.use("/api/buildblock", buildblock);
app.use("/api/insidebuildblock", insidebuildblock);
app.use("/api/floormaster", floormaster);
app.use("/api/roomcategory", roomcategory);
app.use("/api/roomtypeMaster", roomtype);
app.use("/api/selectComponent", selectComponent);
app.use("/api/floorcreation", floorcreation);
app.use("/api/roomnewcreation", roomnewcreation);
app.use("/api/assettypee", assettypee);
app.use("/api/itemType", itemtype);
app.use("/api/amcategory", amcategory);
app.use("/api/subcategory", subcategory);
app.use("/api/amgroup", group);
app.use("/api/subgroup", subgroup);
app.use("/api/manufacture", manufacture);
app.use("/api/mobileapp", complaintMobileapp);
app.use("/api/getDashboardData", dashBoardData);
app.use("/api/getTatReports", getTatReports);
app.use("/api/amSelectComponent", amSelectComponent);
app.use("/api/primaryCustodian", primaryCustodian);
app.use("/api/secondaryCustodian", secondaryCustodian);
app.use("/api/itemNameCreation", itemNameCreation);
app.use("/api/uom", unitOfMeasurement);
app.use("/api/model", model);
app.use("/api/submodel", submodel);
app.use("/api/scheduletype", scheduletype);
app.use("/api/scheduletime", scheduletime);
app.use("/api/backupdetails", backupdetails);
app.use("/api/verification", backupverify);
app.use("/api/backupdash", backupdashboard);
app.use("/api/simType", simType);
app.use("/api/itSelectcomponent", itSelectcomponent);
app.use("/api/communicationDeviceDetails", communicationDeviceDetails);
// app.use('/api/tarrifDetails', tarrifDetails)
app.use("/api/wifiManagement", wifiManagement);
app.use("/api/itemCreationDeptmap", itemCreationDeptmap);
app.use("/api/CustodianDeptMast", CustodianDeptMast);
app.use("/api/ItemMapDetails", ItemMapDetails);
// app.use('/api/CrfImageUpload', CrfImageUpload)
app.use("/api/ItImageUpload", IiImageUpload);
app.use("/api/PasswordManagementMain", PasswordManagementMain);
app.use("/api/PasswordCredentialType", PasswordCredentialType);
app.use("/api/assetRackMast", assetRackMast);
app.use("/api/assetDeptTransfer", assetDeptTransfer);
app.use("/api/taskManagement", taskManagement);
app.use("/api/TmFileUpload", TmFileUpload);
app.use("/api/TmTableView", TmTableView);
app.use("/api/TmDropDowns", TmDropDowns);
app.use("/api/subRoomMaster", subRoomMaster);
app.use("/api/crfDashBoard", crfDashBoard);
app.use("/api/amReport", amReport);
app.use("/api/crmEmergncyType", crmEmergncyType);
app.use("/api/assetInternalTrans", assetInternalTrans);
app.use("/api/tmReport", TmReport);
app.use("/api/newCRFRegister", newCRFRegister);
app.use("/api/newCRFRegisterImages", newCRFRegisterImages);
app.use("/api/qualityindicator", qltyindicator);
app.use("/api/qiemergency", emergencyqi);
app.use("/api/qidailycensus", dailycensus);
app.use("/api/censusNursingStat", censusNursMast);
app.use("/api/CRFRegisterApproval", CRFRegisterApproval);
app.use("/api/newCRFPurchase", newCRFPurchase);
app.use("/api/InchHODAuthorization", InchHODAuthorization);
app.use("/api/billCategory", billCategory);
app.use("/api/billType", billType);
app.use("/api/ItSimType", ItSimType);
app.use("/api/ItBillType", ItBillType);
app.use("/api/ItBillCategory", ItBillCategory);
app.use("/api/ItBillAdd", ItBillAdd);
app.use("/api/ItBillVieww", ItBillVieww);
app.use("/api/ItBillSuppDetails", ItBillSuppDetails);
app.use("/api/ItBillType", ItBillSupplierList);
app.use("/api/qidepartment", qideptmast);
app.use("/api/qiendoscopy", qiendoscopy);
app.use("/api/newCRFStore", newCRFStore);
app.use("/api/incidentMaster", incidentMast);
app.use("/api/qiTypeList", qitypeList);
app.use("/api/qidialysis", dialysisqi);
app.use("/api/CrmNewApprovals", CrmNewApprovals);
app.use("/api/TmAllDeptTask", TmAllDeptTask);
app.use("/api/AssetFileUpload", AssetFileUpload);
app.use("/api/equipMast", qiEquipment);
app.use("/api/TmGraph", TmGraph);
app.use("/api/qiInpatients", qiInpatients);
app.use("/api/CrfReports", CrfReports);
app.use("/api/SpareCondemService", SpareCondemService);
app.use("/api/InitialAsessment", opAseessment);
app.use("/api/feedback", feedbackdata);
app.use("/api/qideptAccess", qideptAccess);
app.use("/api/complaintFileUpload", complaintFileUpload);
app.use("/api/complaintHoldReason", complaintHoldReason);
app.use("/api/assetSpareDetails", assetSpareDetails);
app.use("/api/AmServiceFileUpload", AmServiceFileUpload);
app.use("/api/Amdashboard", Amdashboard);
app.use("/api/Ticketdashboard", Ticketdashboard);
app.use("/api/medvallet", med_vallet_master);
app.use("/api/medvehilces", mv_vehicle_registration);
app.use("/api/backuptypemast", backuptypemast);
app.use("/api/simOperators", simOperators);
app.use("/api/notificationMenu", notificationMenu);
app.use("/api/user", userRegistration);
app.use("/api/feedback", feedbackforms);
app.get("/api/validateAccessToken", validateAccessToken);
app.use("/api/backuptypemast", backuptypemast);
app.use("/api/simOperators", simOperators);
app.use("/api/AssetCondemnation", AssetCondemnation);
app.get("/api/validateToken", validateTokenFrontend);
app.use("/api/deliveryMarking", crfDeliveryMarking);
app.use("/api/companyMast", companyMast);
app.use("/api/CRFDashboard", crmDashboard);
app.use("/api/approvalMapping", approvalMapping);
app.use("/api/amsAntibiotic", amsAntibiotic);
app.use("/api/validateAuthentication", validateAuthentication);
app.use("/api/melioraDepMaster", melioraDepMaster);
app.use("/api/ContractMaster", ContractMaster);
app.use('/api/condemApprovalLevel', condemApprovalLevel)
app.use('/api/condemMasters', condemMasters)



server.listen(
  process.env.APP_PORT,
  () => console.log(`Server Up and Running ${process.env.APP_PORT}`),
  logger.productionLogger.log(
    "info",
    `Server Up and Running ${process.env.APP_PORT}`,
    { meta1: "meta1" }
  )
);
