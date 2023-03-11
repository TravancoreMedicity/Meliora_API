const { pool, hrpool } = require('../../config/database')
module.exports = {
    getEmployeeID: (id, callBack) => {
        pool.query(
            `SELECT em_id FROM co_employee
        WHERE emp_no=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getMenuBasedRights: (id, callBack) => {
        pool.query(
            `call GET_MENU_RIGHT_SLNO(?)`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getSelectMenu: (callBack) => {
        pool.query(
            `SELECT 
            menu_slno
            FROM meliora.menu_master `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmpName: (callBack) => {
        pool.query(
            `SELECT 
            em_id,
            em_name
            FROM meliora.co_employee_master `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getModuleGroup: (callBack) => {
        pool.query(
            `SELECT 
            mod_grp_slno,
            mod_grp_name
            FROM meliora.module_group_mast `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //GET USER MODULE RIGHTS
    getUserModuleRights: (data, callBack) => {
        pool.query(
            `SELECT 
            module_group_mast.module_slno
        FROM
            module_group_user_rights
        LEFT JOIN
            module_group_mast ON module_group_mast.mod_grp_slno = module_group_user_rights.mod_grp_slno
        WHERE
            module_group_user_rights.emp_slno = ?`,
            [
                data.emp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT mod_grp_slno
            FROM sub_module_mast
            WHERE mod_grp_slno=?`,
            [
                data.mod_grp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    //GET USER MODULE RIGHTS
    getSubModuleRights: (data, callBack) => {
        pool.query(
            `SELECT 
            sub_module_mast.mod_sub_slno
        FROM
            module_group_user_rights
        LEFT JOIN
            sub_module_mast ON sub_module_mast.mod_grp_slno = module_group_user_rights.mod_grp_slno
        WHERE
            module_group_user_rights.emp_slno = ?`,
            [
                data.emp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getModuleMasterByID: (id, callBack) => {
        pool.query(
            `select sub_module_slno,sub_module_name from sub_modules 
where module_slno = ?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getempId: (callBack) => {
        pool.query(
            `SELECT * FROM serial_nos where serial_slno=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    inpatientList: (id, callBack) => {
        pool.query(
            `SELECT diet_patient.dietpt_slno,diet_patient.ip_no,diet_patient.pt_no,doc_name,rcc_desc,
            ptc_ptname,bdc_no,diet_patient.bd_code,plan_status,ora_roommaster.rmc_desc,ora_roomtype.rtc_desc,ipd_date
            FROM meliora.diet_patient
              LEFT JOIN ora_doctor on diet_patient.do_code=ora_doctor.do_code
            left join diet_plan on diet_patient.pt_no = diet_plan.pt_no
            left join ora_bed on diet_patient.bd_code =ora_bed.bd_code
              LEFT JOIN ora_roomcategory on diet_patient.rc_code=ora_roomcategory.rc_code
            left join ora_nurstation on  ora_bed.ns_code = ora_nurstation.ns_code
            left join ora_roomtype on ora_roomtype.rt_code=ora_bed.rt_code
            left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code     
            where  ora_nurstation.ns_code  = ? and ipd_status = 'N' order by diet_patient.ip_no DESC`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getBranch: (callBack) => {
        hrpool.query(
            `SELECT 
                branch_slno,
                branch_name
                FROM medi_hrm.hrm_branch `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDesignation: (callBack) => {
        hrpool.query(
            `SELECT 
            desg_slno,
            desg_name
                FROM medi_hrm.designation `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSalutation: (callBack) => {
        hrpool.query(
            `SELECT 
            sa_code,
            sal_name
                FROM medi_hrm.hrm_salutation`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSerialno: (callBack) => {
        pool.query(
            `SELECT * FROM serial_nos where serial_slno=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getproceedcount: (callBack) => {
        pool.query(
            `select count(DISTINCT(ip_no)) ' processcount' from diet_process_mast 
            where process_status=1 and discharge_status=1 and  DATE(diet_process_mast.process_date)=curdate()`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getNewOrderCount: (callBack) => {
        pool.query(
            `select 
            count(*) "neworder"
            from diet_plan
            where plan_slno not in (select plan_slno
            from diet_process_mast
            where date(process_date)=curdate())
            and discharge='N'`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getDietpatient: (data, callBack) => {
        pool.query(
            `SELECT ip_no,pt_no,ptc_ptname,diet_patient.bd_code,bdc_no FROM diet_patient
            LEFT JOIN ora_bed on ora_bed.bd_code=diet_patient.bd_code WHERE dietpt_slno=?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getNurstation: (callBack) => {
        pool.query(
            `select ns_code,
        nsc_desc 
        from ora_nurstation`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getDietMenu: (id, callBack) => {
        pool.query(
            `select dmenu_slno from diet_menu_setting 
            where diet_slno=?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getLoginProfile: (id, callBack) => {
        pool.query(
            `select em_name,
            em_department,
            em_dept_section,
            em_designation
             from co_employee_master  
                        where em_id=? and em_status=1`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    //DashBoard Section Rights
    getDashboardRights: (id, callBack) => {
        pool.query(
            ` select menu_name,user_group_rights.menu_slno  FROM  user_group_rights 
            left join module_group_user_rights ON module_group_user_rights.user_group_slno=user_group_rights.user_group_slno
            left join menu_master on menu_master.menu_slno=user_group_rights.menu_slno
                WHERE emp_slno = ? AND menu_view = 1 AND module_slno=14`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getEmployeedeptSec: (id, callBack) => {
        pool.query(
            `SELECT em_id, em_name FROM meliora.co_employee_master where em_dept_section=? 
            and em_status=1 and em_no!=1 and em_id!=1606`,
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
    getfloor: (callBack) => {
        pool.query(
            `SELECT floor_code,
            floor_desc
            FROM floor_master WHERE floor_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getnurstationbyfloor: (id, callBack) => {
        pool.query(
            `select co_nurse_desc ,co_nurse_slno from co_nursestation 
            where ns_floor = ? `,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getSerialnoEmpDetl: (callBack) => {
        pool.query(
            `SELECT * FROM serial_nos where serial_slno=4`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getInchargehod: (id, callBack) => {
        hrpool.query(
            `select 
            hod,
            incharge
             from hrm_emp_master  
                 where em_id=? `,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getdeptSecInchhod: (id, callBack) => {
        hrpool.query(
            `select auth_post,emp_id from hrm_authorization_assign
            where dept_section=? `,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateEmpMobileApp: (data, callBack) => {
        pool.query(
            `update co_employee_master
            set mobile_app_registred=?,
            app_token=?,
            mob_reg_date=?,
            token_valid=?,
            mobile_ip=?,
            mob_app_required=?
            where em_id=?`,
            [
                data.mobile_app_registred,
                data.app_token,
                data.mob_reg_date,
                data.token_valid,
                data.mobile_ip,
                data.mob_app_required,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updatemobapprequired: (data, callBack) => {
        pool.query(
            `update co_employee_master
            set mob_app_required=?
            where em_id=?`,
            [
                data.mob_app_required,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getMobileAppStatusCredential: (id, callBack) => {
        pool.query(
            `SELECT 
                mobile_app_registred,
                mob_app_required
            FROM co_employee_master 
            WHERE em_id = ?`,
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

}