const { pool } = require('../../config/database');


module.exports = {
    insertWeEmployee: (data, callback) => {
        pool.query(
            `insert into we_emp_map 
     (map_dept_slno,
     map_deptsec_slno,
     map_emp_id,
     map_building,
     map_floor,
     map_nsurse_station,
     map_status,create_user) values(?,?,?,?,?,?,?,?)`,
            [
                data.map_dept_slno,
                data.map_deptsec_slno,
                data.map_emp_id,
                data.map_building,
                data.map_floor,
                JSON.stringify(data.map_nsurse_station),
                data.map_status,
                data.create_user

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getWeEmpMapping: (callback) => {
        pool.query(
            `
            SELECT map_slno ,
                  build_name,
                  floor_desc,
                  sec_name,dept_name,
                  em_name, map_dept_slno, map_deptsec_slno, map_emp_id, map_building, map_floor,
                  (case when map_status = 1 then "yes" else 'no' end ) as map_status,
                 GROUP_CONCAT(co_nurse_desc) as   co_nurse_desc,
                 map_nsurse_station,
                  JSON_EXTRACT(map_nsurse_station,'$ [*]')
                  FROM we_emp_map
                  left join co_department_mast on we_emp_map.map_dept_slno = co_department_mast.dept_id
                  left join co_deptsec_mast on we_emp_map.map_deptsec_slno = co_deptsec_mast.sec_id
                  left join floor_master on we_emp_map.map_floor = floor_master.floor_code
                  left join building_master on we_emp_map.map_building = building_master. build_code
                  left join co_employee_master on we_emp_map.map_emp_id = co_employee_master.em_id
                  left join co_nursestation on JSON_CONTAINS(we_emp_map.map_nsurse_station,cast(co_nursestation.co_nurse_slno as json),'$')
                group by map_slno`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    updateWeEmployee: (data, callback) => {
        pool.query(
            `update we_emp_map
            set map_dept_slno =?,
            map_deptsec_slno =?,
            map_emp_id =?,
            map_building =?,
            map_floor =?,
            map_nsurse_station =?,
            map_status =?,
            edit_user =?
                where map_slno =? `,
            [
                data.map_dept_slno,
                data.map_deptsec_slno,
                data.map_emp_id,
                data.map_building,
                data.map_floor,
                JSON.stringify(data.map_nsurse_station),
                data.map_status,
                data.edit_user,
                data.map_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    CheckinsertVal: (data, callBack) => {
        pool.query(`select map_dept_slno from we_emp_map 
        where map_slno = ?`,
            [
                data.map_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getfloorbyEmp: (id, callBack) => {
        pool.query(
            `select map_floor ,
            floor_desc
            from we_emp_map 
            left join floor_master on we_emp_map.map_floor = floor_master.floor_code
            where map_emp_id = ?`,
            [id],

            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getnursebyfloor: (id, callBack) => {
        pool.query(
            // `select map_slno,map_floor,map_nsurse_station,
            // floor_desc,
            // GROUP_CONCAT(co_nurse_desc) as   co_nurse_desc
            // from we_emp_map 
            // left join floor_master on we_emp_map.map_floor = floor_master.floor_code
            //  left join co_nursestation on JSON_CONTAINS(we_emp_map.map_nsurse_station,cast(co_nursestation.co_nurse_slno as json),'$')
            // where map_emp_id = ?
            // `
            `select map_slno,map_floor,floor_desc,
            co_nurse_desc
            from we_emp_map
            left join floor_master on we_emp_map.map_floor = floor_master.floor_code
            where map_emp_id = ?`
            ,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    }
}