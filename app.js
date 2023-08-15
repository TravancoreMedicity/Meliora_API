// Outside Environment File for the configuration Credential
require("dotenv").config();

const express = require("express");
const cors = require('cors')
const logger = require('./logger/logger');
const http = require("http");
const socketUtils = require('./socketio/socketUltil')

const app = express();
const fs = require('fs');

//sockect io configuration
app.use(cors());

const server = http.createServer(app);
const io = socketUtils.WSIO(server)
socketUtils.connection(io);

const socketIOMiddlewre = (req, res, next) => {
    req.io = io;
    next();
}


// ----- logger display For Info ----
app.get('/info', (req, res) => {
    fs.readFile('./errorlog/info.log', (error, txtString) => {
        if (error) throw err;
        res.write('<div id="content"><pre>' + txtString.toString().replace(/\n/g, '<br />') + '</pre>');
        res.end();
    })
})
// ----- logger display For err ----
app.get('/error', (req, res) => {
    fs.readFile('./errorlog/error.log', (error, txtString) => {
        if (error) throw err;
        res.write('<div id="content"><pre>' + txtString.toString().replace(/\n/g, '<br />') + '</pre>');
        res.end();
    })
})

// ----- logger display For ward ----
app.get('/warn', (req, res) => {
    fs.readFile('./errorlog/warn.log', (error, txtString) => {
        if (error) throw err;
        res.write('<div id="content"><pre>' + txtString.toString().replace(/\n/g, '<br />') + '</pre>');
        res.end();
    })
})

//Inside route Config 

const userRouter = require("./api/user/user.router")
const employeeRouter = require("./api/employee/employee.router");
const usergroupRouter = require("./api/usergroup/usergroup.router")
const userrightsRouter = require("./api/module_user_right/userRight.router")
const deptmaster = require("./api/co_departmentmaster/department.router")
const deptsecmaster = require("./api/co_deptsectionmaster/deptsection.router")
const complaintDeptRouter = require("./api/cm_complaintdepartment/complaintdept.router")
const complainttypeRouter = require("./api/cm_complaintype/complainttype.router")
const hicpolicyRouter = require("./api/cm_hicpolicy/hicpolicy.router")
const assettypeRouter = require("./api/assettype/assettype.router");
const requesttypeRouter = require("./api/co_requesttype/requesttype.router")
const menumasterRouter = require("./api/menu_master/menuMaster.router")
const modulemasterRouter = require("./api/module_master/moduleMaster.router")
const modulegroupRouter = require("./api/module_group_mast/moduleGroup.router")
const commonRouter = require("./api/commoncode/common.router")
const usergrouprightsRouter = require("./api/user_group_right/groupRight.router")
const ModuleGroupRight = require("./api/module_group_right/modGroupRight.router")
const complaintregRouter = require("./api/complaint_master/complaintRegist.router");
const buildingRouter = require("./api/rm_buildingmast/building.router")
const floorRouter = require("./api/rm_floormast/floor.router")
const roomtypeRouter = require("./api/rm_roomtype/roomtype.router")
const dietRouter = require("./api/diet/diet.router")
const diettypeRouter = require("./api/diettype/diettype.router")
const roomcreationRouter = require("./api/rm_roomcreation/roomcreation.router");
const subroomcreationRouter = require("./api/rm_subroomcreation/subroom.router");
const dietMenudtlRouter = require("./api/dietmenusettingdetail/dietmenudetl.router");
const ratelistRouter = require("./api/ratelist/ratelist.router")
const itemgroupRouter = require("./api/item_group/itemgroup.router")
const kotitemRouter = require("./api/kot_item_master/kotitem.router")
const dietmenuprocessRouter = require("./api/diet_process_mast/dietprocess.router")
const dietplanRouter = require("./api/diet_plan_master/dietplan.router")
const dietorderRouter = require('./api/diet_order_list/dietOrder.router')
const dietdetlRouter = require('./api/Dietdetl/dietdetl.router');
const extraorderRouter = require('./api/dietextraorder/extraorder.router')
const deliveryRouter = require('./api/diet_delivery_mark/deliverymark.router')
const nurseStationRouter = require('./api/co_nursestation/nursestation.router');
const complaintassignRouter = require('./api/complaint_assign/complaintAssign.router');
const Rectifycomplit = require('./api/Rectifycomplit/Rectifycomplit.router')
const Wework = require('./api/WeWork/WeWork.router')
const dietReport = require('./api/diet_report/diet_report.router');
const cmdashboardRouter = require('./api/complaint_dashboard/cmDashboard.router');
const directcmregRouter = require('./api/cm_directcomplaintRegister/directcmReg.router');
const getHrmDatas = require('./api/hrm_data_get/data_get_insert.router')
const weworkdashboard = require('./api/WeworkDashboard/Wework.router')
const escalationRouter = require('./api/co_escalationtimemast/escalationtime.router')
const TimeescalationRouter = require('./api/time_escalation/timeescalation.router')
const EscalationmappingRouter = require('./api/co_escalationmapping/escalationmapping.router')
const TimeescalationRouter2 = require('./api/time_escalation2/time_esclvl2.router');
const TimeescalationRouter3 = require('./api/time_escalation3/time_esclvl3.router');
const TimeescalationRouter4 = require('./api/time_escalation4/time_esclvl4.router');
const TimeescalationToplvlRouter = require('./api/time_escalationToplvl/time_esctop.router');
const highantibiotic = require('./api/HighAntiBioticMaster/HighAntiBiotic.router')
const WeEmpMapping = require('./api/WeEmpMapping/WeEmpMapping.router')
const dietDashboard = require('./api/diet_dashboard/diet_dashboard.router')
const requestRegister = require('./api/crm_request_register/requestRegister.router')
const hallBookingRouter = require('./api/hall_booking/hallBooking.router');
const hallmaster = require('./api/HallMaster/Hallmaster.router')
const ndrfgRouter = require('./api/ndrf_request/ndrfrequest.router')
const fileUpload = require('./api/fileupload/fileupload.router')
const HicComplaint = require('./api/complaint_hic/complaintHic.router')
const omtableMast = require('./api/om_table_mast/omTableMast.router')
const omEmpMapping = require('./api/om_emp_mapping/omEmpMap.router')
const comEmpMapping = require('./api/com_emp_mapping/com_emp_mapping.router')
const compriority = require('./api/cm_prority_mst/cm_priority.router')
const campus = require('./api/rm_campus_master/campus_mast.router')
const building = require('./api/rm_building_master/building_mast.router')
const buildblock = require('./api/rm_buildblock_master/buildblock.router')
const insidebuildblock = require('./api/rm_insidebuilblock_master/insidebuildblock.router')
const floormaster = require('./api/rm_floor_master/floor_mast.router')
const roomcategory = require('./api/rm_room_category_master/room_category.router')
const roomtype = require('./api/rm_room_type_master/room_type.router')
const selectComponent = require('./api/rm_selectCompnents/select.router')
const floorcreation = require('./api/rm_floor_creation/rm_floor.router')
const roomnewcreation = require('./api/rm_roomnew_creation/rm_newroom.router')
const assettypee = require('./api/am_asset_type/am_asset_type.router')
const itemtype = require('./api/am_item_type/item_type.router')
const amcategory = require('./api/am_category/am_category.router')
const subcategory = require('./api/am_subcategory/am_subcategory.router')
const group = require('./api/am_group/am_group.router')
const subgroup = require('./api/am_sub_group/sub_group.router')
const manufacture = require('./api/am_manufacture/manufacture.router')
const dashBoardData = require('./api/rm_dashboard/dashboard.router')


app.use(express.json());
app.use((req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "http://192.168.10.170:8080
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
    );

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
app.use("/api/modulemaster", modulemasterRouter)
app.use("/api/menumaster", menumasterRouter)
app.use("/api/modulegroup", modulegroupRouter)
app.use("/api/userrights", userrightsRouter)
app.use("/api/usergroup/rights", usergrouprightsRouter)
app.use("/api/modulegroupright", ModuleGroupRight)
app.use("/api/deptmaster", deptmaster)
app.use("/api/deptsecmaster", deptsecmaster)
app.use("/api/complaintdept", complaintDeptRouter)
app.use("/api/complainttype", complainttypeRouter)
app.use("/api/hicpolicy", hicpolicyRouter)
app.use("/api/assettype", assettypeRouter)
app.use("/api/requesttype", requesttypeRouter)
app.use("/api/common", commonRouter)
app.use("/api/complaintreg", socketIOMiddlewre, complaintregRouter)
app.use("/api/building", buildingRouter)
app.use("/api/roomtype", roomtypeRouter)
app.use("/api/roomcreation", roomcreationRouter)
app.use("/api/subroomcreation", subroomcreationRouter)
app.use("/api/floor", floorRouter)
app.use("/api/diet", dietRouter)
app.use("/api/diettype", diettypeRouter)
app.use("/api/ratelist", ratelistRouter)
app.use('/api/itemgrp', itemgroupRouter)
app.use('/api/kotitem', kotitemRouter)
app.use('/api/dietprocess', dietmenuprocessRouter)
app.use('/api/dietplan', dietplanRouter)
app.use('/api/dietorder', dietorderRouter)
app.use('/api/dietmenudtl', dietMenudtlRouter)
app.use('/api/dietdetl', dietdetlRouter)
app.use('/api/extraorder', extraorderRouter)
app.use('/api/delivery', deliveryRouter)
app.use('/api/nursestation', nurseStationRouter)
app.use('/api/complaintassign', socketIOMiddlewre, complaintassignRouter)
app.use('/api/Rectifycomplit', socketIOMiddlewre, Rectifycomplit)
app.use('/api/WeWork', Wework)
app.use('/api/dietReport', dietReport)
app.use('/api/cmdashboard', cmdashboardRouter)
app.use('/api/directcmreg', directcmregRouter)
app.use('/api/hrmdataGet', getHrmDatas)
app.use('/api/wewrkdash', weworkdashboard)
app.use('/api/escalation', escalationRouter)
app.use('/api/timeescalation', TimeescalationRouter)
app.use('/api/escalationmaping', EscalationmappingRouter)
app.use('/api/timeescalation2', TimeescalationRouter2)
app.use('/api/timeescalation3', TimeescalationRouter3)
app.use('/api/timeescalation4', TimeescalationRouter4)
app.use('/api/timeescalationtoplvl', TimeescalationToplvlRouter)
app.use('/api/highBioticMast', highantibiotic)
app.use('/api/weEmpMap', WeEmpMapping)
app.use('/api/dietDashboard', dietDashboard)
app.use('/api/requestRegister', requestRegister)
app.use('/api/hallBooking', hallBookingRouter)
app.use('/api/hallmaster', hallmaster)
app.use('/api/ndrf', ndrfgRouter)
app.use('/api/fileupload', fileUpload)
app.use('/api/Hic', HicComplaint)
app.use('/api/omtableMast', omtableMast)
app.use('/api/omempmapping', omEmpMapping)
app.use('/api/comempmapping', comEmpMapping)
app.use('/api/compriority', compriority)
app.use('/api/campus', campus)
app.use('/api/building', building)
app.use('/api/buildblock', buildblock)
app.use('/api/insidebuildblock', insidebuildblock)
app.use('/api/floormaster', floormaster)
app.use('/api/roomcategory', roomcategory)
app.use('/api/roomtype', roomtype)
app.use('/api/selectComponent', selectComponent)
app.use('/api/floorcreation', floorcreation)
app.use('/api/roomnewcreation', roomnewcreation)
app.use('/api/assettypee', assettypee)
app.use('/api/itemType', itemtype)
app.use('/api/amcategory', amcategory)
app.use('/api/subcategory', subcategory)
app.use('/api/amgroup/', group)
app.use('/api/subgroup', subgroup)
app.use('/api/manufacture', manufacture)
app.use('/api/getDashboardData', dashBoardData)


server.listen(process.env.APP_PORT, () =>
    console.log(`Server Up and Running ${process.env.APP_PORT}`),
    logger.productionLogger.log('info', `Server Up and Running ${process.env.APP_PORT}`, { meta1: 'meta1' })
);
