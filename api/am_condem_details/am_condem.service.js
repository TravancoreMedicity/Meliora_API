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
    // UpdateAssetStatus: (data, callback) => {
    //     pool.query(`
    //        UPDATE am_asset_item_map_master
    //        SET 
    //        submited_condemnation = ?,    
    //        WHERE 
    //        am_item_map_slno = ?          `
    //         ,
    //         [
    //             data.submited_condemnation,
    //             data.am_item_map_slno
    //         ],
    //         (error, results, feilds) => {

    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);
    //         }
    //     )
    // },
    UpdateAssetStatus: (data, callBack) => {
        const query = `
            UPDATE am_asset_item_map_master
            SET submited_condemnation = ?
            WHERE am_item_map_slno = ?
        `;

        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(query, item, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        });
        Promise.all(promises)
            .then((results) => callBack(null, results))
            .catch((error) => callBack(error));
    },

    // UpdateSpareStatus: (data, callback) => {
    //     pool.query(`
    //        UPDATE am_spare_item_map_master
    //        SET 
    //        submited_condemnation = ?,    
    //        WHERE 
    //        am_spare_item_map_slno = ?          `
    //         ,
    //         [
    //             data.submited_condemnation,
    //             data.am_item_map_slno
    //         ],
    //         (error, results, feilds) => {

    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);
    //         }
    //     )
    // },
    UpdateSpareStatus: (data, callBack) => {
        const query = `
            UPDATE am_spare_item_map_master
            SET submited_condemnation = ?
            WHERE am_spare_item_map_slno = ?
        `;

        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(query, item, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        });
        Promise.all(promises)
            .then((results) => callBack(null, results))
            .catch((error) => callBack(error));
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
            inch_emp.em_name as incharge_employee,
            hod_emp.em_name as hod_employee,
            gm_emp.em_name as gm_opr_employee,
            ac_emp.em_name as accounts_employee,
            mm_emp.em_name as material_mangm_employee,
            st_emp.em_name as store_approve_employee,   
            inch_apprv_reject_date,
            hod_apprv_reject_date,
            gm_apprv_reject_date,
            acc_apprv_reject_date,
            material_mange_apprv_reject_date,
            condem_form_prefix,
            condem_form_no,
            am_condem_reason,
            reg_date, 
            store_approve_status,          
            store_approve_remarks,
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
            store_approve_reject_date,
            material_mangmnt_mangr_apprv_status, 
            material_mangmnt_mangr_apprv_remark, 
            am_condemnation_master.create_user,
            COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
            COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
            FROM am_condemnation_master
            LEFT JOIN am_condemnation_details 
            ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno
            left join co_employee_master inch_emp on inch_emp.em_id=am_condemnation_master.inch_emp
            left join co_employee_master hod_emp on hod_emp.em_id=am_condemnation_master.hod_emp
            left join co_employee_master gm_emp on gm_emp.em_id=am_condemnation_master.gm_emp
            left join co_employee_master ac_emp on ac_emp.em_id=am_condemnation_master.acc_emp
            left join co_employee_master mm_emp on mm_emp.em_id=am_condemnation_master.material_mang_emp
            left join co_employee_master st_emp on st_emp.em_id=am_condemnation_master.store_approve_emp
            WHERE am_condemnation_master.req_dept = ?
            AND condem_status < ?
            AND condem_status > ?
            GROUP BY 
            am_condemnation_master.condem_mast_slno, condem_form_prefix, condem_form_no, 
            reg_date, req_dept, condem_status, incharge_approve_status, incharge_remarks, 
            hod_approve_status, hod_remarks, gm_approve_status, gm_approve_remarks, 
            acc_approve_status, acc_approve_remarks, material_mangmnt_mangr_apprv_status, 
            material_mangmnt_mangr_apprv_remark,am_condemnation_master.create_user
            order by condem_status desc`,

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

    getAllpendingApprovals: (data, callback) => {
        pool.query(
            `SELECT
            am_condemnation_master.condem_mast_slno,
            inch_emp.em_name as incharge_employee,
            hod_emp.em_name as hod_employee,
            gm_emp.em_name as gm_opr_employee,
            ac_emp.em_name as accounts_employee,
            mm_emp.em_name as material_mangm_employee,
            st_emp.em_name as store_approve_employee,              
            inch_apprv_reject_date,
            hod_apprv_reject_date,
            gm_apprv_reject_date,
            acc_apprv_reject_date,
            material_mange_apprv_reject_date,
            condem_form_prefix,
            condem_form_no,
            am_condem_reason,
            reg_date, 
            req_dept, 
            condem_status, 
            incharge_approve_status, 
            incharge_remarks, 
            hod_approve_status,
            store_approve_status,
            store_approve_remarks,
            hod_remarks, 
            gm_approve_status, 
            gm_approve_remarks, 
            acc_approve_status, 
            acc_approve_remarks, 
            store_approve_reject_date,
            material_mangmnt_mangr_apprv_status, 
            material_mangmnt_mangr_apprv_remark, 
            am_condemnation_master.create_user,
            COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
            COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
            FROM am_condemnation_master
            LEFT JOIN am_condemnation_details 
            ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno
            left join co_employee_master inch_emp on inch_emp.em_id=am_condemnation_master.inch_emp
            left join co_employee_master hod_emp on hod_emp.em_id=am_condemnation_master.hod_emp
            left join co_employee_master gm_emp on gm_emp.em_id=am_condemnation_master.gm_emp
            left join co_employee_master ac_emp on ac_emp.em_id=am_condemnation_master.acc_emp
            left join co_employee_master mm_emp on mm_emp.em_id=am_condemnation_master.material_mang_emp
            left join co_employee_master st_emp on st_emp.em_id=am_condemnation_master.store_approve_emp
            WHERE
            condem_status < ?
            AND condem_status > ?
            GROUP BY 
            am_condemnation_master.condem_mast_slno, condem_form_prefix, condem_form_no, 
            reg_date, req_dept, condem_status, incharge_approve_status, incharge_remarks, 
            hod_approve_status, hod_remarks, gm_approve_status, gm_approve_remarks, 
            acc_approve_status, acc_approve_remarks, material_mangmnt_mangr_apprv_status, 
            material_mangmnt_mangr_apprv_remark,am_condemnation_master.create_user
            order by condem_status desc `,
            [
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
            // `select            
            // am_condem_detail_slno,
            // condem_form_prefix,
            // condem_form_no,
            // keep_inscarp_status,
            // keep_in_srap_store_reason,
            // scarp_store_emp,     
            // am_asset_item_map_master.item_asset_no,
            // am_asset_item_map_master.item_asset_no_only,
            // am_spare_item_map_master.spare_asset_no,
            // am_spare_item_map_master.spare_asset_no_only,
            // item1.item_name as item_asset_name,
            // item2.item_name as item_spare_name,
            // cat1.category_name as cat_asset_name,
            // cat2.category_name as cat_spare_name,
            // service1.complaint_slno as asset_complaint_slno,
            // service2.complaint_slno as spare_complaint_slno,
            // am_condemnation_details.condem_mast_slno,
            // am_condemnation_details.am_asset_item_slno as am_item_map_slno,
            // am_condemnation_details.am_spare_item_slno as am_spare_item_map_slno,
            // itemmap1.am_bill_amount as asset_bill_amount,
            // itemmap2.am_bill_amount as spare_bill_amount,
            // itemmap1.am_manufacture_no as asset_am_manufacture_no,
            // itemmap2.am_manufacture_no as spare_am_manufacture_no,
            // itemmap1.am_asset_old_no as asset_am_asset_old_no,
            // itemmap2.am_asset_old_no as spare_am_asset_old_no,
            // itemmap1.am_grn_no as asset_am_grn_no,
            // itemmap2.am_grn_no as spare_am_grn_no,
            // itemmap1.am_bill_mast_slno as asset_am_bill_mast_slno,
            // itemmap2.am_bill_mast_slno as spare_am_bill_mast_slno,
            // itemmap1.am_grn_date as asset_am_grn_date,
            // itemmap2.am_grn_date as spare_am_grn_date,
            // asset_bill.am_bill_no as asset_am_bill_no,
            // Spare_bill.am_bill_no as spare_am_bill_no,            
            // asset_bill.am_bill_date as asset_am_bill_date,
            // Spare_bill.am_bill_date as spare_am_bill_date,
            // asset_suppl_name.it_supplier_name as asset_supplier_name,
            // spare_suppl_name.it_supplier_name as spare_supplier_name,
            // service1.condm_transf_remarks as asset_condm_transf_remarks,
            // service2.condm_transf_remarks as spare_condm_transf_remarks,
            // asset_bill.am_bill_image as asset_am_bill_image,
            // Spare_bill.am_bill_image as spare_am_bill_image,            
            // am_condem_reason,
            // item_status
            // from
            // am_condemnation_details
            // left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=am_condemnation_details.am_asset_item_slno
            // left join am_spare_item_map_master on am_spare_item_map_master.am_spare_item_map_slno=am_condemnation_details.am_spare_item_slno
            // left join am_item_name_creation item1 on item1.item_creation_slno=am_asset_item_map_master.item_creation_slno
            // left join am_item_name_creation item2 on item2.item_creation_slno=am_spare_item_map_master.spare_creation_slno
            // left join am_category cat1 on cat1.category_slno=item1.item_category_slno  
            // left join am_category cat2 on cat2.category_slno=item2.item_category_slno  
            // left join am_service_details service1 on service1.am_asset_item_slno=am_asset_item_map_master.am_item_map_slno
            // left join am_service_details service2 on service2.am_spare_item_slno=am_spare_item_map_master.am_spare_item_map_slno
            // left join am_item_map_details itemmap1 on itemmap1.am_Item_map_slno=am_asset_item_map_master.am_item_map_slno
            // left join am_item_map_details itemmap2 on itemmap2.am_spare_item_map_slno= am_spare_item_map_master.am_spare_item_map_slno
            // left join am_bill_master asset_bill on asset_bill.am_bill_mastslno=itemmap1.am_bill_mast_slno
            // left join am_bill_master Spare_bill on Spare_bill.am_bill_mastslno=itemmap2.am_bill_mast_slno
            // left join it_bill_supplier_details_mast asset_suppl_name on asset_suppl_name.it_supplier_slno=asset_bill.am_bill_supplier
            //  left join it_bill_supplier_details_mast spare_suppl_name on spare_suppl_name.it_supplier_slno=Spare_bill.am_bill_supplier
            // left join am_condemnation_master on am_condemnation_master.condem_mast_slno=am_condemnation_details.condem_mast_slno
            // where
            // item_status!=0
            // and 
            // am_condemnation_details.condem_mast_slno=?`,
            `SELECT             
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
            item1.item_name AS item_asset_name,
            item2.item_name AS item_spare_name,
            cat1.category_name AS cat_asset_name,
            cat2.category_name AS cat_spare_name,
            MAX(service1.complaint_slno) AS asset_complaint_slno,
            MAX(service2.complaint_slno) AS spare_complaint_slno,
            am_condemnation_details.condem_mast_slno,
            am_condemnation_details.am_asset_item_slno AS am_item_map_slno,
            am_condemnation_details.am_spare_item_slno AS am_spare_item_map_slno,
            MAX(itemmap1.am_bill_amount) AS asset_bill_amount,
            MAX(itemmap2.am_bill_amount) AS spare_bill_amount,
            MAX(itemmap1.am_manufacture_no) AS asset_am_manufacture_no,
            MAX(itemmap2.am_manufacture_no) AS spare_am_manufacture_no,
            MAX(itemmap1.am_asset_old_no) AS asset_am_asset_old_no,           
            MAX(itemmap2.am_asset_old_no) AS spare_am_asset_old_no,          
            MAX(itemmap1.am_grn_no) AS asset_am_grn_no,
            MAX(itemmap2.am_grn_no) AS spare_am_grn_no,
            MAX(itemmap1.am_bill_mast_slno) AS asset_am_bill_mast_slno,
            MAX(itemmap2.am_bill_mast_slno) AS spare_am_bill_mast_slno,
            MAX(itemmap1.am_grn_date) AS asset_am_grn_date,
            MAX(itemmap2.am_grn_date) AS spare_am_grn_date,
            MAX(asset_bill.am_bill_no) AS asset_am_bill_no,
            MAX(Spare_bill.am_bill_no) AS spare_am_bill_no,            
            MAX(asset_bill.am_bill_date) AS asset_am_bill_date,
            MAX(Spare_bill.am_bill_date) AS spare_am_bill_date,
            MAX(asset_suppl_name.it_supplier_name) AS asset_supplier_name,
            MAX(spare_suppl_name.it_supplier_name) AS spare_supplier_name,
            MAX(service1.condm_transf_remarks) AS asset_condm_transf_remarks,
            MAX(service2.condm_transf_remarks) AS spare_condm_transf_remarks,
            MAX(asset_bill.am_bill_image) AS asset_am_bill_image,
            MAX(Spare_bill.am_bill_image) AS spare_am_bill_image,            
            am_condem_reason,
            item_status
            FROM am_condemnation_details
            LEFT JOIN am_asset_item_map_master 
            ON am_asset_item_map_master.am_item_map_slno = am_condemnation_details.am_asset_item_slno
            LEFT JOIN am_spare_item_map_master 
            ON am_spare_item_map_master.am_spare_item_map_slno = am_condemnation_details.am_spare_item_slno
            LEFT JOIN am_item_name_creation item1 
            ON item1.item_creation_slno = am_asset_item_map_master.item_creation_slno
            LEFT JOIN am_item_name_creation item2 
            ON item2.item_creation_slno = am_spare_item_map_master.spare_creation_slno
            LEFT JOIN am_category cat1 
            ON cat1.category_slno = item1.item_category_slno  
            LEFT JOIN am_category cat2 
            ON cat2.category_slno = item2.item_category_slno  
            LEFT JOIN am_service_details service1 
            ON service1.am_asset_item_slno = am_asset_item_map_master.am_item_map_slno
            LEFT JOIN am_service_details service2 
            ON service2.am_spare_item_slno = am_spare_item_map_master.am_spare_item_map_slno
            LEFT JOIN am_item_map_details itemmap1 
            ON itemmap1.am_Item_map_slno = am_asset_item_map_master.am_item_map_slno
            LEFT JOIN am_item_map_details itemmap2 
            ON itemmap2.am_spare_item_map_slno = am_spare_item_map_master.am_spare_item_map_slno
            LEFT JOIN am_bill_master asset_bill 
            ON asset_bill.am_bill_mastslno = itemmap1.am_bill_mast_slno
            LEFT JOIN am_bill_master Spare_bill 
            ON Spare_bill.am_bill_mastslno = itemmap2.am_bill_mast_slno
            LEFT JOIN it_bill_supplier_details_mast asset_suppl_name 
            ON asset_suppl_name.it_supplier_slno = asset_bill.am_bill_supplier
            LEFT JOIN it_bill_supplier_details_mast spare_suppl_name 
            ON spare_suppl_name.it_supplier_slno = Spare_bill.am_bill_supplier
            LEFT JOIN am_condemnation_master 
            ON am_condemnation_master.condem_mast_slno = am_condemnation_details.condem_mast_slno
            WHERE item_status != 0
            AND am_condemnation_details.condem_mast_slno = ?
            GROUP BY am_condem_detail_slno, condem_form_prefix, condem_form_no, keep_inscarp_status, keep_in_srap_store_reason, scarp_store_emp, 
            am_asset_item_map_master.item_asset_no, am_asset_item_map_master.item_asset_no_only, 
            am_spare_item_map_master.spare_asset_no, am_spare_item_map_master.spare_asset_no_only, 
            item1.item_name, item2.item_name, cat1.category_name, cat2.category_name, 
            am_condemnation_details.condem_mast_slno, am_condemnation_details.am_asset_item_slno, am_condemnation_details.am_spare_item_slno, 
            am_condem_reason, item_status
                
`,
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
        pool.query(
            ` UPDATE am_condemnation_details
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
    getCondemnationList: (sql, params, callback) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },
    getDeptCondemnationList: (sql, params, callback) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    getDeptScrapStore: (data, callback) => {
        pool.query(

            `select 
            am_condem_detail_slno, 
            item1.item_name AS item_asset_name,
            item2.item_name AS item_spare_name,
            cat1.category_name AS cat_asset_name,
            cat2.category_name AS cat_spare_name,
            item_asset_no,
            spare_asset_no,
            spare_asset_no_only,
            item_asset_no_only,
            am_condemnation_details.condem_mast_slno,
            am_asset_item_slno, 
            am_spare_item_slno,
            am_condem_reason,
            item_status, 
            keep_inscarp_status, 
            keep_in_srap_store_reason, 
            scarp_store_emp,
            file_status,
            condem_form_prefix,
            condem_form_no
            from 
            am_condemnation_details
            left join am_condemnation_master on am_condemnation_master.condem_mast_slno = am_condemnation_details.condem_mast_slno
            left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno = am_condemnation_details.am_asset_item_slno
            left join am_spare_item_map_master on am_spare_item_map_master.am_spare_item_map_slno = am_condemnation_details.am_spare_item_slno
            LEFT JOIN am_item_name_creation item1 ON item1.item_creation_slno = am_asset_item_map_master.item_creation_slno
            LEFT JOIN am_item_name_creation item2 ON item2.item_creation_slno = am_spare_item_map_master.spare_creation_slno
            LEFT JOIN am_category cat1  ON cat1.category_slno = item1.item_category_slno  
            LEFT JOIN am_category cat2  ON cat2.category_slno = item2.item_category_slno  
            where
            keep_inscarp_status=1
            and 
            req_dept=?`,

            [
                data.empdept
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}