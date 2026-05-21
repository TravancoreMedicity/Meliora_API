const { pool } = require('../../config/database')
module.exports = {
    getCRSStorePending: (callBack) => {
        pool.query(
            `SELECT 
		          crm_purchase_po_details.po_detail_slno,crm_purchase_po_details.req_slno,crm_purchase_po_details.po_number,
		          po_date,po_to_supplier_date,supplier_code,supplier_name,expected_delivery,crs_store_code,main_store,
                  sub_store_name,sub_store_slno,store_recieve,item_code,item_name,item_qty,item_receive_status,grn_qnty,
                  received_qnty,crm_purchase_po_details.crm_purchase_slno,crm_store_grn_details.grn_no
            FROM 
		          crm_purchase_po_details
               LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_purchase_po_details.req_slno
               LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
               LEFT JOIN crm_purchase_item_details ON crm_purchase_item_details.po_detail_slno=crm_purchase_po_details.po_detail_slno
               LEFT JOIN crm_purchase_mast ON crm_purchase_mast.crm_purchase_slno=crm_purchase_po_details.crm_purchase_slno
               LEFT JOIN crm_store_grn_details ON ( crm_store_grn_details.po_number=crm_purchase_po_details.po_number and crm_store_grn_details.store_code=crm_store_master.crs_store_code)
            WHERE
		          crm_purchase_po_details.po_to_supplier = 1 AND user_acknldge is null AND po_status = 1
                  AND (crm_purchase_po_details.store_recieve = 0 OR crm_purchase_po_details.store_recieve IS NULL)
				  GROUP BY crm_purchase_po_details.po_detail_slno,crm_purchase_item_details.po_itm_slno
				  ORDER BY crm_purchase_po_details.req_slno DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getCrsReceiveAllList: (callBack) => {
        pool.query(
            `SELECT
                   crm_purchase_po_details.po_detail_slno,crm_purchase_po_details.req_slno,crm_purchase_po_details.po_number,
		           po_date,po_to_supplier_date,supplier_code,supplier_name,expected_delivery,crs_store_code,main_store,
                   sub_store_name,sub_store_slno,store_recieve,item_code,item_name,item_qty,item_receive_status,grn_qnty,
                   received_qnty,crm_purchase_po_details.crm_purchase_slno,crm_store_grn_details.grn_no,
                   crm_purchase_mast.store_receive as fully_receive
			 FROM 
                   crm_purchase_po_details
                LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_purchase_po_details.req_slno
		        LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
                LEFT JOIN crm_purchase_item_details ON crm_purchase_item_details.po_detail_slno=crm_purchase_po_details.po_detail_slno
                LEFT JOIN crm_purchase_mast ON crm_purchase_mast.crm_purchase_slno=crm_purchase_po_details.crm_purchase_slno
                LEFT JOIN crm_store_grn_details ON ( crm_store_grn_details.po_number=crm_purchase_po_details.po_number and crm_store_grn_details.store_code=crm_store_master.crs_store_code)
             WHERE
				   crm_purchase_po_details.po_to_supplier=1 AND crm_purchase_po_details.store_recieve = 1
                   AND user_acknldge is null AND po_status=1
             GROUP BY crm_purchase_po_details.po_detail_slno,crm_purchase_item_details.po_itm_slno
             ORDER BY crm_purchase_po_details.req_slno DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    searchPendingStore: (data, callBack) => {
        pool.query(
            `SELECT
                  crm_purchase_po_details.po_detail_slno,crm_purchase_po_details.req_slno,crm_purchase_po_details.po_number,
		          po_date,po_to_supplier_date,supplier_code,supplier_name,expected_delivery,crs_store_code,main_store,
                  sub_store_name,sub_store_slno,store_recieve,item_code,item_name, item_qty,item_receive_status,grn_qnty,received_qnty,
                  crm_purchase_po_details.crm_purchase_slno,crm_store_grn_details.grn_no
			 FROM 
                  crm_purchase_po_details
                LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_purchase_po_details.req_slno
		        LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
                LEFT JOIN crm_purchase_item_details ON crm_purchase_item_details.po_detail_slno=crm_purchase_po_details.po_detail_slno
                LEFT JOIN crm_purchase_mast ON crm_purchase_mast.crm_purchase_slno=crm_purchase_po_details.crm_purchase_slno
                LEFT JOIN crm_store_grn_details ON ( crm_store_grn_details.po_number=crm_purchase_po_details.po_number and crm_store_grn_details.store_code=crm_store_master.crs_store_code)
             WHERE
				  crm_purchase_po_details.po_to_supplier=1 AND user_acknldge is null AND po_status=1
                 AND (crm_purchase_po_details.store_recieve = 0 OR crm_purchase_po_details.store_recieve IS NULL)
                 AND supplier_name like ?
                 AND crm_purchase_po_details.req_slno like ?
                 AND crm_purchase_po_details.po_number like ?
               ORDER BY crm_purchase_po_details.req_slno DESC`,
            [
                '%' + data.supplier_name + '%',
                '%' + data.req_slno + '%',
                '%' + data.po_number + '%'
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    searchReceivedDetails: (data, callBack) => {
        pool.query(
            `SELECT
                   crm_purchase_po_details.po_detail_slno,crm_purchase_po_details.req_slno,crm_purchase_po_details.po_number,
		           po_date,po_to_supplier_date,supplier_code,supplier_name,expected_delivery,crs_store_code,main_store,
                   sub_store_name,sub_store_slno,store_recieve,item_code,item_name,item_qty,item_receive_status,grn_qnty,
                   received_qnty,crm_purchase_po_details.crm_purchase_slno,crm_store_grn_details.grn_no,
                    crm_purchase_mast.store_receive as fully_receive
			 FROM 
                  crm_purchase_po_details
                LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_purchase_po_details.req_slno
		        LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
                LEFT JOIN crm_purchase_item_details ON crm_purchase_item_details.po_detail_slno=crm_purchase_po_details.po_detail_slno
                LEFT JOIN crm_purchase_mast ON crm_purchase_mast.crm_purchase_slno=crm_purchase_po_details.crm_purchase_slno
                LEFT JOIN crm_store_grn_details ON ( crm_store_grn_details.po_number=crm_purchase_po_details.po_number and crm_store_grn_details.store_code=crm_store_master.crs_store_code)
             WHERE
             	  crm_purchase_po_details.po_to_supplier=1 AND user_acknldge is null AND po_status=1
                  AND crm_purchase_po_details.store_recieve = 1
                  AND supplier_name like ?
                  AND crm_purchase_po_details.req_slno like ?
                  AND crm_purchase_po_details.po_number like ?
              ORDER BY crm_purchase_po_details.req_slno DESC`,
            [
                '%' + data.supplier_name + '%',
                '%' + data.req_slno + '%',
                '%' + data.po_number + '%'
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getPendingGrnPo: (callBack) => {
        pool.query(
            ` SELECT  
                    req_slno,crm_purchase_po_details.po_detail_slno,crm_purchase_po_details.po_number,crs_store_code,
                    crm_purchase_item_details.item_code,crm_purchase_po_details.crm_purchase_slno
              FROM
                    crm_purchase_po_details
              LEFT JOIN  crm_purchase_item_details ON crm_purchase_item_details.po_detail_slno=crm_purchase_po_details.po_detail_slno 
              LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno  
             WHERE 
                    crm_purchase_po_details.po_to_supplier=1 AND po_status=1
                    AND (crm_purchase_po_details.store_recieve = 0 OR crm_purchase_po_details.store_recieve IS NULL)`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    existCheck: (data, callBack) => {
        const poNumbers = data?.map(d => d.pono);
        const storeCodes = data?.map(d => d.stcode);
        pool.query(
            `SELECT 
                grn_slno,store_code,po_number
            FROM
                crm_store_grn_details
            WHERE
                po_number IN (?) AND store_code IN (?)`,
            [poNumbers, storeCodes],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },
    grnDetailsInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crm_store_grn_details
            ( 
              store_code,po_number,grn_no,create_user
            )
            VALUES ? `,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    grnDetailsUpdate: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                          crm_store_grn_details
                     SET
                          grn_no=?,
                          edit_user=?
                    where
                          grn_slno=?`,
                    [
                        JSON.stringify(val.grn_no),
                        val.edit_user,
                        val.grn_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    // updateGrnItemQnty: (body) => {
    //     return Promise.all(body.map((val) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `UPDATE
    //                      crm_purchase_item_details
    //                  SET
    //                      grn_qnty = ?, received_qnty = ?, item_receive_status= ?
    //                 where
    //                      po_detail_slno = ? and item_code = ?`,
    //                 [
    //                     val.grn_qnty,
    //                     val.received_qnty,
    //                     val.item_receive_status,
    //                     val.po_detail_slno,
    //                     val.item_code
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         return reject(error)
    //                     }
    //                     return resolve(results)
    //                 }
    //             )
    //         })
    //     })
    //     )
    // },

    updateGrnItemQnty: async (body) => {
        for (const val of body) {
            const query = `
            UPDATE crm_purchase_item_details
            SET
                grn_qnty = ?,
                received_qnty = ?,
                item_receive_status = ?
            WHERE
                po_detail_slno = ? AND item_code = ?
        `;

            const params = [
                val.grn_qnty,
                val.received_qnty,
                val.item_receive_status,
                val.po_detail_slno,
                val.item_code
            ];

            await pool.query(query, params);
        }
    },
    getPOItemDetails: (data, callBack) => {
        const poSlno = data?.map(d => d.poSlno);
        pool.query(
            ` SELECT
                   crm_purchase_po_details.req_slno,po_itm_slno, crm_purchase_item_details.po_detail_slno, item_code,
                    item_name, item_qty,item_receive_status,grn_qnty,received_qnty
              FROM
                    crm_purchase_item_details
              LEFT JOIN crm_purchase_po_details ON crm_purchase_po_details.po_detail_slno=crm_purchase_item_details.po_detail_slno
              WHERE
                    crm_purchase_item_details.po_detail_slno in (?) AND po_status=1`,
            [poSlno],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    UpdateStoreReceive: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                         crm_purchase_po_details
                     SET
                         store_recieve = ?,sub_store_recieve = ?
                    where
                         po_detail_slno in (?)`,
                    [
                        val.store_recieve,
                        val.sub_store_recieve,
                        val.po_detail_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    UpdatePurchasePoReceive: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                         crm_purchase_mast
                     SET
                         store_receive = ?,
                         store_receive_user=?,
                         store_receive_date=?  
                    where
                         crm_purchase_slno =? and po_complete=1`,
                    [
                        val.store_receive,
                        val.store_receive_user,
                        val.store_receive_date,
                        val.crm_purchase_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    getStoreList: (callBack) => {
        pool.query(
            `SELECT 
                   crm_store_master_slno,sub_store_name,store_code, main_store_slno,crs_store_code,main_store
            FROM
                   crm_store_master
            WHERE
                   main_store_slno is not null
            ORDER BY
                   main_store_slno`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    // substore
    getCRFDataForSubstore: (callBack) => {
        pool.query(
            ` SELECT 
                    crm_purchase_po_details.po_detail_slno,crm_purchase_po_details.req_slno,
                    crm_request_master.create_date as req_date,CR.em_name as create_user,
                    R.sec_name as req_deptsec,U.sec_name as user_deptsection,crm_request_master.location,
                    crm_purchase_po_details.po_number,crm_purchase_po_details.po_date,supply_store,
                    CS.crs_store_code,CS.main_store,CS.sub_store_name,sub_store_slno,crm_store_grn_details.grn_no,
                    supplier_name,po_delivery,expected_delivery,crm_purchase_po_details.crm_purchase_slno
              FROM
	                crm_purchase_po_details
                 LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_purchase_po_details.req_slno
                 LEFT JOIN crm_purchase_mast ON crm_purchase_mast.crm_purchase_slno=crm_purchase_po_details.crm_purchase_slno
	             LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
                 LEFT JOIN co_deptsec_mast R ON R.sec_id=crm_request_master.request_deptsec_slno
                 LEFT JOIN co_deptsec_mast U ON U.sec_id=crm_request_master.user_deptsec
                 LEFT JOIN crm_store_master CS ON CS.crm_store_master_slno=crm_purchase_po_details.sub_store_slno
                 LEFT JOIN crm_store_grn_details ON (crm_store_grn_details.po_number=crm_purchase_po_details.po_number and
                    crm_store_grn_details.store_code=CS.crs_store_code)
              WHERE
                     crm_purchase_po_details.po_to_supplier=1 AND po_status=1
                     AND (crm_purchase_po_details.store_recieve = 0 OR crm_purchase_po_details.store_recieve =1)
		             AND crm_request_master.user_acknldge is null 
              ORDER BY
                     crm_purchase_po_details.req_slno DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getCRFDetails: (id, callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,actual_requirement,needed,category,location,expected_date,emergency_flag,
                   crm_emergencytype_mast.emer_type_name,emergeny_remarks,crm_request_master.create_user,item_slno,
                   item_desc,item_brand,item_unit,R.uom_name as Req_UnitName,item_qnty,item_specification,aprox_cost,item_status,
                   item_unit_price,item_status_approved,
                   approve_item_desc, approve_item_brand, approve_item_unit, item_qnty_approved,AP.uom_name as AP_UnitName,
                   approve_item_unit_price, approve_aprox_cost,item_add_higher,approve_item_status,approve_item_specification
             FROM   
                   crm_request_master
                 LEFT JOIN crm_request_mast_detail ON crm_request_mast_detail.req_slno=crm_request_master.req_slno
                 LEFT JOIN crm_emergencytype_mast ON crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
	             LEFT JOIN am_uom R ON R.uom_slno=crm_request_mast_detail.item_unit
                 LEFT JOIN am_uom AP ON AP.uom_slno=crm_request_mast_detail.item_unit
             WHERE  
                    user_acknldge IS NULL 
                   AND crm_request_master.req_slno=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    crfReqItemStoreAcknow: (data, callback) => {
        pool.query(
            `INSERT INTO crm_req_item_collect_details
          ( 
             req_slno, po_detail_slno, substore_slno, substore_remarks, substore_user,
             substore_ack_date, create_user
          )
          VALUES(?,?,?,?,?,?,?)`,
            [
                data.req_slno,
                JSON.stringify(data.po_detail_slno),
                data.substore_slno,
                data.substore_remarks,
                data.substore_user,
                data.substore_ack_date,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    StoreToUserAcknowledgement: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_purchase_po_details
             SET         
                    sub_store_recieve=1         
             WHERE
                   po_detail_slno in (?) AND po_status=1`,
            [
                data.po_detail_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    UpdateCrfAck: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_master
             SET         
                   sub_store_recieve = 1         
             WHERE
                   req_slno =?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUserInfoDetails: (data, callBack) => {
        pool.query(
            `SELECT 
                   collect_slno,req_slno,po_detail_slno,substore_slno,sub_store_name,substore_remarks,SUB.em_name as store_user,
                   substore_ack_date,received_user_remarks,U.em_name as receive_user,received_date,received_status
             FROM
                   crm_req_item_collect_details
                 LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_req_item_collect_details.substore_slno
                 LEFT JOIN co_employee_master SUB on SUB.em_id=crm_req_item_collect_details.substore_user
                 LEFT JOIN co_employee_master U on U.em_id=crm_req_item_collect_details.received_user
             WHERE  
                  req_slno = ? AND substore_slno = ?`,
            [
                data.req_slno,
                data.substore_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateStoreAcknow: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_req_item_collect_details
             SET         
                   substore_slno = ?,
                   substore_remarks = ?,
                   edit_user=?             
             WHERE
                   collect_slno = ?`,
            [
                data.substore_slno,
                data.substore_remarks,
                data.edit_user,
                data.collect_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getUserAckDetails: (id, callBack) => {
        pool.query(
            `SELECT 
                   collect_slno,req_slno,po_detail_slno,substore_slno,sub_store_name,substore_remarks,SUB.em_name as store_user,
                   substore_ack_date,received_user_remarks,U.em_name as receive_user,received_date,received_status
             FROM
                   crm_req_item_collect_details
                 LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_req_item_collect_details.substore_slno
                 LEFT JOIN co_employee_master SUB on SUB.em_id=crm_req_item_collect_details.substore_user
                 LEFT JOIN co_employee_master U on U.em_id=crm_req_item_collect_details.received_user
             WHERE  
                  req_slno=?`,
            [
                id

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateUserReply: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_req_item_collect_details
             SET         
                   received_user_remarks = ?,
                   received_user = ?,
                   received_date=? ,
                   received_status=1            
             WHERE
                   collect_slno = ?`,
            [
                data.received_user_remarks,
                data.received_user,
                data.received_date,
                data.collect_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getReqItemForCRFView: (id, callBack) => {
        pool.query(
            `SELECT
                    crm_purchase_po_details.req_slno,crm_purchase_item_details.po_itm_slno,
                    crm_purchase_item_details.po_detail_slno,item_code,item_name, item_qty,
                    item_receive_status,grn_qnty,received_qnty,user_received_status,store_recieve,return_status
             FROM
                    crm_purchase_item_details
                 LEFT JOIN crm_purchase_po_details ON crm_purchase_po_details.po_detail_slno=crm_purchase_item_details.po_detail_slno
                 LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_purchase_po_details.req_slno
                 LEFT JOIN crm_item_return_to_store_details ON crm_item_return_to_store_details.po_itm_slno=crm_purchase_item_details.po_itm_slno
             WHERE  
                   crm_request_master.req_slno=? AND po_status=1`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


}