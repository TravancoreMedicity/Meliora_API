const { pool } = require('../../config/database');

module.exports = {

    insertItemMaster: (data, callBack) => {
        const {
            item_name,
            item_group_id,
            item_category_id,
            item_alias,
            item_code,
            description,
            created_by,
            ingredients,
            itemrate,
            item_type_id
        } = data;

        pool.getConnection((err, connection) => {
            if (err) return callBack({ stage: "DB_CONNECTION", message: err });

            let itemId; //  Declare globally for this transaction

            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    return callBack({ stage: "TRANSACTION_START", message: err });
                }
                // 1 INSERT ITEM MASTER
                connection.query(
                    `INSERT INTO item_master
                (item_name,item_group_id,item_category_id,item_alias,item_code,description,item_type_id,created_by)
                VALUES (?,?,?,?,?,?,?,?)`,
                    [
                        item_name,
                        item_group_id,
                        item_category_id,
                        item_alias,
                        item_code,
                        description,
                        item_type_id,
                        created_by
                    ],
                    (error, result) => {
                        if (error) {
                            let customMessage = error;
                            // Duplicate entry handling
                            if (error.code === "ER_DUP_ENTRY") {

                                if (error.sqlMessage.includes("item_name")) {
                                    customMessage = "Food item name already exists";
                                }
                                else if (error.sqlMessage.includes("item_alias")) {
                                    customMessage = "Item alias already exists";
                                }
                                else if (error.sqlMessage.includes("item_code")) {
                                    customMessage = "Item code already exists";
                                }
                                else {
                                    customMessage = "Duplicate entry found";
                                }
                            }
                            return connection.rollback(() => {
                                connection.release();
                                callBack({
                                    stage: "ITEM_INSERT",
                                    message: customMessage
                                });
                            });
                        }
                        itemId = result.insertId;

                        insertIngredients(itemId, () => {
                            insertRates(itemId, commit);
                        });
                    }
                );

                // 2 INSERT INGREDIENTS
                function insertIngredients(itemId, next) {
                    if (!ingredients || ingredients.length === 0) {
                        return next();
                    }
                    const values = ingredients.map(i => [
                        itemId,
                        i.ingredient_item_id,
                        i.quantity,
                        i.unit_id,
                        created_by
                    ]);

                    connection.query(
                        `INSERT INTO item_recipe
                    (item_id,ingredient_item_id,quantity,unit_id,created_by)
                    VALUES ?`,
                        [values],
                        (err) => {

                            if (err) {

                                return connection.rollback(() => {

                                    connection.release();

                                    callBack({
                                        stage: "INGREDIENT_INSERT",
                                        message: err
                                    });

                                });

                            }
                            next();
                        }
                    );
                }
                // 3INSERT RATES
                function insertRates(itemId, next) {
                    if (!itemrate || itemrate.length === 0) {
                        return next();
                    }

                    const values = itemrate.map(r => [
                        itemId,
                        r.party_type_id,
                        r.price,
                        r.gst_rate,
                        r.discount,
                        r.discount_rate,
                        created_by
                    ]);

                    connection.query(
                        `INSERT INTO canteen_item_price
                    (item_id,party_type_id,price,gst_rate,discount,discount_rate,created_by)
                    VALUES ?`,
                        [values],
                        (err) => {

                            if (err) {

                                return connection.rollback(() => {

                                    connection.release();

                                    callBack({
                                        stage: "RATE_INSERT",
                                        message: err
                                    });

                                });

                            }
                            next();
                        }
                    );
                }
                // 4COMMIT
                function commit() {
                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                callBack({
                                    stage: "TRANSACTION_COMMIT",
                                    message: err
                                });
                            });
                        }
                        connection.release();
                        callBack(null, {
                            item_id: itemId
                        });
                    });
                }
            });
        });
    },
    getAllItemMaster: (callBack) => {
        pool.query(
            `SELECT
                im.item_id,
                im.item_name,

                ig.item_group_id,
                ig.group_name,

                ic.item_category_id,
                ic.category_name,

                ir.ingredient_item_id,
                ing.item_name AS ingredient_name,

                ir.quantity,
                u.unit_name

            FROM item_master im

            LEFT JOIN item_group_master ig
                ON ig.item_group_id = im.item_group_id
                AND ig.is_active = 1

            LEFT JOIN item_category_master ic
                ON ic.item_category_id = im.item_category_id
                AND ic.is_active = 1

            LEFT JOIN item_recipe ir
                ON ir.item_id = im.item_id
                AND ir.is_active = 1

            LEFT JOIN item_master ing
                ON ing.item_id = ir.ingredient_item_id

            LEFT JOIN unit_master u
                ON u.unit_id = ir.unit_id

            WHERE im.is_active = 1

            ORDER BY 
                ig.display_order,
                ic.display_order,
                im.item_name`,
            [],
            (error, results) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);

            }
        );

    },
    getItemFullDetail: (callBack) => {
        pool.query(
            `
                SELECT
                    im.item_id,
                    im.item_name,
                    im.item_code,
                    im.item_alias,
                    im.description,

                    ig.item_group_id,
                    ig.group_name,

                    ic.item_category_id,
                    ic.category_name,

                    ir.recipe_id,
                    ir.ingredient_item_id,
                    ing.item_name AS ingredient_name,
                    ir.quantity AS ingredient_qty,
                    u.unit_name AS ingredient_unit,
                    u.unit_code,

                    nut.calories_kcal,
                    nut.protein_g,
                    nut.carbohydrates_g,
                    nut.fat_g,
                    nut.fiber_g,
                    nut.sodium_mg,

                
                    price_data.price_details

                FROM item_master im

                -- GROUP
                LEFT JOIN item_group_master ig
                    ON ig.item_group_id = im.item_group_id
                    AND ig.is_active = 1


                LEFT JOIN item_category_master ic
                    ON ic.item_category_id = im.item_category_id
                    AND ic.is_active = 1


                LEFT JOIN item_recipe ir
                    ON ir.item_id = im.item_id
                    AND ir.is_active = 1


                LEFT JOIN item_master ing
                    ON ing.item_id = ir.ingredient_item_id


                LEFT JOIN unit_master u
                    ON u.unit_id = ir.unit_id
                    AND u.is_active = 1


                LEFT JOIN item_nutrition nut
                    ON nut.item_id = im.item_id
                    AND nut.is_active = 1


                LEFT JOIN (
                    SELECT
                        cip.item_id,

                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'party_type_id', opt.party_type_id,
                                'party_name', opt.party_name,
                                'price', cip.price,
                                'gst_rate', cip.gst_rate,
                                'discount', cip.discount,
                                'discount_rate', cip.discount_rate
                            )
                        ) AS price_details

                    FROM canteen_item_price cip

                    LEFT JOIN order_party_type opt
                        ON opt.party_type_id = cip.party_type_id
                        AND opt.is_active = 1

                    WHERE cip.is_active = 1

                    GROUP BY cip.item_id

                ) AS price_data
                    ON price_data.item_id = im.item_id

                WHERE im.is_active = 1

                ORDER BY 
                    ig.display_order,
                    ic.display_order,
                    im.item_name
    
                `,
            [],
            (error, results) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);

            }
        );

    },


    updateItemMaster: (data, callBack) => {

        pool.query(
            `UPDATE item_master
            SET
                item_name = ?,
                item_group_id = ?,
                item_category_id = ?,
                item_alias = ?,
                item_code = ?,
                description = ?,
                updated_by = ?
            WHERE item_id = ?`,
            [
                data.item_name,
                data.item_group_id,
                data.item_category_id,
                data.item_alias,
                data.item_code,
                data.description,
                data.updated_by,
                data.item_id
            ],
            (error, results) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);

            }
        );

    }

};



