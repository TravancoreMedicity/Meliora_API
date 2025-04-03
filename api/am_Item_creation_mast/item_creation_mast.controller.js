const logger = require('../../logger/logger');
const { ItemcreationdeptInsert, insertItemAdditional, getInsertData, itemInactive,
    getCustdyBasedLastAssetNo, ItemcreationdeptInsertSpare, getCustdyBasedLastSpareNo,
    insertSpareItemAdditional, getInsertSpareData, itemInactiveSpare, getItemsFronList, getSpareItemsFronList
    // getSpareItemsFronList,
    // getItemsFronListonlydept, getItemsFronListdeptandsec, getSpareItemsFronListonlydept,
    // getSpareItemsFronListdeptandsec, getDataBySerialNoAsset, getdataBySerailNoSpare, getItemUsingItemUniqueNo
} = require('../am_Item_creation_mast/item_creation_mast.service')
module.exports = {
    ItemcreationdeptInsert: (req, res) => {
        const body = req.body;
        var custodian = body.map((val) => {
            return val.item_custodian_dept
        })
        var xx = custodian.find((e) => e)

        getCustdyBasedLastAssetNo(xx, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                let no = 1
                var newList = body.map((val, index) => {
                    return [val.item_creation_slno, val.item_dept_slno, val.item_deptsec_slno,
                    val.item_room_slno, val.item_subroom_slno, val.item_rack_slno, val.item_create_status,
                    val.item_custodian_dept, val.item_custodian_dept_sec, val.item_asset_no, no = no + 1, val.create_user]
                })
                ItemcreationdeptInsert(newList, (err, result) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item creation data inserted successfully"
                    })
                })
            }
            const assetno = JSON.parse(JSON.stringify(results[0]))
            let no = assetno.item_asset_no_only
            var newList = body.map((val, index) => {
                return [val.item_creation_slno, val.item_dept_slno, val.item_deptsec_slno,
                val.item_room_slno, val.item_subroom_slno, val.item_rack_slno, val.item_create_status,
                val.item_custodian_dept, val.item_custodian_dept_sec, val.item_asset_no, no = no + 1, val.create_user]
            })

            ItemcreationdeptInsert(newList, (err, result) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Item creation data inserted successfully"
                })
            })
        });
    },


    insertItemAdditional: (req, res) => {
        const body = req.body;
        getCustdyBasedLastAssetNo(body.item_custodian_dept, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            else {
                const assetno = JSON.parse(JSON.stringify(results[0]))

                let no = assetno.item_asset_no_only
                body.item_asset_no_only = no + 1
                insertItemAdditional(body, (err, result) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        insertid: result.insertId,
                        message: "Item Added successfully"
                    })
                })
            }
        })

    },

    getInsertData: (req, res) => {
        const body = req.body
        getInsertData(body, (err, results) => {
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

    itemInactive: (req, res) => {
        const body = req.body;

        itemInactive(body, (err, results) => {
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
                message: "Item Inactive successfully"
            })
        })
    },


    // getItemsFronList: (req, res) => {

    //     const { item_asset_no,
    //         item_asset_no_only,
    //         item_dept_slno,
    //         item_deptsec_slno,
    //         item_creation_slno, am_manufacture_no } = req.body

    //     let sql = `
    //        SELECT
    //        am_category_pm_days,
    //        am_asset_item_map_master.am_item_map_slno,  am_asset_item_map_master.item_creation_slno,item_dept_slno,item_deptsec_slno,
    //        co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,item_custodian_dept,
    //        am_custodian_name,am_manufacture_no,am_category.category_name,
    //        am_item_name_creation.item_name,item_asset_no,item_asset_no_only,due_date
    //        FROM           
    //       am_asset_item_map_master
    //       left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
    //       left join co_deptsec_mast on co_deptsec_mast.sec_id=am_asset_item_map_master.item_deptsec_slno
    //       left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
    //       left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
    //       left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
    //       left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
    //       left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
    //       WHERE
    //        item_create_status=1

    //     `;

    //     const queryParams = [];
    //     if (item_asset_no !== undefined && item_asset_no_only !== null) {
    //         sql += " AND item_asset_no = ? and item_asset_no_only=?"
    //         queryParams.push(item_asset_no, item_asset_no);
    //     }
    //     if (item_dept_slno !== 0) {
    //         sql += " AND item_dept_slno= ?";
    //         queryParams.push(item_dept_slno);
    //     }
    //     if (item_deptsec_slno !== 0) {
    //         sql += " AND item_deptsec_slno= ?";
    //         queryParams.push(toDate);
    //     }
    //     if (item_creation_slno) {
    //         sql += " AND item_creation_slno = ?";
    //         queryParams.push(item_creation_slno);
    //     }
    //     if (am_manufacture_no) {
    //         sql += " AND    am_manufacture_no like ? and am_asset_item_map_master.item_custodian_dept_sec=?";
    //         queryParams.push(am_manufacture_no, item_deptsec_slno);
    //     }

    //     sql += `
    //         GROUP BY 
    //            am_category_pm_days,
    //        am_asset_item_map_master.am_item_map_slno,  am_asset_item_map_master.item_creation_slno,item_dept_slno,item_deptsec_slno,
    //        co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,item_custodian_dept,
    //        am_custodian_name,am_manufacture_no,am_category.category_name,
    //        am_item_name_creation.item_name,item_asset_no,item_asset_no_only,due_date
    //         ORDER BY 
    //             am_asset_item_map_master.am_asset_item_map_master asc
    //     `;

    //     getItemsFronList(sql, queryParams, (error, results) => {
    //         if (error) {
    //             return res.status(500).json({
    //                 success: 0,
    //                 message: error.message,
    //             });
    //         }
    //         if (!results || results.length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No data found",
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results,
    //         });
    //     });
    // },

    getItemsFronList: (req, res) => {

        const { item_asset_no,
            item_asset_no_only,
            item_dept_slno,
            item_deptsec_slno,
            item_creation_slno,
            am_manufacture_no,
            custodianSlno } = req.body;

        let sql = `
           SELECT
           am_category_pm_days,
           am_asset_item_map_master.am_item_map_slno,  
           am_asset_item_map_master.item_creation_slno,
           item_dept_slno, 
           item_deptsec_slno,
           co_department_mast.dept_name as deptname,
           co_deptsec_mast.sec_name as secname,
           item_custodian_dept,
           am_custodian_name,
           am_manufacture_no,
           am_category.category_name,
           am_item_name_creation.item_name,
           item_asset_no,
           item_asset_no_only,
           due_date
           FROM am_asset_item_map_master
           LEFT JOIN co_department_mast 
               ON co_department_mast.dept_id = am_asset_item_map_master.item_dept_slno
           LEFT JOIN co_deptsec_mast 
               ON co_deptsec_mast.sec_id = am_asset_item_map_master.item_deptsec_slno
           LEFT JOIN am_item_name_creation 
               ON am_item_name_creation.item_creation_slno = am_asset_item_map_master.item_creation_slno
           LEFT JOIN am_custodian_department 
               ON am_custodian_department.am_custodian_slno = am_asset_item_map_master.item_custodian_dept
           LEFT JOIN am_item_map_amcpm_detail 
               ON am_item_map_amcpm_detail.am_item_map_slno = am_asset_item_map_master.am_item_map_slno
           LEFT JOIN am_item_map_details 
               ON am_item_map_details.am_item_map_slno = am_asset_item_map_master.am_item_map_slno
           LEFT JOIN am_category 
               ON am_category.category_slno = am_item_name_creation.item_category_slno
           WHERE item_create_status = 1   
        `;

        const queryParams = [];

        if (item_asset_no_only !== null && item_asset_no !== null) {
            sql += " AND  item_asset_no_only= ? AND item_asset_no = ?";
            queryParams.push(item_asset_no_only, item_asset_no);
        }
        if (item_dept_slno !== 0) {
            sql += " AND item_dept_slno = ?";
            queryParams.push(item_dept_slno);
        }
        if (item_deptsec_slno !== 0) {
            sql += " AND item_deptsec_slno = ?";
            queryParams.push(item_deptsec_slno);
        }
        if (item_creation_slno) {
            sql += " AND am_asset_item_map_master.item_creation_slno = ?";
            queryParams.push(item_creation_slno);
        }
        if (am_manufacture_no) {
            sql += " AND am_manufacture_no LIKE ? ";
            queryParams.push(`%${am_manufacture_no}%`);
        }
        if (custodianSlno) {
            sql += " AND am_asset_item_map_master.item_custodian_dept = ?";
            queryParams.push(custodianSlno);
        }

        sql += `
            GROUP BY 
            am_category_pm_days,
            am_asset_item_map_master.am_item_map_slno,  
            am_asset_item_map_master.item_creation_slno,
            item_dept_slno,
            item_deptsec_slno,
            co_department_mast.dept_name, 
            co_deptsec_mast.sec_name,
            item_custodian_dept,
            am_custodian_name,
            am_manufacture_no,
            am_category.category_name,
            am_item_name_creation.item_name,
            item_asset_no,
            item_asset_no_only,
            due_date
            ORDER BY am_asset_item_map_master.am_item_map_slno ASC
        `;

        getItemsFronList(sql, queryParams, (error, results) => {

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


    ItemcreationdeptInsertSpare: (req, res) => {
        const body = req.body;
        var custodian = body.map((val) => {
            return val.spare_custodian_dept
        })
        var xx = custodian.find((e) => e)

        getCustdyBasedLastSpareNo(xx, (err, results) => {

            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
                let no = 1
                var newList = body.map((val, index) => {
                    return [val.spare_creation_slno, val.spare_dept_slno, val.spare_deptsec_slno,
                    val.spare_room_slno, val.spare_subroom_slno, val.spare_rack_slno, val.spare_create_status,
                    val.spare_custodian_dept, val.spare_custodian_dept_sec, val.spare_asset_no, no = no + 1, val.create_user]
                })

                ItemcreationdeptInsertSpare(newList, (err, result) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item creation data inserted successfully"
                    })
                })
            }
            const assetno = JSON.parse(JSON.stringify(results[0]))
            let no = assetno.spare_asset_no_only === undefined ? 0 : assetno.spare_asset_no_only
            var newList = body.map((val, index) => {
                return [val.spare_creation_slno, val.spare_dept_slno, val.spare_deptsec_slno,
                val.spare_room_slno, val.spare_subroom_slno, val.spare_rack_slno, val.spare_create_status,
                val.spare_custodian_dept, val.spare_custodian_dept_sec, val.spare_asset_no, no = no + 1, val.create_user]
            })
            ItemcreationdeptInsertSpare(newList, (err, result) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Item creation data inserted successfully"
                })
            })
        });
    },

    insertSpareItemAdditional: (req, res) => {
        const body = req.body;
        getCustdyBasedLastSpareNo(body.spare_custodian_dept, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            else {
                const assetno = JSON.parse(JSON.stringify(results[0]))

                let no = assetno.spare_asset_no_only
                body.spare_asset_no_only = no + 1
                insertSpareItemAdditional(body, (err, result) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        insertid: result.insertId,
                        message: "Item Added successfully"
                    })
                })
            }
        })

    },
    getInsertSpareData: (req, res) => {
        const body = req.body
        getInsertSpareData(body, (err, results) => {
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

    itemInactiveSpare: (req, res) => {
        const body = req.body;

        itemInactiveSpare(body, (err, results) => {
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
                message: "Item Inactive successfully"
            })
        })
    },

    // getSpareItemsFronList: (req, res) => {
    //     const body = req.body

    //     const dept = body.spare_dept_slno
    //     const deptsec = body.spare_deptsec_slno
    //     const itemslno = body.spare_creation_slno

    //     if (dept !== 0 && (deptsec === undefined || deptsec === 0) && (itemslno === undefined || itemslno === 0)) {
    //         getSpareItemsFronListonlydept(body, (err, results) => {
    //             if (err) {
    //                 logger.logwindow(err)
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: err
    //                 });
    //             }

    //             if (results.length == 0) {
    //                 logger.infologwindow("No Results Found")
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: "No Record Found"
    //                 });
    //             }

    //             return res.status(200).json({
    //                 success: 1,
    //                 data: results
    //             });
    //         })
    //     }
    //     else if (dept !== 0 && deptsec !== undefined && (itemslno === undefined || itemslno === 0)) {
    //         getSpareItemsFronListdeptandsec(body, (err, results) => {
    //             if (err) {
    //                 logger.logwindow(err)
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: err
    //                 });
    //             }

    //             if (results.length == 0) {
    //                 logger.infologwindow("No Results Found")
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: "No Record Found"
    //                 });
    //             }

    //             return res.status(200).json({
    //                 success: 1,
    //                 data: results
    //             });
    //         })
    //     }
    //     else {
    //         getSpareItemsFronList(body, (err, results) => {
    //             if (err) {
    //                 logger.logwindow(err)
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: err
    //                 });
    //             }

    //             if (results.length == 0) {
    //                 logger.infologwindow("No Results Found")
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: "No Record Found"
    //                 });
    //             }

    //             return res.status(200).json({
    //                 success: 1,
    //                 data: results
    //             });
    //         })
    //     }

    // },




    getDataBySerialNoAsset: (req, res) => {
        const body = req.body
        getDataBySerialNoAsset(body, (err, results) => {
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
    getdataBySerailNoSpare: (req, res) => {
        const body = req.body
        getdataBySerailNoSpare(body, (err, results) => {
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


    getSpareItemsFronList: (req, res) => {

        const { spare_asset_no,
            spare_asset_no_only,
            spare_dept_slno,
            spare_deptsec_slno,
            spare_creation_slno,
            am_manufacture_no,
            custodianSlno } = req.body;

        let sql = `
            SELECT
           am_category_pm_days,
           am_spare_item_map_master.am_spare_item_map_slno,  am_spare_item_map_master.spare_creation_slno,spare_dept_slno,spare_deptsec_slno,
           co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,spare_custodian_dept,
           am_custodian_name,am_category.category_name,am_manufacture_no,
           am_item_name_creation.item_name,spare_asset_no,spare_asset_no_only,due_date
           FROM
           am_spare_item_map_master
           left join co_department_mast on co_department_mast.dept_id=am_spare_item_map_master.spare_dept_slno
           left join co_deptsec_mast on co_deptsec_mast.sec_id=am_spare_item_map_master.spare_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
           left join am_custodian_department on am_custodian_department.am_custodian_slno=am_spare_item_map_master.spare_custodian_dept
           left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_spare_item_map_master.am_spare_item_map_slno
           left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
           left join am_item_map_details on am_item_map_details.am_spare_item_map_slno=am_spare_item_map_master.am_spare_item_map_slno
           WHERE
           spare_create_status=1      
           
        `;

        const queryParams = [];

        if (spare_asset_no_only !== null && spare_asset_no !== null) {
            sql += " AND  spare_asset_no_only= ? AND spare_asset_no = ?";
            queryParams.push(spare_asset_no_only, spare_asset_no);
        }
        if (spare_dept_slno !== 0) {
            sql += " AND spare_dept_slno = ?";
            queryParams.push(spare_dept_slno);
        }
        if (spare_deptsec_slno !== 0) {
            sql += " AND spare_deptsec_slno = ?";
            queryParams.push(spare_deptsec_slno);
        }
        if (spare_creation_slno) {
            sql += " AND am_spare_item_map_master.spare_creation_slno = ?";
            queryParams.push(spare_creation_slno);
        }
        if (am_manufacture_no) {
            sql += " AND am_manufacture_no LIKE ? ";
            queryParams.push(`%${am_manufacture_no}%`);
        }
        if (custodianSlno) {
            sql += " AND am_spare_item_map_master.spare_custodian_dept = ?";
            queryParams.push(custodianSlno);
        }

        sql += `
            GROUP BY
            am_category_pm_days,
            am_spare_item_map_master.am_spare_item_map_slno,  
            am_spare_item_map_master.spare_creation_slno,
            spare_dept_slno,
            spare_deptsec_slno,
            co_department_mast.dept_name,
            co_deptsec_mast.sec_name,
            spare_custodian_dept,
            am_custodian_name,
            am_category.category_name,
            am_manufacture_no,
            am_item_name_creation.item_name,
            spare_asset_no,
            spare_asset_no_only,
            due_date
            ORDER BY am_spare_item_map_master.am_spare_item_map_slno DESC
            
            `;

        getSpareItemsFronList(sql, queryParams, (error, results) => {

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
}