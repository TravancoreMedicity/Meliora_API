const { pool } = require("../../config/database");


const executeQuery = (query, values = [], callback) => {
    pool.query(query, values, (err, results) => {
        if (err) {
            console.error("DB Error:", err);   // optional log
            return callback(err);
        }
        return callback(null, results);
    });
};

const round2 = value => Math.round((Number(value) + Number.EPSILON) * 100) / 100;

/*
    Turns a technical error into a safe message for the client.
    Our own validation errors (plain Error without a database .code) are shown as they are;
    anything coming from MySQL or the runtime gets the generic text. The full error is logged.
*/
const safeMessage = (err, fallback = "Something went wrong") => {
    // our own validation errors: one short line; anything else (database, runtime): full details
    if (err instanceof Error && !err.code && !err.sqlMessage && err.message) {
        console.warn("Request refused:", err.message);
        return err.message;
    }
    console.error("Request failed:", err);
    return fallback;
};

/*
    Never trust prices from the browser / phone.

    Validates the lines of an order and rebuilds price, gst and gst_amount from
    canteen_item_price for the order's party type.

    db        : pool or a connection inside a transaction (anything with .query)
    items     : [{ item_id, qty, type_slno?, patient_diet_id?, ... }]
    callback  : (err, pricedItems)  pricedItems keep every original field but
                qty / price / gst / gst_amount come from the server.
*/
const priceCanteenItems = (db, partyTypeId, items, callback) => {

    if (!Array.isArray(items) || items.length === 0) {
        return callback(new Error("No items to order"));
    }

    // identical lines (same item, meal and diet) are merged into one by adding the quantities
    const merged = new Map();

    for (const item of items) {

        const itemId = Number(item?.item_id);
        // some screens send `qty`, others `quantity`
        const qty = Number(item?.qty ?? item?.quantity);

        if (!Number.isInteger(itemId) || itemId <= 0) {
            return callback(new Error("Invalid item in the order"));
        }

        if (!Number.isInteger(qty) || qty < 1 || qty > 999) {
            return callback(new Error("Quantity must be a whole number between 1 and 999"));
        }

        const key = `${itemId}|${item?.type_slno ?? ""}|${item?.patient_diet_id ?? ""}`;

        if (merged.has(key)) {
            const existing = merged.get(key);
            existing.qty = Number(existing.qty) + qty;
        } else {
            merged.set(key, { ...item, qty });
        }
    }

    for (const line of merged.values()) {
        if (line.qty > 999) {
            return callback(new Error("Quantity must be a whole number between 1 and 999"));
        }
    }

    items = [...merged.values()];

    const itemIds = [...new Set(items.map(item => Number(item.item_id)))];

    db.query(
        `
        SELECT item_id, price, gst_rate
        FROM canteen_item_price
        WHERE party_type_id = ?
        AND item_id IN (?)
        `,
        [Number(partyTypeId), itemIds],
        (err, rows) => {

            if (err) {
                return callback(err);
            }

            const priceMap = new Map();

            // first row wins if an item has more than one price row for the party
            (rows || []).forEach(row => {
                if (!priceMap.has(Number(row.item_id))) {
                    priceMap.set(Number(row.item_id), row);
                }
            });

            const priced = [];

            for (const item of items) {

                const row = priceMap.get(Number(item.item_id));

                if (!row) {
                    return callback(
                        new Error(`Price is not set for item ${item.item_name || item.item_id}`)
                    );
                }

                const qty = Number(item.qty ?? item.quantity);
                const price = Number(row.price || 0);
                const gst = Number(row.gst_rate || 0);

                priced.push({
                    ...item,
                    qty,
                    price,
                    gst,
                    gst_amount: round2((price * qty * gst) / 100)
                });
            }

            return callback(null, priced);
        }
    );
};

module.exports = { executeQuery, round2, safeMessage, priceCanteenItems };
