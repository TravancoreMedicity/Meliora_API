const { pool } = require("../../config/database");


module.exports = {

    createHighlightTypeService: (data, callback) => {

        const sql = `
        INSERT INTO canteen_highlight_type_master
        (
            highlight_name,
            highlight_code,
            description,
            icon,
            color_code,
            active_status
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

        pool.query(
            sql,
            [
                data.highlight_name,
                data.highlight_code,
                data.description,
                data.icon,
                data.color_code,
                data.active_status
            ],
            (err, results) => {

                if (err) {
                    // DUPLICATE ENTRY
                    if (err.code === 'ER_DUP_ENTRY') {
                        return callback(null, {
                            success: 0,
                            message: 'Highlight Code Already Exists'
                        });
                    }

                    // OTHER ERRORS
                    return callback(null, {
                        success: 0,
                        message: 'Database Error',
                        error: err
                    });
                }
                // SUCCESS
                return callback(null, {
                    success: 1,
                    message: 'Highlight Added Successfully',
                    data: results
                });
            }
        );
    },
    UpdateHighLightType: (data, callback) => {

        const sql = `
        UPDATE canteen_highlight_type_master
        SET
            highlight_name = ?,
            highlight_code = ?,
            description = ?,
            icon = ?,
            color_code = ?,
            active_status = ?
        WHERE highlight_type_id = ?
    `;

        pool.query(
            sql,
            [
                data.highlight_name,
                data.highlight_code,
                data.description,
                data.icon,
                data.color_code,
                data.active_status,
                data.highlight_type_id
            ],
            (err, results) => {

                // DUPLICATE ENTRY
                if (err) {

                    if (err.code === 'ER_DUP_ENTRY') {

                        return callback(null, {
                            success: 0,
                            message: 'Highlight Code Already Exists'
                        });
                    }

                    // OTHER MYSQL ERRORS
                    return callback(err);
                }

                // NO ROW UPDATED
                if (results.affectedRows === 0) {

                    return callback(null, {
                        success: 0,
                        message: 'Highlight Not Found'
                    });
                }

                // SUCCESS
                return callback(null, {
                    success: 1,
                    message: 'Highlight Updated Successfully',
                    data: results
                });
            }
        );
    },
    getHighlightTypesService: (callback) => {

        const sql = `
            SELECT *
            FROM canteen_highlight_type_master
            WHERE active_status = 1
        `;

        pool.query(sql, [], (err, results) => {

            if (err) {
                return callback(err);
            }

            return callback(null, results);
        });
    },



    getTodaySpecialItemsService: (callback) => {

        const sql = `
            SELECT
                mp.mapping_id,
                im.item_id,
                im.item_name,
                mp.title,
                hm.highlight_name
            FROM canteen_item_highlight_mapping mp

            INNER JOIN item_master im
                ON im.item_id = mp.item_id

            INNER JOIN canteen_highlight_type_master hm
                ON hm.highlight_type_id = mp.highlight_type_id

            WHERE hm.highlight_code = 'TODAY_SPECIAL'
            AND mp.active_status = 1
            AND NOW() BETWEEN mp.start_date AND mp.end_date

            ORDER BY mp.display_priority ASC
        `;

        pool.query(sql, [], (err, results) => {

            if (err) {
                return callback(err);
            }

            return callback(null, results);
        });
    }

};