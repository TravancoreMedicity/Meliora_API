const { pool } = require('../../config/database');




module.exports = {
    insertHallmaster: (data, callBack) => {
        pool.query(
            `insert into hall_master 
        (hall_name,
        hall_alias,
        hall_status,
        create_emid)
        value(?,?,?,?)`,
            [
                data.hall_name,
                data.hall_alias,
                data.hall_status,
                data.create_emid
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    updatehallname: (data, callBack) => {
        pool.query(
            `update hall_master 
            set 
            hall_name=?,
            hall_alias =?,
            hall_status =?,
            update_emid =?
            where hall_slno =?`,
            [
                data.hall_name,
                data.hall_alias,
                data.hall_status,
                data.update_emid,
                data.hall_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    gethalldetail: (callBack) => {
        pool.query(
            `select hall_slno,hall_name,hall_alias,
        case when hall_status = 1 then 'yes' else 'no' end hall_status
        from  hall_master`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    }

}