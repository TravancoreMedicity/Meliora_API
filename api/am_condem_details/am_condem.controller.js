const { pool } = require('../../config/database');
const { insertCondemMasterData, insertCondemDetailData, UpdateItemDetails, getItemDetails, getItemSlno, updateCondemMasterData, getpendingApprovals, getItemUnderForm,
    updateScarpStoreData, getAllpendingApprovals, getCondemnationList, getDeptCondemnationList, UpdateAssetStatus, UpdateSpareStatus, getDeptScrapStore
} = require('./am_condem.service')
module.exports = {


    insertCondemMasterData: (req, res) => {
        const body = req.body;
        insertCondemMasterData(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            } else {
                const condem_mast_slno = result.insertId;
                const details = body.deatilData.map((item) => ({
                    condem_mast_slno: condem_mast_slno,
                    am_asset_item_slno: item.type === 'asset' ? item.am_item_map_slno : null,
                    am_spare_item_slno: item.type === 'spare' ? item.am_spare_item_map_slno : null,
                    item_status: 1
                }));
                Promise.all(details.map((postdata) => {
                    return new Promise((resolve, reject) => {
                        insertCondemDetailData(postdata, (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    });
                }))
                    .then(() => {
                        return res.status(200).json({
                            success: 1,
                            condem_mast_slno: condem_mast_slno
                        });
                    })
                    .catch((error) => {
                        return res.status(200).json({
                            success: 0,
                            message: error
                        });
                    });
            }
        });
    },

    UpdateItemDetails: (req, res) => {
        const body = req.body;
        UpdateItemDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Details Added Successfully",
            })
        })
    },

    UpdateAssetStatus: (req, res) => {
        const { assetItems } = req.body;

        if (!assetItems || assetItems.length === 0) {
            return res.status(400).json({ success: 0, });
        }
        const newList = assetItems.map((item) => [
            item.submited_condemnation,
            item.am_item_map_slno
        ]);

        UpdateAssetStatus(newList, (err, results) => {
            if (err) {
                return res.status(500).json({ success: 0, error: err });
            }
            return res.status(200).json({
                success: 1,
                results
            });
        });
    },


    UpdateSpareStatus: (req, res) => {
        const { spareItems } = req.body;

        if (!spareItems || spareItems.length === 0) {
            return res.status(400).json({ success: 0, });
        }
        const newList = spareItems.map((item) => [
            item.submited_condemnation,
            item.am_spare_item_map_slno
        ]);

        UpdateSpareStatus(newList, (err, results) => {
            if (err) {
                return res.status(500).json({ success: 0, error: err });
            }

            return res.status(200).json({
                success: 1,
                results
            });
        });
    },




    updateCondemMasterData: (req, res) => {
        const body = req.body;
        updateCondemMasterData(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in Form Submittion"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Form Submitted Succesfully",
            })
        })
    },

    updateScarpStoreData: (req, res) => {
        const body = req.body;
        updateScarpStoreData(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Unable to Update"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Item Added to ScrapStore",
            })
        })
    },

    getItemDetails: (req, res) => {
        const body = req.body;
        getItemDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getpendingApprovals: (req, res) => {
        const body = req.body;
        getpendingApprovals(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllpendingApprovals: (req, res) => {
        const body = req.body;
        getAllpendingApprovals(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getItemUnderForm: (req, res) => {
        const body = req.body;
        getItemUnderForm(body, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },


    getItemSlno: (req, res) => {
        const body = req.body;
        getItemSlno(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    ApproveData: (req, res) => {
        const data = req.body;

        if (!data.condem_mast_slno) {
            return res.status(400).json({ error: "Missing condem_mast_slno" });
        }
        let sql = "UPDATE am_condemnation_master SET";
        const queryParams = [];
        const fieldsToUpdate = [];
        Object.keys(data).forEach((key) => {
            if (key !== "condem_mast_slno" && data[key] !== undefined) {
                fieldsToUpdate.push(`${key} = ?`);
                queryParams.push(data[key]);
            }
        });
        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }
        sql += ` ${fieldsToUpdate.join(", ")} WHERE condem_mast_slno = ?`;
        queryParams.push(data.condem_mast_slno);
        pool.query(sql, queryParams, (error, results) => {
            if (error) {
                return res.status(500).json({ success: 2, error: "Database query failed" });
            }
            return res.status(200).json({ success: 1, message: "Update successful", results });
        });
    },

    getCondemnationList: (req, res) => {

        const { SatusFrom, StatusTo, fromDate, toDate, } = req.body;
        let sql = `
            SELECT
             am_condemnation_master.condem_mast_slno,
            inch_emp.em_name as incharge_employee,
            hod_emp.em_name as hod_employee,
            gm_emp.em_name as gm_opr_employee,
            ac_emp.em_name as accounts_employee,
            mm_emp.em_name as material_mangm_employee,
            st_emp.em_name as store_approve_employee,   
            inch_apprv_reject_date,
            hod_apprv_reject_date,
            gm_apprv_reject_date,
            acc_apprv_reject_date,
            material_mange_apprv_reject_date,
            condem_form_prefix,
            condem_form_no,
            am_condem_reason,
            reg_date, 
            store_approve_status,          
            store_approve_remarks,
            req_dept, 
            condem_status, 
            incharge_approve_status, 
            incharge_remarks, 
            hod_approve_status, 
            hod_remarks, 
            gm_approve_status, 
            gm_approve_remarks, 
            acc_approve_status, 
            acc_approve_remarks,
            store_approve_reject_date,
            material_mangmnt_mangr_apprv_status, 
            material_mangmnt_mangr_apprv_remark, 
            COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
            COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
            FROM am_condemnation_master
            LEFT JOIN am_condemnation_details 
            ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno
            left join co_employee_master inch_emp on inch_emp.em_id=am_condemnation_master.inch_emp
            left join co_employee_master hod_emp on hod_emp.em_id=am_condemnation_master.hod_emp
            left join co_employee_master gm_emp on gm_emp.em_id=am_condemnation_master.gm_emp
            left join co_employee_master ac_emp on ac_emp.em_id=am_condemnation_master.acc_emp
            left join co_employee_master mm_emp on mm_emp.em_id=am_condemnation_master.material_mang_emp
            left join co_employee_master st_emp on st_emp.em_id=am_condemnation_master.store_approve_emp
            WHERE `;

        const queryParams = [];

        if (SatusFrom) {
            sql += "  condem_status < ?";
            queryParams.push(SatusFrom);
        }
        if (StatusTo) {
            sql += " AND condem_status > ?";
            queryParams.push(StatusTo);
        }
        if (fromDate) {
            sql += " And am_condemnation_master.reg_date >= ?";
            queryParams.push(fromDate);
        }
        if (toDate) {
            sql += " AND am_condemnation_master.reg_date <= ?";
            queryParams.push(toDate);
        }

        sql += `
            GROUP BY 
            am_condemnation_master.condem_mast_slno, condem_form_prefix, condem_form_no, 
            reg_date, req_dept, condem_status, incharge_approve_status, incharge_remarks, 
            hod_approve_status, hod_remarks, gm_approve_status, gm_approve_remarks, 
            acc_approve_status, acc_approve_remarks, material_mangmnt_mangr_apprv_status, 
            material_mangmnt_mangr_apprv_remark,am_condemnation_master.create_user
            order by condem_status asc
            `;

        getCondemnationList(sql, queryParams, (error, results) => {

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


    getDeptCondemnationList: (req, res) => {
        const { SatusFrom, StatusTo, fromDate, toDate, req_dept } = req.body;

        let sql = `
            SELECT
             am_condemnation_master.condem_mast_slno,
            inch_emp.em_name as incharge_employee,
            hod_emp.em_name as hod_employee,
            gm_emp.em_name as gm_opr_employee,
            ac_emp.em_name as accounts_employee,
            mm_emp.em_name as material_mangm_employee,
            st_emp.em_name as store_approve_employee,   
            inch_apprv_reject_date,
            hod_apprv_reject_date,
            gm_apprv_reject_date,
            acc_apprv_reject_date,
            material_mange_apprv_reject_date,
            condem_form_prefix,
            condem_form_no,
            am_condem_reason,
            reg_date, 
            store_approve_status,          
            store_approve_remarks,
            req_dept, 
            condem_status, 
            incharge_approve_status, 
            incharge_remarks, 
            hod_approve_status, 
            hod_remarks, 
            gm_approve_status, 
            gm_approve_remarks, 
            acc_approve_status, 
            acc_approve_remarks,
            store_approve_reject_date,
            material_mangmnt_mangr_apprv_status, 
            material_mangmnt_mangr_apprv_remark, 
            am_condemnation_master.create_user,
            COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
            COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
            FROM am_condemnation_master
            LEFT JOIN am_condemnation_details 
            ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno
            left join co_employee_master inch_emp on inch_emp.em_id=am_condemnation_master.inch_emp
            left join co_employee_master hod_emp on hod_emp.em_id=am_condemnation_master.hod_emp
            left join co_employee_master gm_emp on gm_emp.em_id=am_condemnation_master.gm_emp
            left join co_employee_master ac_emp on ac_emp.em_id=am_condemnation_master.acc_emp
            left join co_employee_master mm_emp on mm_emp.em_id=am_condemnation_master.material_mang_emp
            left join co_employee_master st_emp on st_emp.em_id=am_condemnation_master.store_approve_emp
            WHERE `;

        const queryParams = [];

        if (SatusFrom) {
            sql += "  condem_status < ?";
            queryParams.push(SatusFrom);
        }
        if (StatusTo) {
            sql += " AND condem_status >= ?";
            queryParams.push(StatusTo);
        }
        if (req_dept) {
            sql += " AND req_dept = ?";
            queryParams.push(req_dept);
        }
        if (fromDate) {
            sql += " And am_condemnation_master.reg_date >= ?";
            queryParams.push(fromDate);
        }
        if (toDate) {
            sql += " AND am_condemnation_master.reg_date <= ?";
            queryParams.push(toDate);
        }
        sql += `
            GROUP BY 
            am_condemnation_master.condem_mast_slno, condem_form_prefix, condem_form_no, 
            reg_date, req_dept, condem_status, incharge_approve_status, incharge_remarks, 
            hod_approve_status, hod_remarks, gm_approve_status, gm_approve_remarks, 
            acc_approve_status, acc_approve_remarks, material_mangmnt_mangr_apprv_status, 
            material_mangmnt_mangr_apprv_remark,am_condemnation_master.create_user
            order by condem_status asc
            `;

        getDeptCondemnationList(sql, queryParams, (error, results) => {

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

    getDeptScrapStore: (req, res) => {
        const body = req.body;
        getDeptScrapStore(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
}

