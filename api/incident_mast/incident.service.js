const { pool, psspool, hspgspool } = require('../../config/database')
module.exports = {
    IncidetDetailInsert: (data, callback) => {
        pool.query(
            `INSERT INTO incident_master
          ( 
            incident_date, incident_dept, incident_reason, incident_details, incident_flag, create_user,
            qi_incident_flag,clinic_nonclinic,incident_mark_remarks,initial_incident_type,final_incident_type
          )
          VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.incident_date,
                data.incident_dept,
                data.incident_reason,
                data.incident_details,
                data.incident_flag,
                data.create_user,
                data.qi_incident_flag,
                data.clinic_nonclinic,
                data.incident_mark_remarks,
                data.initial_incident_type,
                data.final_incident_type
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    IncidentDetailsUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   incident_master 
             SET
                   incident_date=?,
                   incident_dept=?,
                   incident_reason=?,
                   incident_details=?,
                   edit_user=?,
                   initial_incident_type=?
             WHERE 
                   incident_slno=?`,
            [
                data.incident_date,
                data.incident_dept,
                data.incident_reason,
                data.incident_details,
                data.edit_user,
                data.initial_incident_type,
                data.incident_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    UpdateMarkedIncidentDetails: (data, callback) => {
        pool.query(
            `UPDATE 
                 incident_master 
             SET
                 incident_flag=?,
                 incident_mark_remarks=?,
                 verified_user=?,
                 final_incident_type=?,
                 verified_date=?
            WHERE 
                 incident_slno=?`,
            [
                data.incident_flag,
                data.incident_mark_remarks,
                data.verified_user,
                data.final_incident_type,
                data.verified_date,
                data.incident_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    deleteIncident: (id, callBack) => {
        pool.query(
            `DELETE from incident_master
            WHERE incident_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    // from endoscopy module, update each incidents
    ErrorIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_details_endoscopy 
             SET
                  error_status=1,
                  incident_error_slno=?,
                  incident_error_date=?,
                  error_details=?,
                  error_reason=?,
                  error_incident_type=?
            WHERE 
                  qi_slno=?`,
            [
                data.incident_error_slno,
                data.incident_error_date,
                data.error_details,
                data.error_reason,
                data.error_incident_type,
                data.qi_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    RedosIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_details_endoscopy 
             SET
                  redo_status=1,
                  incident_redos_slno=?,
                  incident_redos_date=?,
                  redos_details=?,
                  redos_reason=?,
                  redos_incident_type=?
            WHERE 
                  qi_slno=?`,
            [
                data.incident_redos_slno,
                data.incident_redos_date,
                data.redos_details,
                data.redos_reason,
                data.redos_incident_type,
                data.qi_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    IdentifErrorIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_details_endoscopy 
             SET
                  incidence_ident_error_status=1,
                  incidence_ident_slno=?,
                  incidence_ident_date=?,
                  incidence_ident_description=?,
                  incidence_ident_reason=?,
                  ident_error_incident_type=?
            WHERE 
                  qi_slno=?`,
            [
                data.incidence_ident_slno,
                data.incidence_ident_date,
                data.incidence_ident_description,
                data.incidence_ident_reason,
                data.ident_error_incident_type,
                data.qi_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    FallsIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_details_endoscopy 
             SET
                  falls_status=1,
                  incident_falls_slno=?,
                  incident_falls_date=?,
                  falls_details=?,
                  falls_reason=?,
                  falls_incident_type=?
            WHERE 
                  qi_slno=?`,
            [
                data.incident_falls_slno,
                data.incident_falls_date,
                data.falls_details,
                data.falls_reason,
                data.falls_incident_type,
                data.qi_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    SentinelIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_details_endoscopy 
             SET
                  sentinel_events_status=1,
                  incident_sentinel_slno=?,
                  incident_sentinel_date=?,
                  sentinel_details=?,
                  sentinel_reason=?,
                  sentinel_incident_type=?
            WHERE 
                  qi_slno=?`,
            [
                data.incident_sentinel_slno,
                data.incident_sentinel_date,
                data.sentinel_details,
                data.sentinel_reason,
                data.sentinel_incident_type,
                data.qi_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    NearMissessIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_details_endoscopy 
             SET
                  near_misses_status=1,
                  incident_nearmisses_slno=?,
                  incident_nearmisses_date=?,
                  nearmisses_details=?,
                  nearmisses_reason=?,
                  nearmiss_incident_type=?
            WHERE 
                  qi_slno=?`,
            [
                data.incident_nearmisses_slno,
                data.incident_nearmisses_date,
                data.nearmisses_details,
                data.nearmisses_reason,
                data.nearmiss_incident_type,
                data.qi_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    SearchIncidentDetails: (data, callBack) => {
        pool.query(
            `SELECT
                   incident_slno,incident_date,incident_dept,incident_reason,incident_details,incident_flag,
                   qi_incident_flag, clinic_nonclinic,qi_dept_mast.qi_dept_desc,incident_mark_remarks,
                   incident_master.create_user,verified_user,initial_incident_type,final_incident_type,
                   C.em_name as create_emp,V.em_name as verify_emp,verified_date
            FROM
                   incident_master
                   left join qi_dept_mast on qi_dept_mast.qi_dept_no=incident_master.incident_dept
                   left join co_employee_master C on C.em_id =incident_master.create_user
                   left join co_employee_master V on V.em_id =incident_master.verified_user
            WHERE
                   incident_date between ? and ? order by incident_date `,
            [
                data.from,
                data.to
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    IncidentApprovalChecks: (data, callBack) => {
        pool.query(
            `SELECT 
                   endo_incharge_apprv_status,endo_hod_apprv_status
             FROM
                   qi_endoscopy_approval_details
             WHERE
                   qi_endoscopy_approval_details.qi_endo_date=? and qi_endoscopy_approval_details.qi_dept_no=?`,
            [
                data.qi_endo_date,
                data.qi_dept_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    // from endoscopy Ip patients, update each incidents
    IPErrorIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_endoscopy_iplist 
             SET
                  error_status=1,
                  incident_error_slno=?,
                  incident_error_date=?,
                  error_details=?,
                  error_reason=?,
                  error_incident_type=?
            WHERE 
                  qi_endo_ip_slno=?`,
            [
                data.incident_error_slno,
                data.incident_error_date,
                data.error_details,
                data.error_reason,
                data.error_incident_type,
                data.qi_endo_ip_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    IPRedosIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_endoscopy_iplist 
             SET
                  redo_status=1,
                  incident_redos_slno=?,
                  incident_redos_date=?,
                  redos_details=?,
                  redos_reason=?,
                  redos_incident_type=?
            WHERE 
                  qi_endo_ip_slno=?`,
            [
                data.incident_redos_slno,
                data.incident_redos_date,
                data.redos_details,
                data.redos_reason,
                data.redos_incident_type,
                data.qi_endo_ip_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    IPIdentifErrorIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_endoscopy_iplist 
             SET
                  incidence_ident_error_status=1,
                  incidence_ident_slno=?,
                  incidence_ident_date=?,
                  incidence_ident_description=?,
                  incidence_ident_reason=?,
                  ident_error_incident_type=?
            WHERE 
                  qi_endo_ip_slno=?`,
            [
                data.incidence_ident_slno,
                data.incidence_ident_date,
                data.incidence_ident_description,
                data.incidence_ident_reason,
                data.ident_error_incident_type,
                data.qi_endo_ip_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    IPFallsIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_endoscopy_iplist 
             SET
                  falls_status=1,
                  incident_falls_slno=?,
                  incident_falls_date=?,
                  falls_details=?,
                  falls_reason=?,
                  falls_incident_type=?
            WHERE 
                  qi_endo_ip_slno=?`,
            [
                data.incident_falls_slno,
                data.incident_falls_date,
                data.falls_details,
                data.falls_reason,
                data.falls_incident_type,
                data.qi_endo_ip_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    IPSentinelIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_endoscopy_iplist 
             SET
                  sentinel_events_status=1,
                  incident_sentinel_slno=?,
                  incident_sentinel_date=?,
                  sentinel_details=?,
                  sentinel_reason=?,
                  sentinel_incident_type=?
            WHERE 
                  qi_endo_ip_slno=?`,
            [
                data.incident_sentinel_slno,
                data.incident_sentinel_date,
                data.sentinel_details,
                data.sentinel_reason,
                data.sentinel_incident_type,
                data.qi_endo_ip_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    IPNearMissessIncidentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   qi_endoscopy_iplist 
             SET
                  near_misses_status=1,
                  incident_nearmisses_slno=?,
                  incident_nearmisses_date=?,
                  nearmisses_details=?,
                  nearmisses_reason=?,
                  nearmiss_incident_type=?
            WHERE 
                  qi_endo_ip_slno=?`,
            [
                data.incident_nearmisses_slno,
                data.incident_nearmisses_date,
                data.nearmisses_details,
                data.nearmisses_reason,
                data.nearmiss_incident_type,
                data.qi_endo_ip_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    IncidentCategoryMaster: (data, callback) => {
        pool.query(
            `INSERT INTO incident_category_master
          ( 
            inc_category_name,
            inc_category_status,
            create_user
          )
          VALUES (?,?,?)`,
            [
                data.incident_category_name,
                data.incident_category_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    insertIncidentLevelApproval: (data, callback) => {
        pool.query(
            `INSERT INTO inc_approval_level_master
          ( 
            level_no,
            level_name,
            sec_id,
            emp_id,
            level_status,
            create_user
          )
          VALUES (?,?,?,?,?,?)`,
            [
                data.level_no,
                data.level_name,
                data.sec_id,
                data.emp_id,
                data.level_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getAllIncidentCategory: (callback) => {
        pool.query(
            `SELECT inc_category_slno,inc_category_name ,inc_category_status FROM incident_category_master`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    IncidentCategoryUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   incident_category_master 
             SET
                  inc_category_name= ?,
                  inc_category_status=?,
                  edit_user=?
            WHERE 
                  inc_category_slno=?`,
            [
                data.incident_category_name,
                data.incident_category_status,
                data.edit_user,
                data.incident_category_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    updateIncidentLevelApproval: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_approval_level_master 
             SET
                  level_no= ?,
                  level_name=?,
                  sec_id=?,
                  emp_id=?,
                  level_status=?
            WHERE 
                  level_slno=?`,
            [
                data.level_no,
                data.level_name,
                data.sec_id,
                data.emp_id,
                data.level_status,
                data.level_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    IncidentSubCategoryInsert: (data, callback) => {
        pool.query(
            `INSERT INTO incident_sub_category_master
          ( 
            inc_sub_category_name,
            inc_category_slno,
            inc_sub_category_status,
            create_user
          )
          VALUES (?,?,?,?)`,
            [
                data.subcategory_name,
                data.category_slno,
                data.subcategory_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllIncidentSubCategory: (callback) => {
        pool.query(
            `SELECT 
        inc_sub_category_name,
        inc_sub_cat_slno,
        inc_sub_category_status,
        incident_sub_category_master.inc_category_slno,
        incident_category_master.inc_category_name
    FROM
        incident_sub_category_master
    LEFT JOIN incident_category_master ON incident_category_master.inc_category_slno = incident_sub_category_master.inc_category_slno`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    FetchAllCollectionMap: (callback) => {
        pool.query(
            `SELECT 
            dcmm.inc_data_map_slno,
            dcmm.inc_category,
            dcmm.inc_category_dep, 
            dcmm.inc_data_map_status,
            cds.sec_name,
            idt.inc_dep_type_name,
            cdm.dept_name,
            cdm.dept_id
        FROM
            inc_data_collection_map_master  dcmm
        LEFT JOIN  co_deptsec_mast cds ON cds.sec_id = dcmm.inc_category_dep
        LEFT JOIN  co_department_mast cdm ON cds.dept_id = cdm.dept_id
        LEFT JOIN  inc_dep_type idt ON idt.inc_dep_type_slno = dcmm.inc_category
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getallMasterActionDetail: (callback) => {
        pool.query(
            `SELECT 
                inc_action_slno,
                inc_action_name,
                inc_action_status,
                inc_is_analysis,
                 inc_is_datacollection,
                 inc_is_action,
                 inc_action_item_stauts
            FROM
                inc_action_master 
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllLevelItemMapDetail: (callback) => {
        pool.query(
            `SELECT 
                iltm.inc_level_item_slno,
                iam.inc_action_name,
                iam.inc_action_item_stauts,
                apm.level_name,
                apm.level_count as level_no,
                iltm.level_slno,
                iltm.inc_action_slno,
                iltm.inc_level_item_status,
                cd.dept_name,
                cs.sec_name,
                iltm.dep_id,
                iltm.sec_id
            FROM
                    inc_level_item_map_master iltm
            LEFT JOIN inc_action_master iam on iam.inc_action_slno = iltm.inc_action_slno
            LEFT JOIN co_level_details apm on apm.detail_slno = iltm.level_slno
			LEFT JOIN co_department_mast cd on cd.dept_id = iltm.dep_id
			LEFT JOIN co_deptsec_mast cs on cs.sec_id = iltm.sec_id
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllLevelItems: (data, callback) => {
        pool.query(
            `SELECT 
                iltm.inc_level_item_slno,
                iam.inc_action_name,
                apm.level_name,
                apm.level_count as level_no,
                iltm.inc_level_item_status,
                 iam.inc_is_analysis,
                 iam.inc_action_slno,
                 iam.inc_is_datacollection,
                 iam.inc_is_action,
                 iam.inc_action_item_stauts
            FROM
                    inc_level_item_map_master iltm
            LEFT JOIN inc_action_master iam on iam.inc_action_slno = iltm.inc_action_slno
			LEFT JOIN co_level_details apm on apm.detail_slno = iltm.level_slno
            WHERE iltm.level_slno = ? AND iltm.inc_level_item_status = 1
        `,
            [
                data.level_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    checkAlreadyItemMaped: (data, callback) => {
        pool.query(
            `select 
            inc_level_item_slno
             from 
             inc_level_item_map_master 
             where 
             level_slno =  ? and inc_action_slno = ?  and sec_id = ? and dep_id = ?`,
            [
                data.level_slno,
                data.inc_action_slno,
                data.dep_id,
                data.sec_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    FetchAllDepartmentType: (callback) => {
        pool.query(
            `SELECT 
            inc_dep_type_slno,
            inc_dep_type_name,
            inc_dep_type_status            
        FROM
            inc_dep_type`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllSettings: (callback) => {
        pool.query(
            `SELECT 
            inc_cs_slno,
            inc_setting_key,
            inc_setting_label,
            inc_cs_status            
        FROM
            inc_common_settings where inc_cs_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllCommonSetting: (callback) => {
        pool.query(
            `SELECT 
            inc_cs_slno,
            inc_setting_key,
            inc_setting_label,
            inc_cs_status            
        FROM
            inc_common_settings`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getFishboneDetails: (data, callback) => {
        pool.query(
            `SELECT 
            inc_fba_slno,
            inc_register_slno,
            fba.dep_slno,
            inc_material,
            inc_machine,
            inc_man,
            inc_milieu,
            inc_method,
            inc_measurement,
            fba.create_user,
            inc_fba_status,
            cdm.sec_name,
            inc_data_collection_slno,
            cm.em_name
        FROM
            inc_fish_bone_analysis  fba
		LEFT JOIN 
			co_deptsec_mast cdm on cdm.sec_id = fba.dep_slno 
		LEFT JOIN
			co_employee_master cm ON cm.em_id = fba.create_user
		where fba.dep_slno = ? and inc_register_slno = ? and fba.inc_fba_status = 1`,
            [
                data.dept_id,
                data.incident_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllFishBoneAnalysisDetail: (data, callback) => {
        pool.query(
            `SELECT 
                inc_fba_slno,
                inc_register_slno,
                inc_data_collection_slno,
                dep_slno,
                inc_material,
                inc_machine,
                inc_man,
                inc_milieu,
                inc_method,
                inc_measurement,
                fba.create_user,
                inc_fba_status,
                cds.sec_name,
                cem.em_name
            from  inc_fish_bone_analysis fba
            left join co_deptsec_mast cds on cds.sec_id = fba.dep_slno
            left join co_employee_master cem on cem.em_id = fba.create_user
            where inc_register_slno = ? and inc_fba_status = 1`,
            [
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllActiveDeparments: (data, callback) => {
        pool.query(
            `SELECT 
                dept_id,
                dept_name,
                dept_alias,
                dept_type,
                dept_status
            FROM
                co_department_mast
            WHERE
                dept_status = 1`,
            [
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllHighLevelReview: (data, callback) => {
        pool.query(
            `SELECT 
                level_review_slno,
                ilr.level_slno,
                level_review_state,
                level_review,
                ilr.level_employee,
                level_review_date,
                level_review_status,
                cem.em_name,
                level_name,
                apm.level_count as level_no
            FROM
                inc_levels_review ilr
			LEFT JOIN co_employee_master cem on cem.em_id = ilr.level_employee
			LEFT JOIN co_level_details apm on apm.detail_slno = ilr.level_slno AND apm.status= 1
            WHERE
                inc_register_slno = ? and level_review_status = 1`,
            [
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    InsertDepartmentAction: (data, callback) => {
        pool.query(
            `INSERT INTO inc_dep_action_detail
          ( 
            inc_register_slno,
            inc_action_req_dep,
            inc_action_collect_dep,
            inc_action_req_user,
            inc_dep_action_remark,
            inc_dep_action_detail_status,
            inc_cs_slno,
            level_no
          )
           VALUES ?`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getAllCommonSettingMapMaster: (callback) => {
        pool.query(
            `SELECT 
    inc_cs_dep_map_slno,
    icdm.inc_cs_slno,
    inc_dep_id,
    inc_dep_map_status,
    cdm.dept_name,
    inc_setting_key,
    inc_setting_label,
    icdm.inc_emp_id,
    icdm.inc_dep_sec,
    cem.em_name,
    sec.sec_name,
    icdm.inc_dep_sec,
    icdm.inc_emp_id
FROM
    inc_common_setting_dep_map_master icdm
        LEFT JOIN
    inc_common_settings ics ON ics.inc_cs_slno = icdm.inc_cs_slno
   LEFT JOIN
    co_employee_master cem on cem.em_id = icdm.inc_emp_id
    LEFT JOIN
    co_deptsec_mast sec ON sec.sec_id = icdm.inc_dep_sec
		LEFT JOIN 
	co_department_mast cdm on cdm.dept_id = icdm.inc_dep_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    getAllDataCollectionCommonSetting: (callback) => {
        pool.query(
            `SELECT 
                inc_cs_dep_map_slno,
                ics.inc_cs_slno,
                inc_dep_id,
                inc_dep_map_status,
                cdm.dept_name,
                inc_setting_key,
                inc_setting_label,
                icdm.inc_dep_sec,
                icdm.inc_emp_id
            FROM inc_common_settings ics
            INNER JOIN inc_common_setting_dep_map_master icdm 
                ON ics.inc_cs_slno = icdm.inc_cs_slno 
                AND icdm.inc_dep_map_status = 1
            INNER JOIN co_department_mast cdm 
                ON cdm.dept_id = icdm.inc_dep_id
            WHERE 
                inc_cs_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    checkIfLevelExist: (data, callback) => {
        pool.query(
            `SELECT 
        level_slno
    FROM
        inc_approval_level_master
    where level_no = ?`,
            [
                data.level_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    fetchAllLevelApprovals: (callback) => {
        pool.query(
            `
            SELECT 
                level_slno, 
                level_no,
                level_name,
                emp_id,
                level_status,
                em_name,
                sec_name,
                level_priority,
                inc_approval_level_master.sec_id
            FROM
                inc_approval_level_master 
                    LEFT JOIN co_employee_master ON co_employee_master.em_id = inc_approval_level_master.emp_id
                    LEFT JOIN co_deptsec_mast ON co_deptsec_mast.sec_id = inc_approval_level_master.sec_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    IncidentSubCategoryUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   incident_sub_category_master 
             SET
                  inc_sub_category_name= ?,
                  inc_category_slno=?,
                  inc_sub_category_status=?,
                  edit_user=?
            WHERE 
                  inc_sub_cat_slno=?`,
            [
                data.subcategory_name,
                data.category_slno,
                data.subcategory_status,
                data.edit_user,
                data.subcategory_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    FindIncidentSubCategoryIfAlreadyExist: (data, callback) => {
        pool.query(
            `SELECT 
                inc_sub_category_name, inc_category_slno
            FROM
                incident_sub_category_master
            where inc_sub_category_name = ? and inc_category_slno = ?`,
            [
                data.subcategory_name,
                data.category_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllDataCollectionEmployeeDetail: (callback) => {
        pool.query(
            `SELECT 
                inc_dc_emp_slno,
                inc_sec_id,
                inc_emp_id,
                inc_dc_emp_status,
                cm.em_name,
                cds.sec_name
            FROM
                inc_data_collection_emp_master idce
            LEFT JOIN
                co_employee_master cm ON idce.inc_emp_id = cm.em_id
            LEFT JOIN
                co_deptsec_mast cds ON idce.inc_sec_id = cds.sec_id
            `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getAllActiveDataCollectionEmployeeDetail: (data, callback) => {
        pool.query(
            `SELECT 
                inc_dc_emp_slno,
                inc_sec_id,
                inc_emp_id as em_id,
                inc_dc_emp_status,
                cm.em_name,
                cds.sec_name
            FROM
                inc_data_collection_emp_master idce
            LEFT JOIN
                co_employee_master cm ON idce.inc_emp_id = cm.em_id
            LEFT JOIN
                co_deptsec_mast cds ON idce.inc_sec_id = cds.sec_id
            WHERE
                inc_dc_emp_status = 1 and inc_sec_id = ? `,
            [
                data.sec_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllDepartmentActions: (data, callback) => {

        pool.query(
            `
SELECT 
    inc_dep_action_detail_slno,
    inc_action_req_dep ,
    inc_action_collect_dep,
    inc_dep_action_status,
    inc_action,
    inc_dep_action_detail_status,
    inc_action_req_user,
    inc_action_ack_user,
    inc_action_ack_date,
    inc_dep_action_remark,
    inc_file_status,
    ics.inc_cs_slno,
    cdm.dept_name as requested_department,
    adm.dept_name as acknowledged_department,
    ics.inc_setting_key,
    ics.inc_setting_label,
    cm.em_name as requested_employee,
    cma.em_name as acknowledge_employee,
    cds.sec_name as requested_emp_sec,
    cd.desg_name,
    idad.create_date
FROM
    inc_dep_action_detail idad
        LEFT JOIN
    inc_common_settings ics ON ics.inc_cs_slno = idad.inc_cs_slno
		LEFT JOIN 
	co_department_mast cdm on cdm.dept_id = idad.inc_action_req_dep
    LEFT JOIN 
	co_department_mast adm on adm.dept_id = idad.inc_action_collect_dep
    LEFT JOIN
    co_employee_master cm ON idad.inc_action_req_user = cm.em_id
        LEFT JOIN
    co_deptsec_mast cds ON cm.em_dept_section = cds.sec_id
     LEFT JOIN
    co_employee_master cma ON idad.inc_action_ack_user = cma.em_id
    LEFT JOIN
    co_designation cd ON cm.em_designation = cd.desg_slno
WHERE
    idad.inc_register_slno = ? and inc_dep_action_detail_status =  1`,
            [
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getPatientDetail: (data, callback) => {
        pool.query(
            `
            SELECT 
            fb_ip_no, 
            fb_ipd_date,
            fb_pt_no,
            fb_ptc_name,
            fb_ptc_sex, 
            fb_ptd_dob,
            fb_ptd_dob_new,
            fb_ptn_dayage, 
            fb_ptn_monthage,
            fb_ptn_yearage,
            fb_ptc_loadd1,
            fb_ptc_loadd2,
            fb_ptc_loadd3, 
            fb_ptc_loadd4,
            fb_rc_code,
            fb_ipadmiss.fb_bd_code,
            fb_do_code,
            fb_rs_code,
            fb_ipd_disc, 
            fb_ipc_status,
            fb_dmc_slno,
            fb_dmd_date,
            fb_dmd_date_new,
            fb_ptc_mobile,
            fb_ipc_mhcode,
            fb_doc_name,
            fb_ipc_curstatus,
            fb_dep_desc,
            fb_ns_name
            FROM
                fb_ipadmiss
            left join fb_bed on fb_bed.fb_bd_code = fb_ipadmiss.fb_bd_code
            left join fb_nurse_station_master on fb_nurse_station_master.fb_ns_code = fb_bed.fb_ns_code
            WHERE
                fb_pt_no = ?
                    OR fb_ip_no = ?
            ORDER BY fb_ipd_date DESC
            LIMIT 1;
            `,
            [
                data.searchkey,
                data.searchkey
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getProfessionalStaff: (data, callback) => {
        psspool.query(
            `
        SELECT 
            em_id,
            em_no,
            em_salutation,
            em_name,
            em_gender,
            em_dob,
            em_age_year,
            em_age_month,
            em_age_day,
            em_doj,
            em_mobile,
            em_phone,
            em_email,
            em_branch,
            em_department,
            em_dept_section,
            em_institution_type,
            em_designation,
            em_doc_type,
            em_category,
            em_prob_end_date,
            em_conf_end_date,
            em_retirement_date,
            em_contract_end_date,
            em_status,
            hrm_emp_master.create_user,
            addressPermnt1,
            addressPermnt2, 
            hrm_pin1,
            em_region,
            addressPresent1,
            addressPresent2,
            hrm_pin2, 
            hrm_region2, 
            blood_slno,
            hrm_religion,
            contract_status, dept_name  , sect_name  
            FROM hrm_emp_master
            inner join hrm_department on dept_id=em_department
            inner join hrm_dept_section on sect_id=em_dept_section
            WHERE em_no = ?
            `,
            [
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getHsPgStaffDetail: (data, callback) => {
        hspgspool.query(
            `
        SELECT 
            em_id,
            em_no,
            em_salutation,
            em_name,
            em_gender,
            em_dob,
            em_age_year,
            em_age_month,
            em_age_day,
            em_doj,
            em_mobile,
            em_phone,
            em_email,
            em_branch,
            em_department,
            em_dept_section,
            em_institution_type,
            em_designation,
            em_doc_type,
            em_category,
            em_prob_end_date,
            em_conf_end_date,
            em_retirement_date,
            em_contract_end_date,
            em_status,
            hrm_emp_master.create_user,
            addressPermnt1,
            addressPermnt2, 
            hrm_pin1,
            em_region,
            addressPresent1,
            addressPresent2,
            hrm_pin2, 
            hrm_region2, 
            blood_slno,
            hrm_religion,
            contract_status, dept_name  , sect_name  
            FROM hrm_emp_master
            inner join hrm_department on dept_id=em_department
            inner join hrm_dept_section on sect_id=em_dept_section
            WHERE em_no = ?
            `,
            [
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getAllPgHsStaffDetail: (callback) => {
        hspgspool.query(
            `
        SELECT 
            em_id,
            em_no,
            em_salutation,
            em_name,
            em_gender,
            em_dob,
            em_age_year,
            em_age_month,
            em_age_day,
            em_doj,
            em_mobile,
            em_phone,
            em_email,
            em_branch,
            em_department,
            em_dept_section,
            em_institution_type,
            em_designation,
            em_doc_type,
            em_category,
            em_prob_end_date,
            em_conf_end_date,
            em_retirement_date,
            em_contract_end_date,
            em_status,
            hrm_emp_master.create_user,
            addressPermnt1,
            addressPermnt2, 
            hrm_pin1,
            em_region,
            addressPresent1,
            addressPresent2,
            hrm_pin2, 
            hrm_region2, 
            blood_slno,
            hrm_religion,
            contract_status, dept_name  , sect_name  
            FROM hrm_emp_master
            inner join hrm_department on dept_id=em_department
            inner join hrm_dept_section on sect_id=em_dept_section
            where em_status =1 
            `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },



    getAllassetDtl: (data, callback) => {
        pool.query(
            `
        SELECT
           am_category_pm_days,
           am_asset_item_map_master.am_item_map_slno,  
           am_asset_item_map_master.item_creation_slno,
           item_dept_slno, 
           item_deptsec_slno,
           co_department_mast.dept_name as deptname,
           co_deptsec_mast.sec_name as secname,
           item_custodian_dept,
           am_custodian_name,
           am_manufacture_no,
           am_category.category_name,
           am_item_name_creation.item_name,
           item_asset_no,
           item_asset_no_only,
           due_date
           FROM am_asset_item_map_master
           LEFT JOIN co_department_mast 
               ON co_department_mast.dept_id = am_asset_item_map_master.item_dept_slno
           LEFT JOIN co_deptsec_mast 
               ON co_deptsec_mast.sec_id = am_asset_item_map_master.item_deptsec_slno
           LEFT JOIN am_item_name_creation 
               ON am_item_name_creation.item_creation_slno = am_asset_item_map_master.item_creation_slno
           LEFT JOIN am_custodian_department 
               ON am_custodian_department.am_custodian_slno = am_asset_item_map_master.item_custodian_dept
           LEFT JOIN am_item_map_amcpm_detail 
               ON am_item_map_amcpm_detail.am_item_map_slno = am_asset_item_map_master.am_item_map_slno
           LEFT JOIN am_item_map_details 
               ON am_item_map_details.am_item_map_slno = am_asset_item_map_master.am_item_map_slno
           LEFT JOIN am_category 
               ON am_category.category_slno = am_item_name_creation.item_category_slno
           WHERE item_create_status = 1 AND  item_asset_no_only= ? AND item_asset_no = ?
           GROUP BY 
            am_category_pm_days,
            am_asset_item_map_master.am_item_map_slno,  
            am_asset_item_map_master.item_creation_slno,
            item_dept_slno,
            item_deptsec_slno,
            co_department_mast.dept_name, 
            co_deptsec_mast.sec_name,
            item_custodian_dept,
            am_custodian_name,
            am_manufacture_no,
            am_category.category_name,
            am_item_name_creation.item_name,
            item_asset_no,
            item_asset_no_only,
            due_date
            ORDER BY am_asset_item_map_master.am_item_map_slno ASC
            `,
            [
                data.item_asset_no_only,
                data.item_asset_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    IncidentRegistration: (data, callback) => {
        pool.query(
            `INSERT INTO inc_register_master (
            inc_initiator_slno,
            nature_of_inc,
            inc_describtion,
            file_status,
            inc_status,
            dep_slno,
            sec_slno,
            create_user,
            inc_data_collection_req,
            inc_reg_corrective
        ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.inc_initiator_slno,
                JSON.stringify(data.nature_of_inc), // if array, store as JSON string
                data.inc_describtion,
                data.file_status,
                data.inc_status,
                data.dep_slno,
                data.sec_slno,
                data.create_user,
                data.inc_data_collection_req,
                data.inc_reg_corrective
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                // return callback(null, results);
                return callback(null, { insertId: results.insertId });
            }
        );
    },

    InsertIncPatientDetail: (data, callback) => {
        pool.query(
            `INSERT INTO inc_patient_dtl (
            inc_register_slno,
            inc_pt_name,
            mrd_no,
            inc_pt_gender,
            inc_pt_mobile,
            inc_pt_age,
            inc_pt_address,
            create_user
        ) VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
            [
                data.inc_register_slno,
                data.inc_pt_name,
                data.inc_pt_no,
                data.inc_pt_gender,
                data.inc_pt_mobile,
                data.inc_pt_age,
                data.inc_pt_address,
                data.create_user
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    InsertIncStaffDetail: (data, callback) => {
        pool.query(
            `INSERT INTO inc_staff_dtl (
            inc_register_slno,
            inc_staff_type_slno,
            emp_id,
            emp_user_name,
            emp_name,
            emp_age,
            emp_gender,
            emp_desig,
            emp_dept,
            emp_dept_sec,
            emp_mob,
            emp_email,
            emp_address,
            emp_joining_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.inc_register_slno,
                data.inc_staff_type_slno,
                data.emp_id,
                data.emp_user_name,
                data.emp_name,
                data.emp_age,
                data.emp_gender,
                data.emp_desig,
                data.emp_dept,
                data.emp_dept_sec,
                data.emp_mob,
                data.emp_email,
                data.emp_address,
                data.emp_joining_date
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, { insertId: results.insertId });
            }
        );
    },
    IncidentVisitorDetail: (data, callback) => {
        pool.query(
            `INSERT INTO inc_visitor_dtl (
            inc_register_slno,
            inc_visitor_name,
            inc_visitor_age,
            inc_visitor_gender,
            inc_visitor_mobile,
            inc_visitor_address,
            inc_visit_purpose,
            create_user
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.inc_register_slno,
                data.inc_visitor_name,
                data.inc_visitor_age,
                data.inc_visitor_gender,
                data.inc_visitor_mobile,
                data.inc_visitor_address,
                data.inc_visit_purpose,
                data.create_user
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, { insertId: results.insertId });
            }
        );
    },
    IncidentAssetDtl: (data, callback) => {
        pool.query(
            `INSERT INTO inc_asset_dtl (
            inc_register_slno,
            inc_is_asset,
            asset_item_slno,
            custodian_dept_slno,
            item_name,
            item_location,
            manufacture_slno,
            create_user
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.inc_register_slno,
                data.inc_is_asset,
                data.asset_item_slno,
                data.custodian_dept_slno,
                data.item_name,
                data.item_location,
                data.manufacture_slno,
                data.create_user
            ],
            (error, results) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    InsertIncCommonDetail: (data, callback) => {
        pool.query(
            `INSERT INTO inc_common_dtl (
            inc_register_slno,
            inc_common_description,
            create_user
        ) VALUES (?, ?, ?)`,
            [
                data.inc_register_slno,
                data.inc_common_description,
                data.create_user
            ],
            (error, results) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },


    // rohith
    getAllIncidentDetail: (data, callback) => {
        pool.query(
            `
            SELECT 
                irm.inc_register_slno,
                irm.inc_initiator_slno,
                irm.nature_of_inc,
                irm.inc_describtion,
                irm.file_status,
                irm.inc_status,
                irm.create_user,
                irm.edit_user,
                irm.create_date,
                irm.inc_sacmatrix_detail,
                irm.inc_reg_corrective,
                irm.inc_all_approved,
                irm.inc_current_level,
                irm.inc_current_level_review_state,
                ipd.mrd_no,
                ipd.inc_pt_name,
                ipd.inc_pt_gender,
                ipd.inc_pt_mobile,
                ipd.inc_pt_age,
                ipd.inc_pt_address,
                isd.inc_staff_type_slno,
                isd.emp_id,
                isd.emp_user_name,
                isd.emp_name,
                isd.emp_age,
                isd.emp_gender,
                isd.emp_desig,
                isd.emp_dept,
                isd.emp_dept_sec,
                isd.emp_mob,
                isd.emp_email,
                isd.emp_address,
                isd.emp_joining_date,
                ivd.inc_visitor_name,
                ivd.inc_visitor_age,
                ivd.inc_visitor_gender,
                ivd.inc_visitor_mobile,
                ivd.inc_visitor_address,
                ivd.inc_visit_purpose,
                iad.inc_is_asset,
                iad.asset_item_slno,
                iad.custodian_dept_slno,
                iad.item_name,
                iad.item_location,
                iad.manufacture_slno,
                cm.em_name,
                dp.dept_name,
                ds.sec_name,
                iniat.inc_initiator_name,
                ist.inc_staff_type_name,
                level_slno,
                level_review_state,
                cld.level_name,
                cd.desg_name,
                icd.inc_common_description,
                icd.inc_common_dtl_slno,
                irm.inc_data_collection_req,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'section', cds.sec_name,
                        'inc_dep_status', idc.inc_dep_status,
            'fba_status',idc.inc_dep_fba_status
                    )
                ) AS data_collection_details
            FROM
                inc_register_master irm
                    LEFT JOIN
                inc_patient_dtl ipd ON irm.inc_register_slno = ipd.inc_register_slno
                    AND irm.inc_initiator_slno = 1
                    LEFT JOIN
                inc_staff_dtl isd ON irm.inc_register_slno = isd.inc_register_slno
                    AND irm.inc_initiator_slno = 2
                    LEFT JOIN
                inc_visitor_dtl ivd ON irm.inc_register_slno = ivd.inc_register_slno
                    AND irm.inc_initiator_slno = 3
                    LEFT JOIN
                inc_asset_dtl iad ON irm.inc_register_slno = iad.inc_register_slno
                    AND irm.inc_initiator_slno = 4
                    LEFT JOIN
                inc_common_dtl icd ON irm.inc_register_slno = icd.inc_register_slno
                    AND irm.inc_initiator_slno = 5
                    LEFT JOIN
                co_employee_master cm ON irm.create_user = cm.em_id
                    LEFT JOIN
                co_department_mast dp ON cm.em_department = dp.dept_id
                    LEFT JOIN
                co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
                    LEFT JOIN
                inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
                    LEFT JOIN
                inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
                    LEFT JOIN
                co_designation as cd on cd.desg_slno =  cm.em_designation
                    LEFT JOIN 
                inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
                    LEFT JOIN 
                co_deptsec_mast cds ON cds.sec_id = idc.inc_req_collect_dep
                    LEFT JOIN
                co_employee_master cem ON cem.em_id = idc.inc_req_user
                    LEFT JOIN 
                co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
                LEFT JOIN 
                inc_levels_review ilr ON ilr.inc_register_slno = irm.inc_register_slno
                LEFT JOIN 
                co_level_details cld ON cld.detail_slno = ilr.level_slno   
            WHERE
                irm.inc_status = 1 and irm.create_user = ?
            GROUP BY irm.inc_register_slno
    `
            ,
            [
                data.logged_user
            ],
            (error, results) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    getAllCurrentLevelApproval: ({ query, params }, callback) => {
        pool.query(query, params, (error, results) => {
            if (error) {
                console.error("SQL Error:", error);
                return callback(error);
            }
            return callback(null, results);
        });

    },

    // get based on The Logged Employee
    getAllCurrentInidentsForApproval: ({ query, params }, callback) => {
        pool.query(query, params, (error, results) => {
            if (error) {
                console.error("SQL Error:", error);
                return callback(error);
            }
            return callback(null, results);
        });

    },

    // not using
    getAllQADIncident: (callback) => {
        pool.query(
            `
SELECT 
    irm.inc_register_slno,
    irm.inc_initiator_slno,
    irm.nature_of_inc,
    irm.inc_describtion,
    irm.file_status,
    irm.inc_status,
    irm.create_user,
    irm.edit_user,
    irm.create_date,
    irm.inc_incharge_ack,
    irm.inc_hod_ack,
    irm.inc_incharge_reivew_state,
    irm.inc_incharge_review,
    irm.inc_incharge_review_date,
    irm.inc_hod_reivew_state,
    irm.inc_hod_review,
    irm.inc_hod_review_date,
    irm.inc_current_level,
    irm.inc_qad_ack,
    irm.inc_qad_review,
    irm.inc_qad_review_date,
    irm.inc_qad_review_state,
    irm.inc_sacmatrix_detail,
    ipd.mrd_no,
    ipd.inc_pt_name,
    ipd.inc_pt_gender,
    ipd.inc_pt_mobile,
    ipd.inc_pt_age,
    ipd.inc_pt_address,
    isd.inc_staff_type_slno,
    isd.emp_id,
    isd.emp_user_name,
    isd.emp_name,
    isd.emp_age,
    isd.emp_gender,
    isd.emp_desig,
    isd.emp_dept,
    isd.emp_dept_sec,
    isd.emp_mob,
    isd.emp_email,
    isd.emp_address,
    isd.emp_joining_date,
    ivd.inc_visitor_name,
    ivd.inc_visitor_age,
    ivd.inc_visitor_gender,
    ivd.inc_visitor_mobile,
    ivd.inc_visitor_address,
    ivd.inc_visit_purpose,
    iad.inc_is_asset,
    iad.asset_item_slno,
    iad.custodian_dept_slno,
    iad.item_name,
    iad.item_location,
    iad.manufacture_slno,
    cm.em_name,
    dp.dept_name,
    ds.sec_name,
    iniat.inc_initiator_name,
    ist.inc_staff_type_name,
    inch.em_name as incharge_name,
    hod.em_name as hod_name,
    qad.em_name as qad_name,
    irm.inc_evaluation_status,
    irm.inc_preventive_action,
    irm.inc_corrective_action,
    irm.inc_rca,
    irm.inc_rca_qad_approve,
    irm.inc_rca_hod_approve,
    irm.inc_corrective_hod_approval,
    irm.inc_preventive_qad_approval,
    cd.desg_name,   
    irm.inc_data_collection_req,
    icd.inc_common_description,
    icd.inc_common_dtl_slno,
    JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'section', cds.sec_name,
                        'inc_dep_status', idc.inc_dep_status,
            'fba_status',idc.inc_dep_fba_status
                    )
                ) AS data_collection_details
FROM
    inc_register_master irm
        LEFT JOIN
    inc_patient_dtl ipd ON irm.inc_register_slno = ipd.inc_register_slno
        AND irm.inc_initiator_slno = 1
        LEFT JOIN
    inc_staff_dtl isd ON irm.inc_register_slno = isd.inc_register_slno
        AND irm.inc_initiator_slno = 2
        LEFT JOIN
    inc_visitor_dtl ivd ON irm.inc_register_slno = ivd.inc_register_slno
        AND irm.inc_initiator_slno = 3
        LEFT JOIN
    inc_asset_dtl iad ON irm.inc_register_slno = iad.inc_register_slno
        AND irm.inc_initiator_slno = 4
        LEFT JOIN
    inc_common_dtl icd ON irm.inc_register_slno = icd.inc_register_slno
        AND irm.inc_initiator_slno = 5
        LEFT JOIN
    co_employee_master cm ON irm.create_user = cm.em_id
        LEFT JOIN
    co_department_mast dp ON cm.em_department = dp.dept_id
        LEFT JOIN
    co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
        LEFT JOIN
    inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
        LEFT JOIN
    inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
    LEFT JOIN
    co_designation as cd on cd.desg_slno =  cm.em_designation
    LEFT JOIN 
    inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
        LEFT JOIN 
    co_deptsec_mast cds ON cds.sec_id = idc.inc_req_collect_dep
        LEFT JOIN
    co_employee_master cem ON cem.em_id = idc.inc_req_user
        LEFT JOIN 
    co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
    WHERE 
    (irm.inc_incharge_ack = 1 AND irm.inc_incharge_reivew_state = 'A')
    OR 
    (irm.inc_hod_ack = 1 AND irm.inc_hod_reivew_state = 'A')
    GROUP BY irm.inc_register_slno
    `,
            [],
            (error, results) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },

    // need change in this Query later Remember that  // not using
    getAllIncidentHodIncharge: (data, callback) => {
        pool.query(
            `
    SELECT 
    irm.inc_register_slno,
    irm.inc_initiator_slno,
    irm.nature_of_inc,
    irm.inc_describtion,
    irm.file_status,
    irm.inc_status,
    irm.create_user,
    irm.edit_user,
    irm.create_date,
    irm.inc_incharge_ack,
    irm.inc_hod_ack,
    irm.inc_incharge_reivew_state,
    irm.inc_incharge_review,
    irm.inc_incharge_review_date,
    irm.inc_hod_reivew_state,
    irm.inc_hod_review,
    irm.inc_hod_review_date,
    irm.inc_current_level,
    irm.inc_qad_ack,
    irm.inc_qad_review,
    irm.inc_qad_review_date,
    irm.inc_qad_review_state,
    irm.inc_sacmatrix_detail,
    ipd.mrd_no,
    ipd.inc_pt_name,
    ipd.inc_pt_gender,
    ipd.inc_pt_mobile,
    ipd.inc_pt_age,
    ipd.inc_pt_address,
    isd.inc_staff_type_slno,
    isd.emp_id,
    isd.emp_user_name,
    isd.emp_name,
    isd.emp_age,
    isd.emp_gender,
    isd.emp_desig,
    isd.emp_dept,
    isd.emp_dept_sec,
    isd.emp_mob,
    isd.emp_email,
    isd.emp_address,
    isd.emp_joining_date,
    ivd.inc_visitor_name,
    ivd.inc_visitor_age,
    ivd.inc_visitor_gender,
    ivd.inc_visitor_mobile,
    ivd.inc_visitor_address,
    ivd.inc_visit_purpose,
    iad.inc_is_asset,
    iad.asset_item_slno,
    iad.custodian_dept_slno,
    iad.item_name,
    iad.item_location,
    iad.manufacture_slno,
    cm.em_name,
    dp.dept_name,
    ds.sec_name,
    iniat.inc_initiator_name,
    ist.inc_staff_type_name,
    cd.desg_name,
    irm.inc_data_collection_req,
    icd.inc_common_description,
    icd.inc_common_dtl_slno,
    irm.dep_slno,
    irm.sec_slno,
    JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'section', cds.sec_name,
                        'inc_dep_status', idc.inc_dep_status,
                        'fba_status',idc.inc_dep_fba_status
                    )
                ) AS data_collection_details
FROM    
    inc_register_master irm
        LEFT JOIN
    inc_patient_dtl ipd ON irm.inc_register_slno = ipd.inc_register_slno
        AND irm.inc_initiator_slno = 1
        LEFT JOIN
    inc_staff_dtl isd ON irm.inc_register_slno = isd.inc_register_slno
        AND irm.inc_initiator_slno = 2
        LEFT JOIN
    inc_visitor_dtl ivd ON irm.inc_register_slno = ivd.inc_register_slno
        AND irm.inc_initiator_slno = 3
        LEFT JOIN
    inc_asset_dtl iad ON irm.inc_register_slno = iad.inc_register_slno
        AND irm.inc_initiator_slno = 4
        LEFT JOIN
    inc_common_dtl icd ON irm.inc_register_slno = icd.inc_register_slno
        AND irm.inc_initiator_slno = 5
        LEFT JOIN
    co_employee_master cm ON irm.create_user = cm.em_id
        LEFT JOIN
    co_department_mast dp ON cm.em_department = dp.dept_id
        LEFT JOIN
    co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
        LEFT JOIN
    inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
        LEFT JOIN
    inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
        LEFT JOIN
    co_designation as cd on cd.desg_slno =  cm.em_designation
    LEFT JOIN 
    inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
        LEFT JOIN 
    co_deptsec_mast cds ON cds.sec_id = idc.inc_req_collect_dep
        LEFT JOIN
    co_employee_master cem ON cem.em_id = idc.inc_req_user
        LEFT JOIN 
    co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
    where 
    irm.inc_status = 1 and irm.dep_slno = ? and sec_slno = ?
    GROUP BY irm.inc_register_slno
    `
            ,
            [
                data.dep_slno,
                data.sec_slno
            ],
            (error, results) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },


    IncidentUpdation: (data, callback) => {
        pool.query(
            `UPDATE inc_register_master 
         SET    
            nature_of_inc = ?,
            inc_describtion = ?,
            file_status = ?,
            inc_status = ?,
            edit_user = ?,
            inc_reg_corrective=?
         WHERE inc_register_slno = ?`,
            [
                JSON.stringify(data.nature_of_inc),
                data.inc_describtion,
                data.file_status,
                data.inc_status,
                data.edit_user,
                data.inc_reg_corrective,
                data.inc_register_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                if (results.affectedRows > 0) {
                    return callback(null, { success: 2, message: "Incident Updated Successfully" });
                } else {
                    return callback(null, { success: 0, message: "No record found to update" });
                }
            }
        );
    },

    InchargeApproval: (data, callback) => {
        pool.query(
            `UPDATE inc_register_master 
         SET    
                inc_incharge_ack = ?,
                inc_incharge_emp = ?,
                inc_incharge_reivew_state = ?,
                inc_incharge_review = ?,
                 inc_corrective_action = ?,
                 inc_rca =?,
                inc_incharge_review_date = NOW()
         WHERE inc_register_slno = ?`,
            [
                data.inc_incharge_ack,
                data.inc_incharge_emp,
                data.inc_incharge_reivew_state,
                data.inc_incharge_review,
                data.inc_corrective_action,
                data.inc_rca,
                data.inc_register_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                if (results.affectedRows > 0) {
                    return callback(null, { success: 2, message: "Incident Updated Successfully" });
                } else {
                    return callback(null, { success: 0, message: "No record found to update" });
                }
            }
        );
    },
    // hodApproval: (data, callback) => {
    //     pool.query(
    //         `UPDATE inc_register_master 
    //      SET    
    //             inc_hod_ack = ?,
    //             inc_hod_emp = ?,
    //             inc_hod_reivew_state = ?,
    //             inc_hod_review = ?,
    //             inc_preventive_action = ?,
    //             inc_hod_review_date = NOW()
    //      WHERE inc_register_slno = ?`,
    //         [
    //             data.inc_hod_ack,
    //             data.inc_hod_emp,
    //             data.inc_hod_reivew_state,
    //             data.inc_hod_review,
    //             data.inc_preventive_action,
    //             data.inc_register_slno
    //         ],
    //         (error, results, fields) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             if (results.affectedRows > 0) {
    //                 return callback(null, { success: 2, message: "Incident Updated Successfully" });
    //             } else {
    //                 return callback(null, { success: 0, message: "No record found to update" });
    //             }
    //         }
    //     );
    // },
    hodApproval: (data, callback) => {
        pool.query(data.sql, data.params, (error, results) => {
            if (error) return callback(error);

            if (results.affectedRows > 0) {
                callback(null, { success: 2, message: "Incident Updated Successfully" });
            } else {
                callback(null, { success: 0, message: "No record found to update" });
            }
        });
    },

    // highLevelApprovals: (data, callback) => {
    //     pool.query(
    //         `UPDATE inc_register_master 
    //      SET    
    //             inc_current_level = ?,
    //             inc_current_level_review_state = ?
    //      WHERE inc_register_slno = ?`,
    //         [
    //             data.inc_current_level,
    //             data.inc_current_level_review_state,
    //             data.inc_register_slno
    //         ],
    //         (error, results, fields) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             if (results.affectedRows > 0) {
    //                 return callback(null, { success: 2, message: "Incident Updated Successfully" });
    //             } else {
    //                 return callback(null, { success: 0, message: "No record found to update" });
    //             }
    //         }
    //     );
    // },

    highLevelApprovals: (data, callback) => {

        let query = `UPDATE inc_register_master SET 
                    inc_current_level = ?,
                    inc_current_level_review_state = ?`;

        const values = [
            data.inc_current_level,
            data.inc_current_level_review_state
        ];

        if (data.inc_category) {
            query += `, inc_category = ?`;
            values.push(data.inc_category);
        }

        if (data.inc_subcategory) {
            query += `, inc_subcategory = ?`;
            values.push(data.inc_subcategory);
        }

        if (data.inc_sacmatrix_detail) {
            query += `, inc_sacmatrix_detail = ?`;
            values.push(data.inc_sacmatrix_detail);
        }
        if (data.inc_all_approved) {
            query += `, inc_all_approved = ?`;
            values.push(data.inc_all_approved);
        }
        if (data.file_status) {
            query += `, file_status = ?`;
            values.push(data.file_status);
        }

        query += ` WHERE inc_register_slno = ?`;
        values.push(data.inc_register_slno);

        pool.query(query, values, (error, results) => {
            if (error) return callback(error);

            if (results.affectedRows > 0)
                return callback(null, { success: 2, message: "Incident Updated Successfully" });

            return callback(null, { success: 0, message: "No record found to update" });
        });
    },

    insertDataCollectionMap: (data, callback) => {
        pool.query(
            `INSERT INTO inc_data_collection_map_master 
            (   inc_category, 
                inc_category_dep,
                inc_data_map_status,
                create_user
            ) 
            VALUES (?,?,?,?)`,
            [
                data.inc_category,
                data.inc_category_dep,
                data.inc_data_map_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    InsertLevelReviewDetail: (data, callback) => {
        pool.query(
            `INSERT INTO inc_levels_review 
        ( 
            inc_register_slno,
            level_slno,
            level_review_state,
            level_review,
            level_employee,
            level_review_date,
            level_review_status
        ) 
        VALUES (?,?,?,?,?,NOW(),?)`,
            [
                data.inc_register_slno,
                data.level_slno,
                data.level_review_state,
                data.level_review,
                data.level_employee,
                data.level_review_status,
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    ChangeIncidentStatus: (data, callback) => {
        pool.query(
            `UPDATE inc_register_master 
                SET inc_status = 0
            WHERE inc_register_slno = ?`,
            [
                data.incident_slno
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    InsertLevelActionReview: (data, callback) => {
        pool.query(
            `INSERT INTO inc_level_action_review 
        ( 
            inc_register_slno,
            level_review_slno,
            inc_action_slno,
            inc_action_review,
            inc_action_review_status
        ) 
        VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },




    insertCommonSetting: (data, callback) => {
        pool.query(
            `INSERT INTO inc_common_settings 
            (   inc_setting_key, 
                inc_setting_label,
                inc_cs_status,
                create_user
            ) 
            VALUES (?,?,?,?)`,
            [
                data.inc_setting_key,
                data.inc_setting_label,
                data.inc_cs_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },

    insertCommonSettingMapMaster: (data, callback) => {
        pool.query(
            `INSERT INTO inc_common_setting_dep_map_master 
            (   inc_cs_slno, 
                inc_dep_id,
                inc_dep_sec,
                inc_emp_id,
                inc_dep_map_status,
                create_user
            ) 
            VALUES (?,?,?,?,?,?)`,
            [
                data.inc_cs_slno,
                data.inc_dep_id,
                data.inc_dep_sec,
                data.inc_emp_id,
                data.inc_dep_map_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    IncidentActionMaster: (data, callback) => {
        pool.query(
            `INSERT INTO inc_action_master 
            (   inc_action_name, 
                inc_action_status,
                create_user
            ) 
            VALUES (?,?,?)`,
            [
                data.inc_action_name,
                data.inc_action_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    getAllCommonLevelDetailMaster: (data, callback) => {
        pool.query(
            `SELECT 
                lm.level_master_id,
                lm.dep_id,
                lm.sec_id,
                lm.module_slno,
                lm.section_lvl_count,
                lm.create_date,
                lm.update_date,
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'section_id', lms.section_id,
                            'level_slno', lms.level_master_slno,
                            'lvl_count_section', lms.lvl_count_section,
                            'mandatory', lms.mandatory,
                            'secion_lvl',lms.secion_lvl

                        )
                    )
                    FROM co_level_master_section lms
                    WHERE lms.level_master_slno = lm.level_master_id
                ) AS sections,


                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'detail_slno', ld.detail_slno,
                            'section_slno', ld.section_slno,
                            'level_slno', ld.level_master_slno,
                            'level', ld.level,
                            'level_name', ld.level_name,
                            'level_emp_id', ld.level_emp_id,
                            'level_priority', ld.priority_status,
                            'level_status', ld.status,
                            'level_no',ld.level_count,
                            'em_name',cm.em_name
                        )
                    )
                    FROM co_level_details ld
                    LEFT JOIN co_employee_master cm ON cm.em_id = ld.level_emp_id
                    WHERE ld.level_master_slno = lm.level_master_id
                ) AS levels

            FROM co_level_master lm
            WHERE lm.dep_id =? and  sec_id =? and module_slno= 20`,
            [
                data.dep_slno,
                data.sec_slno
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },

    getAllCommonLevelDetail: ({ query, params }, callback) => {
        pool.query(query, params, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },
    getAllEmployeeApprovalDepartments: (data, callback) => {
        pool.query(
            `SELECT 
                dep_id,
                sec_id,
                level_count as level_no,
                level_name,
                priority_status as level_priority,
                detail_slno
            FROM
                co_level_details cld
                    LEFT JOIN
                co_level_master clm ON clm.level_master_id = cld.level_master_slno
            WHERE
                cld.level_emp_id = ? and clm.module_slno = 20`,
            [
                data.emp_id,
                data.level_no
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    getCurrentEmployeeLevelOne: (data, callback) => {
        pool.query(
            `SELECT 
                dep_id,
                sec_id,
                level_count as level_no,
                level_name,
                priority_status as level_priority,
                detail_slno,
                cld.level_emp_id,
                cem.em_name
            FROM co_level_details cld
                    LEFT JOIN co_level_master clm ON clm.level_master_id = cld.level_master_slno
                    LEFT JOIN co_employee_master cem ON cem.em_id = cld.level_emp_id
            WHERE
                clm.sec_id = ? and clm.module_slno = ? and cld.level_count = 1`,
            [
                data.sec_id,
                data.module_slno
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    insertDataCollectionEmployeeDetail: (data, callback) => {
        pool.query(
            `INSERT INTO inc_data_collection_emp_master 
            (  
                inc_sec_id,
                inc_emp_id,
                inc_dc_emp_status
            ) 
            VALUES (?,?,?)`,
            [
                data.inc_sec_id,
                data.inc_emp_id,
                data.inc_dc_emp_status
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    insertIncidentNature: (data, callback) => {
        pool.query(
            `INSERT INTO inc_nature 
            (  
                inc_nature_name,
                inc_nature_status,
                create_user
            ) 
            VALUES (?,?,?)`,
            [
                data.inc_nature_name,
                data.inc_nature_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },

    InsertLevelItemMapDetail: (data, callback) => {
        pool.query(
            `INSERT INTO inc_level_item_map_master 
            (   level_slno, 
                inc_action_slno,
                inc_level_item_status,
                create_user,
                dep_id,
                sec_id
            ) 
            VALUES (?,?,?,?,?,?)`,
            [
                data.level_slno,
                data.inc_action_slno,
                data.inc_level_item_status,
                data.create_user,
                data.dep_id,
                data.sec_id
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },

    insertFishBoneQuestion: (data, callback) => {
        pool.query(
            `INSERT INTO inc_fish_bone_analysis 
            (  
                inc_register_slno, 
                dep_slno,
                inc_data_collection_slno, 
                inc_material,
                inc_machine,
                inc_man,
                inc_milieu,
                inc_method,
                inc_measurement,
                create_user,
                inc_fba_status           
            ) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.inc_register_slno,
                data.dep_slno,
                data.inc_data_collection_slno,
                data.inc_material,
                data.inc_machine,
                data.inc_man,
                data.inc_milieu,
                data.inc_method,
                data.inc_measurement,
                data.create_user,
                data.inc_fba_status
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    UpdateLevelDetiails: (data, callback) => {
        pool.query(
            `UPDATE inc_levels_review 
                SET level_review = ?
            WHERE level_review_slno = ?`,
            [
                data.level_review,
                data.level_review_slno
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    //inc_category_dep,
    getEmployeeDepartmentType: (data, callback) => {
        pool.query(
            `select 
                cdm.dept_id
             from 
             inc_data_collection_map_master idcm
               LEFT JOIN  co_deptsec_mast cds ON cds.sec_id = idcm.inc_category_dep
                LEFT JOIN  co_department_mast cdm ON cds.dept_id = cdm.dept_id
              where 
              inc_data_map_status = 1 and  inc_category = ?`,
            [
                data.inc_category,
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    // IsDepartmentDataCollectionAlreadyExist: (data, callback) => {
    //     console.log(data,"data");

    //     pool.query(
    //         `Select 
    //             inc_req_collect_dep,
    //             inc_req_user,
    //             inc_data_collection_status,
    //             inc_req_remark,
    //             inc_data_req_dep
    //         from inc_data_collection
    //         where  inc_register_slno = ? and inc_data_req_dep = ? and inc_req_collect_dep = ?`,
    //         [
    //             data
    //         ],
    //         (error, results, fields) => {
    //             if (error) return callback(error);
    //             callback(null, results);

    //         }
    //     );
    // },

    requestDataCollection: (data, callback) => {
        pool.query(
            `INSERT INTO inc_data_collection 
            (   inc_register_slno, 
                inc_req_collect_dep,
                inc_req_user,
                inc_data_collection_status,
                inc_req_remark,
                inc_data_req_dep,
                inc_req_collect_emp,
                level_no,
                is_rca_needed,
                is_fishbone_needed,
                is_preventive_needed
            ) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.slno,
                data.departments,
                data.createUser,
                data.status,
                data.remark,
                data.requested_department,
                data.requested_employee,
                data.level_no,
                data.is_rca_needed,
                data.is_fishbone_needed,
                data.is_preventive_needed
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);

            }
        );
    },
    checkDataCollectionAlreadyExist: (data, callback) => {
        pool.query(
            `SELECT  inc_data_collection_req FROM inc_register_master WHERE inc_register_slno = ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                if (results.affectedRows > 0) {
                    return callback(null, { success: 2, message: "Incident Updated Successfully" });
                } else {
                    callback(null, results);
                }
            }
        );
    },
    checkAlreadyMapedEmployee: (data, callback) => {
        pool.query(
            `SELECT  inc_dc_emp_slno 
            FROM inc_data_collection_emp_master
             WHERE inc_sec_id = ? and inc_emp_id = ?`,
            [
                data.inc_sec_id,
                data.inc_emp_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                if (results.affectedRows > 0) {
                    return callback(null, { success: 2, message: "Incident Updated Successfully" });
                } else {
                    callback(null, results);
                }
            }
        );
    },


    // getAllDepartmentDataCollection: (data, callback) => {
    //     pool.query(
    //         `SELECT  inc_data_collection_req FROM inc_register_master WHERE inc_register_slno = ?`,
    //         [
    //             data
    //         ],
    //         (error, results, fields) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             if (results.affectedRows > 0) {
    //                 return callback(null, { success: 2, message: "Incident Updated Successfully" });
    //             } else {
    //                 callback(null, results);
    //             }
    //         }
    //     );
    // },

    UpdateDataCollectionReqStatus: (data, callback) => {
        pool.query(
            `UPDATE inc_register_master 
         SET    
                inc_data_collection_req = 1
         WHERE inc_register_slno = ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                if (results.affectedRows > 0) {
                    return callback(null, { success: 2, message: "Incident Updated Successfully" });
                } else {
                    return callback(null, { success: 0, message: "No record found to update" });
                }
            }
        );
    },
    updateDataCollectionEmployeeDetail: (data, callback) => {
        pool.query(
            `UPDATE inc_data_collection_emp_master 
                SET    
                        inc_sec_id = ?,
                        inc_emp_id = ?,
                        inc_dc_emp_status = ?
                WHERE inc_dc_emp_slno = ?`,
            [
                data.inc_sec_id,
                data.inc_emp_id,
                data.inc_dc_emp_status,
                data.inc_dc_emp_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                if (results.affectedRows > 0) {
                    return callback(null, { success: 2, message: "Incident Updated Successfully" });
                } else {
                    return callback(null, { success: 0, message: "No record found to update" });
                }
            }
        );
    },
    updateIncidentNature: (data, callback) => {
        pool.query(
            `UPDATE inc_nature 
                SET    
                        inc_nature_name = ?,
                        inc_nature_status = ?,
                        edit_user = ?
                WHERE inc_nature_slno = ?`,
            [
                data.inc_nature_name,
                data.inc_nature_status,
                data.edit_user,
                data.inc_nature_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                if (results.affectedRows > 0) {
                    return callback(null, { success: 2, message: "Incident Updated Successfully" });
                } else {
                    return callback(null, { success: 0, message: "No record found to update" });
                }
            }
        );
    },
    QadApproval: (data, callback) => {
        pool.query(
            `UPDATE inc_register_master 
         SET    
                inc_qad_ack = ?,
                inc_qad_emp = ?,
                inc_qad_review_state = ?,
                inc_qad_review = ?,
                inc_evaluation_status = ?,
                inc_qad_review_date = NOW(),
                inc_category = ?,
                inc_subcategory = ?,
                inc_sacmatrix_detail = ?
         WHERE inc_register_slno = ?`,
            [
                data.inc_qad_ack,
                data.inc_qad_emp,
                data.inc_qad_review_state,
                data.inc_qad_review,
                data.inc_evaluation_status,
                data.inc_category,
                data.inc_subcategory,
                data.inc_sacmatrix_detail,
                data.inc_register_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                if (results.affectedRows > 0) {
                    return callback(null, { success: 2, message: "Incident Updated Successfully" });
                } else {
                    return callback(null, { success: 0, message: "No record found to update" });
                }
            }
        );
    },
    hodRcaApproval: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_register_master 
             SET
                  inc_rca_hod_approve = 'A'
            WHERE 
                  inc_register_slno=?`,
            [
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    qadRcaApproval: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_register_master 
             SET
                  inc_rca_qad_approve = 'A'
            WHERE 
                  inc_register_slno=?`,
            [
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    qadPreventiveApproval: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_register_master 
             SET
                  inc_preventive_qad_approval = 'A',
                  inc_preventive_qad_aprvl_date = NOW()

            WHERE 
                  inc_register_slno=?`,
            [
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    hodCorrectiveApproval: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_register_master 
             SET
                  inc_corrective_hod_approval = 'A',
                  inc_corrective_hod_aprvl_date = NOW()
            WHERE 
                  inc_register_slno=?`,
            [
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    hodCorrectiveUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_register_master 
             SET
                  inc_corrective_action = ?
            WHERE 
                  inc_register_slno=?`,
            [
                data.inc_corrective_action,
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    hodPreventiveUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_register_master 
             SET
                  inc_preventive_action = ?
            WHERE 
                  inc_register_slno=?`,
            [
                data.inc_preventive_action,
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    qadEvalutaionUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_register_master 
             SET
                  inc_evaluation_status = ?
            WHERE 
                  inc_register_slno=?`,
            [
                data.inc_evaluation_status,
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    rcaUpdation: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_register_master 
             SET
                  inc_rca = ?
            WHERE 
                  inc_register_slno=?`,
            [
                data.inc_rca,
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    updateDataCollectionMap: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_data_collection_map_master 
             SET
                  inc_category = ?,
                  inc_category_dep = ?,
                  inc_data_map_status = ?,
                  edit_user = ?
            WHERE 
                  inc_data_map_slno=?`,
            [
                data.inc_category,
                data.inc_category_dep,
                data.inc_data_map_status,
                data.edit_user,
                data.inc_data_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    updateCommonSetting: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_common_settings 
             SET
                inc_setting_key = ?, 
                inc_setting_label = ?,
                inc_cs_status = ?,
                edit_user = ?
            WHERE 
                  inc_cs_slno= ?`,
            [
                data.inc_setting_key,
                data.inc_setting_label,
                data.inc_cs_status,
                data.edit_user,
                data.inc_cs_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    updateCommonSettingMapMaster: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_common_setting_dep_map_master 
             SET
                  inc_cs_slno = ?,
                  inc_dep_id = ?,
                  inc_dep_sec = ?,
                  inc_emp_id = ?,
                  inc_dep_map_status = ?,
                  edit_user = ?
            WHERE 
                  inc_cs_dep_map_slno=?`,
            [
                data.inc_cs_slno,
                data.inc_dep_id,
                data.inc_dep_sec,
                data.inc_emp_id,
                data.inc_dep_map_status,
                data.edit_user,
                data.inc_cs_dep_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    UpdateLevelItemMapDetail: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_level_item_map_master 
             SET
                  level_slno = ?,
                  inc_action_slno = ?,
                  inc_level_item_status = ?,
                  edit_user = ?,
                  dep_id=?,
                  sec_id=?
            WHERE 
                  inc_level_item_slno=?`,
            [
                data.level_slno,
                data.inc_action_slno,
                data.inc_level_item_status,
                data.edit_user,
                data.dep_id,
                data.sec_id,
                data.inc_level_item_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    IndidentActionMasterUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_action_master 
             SET
                  inc_action_name = ?,
                  inc_action_status = ?,
                  edit_user = ?
            WHERE 
                  inc_action_slno=?`,
            [
                data.inc_action_name,
                data.inc_action_status,
                data.edit_user,
                data.inc_action_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    // getAllInvolvedDepartment
    getAllInvolvedDepartment: (data, callback) => {
        pool.query(
            `
        SELECT 
            idc.inc_dep_rca,
            idc.inc_dep_preventive_action,
            inc_dep_status,
            cm.em_name as Requested_user,
            mc.em_name as acknowledged_user,
            ds.sec_name as dept_name, 
            dss.sec_name as requested_dep,
            idc.inc_req_ack_date,
            idc.create_date as Requested_date,
            inc_req_collect_dep,
            inc_ddc_file_status,
            inc_data_collection_slno,
            inc_req_remark,
            rmc.em_name as Requested_to,
            idc.inc_req_collect_emp,
            idc.inc_common_review
        FROM
            inc_data_collection idc
            LEFT JOIN
            co_employee_master cm ON idc.inc_req_user = cm.em_id
            LEFT JOIN
            co_employee_master mc ON idc.inc_req_ack_user = mc.em_id
            LEFT JOIN
            co_deptsec_mast ds ON ds.sec_id = idc.inc_req_collect_dep
            LEFT JOIN
            co_deptsec_mast dss ON dss.sec_id = idc.inc_data_req_dep
            LEFT JOIN
            co_employee_master rmc ON idc.inc_req_collect_emp = rmc.em_id            
        WHERE
            idc.inc_data_collection_status= 1 and idc.inc_register_slno = ?
`,
            [
                data.inc_register_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    fetchAllInvolvedEmployeeDep: (data, callback) => {
        pool.query(
            `
      SELECT 
            idc.inc_dep_rca,
            idc.inc_dep_preventive_action,
            inc_dep_status,
            cm.em_name as Requested_user,
            mc.em_name as acknowledged_user,
            ds.sec_name as dept_name, 
            dss.sec_name as requested_dep,
            idc.inc_req_ack_date,
            idc.create_date as Requested_date,
            inc_req_collect_dep,
            inc_ddc_file_status,
            inc_data_collection_slno,
            inc_req_remark,
            rmc.em_name as Requested_to,
            idc.inc_req_collect_emp,
            idc.is_rca_needed,
            idc.is_fishbone_needed,
            idc.is_preventive_needed,
            idc.inc_common_review
        FROM
            inc_data_collection idc
            LEFT JOIN
            co_employee_master cm ON idc.inc_req_user = cm.em_id
            LEFT JOIN
            co_employee_master mc ON idc.inc_req_ack_user = mc.em_id
            LEFT JOIN
            co_deptsec_mast ds ON ds.sec_id = idc.inc_req_collect_dep
            LEFT JOIN
            co_deptsec_mast dss ON dss.sec_id = idc.inc_data_req_dep
            LEFT JOIN
            co_employee_master rmc ON idc.inc_req_collect_emp = rmc.em_id            
        WHERE
            idc.inc_data_collection_status= 1 and idc.inc_register_slno = ? and inc_req_collect_emp = ?
`,
            [
                data.inc_register_slno,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    SingleDepartmentDataCollectionDetail: (data, callback) => {
        pool.query(
            `
      SELECT 
            idc.inc_dep_rca,
            idc.inc_dep_preventive_action,
            inc_dep_status,
            cm.em_name as Requested_user,
            mc.em_name as acknowledged_user,
            ds.sec_name as dept_name, 
            dss.sec_name as requested_dep,
            idc.inc_req_ack_date,
            idc.create_date as Requested_date,
            inc_req_collect_dep,
            inc_ddc_file_status,
            inc_data_collection_slno,
            inc_req_remark,
            rmc.em_name as Requested_to,
            idc.inc_req_collect_emp
        FROM
            inc_data_collection idc
            LEFT JOIN
            co_employee_master cm ON idc.inc_req_user = cm.em_id
            LEFT JOIN
            co_employee_master mc ON idc.inc_req_ack_user = mc.em_id
            LEFT JOIN
            co_deptsec_mast ds ON ds.sec_id = idc.inc_req_collect_dep
            LEFT JOIN
            co_deptsec_mast dss ON dss.sec_id = idc.inc_data_req_dep
            LEFT JOIN
            co_employee_master rmc ON idc.inc_req_collect_emp = rmc.em_id            
        WHERE
            idc.inc_data_collection_status= 1 and idc.inc_register_slno = ? and inc_req_collect_emp = ? and inc_data_collection_slno = ?
`,
            [
                data.inc_register_slno,
                data.em_id,
                data.id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getCurrentEmployeeType: (data, callback) => {
        pool.query(
            `
        SELECT 
            dept_type
        FROM
            co_department_mast
        WHERE
            dept_id = ?
`,
            [
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getDepartmentDataCollection: (data, callback) => {
        pool.query(
            `
SELECT 
    irm.inc_register_slno,
    irm.inc_initiator_slno,
    irm.nature_of_inc,
    irm.inc_describtion,
    irm.file_status,
    irm.inc_status,
    irm.create_user,
    irm.edit_user,
    irm.create_date,
    irm.inc_current_level,
    irm.inc_sacmatrix_detail,
    ipd.mrd_no,
    ipd.inc_pt_name,
    ipd.inc_pt_gender,
    ipd.inc_pt_mobile,
    ipd.inc_pt_age,
    ipd.inc_pt_address,
    isd.inc_staff_type_slno,
    isd.emp_id,
    isd.emp_user_name,
    isd.emp_name,
    isd.emp_age,
    isd.emp_gender,
    isd.emp_desig,
    isd.emp_dept,
    isd.emp_dept_sec,
    isd.emp_mob,
    isd.emp_email,
    isd.emp_address,
    isd.emp_joining_date,
    ivd.inc_visitor_name,
    ivd.inc_visitor_age,
    ivd.inc_visitor_gender,
    ivd.inc_visitor_mobile,
    ivd.inc_visitor_address,
    ivd.inc_visit_purpose,
    iad.inc_is_asset,
    iad.asset_item_slno,
    iad.custodian_dept_slno,
    iad.item_name,
    iad.item_location,
    iad.manufacture_slno,
    cm.em_name,
    dp.dept_name,
    ds.sec_name,
    iniat.inc_initiator_name,
    ist.inc_staff_type_name,
    cd.desg_name,
    irm.inc_data_collection_req,
    idc.inc_dep_rca,
    idc.inc_dep_preventive_action,
    irm.dep_slno,
    irm.sec_slno,
    idc.inc_req_remark,
    cem.em_name AS Requested_user,
    mc.em_name AS Acknowledged_user,
    idc.create_date AS Requested_date,
    cds.sec_name AS acknowledge_user_dep,
    idc.inc_data_collection_slno,
    level_slno,
    level_review_state,
    cld.level_name,
    idc.inc_dep_status,
    icd.inc_common_description,
    icd.inc_common_dtl_slno,
    isc.inc_sub_category_name,
    ircm.inc_category_name,
    cdd.sec_name AS requested_user_dep,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'section', cds.sec_name,
            'inc_dep_status', idc.inc_dep_status,
            'fba_status',idc.inc_dep_fba_status,
            'inc_ddc_file_status',idc.inc_ddc_file_status
        )
    ) AS data_collection_details

FROM inc_register_master irm

    LEFT JOIN inc_patient_dtl ipd 
        ON irm.inc_register_slno = ipd.inc_register_slno 
       AND irm.inc_initiator_slno = 1

    LEFT JOIN inc_staff_dtl isd 
        ON irm.inc_register_slno = isd.inc_register_slno 
       AND irm.inc_initiator_slno = 2

    LEFT JOIN inc_visitor_dtl ivd 
        ON irm.inc_register_slno = ivd.inc_register_slno 
       AND irm.inc_initiator_slno = 3

    LEFT JOIN inc_asset_dtl iad 
        ON irm.inc_register_slno = iad.inc_register_slno 
       AND irm.inc_initiator_slno = 4
        LEFT JOIN
    inc_common_dtl icd ON irm.inc_register_slno = icd.inc_register_slno
        AND irm.inc_initiator_slno = 5
    LEFT JOIN co_employee_master cm ON irm.create_user = cm.em_id
    LEFT JOIN co_department_mast dp ON cm.em_department = dp.dept_id
    LEFT JOIN co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
    LEFT JOIN inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
    LEFT JOIN inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
    LEFT JOIN co_designation cd ON cd.desg_slno = cm.em_designation
    LEFT JOIN inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
    LEFT JOIN co_deptsec_mast cds ON cds.sec_id = idc.inc_req_collect_dep
    LEFT JOIN co_deptsec_mast cdd ON cdd.sec_id = idc.inc_data_req_dep
    LEFT JOIN co_employee_master cem ON cem.em_id = idc.inc_req_user
    LEFT JOIN co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
    LEFT JOIN inc_levels_review ilr ON ilr.inc_register_slno = irm.inc_register_slno
    LEFT JOIN incident_sub_category_master isc ON irm.inc_subcategory = isc.inc_sub_cat_slno
    LEFT JOIN incident_category_master ircm ON irm.inc_category = ircm.inc_category_slno
    LEFT JOIN co_level_details cld ON cld.detail_slno = ilr.level_slno        
WHERE irm.inc_status = 1 
  AND idc.inc_req_collect_dep = ?
  AND idc.inc_req_collect_emp = ?
  AND idc.inc_data_collection_status = 1
GROUP BY irm.inc_register_slno`,
            [
                data.dept_id,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllActionDetails: (data, callback) => {
        pool.query(
            `
            SELECT 
                irm.inc_register_slno,
                irm.inc_initiator_slno,
                irm.nature_of_inc,
                irm.inc_describtion,
                irm.file_status,
                irm.inc_status,
                irm.create_user,
                irm.edit_user,
                irm.create_date,
                irm.inc_current_level,
                irm.inc_sacmatrix_detail,
                irm.inc_reg_corrective,
                ipd.mrd_no,
                ipd.inc_pt_name,
                ipd.inc_pt_gender,
                ipd.inc_pt_mobile,
                ipd.inc_pt_age,
                ipd.inc_pt_address,
                isd.inc_staff_type_slno,
                isd.emp_id,
                isd.emp_user_name,
                isd.emp_name,
                isd.emp_age,
                isd.emp_gender,
                isd.emp_desig,
                isd.emp_dept,
                isd.emp_dept_sec,
                isd.emp_mob,
                isd.emp_email,
                isd.emp_address,
                isd.emp_joining_date,
                ivd.inc_visitor_name,
                ivd.inc_visitor_age,
                ivd.inc_visitor_gender,
                ivd.inc_visitor_mobile,
                ivd.inc_visitor_address,
                ivd.inc_visit_purpose,
                iad.inc_is_asset,
                iad.asset_item_slno,
                iad.custodian_dept_slno,
                iad.item_name,
                iad.item_location,
                iad.manufacture_slno,
                cm.em_name,
                dp.dept_name,
                ds.sec_name,
                iniat.inc_initiator_name,
                ist.inc_staff_type_name,
                cd.desg_name,
                irm.inc_data_collection_req,
                idc.inc_dep_rca,
                idc.inc_dep_preventive_action,
                irm.dep_slno,
                irm.sec_slno,
                idc.inc_req_remark,
                cem.em_name AS Requested_user,
                mc.em_name AS Acknowledged_user,
                idc.create_date AS Requested_date,
                cds.sec_name AS acknowledge_user_dep,
                idc.inc_data_collection_slno,
                isc.inc_sub_category_name,
                ircm.inc_category_name,
                idc.inc_dep_status,
                level_slno,
                level_review_state,
                cld.level_name,
                            icd.inc_common_description,
                icd.inc_common_dtl_slno,
                cdd.sec_name AS requested_user_dep,
                idad.inc_dep_action_status,

                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'section', cds.sec_name,
                        'inc_dep_status', idc.inc_dep_status,
                        'fba_status',idc.inc_dep_fba_status
                    )
                ) AS data_collection_details

            FROM inc_register_master irm

                LEFT JOIN inc_patient_dtl ipd 
                    ON irm.inc_register_slno = ipd.inc_register_slno 
                AND irm.inc_initiator_slno = 1

                LEFT JOIN inc_staff_dtl isd 
                    ON irm.inc_register_slno = isd.inc_register_slno 
                AND irm.inc_initiator_slno = 2

                LEFT JOIN inc_visitor_dtl ivd 
                    ON irm.inc_register_slno = ivd.inc_register_slno 
                AND irm.inc_initiator_slno = 3

                LEFT JOIN inc_asset_dtl iad 
                    ON irm.inc_register_slno = iad.inc_register_slno 
                AND irm.inc_initiator_slno = 4
                    LEFT JOIN
                inc_common_dtl icd ON irm.inc_register_slno = icd.inc_register_slno
                    AND irm.inc_initiator_slno = 5
                LEFT JOIN co_employee_master cm ON irm.create_user = cm.em_id
                LEFT JOIN co_department_mast dp ON cm.em_department = dp.dept_id
                LEFT JOIN co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
                LEFT JOIN inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
                LEFT JOIN inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
                LEFT JOIN co_designation cd ON cd.desg_slno = cm.em_designation
                LEFT JOIN inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
                LEFT JOIN co_deptsec_mast cds ON cds.sec_id = idc.inc_req_collect_dep
                LEFT JOIN co_deptsec_mast cdd ON cdd.sec_id = idc.inc_data_req_dep
                LEFT JOIN co_employee_master cem ON cem.em_id = idc.inc_req_user
                LEFT JOIN co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
                LEFT JOIN inc_dep_action_detail idad ON idad.inc_register_slno = irm.inc_register_slno
                LEFT JOIN inc_levels_review ilr ON ilr.inc_register_slno = irm.inc_register_slno
                LEFT JOIN incident_sub_category_master isc ON irm.inc_subcategory = isc.inc_sub_cat_slno
                LEFT JOIN incident_category_master ircm ON irm.inc_category = ircm.inc_category_slno
                LEFT JOIN co_level_details cld ON cld.detail_slno = ilr.level_slno 
            WHERE irm.inc_status = 1 
            AND idad.inc_action_collect_dep = ?
            AND idad.inc_dep_action_detail_status = 1
            GROUP BY irm.inc_register_slno;
            `,
            [
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getDepActions: (data, callback) => {
        pool.query(
            `SELECT 
    inc_dep_action_detail_slno,
    inc_action_req_dep ,
    inc_action_collect_dep,
    inc_dep_action_status,
    inc_action,
    inc_dep_action_detail_status,
    inc_action_req_user,
    inc_action_ack_user,
    inc_action_ack_date,
    inc_dep_action_remark,
    ics.inc_cs_slno,
    cdm.dept_name as requested_department,
    adm.dept_name as acknowledged_department,
    ics.inc_setting_key,
    ics.inc_setting_label,
    cm.em_name as requested_employee,
    cma.em_name as acknowledge_employee,
    cds.sec_name as requested_emp_sec,
    cd.desg_name,
    idad.create_date
FROM
    inc_dep_action_detail idad
        LEFT JOIN
    inc_common_settings ics ON ics.inc_cs_slno = idad.inc_cs_slno
		LEFT JOIN 
	co_department_mast cdm on cdm.dept_id = idad.inc_action_req_dep
    LEFT JOIN 
	co_department_mast adm on adm.dept_id = idad.inc_action_collect_dep
    LEFT JOIN
    co_employee_master cm ON idad.inc_action_req_user = cm.em_id
        LEFT JOIN
    co_deptsec_mast cds ON cm.em_dept_section = cds.sec_id
     LEFT JOIN
    co_employee_master cma ON idad.inc_action_ack_user = cma.em_id
    LEFT JOIN
    co_designation cd ON cm.em_designation = cd.desg_slno
WHERE
    inc_register_slno = ? and inc_action_collect_dep = ? and inc_dep_action_detail_status =  1`,
            [
                data.inc_register_slno,
                data.dep_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getDeparmentAcknowledge: (data, callback) => {
        pool.query(
            `
            UPDATE 
                   inc_dep_action_detail 
             SET
                  inc_action = ?,
                  inc_dep_action_status = ?,
                  inc_action_ack_user = ?,
                  inc_file_status=?,
                  inc_action_ack_date = NOW()
            WHERE 
                  inc_dep_action_detail_slno=?`,
            [
                data.inc_action,
                data.inc_dep_action_status,
                data.inc_action_ack_user,
                data.inc_file_status,
                data.inc_dep_action_detail_slno
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    UpdateFileStatus: (data, callback) => {
        pool.query(
            `
            UPDATE 
                   inc_dep_action_detail 
             SET
                  inc_file_status = ?,
            WHERE 
                  inc_dep_action_detail_slno=?`,
            [
                data.inc_file_status,
                data.id
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },
    UpdateDepartMentDataCollectionFileStatus: (data, callback) => {
        pool.query(
            `
            UPDATE 
                   inc_data_collection 
             SET
                  inc_ddc_file_status = ?,
            WHERE 
                  inc_data_collection_slno=?`,
            [
                data.inc_ddc_file_status,
                data.id
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },

    FetchAllIncidentActionDetail: (data, callback) => {
        pool.query(
            `
        SELECT 
                ilar.inc_level_action_slno,
                ilar.inc_register_slno,
                ilar.level_review_slno,
                ilar.inc_action_slno,
                ilar.inc_action_review,
                cm.em_name,
                iam.inc_action_name,
                iam.inc_is_datacollection,
                iam.inc_is_action,
                apm.level_name,
                apm.detail_slno,
                iam.inc_action_item_stauts,
				cd.desg_name,
				cds.sec_name,
				adm.dept_name
            FROM
                inc_level_action_review ilar
            LEFT JOIN inc_levels_review ilr ON ilr.level_review_slno = ilar.level_review_slno AND ilr.level_review_status = 1
            LEFT JOIN co_employee_master cm ON ilr.level_employee = cm.em_id
			LEFT JOIN co_designation cd ON cm.em_designation = cd.desg_slno
			LEFT JOIN co_department_mast adm on adm.dept_id = cm.em_department
            LEFT JOIN co_deptsec_mast cds ON cds.sec_id = cm.em_dept_section
            LEFT JOIN inc_action_master iam  ON iam.inc_action_slno = ilar.inc_action_slno AND iam.inc_action_status= 1
            LEFT JOIN co_level_details apm on apm.detail_slno = ilr.level_slno AND apm.status= 1
            WHERE
                ilar.inc_register_slno = ? AND ilar.inc_action_review_status = 1
    `,
            [
                data.inc_register_slno,
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                callback(null, results);
            }
        );
    },


    UpdateIncidentReviews: (data, callback) => {
        pool.query(data.sql, data.values, (error, results) => {
            if (error) return callback(error);

            if (results.affectedRows > 0) {
                return callback(null, { success: 2, message: "Incident Updated Successfully" });
            } else {
                return callback(null, { success: 0, message: "No record found to update" });
            }
        });
    },



    // 
    departmentRcaPreventiveSubmission: (data, callback) => {
        pool.query(
            `UPDATE 
                   inc_data_collection 
             SET
                  inc_dep_rca = ?,
                  inc_dep_preventive_action = ?,
                  inc_dep_status = ?,
                  inc_req_ack_date = NOW(),
                  inc_req_ack_user=?,
                  inc_dep_fba_status=?,
                  inc_ddc_file_status = ?,
                  inc_common_review = ?
            WHERE 
                  inc_data_collection_slno=?`,
            [
                data.inc_dep_rca,
                data.inc_dep_preventive_action,
                data.inc_dep_status,
                data.inc_req_ack_user,
                data.inc_dep_fba_status,
                data.inc_ddc_file_status,
                data.inc_common_review,
                data.inc_data_collection_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllDashboardIncident: (callback) => {
        pool.query(
            `SELECT 
            irm.inc_register_slno,
            irm.inc_initiator_slno,
            irm.nature_of_inc,
            irm.inc_describtion,
            irm.file_status,
            irm.inc_status,
            irm.create_user,
            irm.edit_user,
            irm.create_date,
            irm.inc_current_level,
            irm.inc_current_level_review_state,
            irm.inc_sacmatrix_detail,
            irm.inc_reg_corrective,
            inc_all_approved,
            ipd.mrd_no,
            ipd.inc_pt_name,
            ipd.inc_pt_gender,
            ipd.inc_pt_mobile,
            ipd.inc_pt_age,
            ipd.inc_pt_address,
            isd.inc_staff_type_slno,
            isd.emp_id,
            isd.emp_user_name,
            isd.emp_name,
            isd.emp_age,
            isd.emp_gender,
            isd.emp_desig,
            isd.emp_dept,
            isd.emp_dept_sec,
            isd.emp_mob,
            isd.emp_email,
            isd.emp_address,
            isd.emp_joining_date,
            ivd.inc_visitor_name,
            ivd.inc_visitor_age,
            ivd.inc_visitor_gender,
            ivd.inc_visitor_mobile,
            ivd.inc_visitor_address,
            ivd.inc_visit_purpose,
            iad.inc_is_asset,
            iad.asset_item_slno,
            iad.custodian_dept_slno,
            iad.item_name,
            iad.item_location,
            iad.manufacture_slno,
            cm.em_name,
            dp.dept_name,
            ds.sec_name,
            iniat.inc_initiator_name,
            ist.inc_staff_type_name,
            irm.dep_slno,
            irm.sec_slno,
            icd.inc_common_description,
            icd.inc_common_dtl_slno,
            cd.desg_name,
            isc.inc_sub_category_name,
            ircm.inc_category_name,
            irm.inc_data_collection_req,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'section', cds.sec_name,
                    'inc_dep_status', idc.inc_dep_status,
                    'fba_status',idc.inc_dep_fba_status,
                    'level_no',idc.level_no
                )
            ) AS data_collection_details,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'inc_dep_action_status', idad.inc_dep_action_status,
                    'level_no',idad.level_no
                )
            ) AS inc_action_details

        FROM inc_register_master irm
        LEFT JOIN inc_patient_dtl ipd ON irm.inc_register_slno = ipd.inc_register_slno AND irm.inc_initiator_slno = 1
        LEFT JOIN inc_staff_dtl isd ON irm.inc_register_slno = isd.inc_register_slno AND irm.inc_initiator_slno = 2
        LEFT JOIN inc_visitor_dtl ivd ON irm.inc_register_slno = ivd.inc_register_slno AND irm.inc_initiator_slno = 3
        LEFT JOIN inc_asset_dtl iad ON irm.inc_register_slno = iad.inc_register_slno AND irm.inc_initiator_slno = 4
        LEFT JOIN inc_common_dtl icd ON irm.inc_register_slno = icd.inc_register_slno AND irm.inc_initiator_slno = 5
        LEFT JOIN co_employee_master cm ON irm.create_user = cm.em_id
        LEFT JOIN co_department_mast dp ON cm.em_department = dp.dept_id
        LEFT JOIN co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
        LEFT JOIN inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
        LEFT JOIN inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
        LEFT JOIN co_designation cd on cd.desg_slno = cm.em_designation
        LEFT JOIN inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
        LEFT JOIN inc_dep_action_detail idad ON idad.inc_register_slno = irm.inc_register_slno AND idad.inc_dep_action_detail_status = 1
        LEFT JOIN co_deptsec_mast cds ON cds.sec_id = idc.inc_req_collect_dep
        LEFT JOIN co_employee_master cem ON cem.em_id = idc.inc_req_user
        LEFT JOIN incident_sub_category_master isc ON irm.inc_subcategory = isc.inc_sub_cat_slno
        LEFT JOIN incident_category_master ircm ON irm.inc_category = ircm.inc_category_slno
        LEFT JOIN co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
        WHERE irm.inc_status = 1
        GROUP BY irm.inc_register_slno`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getCompanyDetail: (callback) => {
        pool.query(
            `SELECT  company_slno FROM crm_common `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getAllIncidentNature: (callback) => {
        pool.query(
            `SELECT 
                 inc_nature_slno,
                inc_nature_name ,
                inc_nature_status
            FROM
                inc_nature
            WHERE inc_nature_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getIncidentInitiator: (callback) => {
        pool.query(
            `Select inc_initiator_slno,inc_initiator_name,inc_initiator_status,inc_initiator_alias from inc_initiator where inc_initiator_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    SingleDepartmentActionDetail: (data, callback) => {
        pool.query(
            `SELECT 
    inc_dep_action_detail_slno,
    inc_action_collect_dep,
    inc_dep_action_remark,
    ics.inc_cs_slno,
    cdm.dept_name as requested_department,
    adm.dept_name as acknowledged_department,
    ics.inc_setting_key,
    ics.inc_setting_label,
    cm.em_name as requested_employee,
    cma.em_name as acknowledge_employee,
    cds.sec_name as requested_emp_sec,
    cd.desg_name,
    idad.create_date
FROM
    inc_dep_action_detail idad
        LEFT JOIN
    inc_common_settings ics ON ics.inc_cs_slno = idad.inc_cs_slno
		LEFT JOIN 
	co_department_mast cdm on cdm.dept_id = idad.inc_action_req_dep
    LEFT JOIN 
	co_department_mast adm on adm.dept_id = idad.inc_action_collect_dep
    LEFT JOIN
    co_employee_master cm ON idad.inc_action_req_user = cm.em_id
        LEFT JOIN
    co_deptsec_mast cds ON cm.em_dept_section = cds.sec_id
     LEFT JOIN
    co_employee_master cma ON idad.inc_action_ack_user = cma.em_id
    LEFT JOIN
    co_designation cd ON cm.em_designation = cd.desg_slno
WHERE
    inc_register_slno = ? and inc_action_collect_dep = ? and inc_dep_action_detail_status =  1`,
            [
                data.inc_register_slno,
                data.dep_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getIncidentFromDashboard: (data, callback) => {
        pool.query(
            `SELECT 
                irm.inc_register_slno,
                irm.inc_initiator_slno,
                irm.nature_of_inc,
                irm.inc_describtion,
                irm.file_status,
                irm.inc_status,
                irm.create_user,
                irm.edit_user,
                irm.create_date,
                irm.inc_current_level,
                irm.inc_current_level_review_state,
                irm.inc_sacmatrix_detail,
                irm.inc_reg_corrective,
                irm.inc_all_approved,
                ipd.mrd_no,
                ipd.inc_pt_name,
                ipd.inc_pt_gender,
                ipd.inc_pt_mobile,
                ipd.inc_pt_age,
                ipd.inc_pt_address,
                isd.inc_staff_type_slno,
                isd.emp_id,
                isd.emp_user_name,
                isd.emp_name,
                isd.emp_age,
                isd.emp_gender,
                isd.emp_desig,
                isd.emp_dept,
                isd.emp_dept_sec,
                isd.emp_mob,
                isd.emp_email,
                isd.emp_address,
                isd.emp_joining_date,
                ivd.inc_visitor_name,
                ivd.inc_visitor_age,
                ivd.inc_visitor_gender,
                ivd.inc_visitor_mobile,
                ivd.inc_visitor_address,
                ivd.inc_visit_purpose,
                iad.inc_is_asset,
                iad.asset_item_slno,
                iad.custodian_dept_slno,
                iad.item_name,
                iad.item_location,
                iad.manufacture_slno,
                cm.em_name,
                dp.dept_name,
                ds.sec_name,
                iniat.inc_initiator_name,
                ist.inc_staff_type_name,
                irm.dep_slno,
                irm.sec_slno,
                cd.desg_name,
                icd.inc_common_description,
                icd.inc_common_dtl_slno,
                isc.inc_sub_category_name,
                ircm.inc_category_name,
                irm.inc_data_collection_req,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'section', cds.dept_name,
                        'inc_dep_status', idc.inc_dep_status,
                        'fba_status',idc.inc_dep_fba_status,
                        'level_no',idc.level_no
                    )
                ) AS data_collection_details,
                JSON_ARRAYAGG( 
                    JSON_OBJECT(
                        'inc_dep_action_status', idad.inc_dep_action_status,
                        'level_no',idad.level_no
                    )
                ) AS inc_action_detail
                FROM inc_register_master irm
                LEFT JOIN inc_patient_dtl ipd ON irm.inc_register_slno = ipd.inc_register_slno AND irm.inc_initiator_slno = 1
                LEFT JOIN inc_staff_dtl isd ON irm.inc_register_slno = isd.inc_register_slno AND irm.inc_initiator_slno = 2
                LEFT JOIN inc_visitor_dtl ivd ON irm.inc_register_slno = ivd.inc_register_slno AND irm.inc_initiator_slno = 3
                LEFT JOIN inc_asset_dtl iad ON irm.inc_register_slno = iad.inc_register_slno AND irm.inc_initiator_slno = 4
                LEFT JOIN inc_common_dtl icd ON irm.inc_register_slno = icd.inc_register_slno AND irm.inc_initiator_slno = 5
                LEFT JOIN co_employee_master cm ON irm.create_user = cm.em_id
                LEFT JOIN co_department_mast dp ON cm.em_department = dp.dept_id
                LEFT JOIN co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
                LEFT JOIN inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
                LEFT JOIN inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
                LEFT JOIN co_designation cd on cd.desg_slno = cm.em_designation
                LEFT JOIN inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
                LEFT JOIN inc_dep_action_detail idad ON idad.inc_register_slno = irm.inc_register_slno AND idad.inc_dep_action_detail_status = 1
                LEFT JOIN co_department_mast cds ON cds.dept_id = idc.inc_req_collect_dep
                LEFT JOIN co_employee_master cem ON cem.em_id = idc.inc_req_user
                LEFT JOIN co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
                LEFT JOIN incident_sub_category_master isc ON irm.inc_subcategory = isc.inc_sub_cat_slno
                LEFT JOIN incident_category_master ircm ON irm.inc_category = ircm.inc_category_slno
                WHERE irm.inc_register_slno = ?
                GROUP BY irm.inc_register_slno`,
            [
                data.inc_register_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    createConversation: (data, callback) => {

        pool.query(
            `
        INSERT INTO app_conversations
        (
            module_name,
            entity_type,
            entity_id,
            parent_entity_id,
            incident_id,
            department_id,
            section_id,
            created_by,
            title,
            is_group_chat
        )
        VALUES (?,?,?,?,?,?,?,?,?,?)
        `,
            [
                data.module_name,
                data.entity_type,
                data.entity_id,
                data.parent_entity_id,
                data.incident_id,
                data.department_id,
                data.section_id,
                data.created_by,
                data.title,
                data.is_group_chat
            ],
            (error, results) => {

                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },
    addConversationUsers: (data, callback) => {

        pool.query(
            `
        INSERT INTO app_conversation_users
        (
            conversation_id,
            emp_id,
            department_id,
            section_id,
            is_admin
        )
        VALUES ?
        `,
            [data],
            (error, results) => {

                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },


    getConversation: (data, callback) => {

        pool.query(
            `
        SELECT
            c.conversation_id,
            c.module_name,
            c.entity_type,
            c.entity_id,
            c.incident_id,
            c.title,
            c.is_group_chat,
            c.created_by,
            c.created_at,

            c.last_message_id,
            c.last_message,
            c.last_message_time,

            GROUP_CONCAT(
                e.em_name
                SEPARATOR ', '
            ) AS participants,
             GROUP_CONCAT(cpu.emp_id SEPARATOR ',') AS participant_ids


        FROM app_conversations c

        INNER JOIN app_conversation_users cu
            ON cu.conversation_id = c.conversation_id
            AND cu.emp_id = ? AND cu.user_status = 1

        LEFT JOIN app_conversation_users cpu
            ON cpu.conversation_id = c.conversation_id
            AND cpu.emp_id <> ? AND cpu.user_status = 1

        LEFT JOIN co_employee_master e
            ON e.em_id = cpu.emp_id

        WHERE c.incident_id = ?
            AND c.entity_id = ?
            AND c.entity_type = ?
            AND c.module_name = ?
            AND c.is_active = 1

        GROUP BY c.conversation_id

        ORDER BY
            COALESCE(c.last_message_time, c.created_at) DESC
        `,
            [
                data.emp_id,       // cu.emp_id = ?
                data.emp_id,       // cpu.emp_id <> ?
                data.incident_id,
                data.entity_id,
                data.entity_type,
                data.module_name
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },

    createConversationMessage: (data, callback) => {

        pool.query(
            `
        INSERT INTO app_messages
        (
            conversation_id,
            sender_emp_id,
            sender_name,
            message_type,
            message,
            reply_to_message_id
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?
        )
               `,
            [
                data.conversation_id,
                data.sender_emp_id,
                data.sender_name,
                data.message_type || 'TEXT',
                data.message,
                data.reply_to_message_id || null
            ],
            (error, results) => {

                if (error) {
                    return callback(error);
                }

                // UPDATE LAST MESSAGE IN CONVERSATION

                pool.query(
                    `
                UPDATE app_conversations
                SET
                    last_message_id = ?,
                    last_message = ?,
                    last_message_time = NOW()
                WHERE conversation_id = ?
                `,
                    [
                        results.insertId,
                        data.message,
                        data.conversation_id
                    ]
                );

                return callback(null, results);
            }
        );
    },

    addMessageAttachments: (
        data,
        callback
    ) => {

        pool.query(
            `
        INSERT INTO app_message_attachments
        (
            message_id,
            file_name,
            original_name,
            file_url,
            file_size,
            mime_type,
            uploaded_by
        )
        VALUES ?
        `,
            [data],
            (error, results) => {

                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },
    //     fetchConversationMessages: (
    //         conversation_id,
    //         empid,
    //         cursor,
    //         callback
    //     ) => {
    //         pool.query(
    //             `
    //         SELECT
    //     m.message_id,
    //     m.conversation_id,
    //     m.sender_emp_id,
    //     m.sender_name,
    //     m.message_type,
    //     m.message,
    //     m.reply_to_message_id,
    //     m.is_edited,
    //     m.is_deleted,
    //     m.created_at,

    //     JSON_OBJECT(
    //         'message_id', rm.message_id,
    //         'sender_name', rm.sender_name,
    //         'sender_emp_id', rm.sender_emp_id,
    //         'message', rm.message
    //     ) AS reply_message_detail,

    //     GROUP_CONCAT(
    //         JSON_OBJECT(
    //             'attachment_id', a.attachment_id,
    //             'file_name', a.file_name,
    //             'original_name', a.original_name,
    //             'file_url', a.file_url,
    //             'file_size', a.file_size,
    //             'mime_type', a.mime_type
    //         )
    //     ) AS attachments

    // FROM app_messages m

    // LEFT JOIN app_messages rm
    //     ON rm.message_id = m.reply_to_message_id

    // INNER JOIN app_conversation_users cu
    //     ON cu.conversation_id = m.conversation_id
    //     AND cu.emp_id = ?  

    // LEFT JOIN app_message_attachments a
    //     ON a.message_id = m.message_id

    // WHERE m.conversation_id = ?
    //  AND m.is_deleted = 0  
    //   AND m.message_id > COALESCE(cu.join_message_id, 0)

    // AND (
    //     ? IS NULL
    //     OR m.message_id > ?
    // )


    // GROUP BY m.message_id

    // ORDER BY m.created_at ASC
    //         `,
    //             [
    //                 empid, conversation_id, cursor, cursor
    //             ],
    //             (error, results) => {

    //                 if (error) {
    //                     return callback(error);
    //                 }

    //                 return callback(null, results);
    //             }
    //         );
    //     },
    fetchConversationMessages: (
        conversation_id,
        empid,
        cursor,
        callback
    ) => {
        pool.query(
            `
            SELECT
            m.message_id,
            m.conversation_id,
            m.sender_emp_id,
            m.sender_name,
            m.message_type,
            m.message,
            m.reply_to_message_id,
            m.is_edited,
            m.is_deleted,
            m.created_at,

            JSON_OBJECT(
                'message_id', rm.message_id,
                'sender_name', rm.sender_name,
                'sender_emp_id', rm.sender_emp_id,
                'message', rm.message
            ) AS reply_message_detail,

             JSON_OBJECT(
                    'attachment_id', a.attachment_id,
                    'file_name', a.file_name,
                    'original_name', a.original_name,
                    'file_url', a.file_url,
                    'file_size', a.file_size,
                    'mime_type', a.mime_type
            ) AS attachments

        FROM app_messages m

        LEFT JOIN app_messages rm
            ON rm.message_id = m.reply_to_message_id

        INNER JOIN app_conversation_users cu
            ON cu.conversation_id = m.conversation_id
            AND cu.emp_id = ?

        LEFT JOIN app_message_attachments a
            ON a.message_id = m.message_id

        WHERE m.conversation_id = ?
        AND m.is_deleted = 0
        AND m.message_id > COALESCE(cu.join_message_id, 0)

        AND (
        ? IS NULL OR m.message_id < ?
        )

        GROUP BY m.message_id
        ORDER BY m.message_id DESC
        LIMIT 50
        `,
            [empid, conversation_id, cursor, cursor],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },


    getExternalEmployeeConversations: (
        emp_id,
        callback
    ) => {

        pool.query(
            `
        SELECT
            c.conversation_id,
            c.module_name,
            c.entity_type,
            c.entity_id,
            c.incident_id,
            c.title,
            c.is_group_chat,
            c.created_by,
            c.created_at,

            c.last_message_id,
            c.last_message,
            c.last_message_time,

            GROUP_CONCAT(
                DISTINCT e.em_name
                SEPARATOR ', '
            ) AS participants,

            GROUP_CONCAT(
                DISTINCT cpu.emp_id
                SEPARATOR ','
            ) AS participant_ids

        FROM app_conversations c

        INNER JOIN app_conversation_users cu
            ON cu.conversation_id = c.conversation_id
            AND cu.emp_id = ? AND cu.user_status = 1

        LEFT JOIN app_conversation_users cpu
            ON cpu.conversation_id = c.conversation_id
            AND cpu.emp_id <> ? AND cpu.user_status = 1


        LEFT JOIN co_employee_master e
            ON e.em_id = cpu.emp_id

        WHERE c.is_active = 1

        GROUP BY c.conversation_id

        ORDER BY
            COALESCE(
                c.last_message_time,
                c.created_at
            ) DESC
        `,
            [emp_id, emp_id],
            (error, results) => {

                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },

    fetchMergedConversationMessages: (
        conversation_ids = [],
        empid,
        cursor = null,
        callback
    ) => {

        // SAFETY CHECK
        if (!Array.isArray(conversation_ids) || conversation_ids.length === 0) {
            return callback(null, []);
        }
        pool.query(
            `
        SELECT
    m.message_id,
    m.conversation_id,
    m.sender_emp_id,
    m.sender_name,
    m.message,
    m.created_at,

    JSON_OBJECT(
        'message_id', rm.message_id,
        'sender_name', rm.sender_name,
        'sender_emp_id', rm.sender_emp_id,
        'message', rm.message
    ) AS reply_message_detail,


     GROUP_CONCAT(
        JSON_OBJECT(
            'attachment_id', a.attachment_id,
            'file_name', a.file_name,
            'original_name', a.original_name,
            'file_url', a.file_url,
            'file_size', a.file_size,
            'mime_type', a.mime_type
        )
     ) AS attachments

FROM app_messages m

LEFT JOIN app_messages rm
    ON rm.message_id = m.reply_to_message_id

LEFT JOIN app_message_attachments a
    ON a.message_id = m.message_id

INNER JOIN app_conversation_users cu
    ON cu.conversation_id = m.conversation_id
    AND cu.emp_id = ?

WHERE m.conversation_id IN (?)
AND m.is_deleted = 0
AND m.message_id > COALESCE(cu.join_message_id, 0)

AND (
    ? IS NULL
    OR m.message_id < ?
)

GROUP BY m.message_id

ORDER BY m.message_id DESC
LIMIT 50;
        `,
            [
                empid,
                conversation_ids,
                cursor,
                cursor
            ],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    DeletemessageDetail: (id, callback) => {
        console.log(
            id
        );
        if (!id) return callback(null, []);

        pool.query(
            `UPDATE app_messages
                SET
                   is_deleted= 1
                WHERE message_id = ?`,
            [id],
            (error, results) => {

                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },

    EditMessageDetail: (message, message_id, callback) => {

        if (!message || !message_id) {
            return callback(null, []);
        }
        pool.query(
            `UPDATE app_messages
                SET
                    message = ?,
                   is_edited= 1
                WHERE message_id = ?`,
            [message, message_id],
            (error, results) => {

                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },

    updateAttachmentStatus: (
        attachmentId,
        callback
    ) => {

        pool.query(
            `
        UPDATE app_message_attachments
        SET file_status = 0
        WHERE attachment_id = ?
        `,
            [attachmentId],
            (error, results) => {

                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },
    getConversationEmployees: (
        conversationId,
        callback
    ) => {

        pool.query(
            `
        SELECT
            cu.id,
            cu.conversation_id,
            cu.emp_id,
            cu.is_admin,
            cu.joined_at,
            cu.user_status,

            e.em_no,
            e.em_name,
            e.em_mobile,
            e.em_email,
            e.em_doj,
            e.em_status,
            e.em_status,
            e.em_id,

            d.dept_id,
            d.dept_name,
            d.dept_alias,

            s.sec_id,
            s.sec_name,

            des.desg_slno,
            des.desg_name

        FROM app_conversation_users cu

        INNER JOIN co_employee_master e
            ON e.em_id = cu.emp_id

        LEFT JOIN co_department_mast d
            ON d.dept_id = e.em_department

        LEFT JOIN co_deptsec_mast s
            ON s.sec_id = e.em_dept_section

        LEFT JOIN co_designation des
            ON des.desg_slno = e.em_designation

        WHERE cu.conversation_id = ? and cu.user_status = 1

        ORDER BY
            cu.is_admin DESC,
            e.em_name ASC
        `,
            [conversationId],
            (error, results) => {

                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },


    removeConversationMember: (
        conversation_id, emp_id,
        callback
    ) => {

        pool.query(
            `
         UPDATE app_conversation_users
        SET user_status = 0
        WHERE conversation_id = ?
        AND emp_id = ?
        AND user_status = 1
        `,
            [conversation_id, emp_id],
            (error, results) => {

                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },

    AddNewMemberToGroup: (value, callback) => {
        pool.query(
            `
         INSERT INTO app_conversation_users
        (
            conversation_id,
            emp_id,
            department_id,
            section_id,
            join_message_id
        )
        VALUES ?
        `,
            [value],
            (error, results) => {

                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },

    getLastMessageId: (conversationId, callback) => {
        const query = `
        SELECT COALESCE(MAX(message_id), 0) AS last_message_id
        FROM app_messages
        WHERE conversation_id = ?
    `;

        pool.query(query, [conversationId], (err, results) => {

            if (err) {
                return callback(err, null);
            }

            callback(null, results[0]);
        });
    },

    FindConversationMembers: (
        conversation_id,
        empIds,
        callback
    ) => {
        pool.query(
            `
        SELECT
            emp_id,
            user_status
        FROM app_conversation_users
        WHERE conversation_id = ?
        AND emp_id IN (?)
        `,
            [
                conversation_id,
                empIds
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },

    ReactivateConversationMembers: (
        conversation_id,
        empIds,
        joinMessageId,
        callback
    ) => {
        pool.query(
            `
        UPDATE app_conversation_users
        SET
            user_status = 1,
            join_message_id = ?,
            joined_at = NOW()
        WHERE conversation_id = ?
        AND emp_id IN (?)
        `,
            [
                joinMessageId,
                conversation_id,
                empIds
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },

    getConversationParticipants: (conversationId, senderEmpId, callback) => {
        pool.query(
            `
        SELECT 
            emp_id,
            is_admin,
            department_id,
            section_id
        FROM app_conversation_users
        WHERE conversation_id = ? AND emp_id != ?
        `,
            [conversationId, senderEmpId],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results.rows || results);
            }
        );
    },

    createNotificationsForMessage: (
        messageId,
        conversationId,
        participants,
        messagePreview,
        callback
    ) => {


        if (!participants || participants.length === 0) {
            return callback(null, []);
        }
        const notificationValues = participants.map(part => ([
            part.emp_id,
            conversationId,
            messageId,
            `New message from ${messagePreview.sender_name || 'User'}`,  // Title
            messagePreview ? messagePreview.substring(0, 50) : '',  // Preview
            0,  // is_read = 0
            new Date()
        ]));

        pool.query(
            `
        INSERT INTO app_notifications
        (emp_id, conversation_id, message_id, title,notify_preview, is_read, created_at)
        VALUES ?
        `,
            [notificationValues],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                // Return participants with notification_ids
                const updatedParticipants = participants.map((part, index) => ({
                    ...part,
                    notification_id: results.insertId + index
                }));

                return callback(null, updatedParticipants);
            }
        );
    },

    /**
    * Mark a single notification as read
    */
    markAsRead: (notificationId, empId) => {
        return pool.query(
            `UPDATE app_notifications 
             SET is_read = 1 
             WHERE notification_id = ? AND emp_id = ?`,
            [notificationId, empId]
        );
    },

    /**
     * Mark all unread notifications for a conversation as read
     */
    markConversationAsRead: (conversationId, empId, callback) => {
        return pool.query(
            `UPDATE app_notifications 
             SET is_read = 1 
             WHERE conversation_id = ? AND emp_id = ? AND is_read = 0`,
            [conversationId, empId],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    /**
     * Mark all unread notifications for a user as read
     */
    markAllAsRead: (empId) => {
        return pool.query(
            `UPDATE app_notifications 
             SET is_read = 1 
             WHERE emp_id = ? AND is_read = 0`,
            [empId]
        );
    },

    /**
     * Get unread notifications count for a user
     */
    getUnreadCount: (empId, callback) => {
        return pool.query(
            `SELECT
                conversation_id,
                1 AS unread
            FROM app_notifications
            WHERE emp_id = ?
            AND is_read = 0
            GROUP BY conversation_id`,
            [empId],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    /**
     * Get unread notifications for a user
     */
    getUnreadNotifications: (empId, limit = 50) => {
        return pool.query(
            `SELECT n.*, c.title as conversation_title 
             FROM app_notifications n
             JOIN app_conversations c ON n.conversation_id = c.conversation_id
             WHERE n.emp_id = ? AND n.is_read = 0
             ORDER BY n.created_at DESC
             LIMIT ?`,
            [empId, limit]
        );
    },

    getUnreadCountsByConversation: (empId, callback) => {
        return pool.query(
            `
        SELECT
            conversation_id,
            COUNT(*) AS unread_count
        FROM app_notifications
        WHERE emp_id = ?
          AND is_read = 0
        GROUP BY conversation_id
        `,
            [empId],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getWhatsappRequestDetails: (
        requestedEmployee,
        createUser,
        slno,
        callback
    ) => {

        const sql = `
        SELECT
            emp.em_name AS requested_employee_name,
            emp.em_mobile AS requested_employee_mobile,

            creator.em_name AS creator_name,
            dept.dept_name AS creator_department,
            sec.sec_name AS creator_section,

            inc.inc_req_remark

        FROM inc_data_collection inc

        LEFT JOIN co_employee_master emp
            ON emp.em_id = ?

        LEFT JOIN co_employee_master creator
            ON creator.em_id = ?

        LEFT JOIN co_department_mast dept
            ON dept.dept_id = creator.em_department

        LEFT JOIN co_deptsec_mast sec
            ON sec.sec_id = creator.em_dept_section

        WHERE inc.inc_register_slno = ?
    `;

        pool.query(
            sql,
            [
                requestedEmployee,
                createUser,
                slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getApprovalRequestDetail: (
        requestedEmployee,
        createUser,
        slno,
        callback
    ) => {
        const sql = `
SELECT 
    emp.em_name AS requested_employee_name,
    emp.em_mobile AS requested_employee_mobile,
    creator.em_name AS creator_name,
    dept.dept_name AS creator_department,
    sec.sec_name AS creator_section,
    inc.inc_describtion,
    ewd.whatsapp_number
FROM
    inc_register_master inc
        LEFT JOIN
    co_employee_master emp ON emp.em_id = ?
        LEFT JOIN
    co_employee_master creator ON creator.em_id = ?
        LEFT JOIN
    employee_whatsapp_details ewd ON ewd.emp_id = emp.em_id
        AND ewd.status = 1
        LEFT JOIN
    co_department_mast dept ON dept.dept_id = creator.em_department
        LEFT JOIN
    co_deptsec_mast sec ON sec.sec_id = creator.em_dept_section
WHERE
    inc.inc_register_slno = ?;
    `;

        pool.query(sql, [requestedEmployee, createUser, slno], (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    getRegistrationEmployee: (
        create_user,
        section_id,
        event_name,
        callback
    ) => {

        const sql = `
        SELECT 
            invm.event_slno,
            invm.event_name,
            invm.event_code,
            creator.em_name AS creator_name,
            emp.em_mobile AS requested_employee_mobile,
            emp.em_name AS employee_name,
            dept.dept_name AS creator_department,
            sec.sec_name AS creator_section,
            ewd.whatsapp_number
        FROM incident_notification_event_master invm
        LEFT JOIN co_employee_master creator 
            ON creator.em_id = ?
        LEFT JOIN incident_notification_config inc 
            ON inc.event_slno = invm.event_slno
        AND inc.section_id = ?
        LEFT JOIN co_employee_master emp 
            ON emp.em_id = inc.emp_id
        LEFT JOIN employee_whatsapp_details ewd 
            ON ewd.emp_id = emp.em_id
        AND ewd.status = 1
        LEFT JOIN co_department_mast dept 
            ON dept.dept_id = emp.em_department
        LEFT JOIN co_deptsec_mast sec 
            ON sec.sec_id = emp.em_dept_section
        WHERE invm.event_code = ?
        AND invm.status = 1
    `;

        pool.query(sql, [create_user, section_id, event_name,], (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    insertWhatsapp: (data, callback) => {
        const sql = `
        INSERT INTO employee_whatsapp_details 
        (emp_id, sect_id, whatsapp_number, create_user)
        VALUES (?, ?, ?, ?)
    `;

        pool.query(
            sql,
            [data.emp_id, data.sect_id, data.whatsapp_number, data.create_user],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateWhatsapp: (data, callback) => {
        const sql = `
        UPDATE employee_whatsapp_details
        SET emp_id = ?,
            sect_id = ?,
            whatsapp_number = ?,
            status = ?,
            edit_user = ?,
            edit_date = NOW()
        WHERE slno = ?
    `;

        pool.query(
            sql,
            [
                data.emp_id,
                data.sect_id,
                data.whatsapp_number,
                data.whatsapp_status,
                data.edit_user,
                data.whatsapp_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getAllWhatsapp: (callback) => {
        const sql = `
        SELECT 
            w.slno as whatsapp_slno,
            w.emp_id,
            e.em_name,
            w.sect_id,
            s.sec_name as sect_name,
            w.whatsapp_number,
            w.status as whatsapp_status
        FROM employee_whatsapp_details w
        LEFT JOIN co_employee_master e ON e.em_id = w.emp_id
        LEFT JOIN co_deptsec_mast s ON s.sec_id = w.sect_id
        WHERE w.status = 1
    `;

        pool.query(sql, [], (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },


    insertEvent: (data, callback) => {
        const sql = `
        INSERT INTO incident_notification_event_master
        (event_code, event_name, status)
        VALUES (?, ?, ?)
    `;

        pool.query(
            sql,
            [data.event_code, data.event_name, data.status],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateEvent: (data, callback) => {
        const sql = `
        UPDATE incident_notification_event_master
        SET event_code = ?,
            event_name = ?,
            status = ?
        WHERE event_slno = ?
    `;

        pool.query(
            sql,
            [data.event_code, data.event_name, data.status, data.event_slno],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getAllEvent: (callback) => {
        const sql = `
        SELECT
            event_slno,
            event_code,
            event_name,
            status
        FROM incident_notification_event_master
        WHERE status = 1
    `;

        pool.query(sql, [], (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    insertNotificationConfig: (data, callback) => {
        const sql = `
        INSERT INTO incident_notification_config
        (section_id, event_slno, emp_id, status, create_user)
        VALUES (?, ?, ?, ?, ?)
    `;

        pool.query(
            sql,
            [
                data.section_id,
                data.event_slno,
                data.emp_id,
                data.status,
                data.create_user
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateNotificationConfig: (data, callback) => {
        const sql = `
        UPDATE incident_notification_config
        SET section_id = ?,
            event_slno = ?,
            emp_id = ?,
            status = ?,
            create_user = ?,
            create_date = NOW()
        WHERE config_slno = ?
    `;

        pool.query(
            sql,
            [
                data.section_id,
                data.event_slno,
                data.emp_id,
                data.status,
                data.edit_user ?? data.create_user,
                data.config_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getAllNotificationConfig: (callback) => {
        const sql = `
        SELECT
            c.config_slno,
            c.section_id,
            s.sec_name,
            c.event_slno,
            e.event_name,
            c.emp_id,
            emp.em_name,
            c.status
        FROM incident_notification_config c
        LEFT JOIN co_deptsec_mast s ON s.sec_id = c.section_id
        LEFT JOIN incident_notification_event_master e ON e.event_slno = c.event_slno
        LEFT JOIN co_employee_master emp ON emp.em_id = c.emp_id
        WHERE c.status = 1
    `;

        pool.query(sql, [], (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

}