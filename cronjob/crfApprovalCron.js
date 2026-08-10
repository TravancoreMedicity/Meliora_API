const cron = require('node-cron');
const axios = require('axios');
const moment = require('moment');
const { pool } = require('../config/database');

/**
 * Fetch pending counts and priority counts for ED, MD, MS, DMS, SMO
 */
const getPendingApprovalCounts = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                /* ED Pending */
                COUNT(CASE WHEN 
                    crm_request_approval.ed_approve IS NULL 
                    THEN 1 END) AS ed_count,
                COUNT(CASE WHEN 
                    crm_request_approval.ed_approve IS NULL 
                    AND crm_request_master.emergency_flag = 1 
                    THEN 1 END) AS ed_priority_count,

                /* MD Pending */
                COUNT(CASE WHEN 
                    crm_request_approval.md_approve IS NULL
                    THEN 1 END) AS md_count,
                COUNT(CASE WHEN 
                    crm_request_approval.md_approve IS NULL 
                    AND crm_request_master.emergency_flag = 1 
                    THEN 1 END) AS md_priority_count,

                /* MS Pending */
                COUNT(CASE WHEN 
                    crm_request_approval.ms_approve_req = 1 
                    AND crm_request_approval.ms_approve IS NULL
                    AND crm_request_approval.manag_operation_approv IS NULL
                    AND crm_request_approval.senior_manage_approv IS NULL
                    AND crm_request_approval.gm_approve IS NULL
                    AND crm_request_approval.ed_approve IS NULL
                    AND crm_request_approval.md_approve IS NULL
                    THEN 1 END) AS ms_count,
                COUNT(CASE WHEN 
                    crm_request_approval.ms_approve_req = 1 
                    AND crm_request_approval.ms_approve IS NULL
                    AND crm_request_approval.manag_operation_approv IS NULL
                    AND crm_request_approval.senior_manage_approv IS NULL
                    AND crm_request_approval.gm_approve IS NULL
                    AND crm_request_approval.ed_approve IS NULL
                    AND crm_request_approval.md_approve IS NULL
                    AND crm_request_master.emergency_flag = 1 
                    THEN 1 END) AS ms_priority_count,

                /* DMS Pending */
                COUNT(CASE WHEN 
                    crm_request_approval.dms_req = 1 
                    AND crm_request_approval.dms_approve IS NULL
                    AND crm_request_approval.ms_approve IS NULL
                    AND crm_request_approval.manag_operation_approv IS NULL
                    AND crm_request_approval.senior_manage_approv IS NULL
                    AND crm_request_approval.gm_approve IS NULL
                    AND crm_request_approval.ed_approve IS NULL
                    AND crm_request_approval.md_approve IS NULL
                    THEN 1 END) AS dms_count,
                COUNT(CASE WHEN 
                    crm_request_approval.dms_req = 1 
                    AND crm_request_approval.dms_approve IS NULL
                    AND crm_request_approval.ms_approve IS NULL
                    AND crm_request_approval.manag_operation_approv IS NULL
                    AND crm_request_approval.senior_manage_approv IS NULL
                    AND crm_request_approval.gm_approve IS NULL
                    AND crm_request_approval.ed_approve IS NULL
                    AND crm_request_approval.md_approve IS NULL
                    AND crm_request_master.emergency_flag = 1 
                    THEN 1 END) AS dms_priority_count,

                /* SMO Pending */
                COUNT(CASE WHEN 
                    crm_request_approval.senior_manage_approv IS NULL
                    AND crm_request_approval.gm_approve IS NULL
                    AND crm_request_approval.ed_approve IS NULL
                    AND crm_request_approval.md_approve IS NULL
                    THEN 1 END) AS smo_count,
                COUNT(CASE WHEN 
                    crm_request_approval.senior_manage_approv IS NULL
                    AND crm_request_approval.gm_approve IS NULL
                    AND crm_request_approval.ed_approve IS NULL
                    AND crm_request_approval.md_approve IS NULL
                    AND crm_request_master.emergency_flag = 1 
                    THEN 1 END) AS smo_priority_count

            FROM crm_request_master
            LEFT JOIN crm_request_approval ON crm_request_approval.req_slno = crm_request_master.req_slno
            WHERE crm_request_approval.crf_close IS NULL 
              AND crm_request_master.user_acknldge IS NULL
              AND (crm_request_master.req_status != 'R' AND crm_request_master.req_status != 'P' OR crm_request_master.req_status IS NULL)
              AND (crm_request_master.internally_arranged_status = 0 OR crm_request_master.internally_arranged_status IS NULL)
        `;

        pool.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0] || {
                ed_count: 0, ed_priority_count: 0,
                md_count: 0, md_priority_count: 0,
                ms_count: 0, ms_priority_count: 0,
                dms_count: 0, dms_priority_count: 0,
                smo_count: 0, smo_priority_count: 0
            });
        });
    });
};

/**
 * Fetch mobile numbers from crm_notification table
 */
const getNotificationMobileNumbers = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT mobile_no 
            FROM crm_notification 
            WHERE mobile_no IS NOT NULL AND TRIM(mobile_no) != ''
        `;

        pool.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            const numbers = results.map(row => row.mobile_no).filter(Boolean);
            resolve(numbers);
        });
    });
};

/**
 * Send WhatsApp template message to a mobile number
 */
const sendCrfApprovalWhatsapp = async (mobile, timestampStr, countsStr) => {
    const cleanMobile = String(mobile || '').replace(/\D/g, '').slice(-10);
    if (!cleanMobile || cleanMobile.length !== 10) {
        console.warn(`[CRF Cron] Invalid mobile number: ${mobile}`);
        return null;
    }

    const payload = {
        phone: `+91${cleanMobile}`,
        template_name: 'crf_approval',
        language_code: 'en',
        components: [
            {
                type: 'body',
                parameters: [
                    { type: 'text', text: String(timestampStr) }, // {{1}} e.g. "27/07/2026 10.00 AM"
                    { type: 'text', text: String(countsStr) }     // {{2}} ED, MD, MS, DMS, SMO counts
                ]
            }
        ]
    };

    try {
        const response = await axios.post(
            'https://travancoremedicity.w7.bitvoice.in/api/send-template',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.BITVOICE_API_KEY
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(`[CRF Cron] Bitvoice API Response Error (${error.response.status}):`, JSON.stringify(error.response.data));
        } else {
            console.error(`[CRF Cron] Error sending WhatsApp to +91${cleanMobile}:`, error.message);
        }
        return null;
    }
};

/**
 * Execute the CRF Approval notification job
 */
const runCrfApprovalJob = async () => {
    console.log('[CRF Cron] Running daily CRF approval WhatsApp notification job...');
    try {
        const numbers = await getNotificationMobileNumbers();
        if (!numbers || numbers.length === 0) {
            console.log('[CRF Cron] No mobile numbers found in crm_notification table.');
            return;
        }

        const counts = await getPendingApprovalCounts();

        // Format variable 1: e.g. "27/07/2026 10.00 AM"
        const formattedTimestamp = moment().format('DD/MM/YYYY hh:mm A');

        // Note: Meta WhatsApp API body parameters do not allow newline (\n) characters.
        // Formatted with bullet/comma separator on a single line.
        const formattedCounts = [
            `ED - ${counts.ed_count || 0} (Priority- ${counts.ed_priority_count || 0})`,
            `MD - ${counts.md_count || 0} (Priority- ${counts.md_priority_count || 0})`,
            `MS - ${counts.ms_count || 0} (Priority- ${counts.ms_priority_count || 0})`,
            `DMS - ${counts.dms_count || 0} (Priority- ${counts.dms_priority_count || 0})`,
            `SMO - ${counts.smo_count || 0} (Priority- ${counts.smo_priority_count || 0})`
        ].join(', ');

        // console.log(`[CRF Cron] Prepared message content:\nTimestamp: ${formattedTimestamp}\nCounts: ${formattedCounts}`);

        for (const mobile of numbers) {
            const res = await sendCrfApprovalWhatsapp(mobile, formattedTimestamp, formattedCounts);
            if (res) {
                console.log(`[CRF Cron] WhatsApp sent successfully to ${mobile}`);
            }
        }
    } catch (err) {
        console.error('[CRF Cron] Job execution error:', err);
    }
};


const initCrfApprovalCron = () => {
    // Schedule: 0 9 * * * (Every day at 9:00 AM)
    cron.schedule('0 9 * * *', () => {
        runCrfApprovalJob();
    });
    // console.log('[CRF Cron] Scheduled CRF Approval WhatsApp cron job for 09:00 AM daily.');
};

module.exports = {
    initCrfApprovalCron,
    runCrfApprovalJob,
    getPendingApprovalCounts,
    getNotificationMobileNumbers
};
