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




const FinalizePatientDietAfterBilling = (
    admissionId,
    ptNo,
    billingId,
    employeeId,
    connection,
    callback
) => {
    /*
     * IMPORTANT:
     * ------------------------------------------------------------
     * This function runs inside the SAME transaction as billing.
     *
     * DO NOT commit / rollback / release connection here.
     *
     * If anything fails, callback(error) will allow the caller
     * to rollback the complete billing transaction.
     * ------------------------------------------------------------
     */

    const query = (sql, params = []) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, params, (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            });
        });
    };

    const placeholders = (values) => {
        return values.map(() => "?").join(",");
    };

    const uniqueIds = (ids) => {
        return [...new Set(
            ids
                .filter(id => id !== null && id !== undefined)
                .map(id => Number(id))
                .filter(id => !Number.isNaN(id))
        )];
    };

    (async () => {
        try {
            /*
             * ============================================================
             * 1. GET PATIENT INTERNAL ID
             * ============================================================
             *
             * patient_extra_order.patient_id references
             * fb_ipadmiss.fb_ipad_slno.
             *
             * admissionId here is assumed to be fb_ip_no.
             */

            const patientRows = await query(
                `
                    SELECT fb_ipad_slno
                    FROM fb_ipadmiss
                    WHERE fb_ip_no = ?
                    LIMIT 1
                `,
                [admissionId]
            );

            if (patientRows.length === 0) {
                throw new Error(
                    `Patient admission ${admissionId} not found.`
                );
            }

            const patientInternalId =
                patientRows[0].fb_ipad_slno;


            /*
             * ============================================================
             * 2. GET ACTIVE DIET PLAN IDs
             * ============================================================
             */

            const activePlans = await query(
                `
                    SELECT plan_id
                    FROM patient_diet_plan
                    WHERE admission_id = ?
                      AND patient_id = ?
                      AND diet_status = 'ACTIVE'
                      AND is_active = 1
                `,
                [
                    admissionId,
                    ptNo
                ]
            );

            const planIds = uniqueIds(
                activePlans.map(row => row.plan_id)
            );


            /*
             * ============================================================
             * 3. GET ALL PATIENT EXTRA ORDER IDs
             * ============================================================
             *
             * Do this BEFORE cancelling them because these IDs may be
             * required to find their delivery/canteen records.
             */

            const extraOrders = await query(
                `
                    SELECT extra_order_id
                    FROM patient_extra_order
                    WHERE patient_id = ?
                      AND order_status IN ('PENDING', 'CONFIRMED')
                      AND is_active = 1
                `,
                [patientInternalId]
            );

            const extraOrderIds = uniqueIds(
                extraOrders.map(row => row.extra_order_id)
            );


            /*
             * ============================================================
             * 4. GET PATIENT DIET SCHEDULE IDs
             * ============================================================
             *
             * We need these for:
             *
             * - diet_delivery_log
             * - canteen_order_item.patient_diet_id
             */

            let patientDietIds = [];

            if (planIds.length > 0) {
                const schedulePlaceholders =
                    placeholders(planIds);

                const schedules = await query(
                    `
                        SELECT patient_diet_id
                        FROM patient_diet_schedule
                        WHERE plan_id IN (${schedulePlaceholders})
                    `,
                    planIds
                );

                patientDietIds = uniqueIds(
                    schedules.map(row => row.patient_diet_id)
                );
            }


            /*
             * ============================================================
             * 5. GET PATIENT CANTEEN ORDERS
             * ============================================================
             *
             * VERY IMPORTANT:
             *
             * Do NOT use only:
             *
             *     WHERE admission_id = ?
             *
             * because the same admission can have BYSTANDER orders.
             *
             * party_type_id = 2
             * = PATIENT
             *
             * Therefore only patient orders are selected.
             *
             * Additionally, include orders connected to the patient's
             * diet schedules.
             */

            const canteenOrderIdSet = new Set();


            /*
             * 5A. Patient canteen orders directly belonging to admission
             */

            const directPatientCanteenOrders = await query(
                `
                    SELECT canteen_order_id
                    FROM canteen_order
                    WHERE admission_id = ?
                      AND party_type_id = 2
                      AND order_status IN ('PENDING', 'CONFIRMED')
                `,
                [admissionId]
            );

            directPatientCanteenOrders.forEach(row => {
                canteenOrderIdSet.add(
                    Number(row.canteen_order_id)
                );
            });


            /*
             * 5B. Canteen orders connected to patient's diet schedules
             *
             * This protects us even if the admission/party information
             * is not enough.
             */

            if (patientDietIds.length > 0) {
                const dietPlaceholders =
                    placeholders(patientDietIds);

                const dietCanteenOrders = await query(
                    `
                        SELECT DISTINCT
                            coi.canteen_order_id
                        FROM canteen_order_item coi
                        INNER JOIN canteen_order co
                            ON co.canteen_order_id =
                               coi.canteen_order_id
                        WHERE coi.patient_diet_id IN (
                            ${dietPlaceholders}
                        )
                          AND co.party_type_id = 2
                          AND co.order_status IN (
                              'PENDING',
                              'CONFIRMED'
                          )
                    `,
                    patientDietIds
                );

                dietCanteenOrders.forEach(row => {
                    canteenOrderIdSet.add(
                        Number(row.canteen_order_id)
                    );
                });
            }


            /*
             * 5C. Canteen orders connected to patient extra orders
             *
             * diet_delivery_log contains:
             *
             * source_type = PATIENT_EXTRA_ORDER
             * source_id   = extra_order_id
             * canteen_order_id
             */

            if (extraOrderIds.length > 0) {
                const extraPlaceholders =
                    placeholders(extraOrderIds);

                const extraCanteenOrders = await query(
                    `
                        SELECT DISTINCT canteen_order_id
                        FROM diet_delivery_log
                        WHERE source_type = 'PATIENT_EXTRA_ORDER'
                          AND source_id IN (
                              ${extraPlaceholders}
                          )
                          AND canteen_order_id IS NOT NULL
                    `,
                    extraOrderIds
                );

                extraCanteenOrders.forEach(row => {
                    canteenOrderIdSet.add(
                        Number(row.canteen_order_id)
                    );
                });
            }


            const canteenOrderIds =
                uniqueIds([...canteenOrderIdSet]);


            /*
             * ============================================================
             * 6. STOP ACTIVE DIET PLANS
             * ============================================================
             */

            const stoppedPlansResult = await query(
                `
                    UPDATE patient_diet_plan
                    SET
                        diet_status = 'STOPPED',
                        is_active = 0,
                        end_date = NOW(),
                        updated_by = ?,
                        updated_at = NOW()
                    WHERE admission_id = ?
                      AND patient_id = ?
                      AND diet_status = 'ACTIVE'
                      AND is_active = 1
                `,
                [
                    employeeId,
                    admissionId,
                    ptNo
                ]
            );


            /*
             * ============================================================
             * 7. CANCEL PENDING DIET SCHEDULES
             * ============================================================
             */

            let cancelledScheduleResult = {
                affectedRows: 0
            };

            if (planIds.length > 0) {
                const planPlaceholders =
                    placeholders(planIds);

                cancelledScheduleResult = await query(
                    `
                        UPDATE patient_diet_schedule
                        SET
                            status = 'CANCELLED',
                            is_active = 0,
                            cancel_reason =
                                'Cancelled after billing',
                            cancelled_by = ?,
                            cancelled_at = NOW(),
                            updated_by = ?,
                            updated_at = NOW()
                        WHERE plan_id IN (
                            ${planPlaceholders}
                        )
                          AND status = 'PENDING'
                          AND is_active = 1
                    `,
                    [
                        employeeId,
                        employeeId,
                        ...planIds
                    ]
                );
            }


            /*
             * ============================================================
             * 8. CANCEL DIET ORDERS
             * ============================================================
             */

            let cancelledDietOrdersResult = {
                affectedRows: 0
            };

            if (planIds.length > 0) {
                const planPlaceholders =
                    placeholders(planIds);

                cancelledDietOrdersResult = await query(
                    `
                        UPDATE diet_order
                        SET
                            order_status = 'CANCELLED',
                            updated_by = ?,
                            updated_at = NOW()
                        WHERE plan_id IN (
                            ${planPlaceholders}
                        )
                          AND order_status IN (
                              'PENDING',
                              'CONFIRMED'
                          )
                    `,
                    [
                        employeeId,
                        ...planIds
                    ]
                );
            }


            /*
             * ============================================================
             * 9. DEACTIVATE DIET ORDER DETAILS
             * ============================================================
             */

            let deactivatedDietDetailsResult = {
                affectedRows: 0
            };

            if (planIds.length > 0) {
                const planPlaceholders =
                    placeholders(planIds);

                deactivatedDietDetailsResult = await query(
                    `
                        UPDATE diet_order_detail dod
                        INNER JOIN diet_order do
                            ON do.order_id = dod.order_id
                        SET
                            dod.is_active = 0
                        WHERE do.plan_id IN (
                            ${planPlaceholders}
                        )
                          AND do.order_status = 'CANCELLED'
                          AND dod.is_active = 1
                    `,
                    planIds
                );
            }


            /*
             * ============================================================
             * 10. CANCEL PATIENT EXTRA ORDERS
             * ============================================================
             */

            let cancelledExtraOrdersResult = {
                affectedRows: 0
            };

            if (extraOrderIds.length > 0) {
                const extraPlaceholders =
                    placeholders(extraOrderIds);

                cancelledExtraOrdersResult = await query(
                    `
                        UPDATE patient_extra_order
                        SET
                            order_status = 'CANCELLED',
                            is_active = 0,
                            updated_by = ?,
                            updated_at = NOW()
                        WHERE extra_order_id IN (
                            ${extraPlaceholders}
                        )
                          AND order_status IN (
                              'PENDING',
                              'CONFIRMED'
                          )
                    `,
                    [
                        employeeId,
                        ...extraOrderIds
                    ]
                );
            }


            /*
             * ============================================================
             * 11. CANCEL PATIENT CANTEEN ORDERS
             * ============================================================
             *
             * ONLY patient orders.
             *
             * Bystander orders are NOT included in canteenOrderIds.
             */

            let cancelledCanteenOrdersResult = {
                affectedRows: 0
            };

            if (canteenOrderIds.length > 0) {
                const orderPlaceholders =
                    placeholders(canteenOrderIds);

                cancelledCanteenOrdersResult = await query(
                    `
                        UPDATE canteen_order
                        SET
                            order_status = 'CANCELLED',
                            updated_by = ?,
                            updated_at = NOW()
                        WHERE canteen_order_id IN (
                            ${orderPlaceholders}
                        )
                          AND order_status IN (
                              'PENDING',
                              'CONFIRMED'
                          )
                          AND party_type_id = 2
                    `,
                    [
                        employeeId,
                        ...canteenOrderIds
                    ]
                );
            }


            /*
             * ============================================================
             * 12. DEACTIVATE PATIENT CANTEEN ORDER ITEMS
             * ============================================================
             */

            let deactivatedCanteenItemsResult = {
                affectedRows: 0
            };

            if (canteenOrderIds.length > 0) {
                const orderPlaceholders =
                    placeholders(canteenOrderIds);

                deactivatedCanteenItemsResult = await query(
                    `
                        UPDATE canteen_order_item
                        SET
                            is_active = 0
                        WHERE canteen_order_id IN (
                            ${orderPlaceholders}
                        )
                          AND is_active = 1
                    `,
                    canteenOrderIds
                );
            }


            /*
             * ============================================================
             * 13. CANCEL ONLY PATIENT ASSIGNMENT DETAILS
             * ============================================================
             *
             * IMPORTANT:
             *
             * We DO NOT touch diet_delivery_assignment.
             *
             * Example:
             *
             * Assignment 62
             *   detail 209 -> Patient A -> CANCELLED
             *   detail 210 -> Patient B -> PENDING
             *   detail 211 -> Patient C -> PENDING
             *
             * Assignment 62 remains untouched.
             */

            let cancelledAssignmentDetailsResult = {
                affectedRows: 0
            };

            if (canteenOrderIds.length > 0) {
                const orderPlaceholders =
                    placeholders(canteenOrderIds);

                cancelledAssignmentDetailsResult = await query(
                    `
                        UPDATE diet_delivery_assignment_detail
                        SET
                            delivery_status = 'CANCELLED',
                            remarks =
                                'Cancelled after patient billing'
                        WHERE canteen_order_id IN (
                            ${orderPlaceholders}
                        )
                          AND delivery_status IN (
                              'PENDING',
                              'PARTIAL'
                          )
                    `,
                    canteenOrderIds
                );
            }


            /*
             * ============================================================
             * 14. CANCEL DIET DELIVERY LOGS
             * ============================================================
             *
             * We cancel ONLY pending/prepared delivery records.
             *
             * DELIVERED
             * PICKEDUP
             * RETURNED
             * UNDELIVERED
             *
             * are historical and are NOT changed.
             */

            let cancelledDeliveryLogsResult = {
                affectedRows: 0
            };

            const deliveryConditions = [];
            const deliveryParams = [];

            /*
             * 14A. Delivery logs connected to diet schedules
             */

            if (patientDietIds.length > 0) {
                const dietPlaceholders =
                    placeholders(patientDietIds);

                deliveryConditions.push(`
                    (
                        patient_diet_id IN (
                            ${dietPlaceholders}
                        )
                        AND delivery_status IN (
                            'PENDING',
                            'PREPARED'
                        )
                    )
                `);

                deliveryParams.push(
                    ...patientDietIds
                );
            }


            /*
             * 14B. Delivery logs connected to patient canteen orders
             */

            if (canteenOrderIds.length > 0) {
                const orderPlaceholders =
                    placeholders(canteenOrderIds);

                deliveryConditions.push(`
                    (
                        canteen_order_id IN (
                            ${orderPlaceholders}
                        )
                        AND delivery_status IN (
                            'PENDING',
                            'PREPARED'
                        )
                    )
                `);

                deliveryParams.push(
                    ...canteenOrderIds
                );
            }


            /*
             * 14C. Delivery logs connected to patient extra orders
             */

            if (extraOrderIds.length > 0) {
                const extraPlaceholders =
                    placeholders(extraOrderIds);

                deliveryConditions.push(`
                    (
                        source_type = 'PATIENT_EXTRA_ORDER'
                        AND source_id IN (
                            ${extraPlaceholders}
                        )
                        AND delivery_status IN (
                            'PENDING',
                            'PREPARED'
                        )
                    )
                `);

                deliveryParams.push(
                    ...extraOrderIds
                );
            }


            if (deliveryConditions.length > 0) {
                cancelledDeliveryLogsResult = await query(
                    `
                        UPDATE diet_delivery_log
                        SET
                            delivery_status = 'CANCELLED',
                            updated_by = ?,
                            updated_at = NOW(),
                            updated_remarks =
                                'Cancelled after patient billing'
                        WHERE
                            ${deliveryConditions.join(" OR ")}
                    `,
                    [
                        employeeId,
                        ...deliveryParams
                    ]
                );
            }


            /*
             * ============================================================
             * 15. DO NOT TOUCH PRODUCTION BATCHES
             * ============================================================
             *
             * We intentionally do NOT update:
             *
             * diet_production_batch
             * diet_production_items
             * diet_production_order_map
             *
             * because a production batch can contain multiple patients.
             */


            /*
             * ============================================================
             * 16. SUCCESS
             * ============================================================
             */

            return callback(null, {
                success: true,

                admission_id: admissionId,
                pt_no: ptNo,
                billing_id: billingId,

                stopped_plan_ids: planIds,

                patient_diet_ids: patientDietIds,

                patient_extra_order_ids:
                    extraOrderIds,

                cancelled_canteen_order_ids:
                    canteenOrderIds,

                counts: {
                    stopped_plans:
                        stoppedPlansResult.affectedRows,

                    cancelled_schedules:
                        cancelledScheduleResult.affectedRows,

                    cancelled_diet_orders:
                        cancelledDietOrdersResult.affectedRows,

                    deactivated_diet_order_details:
                        deactivatedDietDetailsResult.affectedRows,

                    cancelled_extra_orders:
                        cancelledExtraOrdersResult.affectedRows,

                    cancelled_canteen_orders:
                        cancelledCanteenOrdersResult.affectedRows,

                    deactivated_canteen_items:
                        deactivatedCanteenItemsResult.affectedRows,

                    cancelled_assignment_details:
                        cancelledAssignmentDetailsResult.affectedRows,

                    cancelled_delivery_logs:
                        cancelledDeliveryLogsResult.affectedRows
                }
            });

        } catch (error) {
            return callback(error);
        }
    })();
};


module.exports = {
    createServiceLedger,
    FinalizePatientDietAfterBilling
}