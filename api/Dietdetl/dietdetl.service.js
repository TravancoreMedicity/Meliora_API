const { pool } = require('../../config/database');


module.exports = {
    dietdetlinsert: (data, callBack) => {
        pool.query(
            `insert into diet_detail
            (
            diet_slno,
            type_slno,
            start_time,
            end_time,
            status,
            em_id
            ) values (?,?,?,?,?,?)`,
            [

                data.diet_slno,
                data.type_slno,
                data.start_time,
                data.end_time,
                data.status,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getdatadetl: (callBack) => {
        pool.query(
            `SELECT 
            diet_dtslno,
            diet_detail.diet_slno,
            diet_name,
            diet_detail.type_slno,
            type_desc,
            TIME(diet_type.start_time) as dietstart,
            TIME(diet_type.end_time) as dietend,
            diet_type.start_time,
            diet_type.end_time,
            if( diet_detail.status = 1,'yes','no') as dietdetlstatus,
            diet_detail.status,
            diet_detail.em_id
            FROM meliora.diet_detail
            left join diet_master on diet_detail.diet_slno = diet_master.diet_slno
            left join diet_type on diet_detail.type_slno = diet_type.type_slno`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatedietdetl: (data, callBack) => {
        pool.query(
            `update diet_detail 
            set diet_slno =?,
                        type_slno = ?,
                        start_time =?,
                        end_time =?,
                        status =?,
                        em_id=?
                        where diet_dtslno = ?`,
            [
                data.diet_slno,
                data.type_slno,
                data.start_time,
                data.end_time,
                data.status,
                data.em_id,
                data.diet_dtslno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getdatedeittype: (id, callBack) => {
        pool.query(
            `select start_time,
            end_time from diet_type where type_slno = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    }
}