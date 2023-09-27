
const { validateItemCreate } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const { ItemNameInsert, ItemNameview, ItemNameUpdate, itemInactive, getitemAll, getitemFromMasterdemo,

    getitemNoModelNo, getitemNoManufactr, getitemNoSubModel, getitemNoModel, getitemNoSubGroup,
    getitemNoGroup, getitemNoSubCat, getitemNoCat, getitemOnlyModelNo, getitemOnlyManufactr,
    getitemOnlySubModel, getitemOnlyModel, getitemOnlySubGroup, getitemOnlyGroup, getitemOnlySubCat,
    getitemOnlyCat, getitemCatSubCat, getitemGroupSubGrup, getitemModlSubMdl, getitemManufctrMdlNo,
    getitemCatGrup, getitemCatSubGroup, getitemCatModel, getitemCatSubModel, getitemCatManufctr,
    getitemCatModelNo, getitemSubCatGroup, getitemSubCatSubGroup, getitemSubCatModel, getitemSubCatSubModel,
    getitemSubCatManufactr, getitemSubCatModelNo,

    getitemFromMaster } = require('../am_item_name_creation/item.services');
const { log } = require('winston');
module.exports = {
    ItemNameInsert: (req, res) => {
        const body = req.body;
        //validate item name Instert function
        const body_result = validateItemCreate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.item_name = body_result.value.item_name;

        ItemNameInsert(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Item creation data inserted successfully"
            })
        })
    },
    ItemNameview: (req, res) => {

        ItemNameview((err, results) => {
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
    ItemNameUpdate: (req, res) => {
        const body = req.body;

        ItemNameUpdate(body, (err, results) => {
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
                message: "Item creation data Updated successfully"
            })
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


    getitemFromMasterdemo: (req, res) => {

        const body = req.body

        getitemFromMasterdemo(body, (err, results) => {
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








    getitemFromMaster: (req, res) => {
        const body = req.body
        const category = body.item_category_slno
        const subcat = body.item_subcategory_slno
        const group = body.item_group_slno
        const subgroup = body.item_subgroup_slno
        const model = body.item_model_slno
        const submodel = body.item_submodel_slno
        const manufctr = body.item_manufactures_slno
        const modelno = body.item_model_num

        console.log("Cat", category);

        console.log("subcat", subcat);

        console.log("group", group);

        console.log("subgroup", subgroup);

        console.log("model", model);

        console.log("submodel", submodel);

        console.log("manufctr", manufctr);
        console.log("modelno", modelno);


        if (category != 0 && subcat != 0 && group != 0 && subgroup != 0 && model != 0 && submodel != 0 && manufctr != 0 && modelno != null) {
            getitemAll(body, (err, results) => {
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
        }

        else if (category != 0 && subcat != 0 && group != 0 && subgroup != 0 && model != 0 && submodel != 0 && manufctr != 0 && modelno == null) {
            getitemNoModelNo(body, (err, results) => {
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
        }
        else if (category != 0 && subcat != 0 && group != 0 && subgroup != 0 && model != 0 && submodel != 0 && manufctr == 0 && modelno != null) {
            getitemNoManufactr(body, (err, results) => {
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
        }
        else if (category != 0 && subcat != 0 && group != 0 && subgroup != 0 && model != 0 && submodel == 0 && manufctr != 0 && modelno != null) {
            getitemNoSubModel(body, (err, results) => {
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
        }
        else if (category != 0 && subcat != 0 && group != 0 && subgroup != 0 && model == 0 && submodel != 0 && manufctr != 0 && modelno != null) {
            getitemNoModel(body, (err, results) => {
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
        }
        else if (category != 0 && subcat != 0 && group != 0 && subgroup == 0 && model != 0 && submodel != 0 && manufctr != 0 && modelno != null) {
            getitemNoSubGroup(body, (err, results) => {
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
        }
        else if (category != 0 && subcat != 0 && group == 0 && subgroup != 0 && model != 0 && submodel != 0 && manufctr != 0 && modelno != null) {
            getitemNoGroup(body, (err, results) => {
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
        }
        else if (category != 0 && subcat == 0 && group != 0 && subgroup != 0 && model != 0 && submodel != 0 && manufctr != 0 && modelno != null) {
            getitemNoSubCat(body, (err, results) => {
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
        }
        else if (category == 0 && subcat != 0 && group != 0 && subgroup != 0 && model != 0 && submodel != 0 && manufctr != 0 && modelno != null) {

            getitemNoCat(body, (err, results) => {
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
        }

        else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno != null) {

            getitemOnlyModelNo(body, (err, results) => {
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
        }
        else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno == null) {
            getitemOnlyManufactr(body, (err, results) => {
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
        }
        else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno == null) {
            getitemOnlySubModel(body, (err, results) => {
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
        }
        else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemOnlyModel(body, (err, results) => {
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
        }
        else if (category == 0 && subcat == 0 && group == 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemOnlySubGroup(body, (err, results) => {
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
        }
        else if (category == 0 && subcat == 0 && group != 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemOnlyGroup(body, (err, results) => {
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
        } else if (category == 0 && subcat != 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemOnlySubCat(body, (err, results) => {
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
        }
        else if (category != 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemOnlyCat(body, (err, results) => {
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
        } else if (category != 0 && subcat != 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemCatSubCat(body, (err, results) => {
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

        }

        else if (category == 0 && subcat == 0 && group != 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {

            getitemGroupSubGrup(body, (err, results) => {
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
        }



        else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model != 0 && submodel != 0 && manufctr == 0 && modelno == null) {
            getitemModlSubMdl(body, (err, results) => {
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

        }

        else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno != null) {

            getitemManufctrMdlNo(body, (err, results) => {
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
        }

        else if (category != 0 && subcat == 0 && group != 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemCatGrup(body, (err, results) => {
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

        }

        else if (category != 0 && subcat == 0 && group == 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemCatSubGroup(body, (err, results) => {
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

        }

        else if (category != 0 && subcat == 0 && group == 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemCatModel(body, (err, results) => {
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

        }

        else if (category != 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel !== 0 && manufctr == 0 && modelno == null) {
            getitemCatSubModel(body, (err, results) => {
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

        }

        else if (category != 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno == null) {
            getitemCatManufctr(body, (err, results) => {
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

        }

        else if (category != 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno != null) {
            getitemCatModelNo(body, (err, results) => {
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

        }

        else if (category == 0 && subcat != 0 && group != 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemSubCatGroup(body, (err, results) => {
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

        }

        else if (category == 0 && subcat != 0 && group == 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemSubCatSubGroup(body, (err, results) => {
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

        }

        else if (category == 0 && subcat != 0 && group == 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemSubCatModel(body, (err, results) => {
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

        }

        else if (category == 0 && subcat != 0 && group == 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno == null) {
            getitemSubCatSubModel(body, (err, results) => {
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

        }

        else if (category == 0 && subcat != 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno == null) {
            getitemSubCatManufactr(body, (err, results) => {
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

        }

        else if (category == 0 && subcat != 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno != null) {
            getitemSubCatModelNo(body, (err, results) => {
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

        }





        else {

            return res.status(200).json({
                success: 2,
                message: "No Record Found"
            });
        }





    },
}