const { pool } = require('../../config/database')
module.exports = {
    getTotalcomplaints: (id, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
             IFNULL( l.sec_name,"Nil" ) location, cm_complaint_type.complaint_type_name,
              (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno  
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno= cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            and date(compalint_date)=current_date() group by complaint_slno`,

            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getOnholdcomplaints: (id, callBack) => {
        pool.query(
         
            `select 
                cm_complaint_mast.complaint_slno,
                complaint_desc, 
                complaint_request_slno, 
                complaint_deptslno,
                complaint_typeslno, 
  				rm_room_name,
				rm_newroom_creation.rm_roomtype_slno,
				rm_room_floor_slno,
				rm_insidebuilldblock_slno,
				rm_insidebuildblock_name,
				rm_floor_name,
				rm_roomtype_name,
            compalint_priority, complaint_dept_secslno, compalint_status, compalint_date,complaint_remark,
             cm_rectify_time, cm_verfy_time, cm_rectify_status,
              IFNULL(rectify_pending_hold_remarks,"Nil") as  rectify_pending_hold_remarks,
              verify_remarks,
              cm_not_verify_time, cm_location,complaint_type_name,
            req_type_name,complaint_dept_name,
             IFNULL( l.sec_name,"Nil" ) location,
                  IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
             (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
            s.sec_name as dept_sec
            from cm_complaint_mast             
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno    
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            			left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
				LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
				LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
				LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            and cm_rectify_status='O' or  cm_rectify_status='P' group by complaint_slno`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getComplaintcount: (id, callBack) => {
        pool.query(
            `call GET_COMPLAINT_COUNT(?)`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    getAssistRectyEmpWise: (id, callBack) => {
        pool.query(
            `
                select 
                cm_complaint_mast.complaint_slno,
                complaint_desc,compalint_date,
  				rm_room_name,
				rm_newroom_creation.rm_roomtype_slno,
				rm_room_floor_slno,
				rm_insidebuilldblock_slno,
				rm_insidebuildblock_name,
				rm_floor_name,
				rm_roomtype_name,
                complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
                    			left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
				LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
				LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
				LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
        where assigned_emp=168 and date(compalint_date)=current_date()`,

            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },



    getPendingOnholdEmpWise: (id, callBack) => {
        pool.query(           
            `select 
cm_complaint_mast.complaint_slno,complaint_desc,
  				rm_room_name,
				rm_newroom_creation.rm_roomtype_slno,
				rm_room_floor_slno,
				rm_insidebuilldblock_slno,
				rm_insidebuildblock_name,
				rm_floor_name,
				rm_roomtype_name,
compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
        left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
				LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
				LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
				LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
        where assigned_emp=? and (cm_rectify_status='O' or  cm_rectify_status='P') `,

            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getTotalcomplaintsAllDpt: (callBack) => {
        pool.query(         
            `select 
            complaint_slno,
            complaint_desc, 
            complaint_request_slno,
            complaint_deptslno, 
            complaint_typeslno, 
 				rm_room_name,
				rm_newroom_creation.rm_roomtype_slno,
				rm_room_floor_slno,
				rm_insidebuilldblock_slno,
				rm_insidebuildblock_name,
				rm_floor_name,
				rm_roomtype_name,
            compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, compalint_date,complaint_remark,
             cm_rectify_time, cm_verfy_time, cm_rectify_status, rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,
            req_type_name,complaint_dept_name,
             IFNULL( l.sec_name,"Nil" ) location,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno
			left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
				LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
				LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
				LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
             WHERE date(compalint_date)=current_date() group by complaint_slno `,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getOnholdcomplaintsAllDpt: (callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, complaint_typeslno, 
            compalint_priority, complaint_dept_secslno, compalint_status, compalint_date,complaint_remark,
             cm_rectify_time, cm_verfy_time, cm_rectify_status, rectify_pending_hold_remarks, verify_remarks,
              cm_not_verify_time, cm_location,complaint_type_name,
            req_type_name,complaint_dept_name,
             IFNULL( l.sec_name,"Nil" ) location,
             date(assigned_date) as assigndate,
             assigned_emp, em_name,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno    
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
             WHERE  cm_rectify_status='O' or  cm_rectify_status='P' group by complaint_slno`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAllCompDeptwiseCount: (id, callBack) => {
        pool.query(
            `call GET_COMPLAINT_COUNT_ALL_DEPT(?)`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

        getempAssignTicketCount: (id, callBack) => {
        pool.query(
            `SELECT
            COUNT(DISTINCT cm_complaint_mast.complaint_slno) AS employee_ticket_assigned_count
            FROM cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            WHERE assigned_emp = ?
            AND compalint_status NOT IN (2, 3)
            AND assign_status = 1
            AND (cm_rectify_status != 'O' OR cm_rectify_status IS NULL)`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
        getempHoldTicketCountt: (id, callBack) => {
        pool.query(
            `SELECT
            COUNT(DISTINCT cm_complaint_mast.complaint_slno) AS employee_ticket_hold_count             
            FROM cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            WHERE  
            cm_complaint_detail.assigned_emp = ?
            AND cm_rectify_status = 'O'
            AND assign_status = 1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
        getempTodayRectifyTicketCount: (id, callBack) => {
        pool.query(
            `SELECT          
            COUNT(DISTINCT cm_complaint_mast.complaint_slno) AS employee_ticket_rectified_count  
            FROM cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            WHERE  
            cm_complaint_detail.assigned_emp = ?
            AND compalint_status IN (2, 3)
            AND assign_status = 1
            AND cm_rectify_status!='O'
            AND DATE(cm_rectify_time) = CURRENT_DATE()`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
        getempTodayVerifiedTicketCount: (id, callBack) => {
        pool.query(
            `SELECT 
            COUNT(DISTINCT cm_complaint_mast.complaint_slno) AS employee_ticket_verified_count             
            FROM cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            WHERE  
            cm_complaint_detail.assigned_emp = ?
            AND compalint_status = 3
            AND assign_status = 1
            AND DATE(cm_verfy_time) = CURRENT_DATE()`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
       getsuperviPendingVerifiTicketCount: (id, callBack) => {
        pool.query(
            `SELECT
             COUNT(*) AS supervisor_verification_pending_ticket_count
            FROM cm_complaint_mast
            WHERE complaint_deptslno = (
                SELECT complaint_dept_slno 
                FROM cm_complaint_dept 
                WHERE department_slno = ?
            )
            AND compalint_status = 2 
            AND verify_spervsr = 0`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
          getDeptAssignTicketCount: (id, callBack) => {
        pool.query(
            `SELECT COUNT(*) AS dept_assign_ticket_count
            FROM cm_complaint_mast
            where
            complaint_deptslno = (
                SELECT complaint_dept_slno 
                FROM cm_complaint_dept 
                WHERE department_slno = ?
                )
                AND compalint_status =1
                AND (cm_rectify_status IS NULL OR cm_rectify_status != 'O' )`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },   
    
        getDeptHoldTicketCount: (id, callBack) => {
        pool.query(
            `SELECT COUNT(*) AS dept_hold_ticket_count
            FROM cm_complaint_mast
            where
            complaint_deptslno = (
                SELECT complaint_dept_slno 
                FROM cm_complaint_dept 
                WHERE department_slno = ?
                )
                AND compalint_status =1
                AND (cm_rectify_status = 'O' )`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
        getDeptTodayRectifyTicketCount: (id, callBack) => {
        pool.query(
            `SELECT 
            COUNT(DISTINCT cm_complaint_mast.complaint_slno) AS employee_ticket_rectified_count           
            FROM cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            WHERE  
             complaint_deptslno = (
                SELECT complaint_dept_slno 
                FROM cm_complaint_dept 
                WHERE department_slno = ?
                )                
            AND compalint_status IN (2, 3)
            AND assign_status = 1
            AND cm_rectify_status!='O'
            
            AND DATE(cm_rectify_time) = CURRENT_DATE()`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
            getDeptTodayVerifyTicketCount: (id, callBack) => {
            pool.query(
            `SELECT          
            COUNT(DISTINCT cm_complaint_mast.complaint_slno) AS employee_ticket_verified_count          
            FROM cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            WHERE 
            complaint_deptslno = (
                SELECT complaint_dept_slno 
                FROM cm_complaint_dept 
                WHERE department_slno = ?
            )                            
            AND compalint_status = 3
            AND assign_status = 1
            AND DATE(cm_verfy_time) = CURRENT_DATE()`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
            getempAssistReceiveTicketCount: (id, callBack) => {
            pool.query(
            `SELECT            
            COUNT(DISTINCT cm_complaint_mast.complaint_slno) AS employee_assist_receive_ticket_count    
            FROM cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            WHERE  
            cm_complaint_detail.assigned_emp = ?
            AND compalint_status = 1        
            AND assist_receive = 1
            AND assign_status = 1 `,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
        getDeptAssistReceiveTicketCount: (id, callBack) => {
            pool.query(
            `SELECT            
            COUNT(DISTINCT cm_complaint_mast.complaint_slno) AS dept_assist_receive_ticket_count   
            FROM cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            WHERE  
           complaint_deptslno = (
                SELECT complaint_dept_slno 
                FROM cm_complaint_dept 
                WHERE department_slno = ?
            )     
            AND compalint_status = 1        
            AND assist_receive = 1
            AND assign_status = 1 `,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
        getDeptAllAssistRequestTicketCount: (id, callBack) => {
            pool.query(
            ` SELECT 
            COUNT(DISTINCT cm_complaint_mast.complaint_slno) AS assist_req_count  
            FROM cm_complaint_detail
            LEFT JOIN cm_complaint_mast 
            ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            WHERE 
            complaint_deptslno = (
                SELECT complaint_dept_slno 
                FROM cm_complaint_dept 
                WHERE department_slno = ?
            )   
            AND cm_complaint_detail.assist_flag = 1 
            AND (cm_complaint_detail.assign_status != 1 OR cm_complaint_detail.assign_status IS NULL) 
            AND cm_complaint_mast.compalint_status =1 `,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
            getVerifyTicketCountEmployeeDeptWise: (id, callBack) => {
            pool.query(
                     `SELECT
                    co_deptsec_mast.sec_name,
                    COUNT(DISTINCT cm_complaint_mast.complaint_slno) AS complaint_count
                FROM
                    cm_complaint_mast
                LEFT JOIN cm_complaint_detail 
                    ON cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
                LEFT JOIN co_deptsec_mast 
                    ON co_deptsec_mast.sec_id = cm_complaint_mast.complaint_dept_secslno
                WHERE
                    cm_complaint_detail.assigned_emp = ?
                    AND cm_rectify_status = 'V'
                    AND compalint_status = 3
                    AND DATE(cm_complaint_mast.cm_verfy_time) = CURRENT_DATE
                GROUP BY
                    co_deptsec_mast.sec_id,
                    co_deptsec_mast.sec_name`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
            getVerifyTicketCountDeptWise: (id, callBack) => {
            pool.query(
            `SELECT
                co_deptsec_mast.sec_name,      
                COUNT(DISTINCT cm_complaint_mast.complaint_slno) AS complaint_count
            FROM
                cm_complaint_mast
            LEFT JOIN cm_complaint_detail 
                ON cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
            LEFT JOIN co_deptsec_mast 
                ON co_deptsec_mast.sec_id = cm_complaint_mast.complaint_dept_secslno
            WHERE
                complaint_deptslno = (
                    SELECT complaint_dept_slno 
                    FROM cm_complaint_dept 
                    WHERE department_slno = ?
                )
                AND cm_rectify_status = 'V'
                AND compalint_status = 3
                AND DATE(cm_complaint_mast.cm_verfy_time) = CURRENT_DATE
            GROUP BY
                co_deptsec_mast.sec_id,
                co_deptsec_mast.sec_name`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    
    

    

}