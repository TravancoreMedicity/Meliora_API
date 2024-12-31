const { requestRegistInsert, deleteCrfReq, requestRegistInsertDetl, requestApprovalInsert, InHodExist, getAllReqBasedDept,
    getDetailItemList, EditItemListByReqno, UpdateReqMaster, getApprovListOthers, getCrfStoreDetailsDashborad,
    getAllListDashboard, getAllReqBasedDeptreq, deleteItemDetails, getCRFPurchaseDashboard, getDeliveryMarkingDetails,
    getAllPoDetails, getAllItemDetails, getStoreAckDetails, getUserAckDetails, getCompletedCRF, getAllPendingApprovalsAboveHOD,
    getPoList, searchCrfDetails, getApprvPendingDashboard, getAprvlDetailsView, gePurchaseDetails, getPurchaseApprvlView,
    getAllHoldAndRejectItems, insertApprvitemsStatus, deleteCrfReqApproval, deleteCrfRegItemDetl, updateItemActiveStatus,
    getCRFStoreDetails, getStoreApprvlViewCRF, updateApproveStatus } = require('../crm_newrequest_registration/newRequestRegister.service');
// const { validateCRMRequestRegister } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
module.exports = {
    requestRegistInsert: (req, res) => {
        const body = req.body;
        // Insert CRF request
        requestRegistInsert(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Failed to insert CRF request",
                    error: err
                });
            }
            if (results) {
                const crfinsert_id = results.insertId;
                const userId = body.create_user;
                // Prepare approval insert object
                const apprvlInsert = {
                    req_slno: crfinsert_id,
                    incharge_req: body.incharge_req,
                    incharge_approve: body.incharge_approve,
                    hod_req: body.hod_req,
                    dms_req: body.dms_req,
                    ms_approve_req: body.ms_approve_req,
                    manag_operation_req: body.manag_operation_req,
                    senior_manage_req: body.senior_manage_req,
                    gm_approve_req: body.gm_approve_req,
                    ed_approve_req: body.ed_approve_req,
                    md_approve_req: body.md_approve_req
                };
                // Insert approval details
                requestApprovalInsert(apprvlInsert, (approvalErr, approvalResults) => {
                    if (approvalErr) {
                        deleteCrfReq(crfinsert_id, (deleteErr) => {
                            if (deleteErr) {
                                logger.logwindow(deleteErr);
                                return res.status(400).json({
                                    success: 0,
                                    message: "Failed to delete CRF request after approval error",
                                    error: deleteErr
                                });
                            }
                            return res.status(200).json({
                                success: 0,
                                message: "CRF request deleted due to approval insert error",
                                error: approvalErr
                            });
                        });
                        return;
                    }

                    if (approvalResults) {
                        // Prepare item list for insertion
                        const itemList = body.items?.map((value) => {
                            return {
                                req_slno: crfinsert_id,
                                item_slno: value.item_slno,
                                item_desc: value.item_desc,
                                item_brand: value.item_brand,
                                item_unit: value.item_unit,
                                item_qnty: value.item_qnty,
                                item_specification: value.item_specification,
                                item_unit_price: value.item_unit_price,
                                aprox_cost: value.aprox_cost,
                                item_status: value.item_status,
                                approve_item_desc: value.approve_item_desc,
                                approve_item_brand: value.approve_item_brand,
                                approve_item_unit: value.approve_item_unit,
                                item_qnty_approved: value.item_qnty_approved,
                                approve_item_specification: value.approve_item_specification,
                                approve_item_unit_price: value.approve_item_unit_price,
                                approve_aprox_cost: value.approve_aprox_cost,
                                item_status_approved: value.item_status_approved,
                                approve_item_status: value.approve_item_status,
                                create_user: userId
                            }
                        });

                        // Insert item details
                        const insertPromises = itemList.map((val) => {
                            return new Promise((resolve, reject) => {
                                requestRegistInsertDetl(val, (itemErr, itemResults) => {
                                    if (itemErr) {
                                        deleteCrfReqApproval(crfinsert_id, (delApprErr) => {
                                            if (delApprErr) logger.logwindow(delApprErr);
                                            deleteCrfReq(crfinsert_id, (delCrfErr) => {
                                                if (delCrfErr) logger.logwindow(delCrfErr);
                                                reject(itemErr);
                                            });
                                        });
                                    } else {
                                        const itemInsertId = itemResults.insertId;
                                        const apprvStatusEntry = {
                                            req_detl_slno: itemInsertId,
                                            req_slno: crfinsert_id
                                        }
                                        insertApprvitemsStatus(apprvStatusEntry, (statusErr) => {
                                            if (statusErr) {
                                                deleteCrfRegItemDetl(crfinsert_id, (delitemErr) => {
                                                    if (delitemErr) logger.logwindow(delitemErr);
                                                    deleteCrfReqApproval(crfinsert_id, (delApprErr) => {
                                                        if (delApprErr) logger.logwindow(delApprErr);
                                                        deleteCrfReq(crfinsert_id, (delCrfErr) => {
                                                            if (delCrfErr) logger.logwindow(delCrfErr);
                                                            reject(statusErr);
                                                        });
                                                    });
                                                });
                                            } else {
                                                resolve();
                                            }
                                        });
                                    }
                                });
                            });
                        });
                        Promise.all(insertPromises)
                            .then(() => {
                                return res.status(200).json({
                                    success: 1,
                                    message: "Request registered successfully",
                                    insertid: crfinsert_id
                                });
                            })
                            .catch((promiseErr) => {
                                logger.logwindow(promiseErr);
                                return res.status(200).json({
                                    success: 0,
                                    message: "Error occurred during item insertion",
                                    error: promiseErr
                                });
                            });
                    }
                });
            }
        });

    },
    InHodExist: (req, res) => {
        const id = req.params.id;
        InHodExist(id, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No data"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    getAllReqBasedDept: (req, res) => {
        const body = req.body
        getAllReqBasedDept(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getDetailItemList: (req, res) => {
        const id = req.params.id
        getDetailItemList(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    // UpdateReqMaster: (req, res) => {
    //     const body = req.body;
    //     const req_slno = body.req_slno;
    //     const userId = body.edit_user;
    //     UpdateReqMaster(body, (err, results) => {
    //         if (err) {
    //             logger.logwindow(err);
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "Internal server error"
    //             });
    //         }
    //         if (!results) {
    //             logger.infologwindow("Record Not Found");
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "Record Not Found"
    //             });
    //         }
    //         else if (results) {
    //             const insert = body.items?.filter((val) => val.req_detl_slno === 0) || [];
    //             const update = body.items?.filter((val) => val.req_detl_slno !== 0) || [];
    //             if (insert.length > 0) {
    //                 const insertItem = insert?.map((value) => {
    //                     return {
    //                         req_slno: req_slno,
    //                         item_slno: value.item_slno,
    //                         item_desc: value.item_desc,
    //                         item_brand: value.item_brand,
    //                         item_unit: value.item_unit,
    //                         item_qnty: value.item_qnty,
    //                         item_specification: value.item_specification,
    //                         item_unit_price: value.item_unit_price,
    //                         aprox_cost: value.aprox_cost,
    //                         item_status: value.item_status,
    //                         approve_item_desc: value.approve_item_desc,
    //                         approve_item_brand: value.approve_item_brand,
    //                         approve_item_unit: value.approve_item_unit,
    //                         item_qnty_approved: value.item_qnty_approved,
    //                         approve_item_specification: value.approve_item_specification,
    //                         approve_item_unit_price: value.approve_item_unit_price,
    //                         approve_aprox_cost: value.approve_aprox_cost,
    //                         item_status_approved: value.item_status_approved,
    //                         approve_item_status: value.approve_item_status,
    //                         create_user: userId
    //                     }
    //                 });
    //                 const insertPromises = insertItem.map((val) => {
    //                     return new Promise((resolve, reject) => {
    //                         requestRegistInsertDetl(val, (itemErr, itemResults) => {
    //                             if (itemErr) {
    //                                 reject(itemErr);
    //                             } else {
    //                                 const itemInsertId = itemResults.insertId;
    //                                 const apprvStatusEntry = {
    //                                     req_detl_slno: itemInsertId,
    //                                     req_slno: req_slno
    //                                 }
    //                                 insertApprvitemsStatus(apprvStatusEntry, (statusErr) => {
    //                                     if (statusErr) {
    //                                         reject(statusErr);
    //                                     } else {
    //                                         resolve();
    //                                     }
    //                                 });
    //                             }
    //                         });
    //                     });
    //                 });
    //                 Promise.all(insertPromises)
    //                     .then(() => {
    //                         return res.status(200).json({
    //                             success: 1,
    //                             message: "Requested Item Insert",
    //                         });
    //                     })
    //                     .catch((promiseErr) => {
    //                         logger.logwindow(promiseErr);
    //                         return res.status(200).json({
    //                             success: 0,
    //                             message: "Error occurred during item insertion",
    //                             error: promiseErr
    //                         });
    //                     });
    //             }
    //             const promises = [];
    //             if (update.length > 0) {
    //                 const updateItem = update.map((val) => ({
    //                     item_slno: val.item_slno,
    //                     item_desc: val.item_desc,
    //                     item_brand: val.item_brand,
    //                     item_unit: val.item_unit,
    //                     item_qnty: val.item_qnty,
    //                     item_specification: val.item_specification,
    //                     item_unit_price: val.item_unit_price,
    //                     aprox_cost: val.aprox_cost,
    //                     approve_item_desc: val.approve_item_desc,
    //                     approve_item_brand: val.approve_item_brand,
    //                     approve_item_unit: val.approve_item_unit,
    //                     item_qnty_approved: val.item_qnty_approved,
    //                     approve_item_specification: val.approve_item_specification,
    //                     approve_item_unit_price: val.approve_item_unit_price,
    //                     approve_aprox_cost: val.approve_aprox_cost,
    //                     edit_user: userId,
    //                     item_status: 1,
    //                     approve_item_status: 1,
    //                     req_detl_slno: val.req_detl_slno,
    //                     req_slno: req_slno
    //                 }));

    //                 promises.push(
    //                     EditItemListByReqno(updateItem)
    //                         .then(() => "Items updated successfully")
    //                         .catch((err) => {
    //                             logger.logwindow(err);
    //                             throw new Error("Error updating items");
    //                         })
    //                 );
    //                 Promise.all(promises)
    //                     .then((messages) => {
    //                         res.status(200).json({
    //                             success: 1,
    //                             messages,
    //                         });
    //                     })
    //                     .catch((error) => {
    //                         res.status(200).json({
    //                             success: 0,
    //                             message: error.message,
    //                         });
    //                     });
    //             }
    //         }
    //     });
    // },
    UpdateReqMaster: (req, res) => {
        const body = req.body;
        const req_slno = body.req_slno;
        const userId = body.edit_user;

        UpdateReqMaster(body, async (err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(200).json({
                    success: 0,
                    message: "Internal server error"
                });
            }

            if (!results) {
                logger.infologwindow("Record Not Found");
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            try {
                // Process insert items
                const insert = body.items?.filter((val) => val.req_detl_slno === 0) || [];
                const insertPromises = insert.map((value) => {
                    return new Promise((resolve, reject) => {
                        const insertData = {
                            req_slno,
                            item_slno: value.item_slno,
                            item_desc: value.item_desc,
                            item_brand: value.item_brand,
                            item_unit: value.item_unit,
                            item_qnty: value.item_qnty,
                            item_specification: value.item_specification,
                            item_unit_price: value.item_unit_price,
                            aprox_cost: value.aprox_cost,
                            item_status: value.item_status,
                            approve_item_desc: value.approve_item_desc,
                            approve_item_brand: value.approve_item_brand,
                            approve_item_unit: value.approve_item_unit,
                            item_qnty_approved: value.item_qnty_approved,
                            approve_item_specification: value.approve_item_specification,
                            approve_item_unit_price: value.approve_item_unit_price,
                            approve_aprox_cost: value.approve_aprox_cost,
                            item_status_approved: value.item_status_approved,
                            approve_item_status: value.approve_item_status,
                            create_user: userId
                        };

                        requestRegistInsertDetl(insertData, (itemErr, itemResults) => {
                            if (itemErr) {
                                return reject(itemErr);
                            }

                            const itemInsertId = itemResults.insertId;
                            const apprvStatusEntry = {
                                req_detl_slno: itemInsertId,
                                req_slno
                            };

                            insertApprvitemsStatus(apprvStatusEntry, (statusErr) => {
                                if (statusErr) {
                                    return reject(statusErr);
                                }
                                resolve();
                            });
                        });
                    });
                });

                // Process update items
                const update = body.items?.filter((val) => val.req_detl_slno !== 0) || [];
                const updateData = update.map((val) => ({
                    item_slno: val.item_slno,
                    item_desc: val.item_desc,
                    item_brand: val.item_brand,
                    item_unit: val.item_unit,
                    item_qnty: val.item_qnty,
                    item_specification: val.item_specification,
                    item_unit_price: val.item_unit_price,
                    aprox_cost: val.aprox_cost,
                    approve_item_desc: val.approve_item_desc,
                    approve_item_brand: val.approve_item_brand,
                    approve_item_unit: val.approve_item_unit,
                    item_qnty_approved: val.item_qnty_approved,
                    approve_item_specification: val.approve_item_specification,
                    approve_item_unit_price: val.approve_item_unit_price,
                    approve_aprox_cost: val.approve_aprox_cost,
                    edit_user: userId,
                    item_status: 1,
                    approve_item_status: 1,
                    req_detl_slno: val.req_detl_slno,
                    req_slno
                }));

                const updatePromise = update.length
                    ? EditItemListByReqno(updateData)
                    : Promise.resolve();

                // Execute all promises
                await Promise.all([...insertPromises, updatePromise]);

                return res.status(200).json({
                    success: 1,
                    message: "Items processed successfully"
                });

            } catch (error) {
                logger.logwindow(error);
                return res.status(200).json({
                    success: 0,
                    message: "Error processing items",
                    error: error.message
                });
            }
        });
    },

    getApprovListOthers: (req, res) => {
        getApprovListOthers((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAllListDashboard: (req, res) => {
        getAllListDashboard((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getApprvPendingDashboard: (req, res) => {
        const id = req.params.id

        const sqlArray = [
            {
                val: 1, name: 'hodpending', sql: `AND hod_approve is null AND ((dms_req = 1 AND dms_approve is null) OR 
                   ( dms_req = 0 AND dms_approve is  null)) AND
				   ((ms_approve_req = 1 AND ms_approve is null) OR( ms_approve_req = 0 AND ms_approve is null)) AND
				   manag_operation_approv is null AND senior_manage_approv is null AND gm_approve is null AND
                   ed_approve is null AND md_approve is null `
            },
            {
                val: 2, name: 'dmspending', sql: `AND (incharge_approve=1 OR hod_approve=1) AND dms_req = 1 AND
                 dms_approve is null AND ms_approve is null AND manag_operation_approv is null AND
                 senior_manage_approv is null AND gm_approve is null AND ed_approve is null AND md_approve is null`
            },
            {
                val: 3, name: 'mspending', sql: ` AND (incharge_approve=1 OR hod_approve=1) AND ms_approve_req = 1 AND
                 ms_approve is null AND manag_operation_approv is null AND senior_manage_approv is null AND
                  gm_approve is null AND ed_approve is null AND md_approve is null `
            },
            {
                val: 4, name: 'mopending', sql: `AND (incharge_approve=1 OR hod_approve=1) AND manag_operation_approv is null
                 AND senior_manage_approv is null AND  gm_approve is null AND ed_approve is null AND md_approve is null
                  AND req_status!='P' AND req_status!='R'`
            },
            {
                val: 5, name: 'smopending', sql: `AND (incharge_approve=1 OR hod_approve=1) AND senior_manage_approv is null
                 AND gm_approve is null AND ed_approve is null AND md_approve is null  AND req_status!='P' AND req_status!='R'`
            },
            {
                val: 6, name: 'gmpending', sql: `AND (incharge_approve=1 OR hod_approve=1) AND gm_approve is null AND
                 ed_approve is null AND md_approve is null  AND req_status!='P' AND req_status!='R'`
            },
            {
                val: 7, name: 'mdpending', sql: `AND (incharge_approve=1 OR hod_approve=1) AND md_approve is null 
                 AND req_status!='P' AND req_status!='R' `
            },
            {
                val: 8, name: 'edpending', sql: `AND (incharge_approve=1 OR hod_approve=1) AND ed_approve is null
                  AND req_status!='P' AND req_status!='R'`
            },
        ]

        const filterSql = sqlArray.find(e => e.val === parseInt(id))?.sql || '';
        const sql = `
                SELECT
                    crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                    R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                    crm_request_master.request_deptsec_slno,crm_request_master.location,expected_date,
                    GROUP_CONCAT(item_type_name) as category,crm_request_master.create_date,user_deptsec,          
                    incharge_req, incharge_approve,hod_req, hod_approve,dms_req, dms_approve,ms_approve_req,
                    ms_approve,manag_operation_req, manag_operation_approv,senior_manage_req, senior_manage_approv,
                    gm_approve_req, gm_approve,ed_approve_req, ed_approve, md_approve_req,md_approve,
                    TD.dept_id, TD.dept_name
   
                FROM
                    crm_request_master
                  LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                  LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                  LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                  LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec                 
                  LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
                  LEFT JOIN co_department_mast TD on TD.dept_id=R.dept_id           
                WHERE
                   crf_close is null AND user_acknldge is null  ${filterSql} 
                GROUP BY crm_request_master.req_slno
                ORDER BY crm_request_master.req_slno DESC`
        getApprvPendingDashboard(sql, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 2,
                    message: err.message
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAprvlDetailsView: (req, res) => {
        const id = req.params.id
        getAprvlDetailsView(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getCRFPurchaseDashboard: (req, res) => {
        getCRFPurchaseDashboard((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    gePurchaseDetails: (req, res) => {
        const id = req.params.id

        const sqlArray = [
            {
                val: 1, name: 'ackpending', sql: ` AND ack_status IS NULL `
            },
            {
                val: 2, name: 'quopending', sql: `AND quatation_calling_status = 0 AND ack_status = 1 AND po_prepartion = 0`
            },
            {
                val: 3, name: 'quonegopending', sql: ` AND quatation_negotiation = 0 AND quatation_calling_status = 1`
            },
            {
                val: 4, name: 'quofixpending', sql: `AND quatation_fixing = 0 AND quatation_negotiation = 1`
            },
            {
                val: 5, name: 'popreppending', sql: `AND po_complete = 0 AND po_prepartion = 1 `
            },
            {
                val: 6, name: 'apprvl1', sql: `AND po_complete = 1 AND approval_level IS NULL `
            },
            {
                val: 7, name: 'apprvl2', sql: `AND po_complete = 1 AND approval_level = 1`
            },
            {
                val: 8, name: 'apprvl3', sql: `AND po_complete = 1 AND approval_level = 2`
            },
            {
                val: 9, name: 'posup', sql: `AND po_complete = 1 AND crm_purchase_po_details.po_to_supplier = 0 AND approval_level = 3`
            },
        ]

        const filterSql = sqlArray.find(e => e.val === parseInt(id))?.sql || '';
        const sql =
            `SELECT
                   crm_request_master.req_slno,
                   crm_request_master.actual_requirement,
                   crm_request_master.needed,
                   R.sec_name as req_deptsec,
                   U.sec_name as user_deptsection,
                   CR.em_name as create_user,
                   crm_request_master.request_deptsec_slno,
                   crm_request_master.location,
                   expected_date,
                   GROUP_CONCAT(item_type_name) as category,
                   crm_request_master.create_date,
                   user_deptsec,
                   ack_status,
                   quatation_calling_status,
                   quatation_negotiation,
                   quatation_fixing,
                   po_prepartion,
                   po_complete,
                   crm_purchase_po_details.po_to_supplier,
                   po_number,
                   approval_level,TD.dept_id,TD.dept_name
            FROM
                   crm_request_master
                 LEFT JOIN crm_request_approval ON crm_request_approval.req_slno = crm_request_master.req_slno
                 LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                 LEFT JOIN co_deptsec_mast R ON R.sec_id = crm_request_master.request_deptsec_slno
                 LEFT JOIN co_deptsec_mast U ON U.sec_id = crm_request_master.user_deptsec                 
                 LEFT JOIN co_employee_master CR ON CR.em_id = crm_request_master.create_user
                 LEFT JOIN crm_purchase_mast ON crm_purchase_mast.req_slno = crm_request_master.req_slno
                 LEFT JOIN crm_purchase_po_details ON crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
                  LEFT JOIN co_department_mast TD on TD.dept_id=R.dept_id      
            WHERE
                 ed_approve = 1 
                 AND md_approve = 1 
                 AND crf_close IS NULL 
                 AND user_acknldge IS NULL
                 ${filterSql}
             GROUP BY 
                 crm_request_master.req_slno, 
                 crm_purchase_po_details.po_number
             ORDER BY 
                 crm_request_master.req_slno DESC`
        gePurchaseDetails(sql, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 2,
                    message: err.message
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getPurchaseApprvlView: (req, res) => {
        const body = req.body;
        getPurchaseApprvlView(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },


    getAllReqBasedDeptreq: (req, res) => {
        const id = req.params.id
        getAllReqBasedDeptreq(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    deleteItemDetails: (req, res) => {
        const body = req.body;
        deleteItemDetails(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results) {
                updateApproveStatus(body, (err, updateStatus) => {
                    if (err) {
                        logger.logwindow(err);
                        return res.status(200).json({
                            success: 0,
                            message: "Internal server error",
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Deleted"
                    });
                });
            }
        })
    },

    getCrfStoreDetailsDashborad: (req, res) => {
        getCrfStoreDetailsDashborad((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getCRFStoreDetails: (req, res) => {
        const id = req.params.id

        const sqlArray = [
            {
                val: 1, name: 'crspending', sql: ` AND store_recieve IS NULL `
            },
            {
                val: 2, name: 'partialy', sql: `AND store_recieve=0`
            },
            {
                val: 3, name: 'fully', sql: ` AND store_recieve=1`
            },
        ]
        const filterSql = sqlArray.find(e => e.val === parseInt(id))?.sql || '';
        const sql =
            `SELECT
                   crm_request_master.req_slno,
                   crm_request_master.actual_requirement,
                   crm_request_master.needed,
                   R.sec_name as req_deptsec,
                   U.sec_name as user_deptsection,
                   CR.em_name as create_user,
                   crm_request_master.request_deptsec_slno,
                   crm_request_master.location,
                   expected_date,
                   GROUP_CONCAT(item_type_name) as category,
                   crm_request_master.create_date,
                   user_deptsec,
                   crm_purchase_po_details.po_to_supplier,
                   store_recieve,
                   crm_purchase_po_details.sub_store_recieve,
                   po_number,TD.dept_id,TD.dept_name
            FROM
                   crm_request_master
                 LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                 LEFT JOIN co_deptsec_mast R ON R.sec_id = crm_request_master.request_deptsec_slno
                 LEFT JOIN co_deptsec_mast U ON U.sec_id = crm_request_master.user_deptsec                 
                 LEFT JOIN co_employee_master CR ON CR.em_id = crm_request_master.create_user
                 LEFT JOIN crm_purchase_mast ON crm_purchase_mast.req_slno = crm_request_master.req_slno
                 LEFT JOIN crm_purchase_po_details ON crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
                 LEFT JOIN co_department_mast TD on TD.dept_id=R.dept_id      
            WHERE
                 crm_purchase_po_details.po_to_supplier=1
                 AND user_acknldge is null
                 AND req_status!='C'
                 ${filterSql}
             GROUP BY 
                 crm_request_master.req_slno, 
                 crm_purchase_po_details.po_number
             ORDER BY 
                 crm_request_master.req_slno DESC`
        getCRFStoreDetails(sql, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 2,
                    message: err.message
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getStoreApprvlViewCRF: (req, res) => {
        const body = req.body;
        getStoreApprvlViewCRF(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },

    getDeliveryMarkingDetails: (req, res) => {
        const body = req.body;
        getDeliveryMarkingDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },
    getAllPoDetails: (req, res) => {
        const id = req.params.id
        getAllPoDetails(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAllItemDetails: (req, res) => {
        const body = req.body;
        getAllItemDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },

    getStoreAckDetails: (req, res) => {
        const body = req.body;
        getStoreAckDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },
    getUserAckDetails: (req, res) => {
        const body = req.body;
        getUserAckDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },
    getCompletedCRF: (req, res) => {
        const body = req.body;
        getCompletedCRF(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },
    getAllPendingApprovalsAboveHOD: (req, res) => {
        const { level, from, to } = req.body;
        const sqlArray = [
            // DMS
            {
                val: 1, name: 'dmspending', sql: `AND dms_req = 1 AND dms_approve is null AND ms_approve is null AND 
                manag_operation_approv is null AND senior_manage_approv is null AND gm_approve is null AND ed_approve is null
                 AND md_approve is null AND crf_close is null AND user_acknldge is null AND req_status!='P' AND req_status!='R'`
            },
            {
                val: 2, name: 'dmsapprvl', sql: `AND (dms_req = 1 OR ms_approve_req=1) AND crf_close is null AND user_acknldge is null 
                AND ack_status is null `
            },
            {
                val: 3, name: 'dmspurchase', sql: `AND (dms_req = 1 OR ms_approve_req=1) AND crf_close is null AND user_acknldge is null
                AND ack_status=1 AND crm_purchase_po_details.po_to_supplier=0`
            },
            {
                val: 4, name: 'dmsinventory', sql: `AND (dms_req = 1 OR ms_approve_req=1) AND crf_close is null AND user_acknldge is null AND
                 crm_purchase_po_details.po_to_supplier=1 AND store_recieve is not null AND crm_request_master.sub_store_recieve is null`
            },
            {
                val: 5, name: 'dmsuser', sql: `AND (dms_req = 1 OR ms_approve_req=1) AND crf_close is null AND user_acknldge is null
               AND crm_purchase_po_details.po_to_supplier = 1 AND crm_request_master.sub_store_recieve = 1`
            },
            {
                val: 6, name: 'dmshold', sql: `AND (dms_req = 1 OR ms_approve_req=1) AND req_status='P' AND crf_close is null AND user_acknldge is null`
            },
            {
                val: 7, name: 'dmsreject', sql: `AND (dms_req = 1 OR ms_approve_req=1) AND req_status='R' AND crf_close is null AND user_acknldge is null`
            },
            {
                val: 8, name: 'dmsclosed', sql: `AND (dms_req = 1 OR ms_approve_req = 1) AND crf_close = 1 
                      AND close_date BETWEEN ? AND ?`
            },
            // MS
            {
                val: 9, name: 'mspending', sql: `AND ms_approve_req = 1 AND ms_approve is null AND 
                manag_operation_approv is null AND senior_manage_approv is null AND  gm_approve is null AND ed_approve is null
                 AND md_approve is null AND crf_close is null AND user_acknldge is null AND req_status!='P' AND req_status!='R'`
            },
            // MO
            {
                val: 10, name: 'mopending', sql: `AND manag_operation_approv is null AND
                 senior_manage_approv is null AND  gm_approve is null AND ed_approve is null AND md_approve is null
                  AND crf_close is null AND user_acknldge is null AND req_status!='P' AND req_status!='R'`
            },
            {
                val: 11, name: 'apprvl', sql: `AND crf_close is null AND user_acknldge is null AND ack_status is null`
            },
            {
                val: 12, name: 'purchase', sql: `AND crf_close is null AND user_acknldge is null
                AND ack_status=1 AND crm_purchase_po_details.po_to_supplier=0`
            },
            {
                val: 13, name: 'inventory', sql: `AND crf_close is null AND user_acknldge is null AND
                 crm_purchase_po_details.po_to_supplier=1 AND store_recieve is not null AND crm_request_master.sub_store_recieve is null`
            },
            {
                val: 14, name: 'user', sql: `AND crf_close is null AND user_acknldge is null
               AND crm_purchase_po_details.po_to_supplier = 1 AND crm_request_master.sub_store_recieve = 1`
            },
            {
                val: 15, name: 'onhold', sql: `AND req_status='P' AND crf_close is null AND user_acknldge is null`
            },
            {
                val: 16, name: 'reject', sql: ` AND req_status='R' AND crf_close is null AND user_acknldge is null`
            },
            {
                val: 17, name: 'closed', sql: ` AND crf_close = 1 AND close_date BETWEEN ? AND ?`
            },
            {
                val: 18, name: 'smopending', sql: `AND senior_manage_approv is null AND gm_approve is null AND
                 ed_approve is null AND md_approve is null AND crf_close is null AND user_acknldge is null
                  AND req_status!='P' AND req_status!='R'`
            },
            {
                val: 19, name: 'gmpending', sql: `AND gm_approve is null AND
                 ed_approve is null AND md_approve is null AND crf_close is null AND user_acknldge is null
                  AND req_status!='P' AND req_status!='R'`
            },
            {
                val: 20, name: 'mdpending', sql: `AND md_approve is null AND crf_close is null AND user_acknldge is null
                  AND req_status!='P' AND req_status!='R'`
            },
            {
                val: 21, name: 'edpending', sql: `AND ed_approve is null AND crf_close is null AND user_acknldge is null
                  AND req_status!='P' AND req_status!='R'`
            },
        ]
        const filterSql = sqlArray.find(e => e.val === level)?.sql || '';
        const sql = `
                SELECT
                    crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                    R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                    crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
                    crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                    crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                    GROUP_CONCAT(item_type_name) as category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                    total_approx_cost,user_deptsec,req_status,req_approv_slno,           
                    incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                    I.em_name as incharge_user,
                    hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
                    dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
                    ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
                    manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                    om_approv_date, OM.em_name as manag_operation_user,senior_manage_remarks,senior_manage_req, senior_manage_approv,
                    smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user,gm_approve_req, gm_approve,
                    gm_approve_remarks, gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,ed_approve_req, ed_approve,
                    ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,md_approve_req,md_approve,
                    md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                    hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                    TD.dept_id, TD.dept_name,TD.dept_type,

                    ack_status, ack_remarks,PA.em_name as purchase_ackuser,crm_purchase_mast.create_date as ack_date,
                    quatation_calling_status,quatation_calling_remarks,quatation_calling_date,QC.em_name as quatation_user,
                    quatation_negotiation,quatation_negotiation_remarks,quatation_negotiation_date,QN.em_name as quatation_neguser,
                    quatation_fixing,quatation_fixing_remarks,quatation_fixing_date,QF.em_name as quatation_fixuser,
                    po_prepartion, po_complete,po_complete_date,PC.em_name as pocomplete_user,crm_purchase_po_details.po_to_supplier,po_to_supplier_date,
                    crm_request_master.sub_store_recieve,approval_level,crm_purchase_po_details.store_recieve,
                    user_acknldge,sub_store_name,sub_store_slno,po_number,
                    store_receive_date,CRS.em_name as crs_user,STR.em_name as store_user,substore_ack_date       
                FROM
                    crm_request_master
                    LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                    LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                    LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                    LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                    LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec                 
                    LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
                    LEFT JOIN crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
                    LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
                    LEFT JOIN crm_req_item_collect_details on crm_req_item_collect_details.req_slno=crm_request_master.req_slno
                    LEFT JOIN co_employee_master I on I.em_id=crm_request_approval.incharge_user
                    LEFT JOIN co_employee_master H on H.em_id=crm_request_approval.hod_user
                    LEFT JOIN co_employee_master D on D.em_id=crm_request_approval.dms_user
                    LEFT JOIN co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
                    LEFT JOIN co_employee_master C on C.em_id=crm_request_approval.crf_close_user
                    LEFT JOIN co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
                    LEFT JOIN co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
                    LEFT JOIN co_employee_master GM on GM.em_id=crm_request_approval.gm_user
                    LEFT JOIN co_employee_master ED on ED.em_id=crm_request_approval.ed_user
                    LEFT JOIN co_employee_master MD on MD.em_id=crm_request_approval.md_user
                    LEFT JOIN co_employee_master PA ON PA.em_id=crm_purchase_mast.create_user
                    LEFT JOIN co_employee_master QC ON QC.em_id=crm_purchase_mast.quatation_calling_user
                    LEFT JOIN co_employee_master QN On QN.em_id=crm_purchase_mast.quatation_negotiation_user
                    LEFT JOIN co_employee_master QF ON QF.em_id=crm_purchase_mast.quatation_fixing_user
                    LEFT JOIN co_employee_master PC ON PC.em_id=crm_purchase_mast.po_complete_user
                    LEFT JOIN co_employee_master CRS ON CRS.em_id=crm_purchase_mast.store_receive_user
                    LEFT JOIN co_employee_master STR ON STR.em_id=crm_req_item_collect_details.substore_user
                    LEFT JOIN co_department_mast TD on TD.dept_id=R.dept_id
                    LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
                WHERE
                    (incharge_approve=1 OR hod_approve=1) ${filterSql}
                GROUP BY crm_request_master.req_slno, crm_purchase_po_details.po_number
                ORDER BY crm_request_master.req_slno DESC`
        const queryParams = level === 8 || 17 ? [from, to] : [];
        getAllPendingApprovalsAboveHOD(sql, queryParams, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 2,
                    message: err.message
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAllHoldAndRejectItems: (req, res) => {
        const { level } = req.body;
        const sqlArray = [
            {
                val: 1, name: 'dmsitemhold', sql: `AND (dms_req = 1 OR ms_approve_req=1) AND onhold_status=1 AND crf_close is null`
            },
            {
                val: 2, name: 'dmsitemreject', sql: `AND (dms_req = 1 OR ms_approve_req=1) AND reject_status=1 AND crf_close is null`
            },
            {
                val: 3, name: 'onholditem', sql: `AND onhold_status=1 AND crf_close is null`
            },
            {
                val: 4, name: 'rejectitem', sql: ` AND reject_status=1 AND crf_close is null`
            },
        ]
        const filterSql = sqlArray.find(e => e.val === level)?.sql || '';

        const sql = `
                SELECT
                    crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                    R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                    crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                    crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                    GROUP_CONCAT(item_type_name) as category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                    total_approx_cost,user_deptsec,req_status,req_approv_slno,           
                    incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                    I.em_name as incharge_user,
                    hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
                    dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
                    ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
                    manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                    om_approv_date, OM.em_name as manag_operation_user,senior_manage_remarks,senior_manage_req, senior_manage_approv,
                    smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user,gm_approve_req, gm_approve,
                    gm_approve_remarks, gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,ed_approve_req, ed_approve,
                    ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,md_approve_req,md_approve,
                    md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                    hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                    TD.dept_id, TD.dept_name,TD.dept_type                      
                FROM
                    crm_request_master
                    LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                    LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                    LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                    LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                    LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec                 
                    LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
                    LEFT JOIN co_employee_master I on I.em_id=crm_request_approval.incharge_user
                    LEFT JOIN co_employee_master H on H.em_id=crm_request_approval.hod_user
                    LEFT JOIN co_employee_master D on D.em_id=crm_request_approval.dms_user
                    LEFT JOIN co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
                    LEFT JOIN co_employee_master C on C.em_id=crm_request_approval.crf_close_user
                    LEFT JOIN co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
                    LEFT JOIN co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
                    LEFT JOIN co_employee_master GM on GM.em_id=crm_request_approval.gm_user
                    LEFT JOIN co_employee_master ED on ED.em_id=crm_request_approval.ed_user
                    LEFT JOIN co_employee_master MD on MD.em_id=crm_request_approval.md_user
                    LEFT JOIN co_department_mast TD on TD.dept_id=R.dept_id
                WHERE
                    (incharge_approve=1 OR hod_approve=1) ${filterSql}
                GROUP BY crm_request_master.req_slno
                ORDER BY crm_request_master.req_slno DESC`

        getAllHoldAndRejectItems(sql, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 2,
                    message: err.message
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getPoList: (req, res) => {
        const body = req.body;
        getPoList(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },

    searchCrfDetails: (req, res) => {
        const body = req.body;
        searchCrfDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

}

