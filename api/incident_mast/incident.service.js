const { pool } = require('../../config/database')
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
    NearMissesslIncidentUpdate: (data, callback) => {
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
}