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
                    meliora.inc_level_item_map_master iltm
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
             meliora.inc_level_item_map_master 
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
    inc_setting_label
FROM
    inc_common_setting_dep_map_master icdm
        LEFT JOIN
    inc_common_settings ics ON ics.inc_cs_slno = icdm.inc_cs_slno
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
                inc_setting_label
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
            inc_incharge_ack,
            inc_hod_ack,
            create_user,
            inc_data_collection_req,
            inc_reg_corrective
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.inc_initiator_slno,
                JSON.stringify(data.nature_of_inc), // if array, store as JSON string
                data.inc_describtion,
                data.file_status,
                data.inc_status,
                data.dep_slno,
                data.sec_slno,
                data.inc_incharge_approval,
                data.inc_hod_approval,
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
                inch.em_name as incharge_name,
                hod.em_name as hod_name,
                qad.em_name as qad_name,
                level_slno,
                level_review_state,
                cld.level_name,
                cd.desg_name,
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
                co_employee_master inch  ON inch.em_id = irm.inc_incharge_emp
                    LEFT JOIN
                co_employee_master hod  ON hod.em_id = irm.inc_hod_emp
                    LEFT JOIN
                co_employee_master qad  ON qad.em_id = irm.inc_qad_emp
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

    // getAllCurrentLevelApproval: (data, callback) => {
    //     console.log(data, "data");
    //     pool.query(`
    //         SELECT 
    //             irm.inc_register_slno,
    //             irm.inc_initiator_slno,
    //             irm.nature_of_inc,
    //             irm.inc_describtion,
    //             irm.file_status,
    //             irm.inc_status,
    //             irm.create_user,
    //             irm.edit_user,
    //             irm.create_date,
    //             irm.inc_incharge_ack,
    //             irm.inc_hod_ack,
    //             irm.inc_incharge_reivew_state,
    //             irm.inc_incharge_review,
    //             irm.inc_incharge_review_date,
    //             irm.inc_hod_reivew_state,
    //             irm.inc_hod_review,
    //             irm.inc_hod_review_date,
    //             irm.inc_current_level,
    //             irm.inc_current_level_review_state,
    //             irm.inc_qad_ack,
    //             irm.inc_qad_review,
    //             irm.inc_qad_review_date,
    //             irm.inc_qad_review_state,
    //             irm.inc_sacmatrix_detail,
    //             ipd.mrd_no,
    //             ipd.inc_pt_name,
    //             ipd.inc_pt_gender,
    //             ipd.inc_pt_mobile,
    //             ipd.inc_pt_age,
    //             ipd.inc_pt_address,
    //             isd.inc_staff_type_slno,
    //             isd.emp_id,
    //             isd.emp_user_name,
    //             isd.emp_name,
    //             isd.emp_age,
    //             isd.emp_gender,
    //             isd.emp_desig,
    //             isd.emp_dept,
    //             isd.emp_dept_sec,
    //             isd.emp_mob,
    //             isd.emp_email,
    //             isd.emp_address,
    //             isd.emp_joining_date,
    //             ivd.inc_visitor_name,
    //             ivd.inc_visitor_age,
    //             ivd.inc_visitor_gender,
    //             ivd.inc_visitor_mobile,
    //             ivd.inc_visitor_address,
    //             ivd.inc_visit_purpose,
    //             iad.inc_is_asset,
    //             iad.asset_item_slno,
    //             iad.custodian_dept_slno,
    //             iad.item_name,
    //             iad.item_location,
    //             iad.manufacture_slno,
    //             cm.em_name,
    //             dp.dept_name,
    //             ds.sec_name,
    //             iniat.inc_initiator_name,
    //             ist.inc_staff_type_name,
    //             inch.em_name as incharge_name,
    //             hod.em_name as hod_name,
    //             qad.em_name as qad_name,
    //             irm.inc_evaluation_status,
    //             irm.inc_preventive_action,
    //             irm.inc_corrective_action,
    //             irm.inc_rca,
    //             irm.inc_rca_qad_approve,
    //             irm.inc_rca_hod_approve,
    //             irm.inc_corrective_hod_approval,
    //             irm.inc_preventive_qad_approval,
    //             irm.dep_slno,
    //             irm.sec_slno,
    //             cd.desg_name,
    //             irm.inc_data_collection_req,
    //             JSON_ARRAYAGG(
    //                 JSON_OBJECT(
    //                     'section', cds.dept_name,
    //                     'inc_dep_status', idc.inc_dep_status,
    //                     'fba_status',idc.inc_dep_fba_status,
    //                     'level_no',idc.level_no
    //                 )
    //             ) AS data_collection_details,
    //             JSON_ARRAYAGG(
    //                 JSON_OBJECT(
    //                     'inc_dep_action_status', idad.inc_dep_action_status,
    //                     'level_no',idad.level_no
    //                 )
    //             ) AS inc_action_details
    //         FROM
    //             inc_register_master irm
    //                 LEFT JOIN
    //             inc_patient_dtl ipd ON irm.inc_register_slno = ipd.inc_register_slno
    //                 AND irm.inc_initiator_slno = 1
    //                 LEFT JOIN
    //             inc_staff_dtl isd ON irm.inc_register_slno = isd.inc_register_slno
    //                 AND irm.inc_initiator_slno = 2
    //                 LEFT JOIN
    //             inc_visitor_dtl ivd ON irm.inc_register_slno = ivd.inc_register_slno
    //                 AND irm.inc_initiator_slno = 3
    //                 LEFT JOIN
    //             inc_asset_dtl iad ON irm.inc_register_slno = iad.inc_register_slno
    //                 AND irm.inc_initiator_slno = 4
    //                 LEFT JOIN
    //             co_employee_master cm ON irm.create_user = cm.em_id
    //                 LEFT JOIN
    //             co_department_mast dp ON cm.em_department = dp.dept_id
    //                 LEFT JOIN
    //             co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
    //                 LEFT JOIN
    //             inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
    //                 LEFT JOIN
    //             inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
    //             LEFT JOIN
    //             co_employee_master inch  ON inch.em_id = irm.inc_incharge_emp
    //             LEFT JOIN
    //             co_employee_master hod  ON hod.em_id = irm.inc_hod_emp
    //             LEFT JOIN
    //             co_employee_master qad  ON qad.em_id = irm.inc_qad_emp
    //             LEFT JOIN
    //             co_designation as cd on cd.desg_slno =  cm.em_designation
    //             LEFT JOIN 
    //             inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
    //             LEFT JOIN 
    //             inc_dep_action_detail idad ON idad.inc_register_slno = irm.inc_register_slno AND inc_dep_action_detail_status = 1
    //                 LEFT JOIN 
    //             co_department_mast cds ON cds.dept_id = idc.inc_req_collect_dep
    //                 LEFT JOIN
    //             co_employee_master cem ON cem.em_id = idc.inc_req_user
    //                 LEFT JOIN 
    //             co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
    //             WHERE
    //                 irm.inc_status = 1
    //                    AND ((irm.inc_current_level >= ?)OR (irm.inc_current_level >= ? AND (irm.inc_current_level_review_state = 'A' OR inc_current_level_review_state is null)))        
    //         GROUP BY irm.inc_register_slno
    //         `
    //         ,
    //         [
    //             data.current_level,
    //             data.minus_level
    //         ],
    //         (error, results) => {
    //             if (error) return callback(error);
    //             callback(null, results);
    //         }
    //     );
    // },


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
    co_employee_master inch  ON inch.em_id = irm.inc_incharge_emp
    LEFT JOIN
    co_employee_master hod  ON hod.em_id = irm.inc_hod_emp
    LEFT JOIN
    co_employee_master qad  ON qad.em_id = irm.inc_qad_emp
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
    co_employee_master inch  ON inch.em_id = irm.inc_incharge_emp
        LEFT JOIN
    co_employee_master hod  ON hod.em_id = irm.inc_hod_emp
        LEFT JOIN
    co_employee_master qad  ON qad.em_id = irm.inc_qad_emp
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
                inc_dep_map_status,
                create_user
            ) 
            VALUES (?,?,?,?)`,
            [
                data.inc_cs_slno,
                data.inc_dep_id,
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
                cld.level_emp_id = ?`,
            [
                data.emp_id
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
                level_no
            ) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.slno,
                data.departments,
                data.createUser,
                data.status,
                data.remark,
                data.requested_department,
                data.requested_employee,
                data.level_no
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
                  inc_dep_map_status = ?,
                  edit_user = ?
            WHERE 
                  inc_cs_dep_map_slno=?`,
            [
                data.inc_cs_slno,
                data.inc_dep_id,
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
            //             `
            // SELECT 
            //     irm.inc_register_slno,
            //     irm.inc_initiator_slno,
            //     irm.nature_of_inc,
            //     irm.inc_describtion,
            //     irm.file_status,
            //     irm.inc_status,
            //     irm.create_user,
            //     irm.edit_user,
            //     irm.create_date,
            //     irm.inc_incharge_ack,
            //     irm.inc_hod_ack,
            //     irm.inc_incharge_reivew_state,
            //     irm.inc_incharge_review,
            //     irm.inc_incharge_review_date,
            //     irm.inc_hod_reivew_state,
            //     irm.inc_hod_review,
            //     irm.inc_hod_review_date,
            //     irm.inc_current_level,
            //     irm.inc_qad_ack,
            //     irm.inc_qad_review,
            //     irm.inc_qad_review_date,
            //     irm.inc_qad_review_state,
            //     irm.inc_sacmatrix_detail,
            //     ipd.mrd_no,
            //     ipd.inc_pt_name,
            //     ipd.inc_pt_gender,
            //     ipd.inc_pt_mobile,
            //     ipd.inc_pt_age,
            //     ipd.inc_pt_address,
            //     isd.inc_staff_type_slno,
            //     isd.emp_id,
            //     isd.emp_user_name,
            //     isd.emp_name,
            //     isd.emp_age,
            //     isd.emp_gender,
            //     isd.emp_desig,
            //     isd.emp_dept,
            //     isd.emp_dept_sec,
            //     isd.emp_mob,
            //     isd.emp_email,
            //     isd.emp_address,
            //     isd.emp_joining_date,
            //     ivd.inc_visitor_name,
            //     ivd.inc_visitor_age,
            //     ivd.inc_visitor_gender,
            //     ivd.inc_visitor_mobile,
            //     ivd.inc_visitor_address,
            //     ivd.inc_visit_purpose,
            //     iad.inc_is_asset,
            //     iad.asset_item_slno,
            //     iad.custodian_dept_slno,
            //     iad.item_name,
            //     iad.item_location,
            //     iad.manufacture_slno,
            //     cm.em_name,
            //     dp.dept_name,
            //     ds.sec_name,
            //     iniat.inc_initiator_name,
            //     ist.inc_staff_type_name,
            //     inch.em_name AS incharge_name,
            //     hod.em_name AS hod_name,
            //     qad.em_name AS qad_name,
            //     irm.inc_evaluation_status,
            //     irm.inc_preventive_action,
            //     irm.inc_corrective_action,
            //     irm.inc_rca,
            //     irm.inc_rca_qad_approve,
            //     irm.inc_rca_hod_approve,
            //     irm.inc_corrective_hod_approval,
            //     irm.inc_preventive_qad_approval,
            //     cd.desg_name,
            //     irm.inc_data_collection_req,
            //     idc.inc_dep_rca,
            //     idc.inc_dep_preventive_action,
            //     irm.dep_slno,
            //     irm.sec_slno,
            //     idc.inc_req_remark,
            //     cem.em_name AS Requested_user,
            //     mc.em_name AS Acknowledged_user,
            //     idc.create_date AS Requested_date,
            //     cds.dept_name AS acknowledge_user_dep,
            //     idc.inc_data_collection_slno,
            //     level_slno,
            //     level_review_state,
            //     cld.level_name,
            //     idc.inc_dep_status,
            //     cdd.sec_name AS requested_user_dep,
            //     JSON_ARRAYAGG(
            //         JSON_OBJECT(
            //             'section', cds.dept_name,
            //             'inc_dep_status', idc.inc_dep_status,
            //             'fba_status',idc.inc_dep_fba_status,
            //             'inc_ddc_file_status',idc.inc_ddc_file_status
            //         )
            //     ) AS data_collection_details

            // FROM inc_register_master irm

            //     LEFT JOIN inc_patient_dtl ipd 
            //         ON irm.inc_register_slno = ipd.inc_register_slno 
            //        AND irm.inc_initiator_slno = 1

            //     LEFT JOIN inc_staff_dtl isd 
            //         ON irm.inc_register_slno = isd.inc_register_slno 
            //        AND irm.inc_initiator_slno = 2

            //     LEFT JOIN inc_visitor_dtl ivd 
            //         ON irm.inc_register_slno = ivd.inc_register_slno 
            //        AND irm.inc_initiator_slno = 3

            //     LEFT JOIN inc_asset_dtl iad 
            //         ON irm.inc_register_slno = iad.inc_register_slno 
            //        AND irm.inc_initiator_slno = 4

            //     LEFT JOIN co_employee_master cm ON irm.create_user = cm.em_id
            //     LEFT JOIN co_department_mast dp ON cm.em_department = dp.dept_id
            //     LEFT JOIN co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
            //     LEFT JOIN inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
            //     LEFT JOIN inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
            //     LEFT JOIN co_employee_master inch ON inch.em_id = irm.inc_incharge_emp
            //     LEFT JOIN co_employee_master hod ON hod.em_id = irm.inc_hod_emp
            //     LEFT JOIN co_employee_master qad ON qad.em_id = irm.inc_qad_emp
            //     LEFT JOIN co_designation cd ON cd.desg_slno = cm.em_designation
            //     LEFT JOIN inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
            //     LEFT JOIN co_department_mast cds ON cds.dept_id = idc.inc_req_collect_dep
            //     LEFT JOIN co_deptsec_mast cdd ON cdd.sec_id = idc.inc_data_req_dep
            //     LEFT JOIN co_employee_master cem ON cem.em_id = idc.inc_req_user
            //     LEFT JOIN co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
            //     LEFT JOIN inc_levels_review ilr ON ilr.inc_register_slno = irm.inc_register_slno
            //     LEFT JOIN co_level_details cld ON cld.detail_slno = ilr.level_slno        
            // WHERE irm.inc_status = 1 
            //   AND idc.inc_req_collect_dep = ? 
            //   AND idc.inc_req_collect_emp = ?
            //   AND idc.inc_data_collection_status = 1
            // GROUP BY irm.inc_register_slno
            // `,
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
    inch.em_name AS incharge_name,
    hod.em_name AS hod_name,
    qad.em_name AS qad_name,
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

    LEFT JOIN co_employee_master cm ON irm.create_user = cm.em_id
    LEFT JOIN co_department_mast dp ON cm.em_department = dp.dept_id
    LEFT JOIN co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
    LEFT JOIN inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
    LEFT JOIN inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
    LEFT JOIN co_employee_master inch ON inch.em_id = irm.inc_incharge_emp
    LEFT JOIN co_employee_master hod ON hod.em_id = irm.inc_hod_emp
    LEFT JOIN co_employee_master qad ON qad.em_id = irm.inc_qad_emp
    LEFT JOIN co_designation cd ON cd.desg_slno = cm.em_designation
    LEFT JOIN inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
    LEFT JOIN co_deptsec_mast cds ON cds.sec_id = idc.inc_req_collect_dep
    LEFT JOIN co_deptsec_mast cdd ON cdd.sec_id = idc.inc_data_req_dep
    LEFT JOIN co_employee_master cem ON cem.em_id = idc.inc_req_user
    LEFT JOIN co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
    LEFT JOIN inc_levels_review ilr ON ilr.inc_register_slno = irm.inc_register_slno
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
                inch.em_name AS incharge_name,
                hod.em_name AS hod_name,
                qad.em_name AS qad_name,
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
                idc.inc_dep_status,
                level_slno,
                level_review_state,
                cld.level_name,
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

                LEFT JOIN co_employee_master cm ON irm.create_user = cm.em_id
                LEFT JOIN co_department_mast dp ON cm.em_department = dp.dept_id
                LEFT JOIN co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
                LEFT JOIN inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
                LEFT JOIN inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
                LEFT JOIN co_employee_master inch ON inch.em_id = irm.inc_incharge_emp
                LEFT JOIN co_employee_master hod ON hod.em_id = irm.inc_hod_emp
                LEFT JOIN co_employee_master qad ON qad.em_id = irm.inc_qad_emp
                LEFT JOIN co_designation cd ON cd.desg_slno = cm.em_designation
                LEFT JOIN inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
                LEFT JOIN co_deptsec_mast cds ON cds.sec_id = idc.inc_req_collect_dep
                LEFT JOIN co_deptsec_mast cdd ON cdd.sec_id = idc.inc_data_req_dep
                LEFT JOIN co_employee_master cem ON cem.em_id = idc.inc_req_user
                LEFT JOIN co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
                LEFT JOIN inc_dep_action_detail idad ON idad.inc_register_slno = irm.inc_register_slno
                LEFT JOIN inc_levels_review ilr ON ilr.inc_register_slno = irm.inc_register_slno
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
            LEFT JOIN inc_approval_level_master ialm  ON ialm.level_slno = ilr.level_slno AND ialm.level_status= 1
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
                  inc_ddc_file_status = ?
            WHERE 
                  inc_data_collection_slno=?`,
            [
                data.inc_dep_rca,
                data.inc_dep_preventive_action,
                data.inc_dep_status,
                data.inc_req_ack_user,
                data.inc_dep_fba_status,
                data.inc_ddc_file_status,
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
            inch.em_name as incharge_name,
            hod.em_name as hod_name,
            qad.em_name as qad_name,
            irm.dep_slno,
            irm.sec_slno,
            cd.desg_name,
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
        LEFT JOIN co_employee_master cm ON irm.create_user = cm.em_id
        LEFT JOIN co_department_mast dp ON cm.em_department = dp.dept_id
        LEFT JOIN co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
        LEFT JOIN inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
        LEFT JOIN inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
        LEFT JOIN co_employee_master inch  ON inch.em_id = irm.inc_incharge_emp
        LEFT JOIN co_employee_master hod  ON hod.em_id = irm.inc_hod_emp
        LEFT JOIN co_employee_master qad  ON qad.em_id = irm.inc_qad_emp
        LEFT JOIN co_designation cd on cd.desg_slno = cm.em_designation
        LEFT JOIN inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
        LEFT JOIN inc_dep_action_detail idad ON idad.inc_register_slno = irm.inc_register_slno AND idad.inc_dep_action_detail_status = 1
        LEFT JOIN co_deptsec_mast cds ON cds.sec_id = idc.inc_req_collect_dep
        LEFT JOIN co_employee_master cem ON cem.em_id = idc.inc_req_user
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
                inc_nature`,
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

}