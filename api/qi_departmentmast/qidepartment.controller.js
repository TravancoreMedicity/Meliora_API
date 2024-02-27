// const logger = require('../../logger/logger');
// const { validateCensusNursingStation, } = require('../../validation/validation_schema');

// const { censusNursingStatInsert, qualityDeptView, qualityDeptUpdate, qualityDeptList } = require('./qidepartment.service')
// module.exports = {
//     censusNursingStatInsert: (req, res) => {
//         const body = req.body;
//         const body_result = validateCensusNursingStation.validate(body);
//         if (body_result.error) {
//             return res.status(200).json({
//                 success: 2,
//                 message: body_result.error.details[0].message
//             });
//         }
//         body.qi_census_sec_name = body_result.value.qi_census_sec_name;
//         censusNursingStatInsert(body, (err, result) => {
//             if (err) {
//                 return res.status(200).json({
//                     success: 0,
//                     message: err
//                 });
//             }
//             return res.status(200).json({
//                 success: 1,
//                 insertid: result.insertId,
//                 message: "Department Created"
//             })
//         })
//     },

//     qualityDeptView: (req, res) => {
//         qualityDeptView((err, results) => {
//             if (err) {
//                 return res.status(200).json({
//                     success: 0,
//                     message: err
//                 })
//             }
//             if (Object.keys(results).length === 0) {
//                 return res.status(200).json({
//                     success: 1,
//                     message: "No Data Found",
//                     data: []
//                 })
//             }
//             return res.status(200).json({
//                 success: 2,
//                 data: results
//             })
//         })
//     },
//     qualityDeptUpdate: (req, res) => {
//         const body = req.body;
//         const body_result = validateCensusNursingStation.validate(body);
//         if (body_result.error) {
//             logger.warnlogwindow(body_result.error.details[0].message)
//             return res.status(200).json({
//                 success: 7,
//                 message: body_result.error.details[0].message
//             });
//         }
//         body.qi_census_sec_name = body_result.value.qi_census_sec_name;
//         qualityDeptUpdate(body, (err, results) => {
//             if (err) {
//                 return res.status(200).json({
//                     success: 0,
//                     message: err
//                 })
//             }
//             if (Object.keys(results).length === 0) {
//                 return res.status(200).json({
//                     success: 1,
//                     message: "No record found"
//                 })
//             }
//             return res.status(200).json({
//                 success: 2,
//                 message: "Updated successfully"
//             })
//         })
//     },

//     qualityDeptList: (req, res) => {
//         qualityDeptList((err, results) => {
//             if (err) {
//                 return res.status(200).json({
//                     success: 0,
//                     message: err
//                 })
//             }
//             if (Object.keys(results).length === 0) {
//                 return res.status(200).json({
//                     success: 1,
//                     message: "No Data Found",
//                     data: []
//                 })
//             }
//             return res.status(200).json({
//                 success: 2,
//                 data: results
//             })
//         })
//     },

// }