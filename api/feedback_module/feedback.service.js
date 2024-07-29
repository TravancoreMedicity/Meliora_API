const { pool } = require('../../config/database')
module.exports = {
    getfeedbackNursingStations: (callBack) => {
        //    census_ns_slno IN(27,63,64,65,66,67,68,69,70,71) and
        pool.query(
            `SELECT 
                  census_ns_slno, 
                  census_ns_name,
                  census_ns_code
             FROM
                  qi_census_nursing_mast
             WHERE
                    nursing_status=1
                  order by census_ns_name`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}