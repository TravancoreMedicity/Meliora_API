const { pool } = require('../../config/database');
const { insertCondemMasterData, insertCondemDetailData, UpdateItemDetails, getItemDetails, getItemSlno, updateCondemMasterData, getpendingApprovals, getItemUnderForm,
    updateScarpStoreData, getAllpendingApprovals, getCondemnationList,  UpdateAssetStatus, UpdateSpareStatus, getDeptScrapStore,
    getScrapNotUnderCategorization,getAddedScrapNotUnderCategorization,getInsertNewItemUnderCondemnation, UpdateScrapCategorize,UpdateItemScrapCategorize,
    getcondemdAssetCategoryWiseDashboard,ViewCategorizedItems,ViewCategorizedAddedItems, getSelectedSupplierRateDetails, submitScrapForm, ScrapCategoryQuantityRateInsert,
    updateScrapSubmittedAddedItems, updateScrapSubmittedDetail,getSubmittedScarpForms,getEmployeeScrapApprovalLevel,getCategoryQualityUnderscrapForm,
    ViewCategorizedItemsUnderscrapForm,ViewCategorizedAddedItemsUnderscrapForm,getRateDetailsForCategoryQuality, UpdateScrapFormQuery,
    InsertScrapLevelReview,
    getScrapsApproved,
    getScrapApprovePanels,
    UpdateScrapLevelReview,
    EditScrapForm,
    EditScrapCategoryQuantityRate,
    EditScrapSubmittedAddedItems,
    EditScrapSubmittedDetail,
    getCondemnInchargePendingApproval,
    getCondemnHodPendingApproval,
    InchargeReview,
    HodReview,
    getEmployeeCondemnApprovalLevel,
    getPendingCondemApprovalList,
    getCondemnLlevelsApproved,
    CondemnUpdateLevel,
    InsertLevelReview,
    getcondemlevelDetails,
    UpdateLevelReview,
    getAllDeptApprovedOrRejected,
    getCondemnInchargeApprovalList} = require('./am_condem.service')
    const logger = require('../../logger/logger')
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
                    item_status: 1,
                    create_user:body.create_user
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
        const { req_dept, LvLSatusFrom, LvLStatusTo ,fromDate,toDate} = req.body;
    
        let sql = `
            SELECT
                *,
                	co_department_mast.dept_name as req_dpt_name,
                COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
                COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
            FROM am_condemnation_master
            LEFT JOIN am_condemnation_details  
                ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno   
            LEFT JOIN co_department_mast  
                ON co_department_mast.dept_id = am_condemnation_master.req_dept        

            WHERE condem_status != 0
        `;
    
        const queryParams = [];
    
        if (req_dept) {
            sql += " AND req_dept = ?";
            queryParams.push(req_dept);
        }
        if (LvLSatusFrom) {
            sql += " AND level_status < ?";
            queryParams.push(LvLSatusFrom);
        }
        if (LvLStatusTo) {
            sql += " AND level_status >= ?";
            queryParams.push(LvLStatusTo);
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
                reg_date, req_dept, condem_status
            ORDER BY condem_status DESC
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

    // getAllpendingApprovals: (req, res) => {
    //     const { condemnLevel } = req.body;    
    //      let sql = `
    //         SELECT 
    //             *,
    //             COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
    //             COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
    //         FROM am_condemnation_master
    //         LEFT JOIN am_condemnation_details 
    //         ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno
    //         WHERE condem_status = 1
    //     `;    
    //     const queryParams = [];               

    //     if (condemnLevel) {
    //         sql += " AND condem_level = ?";
    //         queryParams.push(condemnLevel);
    //     }    
    //     sql += `
    //         GROUP BY 
    //             am_condemnation_master.condem_mast_slno, 
    //             condem_form_prefix, condem_form_no, 
    //             reg_date, req_dept, condem_status
    //         ORDER BY condem_status DESC `;
    
    //     getAllpendingApprovals(sql, queryParams, (error, results) => {
              
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


    AddmoreItemsInForm: (req, res) => {
    const body = req.body;
    const details = body.deatilData.map((item) => ({
        condem_mast_slno: body.condem_mast_slno,
        am_asset_item_slno: item.type === 'asset' ? item.am_item_map_slno : null,
        am_spare_item_slno: item.type === 'spare' ? item.am_spare_item_map_slno : null,
        item_status: 1,
        create_user: body.create_user
    }));

    Promise.all(
        details.map((postdata) =>
            new Promise((resolve, reject) => {
                insertCondemDetailData(postdata, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            })
        )
    )
        .then((results) => {
            res.status(200).json({
                success: 1,
                data: results
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: 0,
                message: "Error while inserting items",
                error: error
            });
        });
},

        getScrapNotUnderCategorization: (req, res) => {
        getScrapNotUnderCategorization((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
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
        getAddedScrapNotUnderCategorization: (req, res) => {
        getAddedScrapNotUnderCategorization((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
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
        getInsertNewItemUnderCondemnation: (req, res) => {
            const body = req.body;
            const data = body && body.map((val) => {
                return [
                val.item_name,
                val.item_status,
                val.create_user
                ]
            })
            getInsertNewItemUnderCondemnation(data, (err, result) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message:"New Scarp Items Added"
    
                })
            })
        },
    
  
        UpdateScrapCategorize: (req, res) => {
        const body = req.body;
        UpdateScrapCategorize(body, (err, results) => {
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
                message: "Categorized Successfully",
            })
        })
    },
        UpdateItemScrapCategorize: (req, res) => {
        const body = req.body;
        UpdateItemScrapCategorize(body, (err, results) => {
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
                message: "Categorized Successfully",
            })
        })
    },
    
        getcondemdAssetCategoryWiseDashboard: (req, res) => {
        getcondemdAssetCategoryWiseDashboard((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
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

        ViewCategorizedItems: (req, res) => {
        const body = req.body;
        ViewCategorizedItems(body, (err, results) => {          
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

        ViewCategorizedAddedItems: (req, res) => {
        const body = req.body;
        ViewCategorizedAddedItems(body, (err, results) => {
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
    
getSelectedSupplierRateDetails: async (req, res) => {
    const bodyArray = req.body;
       if (!Array.isArray(bodyArray) || bodyArray.length === 0) {
        return res.status(200).json({
            success: 1,
            message: "Invalid or empty input"
        });
    }

    try {
        const results = await Promise.all(
            bodyArray.map(row => new Promise((resolve, reject) => {
                getSelectedSupplierRateDetails(row, (err, result) => {
                    if (err) return reject(err);
                    resolve(result[0] || null); // assuming 1 match per row
                });
            }))
        );

        const filtered = results.filter(Boolean);          

        if (filtered.length === 0) {
            return res.status(200).json({
                success: 1,
                message: "No Records"
            });
        }

        return res.status(200).json({
            success: 2,
            data: filtered
        });

    } catch (err) {
        return res.status(200).json({
            success: 0,
            message: err.message
        });
    }
},
   

submitScrapForm: (req, res) => {
    const body = req.body;
    submitScrapForm(body, (err, result) => {
        if (err) return res.status(200).json({ success: 0, message: err });

        const condem_form_slno = result.insertId;
        if (!condem_form_slno) return res.status(200).json({ success: 0, message: "Form insert failed" });

        const { rateDetails, updateItems } = body;

        if (!Array.isArray(rateDetails) || rateDetails.length === 0)
            return res.status(200).json({ success: 0, message: "No rate details provided" });

        // Insert rate details
        const rateInsertPromises = rateDetails.map(detail => {
            const postdata = {
                condem_form_slno,
                category_slno: detail.category_slno,
                quality_slno: detail.quality_slno,
                units: detail.units,
                quantity_slno: detail.quantity_slno,
                scrap_rate: detail.scrap_rate
            };

            return new Promise((resolve, reject) => {
                ScrapCategoryQuantityRateInsert(postdata, (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                });
            });
        });

        // Update scrap submitted status
        const updatePromises = updateItems.map(item => {
            const postdata = {
                scrap_condemn_Form_slno: condem_form_slno,
                ...(item.isAddedItem ? { item_slno: item.slno } : { am_condem_detail_slno: item.slno })
            };

            return new Promise((resolve, reject) => {
                const updateFn = item.isAddedItem ? updateScrapSubmittedAddedItems : updateScrapSubmittedDetail;
                updateFn(postdata, (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                });
            });
        });

        Promise.all([...rateInsertPromises, ...updatePromises])
            .then(() => {
                return res.status(200).json({
                    success: 1,
                    message: "Scrap Form Submitted Successfully",
                    insertId: condem_form_slno
                });
            })
            .catch(err => {
                return res.status(200).json({ success: 0, message: err });
            });
    });
},
        getSubmittedScarpForms: (req, res) => {
        getSubmittedScarpForms((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
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

    getEmployeeScrapApprovalLevel: (req, res) => {
        const id = req.params.id;
        getEmployeeScrapApprovalLevel(id, (err, results) => {

   
            
            
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getCategoryQualityUnderscrapForm: (req, res) => {
        const id = req.params.id;
        getCategoryQualityUnderscrapForm(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    
     ViewCategorizedItemsUnderscrapForm: (req, res) => {
        const body = req.body;
        ViewCategorizedItemsUnderscrapForm(body, (err, results) => {    
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
  ViewCategorizedAddedItemsUnderscrapForm: (req, res) => {
        const body = req.body;
        ViewCategorizedAddedItemsUnderscrapForm(body, (err, results) => {
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
  getRateDetailsForCategoryQuality: (req, res) => {
        const body = req.body;
        getRateDetailsForCategoryQuality(body, (err, results) => {
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
    

UpdateScrapForm: (req, res) => {
    const body = req.body;

    UpdateScrapFormQuery(body, (err, result) => {
        if (err) {
            return res.status(200).json({
                success: 0,
                message: err
            });
        }

        const postdata = {
            scrap_condemn_Form_slno: body.scrap_condemn_Form_slno,
            level_no: body.level_no,
            level_review_state: body.level_review_state,
            level_review: body.level_review,
            level_review_slno: body.level_review_slno 
        };

        if (postdata.level_review_slno) {
            UpdateScrapLevelReview(postdata, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Review Updated Successfully"
                });
            });
        } else {
            InsertScrapLevelReview(postdata, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Review Added Successfully"
                });
            });
        }
    });
},



        getScrapsApproved: (req, res) => {
        const body = req.body;
        getScrapsApproved(body, (err, results) => {
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

    getScrapApprovePanels: (req, res) => {
        const id = req.params.id;
        getScrapApprovePanels(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

EditScrapForm: (req, res) => {
    const body = req.body;

    
    // Ensure form ID is present
    const { scrap_condemn_Form_slno, rateDetails, deletedItemsData } = body;
   

    if (!scrap_condemn_Form_slno)
        return res.status(200).json({ success: 0, message: "Form update failed: Missing form ID" });

    // First, update the main form details
    EditScrapForm(body, (err, result) => {
        if (err) return res.status(200).json({ success: 0, message: err });

        // Validate rate details
        if (!Array.isArray(rateDetails) || rateDetails.length === 0)
            return res.status(200).json({ success: 0, message: "No rate details provided" });

        // Promise to update rate details
        const rateInsertPromises = rateDetails.map(detail => {
            const patchdata = {
                scrap_rate_slno: detail.scrap_rate_slno,
                units: detail.units,
                quantity_slno: detail.quantity_slno,
                scrap_rate: detail.scrap_rate
            };

            return new Promise((resolve, reject) => {
                EditScrapCategoryQuantityRate(patchdata, (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                });
            });
        });

        // Promise to update submitted items (either added items or existing details)
            const updatePromises = deletedItemsData.map(item => {
                const patchData = {
                    scrap_condemn_Form_slno,
                    ...(item.isAddedItem
                        ? { item_slno: item.item_slno }
                        : { am_condem_detail_slno: item.am_condem_detail_slno })
                };

                return new Promise((resolve, reject) => {
                    const updateFn = item.isAddedItem
                        ? EditScrapSubmittedAddedItems
                        : EditScrapSubmittedDetail;

                    updateFn(patchData, (err, res) => {
                        if (err) return reject(err);
                        resolve(res);
                    });
                });
            });



        // Execute all updates
        Promise.all([...rateInsertPromises, ...updatePromises])
            .then(() => {
                return res.status(200).json({
                    success: 1,
                    message: "Scrap Form Updated Successfully",
                    insertId: scrap_condemn_Form_slno
                });
            })
            .catch(err => {
                return res.status(200).json({ success: 0, message: err });
            });
    });
},

getCondemnInchargePendingApproval: (req, res) => {
        const body = req.body;
        getCondemnInchargePendingApproval(body, (err, results) => {
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

    getCondemnHodPendingApproval: (req, res) => {
        const body = req.body;
        getCondemnHodPendingApproval(body, (err, results) => {
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

    

     InchargeReview: (req, res) => {
        const body = req.body;
        InchargeReview(body, (err, results) => {
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
                message: "Review Updated Successfully",
            })
        })
    },
CondemnUpdateLevel: (req, res) => {
    const body = req.body;

    CondemnUpdateLevel(body, (err, results) => {
        if (err) {
            return res.status(200).json({
                success: 0,
                message: err
            });
        }

        if (results === 0) {
            return res.status(200).json({
                success: 1,
                message: "No record found"
            });
        }

        if (results) {
            const postReview = {
                condemn_mast_slno: body.condem_mast_slno,
                level_no: body.condem_level,
                level_review_state: body.condemn_level_state,
                level_review: body.level_review,
                level_employee: body.level_employee,
                level_review_slno: body.level_review_slno
            };
            
            if (body.level_review_slno !== null && body.level_review_slno !== undefined) {
                UpdateLevelReview(postReview, (err) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Review Updated Successfully"
                    });
                });
            } else {
                InsertLevelReview(postReview, (err) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Review Inserted Successfully"
                    });
                });
            }
        }
    });
},

    

         HodReview: (req, res) => {
        const body = req.body;
        HodReview(body, (err, results) => {
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
                message: "Review Updated Successfully",
            })
        })
    },
        getEmployeeCondemnApprovalLevel: (req, res) => {
        const id = req.params.id;
        getEmployeeCondemnApprovalLevel(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

     getPendingCondemApprovalList: (req, res) => {
        const body = req.body;
        getPendingCondemApprovalList(body, (err, results) => {
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
        getCondemnLlevelsApproved: (req, res) => {
        const id = req.params.id;
        getCondemnLlevelsApproved(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

     getcondemlevelDetails: (req, res) => {
        const body = req.body;
        getcondemlevelDetails(body, (err, results) => {
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
    
    
getAllDeptApprovedOrRejected: (req, res) => {
    const { req_dept, condemn_all_approved, condemn_rejected, roleHod,roleLvlMast } = req.body;

    let sql = `
        SELECT 
            m.condem_mast_slno,
            m.condem_form_no,
            m.condem_form_prefix,
            m.reg_date,
            m.condem_status,
            m.condem_level,
            m.condemn_level_state,
            m.inch_level_acknowledge,
            m.inch_review,
            m.inch_review_date,
            m.inch_level_state,
            m.hod_level_acknowledge,
            m.hod_review,
            m.hod_review_date,
            m.hod_level_state,
            inch_employee_mast.em_name AS inch_emp,
            hod_employee_mast.em_name AS hod_emp,
            approve_lvl.level_name AS current_lvl,    
            co_department_mast.dept_name as req_dpt_name,  
            COUNT(CASE WHEN d.am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
            COUNT(CASE WHEN d.am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
        FROM am_condemnation_master m
        LEFT JOIN am_condemnation_details d
            ON d.condem_mast_slno = m.condem_mast_slno
        LEFT JOIN co_employee_master inch_employee_mast
            ON inch_employee_mast.em_id = m.inch_employee
        LEFT JOIN co_employee_master hod_employee_mast
            ON hod_employee_mast.em_id = m.hod_employee
        LEFT JOIN am_condem_levels_review clr
            ON clr.condemn_mast_slno = m.condem_mast_slno
        LEFT JOIN am_condem_approval_level_master al
            ON al.level_no = clr.level_no
        LEFT JOIN am_condem_approval_level_master approve_lvl
            ON approve_lvl.level_no = m.condem_level
        LEFT JOIN co_department_mast  
            ON co_department_mast.dept_id = m.req_dept
        WHERE m.condem_status = 1
    `;

    const queryParams = [];

    if (req_dept != null) {
        sql += " AND m.req_dept = ?";
        queryParams.push(req_dept);
    }
    if (condemn_all_approved != null) {
        sql += " AND m.condemn_all_approved = ?";
        queryParams.push(condemn_all_approved);
    }
    if (condemn_rejected != null) {
        sql += " AND m.condemn_rejected = ?";
        queryParams.push(condemn_rejected);
    }
    if (roleHod != null) {
        sql += " AND m.inch_level_state <> 'R'";       
    }
    if (roleLvlMast != null) {
        sql += " AND m.inch_level_state <> 'R' AND m.hod_level_state <> 'R'";       
    }
    


    sql += `
        GROUP BY m.condem_mast_slno
        HAVING count_of_spare > 0 OR count_of_asset > 0
    `;

    getAllDeptApprovedOrRejected(sql, queryParams, (error, results) => {
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
getCondemnInchargeApprovalList: (req, res) => {
        const body = req.body;
        getCondemnInchargeApprovalList(body, (err, results) => {
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

