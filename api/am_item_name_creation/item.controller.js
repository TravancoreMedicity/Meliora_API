
const { validateItemCreate } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const { ItemNameInsert, ItemNameview, ItemNameUpdate, getitemAll, getitemFromMasterdemo,

    getitemNoModelNo, getitemNoManufactr, getitemNoSubModel, getitemNoModel, getitemNoSubGroup,
    getitemNoGroup, getitemNoSubCat, getitemNoCat, getitemOnlyModelNo, getitemOnlyManufactr,
    getitemOnlySubModel, getitemOnlyModel, getitemOnlySubGroup, getitemOnlyGroup, getitemOnlySubCat,
    getitemOnlyCat, getitemCatSubCat, getitemGroupSubGrup, getitemModlSubMdl, getitemManufctrMdlNo,
    getitemCatGrup, getitemCatSubGroup, getitemCatModel, getitemCatSubModel, getitemCatManufctr,
    getitemCatModelNo, getitemSubCatGroup, getitemSubCatSubGroup, getitemSubCatModel, getitemSubCatSubModel,
    getitemSubCatManufactr, getitemSubCatModelNo, getitemGroupModel,
    getitemGroupSubModel, getitemGroupManufctr, getitemGroupModelNo, getitemSubGroupModel,
    getitemSubGroupSubModel, getitemSubGroupManufctr, getitemSubGroupModelNo,
    getitemModelManufctr, getitemModelModelno, getitemSubModelManufctr, getitemSubModelModelNo,
    getitemCatSubCatGrup, getitemCatSubCatSubGrup, getitemCatSubCatModel, getitemCatSubCatSubModel,
    getitemCatSubCatManufctr, getitemCatSubCatModelNo, getitemCatGroupSubGrup, getitemCatGroupModel,
    getitemCatGroupSubModel, getitemCatGroupManufctr, getitemCatGroupModelNo, getitemCatSubGroupModel,
    getitemCatSubGroupSubModel, getitemCatSubGroupManufctr, getitemCatSubGroupModelNo, getitemCatModelSubModel,
    getitemCatModelManufctr, getitemCatModelModelNo,
    getitemFromMaster, getItemSearchByName } = require('../am_item_name_creation/item.services');
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
        else if (category == 0 && subcat == 0 && group != 0 && subgroup == 0 && model !== 0 && submodel == 0 && manufctr == 0 && modelno == null) {

            getitemGroupModel(body, (err, results) => {
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

        else if (category == 0 && subcat == 0 && group != 0 && subgroup == 0 && model == 0 && submodel !== 0 && manufctr == 0 && modelno == null) {
            getitemGroupSubModel(body, (err, results) => {
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
        else if (category == 0 && subcat == 0 && group != 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno == null) {

            getitemGroupManufctr(body, (err, results) => {
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
        else if (category == 0 && subcat == 0 && group != 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno != null) {

            getitemGroupModelNo(body, (err, results) => {
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
        else if (category == 0 && subcat == 0 && group == 0 && subgroup != 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno == null) {

            getitemSubGroupModel(body, (err, results) => {
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



        else if (category == 0 && subcat == 0 && group == 0 && subgroup != 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno == null) {

            getitemSubGroupSubModel(body, (err, results) => {
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


        else if (category == 0 && subcat == 0 && group == 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno == null) {

            getitemSubGroupManufctr(body, (err, results) => {
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


        else if (category == 0 && subcat == 0 && group == 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno != null) {

            getitemSubGroupModelNo(body, (err, results) => {
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

        else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr != 0 && modelno == null) {
            getitemModelManufctr(body, (err, results) => {
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

        else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno != null) {
            getitemModelModelno(body, (err, results) => {
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

        else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr != 0 && modelno == null) {
            getitemSubModelManufctr(body, (err, results) => {
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

        else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno != null) {
            getitemSubModelModelNo(body, (err, results) => {
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

        //3 Combinations
        else if (category != 0 && subcat != 0 && group != 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {

            getitemCatSubCatGrup(body, (err, results) => {
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


        else if (category != 0 && subcat != 0 && group == 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {

            getitemCatSubCatSubGrup(body, (err, results) => {
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


        else if (category != 0 && subcat != 0 && group == 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno == null) {

            getitemCatSubCatModel(body, (err, results) => {
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


        else if (category != 0 && subcat != 0 && group == 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno == null) {

            getitemCatSubCatSubModel(body, (err, results) => {
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

        else if (category != 0 && subcat != 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno == null) {

            getitemCatSubCatManufctr(body, (err, results) => {
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

        else if (category != 0 && subcat != 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno != null) {

            getitemCatSubCatModelNo(body, (err, results) => {
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


        else if (category != 0 && subcat == 0 && group != 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemCatGroupSubGrup(body, (err, results) => {
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

        else if (category != 0 && subcat == 0 && group != 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemCatGroupModel(body, (err, results) => {
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

        else if (category != 0 && subcat == 0 && group != 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno == null) {
            getitemCatGroupSubModel(body, (err, results) => {
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

        else if (category != 0 && subcat == 0 && group != 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno == null) {
            getitemCatGroupManufctr(body, (err, results) => {
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

        else if (category != 0 && subcat == 0 && group != 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno != null) {
            getitemCatGroupModelNo(body, (err, results) => {
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


        else if (category != 0 && subcat == 0 && group == 0 && subgroup != 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno == null) {
            getitemCatSubGroupModel(body, (err, results) => {
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
        else if (category != 0 && subcat == 0 && group == 0 && subgroup != 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno == null) {
            getitemCatSubGroupSubModel(body, (err, results) => {
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

        else if (category != 0 && subcat == 0 && group == 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno == null) {
            getitemCatSubGroupManufctr(body, (err, results) => {
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

        else if (category != 0 && subcat == 0 && group == 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno != null) {
            getitemCatSubGroupModelNo(body, (err, results) => {
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


        else if (category != 0 && subcat == 0 && group == 0 && subgroup == 0 && model != 0 && submodel != 0 && manufctr == 0 && modelno == null) {
            getitemCatModelSubModel(body, (err, results) => {
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

        else if (category != 0 && subcat == 0 && group == 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr != 0 && modelno == null) {
            getitemCatModelManufctr(body, (err, results) => {
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


        else if (category != 0 && subcat == 0 && group == 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno != null) {
            getitemCatModelModelNo(body, (err, results) => {
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


        // else if (category != 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr != 0 && modelno == null) {
        //     getitemCatSubModelManufctr(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }


        // else if (category != 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno != null) {
        //     getitemCatSubModelModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category != 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno != null) {
        //     getitemCatManufctrModelno(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat != 0 && group != 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno == null) {
        //     getitemSubCatGroupSubGrup(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }
        // else if (category == 0 && subcat != 0 && group != 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno == null) {
        //     getitemSubCatGroupModel(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }
        // else if (category == 0 && subcat != 0 && group != 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno == null) {
        //     getitemSubCatGroupSubModel(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }
        // else if (category == 0 && subcat != 0 && group != 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno == null) {
        //     getitemSubCatGroupManufactr(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }
        // else if (category == 0 && subcat != 0 && group != 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno != null) {
        //     getitemSubCatGroupModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat != 0 && group == 0 && subgroup != 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno == null) {
        //     getitemSubCatSubGroupModel(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }
        // else if (category == 0 && subcat != 0 && group == 0 && subgroup != 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno == null) {
        //     getitemSubCatSubGroupSubModel(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }
        // else if (category == 0 && subcat != 0 && group == 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno == null) {
        //     getitemSubCatSubGroupManufactr(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }
        // else if (category == 0 && subcat != 0 && group == 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno != null) {
        //     getitemSubCatSubGroupModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat != 0 && group == 0 && subgroup == 0 && model != 0 && submodel != 0 && manufctr == 0 && modelno == null) {
        //     getitemSubCatModelSubModel(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }
        // else if (category == 0 && subcat != 0 && group == 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr != 0 && modelno == null) {
        //     getitemSubCatModelManufctr(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat != 0 && group == 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno != null) {
        //     getitemSubCatModelModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat != 0 && group == 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr != 0 && modelno == null) {
        //     getitemSubCatSubModelManufactr(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }
        // else if (category == 0 && subcat != 0 && group == 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno != null) {
        //     getitemSubCatSubModelModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat != 0 && group == 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno != null) {
        //     getitemSubCatManufactrModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }


        // else if (category == 0 && subcat == 0 && group != 0 && subgroup != 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno == null) {
        //     getitemGroupSubGrupModel(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group != 0 && subgroup != 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno == null) {
        //     getitemGroupSubGrupSubModel(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }


        // else if (category == 0 && subcat == 0 && group != 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno == null) {
        //     getitemGroupSubGrupManufactr(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group != 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr == 0 && modelno != null) {
        //     getitemGroupSubGrupModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }


        // else if (category == 0 && subcat == 0 && group != 0 && subgroup == 0 && model != 0 && submodel != 0 && manufctr == 0 && modelno == null) {
        //     getitemGroupModelSubModel(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group != 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr != 0 && modelno == null) {
        //     getitemGroupModelManufactr(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group != 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno != null) {
        //     getitemGroupModelModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group != 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr != 0 && modelno == null) {
        //     getitemGroupSubModelManufactr(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group != 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno != null) {
        //     getitemGroupSubModelModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group != 0 && subgroup == 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno != null) {
        //     getitemGroupManufactrModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group == 0 && subgroup != 0 && model != 0 && submodel != 0 && manufctr == 0 && modelno == null) {
        //     getitemSubGroupModelSubModel(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group == 0 && subgroup != 0 && model != 0 && submodel == 0 && manufctr != 0 && modelno == null) {
        //     getitemSubGroupModelManufactr(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group == 0 && subgroup != 0 && model != 0 && submodel == 0 && manufctr == 0 && modelno != null) {
        //     getitemSubGroupModelModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group == 0 && subgroup != 0 && model == 0 && submodel != 0 && manufctr != 0 && modelno == null) {
        //     getitemSubGroupSubModelManufactr(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group == 0 && subgroup != 0 && model == 0 && submodel != 0 && manufctr == 0 && modelno != null) {
        //     getitemSubGroupSubModelModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group == 0 && subgroup != 0 && model == 0 && submodel == 0 && manufctr != 0 && modelno != null) {
        //     getitemSubGroupManufactrModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }


        // else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model != 0 && submodel != 0 && manufctr != 0 && modelno == null) {
        //     getitemModelSubModelManufctr(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model != 0 && submodel != 0 && manufctr == 0 && modelno != null) {
        //     getitemModelSubModelModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model != 0 && submodel == 0 && manufctr != 0 && modelno != null) {
        //     getitemSubModelManufctrModelNo(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        // else if (category == 0 && subcat == 0 && group == 0 && subgroup == 0 && model == 0 && submodel != 0 && manufctr != 0 && modelno != null) {
        //     getitemSubModelManufctrModelno(body, (err, results) => {
        //         if (err) {
        //             logger.logwindow(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }

        //         if (results.length == 0) {
        //             logger.infologwindow("No Results Found")
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: "No Record Found"
        //             });
        //         }

        //         return res.status(200).json({
        //             success: 1,
        //             data: results
        //         });
        //     })
        // }

        else {

            return res.status(200).json({
                success: 2,
                message: "No Record Found"
            });
        }
    },



    getItemSearchByName: (req, res) => {
        const body = req.body
        getItemSearchByName(body, (err, results) => {
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