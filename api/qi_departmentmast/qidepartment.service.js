// const { pool } = require('../../config/database')
// module.exports = {

//     // census_nurs_station_slno, census_nursing_station, census_ns_code,
//     // census_outlet, census_ou_code, nursing_status, create_user, edit_user, create_date, update_date
//     censusNursingStatInsert: (data, callback) => {
//         pool.query(
//             `INSERT INTO qi_census_nursing_mast
//           (
//             qi_census_sec_name,
//             qi_sec_status,
//             create_user
//           )
//           VALUES(?,?,?)`,
//             [
//                 data.qi_census_sec_name,
//                 data.qi_sec_status,
//                 data.create_user
//             ],
//             (error, results, fields) => {
//                 if (error) {
//                     return callback(error);
//                 }
//                 return callback(null, results);
//             }
//         );
//     },

//     qualityDeptView: (callBack) => {
//         pool.query(
//             `SELECT
//                    qi_census_nurs_slno,
//                    qi_census_sec_name,
//                    if(qi_sec_status=1,'Yes','No') status
//               FROM
//                qi_census_nursing_mast`, [],
//             (error, results, feilds) => {
//                 if (error) {
//                     return callBack(error);
//                 }
//                 return callBack(null, results);
//             }
//         );
//     },

//     qualityDeptUpdate: (data, callback) => {
//         pool.query(
//             `UPDATE
//                   qi_census_nursing_mast
//              SET
//                   qi_census_sec_name=?,
//                   qi_sec_status=?,
//                   edit_user=?
//             WHERE
//                   qi_census_nurs_slno=?`,
//             [
//                 data.qi_census_sec_name,
//                 data.qi_sec_status,
//                 data.edit_user,
//                 data.qi_census_nurs_slno
//             ],
//             (error, results, feilds) => {
//                 if (error) {
//                     return callback(error);
//                 }
//                 return callback(null, results);
//             }
//         )
//     },


//     qualityDeptList: (callBack) => {
//         pool.query(
//             `SELECT
//                    qi_census_nurs_slno,
//                    qi_census_sec_name
//              FROM
//                    qi_census_nursing_mast
//              WHERE
//                    qi_sec_status=1`, [],
//             (error, results, feilds) => {
//                 if (error) {
//                     return callBack(error);
//                 }
//                 return callBack(null, results);
//             }
//         );
//     },


// }