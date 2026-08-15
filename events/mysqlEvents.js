const MySQLEvents = require("@rodrigogs/mysql-events");
const { pool } = require('../config/database');

const queryDatabase = (query, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const startAdmissionListener = async (io) => {
    try {
        const dbConfig = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: Number(process.env.DB_PORT || 3306),
            database: process.env.MYSQL_DB,
        };

        const mysqlEvents = new MySQLEvents(dbConfig, {
            startAtEnd: true,
        });

        mysqlEvents.on(MySQLEvents.EVENTS.CONNECTION_ERROR, (error) => {
            console.error("MySQL Events Connection Error:", error);
        }
        );

        mysqlEvents.on(MySQLEvents.EVENTS.ZONGJI_ERROR, (error) => {
            console.error("MySQL Events ZongJi Error:", error);
        }
        );

        await mysqlEvents.start();
        // console.log("=================================================");
        // console.log("MySQL Admission Listener Started");
        // console.log("Listening for INSERT on fb_ipadmiss");
        // console.log("=================================================");
        await mysqlEvents.addTrigger({
            name: "fb_ipadmiss_insert_listener",
            // Table to monitor
            expression: "meliora.fb_ipadmiss",
            // Only INSERT
            statement: MySQLEvents.STATEMENTS.INSERT,
            onEvent: async (event) => {
                try {
                    // console.log("\n========================================");
                    // console.log("NEW INSERT DETECTED: fb_ipadmiss");
                    // console.log("========================================");
                    // console.log("MySQL Event:", JSON.stringify(event, null, 2));

                    /*
                     * Get affected rows from the binlog event.
                     *
                     * Depending on mysql-events version/event structure,
                     * affectedRows may contain the inserted records.
                     */
                    const affectedRows = event?.affectedRows || [];

                    if (!affectedRows.length) {
                        console.log("No affected rows found in event");
                        return;
                    }
                    /*
                     * Extract fb_ipad_slno.
                     *
                     * This is the PRIMARY KEY of fb_ipadmiss.
                     */
                    const insertedIds = affectedRows
                        .map((row) => row?.after?.fb_ip_no)
                        .filter(Boolean);



                    if (!insertedIds.length) {
                        console.log("Could not find fb_ip_no in event");
                        return;
                    }
                    // console.log("Inserted Patient IDs:", insertedIds);
                    /*
                     * Create placeholders:
                     *
                     * [493467, 493468, 493469]
                     *
                     * becomes:
                     *
                     * ?, ?, ?
                     */
                    const placeholders = insertedIds
                        .map(() => "?")
                        .join(",");
                    /*
                     * Get the COMPLETE patient records
                     * from fb_ipadmiss.
                     */
                    const query = `
                        SELECT
                            fb_ipad_slno,
                            fb_ip_no,
                            fb_ipd_date,
                            fb_pt_no,
                            fb_ptc_name,
                            fb_ptc_sex,
                            fb_ptd_dob,
                            fb_ptn_dayage,
                            fb_ptn_monthage,
                            fb_ptn_yearage,
                            fb_ptc_loadd1,
                            fb_ptc_loadd2,
                            fb_ptc_loadd3,
                            fb_ptc_loadd4,
                            fb_ptc_lopin,
                            fba.fb_bd_code,
                            fb_do_code,
                            fb_rs_code,
                            fb_ptc_mobile,
                            fb_ipc_mhcode,
                            fb_doc_name,
                            fb_ipc_curstatus,
                            fb_dep_desc,
                            fbnsm.fb_ns_name
                        FROM fb_ipadmiss fba
                        LEFT JOIN fb_bed
                            ON fb_bed.fb_bd_code = fba.fb_bd_code
                        LEFT JOIN fb_nurse_station_master fbnsm
                            ON fbnsm.fb_ns_code = fb_bed.fb_ns_code
                        WHERE fba.fb_ip_no IN (${placeholders})
                    `;


                    const patients = await queryDatabase(
                        query,
                        insertedIds
                    );

                    if (!patients.length) {
                        console.log("No patient records found");
                        return;
                    }
                    // console.log(`Found ${patients.length} new patient(s)`);

                    /*
                     * Send ONE Socket.IO event
                     *
                     * Whether 1 patient or 10 patients
                     * are inserted, React receives one event.
                     */
                    io.emit("new-admission", {
                        message: "New patient admission",
                        count: patients.length,
                        data: patients,
                    });
                    // console.log("Socket event emitted: new-admission");
                    // console.log("========================================\n");
                } catch (error) {
                    console.error("Error processing new admission:", error);
                }
            },
        });


    } catch (error) {
        console.error("MySQL Admission Listener Error:", error);
    }
};


module.exports = startAdmissionListener;