
const { CategoryInsert, CategoryView, CategoryUpdate ,ScrapYardInsert,ScrapYardView,ScrapYardUpdate,QualityInsert,QualityView,QualityUpdate,QuantityUnitInsert,QuantityUnitView,
    QuantityUnitUpdate,SupplierRateInsert,SupplierRateView,SupplierRateUpdate,getActiveCategory,getActiveQuality,getActiveQuantity, getSelectedSupplierRates,
    getActiveScarpLocation,scraplevelInsert, getScraplevels,getScraplevelUpdate,getScrapActivelevels,getEmployeeScrapLevel,getScrapActiveToplevel, getscrapItemRateDetail,
    RemoveAddedItemFromCategorized,  RemoveItemFromCategorized } = require('./condem_master.service')
    
module.exports = {
 CategoryInsert: (req, res) => {
        const body = req.body;
        CategoryInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Category inserted successfully"
            })
        })
    },
    CategoryView: (req, res) => {
        CategoryView((err, results) => {
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
    CategoryUpdate: (req, res) => {
        const body = req.body;
        CategoryUpdate(body, (err, results) => {
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
                message: "Category Updated successfully"
            })
        })
    },



        ScrapYardInsert: (req, res) => {
            const body = req.body;
            ScrapYardInsert(body, (err, result) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Scrap Yard Location inserted successfully"
                })
            })
        },
        ScrapYardView: (req, res) => {
    
            ScrapYardView((err, results) => {
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
        ScrapYardUpdate: (req, res) => {
            const body = req.body;    
            ScrapYardUpdate(body, (err, results) => {
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
                    message: "Scrap Yard Location Updated successfully"
                })
            })
        },


        QualityInsert: (req, res) => {
        const body = req.body;
        QualityInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Quality inserted successfully"
            })
        })
    },
    QualityView: (req, res) => {

        QualityView((err, results) => {
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
    QualityUpdate: (req, res) => {
        const body = req.body;
        QualityUpdate(body, (err, results) => {
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
                message: "Quality Updated successfully"
            })
        })
    },



       QuantityUnitInsert: (req, res) => {
        const body = req.body;
        QuantityUnitInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Quantity inserted successfully"
            })
        })
    },
    QuantityUnitView: (req, res) => {
        QuantityUnitView((err, results) => {
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
    QuantityUnitUpdate: (req, res) => {
        const body = req.body;
        QuantityUnitUpdate(body, (err, results) => {
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
                message: "Quantity Updated successfully"
            })
        })
    },

        SupplierRateInsert: (req, res) => {
            const body = req.body;    
            var newList = body.map((val, index) => {
                return [val.supplier_slno,val.category_slno,val.quality_slno,val.quantity_unit_slno,val.unit,val.price,  val.supplier_status,val.create_user]
            })    
            SupplierRateInsert(newList, (err, results) => {
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                } return res.status(200).json({
                    success: 1,
                    message: "Supplier Rate Details Added Successfully"
                });
    
            });
        },

    SupplierRateView: (req, res) => {
        SupplierRateView((err, results) => {
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

SupplierRateUpdate: (req, res) => {
            const body = req.body;    
            var newList = body.map((val, index) => {
                       
                return [val.supplier_slno,val.category_slno,val.quality_slno,val.quantity_unit_slno,val.unit,val.price,  val.supplier_status,val.edit_user,val.condemn_rate_slno]
            })    
            SupplierRateUpdate(newList, (err, results) => {

              
                

                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                } return res.status(200).json({
                    success: 1,
                    message: "Supplier Rate Details Updated Successfully"
                });
    
            });
        },

        getActiveCategory: (req, res) => {
        getActiveCategory((err, results) => {
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

        getActiveQuality: (req, res) => {
        getActiveQuality((err, results) => {
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
        getActiveQuantity: (req, res) => {
        getActiveQuantity((err, results) => {
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

        getSelectedSupplierRates: (req, res) => {
        const id = req.params.id;
        getSelectedSupplierRates(id, (err, results) => {
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

            getActiveScarpLocation: (req, res) => {
        getActiveScarpLocation((err, results) => {
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
    
    scraplevelInsert: (req, res) => {
        const body = req.body;
        scraplevelInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Scrap Form Approval Level Submitted Successfully"
            })
        })
    },
        getScraplevels: (req, res) => {
        getScraplevels((err, results) => {
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
    getScraplevelUpdate: (req, res) => {
            const body = req.body;    
            getScraplevelUpdate(body, (err, results) => {
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
                    message: "Scrap Level Updated successfully"
                })
            })
        },

        getScrapActivelevels: (req, res) => {
        getScrapActivelevels((err, results) => {
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

    getEmployeeScrapLevel: (req, res) => {
        const id = req.params.id;
        getEmployeeScrapLevel(id, (err, results) => {
           

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

getScrapActiveToplevel: (req, res) => {
        getScrapActiveToplevel((err, results) => {
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

    getscrapItemRateDetail: (req, res) => {
        const body = req.body;
        
        getscrapItemRateDetail(body, (err, results) => {

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

        RemoveItemFromCategorized: (req, res) => {            
            const body = req.body;              
            RemoveItemFromCategorized(body, (err, results) => {
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
                    message: "Remove Item From Category"
                })
            })
        },
        
        RemoveAddedItemFromCategorized: (req, res) => {   
        const body = req.body;
        RemoveAddedItemFromCategorized(body, (err, results) => {
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
                message: "Item Removed successfully"
            })
        })
    },


}