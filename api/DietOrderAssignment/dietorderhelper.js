const getDietPrice = (delivery, connection, callback) => {

    const query = `
       SELECT
    -- Delivery Log
    ddl.delivery_id,
    ddl.patient_diet_id,
    ddl.item_id,
    ddl.delivered_qty,
    ddl.delivery_status,
    ddl.type_slno,
    ddl.source_type,

    -- Order
    co.canteen_order_id,
    co.party_type_id,
    co.admission_id,
    co.room_id,

    -- Patient
    ip.fb_ipad_slno,
    ip.fb_pt_no,
    ip.fb_ptc_name,

    -- Bed
    bed.fb_bed_slno,
    bed.fb_bdc_no,
    bed.fb_rt_code,

    -- Room Type
    rt.fb_rmtp_slno,
    rt.fb_rt_code,
    rt.fb_rc_code,

    -- Room Category
    rc.fb_rc_slno,
    rc.fb_rcc_desc,

    -- Diet Room Category
    drcm.diet_rm_category_slno,
    drcm.diet_rm_name,

    -- Diet
    pds.plan_id,
    pdp.diet_id,

    -- Price
    dpm.price_id,
    dpm.daily_rate,
    dpm.half_day_rate,
    dpm.gst_rate,

    -- Meal Price
    dpd.detail_id,
    dpd.meal_rate

FROM diet_delivery_log ddl

LEFT JOIN canteen_order co
    ON co.canteen_order_id = ddl.canteen_order_id

LEFT JOIN fb_ipadmiss ip
    ON ip.fb_ip_no = co.admission_id

LEFT JOIN fb_bed bed
    ON bed.fb_bed_slno = co.room_id

LEFT JOIN fb_room_type rt
    ON rt.fb_rt_code = bed.fb_rt_code

LEFT JOIN fb_room_category rc
    ON rc.fb_rc_code = rt.fb_rc_code

LEFT JOIN diet_room_category_master drcm
    ON JSON_CONTAINS(
        drcm.diet_rm_categories,
        JSON_ARRAY(rc.fb_rc_slno)
    )

LEFT JOIN patient_diet_schedule pds
    ON pds.patient_diet_id = ddl.patient_diet_id

LEFT JOIN patient_diet_plan pdp
    ON pdp.plan_id = pds.plan_id

LEFT JOIN diet_price_master dpm
    ON dpm.diet_id = pdp.diet_id
   AND dpm.party_type_id = co.party_type_id
   AND dpm.diet_rm_category_slno = drcm.diet_rm_category_slno
   AND dpm.is_active = 1

LEFT JOIN diet_price_detail dpd
    ON dpd.price_id = dpm.price_id
   AND dpd.type_slno = ddl.type_slno
   AND dpd.is_active = 1

WHERE ddl.delivery_id = ?;
    `;

    connection.query(query, [delivery.delivery_id], (err, result) => {

        if (err) {
            return callback({
                stage: "GET_DIET_PRICE",
                message: err
            });
        }

        if (result.length === 0) {
            return callback({
                stage: "GET_DIET_PRICE",
                message: "Diet price not found"
            });
        }

        const row = result[0];

        const quantity = Number(row.delivered_qty || 1);
        const unit_rate = Number(row.meal_rate);
        const gross_amount = unit_rate * quantity;
        const gst_rate = Number(row.gst_rate || 0);
        const gst_amount = (gross_amount * gst_rate) / 100;
        const net_amount = gross_amount + gst_amount;

        return callback(null, {
            admission_id: row.admission_id,
            patient_id: row.fb_pt_no,
            party_type_id: row.party_type_id,
            delivery_id: row.delivery_id,
            canteen_order_id: row.canteen_order_id,
            item_id: row.item_id,
            quantity,
            unit_rate,
            gross_amount,
            gst_rate,
            gst_amount,
            discount: 0,
            net_amount

        });

    });

};



const getCanteenOrderPrice = (delivery_id, connection, callback) => {

    const query = `
        SELECT
            ddl.delivery_id,
            ddl.item_id,
            ddl.delivered_qty,

            co.admission_id,
            co.party_type_id,

            ip.fb_pt_no,

            ddl.source_id AS canteen_order_item_id,

            coi.canteen_order_id,
            coi.price,
            coi.gst,
            coi.gst_amount

        FROM diet_delivery_log ddl

        INNER JOIN canteen_order_item coi
            ON coi.canteen_order_item_id = ddl.source_id

        INNER JOIN canteen_order co
            ON co.canteen_order_id = coi.canteen_order_id

        LEFT JOIN fb_ipadmiss ip
            ON ip.fb_ip_no = co.admission_id

        WHERE ddl.delivery_id = ?
          AND ddl.source_type = 'CANTEEN_ORDER'
        LIMIT 1
    `;

    connection.query(query, [delivery_id], (err, result) => {

        if (err) {
            return callback({
                stage: "GET_CANTEEN_PRICE",
                message: err
            });
        }

        if (!result.length) {
            return callback({
                stage: "GET_CANTEEN_PRICE",
                message: "Canteen item not found"
            });
        }

        const row = result[0];

        const quantity = Number(row.delivered_qty || 1);
        const unit_rate = Number(row.price || 0);

        const gross_amount = quantity * unit_rate;

        const gst_rate = Number(row.gst || 0);
        const gst_amount = Number(row.gst_amount || 0);

        const net_amount = gross_amount + gst_amount;

        return callback(null, {
            admission_id: row.admission_id,
            patient_id: row.fb_pt_no,
            party_type_id: row.party_type_id,

            delivery_id: row.delivery_id,
            canteen_order_id: row.canteen_order_id,
            item_id: row.item_id,

            quantity,
            unit_rate,

            gross_amount,

            gst_rate,
            gst_amount,

            discount: 0,

            net_amount,

            remarks: null
        });

    });

};

const getExtraOrderPrice = (delivery_id, connection, callback) => {

    const query = `
        SELECT
            ddl.delivery_id,
            ddl.item_id,
            ddl.delivered_qty,

            co.admission_id,
            co.party_type_id,

           ip.fb_pt_no,

            ddl.source_id AS extra_order_id,

            peo.price,
            peo.gst,
            peo.gst_amount,

            co.canteen_order_id

        FROM diet_delivery_log ddl

        INNER JOIN patient_extra_order peo
            ON peo.extra_order_id = ddl.source_id

        INNER JOIN canteen_order co
            ON co.canteen_order_id = ddl.canteen_order_id

        LEFT JOIN fb_ipadmiss ip
            ON ip.fb_ip_no = co.admission_id

        WHERE ddl.delivery_id = ?
          AND ddl.source_type = 'PATIENT_EXTRA_ORDER'
        LIMIT 1
    `;

    connection.query(query, [delivery_id], (err, result) => {

        if (err) {
            return callback({
                stage: "GET_EXTRA_ORDER_PRICE",
                message: err
            });
        }

        if (!result.length) {
            return callback({
                stage: "GET_EXTRA_ORDER_PRICE",
                message: "Extra order not found"
            });
        }

        const row = result[0];

       

        const quantity = Number(row.delivered_qty || 1);
        const unit_rate = Number(row.price || 0);

        const gross_amount = quantity * unit_rate;

        const gst_rate = Number(row.gst || 0);
        const gst_amount = Number(row.gst_amount || 0);

        const net_amount = gross_amount + gst_amount;

        return callback(null, {
            admission_id: row.admission_id,
            patient_id: row.fb_pt_no,
            party_type_id: row.party_type_id,

            delivery_id: row.delivery_id,
            canteen_order_id: row.canteen_order_id,
            item_id: row.item_id,

            quantity,
            unit_rate,

            gross_amount,

            gst_rate,
            gst_amount,

            discount: 0,

            net_amount,

            remarks: null
        });

    });

};

const insertServiceLedger = (ledgerData, empid, connection, callback) => {

    const {
        admission_id,
        patient_id,
        party_type_id,

        delivery_id,
        canteen_order_id,
        item_id,

        quantity,
        unit_rate,

        gross_amount,

        discount = 0,

        gst_rate,
        gst_amount,

        net_amount,

        remarks = null
    } = ledgerData;

    const checkQuery = `
        SELECT ledger_id
        FROM diet_service_ledger
        WHERE delivery_id = ?
        LIMIT 1
    `;

    connection.query(checkQuery, [delivery_id], (err, result) => {

        if (err) {
            return callback({
                stage: "CHECK_SERVICE_LEDGER",
                message: err
            });
        }

        // Already inserted
        if (result.length) {
            return callback(null, {
                success: 1,
                message: "Service ledger already exists"
            });
        }

        const insertQuery = `
            INSERT INTO diet_service_ledger
            (
                admission_id,
                pt_no,
                party_type_id,

                delivery_id,
                canteen_order_id,
                item_id,

                quantity,
                unit_rate,

                gross_amount,
                discount,

                gst_rate,
                gst_amount,

                net_amount,

                ledger_status,
                remarks,

                created_by
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?,
                ?, ?, ?
            )
        `;

        connection.query(
            insertQuery,
            [
                admission_id,
                patient_id,
                party_type_id,

                delivery_id,
                canteen_order_id,
                item_id,

                quantity,
                unit_rate,

                gross_amount,
                discount,

                gst_rate,
                gst_amount,

                net_amount,

                "PENDING",      // ledger_status
                remarks,

                empid
            ],
            (err2, insertResult) => {

                if (err2) {
                    return callback({
                        stage: "INSERT_SERVICE_LEDGER",
                        message: err2
                    });
                }

                return callback(null, insertResult);

            }
        );

    });

};

const createDietMealCharge = (delivery_id, empid, connection, callback) => {


    const getMealPriceQuery = `
        SELECT
            ddl.patient_diet_id,
            ddl.type_slno,

            co.admission_id,
            co.party_type_id,

            ip.fb_pt_no,

            pdp.diet_id,

            dpd.meal_rate

        FROM diet_delivery_log ddl

        INNER JOIN canteen_order co
            ON co.canteen_order_id = ddl.canteen_order_id

        INNER JOIN patient_diet_schedule pds
            ON pds.patient_diet_id = ddl.patient_diet_id

        INNER JOIN patient_diet_plan pdp
            ON pdp.plan_id = pds.plan_id

        INNER JOIN fb_ipadmiss ip
            ON ip.fb_ip_no = co.admission_id

        INNER JOIN fb_bed bed
            ON bed.fb_bed_slno = co.room_id

        INNER JOIN fb_room_type rt
            ON rt.fb_rt_code = bed.fb_rt_code

        INNER JOIN fb_room_category rc
            ON rc.fb_rc_code = rt.fb_rc_code

        INNER JOIN diet_room_category_master drcm
            ON JSON_CONTAINS(
                drcm.diet_rm_categories,
                JSON_ARRAY(rc.fb_rc_slno)
            )

        INNER JOIN diet_price_master dpm
            ON dpm.diet_id = pdp.diet_id
           AND dpm.party_type_id = co.party_type_id
           AND dpm.diet_rm_category_slno = drcm.diet_rm_category_slno
           AND dpm.is_active = 1

        INNER JOIN diet_price_detail dpd
            ON dpd.price_id = dpm.price_id
           AND dpd.type_slno = ddl.type_slno
           AND dpd.is_active = 1

        WHERE ddl.delivery_id = ?
        LIMIT 1
    `;

    connection.query(getMealPriceQuery, [delivery_id], (err, result) => {

        if (err) {
            return callback({
                stage: "GET_DIET_MEAL_PRICE",
                message: err
            });
        }

        if (!result.length) {
            return callback({
                stage: "GET_DIET_MEAL_PRICE",
                message: "Diet meal price not found."
            });
        }

        const meal = result[0];

        // Check whether this meal has already been charged
        const checkQuery = `
            SELECT meal_charge_id
            FROM diet_meal_charge
            WHERE patient_diet_id = ?
              AND type_slno = ?
              AND charge_status <> 'CANCELLED'
            LIMIT 1
        `;

        connection.query(
            checkQuery,
            [
                meal.patient_diet_id,
                meal.type_slno
            ],
            (err1, exists) => {

                if (err1) {
                    return callback({
                        stage: "CHECK_DIET_MEAL_CHARGE",
                        message: err1
                    });
                }

                if (exists.length > 0) {
                    return callback(null, {
                        success: 1,
                        message: "Diet meal already charged."
                    });
                }

                const mealRate = Number(meal.meal_rate || 0);
                const discount = 0;
                const netAmount = mealRate - discount;

                const insertQuery = `
                    INSERT INTO diet_meal_charge
                    (
                        admission_id,
                        pt_no,
                        patient_diet_id,
                        diet_id,
                        party_type_id,
                        type_slno,
                        meal_rate,
                        discount,
                        net_amount,
                        charge_status,
                        created_by
                    )
                    VALUES
                    (
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                    )
                `;

                connection.query(
                    insertQuery,
                    [
                        meal.admission_id,
                        meal.fb_pt_no,
                        meal.patient_diet_id,
                        meal.diet_id,
                        meal.party_type_id,
                        meal.type_slno,
                        mealRate,
                        discount,
                        netAmount,
                        "PENDING",
                        empid
                    ],
                    (err2, insertResult) => {

                        if (err2) {
                            return callback({
                                stage: "INSERT_DIET_MEAL_CHARGE",
                                message: err2
                            });
                        }

                        return callback(null, insertResult);

                    }
                );

            }
        );

    });

};


const createServiceLedger = (delivery_id, empid, connection, callback) => {

    const deliveryQuery = `
        SELECT
            ddl.delivery_id,
            ddl.patient_diet_id,
            ddl.canteen_order_id,
            ddl.item_id,
            ddl.delivered_qty,
            ddl.type_slno,
            ddl.source_type,

            co.party_type_id,
            co.admission_id,

            ip.fb_pt_no

        FROM diet_delivery_log ddl

        INNER JOIN canteen_order co
            ON co.canteen_order_id = ddl.canteen_order_id

        LEFT JOIN fb_ipadmiss ip
            ON ip.fb_ip_no = co.admission_id

        WHERE ddl.delivery_id = ?
        LIMIT 1
    `;

    connection.query(deliveryQuery, [delivery_id], (err, result) => {

        if (err) {
            return callback({
                stage: "GET_DELIVERY",
                message: err
            });
        }

        if (!result.length) {
            return callback({
                stage: "GET_DELIVERY",
                message: "Delivery not found"
            });
        }

        const delivery = result[0];

        switch (delivery.source_type) {

            // -------------------------------------
            // Diet Order
            // -------------------------------------
            case "DIET_ORDER":

                return createDietMealCharge(
                    delivery.delivery_id,
                    empid,
                    connection,
                    callback
                );

            // -------------------------------------
            // Patient Extra Order
            // -------------------------------------
            case "PATIENT_EXTRA_ORDER":

                return getExtraOrderPrice(
                    delivery.delivery_id,
                    connection,
                    (err, ledgerData) => {

                        if (err) {
                            return callback(err);
                        }

                        insertServiceLedger(
                            ledgerData,
                            empid,
                            connection,
                            callback
                        );

                    }
                );

            // -------------------------------------
            // Canteen Order
            // -------------------------------------
            case "CANTEEN_ORDER":

                return getCanteenOrderPrice(
                    delivery.delivery_id,
                    connection,
                    (err, ledgerData) => {

                        if (err) {
                            return callback(err);
                        }

                        insertServiceLedger(
                            ledgerData,
                            empid,
                            connection,
                            callback
                        );

                    }
                );

            default:

                return callback({
                    stage: "PRICE",
                    message: `Unknown source type : ${delivery.source_type}`
                });

        }

    });

};



module.exports = {
    createServiceLedger
}