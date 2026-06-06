const { executeQuery } = require("../Canteen_Orders/Helper");


module.exports = {

    /* CREATE */
    insertExtraOrder: (values, callback) => {
        const query = `
        INSERT INTO patient_extra_order (
            patient_id,
            item_id,
            quantity,
            order_status,
            price,
            gst,
            gst_amount,
            created_by
        ) VALUES ?
    `;

        executeQuery(query, [values], callback);
    },

    /* GET ALL (WITH CURSOR PAGINATION) */
    getExtraOrders: (status, lastTime, lastId, limit, callback) => {

        let values = [status];
        let cursorCondition = "";

        if (lastTime && lastId) {
            cursorCondition = `
                AND (
                    peo.order_time > ?
                    OR (peo.order_time = ? AND peo.extra_order_id > ?)
                )
            `;
            values.push(lastTime, lastTime, lastId);
        }

        const query = `
            SELECT 
                peo.*,

                ip.fb_ptc_name,
                ip.fb_pt_no,

                im.item_name,
                im.item_code,

                ig.group_name,
                ic.category_name

            FROM patient_extra_order peo

            LEFT JOIN fb_ipadmiss ip 
                ON peo.patient_id = ip.fb_ipad_slno

            LEFT JOIN item_master im 
                ON peo.item_id = im.item_id

            LEFT JOIN item_group_master ig
                ON im.item_group_id = ig.item_group_id

            LEFT JOIN item_category_master ic
                ON im.item_category_id = ic.item_category_id

            WHERE peo.order_status = ?
            AND peo.is_active = TRUE
            ${cursorCondition}

            ORDER BY 
                peo.order_time ASC,
                peo.extra_order_id ASC

            LIMIT ?
        `;

        values.push(Number(limit));

        executeQuery(query, values, callback);
    },

    /* GET SINGLE */
    getExtraOrderSingle: (id, status, callback) => {
        const query = `
            SELECT 
                peo.*,

                ip.fb_ptc_name,
                ip.fb_pt_no,

                im.item_name,
                im.item_code,
                im.description,

                ig.group_name,
                ic.category_name,

                cip.price,
                cip.gst_rate,
                cip.discount,
                cip.discount_rate

            FROM patient_extra_order peo

            LEFT JOIN fb_ipadmiss ip 
                ON peo.patient_id = ip.fb_ipad_slno

            LEFT JOIN item_master im 
                ON peo.item_id = im.item_id

            LEFT JOIN item_group_master ig
                ON im.item_group_id = ig.item_group_id

            LEFT JOIN item_category_master ic
                ON im.item_category_id = ic.item_category_id

            LEFT JOIN canteen_item_price cip
                ON peo.item_id = cip.item_id
                AND cip.party_type_id = 2

            WHERE peo.patient_id = ? and order_status = ?
        `;

        executeQuery(query, [id, status], callback);
    },

    /* UPDATE STATUS */
    updateStatusBulk: (orders, status, updated_by, callback) => {

        if (!Array.isArray(orders) || orders.length === 0) {
            return callback(null);
        }

        const ids = orders
            .map(o => o.extra_order_id)
            .filter(Boolean);

        if (ids.length === 0) return callback(null);

        const query = `
        UPDATE patient_extra_order
        SET order_status = ?, updated_by = ?
        WHERE extra_order_id IN (${ids.map(() => '?').join(',')})
    `;

        const values = [
            status || 'CONFIRMED',
            updated_by,
            ...ids
        ];

        executeQuery(query, values, callback);
    },

    /* CANCEL */
    cancelOrder: (id, updated_by, callback) => {
        const query = `
            UPDATE patient_extra_order
            SET order_status = 'CANCELLED', updated_by = ? ,is_active = 0
            WHERE extra_order_id = ?
        `;

        executeQuery(query, [updated_by, id], callback);
    },

    /* DELETE (SOFT DELETE) */
    deleteOrder: (id, callback) => {
        const query = `
            UPDATE patient_extra_order
            SET is_active = FALSE
            WHERE extra_order_id = ?
        `;

        executeQuery(query, [id], callback);
    }
};