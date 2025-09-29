const { RequstToAssignList, RequstToRectifyList, RequstToVerifyList, AssignToRectify, AssignToVerify, RectifyToVerify, ReqComCategorty, ReqAreaWise, ReqComPerAssigne,
    ReqTatPerComAssignee, getCompCategory, getAllCopmDeptWise,getHoldedTickets, getPendingTicketsReport,
     getPendingTicketsCountReport} = require('../cms_reports/cms_report.service');
const logger = require('../../logger/logger');


module.exports = {

    RequstToAssignList: (req, res) => {
        const body = req.body
        RequstToAssignList(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    RequstToRectifyList: (req, res) => {
        const body = req.body
        RequstToRectifyList(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    RequstToVerifyList: (req, res) => {
        const body = req.body
        RequstToVerifyList(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    AssignToRectify: (req, res) => {
        const body = req.body
        AssignToRectify(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    AssignToVerify: (req, res) => {
        const body = req.body
        AssignToVerify(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    RectifyToVerify: (req, res) => {
        const body = req.body
        RectifyToVerify(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    ReqComCategorty: (req, res) => {
        const body = req.body
        ReqComCategorty(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    ReqAreaWise: (req, res) => {
        const body = req.body
        ReqAreaWise(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    ReqComPerAssigne: (req, res) => {
        const body = req.body
        ReqComPerAssigne(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    ReqTatPerComAssignee: (req, res) => {
        const body = req.body
        ReqTatPerComAssignee(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },


    getCompCategory: (req, res) => {

        getCompCategory((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAllCopmDeptWise: (req, res) => {
        const body = req.body
        getAllCopmDeptWise(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },


        getHoldedTickets: (req, res) => {
        const { ticketDept,  } = req.body;

        let sql = `
        SELECT
            cm_complaint_mast.complaint_slno AS TICKET_NO,
            compalint_date AS TICKET_REG_DATE, 
            complaint_type_name AS TICKET_TYPE,
            complaint_desc AS TICKET_DES,                  
            complaint_dept_name AS TICKET_TO,    
            S.sec_name AS TICKET_FROM_SEC,          
            rm_room_name AS ROOM_NAME,                        
            rm_insidebuildblock_name AS BLOCK_NO,
            rm_floor_name AS FLOOR,         
            rm_roomtype_name AS ROOM_TYPE,                                    
            priority_reason AS PRIORITY_REAS,  
            C.em_name  AS TICKET_REG_EMPLOYEE,   
            assigned_date AS ASSINGED_DATE,
            (SELECT GROUP_CONCAT(em_name SEPARATOR ', ') 
            FROM cm_complaint_detail 
            LEFT JOIN co_employee_master 
            ON co_employee_master.em_id = cm_complaint_detail.assigned_emp 
            WHERE cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno 
            AND cm_complaint_detail.assign_status = 1) AS ASSINGED_EMP,
            O.em_name AS HOLD_USER,
            pending_onhold_time AS HOLDED_ON,
            rectify_pending_hold_remarks AS PENDING,
            cm_hold_reason AS HOLD_REAS,
            cm_complaint_location    
        FROM 
            cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            LEFT JOIN co_request_type ON co_request_type.req_type_slno = cm_complaint_mast.complaint_request_slno
            LEFT JOIN cm_complaint_dept ON cm_complaint_dept.complaint_dept_slno = cm_complaint_mast.complaint_deptslno
            LEFT JOIN cm_complaint_type ON cm_complaint_type.complaint_type_slno = cm_complaint_mast.complaint_typeslno
            LEFT JOIN co_deptsec_mast S ON S.sec_id = cm_complaint_mast.complaint_dept_secslno
            LEFT JOIN co_employee_master C ON C.em_id = cm_complaint_mast.create_user     
            LEFT JOIN co_employee_master M ON M.em_id = cm_complaint_mast.message_send_emp
            LEFT JOIN co_employee_master R ON R.em_id = cm_complaint_mast.message_read_emp
            LEFT JOIN co_department_mast ON co_department_mast.dept_id = C.em_department
            LEFT JOIN cm_priority_mast ON cm_priority_mast.cm_priority_slno = cm_complaint_mast.compalint_priority
            LEFT JOIN co_deptsec_mast L ON L.sec_id = cm_complaint_mast.cm_location
            LEFT JOIN rm_newroom_creation ON rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
            LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
            LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
            LEFT JOIN co_employee_master O ON cm_complaint_mast.pending_onhold_user = O.em_id
            LEFT JOIN cm_hold_reason_mast ON cm_hold_reason_mast.cm_hold_id = cm_complaint_mast.cm_hold_reason_slno
            LEFT JOIN co_employee_master A ON A.em_id = cm_complaint_detail.assigned_user
        WHERE 
            compalint_status != 0            
            AND cm_rectify_status = 'O'
            `;

          const queryParams = [];
        if (ticketDept!==0) {
            sql += "   AND  complaint_deptslno = ?";
            queryParams.push(ticketDept);
        }       
        sql += `
         GROUP BY 
        cm_complaint_mast.complaint_slno
        ORDER BY 
        cm_complaint_mast.complaint_slno ASC
              
        `;


        getHoldedTickets(sql, queryParams, (error, results) => {           

            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: error.message
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No data found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

            getPendingTicketsReport: (req, res) => {
        const { ticketDept, ticketOption } = req.body;
          
                let sql = `
        SELECT
            cm_complaint_mast.complaint_slno AS TICKET_NO,
            compalint_status,
            compalint_date AS TICKET_REG_DATE, 
            complaint_type_name AS TICKET_TYPE,
            complaint_desc AS TICKET_DES,                  
            complaint_dept_name AS TICKET_TO,    
            S.sec_name AS TICKET_FROM_SEC,          
            rm_room_name AS ROOM_NAME,                        
            rm_insidebuildblock_name AS BLOCK_NO,
            rm_floor_name AS FLOOR,         
            rm_roomtype_name AS ROOM_TYPE,                                    
            priority_reason AS PRIORITY_REAS,  
            C.em_name  AS TICKET_REG_EMPLOYEE,   
            assigned_date AS ASSINGED_DATE,
            (SELECT GROUP_CONCAT(em_name SEPARATOR ', ') 
            FROM cm_complaint_detail 
            LEFT JOIN co_employee_master 
            ON co_employee_master.em_id = cm_complaint_detail.assigned_emp 
            WHERE cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno 
            AND cm_complaint_detail.assign_status = 1) AS ASSINGED_EMP,
            O.em_name AS HOLD_USER,
            pending_onhold_time AS HOLDED_ON,
            rectify_pending_hold_remarks AS PENDING,
            cm_hold_reason AS HOLD_REAS ,
            cm_complaint_location,
            cm_rectify_status   
        FROM 
            cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            LEFT JOIN co_request_type ON co_request_type.req_type_slno = cm_complaint_mast.complaint_request_slno
            LEFT JOIN cm_complaint_dept ON cm_complaint_dept.complaint_dept_slno = cm_complaint_mast.complaint_deptslno
            LEFT JOIN cm_complaint_type ON cm_complaint_type.complaint_type_slno = cm_complaint_mast.complaint_typeslno
            LEFT JOIN co_deptsec_mast S ON S.sec_id = cm_complaint_mast.complaint_dept_secslno
            LEFT JOIN co_employee_master C ON C.em_id = cm_complaint_mast.create_user     
            LEFT JOIN co_employee_master M ON M.em_id = cm_complaint_mast.message_send_emp
            LEFT JOIN co_employee_master R ON R.em_id = cm_complaint_mast.message_read_emp
            LEFT JOIN co_department_mast ON co_department_mast.dept_id = C.em_department
            LEFT JOIN cm_priority_mast ON cm_priority_mast.cm_priority_slno = cm_complaint_mast.compalint_priority
            LEFT JOIN co_deptsec_mast L ON L.sec_id = cm_complaint_mast.cm_location
            LEFT JOIN rm_newroom_creation ON rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
            LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
            LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
            LEFT JOIN co_employee_master O ON cm_complaint_mast.pending_onhold_user = O.em_id
            LEFT JOIN cm_hold_reason_mast ON cm_hold_reason_mast.cm_hold_id = cm_complaint_mast.cm_hold_reason_slno
            LEFT JOIN co_employee_master A ON A.em_id = cm_complaint_detail.assigned_user        
            WHERE cm_complaint_mast.complaint_slno IS NOT NULL
            `;

            const queryParams = [];

                // Pendings (Not Assigned)
                if (ticketOption === 1) {  
                 sql += " AND compalint_status = 0 ";
                }     

                // Assigned (Holded Tickets Included)
                if (ticketOption === 2) {
                    sql += " AND compalint_status = 1 ";
                }     

                // Dept wise
                if (ticketDept!==0) {
                    sql += " AND complaint_deptslno = ? ";
                    queryParams.push(ticketDept);
                }  

                // Not Assigned, Assigned, Not Rectified - Holded Tickets Included
                if (ticketOption === 3) {
                    sql += " AND compalint_status NOT IN (2, 3) ";
                }

                sql += `
                    GROUP BY 
                        cm_complaint_mast.complaint_slno
                    ORDER BY 
                        cm_complaint_mast.complaint_slno ASC
                `;

                getPendingTicketsReport(sql, queryParams, (error, results) => {
                  
                    if (error) {
                        return res.status(500).json({
                            success: 0,
                            message: error.message
                        });
                    }
                    if (!results || results.length === 0) {
                        return res.status(200).json({
                            success: 2,
                            message: "No data found"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                    });
                });
            },


 getPendingTicketsCountReport: (req, res) => {

        const {  ticketOption } = req.body;      
        let sql =
         `SELECT 
            complaint_dept_name AS TICKET_TO,
            COUNT(*) AS TOTAL_TICKETS
            FROM cm_complaint_mast
            LEFT JOIN cm_complaint_dept 
            ON cm_complaint_dept.complaint_dept_slno = cm_complaint_mast.complaint_deptslno
            WHERE cm_complaint_mast.complaint_slno IS NOT NULL `;

            const queryParams = [];

                // Pendings (Not Assigned)
                if (ticketOption === 1) {                         
                 sql += "AND compalint_status = 0 ";
                }     

                // Assigned (Holded Tickets Included)
                if (ticketOption === 2) {
                    sql += "AND compalint_status = 1 ";
                }    
      
                // Not Assigned, Assigned, Not Rectified - Holded Tickets Included
                if (ticketOption === 3) {
                    sql += "AND compalint_status NOT IN (2, 3) ";
                }

                //  Holded Tickets 
                if (ticketOption === 4) {
                    sql += "AND compalint_status NOT IN (2, 3) AND cm_rectify_status = 'O' ";
                }

                sql += `
                    GROUP BY complaint_dept_name
                    ORDER BY 
                    cm_complaint_mast.complaint_slno ASC
                `;

                getPendingTicketsCountReport(sql, queryParams, (error, results) => {                    
                    if (error) {
                        return res.status(500).json({
                            success: 0,
                            message: error.message
                        });
                    }
                    if (!results || results.length === 0) {
                        return res.status(200).json({
                            success: 2,
                            message: "No data found"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                    });
                });
            },
}