const { pool } = require('../../config/database')
module.exports = {
  CategoryInsert: (data, callback) => {
        pool.query(
            `INSERT INTO am_condemnation_category_mast
          ( 
            category_name,
            category_status,
            create_user
         
          )
          VALUES(?,?,?)`,
            [
                data.category_name,
                data.category_status,
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
    CategoryView: (callback) => {
        pool.query(
            `SELECT 
            category_slno,
            category_name, 
            category_status,
            if(category_status=1,'Yes','No')status
            FROM
            am_condemnation_category_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    CategoryUpdate: (data, callback) => {

        pool.query(
            `UPDATE am_condemnation_category_mast SET 
            category_name=?,
            category_status=?,
            edit_user =?       
            WHERE 
            category_slno=?`,
            [
                data.category_name,
                data.category_status,
                data.edit_user,
                data.category_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },



    ScrapYardInsert: (data, callback) => {
        pool.query(
            `INSERT INTO am_condemn_scrap_yard
          ( 
            yard_name,
            yard_status,
            create_user
         
          )
          VALUES(?,?,?)`,
            [
                data.yard_name,
                data.yard_status,
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
    ScrapYardView: (callback) => {
        pool.query(
            `SELECT 
            yard_slno,
            yard_name, 
            yard_status
            FROM
            am_condemn_scrap_yard`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    ScrapYardUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_condemn_scrap_yard SET 
            yard_name=?,
            yard_status=?,
            edit_user =?       
            WHERE 
            yard_slno=?`,
            [
                data.yard_name,
                data.yard_status,
                data.edit_user,
                data.yard_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    QualityInsert: (data, callback) => {
        pool.query(
            `INSERT INTO am_condemn_quality_master
          ( 
            quality_name,
            quality_status,
            create_user
         
          )
          VALUES(?,?,?)`,
            [
                data.quality_name,
                data.quality_status,
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
    QualityView: (callback) => {
        pool.query(
            `SELECT 
            quality_slno,
            quality_name, 
            quality_status
            FROM
            am_condemn_quality_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    QualityUpdate: (data, callback) => {

        pool.query(
            `UPDATE am_condemn_quality_master SET 
            quality_name=?,
            quality_status=?,
            edit_user =?       
            WHERE 
            quality_slno=?`,
            [
                data.quality_name,
                data.quality_status,
                data.edit_user,
                data.quality_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    QuantityUnitInsert: (data, callback) => {
        pool.query(
            `INSERT INTO am_condemnation_quantity_unit
          ( 
            condem_quantity_name,
            condem_quantity_status,
            create_user
         
          )
          VALUES(?,?,?)`,
            [
                data.condem_quantity_name,
                data.condem_quantity_status,
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
    QuantityUnitView: (callback) => {
        pool.query(
            `SELECT 
            condem_quantity_slno,
            condem_quantity_name, 
            condem_quantity_status,
            if(condem_quantity_status=1,'Yes','No')status
            FROM
            am_condemnation_quantity_unit`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    QuantityUnitUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_condemnation_quantity_unit SET 
            condem_quantity_name=?,
            condem_quantity_status=?,
            edit_user =?       
            WHERE 
            condem_quantity_slno=?`,
            [
                data.condem_quantity_name,
                data.condem_quantity_status,
                data.edit_user,
                data.condem_quantity_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
   
        SupplierRateInsert: (data, callBack) => {
                 
        pool.query(
            `INSERT INTO am_condemn_supplier_rate_master
          (   
            supplier_slno,
            category_slno,
            quality_slno,
            quantity_unit_slno,
            unit, 
            price,         
            supplier_status,
            create_user
         
          )
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    SupplierRateView: (callback) => {
        pool.query(
            `select 
            condemn_rate_slno, 
            comdem_supp.quality_slno,
            comdem_supp.supplier_slno,
            quantity_unit_slno,
            comdem_supp.category_slno,
            unit,
            price,
            comdem_supp.supplier_status,
            it_bill_supplier_details_mast.it_supplier_name as supplier_name,
            am_condemnation_category_mast.category_name as category_name,
            quality_name,
            condem_quantity_name
            from
            am_condemn_supplier_rate_master as comdem_supp
            left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno =comdem_supp.supplier_slno
            left join am_condemnation_category_mast on am_condemnation_category_mast.category_slno =comdem_supp.category_slno
            left join am_condemn_quality_master on am_condemn_quality_master.quality_slno =comdem_supp.quality_slno
            left join am_condemnation_quantity_unit on am_condemnation_quantity_unit.condem_quantity_slno =comdem_supp.quantity_unit_slno
            where comdem_supp.supplier_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

   
    SupplierRateUpdate: (dataArray, callback) => {
    const updatePromises = dataArray.map(values => {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE am_condemn_supplier_rate_master SET 
                    supplier_slno = ?, 
                    category_slno = ?, 
                    quality_slno = ?, 
                    quantity_unit_slno = ?, 
                    unit = ?, 
                    price = ?, 
                    supplier_status = ?, 
                    edit_user = ? 
                 WHERE 
                    condemn_rate_slno = ?`,
                values, 
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    });

    Promise.all(updatePromises)
        .then(results => callback(null, results))
        .catch(err => callback(err));
},


    getActiveCategory: (callback) => {
        pool.query(
            `SELECT 
            category_slno,
            category_name
            FROM
            am_condemnation_category_mast
            where category_status = 1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

        getActiveQuality: (callback) => {
        pool.query(
            `SELECT 
            quality_slno,
            quality_name
            FROM
            am_condemn_quality_master
            where quality_status = 1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    getActiveQuantity: (callback) => {
        pool.query(
            `SELECT 
            condem_quantity_slno,
            condem_quantity_name
            FROM
            am_condemnation_quantity_unit
            where condem_quantity_status = 1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    

        getSelectedSupplierRates: (id, callBack) => {
        pool.query(
            `select 
            condemn_rate_slno, 
            comdem_supp.category_slno,
            comdem_supp.supplier_slno,
            comdem_supp.quality_slno,
            quantity_unit_slno,
            comdem_supp.supplier_status,
            it_bill_supplier_details_mast.it_supplier_name as supplier_name,
            am_condemnation_category_mast.category_name as category_name,
            quality_name,
            unit,
            condem_quantity_name,
            price
            from
            am_condemn_supplier_rate_master as comdem_supp
            left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno =comdem_supp.supplier_slno
            left join am_condemnation_category_mast on am_condemnation_category_mast.category_slno =comdem_supp.category_slno
            left join am_condemn_quality_master on am_condemn_quality_master.quality_slno =comdem_supp.quality_slno
            left join am_condemnation_quantity_unit on am_condemnation_quantity_unit.condem_quantity_slno =comdem_supp.quantity_unit_slno
            where comdem_supp.supplier_status=1
            and
            comdem_supp.supplier_slno=? `,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

        getActiveScarpLocation: (callback) => {
        pool.query(
            `SELECT 
            yard_slno,
            yard_name
            FROM
            am_condemn_scrap_yard
            where yard_status = 1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
        scraplevelInsert: (data, callback) => {
        pool.query(
            `INSERT INTO am_scrap_form_approval_levels
          ( 
            level_no,
            level_name,
            emp_id,
            bill_generation_payment, 
            gate_pass_generation,
            gate_pass_approval,
            clearance_level,
            level_status,
            create_user
         
          )
          VALUES(?,?,?,?,?,?,?,?,?)`,
            [
            data.level_no,
            data.level_name,
            data.emp_id,
            data.bill_generation_payment, 
            data.gate_pass_generation,
            data.gate_pass_approval,
            data.clearance_level,
            data.level_status,
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
    getScraplevels: (callback) => {
        pool.query(
          ` SELECT
            em_name,
            level_slno, 
            level_no,
            level_name,
            emp_id,
            sec_id,
            bill_generation_payment,
            gate_pass_generation,
            gate_pass_approval, 
            clearance_level,
            level_status,
            CASE 
            WHEN bill_generation_payment = 1 THEN 'Yes'
            ELSE 'No'
            END AS bill_generation_payment_status,
            CASE 
            WHEN gate_pass_generation = 1 THEN "Yes"
            ELSE "No"
            END AS  gate_pass_generation_status,
            CASE 
            WHEN gate_pass_approval =1 THEN "Yes"
            ELSE "No"
            END AS gate_pass_approval_status,
            CASE 
            WHEN clearance_level =1 THEN "Yes"
            ELSE "No"
            END AS clearance_level_status,
            CASE 
            WHEN level_status =1 THEN "Yes"
            ELSE "No"
            END AS scrap_level_status, 
            sec_name
            from 
            am_scrap_form_approval_levels
            left join co_employee_master on co_employee_master.em_id = am_scrap_form_approval_levels.emp_id
            left join co_deptsec_mast on co_deptsec_mast.sec_id =co_employee_master.em_dept_section
            order by level_no asc
                        `, 
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

        getScraplevelUpdate: (data, callback) => {
                  pool.query(
            `UPDATE am_scrap_form_approval_levels SET                   
            level_no=?,
            level_name=?,
            emp_id=?,
            bill_generation_payment=?,
            gate_pass_generation=?,
            gate_pass_approval=?,
            clearance_level=?,
            level_status=?,
            edit_user=?   
            WHERE 
            level_slno=?`,
            [
                data.level_no,
                data.level_name,
                data.emp_id,
                data.bill_generation_payment,
                data.gate_pass_generation,
                data.gate_pass_approval,
                data.clearance_level,
                data.level_status,
                data.edit_user,
                data.level_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
        getScrapActivelevels: (callback) => {
        pool.query(
          ` select 
            level_no
            from
            am_scrap_form_approval_levels
            where
            level_status = 1 `, 
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

        getEmployeeScrapLevel: (id, callBack) => {
            
        pool.query(
            `select 
             level_slno,
             level_no, 
             level_name, emp_id, bill_generation_payment, gate_pass_generation, gate_pass_approval,
             clearance_level, level_status
             from 
             am_scrap_form_approval_levels
             where
             emp_id = ?
             and level_status = 1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

     getScrapActiveToplevel: (callback) => {
        pool.query(
          ` select 
            level_no
            from
            am_scrap_form_approval_levels
            where
            level_status = 1 
            order by level_no desc
            limit 1
             `, 
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },


        getscrapItemRateDetail: (data, callback) => {

        pool.query(       
            `SELECT 
            scrap_rate_slno, 
            condem_form_slno, 
            units, 
            quantity_slno,
            scrap_rate,
            category_name,
            quality_name,
            condem_quantity_name
            FROM am_scrap_condemn_rate_details
            LEFT JOIN 
            am_condemnation_category_mast cat ON cat.category_slno = am_scrap_condemn_rate_details.category_slno
            LEFT JOIN 
            am_condemn_quality_master q ON q.quality_slno = am_scrap_condemn_rate_details.quality_slno
            LEFT JOIN 
            am_condemnation_quantity_unit u ON u.condem_quantity_slno = am_scrap_condemn_rate_details.quantity_slno
            where
            condem_form_slno=?`,
            [

                data.ScrapFormNo
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    RemoveItemFromCategorized: (data, callback) => {
    pool.query(
        `UPDATE am_condemnation_details SET                   
            scrap_category = ?, 
            scrap_quality = ?, 
            scrap_yard = ?, 
            scarp_categorize = ?
        WHERE 
            am_condem_detail_slno = ?`,
        [
            data.scrap_category,
            data.scrap_quality,
            data.scrap_yard,
            data.scarp_categorize,
            data.am_condem_detail_slno
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
},





      RemoveAddedItemFromCategorized: (data, callback) => {       
             pool.query(
            `UPDATE am_condemnation_added_items SET                   
            scrap_category=?,
            scrap_quality=?,
            scrap_yard=?,
            scrap_categorize=?
            WHERE 
            item_slno=?`,
            [
                data.scrap_category,
                data.scrap_quality,
                data.scrap_yard,
                data.scrap_categorize,
                data.item_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    

}


