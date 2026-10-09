const { pool } = require("../../config/database");


module.exports = {

    createItemHighlightService: (data, callback) => {

        const sql = `
            INSERT INTO canteen_item_highlight_mapping
            (
                item_id,
                highlight_type_id,
                title,
                display_priority,
                start_date,
                end_date,
                active_status,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        pool.query(
            sql,
            [
                data.item_id,
                data.highlight_type_id,
                data.title,
                data.display_priority,
                data.start_date,
                data.end_date,
                data.active_status,
                data.created_by
            ],
            (err, results) => {

                if (err) {
                    return callback(err);
                }

                return callback(null, results);
            }
        );
    },

    getItemHighlightsService: (callback) => {

        const sql = `
            SELECT
                mp.mapping_id,
                mp.item_id,
                im.item_name,
                mp.highlight_type_id,
                hm.highlight_name,
                mp.title,
                mp.display_priority,
                mp.start_date,
                mp.end_date,
                mp.active_status

            FROM canteen_item_highlight_mapping mp

            INNER JOIN item_master im
                ON im.item_id = mp.item_id

            INNER JOIN canteen_highlight_type_master hm
                ON hm.highlight_type_id = mp.highlight_type_id

            ORDER BY mp.display_priority ASC
        `;

        pool.query(sql, [], (err, results) => {

            if (err) {
                return callback(err);
            }

            return callback(null, results);
        });
    },

    updateItemHighlightService: (data, callback) => {

        const sql = `
            UPDATE canteen_item_highlight_mapping
            SET
                item_id = ?,
                highlight_type_id = ?,
                title = ?,
                display_priority = ?,
                start_date = ?,
                end_date = ?,
                active_status = ?
            WHERE mapping_id = ?
        `;

        pool.query(
            sql,
            [
                data.item_id,
                data.highlight_type_id,
                data.title,
                data.display_priority,
                data.start_date,
                data.end_date,
                data.active_status,
                data.mapping_id
            ],
            (err, results) => {

                if (err) {
                    return callback(err);
                }

                return callback(null, results);
            }
        );
    },

    deleteItemHighlightService: (mapping_id, callback) => {

        const sql = `
            DELETE FROM canteen_item_highlight_mapping
            WHERE mapping_id = ?
        `;

        pool.query(sql, [mapping_id], (err, results) => {

            if (err) {
                return callback(err);
            }

            return callback(null, results);
        });
    },

    getTodaySpecialItemsService: (callback) => {

        const sql = `
            SELECT
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