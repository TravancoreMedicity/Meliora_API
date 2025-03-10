const { pool } = require('../../config/database')
module.exports = {



    insertCondemMasterData: (data, callback) => {
        pool.query(
            `INSERT INTO am_condemnation_master
          (         
          
           create_user
           
          )
          VALUES(?)`,
            [
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    insertCondemDetailData: (data, callback) => {
        pool.query(
            `INSERT INTO am_condemnation_details
          (           
           condem_mast_slno,
           am_asset_item_slno,
           am_spare_item_slno,
           item_status         
           )
          VALUES(?,?,?,?)`,
            [
                data.condem_mast_slno,
                data.am_asset_item_slno,
                data.am_spare_item_slno,
                data.item_status

            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    UpdateItemDetails: (data, callback) => {
        pool.query(`
           UPDATE am_condemnation_details
           SET 
           am_condem_reason = ?, 
           edit_user = ?
           WHERE 
           condem_mast_slno = ?
           AND (
            (am_asset_item_slno = ? AND am_asset_item_slno IS NOT NULL)
            OR 
            (am_spare_item_slno = ? AND am_spare_item_slno IS NOT NULL)) `
            ,
            [
                data.am_condem_reason,
                data.edit_user,
                data.condem_mast_slno,
                data.am_asset_item_slno,
                data.am_spare_item_slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getItemDetails: (data, callback) => {
        pool.query(
            `select            
            am_condem_detail_slno,
            keep_inscarp_status,
            keep_in_srap_store_reason,
            am_asset_item_map_master.item_asset_no,
            am_asset_item_map_master.item_asset_no_only,
            am_spare_item_map_master.spare_asset_no,
            am_spare_item_map_master.spare_asset_no_only,
            item1.item_name as item_asset_name,
            item2.item_name as item_spare_name,
            cat1.category_name as cat_asset_name,
            cat2.category_name as cat_spare_name,
            condem_mast_slno,
            am_asset_item_slno,
            am_spare_item_slno,
            am_condem_reason,
            item_status
            from
            am_condemnation_details
            left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=am_condemnation_details.am_asset_item_slno
            left join am_spare_item_map_master on am_spare_item_map_master.am_spare_item_map_slno=am_condemnation_details.am_spare_item_slno
            left join am_item_name_creation item1 on item1.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join am_item_name_creation item2 on item2.item_creation_slno=am_spare_item_map_master.spare_creation_slno
            left join am_category cat1 on cat1.category_slno=item1.item_category_slno  
            left join am_category cat2 on cat2.category_slno=item2.item_category_slno  
            where
            item_status!=0
            and 
            condem_mast_slno=?`,
            [

                data.condemMastslno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getpendingApprovals: (data, callback) => {
        pool.query(
            `SELECT
            am_condemnation_master.condem_mast_slno, 
            condem_form_prefix,
            condem_form_no,
            am_condem_reason,
            reg_date, 
            req_dept, 
            condem_status, 
            incharge_approve_status, 
            incharge_remarks, 
            hod_approve_status, 
            hod_remarks, 
            gm_approve_status, 
            gm_approve_remarks, 
            acc_approve_status, 
            acc_approve_remarks, 
            material_mangmnt_mangr_apprv_status, 
            material_mangmnt_mangr_apprv_remark, 
            am_condemnation_master.create_user,
            COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
            COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
            FROM am_condemnation_master
            LEFT JOIN am_condemnation_details 
            ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno
            WHERE am_condemnation_master.req_dept = ?
            AND condem_status < ?
            AND condem_status > ?
            GROUP BY 
            am_condemnation_master.condem_mast_slno, condem_form_prefix, condem_form_no, 
            reg_date, req_dept, condem_status, incharge_approve_status, incharge_remarks, 
            hod_approve_status, hod_remarks, gm_approve_status, gm_approve_remarks, 
            acc_approve_status, acc_approve_remarks, material_mangmnt_mangr_apprv_status, 
            material_mangmnt_mangr_apprv_remark,am_condemnation_master.create_user`,
            [

                data.empdept,
                data.condemStatusFrom,
                data.condemstatusTo
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getItemUnderForm: (data, callback) => {
        pool.query(
            `select            
            am_condem_detail_slno,
            condem_form_prefix,
            condem_form_no,
            keep_inscarp_status,
            keep_in_srap_store_reason,
            scarp_store_emp,     
            am_asset_item_map_master.item_asset_no,
            am_asset_item_map_master.item_asset_no_only,
            am_spare_item_map_master.spare_asset_no,
            am_spare_item_map_master.spare_asset_no_only,
            item1.item_name as item_asset_name,
            item2.item_name as item_spare_name,
            cat1.category_name as cat_asset_name,
            cat2.category_name as cat_spare_name,
            service1.complaint_slno as asset_complaint_slno,
            service2.complaint_slno as spare_complaint_slno,
            am_condemnation_details.condem_mast_slno,
            am_condemnation_details.am_asset_item_slno as am_item_map_slno,
            am_condemnation_details.am_spare_item_slno as am_spare_item_map_slno,
            itemmap1.am_bill_amount as asset_bill_amount,
            itemmap2.am_bill_amount as spare_bill_amount,
            service1.condm_transf_remarks as asset_condm_transf_remarks,
            service2.condm_transf_remarks as spare_condm_transf_remarks,
            am_condem_reason,
            item_status
            from
            am_condemnation_details
            left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=am_condemnation_details.am_asset_item_slno
            left join am_spare_item_map_master on am_spare_item_map_master.am_spare_item_map_slno=am_condemnation_details.am_spare_item_slno
            left join am_item_name_creation item1 on item1.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join am_item_name_creation item2 on item2.item_creation_slno=am_spare_item_map_master.spare_creation_slno
            left join am_category cat1 on cat1.category_slno=item1.item_category_slno  
            left join am_category cat2 on cat2.category_slno=item2.item_category_slno  
            left join am_service_details service1 on service1.am_asset_item_slno=am_asset_item_map_master.am_item_map_slno
			left join am_service_details service2 on service2.am_spare_item_slno=am_spare_item_map_master.am_spare_item_map_slno
            left join am_item_map_details itemmap1 on itemmap1.am_Item_map_slno=am_asset_item_map_master.am_item_map_slno
            left join am_item_map_details itemmap2 on itemmap2.am_spare_item_map_slno= am_spare_item_map_master.am_spare_item_map_slno
            left join am_condemnation_master on am_condemnation_master.condem_mast_slno=am_condemnation_details.condem_mast_slno
            where
            item_status!=0
            and 
            am_condemnation_details.condem_mast_slno=?`,

            [

                data.condemMastslno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getItemSlno: (data, callback) => {
        pool.query(
            `select
            am_condem_detail_slno,condem_mast_slno,am_asset_item_slno,am_spare_item_slno
            from
            am_condemnation_details
            where
            item_status=1
            and
            condem_mast_slno=?
            AND (
            (am_asset_item_slno = ? AND am_asset_item_slno IS NOT NULL)
            OR 
            (am_spare_item_slno = ? AND am_spare_item_slno IS NOT NULL)) `,
            [
                data.condemMastslno,
                data.am_item_map_slno,
                data.am_spare_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateCondemMasterData: (data, callback) => {
        pool.query(`
            UPDATE am_condemnation_master
           SET 
           condem_form_no = ?, 
           condem_form_prefix=?,
           reg_date = ?,
           condem_status=?,
           edit_user=?,
           req_dept=?
           WHERE 
           condem_mast_slno = ? `,
            [
                data.condem_form_no,
                data.condem_form_prefix,
                data.reg_date,
                data.condem_status,
                data.edit_user,
                data.req_dept,
                data.condem_mast_slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    ApproveData: (data, callback) => {
        pool.query(`
            UPDATE am_condemnation_master
           SET 
           condem_form_no = ?, 
           condem_form_prefix=?,     
           condem_status=?,  
           incharge_approve_status=?,
           incharge_remarks=?,
           hod_approve_status=?,
           hod_remarks=?,   
           gm_approve_status=?,
           gm_approve_remarks=?,
           acc_approve_status=?,
           acc_approve_remarks=?,
           material_mangmnt_mangr_apprv_status=?,
           material_mangmnt_mangr_apprv_remark=?  
           WHERE 
           condem_mast_slno = ? `,
            [
                data.condem_form_no,
                data.condem_form_prefix,
                data.condem_status,
                data.incharge_approve_status,
                data.incharge_remarks,
                data.hod_approve_status,
                data.hod_remarks,
                data.gm_approve_status,
                data.gm_approve_remarks,
                data.acc_approve_status,
                data.acc_approve_remarks,
                data.material_mangmnt_mangr_apprv_status,
                data.material_mangmnt_mangr_apprv_remark,
                data.condem_mast_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    updateScarpStoreData: (data, callback) => {
        pool.query(` UPDATE am_condemnation_details
           SET 
           keep_inscarp_status = ?, 
           keep_in_srap_store_reason=?,
           scarp_store_emp = ?
           WHERE 
           am_condem_detail_slno = ? `,
            [
                data.keep_inscarp_status,
                data.keep_in_srap_store_reason,
                data.scarp_store_emp,
                data.am_condem_detail_slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


}