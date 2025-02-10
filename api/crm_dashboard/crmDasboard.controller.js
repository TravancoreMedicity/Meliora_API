const { getAllListDashboard, getApprvPendingDashboard, getAprvlDetailsView, getCRFPurchaseDashboard, gePurchaseDetails,
    getPurchaseApprvlView, getCrfStoreDetailsDashborad, getCRFStoreDetails, getStoreApprvlViewCRF,
    getDeliveryMarkingDetails, getAllPoDetails, getAllItemDetails, getStoreAckDetails, getUserAckDetails, getCompletedCRF
} = require('./crmDasboard.service');
// const { validateCRMRequestRegister } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');

module.exports = {
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
                 AND senior_manage_approv is null AND  gm_approve is null AND ed_approve is null AND md_approve is null`
            },
            {
                val: 5, name: 'smopending', sql: `AND (incharge_approve=1 OR hod_approve=1) AND senior_manage_approv is null
                 AND gm_approve is null AND ed_approve is null AND md_approve is null`
            },
            {
                val: 6, name: 'gmpending', sql: `AND (incharge_approve=1 OR hod_approve=1) AND gm_approve is null AND
                 ed_approve is null AND md_approve is null`
            },
            {
                val: 7, name: 'mdpending', sql: `AND (incharge_approve=1 OR hod_approve=1) AND md_approve is null`
            },
            {
                val: 8, name: 'edpending', sql: `AND (incharge_approve=1 OR hod_approve=1) AND ed_approve is null`
            },
            {
                val: 9, name: 'managepending', sql: `AND (incharge_approve=1 OR hod_approve=1) AND managing_director_approve is null`
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
                      managing_director_req, managing_director_approve,TD.dept_id, TD.dept_name
   
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
                val: 5, name: 'popreppending', sql: ` AND ack_status = 1 AND ((po_prepartion = 1 AND po_complete = 0)
                OR (quatation_calling_status = 1 AND quatation_fixing = 1 AND po_prepartion = 0))`
            },
            {
                val: 6, name: 'apprvl1', sql: `AND po_complete = 1 AND approval_level IS NULL `
            },
            {
                val: 7, name: 'apprvl2', sql: `AND po_complete = 1 AND approval_level = 1 `
            },
            {
                val: 8, name: 'apprvl3', sql: `AND po_complete = 1 AND approval_level = 2 `
            },
            {
                val: 9, name: 'posup', sql: `AND po_complete = 1 AND crm_purchase_po_details.po_to_supplier = 0 AND approval_level = 3 `
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
}