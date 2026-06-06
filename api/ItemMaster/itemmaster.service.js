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
            item_type_id,
            is_active
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
                (item_name,item_group_id,item_category_id,item_alias,item_code,description,item_type_id,is_active,created_by)
                VALUES (?,?,?,?,?,?,?,?,?)`,
                    [
                        item_name,
                        item_group_id,
                        item_category_id,
                        item_alias,
                        item_code,
                        description,
                        item_type_id,
                        is_active,
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
    im.description,
    im.item_alias,
    im.item_code,
    im.is_active,

    ig.item_group_id,
    ig.group_name,

    itm.item_type_id,
    itm.item_type_name,

    ic.item_category_id,
    ic.category_name,

    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'recipe_id', ir.recipe_id,
                'ingredient_item_id', ir.ingredient_item_id,
                'ingredient_name', ing.item_name,
                'quantity', ir.quantity,
                'unit_id', u.unit_id,
                'unit_name', u.unit_name
            )
        )
        FROM item_recipe ir
        LEFT JOIN item_master ing
            ON ing.item_id = ir.ingredient_item_id
        LEFT JOIN unit_master u
            ON u.unit_id = ir.unit_id
        WHERE ir.item_id = im.item_id
          AND ir.is_active = 1
    ) AS ingredients,

    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'price_id', cip.price_id,
                'party_type_id', cip.party_type_id,
                'party_name', opt.party_name,
                'price', cip.price,
                'gst_rate', cip.gst_rate,
                'discount', cip.discount,
                'discount_rate', cip.discount_rate
            )
        )
        FROM canteen_item_price cip
        LEFT JOIN order_party_type opt
            ON opt.party_type_id = cip.party_type_id
        WHERE cip.item_id = im.item_id
          AND cip.is_active = 1
    ) AS item_prices

FROM item_master im

LEFT JOIN item_group_master ig
    ON ig.item_group_id = im.item_group_id
    AND ig.is_active = 1

LEFT JOIN item_category_master ic
    ON ic.item_category_id = im.item_category_id
    AND ic.is_active = 1

LEFT JOIN item_type itm
    ON itm.item_type_id = im.item_type_id

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
                im.item_type_id,
                im.is_active,

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

                -- HIGHLIGHT DETAILS

                hm.mapping_id,
                hm.highlight_type_id,
                hm.title AS highlight_title,
                hm.display_priority,
                hm.start_date,
                hm.end_date,

                htm.highlight_name,
                htm.highlight_code,
                htm.description AS highlight_description,
                htm.icon AS highlight_icon,
                htm.color_code,

                -- PRICE DETAILS

                price_data.price_details

            FROM item_master im

            -- GROUP

            LEFT JOIN item_group_master ig
                ON ig.item_group_id = im.item_group_id
                AND ig.is_active = 1

            -- CATEGORY

            LEFT JOIN item_category_master ic
                ON ic.item_category_id = im.item_category_id
                AND ic.is_active = 1

            -- RECIPE

            LEFT JOIN item_recipe ir
                ON ir.item_id = im.item_id
                AND ir.is_active = 1

            -- INGREDIENT

            LEFT JOIN item_master ing
                ON ing.item_id = ir.ingredient_item_id

            -- UNIT

            LEFT JOIN unit_master u
                ON u.unit_id = ir.unit_id
                AND u.is_active = 1

            -- NUTRITION

            LEFT JOIN item_nutrition nut
                ON nut.item_id = im.item_id
                AND nut.is_active = 1

            -- HIGHLIGHT MAPPING

            LEFT JOIN canteen_item_highlight_mapping hm
                ON hm.item_id = im.item_id
                AND hm.active_status = 1
                AND (
                    hm.start_date IS NULL
                    OR hm.start_date <= NOW()
                )
                AND (
                    hm.end_date IS NULL
                    OR hm.end_date >= NOW()
                )

            -- HIGHLIGHT MASTER

            LEFT JOIN canteen_highlight_type_master htm
                ON htm.highlight_type_id = hm.highlight_type_id
                AND htm.active_status = 1

            -- PRICE DETAILS

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
                hm.display_priority,
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
    getFoodandBeverage: (callBack) => {
        pool.query(
            `
                SELECT
                    im.item_id,
                    im.item_name,
                    im.item_code,
                    im.item_alias,
                    im.description,
                    im.item_type_id,
                    im.is_active,

                    -- GROUP DETAILS

                    ig.item_group_id,
                    ig.group_name,

                    -- CATEGORY DETAILS

                    ic.item_category_id,
                    ic.category_name,

                    -- NUTRITION DETAILS

                    nut.calories_kcal,
                    nut.protein_g,
                    nut.carbohydrates_g,
                    nut.fat_g,
                    nut.fiber_g,
                    nut.sodium_mg,

                    -- HIGHLIGHT DETAILS

                    hm.mapping_id,
                    hm.highlight_type_id,
                    hm.title AS highlight_title,
                    hm.display_priority,
                    hm.start_date,
                    hm.end_date,

                    htm.highlight_name,
                    htm.highlight_code,
                    htm.description AS highlight_description,
                    htm.icon AS highlight_icon,
                    htm.color_code,

                    -- PRICE DETAILS

                    price_data.price_details

                FROM item_master im

                -- GROUP

                LEFT JOIN item_group_master ig
                    ON ig.item_group_id = im.item_group_id
                    AND ig.is_active = 1

                -- CATEGORY

                LEFT JOIN item_category_master ic
                    ON ic.item_category_id = im.item_category_id
                    AND ic.is_active = 1

                -- NUTRITION

                LEFT JOIN item_nutrition nut
                    ON nut.item_id = im.item_id
                    AND nut.is_active = 1

                -- HIGHLIGHT MAPPING

                LEFT JOIN canteen_item_highlight_mapping hm
                    ON hm.item_id = im.item_id
                    AND hm.active_status = 1
                    AND (
                        hm.start_date IS NULL
                        OR hm.start_date <= NOW()
                    )
                    AND (
                        hm.end_date IS NULL
                        OR hm.end_date >= NOW()
                    )

                -- HIGHLIGHT MASTER

                LEFT JOIN canteen_highlight_type_master htm
                    ON htm.highlight_type_id = hm.highlight_type_id
                    AND htm.active_status = 1

                -- PRICE DETAILS

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
                    hm.display_priority,
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

        const {
            item_id,
            item_name,
            item_group_id,
            item_category_id,
            item_alias,
            item_code,
            description,
            created_by,
            ingredients = [],
            itemrate = [],
            item_type_id,
            is_active
        } = data;

        pool.getConnection((err, connection) => {
            if (err) {
                return callBack({
                    stage: "DB_CONNECTION",
                    message: err
                });
            }
            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    return callBack({
                        stage: "TRANSACTION_START",
                        message: err
                    });
                }

                /*UPDATE ITEM MASTER*/

                connection.query(
                    `
                UPDATE item_master
                SET
                    item_name = ?,
                    item_group_id = ?,
                    item_category_id = ?,
                    item_alias = ?,
                    item_code = ?,
                    description = ?,
                    item_type_id = ?,
                    updated_by = ?,
                    is_active = ?,
                    updated_at = NOW()
                WHERE item_id = ?
                `,
                    [
                        item_name,
                        item_group_id,
                        item_category_id,
                        item_alias,
                        item_code,
                        description,
                        item_type_id,
                        created_by,
                        is_active,
                        item_id
                    ],
                    (error) => {

                        if (error) {

                            let customMessage = error;

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
                                    stage: "ITEM_UPDATE",
                                    message: customMessage
                                });

                            });
                        }

                        processIngredients();
                    }
                );


                // INGREDIENTS


                function processIngredients() {

                    const existingRecipeIds = ingredients
                        .filter(i => i.recipe_id)
                        .map(i => i.recipe_id);

                    /* DEACTIVATE REMOVED INGREDIENTS */

                    let deactivateQuery = `
                    UPDATE item_recipe
                    SET
                        is_active = 0,
                        updated_by = ?,
                        updated_at = NOW()
                    WHERE item_id = ?
                `;

                    let deactivateParams = [
                        created_by,
                        item_id
                    ];

                    if (existingRecipeIds.length > 0) {

                        deactivateQuery += `
                        AND recipe_id NOT IN (?)
                    `;

                        deactivateParams.push(existingRecipeIds);
                    }

                    connection.query(
                        deactivateQuery,
                        deactivateParams,
                        (err) => {

                            if (err) {

                                return connection.rollback(() => {

                                    connection.release();

                                    callBack({
                                        stage: "DEACTIVATE_INGREDIENTS",
                                        message: err
                                    });

                                });
                            }

                            updateIngredientLoop(0);
                        }
                    );
                }

                function updateIngredientLoop(index) {

                    if (index >= ingredients.length) {
                        return processRates();
                    }

                    const ingredient = ingredients[index];

                    /* EXISTING INGREDIENT */

                    if (ingredient.recipe_id) {

                        connection.query(
                            `
                        UPDATE item_recipe
                        SET
                            ingredient_item_id = ?,
                            quantity = ?,
                            unit_id = ?,
                            is_active = 1,
                            updated_by = ?,
                            updated_at = NOW()
                        WHERE recipe_id = ?
                        `,
                            [
                                ingredient.ingredient_item_id,
                                ingredient.quantity,
                                ingredient.unit_id,
                                created_by,
                                ingredient.recipe_id
                            ],
                            (err) => {

                                if (err) {

                                    return connection.rollback(() => {

                                        connection.release();

                                        callBack({
                                            stage: "UPDATE_INGREDIENT",
                                            message: err
                                        });

                                    });
                                }

                                updateIngredientLoop(index + 1);
                            }
                        );
                    }

                    /* NEW INGREDIENT */

                    else {

                        connection.query(
                            `
                        INSERT INTO item_recipe
                        (
                            item_id,
                            ingredient_item_id,
                            quantity,
                            unit_id,
                            is_active,
                            created_by
                        )
                        VALUES (?,?,?,?,?,?)
                        `,
                            [
                                item_id,
                                ingredient.ingredient_item_id,
                                ingredient.quantity,
                                ingredient.unit_id,
                                1,
                                created_by
                            ],
                            (err) => {

                                if (err) {

                                    return connection.rollback(() => {

                                        connection.release();

                                        callBack({
                                            stage: "INSERT_INGREDIENT",
                                            message: err
                                        });

                                    });
                                }

                                updateIngredientLoop(index + 1);
                            }
                        );
                    }
                }


                // RATES


                function processRates() {

                    const existingPriceIds = itemrate
                        .filter(r => r.price_id)
                        .map(r => r.price_id);

                    /* DEACTIVATE REMOVED RATES */

                    let deactivateQuery = `
                    UPDATE canteen_item_price
                    SET
                        is_active = 0,
                        updated_by = ?,
                        updated_at = NOW()
                    WHERE item_id = ?
                `;

                    let deactivateParams = [
                        created_by,
                        item_id
                    ];

                    if (existingPriceIds.length > 0) {

                        deactivateQuery += `
                        AND price_id NOT IN (?)
                    `;

                        deactivateParams.push(existingPriceIds);
                    }

                    connection.query(
                        deactivateQuery,
                        deactivateParams,
                        (err) => {

                            if (err) {

                                return connection.rollback(() => {

                                    connection.release();

                                    callBack({
                                        stage: "DEACTIVATE_RATES",
                                        message: err
                                    });

                                });
                            }

                            updateRateLoop(0);
                        }
                    );
                }

                function updateRateLoop(index) {

                    if (index >= itemrate.length) {
                        return commit();
                    }

                    const rate = itemrate[index];

                    /* EXISTING RATE */

                    if (rate.price_id) {

                        connection.query(
                            `
                        UPDATE canteen_item_price
                        SET
                            party_type_id = ?,
                            price = ?,
                            gst_rate = ?,
                            discount = ?,
                            discount_rate = ?,
                            is_active = 1,
                            updated_by = ?,
                            updated_at = NOW()
                        WHERE price_id = ?
                        `,
                            [
                                rate.party_type_id,
                                rate.price,
                                rate.gst_rate,
                                rate.discount,
                                rate.discount_rate,
                                created_by,
                                rate.price_id
                            ],
                            (err) => {

                                if (err) {

                                    return connection.rollback(() => {

                                        connection.release();

                                        callBack({
                                            stage: "UPDATE_RATE",
                                            message: err
                                        });

                                    });
                                }

                                updateRateLoop(index + 1);
                            }
                        );
                    }

                    /* NEW RATE */

                    else {

                        connection.query(
                            `
                        INSERT INTO canteen_item_price
                        (
                            item_id,
                            party_type_id,
                            price,
                            gst_rate,
                            discount,
                            discount_rate,
                            is_active,
                            created_by
                        )
                        VALUES (?,?,?,?,?,?,?,?)
                        `,
                            [
                                item_id,
                                rate.party_type_id,
                                rate.price,
                                rate.gst_rate,
                                rate.discount,
                                rate.discount_rate,
                                1,
                                created_by
                            ],
                            (err) => {

                                if (err) {

                                    return connection.rollback(() => {

                                        connection.release();

                                        callBack({
                                            stage: "INSERT_RATE",
                                            message: err
                                        });

                                    });
                                }

                                updateRateLoop(index + 1);
                            }
                        );
                    }
                }

                /* =====================================================
                   COMMIT
                ====================================================== */

                function commit() {

                    connection.commit(err => {

                        if (err) {

                            return connection.rollback(() => {

                                connection.release();

                                callBack({
                                    stage: "COMMIT",
                                    message: err
                                });

                            });
                        }

                        connection.release();

                        callBack(null, {
                            success: 1,
                            item_id
                        });

                    });
                }

            });

        });

    },
    checkAliasAndCodeExists: (item_alias, item_code, callback) => {
        pool.query(
            `SELECT item_alias, item_code
         FROM item_master
         WHERE item_alias = ? OR item_code = ?`,
            [item_alias, item_code],
            (err, results) => {
                if (err) {
                    return callback(err);
                }

                const aliasExists = results.some(
                    row => row.item_alias === item_alias
                );

                const codeExists = results.some(
                    row => row.item_code === item_code
                );

                callback(null, {
                    aliasExists,
                    codeExists
                });
            }
        );
    },

};



