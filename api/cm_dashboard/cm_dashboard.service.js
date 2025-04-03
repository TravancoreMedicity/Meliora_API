const { pool } = require('../../config/database')
module.exports = {

    getAllEmployee: (data, callback) => {
        pool.query(
            `SELECT 
            emp.em_id,
            emp.em_name,
            emp.em_no,
            desg_name,
            IFNULL(complaint_data.complaint_count, 0) AS complaint_count,
            IFNULL(closed_complaints.closed_count, 0) AS closed_count
        FROM 
            co_employee_master AS emp
        LEFT JOIN 
            co_designation AS desg 
                ON 
                emp.em_designation = desg.desg_slno
        LEFT JOIN (
            SELECT 
                assigned_emp,
                COUNT(cm_complaint_detail.complaint_slno) AS complaint_count
            FROM 
                cm_complaint_detail
            LEFT JOIN 
                cm_complaint_mast 
            ON 
                cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            WHERE 
                cm_complaint_detail.assign_status = 1
                AND cm_complaint_detail.assigned_date BETWEEN ? AND ?
            GROUP BY 
                assigned_emp
        ) AS complaint_data
        ON 
            emp.em_id = complaint_data.assigned_emp
        LEFT JOIN (
            SELECT
                cm_complaint_detail.assigned_emp AS employee_id,
                COUNT(cm_complaint_mast.complaint_slno) AS closed_count
            FROM
                cm_complaint_mast
            LEFT JOIN 
                cm_complaint_detail
            ON 
                cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
            WHERE
                cm_complaint_mast.cm_rectify_time BETWEEN ? AND ?
                AND cm_complaint_mast.compalint_status IN (2, 3)
            GROUP BY
                cm_complaint_detail.assigned_emp
        ) AS closed_complaints
        ON 
            emp.em_id = closed_complaints.employee_id
        WHERE 
            emp.em_department = ?
            AND emp.em_status = 1 
            AND emp.em_no != 1 
            AND emp.em_id != 1606
        ORDER BY 
            closed_count DESC`,
            [
                data.from,
                data.to,
                data.from,
                data.to,
                data.empdept
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    ticketTypeBarchart: (data, callback) => {
        pool.query(
            `SELECT            
            ctype.complaint_type_slno,
            ctype.complaint_type_name,
            COUNT(cmast.complaint_slno) AS total_complaint_count,
            COUNT(CASE WHEN cmast.compalint_status IN (2, 3) THEN 1 END) AS rectified_complaint_count
            FROM 
            cm_complaint_type AS ctype
            INNER JOIN 
            cm_complaint_dept AS cdept
            ON ctype.complaint_dept_slno = cdept.complaint_dept_slno
            LEFT JOIN 
            cm_complaint_mast AS cmast
            ON ctype.complaint_type_slno = cmast.complaint_typeslno
            AND cmast.compalint_date BETWEEN ? AND ?   
            WHERE 
            cdept.department_slno = ?
            GROUP BY 
            ctype.complaint_type_slno, ctype.complaint_type_name
            ORDER BY 
            total_complaint_count DESC`

            , [
                data.fromDate,
                data.toDate,
                data.empdept
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getAlltodaysTickets: (data, callback) => {
        pool.query(
            `select
            cm_complaint_mast.complaint_slno 
            from cm_complaint_mast          
            WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            and date(compalint_date)=current_date() `,
            [
                data.empdept
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    getAllDepttodaysTickets: (callback) => {
        pool.query(
            `select
            cm_complaint_mast.complaint_slno 
            from cm_complaint_mast          
            WHERE
            date(compalint_date)=current_date()  `
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getAllDeptopenTicketsCount: (callback) => {
        pool.query(
            `select
            cm_complaint_mast.complaint_slno
            from cm_complaint_mast          
            WHERE 
            compalint_status=1  `
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getOpenTicketsCount: (data, callback) => {
        pool.query(
            `select
            cm_complaint_mast.complaint_slno
            from cm_complaint_mast          
            WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            and 
            compalint_status=1`,
            [
                data.empdept
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },

    getclosedTodayTicket: (data, callback) => {
        pool.query(
            `SELECT 
                cm_complaint_mast.complaint_slno
             FROM 
                cm_complaint_mast
             WHERE 
                complaint_deptslno = (
                    SELECT complaint_dept_slno 
                    FROM cm_complaint_dept 
                    WHERE department_slno = ?
                )
                AND DATE(cm_rectify_time) = CURRENT_DATE()`,
            [data.empdept],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getmonthlyTicketchart: (data, callback) => {
        pool.query(
            `
            WITH Dept AS (
                SELECT complaint_dept_slno 
                FROM cm_complaint_dept 
                WHERE department_slno = ?
                ),
                TotalTickets AS (
                    SELECT 
                    COUNT(complaint_slno) AS total_tickets
                    FROM 
                    cm_complaint_mast
                    WHERE 
                    compalint_date BETWEEN ? AND ?
                    AND compalint_status IN (0, 1, 2, 3)
                    AND complaint_deptslno = (SELECT complaint_dept_slno FROM Dept)
                    ),

                    OpenTickets AS (
                        SELECT 
                        COUNT(cm_complaint_mast.complaint_slno) AS open_ticket
                        FROM 
                        cm_complaint_detail
                        LEFT JOIN 
                        cm_complaint_mast ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
                        WHERE 
                        assigned_date BETWEEN ? AND ?
                        AND assign_status = 1
                        AND complaint_deptslno = (SELECT complaint_dept_slno FROM Dept)
                        ),
                        ClosedTickets AS (
        SELECT 
        COUNT(complaint_slno) AS closed_ticket
        FROM 
        cm_complaint_mast
        WHERE 
        cm_rectify_time BETWEEN ? AND ?
        AND compalint_status IN (2, 3)
        AND complaint_deptslno = (SELECT complaint_dept_slno FROM Dept)
        ),
        HoldTickets AS (
            SELECT 
            COUNT(complaint_slno) AS hold_ticket
            FROM 
            cm_complaint_mast
            WHERE 
            pending_onhold_time BETWEEN ? AND ?
            AND compalint_status NOT IN (2, 3)
            AND complaint_deptslno = (SELECT complaint_dept_slno FROM Dept)
            ),
            VerifiedTickets AS (
                SELECT 
                COUNT(complaint_slno) AS verified_ticket
                FROM 
                cm_complaint_mast
                WHERE 
                cm_verfy_time BETWEEN ? AND ?
                AND compalint_status = 3
                AND complaint_deptslno = (SELECT complaint_dept_slno FROM Dept)
                )
                SELECT 
                TotalTickets.total_tickets,
                OpenTickets.open_ticket,
                ClosedTickets.closed_ticket,
                HoldTickets.hold_ticket,
                VerifiedTickets.verified_ticket
                FROM 
                TotalTickets, OpenTickets, ClosedTickets, HoldTickets, VerifiedTickets;`,


            [data.empdept,
            data.from,
            data.to,
            data.from,
            data.to,
            data.from,
            data.to,
            data.from,
            data.to,
            data.from,
            data.to,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },

    getAllDeptPieTicketchart: (data, callback) => {
        pool.query(
            `
            WITH TotalTickets AS (
                SELECT 
                COUNT(complaint_slno) AS total_tickets
                FROM 
                cm_complaint_mast
                WHERE 
                compalint_date BETWEEN ? AND ?
                AND compalint_status IN (0, 1, 2, 3)
                ),
                
                OpenTickets AS (
                    SELECT 
                    COUNT(cm_complaint_mast.complaint_slno) AS open_ticket
                    FROM 
                    cm_complaint_detail
                    LEFT JOIN 
                    cm_complaint_mast ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
                    WHERE 
                    assigned_date BETWEEN ? AND ?
                    AND assign_status = 1
                    ),
                    
                    ClosedTickets AS (
                        SELECT 
                        COUNT(complaint_slno) AS closed_ticket
                        FROM 
                        cm_complaint_mast
                        WHERE 
                        cm_rectify_time BETWEEN ? AND ?
                        AND compalint_status IN (2, 3)
                        ),
                        
                        HoldTickets AS (
                            SELECT 
                            COUNT(complaint_slno) AS hold_ticket
                            FROM 
                            cm_complaint_mast
                            WHERE 
                            pending_onhold_time BETWEEN ? AND ?
                            AND compalint_status NOT IN (2, 3)
                            ),
                            
                            VerifiedTickets AS (
                                SELECT 
                                COUNT(complaint_slno) AS verified_ticket
                                FROM 
                                cm_complaint_mast
                                WHERE 
                                cm_verfy_time BETWEEN ? AND ?
                                AND compalint_status = 3
                                )
                                
                                SELECT 
                                TotalTickets.total_tickets,
                                OpenTickets.open_ticket,
                                ClosedTickets.closed_ticket,
                                HoldTickets.hold_ticket,
                                VerifiedTickets.verified_ticket
                                FROM 
                                TotalTickets, OpenTickets, ClosedTickets, HoldTickets, VerifiedTickets;
                                
`,
            [
                data.from,
                data.to,
                data.from,
                data.to,
                data.from,
                data.to,
                data.from,
                data.to,
                data.from,
                data.to,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },
    getTicketOpenWithIn: (data, callback) => {
        pool.query(
            `
            SELECT         
            cm_complaint_mast.complaint_slno,
            compalint_date,
            assigned_date,
            TIMESTAMPDIFF(SECOND, compalint_date, assigned_date) AS open_with_in
            FROM 
            cm_complaint_mast
            LEFT JOIN 
            cm_complaint_detail 
            ON 
            cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
            WHERE 
            compalint_date BETWEEN ? AND ?
            and
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            and
            assigned_date is not null
            GROUP BY 
            cm_complaint_mast.complaint_slno`,

            [

                data.from,
                data.to,
                data.empdept

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    AllDeptopenWithIn: (data, callback) => {
        pool.query(
            `
           SELECT         
            cm_complaint_mast.complaint_slno,
            compalint_date,
            assigned_date,
            TIMESTAMPDIFF(SECOND, compalint_date, assigned_date) AS open_with_in
            FROM 
            cm_complaint_mast
            LEFT JOIN 
            cm_complaint_detail 
            ON 
            cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
            WHERE 
            compalint_date BETWEEN ? AND ?          
            and
            assigned_date is not null
            GROUP BY 
            cm_complaint_mast.complaint_slno`,

            [

                data.from,
                data.to,

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getTicketClosedWithIn: (data, callback) => {
        pool.query(
            `SELECT            
            cm_complaint_mast.complaint_slno,
            compalint_date,
            assigned_date,
            cm_rectify_time,
            compalint_status,
            TIMESTAMPDIFF(SECOND, assigned_date, cm_rectify_time) AS closed_with_in
            FROM 
            cm_complaint_mast
            LEFT JOIN 
            cm_complaint_detail 
            ON 
            cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
            WHERE 
            compalint_date BETWEEN ? AND ?
            and
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            and
            assigned_date is not null
            and            
            cm_rectify_time is not null
            and
            compalint_status in(2,3)
            GROUP BY 
            cm_complaint_mast.complaint_slno`,
            [
                data.from,
                data.to,
                data.empdept

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    AllDeptcloseWithIn: (data, callback) => {
        pool.query(
            `SELECT            
            cm_complaint_mast.complaint_slno,
            compalint_date,
            assigned_date,
            cm_rectify_time,
            compalint_status,
            TIMESTAMPDIFF(SECOND, assigned_date, cm_rectify_time) AS closed_with_in
            FROM 
            cm_complaint_mast
            LEFT JOIN 
            cm_complaint_detail 
            ON 
            cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
            WHERE 
            compalint_date BETWEEN ? AND ?           
            and
            assigned_date is not null
            and            
            cm_rectify_time is not null
            and
            compalint_status in(2,3)
            GROUP BY 
            cm_complaint_mast.complaint_slno`,
            [
                data.from,
                data.to

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },



    getDeptPending: (data, callback) => {
        pool.query(
            `select
            complaint_slno,
            compalint_status,
            compalint_date,
            complaint_deptslno
            from
            cm_complaint_mast
            where
            compalint_status = 0
            and
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
           `,

            [

                data.empdept

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getTodayAssing: (data, callback) => {
        pool.query(
            `SELECT
            cm_complaint_detail.complaint_slno
            FROM
            cm_complaint_detail
            left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
            WHERE
            assign_status = 1
            and
            assigned_date IS NOT NULL
            and    
           date(assigned_date) = CURRENT_DATE()
            and
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            group by complaint_slno`,

            [
                data.empdept,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getPevRegTodayAssing: (data, callback) => {
        pool.query(
            `SELECT            
            cm_complaint_mast.complaint_slno 
            FROM 
            cm_complaint_mast 
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            WHERE 
            DATE(assigned_date) = CURRENT_DATE()    
            and
            DATE(compalint_date) < CURRENT_DATE()
            and
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            AND compalint_status > 0;`,

            [
                data.empdept,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getRegTodayAssignToday: (data, callback) => {
        pool.query(
            `SELECT            
            cm_complaint_mast.complaint_slno 
            FROM 
            cm_complaint_mast 
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            WHERE 
            DATE(assigned_date) = CURRENT_DATE()    
            and
            DATE(compalint_date) = CURRENT_DATE()
            and
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            AND compalint_status=1`,

            [
                data.empdept,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getRegistrdFromSixDays: (data, callback) => {
        pool.query(
            `SELECT
            cm_complaint_detail.complaint_slno
            FROM
            cm_complaint_detail
            left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
            WHERE
            assign_status = 1
            and
            assigned_date IS NOT NULL
            and    
            assigned_date between ? and ?
            and
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            group by complaint_slno`,
            [
                data.from,
                data.to,
                data.empdept

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getallDeptRegistrdFromSixDays: (data, callback) => {
        pool.query(
            `SELECT
            cm_complaint_detail.complaint_slno
            FROM
            cm_complaint_detail
            left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
            WHERE
            assign_status = 1
            and
            assigned_date IS NOT NULL
            and    
            assigned_date between ? and ?          
            group by complaint_slno`,
            [
                data.from,
                data.to
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getclosedFromSixDays: (data, callback) => {
        pool.query(
            `select
            complaint_slno
            from
            cm_complaint_mast
            where
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            and
            cm_rectify_time between ? and ?
            and compalint_status in(2,3)`,
            [
                data.empdept,
                data.from,
                data.to
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getallDeptClosedFromSixDays: (data, callback) => {
        pool.query(
            `select
            complaint_slno
            from
            cm_complaint_mast
            where          
            cm_rectify_time between ? and ?
            and compalint_status in(2,3)`,
            [

                data.from,
                data.to
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getRegTodayInPend: (data, callback) => {
        pool.query(
            `SELECT            
            cm_complaint_mast.complaint_slno
            
            FROM 
            cm_complaint_mast   
            WHERE 
            cm_complaint_mast.complaint_deptslno = (
                SELECT 
                complaint_dept_slno 
                FROM 
                cm_complaint_dept 
                WHERE 
                department_slno = ?
                )
                AND cm_complaint_mast.compalint_status = 0
                AND date(compalint_date)= CURRENT_DATE()`,
            [

                data.empdept

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    AllcomplaintDept: (data, callback) => {

        pool.query(
            `SELECT
            cm_complaint_dept.complaint_dept_slno,
            cm_complaint_dept.complaint_dept_name,
            COUNT(cmast.complaint_slno) AS total_complaint_count,
            COUNT(CASE WHEN cmast.compalint_status IN (2, 3) THEN 1 END) AS rectified_complaint_count
            FROM 
            cm_complaint_dept 
            LEFT JOIN cm_complaint_mast AS cmast 
            ON cm_complaint_dept.complaint_dept_slno = cmast.complaint_deptslno
            AND cmast.compalint_date BETWEEN ? AND ?
            WHERE
            cm_complaint_dept.complaint_dept_status = 1
            GROUP BY
            cm_complaint_dept.complaint_dept_slno,
            cm_complaint_dept.complaint_dept_name
            ORDER BY 
            total_complaint_count DESC`,
            [
                data.fromDate,
                data.toDate,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getAllDeptemployeeList: (data, callback) => {

        pool.query(
            `SELECT            
            emp.em_id,
            emp.em_name,
            emp.em_no,
            desg_name,
            sec_name,
            IFNULL(complaint_data.complaint_count, 0) AS complaint_count,
            IFNULL(closed_complaints.closed_count, 0) AS closed_count
            FROM 
            co_employee_master AS emp
            LEFT JOIN 
            co_deptsec_mast AS deptSec 
            ON deptSec.sec_id = emp.em_dept_section
            RIGHT JOIN 
            cm_complaint_dept AS CompltDept 
            ON emp.em_department = CompltDept.department_slno
            LEFT JOIN 
            co_designation AS desg 
            ON emp.em_designation = desg.desg_slno
            LEFT JOIN (
            SELECT 
            assigned_emp,
            COUNT(cm_complaint_detail.complaint_slno) AS complaint_count
            FROM 
            cm_complaint_detail
            LEFT JOIN 
            cm_complaint_mast 
            ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            WHERE 
            cm_complaint_detail.assign_status = 1
            AND cm_complaint_detail.assigned_date BETWEEN ? AND ?
            GROUP BY 
            assigned_emp
            ) AS complaint_data
            ON emp.em_id = complaint_data.assigned_emp
            LEFT JOIN (
                SELECT
                cm_complaint_detail.assigned_emp AS employee_id,
                COUNT(cm_complaint_mast.complaint_slno) AS closed_count
                FROM
                cm_complaint_mast
                LEFT JOIN 
                cm_complaint_detail
                ON cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
                WHERE                
                cm_complaint_mast.cm_rectify_time BETWEEN ? AND ?
                AND cm_complaint_mast.compalint_status IN (2, 3)
                GROUP BY
                cm_complaint_detail.assigned_emp
                ) AS closed_complaints
                ON emp.em_id = closed_complaints.employee_id
                WHERE 
                emp.em_status = 1 
                AND emp.em_no != 1 
                AND emp.em_id != 1606
                AND (complaint_data.complaint_count > 0 OR closed_complaints.closed_count > 0)
                AND emp.em_department = CompltDept.department_slno
                ORDER BY 
                closed_count DESC
                LIMIT 10 `,
            [
                data.from,
                data.to,
                data.from,
                data.to,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getPevAssingTodayRect: (data, callback) => {
        pool.query(
            `SELECT            
            cm_complaint_mast.complaint_slno 
            FROM 
            cm_complaint_mast 
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            WHERE 
            DATE(assigned_date) < CURRENT_DATE()    
            and
            DATE(cm_rectify_time) = CURRENT_DATE()
            and
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            AND compalint_status>1`,

            [
                data.empdept,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    getallDeptPending: (callback) => {
        pool.query(
            `select
            complaint_slno,
            compalint_status,
            compalint_date,
            complaint_deptslno
            from
            cm_complaint_mast
            where
            compalint_status = 0 `
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getallDeptclosedTodayTicket: (callback) => {
        pool.query(
            `SELECT 
                cm_complaint_mast.complaint_slno
             FROM 
                cm_complaint_mast
             WHERE 
            DATE(cm_rectify_time) = CURRENT_DATE()`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getallDeptRegTodayInPend: (callback) => {
        pool.query(
            `SELECT            
            cm_complaint_mast.complaint_slno            
            FROM 
            cm_complaint_mast   
            WHERE 
            cm_complaint_mast.compalint_status = 0
            AND date(compalint_date)= CURRENT_DATE()`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getallDeptPevRegTodayAssing: (callback) => {
        pool.query(
            `SELECT            
            cm_complaint_mast.complaint_slno 
            FROM 
            cm_complaint_mast 
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            WHERE 
            DATE(assigned_date) = CURRENT_DATE()    
            and
            DATE(compalint_date) < CURRENT_DATE()           
            AND compalint_status > 0`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getallDepttRegTodayAssignToday: (callback) => {
        pool.query(
            `SELECT            
            cm_complaint_mast.complaint_slno 
            FROM 
            cm_complaint_mast 
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            WHERE 
            DATE(assigned_date) = CURRENT_DATE()    
            and
            DATE(compalint_date) = CURRENT_DATE()           
            AND compalint_status=1`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getallDeptPevAssingTodayRect: (callback) => {
        pool.query(
            `SELECT            
            cm_complaint_mast.complaint_slno 
            FROM 
            cm_complaint_mast 
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            WHERE 
            DATE(assigned_date) < CURRENT_DATE()    
            and
            DATE(cm_rectify_time) = CURRENT_DATE()           
            AND compalint_status>1`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getEmployeeuserrightsMenu: (data, callback) => {
        pool.query(
            `select 
            mod_grp_user_slno,user_grp_name,
            menu_slno,
            em_name,mod_grp_name,emp_slno,
            module_group_user_rights.mod_grp_slno,
            user_group_rights.user_group_slno,co_department_mast.dept_name,co_deptsec_mast.sec_name,
            dept_slno,deptsec_slno,
            if(mod_grp_user_status = 1 ,'Yes','No')mod_grp_user_status
            from  module_group_user_rights
            left join co_department_mast on co_department_mast.dept_id=module_group_user_rights.dept_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_name=module_group_user_rights.deptsec_slno
            left join co_employee_master on co_employee_master.em_id=module_group_user_rights.emp_slno
            left join module_group_mast on module_group_mast.mod_grp_slno=module_group_user_rights.mod_grp_slno
            left join user_group_mast on user_group_mast.user_grp_slno=module_group_user_rights.user_group_slno
             left join user_group_rights on user_group_rights.user_group_slno=user_group_mast.user_grp_slno
            where emp_slno=?
            and
            menu_view=1`,
            [
                data.empid

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },










}
