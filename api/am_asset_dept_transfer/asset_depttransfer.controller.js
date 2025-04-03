const { pool } = require('../../config/database');
const logger = require('../../logger/logger')
const { getAssetBasedOnLocation, transferDepartment, getTransferHistory, updateTransLog, getAssetLocationDetails, getArrayOfAssetLocationDetails,
    // CustodianAssetTransfer,
    InsertTransferMaster, InsertTransferDetails, UpdateAssetData, getcustodianTransferhistory, getTransferDetail, getAssetOnSection
} = require('../am_asset_dept_transfer/asset_depttransfer.service');

module.exports = {

    getAssetBasedOnLocation: (req, res) => {
        const body = req.body
        getAssetBasedOnLocation(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    getAssetLocationDetails: (req, res) => {
        const body = req.body
        getAssetLocationDetails(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },


    getArrayOfAssetLocationDetails: (req, res) => {
        const body = req.body;
        getArrayOfAssetLocationDetails(body.AssetItemMapSlno, (err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                logger.infologwindow("No Results Found");
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    AssetTransfer: async (req, res) => {
        const body = req.body;
        const masterData = {
            transfrd_dept: body[0].item_dept_slno,
            transfrd_dept_sec: body[0].item_deptsec_slno,
            transfrd_room: body[0].item_room_slno,
            transfrd_sub_room: body[0].item_subroom_slno,
            transfrd_employee: body[0].transfer_user,
            transfrd_date: new Date(),
            transfrd_type: body[0].am_custodian_trans_status,
            transfrd_from_dept: body[0].am_trans_from_dept,
            transfrd_from_dept_sec: body[0].am_trans_from_dept_sec,
            transfrd_from_room: body[0].am_trans_from_room,
            transfrd_from_sub_room: body[0].am_trans_from_subroom
        }
        try {
            const masterId = await InsertTransferMaster(masterData);
            const detailData = body.map(item => ({
                asset_item_map_slno: item.am_item_map_slno,
                transfr_mast_slno: masterId
            }));
            await InsertTransferDetails(detailData);
            const updatePromises = body.map(item =>
                UpdateAssetData({
                    item_dept_slno: item.item_dept_slno,
                    item_deptsec_slno: item.item_deptsec_slno,
                    item_room_slno: item.item_room_slno,
                    item_subroom_slno: item.item_subroom_slno,
                    am_item_map_slno: item.am_item_map_slno,
                    asset_in_stock: 0,
                })
            );
            await Promise.all(updatePromises);
            return res.status(200).json({
                success: 1,
                message: "Data inserted and updated successfully"
            });
        } catch (err) {
            return res.status(500).json({
                success: 0,
                message: err.message
            });
        }
    },


    // AssetTransfer: async (req, res) => {
    //     const body = req.body;
    //     const masterData = {
    //         transfrd_dept: body[0].item_dept_slno,
    //         transfrd_dept_sec: body[0].item_deptsec_slno,
    //         transfrd_room: body[0].item_room_slno,
    //         transfrd_sub_room: body[0].item_subroom_slno,
    //         transfrd_employee: body[0].transfer_user,
    //         transfrd_date: new Date(),
    //         transfrd_type: body[0].am_custodian_trans_status,
    //         transfrd_from_dept: body[0].am_trans_from_dept,
    //         transfrd_from_dept_sec: body[0].am_trans_from_dept_sec,
    //         transfrd_from_room: body[0].am_trans_from_room,
    //         transfrd_from_sub_room: body[0].am_trans_from_subroom
    //     };

    //     try {
    //         const masterId = await InsertTransferMaster(masterData);
    //         const detailData = body.map(item => ({
    //             asset_item_map_slno: item.am_item_map_slno,
    //             transfr_mast_slno: masterId,
    //         }))
    //         await InsertTransferDetails(detailData)
    //         return res.status(200).json({
    //             success: 1,
    //             message: "Data inserted successfully"
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             success: 0,
    //             message: err.message
    //         });
    //     }
    // },




    // CustodianAssetTransfer: (req, res) => {
    //     const body = req.body;
    //     const data = body.am_item_map_slno.map((itemMapSlno) => [
    //         body.item_dept_slno,
    //         body.item_deptsec_slno,
    //         body.item_room_slno,
    //         body.item_subroom_slno,
    //         itemMapSlno,
    //     ]);
    //     CustodianAssetTransfer(data, (err, result) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err,
    //             });
    //         }
    //         if (result.affectedRows === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No record found",
    //             });
    //         }
    //         const itemCount = body.am_item_map_slno.length;
    //         let updateCount = 0;
    //         const updateAssetLogs = (index) => {
    //             if (index >= itemCount) {
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "Asset transferred to the selected department successfully",
    //                 });
    //             }
    //             const itemMapSlno = body.am_item_map_slno[index];
    //             pool.query(
    //                 `SELECT am_asset_log_slno 
    //                  FROM am_asset_transfer_log 
    //                  WHERE am_asset_item_map_slno = ? 
    //                  ORDER BY am_asset_log_slno DESC 
    //                  LIMIT 1`,
    //                 [itemMapSlno],
    //                 (error, logResults) => {
    //                     if (error) {
    //                         logger.logwindow(error);
    //                         return res.status(500).json({ success: 0, message: "Error fetching log entry" });
    //                     }
    //                     if (logResults.length === 0) {
    //                         return res.status(404).json({ success: 0, message: "No log entry found" });
    //                     }
    //                     const lastLogSlno = logResults[0].am_asset_log_slno;
    //                     const patchdata = {
    //                         am_trans_from_dept: body.am_trans_from_dept,
    //                         am_trans_from_dept_sec: body.am_trans_from_dept_sec,
    //                         am_trans_from_room: body.am_trans_from_room,
    //                         am_trans_from_subroom: body.am_trans_from_subroom,
    //                         am_custodian_trans_status: body.am_custodian_trans_status,
    //                         transfer_user: body.transfer_user,
    //                         am_asset_log_slno: lastLogSlno,
    //                     };

    //                     updateTransLog(patchdata, (err, results) => {
    //                         if (err) {
    //                             return res.status(200).json({
    //                                 success: 0,
    //                                 message: err,
    //                             });
    //                         }
    //                         if (results === 0) {
    //                             return res.status(200).json({
    //                                 success: 2,
    //                                 message: "No record found",
    //                             });
    //                         }

    //                         updateCount++;
    //                         updateAssetLogs(index + 1);
    //                     });
    //                 }
    //             );
    //         };
    //         updateAssetLogs(0);
    //     });
    // },





    // CustodianAssetTransfer: (req, res) => {
    //     const body = req.body;
    //     const data = body.am_item_map_slno.map((itemMapSlno) => [
    //         body.item_dept_slno,
    //         body.item_deptsec_slno,
    //         body.item_room_slno,
    //         body.item_subroom_slno,
    //         itemMapSlno,
    //     ]);
    //     CustodianAssetTransfer(data, (err, result) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err,
    //             });
    //         }
    //         if (result.affectedRows === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No record found",
    //             });
    //         }
    //         const itemCount = body.am_item_map_slno.length;
    //         let updateCount = 0;
    //         const updateAssetLogs = (index) => {
    //             if (index >= itemCount) {
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "Asset transferred to the selected department successfully",
    //                 });
    //             }
    //             const itemMapSlno = body.am_item_map_slno[index];
    //             pool.query(
    //                 `SELECT am_asset_log_slno 
    //                  FROM am_asset_transfer_log 
    //                  WHERE am_asset_item_map_slno = ? 
    //                  ORDER BY am_asset_log_slno DESC 
    //                  LIMIT 1`,
    //                 [itemMapSlno],
    //                 (error, logResults) => {
    //                     if (error) {
    //                         logger.logwindow(error);
    //                         return res.status(500).json({ success: 0, message: "Error fetching log entry" });
    //                     }
    //                     if (logResults.length === 0) {
    //                         return res.status(404).json({ success: 0, message: "No log entry found" });
    //                     }
    //                     const lastLogSlno = logResults[0].am_asset_log_slno;
    //                     const patchdata = {
    //                         am_trans_from_dept: body.am_trans_from_dept,
    //                         am_trans_from_dept_sec: body.am_trans_from_dept_sec,
    //                         am_trans_from_room: body.am_trans_from_room,
    //                         am_trans_from_subroom: body.am_trans_from_subroom,
    //                         am_custodian_trans_status: body.am_custodian_trans_status,
    //                         transfer_user: body.transfer_user,
    //                         am_asset_log_slno: lastLogSlno,
    //                     };

    //                     updateTransLog(patchdata, (err, results) => {
    //                         if (err) {
    //                             return res.status(200).json({
    //                                 success: 0,
    //                                 message: err,
    //                             });
    //                         }
    //                         if (results === 0) {
    //                             return res.status(200).json({
    //                                 success: 2,
    //                                 message: "No record found",
    //                             });
    //                         }

    //                         updateCount++;
    //                         updateAssetLogs(index + 1);
    //                     });
    //                 }
    //             );
    //         };
    //         updateAssetLogs(0);
    //     });
    // },





    transferDepartment: (req, res) => {
        const body = req.body;
        transferDepartment(body, (err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(500).json({ success: 0, message: err });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ success: 0, message: "No records updated" });
            }
            pool.query(
                `SELECT am_asset_log_slno 
                 FROM am_asset_transfer_log 
                 WHERE am_asset_item_map_slno = ? 
                 ORDER BY am_asset_log_slno DESC 
                 LIMIT 1`,
                [body.am_item_map_slno],
                (error, logResults) => {
                    if (error) {
                        logger.logwindow(error);
                        return res.status(500).json({ success: 0, message: "Error fetching log entry" });
                    }

                    if (logResults.length === 0) {
                        return res.status(404).json({ success: 0, message: "No log entry found" });
                    }

                    const lastLogSlno = logResults[0].am_asset_log_slno;
                    const patchdata = {
                        am_trans_from_dept: body.am_trans_from_dept,
                        am_trans_from_dept_sec: body.am_trans_from_dept_sec,
                        am_trans_from_room: body.am_trans_from_room,
                        am_trans_from_subroom: body.am_trans_from_subroom,
                        am_custodian_trans_status: body.am_custodian_trans_status,
                        transfer_user: body.transfer_user,
                        am_asset_log_slno: lastLogSlno,
                    };

                    updateTransLog(patchdata, (err, results) => {
                        if (err) {
                            return res.status(200).json({
                                success: 0,
                                message: err
                            })
                        }
                        if (results === 0) {
                            return res.status(200).json({
                                success: 2,
                                message: "No record found"

                            })
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "Asset transferred to the selected department successfully",
                        })
                    })
                }

            );
        });
    },

    getTransferHistory: (req, res) => {
        const { fromDate, toDate, assetNo, transDept, transDeptSec, custDept, selectedDept, selectedDeptSec } = req.body;
        let sql = `
            SELECT      
                am_asset_transfer_master.transfr_mast_slno,
                COUNT(am_asset_transfer_detail.transfer_detail_slno) AS transfer_detail_count,
                am_asset_transfer_master.transfrd_dept,
                am_asset_transfer_master.transfrd_dept_sec,
                am_asset_transfer_master.transfrd_room,
                am_asset_transfer_master.transfrd_sub_room, 
                am_asset_transfer_master.transfrd_employee, 
                am_asset_transfer_master.transfrd_date,
                am_asset_transfer_master.transfrd_type,
                am_asset_transfer_master.transfrd_from_dept, 
                am_asset_transfer_master.transfrd_from_dept_sec,
                am_asset_transfer_master.transfrd_from_room,
                am_asset_transfer_master.transfrd_from_sub_room,
                am_asset_transfer_master.transfrd_status,
                co_employee_master.em_name,
                dept1.dept_name AS trans_dept_name,
                dept2.dept_name AS trans_from_dept_name, 
                sec1.sec_name AS trans_deptsec_name,
                sec2.sec_name AS trans_from_deptsec_name,
                room1.rm_room_name AS trans_room_name,
                room2.rm_room_name AS trans_from_room_name,
                subroom1.subroom_name AS trans_subroom_name,
                subroom2.subroom_name AS trans_from_subroom_name
            FROM
                am_asset_transfer_master
            LEFT JOIN 
                co_employee_master ON co_employee_master.em_id = am_asset_transfer_master.transfrd_employee
            LEFT JOIN 
                co_department_mast dept1 ON dept1.dept_id = am_asset_transfer_master.transfrd_dept
            LEFT JOIN 
                co_department_mast dept2 ON dept2.dept_id = am_asset_transfer_master.transfrd_from_dept
            LEFT JOIN 
                co_deptsec_mast sec1 ON sec1.sec_id = am_asset_transfer_master.transfrd_dept_sec
            LEFT JOIN 
                co_deptsec_mast sec2 ON sec2.sec_id = am_asset_transfer_master.transfrd_from_dept_sec
            LEFT JOIN 
                rm_newroom_creation room1 ON room1.rm_room_slno = am_asset_transfer_master.transfrd_room
            LEFT JOIN 
                rm_newroom_creation room2 ON room2.rm_room_slno = am_asset_transfer_master.transfrd_from_room
            LEFT JOIN 
                rm_subroom_master subroom1 ON subroom1.subroom_slno = am_asset_transfer_master.transfrd_sub_room
            LEFT JOIN 
                rm_subroom_master subroom2 ON subroom2.subroom_slno = am_asset_transfer_master.transfrd_from_sub_room
            LEFT JOIN 
                am_asset_transfer_detail ON am_asset_transfer_detail.transfr_mast_slno = am_asset_transfer_master.transfr_mast_slno
            LEFT JOIN
                am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=am_asset_transfer_detail.asset_item_map_slno
            LEFT JOIN
                am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
            WHERE 
                am_asset_transfer_master.transfrd_status = 1
        `;

        // Add conditions dynamically based on provided data
        const queryParams = [];

        if (fromDate) {
            sql += " AND am_asset_transfer_master.transfrd_date >= ?";
            queryParams.push(fromDate);
        }
        if (toDate) {
            sql += " AND am_asset_transfer_master.transfrd_date <= ?";
            queryParams.push(toDate);
        }

        if (assetNo) {
            sql += " AND am_asset_transfer_detail.asset_item_map_slno = ?";
            queryParams.push(assetNo);
        }

        if (transDept) {
            sql += " AND transfrd_dept = ?";
            queryParams.push(transDept);
        }

        if (transDeptSec) {
            sql += " AND transfrd_dept_sec = ?";
            queryParams.push(transDeptSec);
        }
        if (custDept) {
            sql += " AND am_asset_item_map_master.item_custodian_dept = ? AND transfrd_type=1";
            queryParams.push(custDept);
        }
        if (selectedDept) {
            sql += " AND transfrd_from_dept = ?";
            queryParams.push(selectedDept);
        }

        if (selectedDeptSec) {
            sql += " AND transfrd_from_dept_sec = ?";
            queryParams.push(selectedDeptSec);
        }
        sql += `
            GROUP BY 
                am_asset_transfer_master.transfr_mast_slno,
                am_asset_transfer_master.transfrd_dept,
                am_asset_transfer_master.transfrd_dept_sec,
                am_asset_transfer_master.transfrd_room,
                am_asset_transfer_master.transfrd_sub_room, 
                am_asset_transfer_master.transfrd_employee, 
                am_asset_transfer_master.transfrd_date,
                am_asset_transfer_master.transfrd_type,
                am_asset_transfer_master.transfrd_from_dept, 
                am_asset_transfer_master.transfrd_from_dept_sec,
                am_asset_transfer_master.transfrd_from_room,
                am_asset_transfer_master.transfrd_from_sub_room,
                am_asset_transfer_master.transfrd_status,
                co_employee_master.em_name,
                dept1.dept_name,
                dept2.dept_name, 
                sec1.sec_name,
                sec2.sec_name,
                room1.rm_room_name,
                room2.rm_room_name,
                subroom1.subroom_name,
                subroom2.subroom_name
            ORDER BY 
                am_asset_transfer_master.transfr_mast_slno DESC
        `;


        getTransferHistory(sql, queryParams, (error, results) => {

            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: error.message
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No data found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getcustodianTransferhistory: (req, res) => {
        const { fromDate, toDate, custodianDept, transfrd_type } = req.body;
        let sql = `
            SELECT      
                am_asset_transfer_master.transfr_mast_slno,
                COUNT(am_asset_transfer_detail.transfer_detail_slno) AS transfer_detail_count,
                am_asset_transfer_master.transfrd_dept,
                am_asset_transfer_master.transfrd_dept_sec,
                am_asset_transfer_master.transfrd_room,
                am_asset_transfer_master.transfrd_sub_room, 
                am_asset_transfer_master.transfrd_employee, 
                am_asset_transfer_master.transfrd_date,
                am_asset_transfer_master.transfrd_type,
                am_asset_transfer_master.transfrd_from_dept, 
                am_asset_transfer_master.transfrd_from_dept_sec,
                am_asset_transfer_master.transfrd_from_room,
                am_asset_transfer_master.transfrd_from_sub_room,
                am_asset_transfer_master.transfrd_status,
                co_employee_master.em_name,
                dept1.dept_name AS trans_dept_name,
                dept2.dept_name AS trans_from_dept_name, 
                sec1.sec_name AS trans_deptsec_name,
                sec2.sec_name AS trans_from_deptsec_name,
                room1.rm_room_name AS trans_room_name,
                room2.rm_room_name AS trans_from_room_name,
                subroom1.subroom_name AS trans_subroom_name,
                subroom2.subroom_name AS trans_from_subroom_name
            FROM
                am_asset_transfer_master
            LEFT JOIN 
                co_employee_master ON co_employee_master.em_id = am_asset_transfer_master.transfrd_employee
            LEFT JOIN 
                co_department_mast dept1 ON dept1.dept_id = am_asset_transfer_master.transfrd_dept
            LEFT JOIN 
                co_department_mast dept2 ON dept2.dept_id = am_asset_transfer_master.transfrd_from_dept
            LEFT JOIN 
                co_deptsec_mast sec1 ON sec1.sec_id = am_asset_transfer_master.transfrd_dept_sec
            LEFT JOIN 
                co_deptsec_mast sec2 ON sec2.sec_id = am_asset_transfer_master.transfrd_from_dept_sec
            LEFT JOIN 
                rm_newroom_creation room1 ON room1.rm_room_slno = am_asset_transfer_master.transfrd_room
            LEFT JOIN 
                rm_newroom_creation room2 ON room2.rm_room_slno = am_asset_transfer_master.transfrd_from_room
            LEFT JOIN 
                rm_subroom_master subroom1 ON subroom1.subroom_slno = am_asset_transfer_master.transfrd_sub_room
            LEFT JOIN 
                rm_subroom_master subroom2 ON subroom2.subroom_slno = am_asset_transfer_master.transfrd_from_sub_room
            LEFT JOIN 
                am_asset_transfer_detail ON am_asset_transfer_detail.transfr_mast_slno = am_asset_transfer_master.transfr_mast_slno
            LEFT JOIN
                am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=am_asset_transfer_detail.asset_item_map_slno
            LEFT JOIN
                am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
            WHERE 
                am_asset_transfer_master.transfrd_status = 1
        `;

        const queryParams = [];
        if (transfrd_type !== undefined && transfrd_type !== null) {
            sql += " AND am_asset_transfer_master.transfrd_type = ?";
            queryParams.push(transfrd_type);
        }
        if (fromDate) {
            sql += " AND am_asset_transfer_master.transfrd_date >= ?";
            queryParams.push(fromDate);
        }
        if (toDate) {
            sql += " AND am_asset_transfer_master.transfrd_date <= ?";
            queryParams.push(toDate);
        }
        if (custodianDept) {
            sql += " AND am_custodian_department.am_custodian_dept_slno = ?";
            queryParams.push(custodianDept);
        }

        sql += `
            GROUP BY 
                am_asset_transfer_master.transfr_mast_slno,
                am_asset_transfer_master.transfrd_dept,
                am_asset_transfer_master.transfrd_dept_sec,
                am_asset_transfer_master.transfrd_room,
                am_asset_transfer_master.transfrd_sub_room, 
                am_asset_transfer_master.transfrd_employee, 
                am_asset_transfer_master.transfrd_date,
                am_asset_transfer_master.transfrd_type,
                am_asset_transfer_master.transfrd_from_dept, 
                am_asset_transfer_master.transfrd_from_dept_sec,
                am_asset_transfer_master.transfrd_from_room,
                am_asset_transfer_master.transfrd_from_sub_room,
                am_asset_transfer_master.transfrd_status,
                co_employee_master.em_name,
                dept1.dept_name,
                dept2.dept_name, 
                sec1.sec_name,
                sec2.sec_name,
                room1.rm_room_name,
                room2.rm_room_name,
                subroom1.subroom_name,
                subroom2.subroom_name
            ORDER BY 
                am_asset_transfer_master.transfr_mast_slno DESC
        `;

        getcustodianTransferhistory(sql, queryParams, (error, results) => {

            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: error.message,
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No data found",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    getTransferDetail: (req, res) => {
        const body = req.body
        getTransferDetail(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAssetOnSection: (req, res) => {
        const body = req.body
        getAssetOnSection(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },


}
