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
           item_status,
           create_user       
           )
          VALUES(?,?,?,?,?)`,
            [
                data.condem_mast_slno,
                data.am_asset_item_slno,
                data.am_spare_item_slno,
                data.item_status,
                data.create_user

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
                *,
                co_department_mast.dept_name as req_dpt_name,
                inch_employee_mast.em_name as inch_emp,
                hod_employee_mast.em_name as hod_emp,
                am_condem_approval_level_master.level_name as current_lvl,
            COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
            COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
            FROM am_condemnation_master
            LEFT JOIN am_condemnation_details  ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno   
            LEFT JOIN am_condem_approval_level_master ON am_condem_approval_level_master.level_no = am_condemnation_master.condem_level
            LEFT JOIN co_employee_master inch_employee_mast ON inch_employee_mast.em_id = am_condemnation_master.inch_employee                    
            LEFT JOIN co_employee_master hod_employee_mast ON hod_employee_mast.em_id = am_condemnation_master.hod_employee
            LEFT JOIN co_department_mast  ON co_department_mast.dept_id = am_condemnation_master.req_dept
            WHERE am_condemnation_master.req_dept = ?   
            AND am_condemnation_master.condem_level < ?
            AND condemn_all_approved = 0
            AND condemn_rejected=0
            AND condem_status = 1
            GROUP BY 
            am_condemnation_master.condem_mast_slno, condem_form_prefix, condem_form_no, 
            reg_date, req_dept, condem_status
            order by condem_status desc`,
            [

                data.empdept,
                data.levelNo
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
            // `SELECT             
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
            // item1.item_name AS item_asset_name,
            // item2.item_name AS item_spare_name,
            // cat1.category_name AS cat_asset_name,
            // cat2.category_name AS cat_spare_name,
            // MAX(service1.complaint_slno) AS asset_complaint_slno,
            // MAX(service2.complaint_slno) AS spare_complaint_slno,
            // am_condemnation_details.condem_mast_slno,
            // am_condemnation_details.am_asset_item_slno AS am_item_map_slno,
            // am_condemnation_details.am_spare_item_slno AS am_spare_item_map_slno,
            // MAX(itemmap1.am_bill_amount) AS asset_bill_amount,
            // MAX(itemmap2.am_bill_amount) AS spare_bill_amount,
            // MAX(itemmap1.am_manufacture_no) AS asset_am_manufacture_no,
            // MAX(itemmap2.am_manufacture_no) AS spare_am_manufacture_no,
            // MAX(itemmap1.am_asset_old_no) AS asset_am_asset_old_no,           
            // MAX(itemmap2.am_asset_old_no) AS spare_am_asset_old_no,          
            // MAX(itemmap1.am_grn_no) AS asset_am_grn_no,
            // MAX(itemmap2.am_grn_no) AS spare_am_grn_no,
            // MAX(itemmap1.am_bill_mast_slno) AS asset_am_bill_mast_slno,
            // MAX(itemmap2.am_bill_mast_slno) AS spare_am_bill_mast_slno,
            // MAX(itemmap1.am_grn_date) AS asset_am_grn_date,
            // MAX(itemmap2.am_grn_date) AS spare_am_grn_date,
            // MAX(asset_bill.am_bill_no) AS asset_am_bill_no,
            // MAX(Spare_bill.am_bill_no) AS spare_am_bill_no,            
            // MAX(asset_bill.am_bill_date) AS asset_am_bill_date,
            // MAX(Spare_bill.am_bill_date) AS spare_am_bill_date,
            // MAX(asset_suppl_name.it_supplier_name) AS asset_supplier_name,
            // MAX(spare_suppl_name.it_supplier_name) AS spare_supplier_name,
            // MAX(service1.condm_transf_remarks) AS asset_condm_transf_remarks,
            // MAX(service2.condm_transf_remarks) AS spare_condm_transf_remarks,
            // MAX(asset_bill.am_bill_image) AS asset_am_bill_image,
            // MAX(Spare_bill.am_bill_image) AS spare_am_bill_image,            
            // am_condem_reason,
            // item_status
            // FROM am_condemnation_details
            // LEFT JOIN am_asset_item_map_master 
            // ON am_asset_item_map_master.am_item_map_slno = am_condemnation_details.am_asset_item_slno
            // LEFT JOIN am_spare_item_map_master 
            // ON am_spare_item_map_master.am_spare_item_map_slno = am_condemnation_details.am_spare_item_slno
            // LEFT JOIN am_item_name_creation item1 
            // ON item1.item_creation_slno = am_asset_item_map_master.item_creation_slno
            // LEFT JOIN am_item_name_creation item2 
            // ON item2.item_creation_slno = am_spare_item_map_master.spare_creation_slno
            // LEFT JOIN am_category cat1 
            // ON cat1.category_slno = item1.item_category_slno  
            // LEFT JOIN am_category cat2 
            // ON cat2.category_slno = item2.item_category_slno  
            // LEFT JOIN am_service_details service1 
            // ON service1.am_asset_item_slno = am_asset_item_map_master.am_item_map_slno
            // LEFT JOIN am_service_details service2 
            // ON service2.am_spare_item_slno = am_spare_item_map_master.am_spare_item_map_slno
            // LEFT JOIN am_item_map_details itemmap1 
            // ON itemmap1.am_Item_map_slno = am_asset_item_map_master.am_item_map_slno
            // LEFT JOIN am_item_map_details itemmap2 
            // ON itemmap2.am_spare_item_map_slno = am_spare_item_map_master.am_spare_item_map_slno
            // LEFT JOIN am_bill_master asset_bill 
            // ON asset_bill.am_bill_mastslno = itemmap1.am_bill_mast_slno
            // LEFT JOIN am_bill_master Spare_bill 
            // ON Spare_bill.am_bill_mastslno = itemmap2.am_bill_mast_slno
            // LEFT JOIN it_bill_supplier_details_mast asset_suppl_name 
            // ON asset_suppl_name.it_supplier_slno = asset_bill.am_bill_supplier
            // LEFT JOIN it_bill_supplier_details_mast spare_suppl_name 
            // ON spare_suppl_name.it_supplier_slno = Spare_bill.am_bill_supplier
            // LEFT JOIN am_condemnation_master 
            // ON am_condemnation_master.condem_mast_slno = am_condemnation_details.condem_mast_slno

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
            ticket1.cm_complaint_location as ticket1_location,
			ticket2.cm_complaint_location as ticket2_location,
            sec1.sec_name as sec1_name,
			sec2.sec_name as sec2_name, 
            MAX(rm_room1.rm_room_name) AS ticket1_roomname,
			MAX(rm_room2.rm_room_name) AS ticket2_roomname,           
			MAX(rm_roomtype1.rm_roomtype_name) AS ticket1_roomtype,
			MAX(rm_roomtype2.rm_roomtype_name) AS ticket2_roomtype,
			MAX(rm_floor1.rm_floor_name) AS ticket1_floor,            	
			MAX(rm_floor2.rm_floor_name) AS ticket2_floor,
			MAX(rm_block1.rm_insidebuildblock_name) AS ticket1_block,  
			MAX(rm_block2.rm_insidebuildblock_name) AS ticket2_block,            
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
            LEFT JOIN cm_complaint_mast ticket1 
            ON ticket1.complaint_slno = service1.complaint_slno
            LEFT JOIN cm_complaint_mast ticket2
            ON ticket2.complaint_slno = service2.complaint_slno            
			LEFT JOIN co_deptsec_mast sec1 
            ON sec1.sec_id=ticket1.complaint_dept_secslno
            LEFT JOIN co_deptsec_mast sec2 
            ON sec2.sec_id=ticket2.complaint_dept_secslno             
			LEFT JOIN rm_newroom_creation rm_room1
			ON rm_room1.rm_room_slno = ticket1.rm_room_slno
			LEFT JOIN rm_room_type_master rm_roomtype1
			ON rm_roomtype1.rm_roomtype_slno = rm_room1.rm_roomtype_slno
			LEFT JOIN rm_floor_creation rm_floor1
			ON rm_floor1.rm_floor_slno = rm_room1.rm_room_floor_slno
			LEFT JOIN rm_insidebuildblock_mast rm_block1
			ON rm_block1.rm_insidebuildblock_slno = rm_room1.rm_insidebuilldblock_slno			
			LEFT JOIN rm_newroom_creation rm_room2
			ON rm_room2.rm_room_slno = ticket2.rm_room_slno
			LEFT JOIN rm_room_type_master rm_roomtype2
			ON rm_roomtype2.rm_roomtype_slno = rm_room2.rm_roomtype_slno
			LEFT JOIN rm_floor_creation rm_floor2
			ON rm_floor2.rm_floor_slno = rm_room2.rm_room_floor_slno
			LEFT JOIN rm_insidebuildblock_mast rm_block2
			ON rm_block2.rm_insidebuildblock_slno = rm_room2.rm_insidebuilldblock_slno  
            WHERE item_status != 0
            AND am_condemnation_details.condem_mast_slno = ?
            GROUP BY am_condem_detail_slno, condem_form_prefix, condem_form_no, keep_inscarp_status, keep_in_srap_store_reason, scarp_store_emp, 
            am_asset_item_map_master.item_asset_no, am_asset_item_map_master.item_asset_no_only, 
            am_spare_item_map_master.spare_asset_no, am_spare_item_map_master.spare_asset_no_only, 
            item1.item_name, item2.item_name, cat1.category_name, cat2.category_name, 
            am_condemnation_details.condem_mast_slno, am_condemnation_details.am_asset_item_slno, am_condemnation_details.am_spare_item_slno, 
            am_condem_reason, item_status`,
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
           reg_date = NOW(),   
           condem_status=?,
           edit_user=?,
           req_dept=?
           WHERE 
           condem_mast_slno = ? `,
            [
                data.condem_form_no,
                data.condem_form_prefix,              
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
           condem_mast_slno = ?
           AND (
            (am_asset_item_slno = ? AND am_asset_item_slno IS NOT NULL)
            OR 
            (am_spare_item_slno = ? AND am_spare_item_slno IS NOT NULL)) `,
            [
                data.keep_inscarp_status,
                data.keep_in_srap_store_reason,
                data.scarp_store_emp,
                data.condem_mast_slno,
                data.am_item_map_slno,
                data.am_spare_item_map_slno
         
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


    getAllpendingApprovals: (sql, params, callback) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },


        getScrapNotUnderCategorization: (callback) => {
        pool.query(
            `select
            ROW_NUMBER() OVER () AS slno,
            am_asset_item_slno,
            am_spare_item_slno,
            cat1.category_name as cat_asset_name,
            cat2.category_name as cat_spare_name,
            item1.item_name as asset_item_name,
            item2.item_name as spare_item_name
            from 
            am_condemnation_details
            left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=am_condemnation_details.am_asset_item_slno
            left join am_spare_item_map_master on am_spare_item_map_master.am_spare_item_map_slno=am_condemnation_details.am_spare_item_slno
            left join am_item_name_creation item1 on item1.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join am_item_name_creation item2 on item2.item_creation_slno=am_spare_item_map_master.spare_creation_slno
            left join am_category cat1 on cat1.category_slno=item1.item_category_slno  
            left join am_category cat2 on cat2.category_slno=item2.item_category_slno  
            where
            item_status=1
            and
            keep_inscarp_status=0
            and 
            scarp_categorize=0`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
            getAddedScrapNotUnderCategorization: (callback) => {
        pool.query(
           `select
            ROW_NUMBER() OVER () AS slno,
            item_slno, item_name, scrap_categorize, item_status
            from 
            am_condemnation_added_items          
            where
            item_status=1
            and           
            scrap_categorize=0`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
        getInsertNewItemUnderCondemnation: (data, callback) => {
        pool.query(
            `INSERT INTO am_condemnation_added_items
          (            
            item_name,
            item_status,
            create_user        
          )
          VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    UpdateScrapCategorize: (data, callback) => {
               
        pool.query(
            `UPDATE am_condemnation_details
            SET
                scrap_category = ?,
                scrap_quality = ?,
                scrap_yard = ?,
                scarp_categorize = 1
            WHERE
                (am_asset_item_slno = ? AND am_asset_item_slno IS NOT NULL)
                OR 
                (am_spare_item_slno = ? AND am_spare_item_slno IS NOT NULL)
            `,
            [
                data.scrap_category,
                data.scrap_quality,
                JSON.stringify(data.scrap_yard),             
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

      UpdateItemScrapCategorize: (data, callback) => {
            
        pool.query(
            ` UPDATE am_condemnation_added_items
            SET
                scrap_category = ?,
                scrap_quality = ?,
                scrap_yard = ?,
                scrap_categorize = 1
            WHERE
                item_slno=?
            `,
            [
        
                data.scrap_category,
                data.scrap_quality,
                JSON.stringify(data.scrap_yard),        
                data.item_slno,
               
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

        getcondemdAssetCategoryWiseDashboard: (callback) => {
        pool.query(
            `SELECT 
                combined.scrap_category,
                combined.category_name,
                combined.scrap_quality,
                combined.quality_name,
                SUM(combined.category_count) AS total_count
            FROM (
                SELECT 
                    a.scrap_category,
                    cat.category_name,
                    a.scrap_quality,
                    q.quality_name,
                    COUNT(*) AS category_count
                FROM 
                    am_condemnation_added_items a
                LEFT JOIN 
                    am_condemnation_category_mast cat ON cat.category_slno = a.scrap_category
                LEFT JOIN 
                    am_condemn_quality_master q ON q.quality_slno = a.scrap_quality
                WHERE
                    a.scrap_submitted = 0
                    AND a.scrap_categorize = 1
                    AND a.item_status = 1
                    AND a.scrap_category IS NOT NULL
                GROUP BY 
                    a.scrap_category,
                    cat.category_name,
                    a.scrap_quality,
                    q.quality_name

                UNION ALL

                SELECT 
                    d.scrap_category,
                    cat.category_name,
                    d.scrap_quality,
                    q.quality_name,
                    COUNT(*) AS category_count
                FROM 
                    am_condemnation_details d
                LEFT JOIN 
                    am_condemnation_category_mast cat ON cat.category_slno = d.scrap_category
                LEFT JOIN 
                    am_condemn_quality_master q ON q.quality_slno = d.scrap_quality
                WHERE
                    d.scrap_submitted = 0
                    AND d.scrap_category IS NOT NULL
                GROUP BY 
                    d.scrap_category,
                    cat.category_name,
                    d.scrap_quality,
                    q.quality_name
            ) AS combined
            GROUP BY 
                combined.scrap_category,
                combined.category_name,
                combined.scrap_quality,
                combined.quality_name
            ORDER BY 
                combined.category_name,
                combined.quality_name`,
                [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

        ViewCategorizedItems: (data, callback) => {       
           
        pool.query(           
            `Select 
            am_condem_detail_slno,
            scrap_category,
            scrap_quality,
            scrap_yard,
            cat.category_name,
            q.quality_name,
            am_asset_item_slno,
            am_spare_item_slno,
            ai.item_name as asset_item_name,
            si.item_name as spare_item_name,
            yard_name
            from
            am_condemnation_details
            LEFT JOIN 
            am_condemnation_category_mast cat ON cat.category_slno = am_condemnation_details.scrap_category
            LEFT JOIN 
            am_condemn_quality_master q ON q.quality_slno = am_condemnation_details.scrap_quality
             LEFT JOIN 
            am_condemn_scrap_yard y ON y.yard_slno = am_condemnation_details.scrap_yard
			 LEFT JOIN 
			am_asset_item_map_master a ON a.am_item_map_slno = am_condemnation_details.am_asset_item_slno
			LEFT JOIN 
			am_spare_item_map_master s ON s.am_spare_item_map_slno = am_condemnation_details.am_spare_item_slno
			LEFT JOIN 
			am_item_name_creation ai ON ai.item_creation_slno = a.item_creation_slno
			LEFT JOIN 
			am_item_name_creation si ON si.item_creation_slno = s.spare_creation_slno
            where  
            am_condemnation_details.scarp_categorize = 1
            and item_status = 1 
            and scrap_submitted = 0
            and scrap_category = ?
            and scrap_quality = ?`,
            [
                data.scrap_category,
                data.scrap_quality
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    
    ViewCategorizedAddedItems: (data, callback) => {
        
        pool.query(
            `select 
            item_slno,
            item_name,
            scrap_category,
            scrap_quality,
            scrap_yard,
            cat.category_name,
            q.quality_name,
            yard_name
            from
            am_condemnation_added_items
            LEFT JOIN 
            am_condemnation_category_mast cat ON cat.category_slno = am_condemnation_added_items.scrap_category
            LEFT JOIN 
            am_condemn_quality_master q ON q.quality_slno = am_condemnation_added_items.scrap_quality
            LEFT JOIN 
            am_condemn_scrap_yard y ON y.yard_slno = am_condemnation_added_items.scrap_yard
            where  
            scrap_categorize = 1
            and scrap_submitted = 0
            and scrap_category = ?
            and scrap_quality = ?
            `,
            [
                data.scrap_category,
                data.scrap_quality
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );        
    },

   getSelectedSupplierRateDetails: (data, callback) => {
    pool.query(
           `SELECT 
            condemn_rate_slno,
            supplier_slno,
            category_slno,
            quality_slno,
            quantity_unit_slno, 
            unit,
            price,
            supplier_status,
            condem_quantity_name
            FROM am_condemn_supplier_rate_master
            left join am_condemnation_quantity_unit on am_condemnation_quantity_unit.condem_quantity_slno  =am_condemn_supplier_rate_master.quantity_unit_slno
            WHERE supplier_status = 1
            AND supplier_slno = ?
            AND category_slno = ?
            AND quality_slno = ?`,
        [
            data.supplier,
            data.scrap_category,
            data.scrap_quality
        ],
        (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
},

 

// Form Insert Function
submitScrapForm: (data, callback) => {
    
    pool.query(
        `INSERT INTO am_scrap_condemn_form
        (
            scrap_condemn_Form_no,
            scrap_yard,
            supplier_slno,
            recipient_name,
            recipient_contact_number,
            recipient_vehicle_no,
            total_rate
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            data.scrap_condemn_Form_no,
            JSON.stringify(data.scrap_yard),
            data.supplier_slno,
            data.recipient_name,
            data.contact_no,
            data.vehicle_no,
            data.total_rate
        ],
        (error, results, fields) => {
            if (error) { 
                return callback(error);
            }
     
            return callback(null, results);
        }
    );
},

ScrapCategoryQuantityRateInsert: (data, callback) => {
    pool.query(
        `INSERT INTO am_scrap_condemn_rate_details
        (
            condem_form_slno, 
            category_slno,
            quality_slno,
            units,
            quantity_slno, 
            scrap_rate        
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            data.condem_form_slno,
            data.category_slno,
            data.quality_slno,
            data.units,
            data.quantity_slno,
            data.scrap_rate
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
},

      updateScrapSubmittedDetail: (data, callback) => {            
        pool.query(
              ` update 
                am_condemnation_details set
                scrap_submitted =1,
                scrap_condemn_Form_slno = ?
                where
                am_condem_detail_slno = ?
            `,
            [
        
                data.scrap_condemn_Form_slno,
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

        updateScrapSubmittedAddedItems: (data, callback) => {            
        pool.query(
              ` update 
                am_condemnation_added_items set
                scrap_submitted = 1,
                scrap_condemn_Form_slno = ?
                where
                item_slno = ?
            `,
            [
        
                data.scrap_condemn_Form_slno,
                data.item_slno
               
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

 getSubmittedScarpForms: (callback) => {
        pool.query(
 
        //  `select 
        //     am_scrap_condemn_form.scrap_condemn_Form_slno, scrap_condemn_Form_no, form_submit_date, 
        //     scrap_yard, supplier_slno, recipient_name, recipient_contact_number,
        //     recipient_vehicle_no, total_rate, form_status, am_scrap_condemn_form.level_no,
        //     level_name,
        //     it_supplier_name,
        //     level_state,
        //     payment_mode,
        //     payment_acknowledge,
        //     amount_collected,
        //     gate_pass_generated_date,
        //     gate_pass_request_no,
        //     gate_pass_acknowledge,
        //     payment_acknowledge_date,
        //     gate_pass_requested,
        //     gate_pass_approved ,
        //     gate_pass_employee.em_name as gate_pass_ackowledge,
        //     payemnt_acknowledge.em_name as payemnt_acknowledge_by,
        //     am_condemn_scrap_yard.yard_name
        //     from
        //     am_scrap_condemn_form
        //     left join am_scrap_form_approval_levels on am_scrap_form_approval_levels.level_no = am_scrap_condemn_form.level_no   
        //     left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno = am_scrap_condemn_form.supplier_slno   
        //     left join co_employee_master  gate_pass_employee on  gate_pass_employee.em_id =  am_scrap_condemn_form.gate_pass_acknowledge
        //     left join co_employee_master  payemnt_acknowledge on  payemnt_acknowledge.em_id =  am_scrap_condemn_form.payment_acknowledge
        //     left join am_condemn_scrap_yard  am_condemn_scrap_yard on  am_condemn_scrap_yard.yard_slno =  am_scrap_condemn_form.scrap_yard
        //     where
        //     form_status=1`
                `select 
                f.scrap_condemn_Form_slno, 
                f.scrap_condemn_Form_no, 
                f.form_submit_date, 
                f.scrap_yard, 
                f.supplier_slno, 
                f.recipient_name, 
                f.recipient_contact_number,
                f.recipient_vehicle_no, 
                f.total_rate, 
                f.form_status, 
                f.level_no,
                l.level_name,
                s.it_supplier_name,
                f.level_state,
                f.payment_mode,
                f.payment_acknowledge,
                f.amount_collected,
                f.gate_pass_generated_date,
                f.gate_pass_request_no,
                f.gate_pass_acknowledge,
                f.payment_acknowledge_date,
                f.gate_pass_requested,
                f.gate_pass_approved,
                gp.em_name as gate_pass_ackowledge,
                pa.em_name as payemnt_acknowledge_by,
                GROUP_CONCAT(y.yard_name ORDER BY y.yard_name) as yard_names
            from am_scrap_condemn_form f
            left join am_scrap_form_approval_levels l on l.level_no = f.level_no   
            left join it_bill_supplier_details_mast s on s.it_supplier_slno = f.supplier_slno   
            left join co_employee_master gp on gp.em_id = f.gate_pass_acknowledge
            left join co_employee_master pa on pa.em_id = f.payment_acknowledge
            left join json_table(f.scrap_yard, '$[*]' columns(yard_slno int path '$')) j
                on true
            left join am_condemn_scrap_yard y 
                on y.yard_slno = j.yard_slno
            where f.form_status=1
            group by f.scrap_condemn_Form_slno;
            `,
                 [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
                getEmployeeScrapApprovalLevel: (id, callBack) => {
                
                    
                pool.query(
            //    `select 
            //     level_name,
            //     scrap_condemn_Form_slno, 
            //     scrap_condemn_Form_no,
            //     form_submit_date, 
            //     scrap_yard, 
            //     supplier_slno,
            //     recipient_contact_number,
            //     recipient_vehicle_no,           
            //     supplier_details.it_supplier_name,
            //     yard_name,
            //     recipient_name,
            //     total_rate,
            //     payment_mode,
            //     payment_acknowledge,
            //     amount_collected,
            //     gate_pass_generated_date,
            //     gate_pass_request_no,
            //     gate_pass_acknowledge,
            //     am_scrap_condemn_form.level_state
            //     from
            //     am_scrap_condemn_form
            //     left join  it_bill_supplier_details_mast supplier_details on  supplier_details.it_supplier_slno  = am_scrap_condemn_form.supplier_slno
			// 	left join  am_condemn_scrap_yard on am_condemn_scrap_yard.yard_slno  = am_scrap_condemn_form.scrap_yard
            //    	left join  am_scrap_form_approval_levels on am_scrap_form_approval_levels.level_no = am_scrap_condemn_form.level_no
            //     where 
            //     am_scrap_condemn_form.level_no = ?
            //     and 
            //     form_status = 1
            //     and
            //     level_state IS NULL
            //     OR level_state ='A'
            //     `,
                `SELECT
                asl.level_name,
                acf.scrap_condemn_Form_slno,
                acf.scrap_condemn_Form_no,
                acf.form_submit_date,
                acf.scrap_yard,
                acf.supplier_slno,
                acf.recipient_contact_number,
                acf.recipient_vehicle_no,
                supplier_details.it_supplier_name,
                COALESCE(yardAgg.yard_names, '')      AS yard_names,           
                acf.recipient_name,
                acf.total_rate,
                acf.payment_mode,
                acf.payment_acknowledge,
                acf.amount_collected,
                acf.gate_pass_generated_date,
                acf.gate_pass_request_no,
                acf.gate_pass_acknowledge,
                acf.level_state
                FROM am_scrap_condemn_form acf
                LEFT JOIN it_bill_supplier_details_mast supplier_details
                ON supplier_details.it_supplier_slno = acf.supplier_slno
                LEFT JOIN am_scrap_form_approval_levels asl
                ON asl.level_no = acf.level_no
                -- aggregate yard names & ids from the JSON array
                LEFT JOIN (
                SELECT
                    t.scrap_condemn_Form_slno,
                    GROUP_CONCAT(DISTINCT y.yard_name ORDER BY y.yard_name SEPARATOR ', ') AS yard_names
                FROM am_scrap_condemn_form t
                -- expand JSON array of ids into rows
                JOIN JSON_TABLE(
                    COALESCE(t.scrap_yard, '[]'),
                    '$[*]' COLUMNS (yard_slno INT PATH '$')
                ) AS jt ON 1
                LEFT JOIN am_condemn_scrap_yard y ON y.yard_slno = jt.yard_slno
                GROUP BY t.scrap_condemn_Form_slno
                ) AS yardAgg ON yardAgg.scrap_condemn_Form_slno = acf.scrap_condemn_Form_slno
                WHERE
                acf.level_no = ?
                AND acf.form_status = 1
                AND (acf.level_state IS NULL OR acf.level_state = 'A')`,

            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
                getCategoryQualityUnderscrapForm: (id, callBack) => {
                pool.query(
               `select
                * 
                from
                am_scrap_condemn_rate_details
                where 
                condem_form_slno =?`,

            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    ViewCategorizedItemsUnderscrapForm: (data, callback) => {   
     pool.query(
            `Select 
            am_condem_detail_slno,
            scrap_category,
            scrap_quality,
            scrap_yard,
            cat.category_name,
            q.quality_name,
            am_asset_item_slno,
            am_spare_item_slno,
            ai.item_name as asset_item_name,
            si.item_name as spare_item_name,
            yard_name
            from
            am_condemnation_details
            LEFT JOIN 
            am_condemnation_category_mast cat ON cat.category_slno = am_condemnation_details.scrap_category
            LEFT JOIN 
            am_condemn_quality_master q ON q.quality_slno = am_condemnation_details.scrap_quality
             LEFT JOIN 
            am_condemn_scrap_yard y ON y.yard_slno = am_condemnation_details.scrap_yard
            LEFT JOIN 
            am_asset_item_map_master a ON a.am_item_map_slno = am_condemnation_details.am_asset_item_slno
            LEFT JOIN 
            am_spare_item_map_master s ON s.am_spare_item_map_slno = am_condemnation_details.am_spare_item_slno
            LEFT JOIN 
            am_item_name_creation ai ON ai.item_creation_slno = a.item_creation_slno
            LEFT JOIN 
            am_item_name_creation si ON si.item_creation_slno = s.spare_creation_slno
            where  
            am_condemnation_details.scarp_categorize = 1
            and scrap_submitted = 1
            and scrap_category = ?
            and scrap_quality = ?
            and scrap_condemn_Form_slno=?`,
            [
                data.category_slno,
                data.quality_slno,
                data.condem_form_slno
            ],
            (error, results, feilds) => {
               
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

        ViewCategorizedAddedItemsUnderscrapForm: (data, callback) => {     
        pool.query(
            `select 
            item_slno,
            item_name,
            scrap_category,
            scrap_quality,
            scrap_yard,
            cat.category_name,
            q.quality_name,
            yard_name
            from
            am_condemnation_added_items
            LEFT JOIN 
            am_condemnation_category_mast cat ON cat.category_slno = am_condemnation_added_items.scrap_category
            LEFT JOIN 
            am_condemn_quality_master q ON q.quality_slno = am_condemnation_added_items.scrap_quality
            LEFT JOIN 
            am_condemn_scrap_yard y ON y.yard_slno = am_condemnation_added_items.scrap_yard
            where  
            scrap_categorize = 1
            and scrap_submitted = 1
            and scrap_category = ?
            and scrap_quality = ?
            and scrap_condemn_Form_slno=?`,
            [
                data.category_slno,
                data.quality_slno,
                data.condem_form_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );        
    },

         getRateDetailsForCategoryQuality: (data, callback) => {     
        pool.query(
           `SELECT * FROM am_scrap_condemn_rate_details
            where
            category_slno = ?
            and quality_slno = ?
            and condem_form_slno = ?`,
            [
                data.category_slno,
                data.quality_slno,
                data.condem_form_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );        
    },


    UpdateScrapFormQuery: (data, callback) => {
              pool.query(`
           UPDATE am_scrap_condemn_form
           SET 
           scrap_yard = ?, 
           supplier_slno = ?,
           recipient_name = ?,
           recipient_contact_number =?,
           recipient_vehicle_no=?,
           total_rate =?,
           edit_user=?,
           level_no =?,
           level_state =?,
           payment_mode=?,
           payment_acknowledge=?,
           amount_collected=?,
           gate_pass_generated_date=?,
           gate_pass_request_no=?,
           gate_pass_acknowledge=?,
           payment_acknowledge_date=?,
           gate_pass_requested=?,
           gate_pass_approved=?
           WHERE 
           scrap_condemn_Form_slno = ? `
            ,
            [
                JSON.stringify(data.scrap_yard),
                data.supplier_slno,
                data.recipient_name,
                data.recipient_contact_number,
                data.recipient_vehicle_no,
                data.total_rate,
                data.edit_user,
                data.level_no,
                data.level_review_state,
                data.payment_mode,
                data.payment_acknowledge,
                data.amount_collected,
                data.gate_pass_generated_date,
                data.gate_pass_request_no,
                data.gate_pass_acknowledge,
                data.payment_acknowledge_date,
                data.gate_pass_requested,
                data.gate_pass_approved,
                data.scrap_condemn_Form_slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

     InsertScrapLevelReview: (data, callback) => {
       
        pool.query(
            `INSERT INTO am_scrap_levels_review
          ( 

            scrap_condemn_Form_slno, 
            level_no,
            level_review_state, 
            level_review,
            level_review_date      
                   )
          VALUES(?,?,?,?,NOW())`,
            [
                data.scrap_condemn_Form_slno,
                data.level_no,
                data.level_review_state,
                data.level_review

            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },


    UpdateScrapLevelReview: (data, callback) => {
    pool.query(`
        UPDATE am_scrap_levels_review
        SET        
            level_review_state = ?,
            level_review = ?,
            level_review_date = NOW()
        WHERE 
            scrap_condemn_Form_slno = ?
            AND level_review_slno = ?
            AND level_no = ?
        `,
        [
            data.level_review_state,
            data.level_review,
            data.scrap_condemn_Form_slno,
            data.level_review_slno,
            data.level_no
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
},


        getScrapsApproved: (data, callback) => {          
        pool.query(
           `SELECT 
            am_scrap_condemn_form.scrap_condemn_Form_slno,
            scrap_condemn_Form_no,
            form_submit_date, 
            scrap_yard,
            supplier_slno,
            recipient_name,
            recipient_contact_number,
            recipient_vehicle_no,
            total_rate,
            form_status,
            am_scrap_condemn_form.level_no,
            level_name,
            it_supplier_name,
            level_state,
            payment_mode,
            payment_acknowledge,
            amount_collected,
            gate_pass_generated_date,
            gate_pass_request_no,
            gate_pass_acknowledge,
            payment_acknowledge_date,
            gate_pass_requested,
            gate_pass_approved,
            gate_pass_employee.em_name AS gate_pass_ackowledge,
            payemnt_acknowledge.em_name AS payemnt_acknowledge_by,
            review.level_review_slno,    
            review.level_review,
            review.level_review_state,
            am_condemn_scrap_yard.yard_name
        FROM am_scrap_condemn_form
        LEFT JOIN am_scrap_form_approval_levels 
            ON am_scrap_form_approval_levels.level_no = am_scrap_condemn_form.level_no   

        LEFT JOIN it_bill_supplier_details_mast 
            ON it_bill_supplier_details_mast.it_supplier_slno = am_scrap_condemn_form.supplier_slno   

        LEFT JOIN co_employee_master gate_pass_employee 
            ON gate_pass_employee.em_id = am_scrap_condemn_form.gate_pass_acknowledge

        LEFT JOIN co_employee_master payemnt_acknowledge 
            ON payemnt_acknowledge.em_id = am_scrap_condemn_form.payment_acknowledge

        left join am_condemn_scrap_yard  am_condemn_scrap_yard on  am_condemn_scrap_yard.yard_slno =  am_scrap_condemn_form.scrap_yard

        LEFT JOIN am_scrap_levels_review AS review
            ON review.scrap_condemn_Form_slno = am_scrap_condemn_form.scrap_condemn_Form_slno
            AND review.level_no = am_scrap_condemn_form.level_no
            AND review.level_review_status = 1
        WHERE
            am_scrap_condemn_form.level_no >= ?
            AND am_scrap_condemn_form.level_no <= ? `,

            [
                data.levelNoFrom,
                data.levelNoTo
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
        getScrapApprovePanels: (id, callBack) => {
                pool.query(
               `select 
                level_review_slno, scrap_condemn_Form_slno, am_scrap_levels_review.level_no, level_review_state, level_review, level_review_status,
                level_name,emp_id,em_name
                from
                am_scrap_levels_review
                left join  am_scrap_form_approval_levels on am_scrap_form_approval_levels.level_no = am_scrap_levels_review.level_no
                left join co_employee_master on co_employee_master.em_id = am_scrap_form_approval_levels.emp_id
                where
                scrap_condemn_Form_slno = ?
                and 
                level_review_status=1
                order by level_no desc`,

            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    EditScrapForm: (data, callback) => {
                   
        pool.query(
           `UPDATE am_scrap_condemn_form
           SET 
           scrap_yard = ?, 
           supplier_slno = ?,
           recipient_name = ?,
           recipient_contact_number =?,
           recipient_vehicle_no = ?,
           total_rate =?,
           edit_user=?         
           WHERE 
           scrap_condemn_Form_slno = ? `
            ,
            [
                JSON.stringify(data.scrap_yard),
                data.supplier_slno,
                data.recipient_name,
                data.recipient_contact_number,
                data.recipient_vehicle_no,
                data.total_rate,
                data.edit_user,             
                data.scrap_condemn_Form_slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    EditScrapCategoryQuantityRate: (data, callback) => {
            
        pool.query(
           `UPDATE am_scrap_condemn_rate_details
           SET 
           units = ?, 
           quantity_slno = ?,
           scrap_rate = ?     
           WHERE 
           scrap_rate_slno = ? `
            ,
            [
                data.units,
                data.quantity_slno,
                data.scrap_rate      ,    
                data.scrap_rate_slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },




   EditScrapSubmittedDetail: (data, callback) => {
   
    pool.query(
        `UPDATE am_condemnation_details 
         SET 
            scrap_submitted = 0,
            scrap_condemn_Form_slno = NULL
         WHERE 
            am_condem_detail_slno = ?`,
        [data.am_condem_detail_slno],
        (error, results) => {
            if (error) return callback(error);
            return callback(null, results);
        }
    );
},


    EditScrapSubmittedAddedItems: (data, callback) => {
    pool.query(
        `UPDATE am_condemnation_added_items 
         SET 
            scrap_submitted = 0,
            scrap_condemn_Form_slno = NULL
         WHERE 
            item_slno = ?`,
        [data.item_slno],
        (error, results) => {
            if (error) return callback(error);
            return callback(null, results);
        }
    );
},

getCondemnInchargePendingApproval: (data, callback) => {    
        pool.query(
            `SELECT * FROM (
                SELECT 
                    am_condemnation_master.*,
                      inch_employee_mast.em_name as inch_emp,
                     hod_employee_mast.em_name as hod_emp,
                     co_department_mast.dept_name as req_dpt_name,
                    COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
                    COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
                FROM am_condemnation_master
                LEFT JOIN am_condemnation_details 
                    ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno
                           LEFT JOIN co_employee_master inch_employee_mast
                    ON inch_employee_mast.em_id = am_condemnation_master.inch_employee                    
               LEFT JOIN co_employee_master hod_employee_mast
                    ON hod_employee_mast.em_id = am_condemnation_master.hod_employee
                     LEFT JOIN co_department_mast  ON co_department_mast.dept_id = am_condemnation_master.req_dept
                WHERE condem_status = 1
                AND inch_level_acknowledge = ?         
                AND req_dept = ?
                AND condem_level = 0      
               GROUP BY am_condemnation_master.condem_mast_slno
            ) AS filtered
            WHERE count_of_spare > 0 OR count_of_asset > 0          
            `,
            [
                data.inch_apprv,
                data.req_dept
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getCondemnHodPendingApproval: (data, callback) => {
        
        pool.query(
            `SELECT * FROM (
                SELECT 
                    am_condemnation_master.*,
                    inch_employee_mast.em_name as inch_emp,
                     hod_employee_mast.em_name as hod_emp,
                           co_department_mast.dept_name as req_dpt_name,
                    COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
                    COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
                FROM am_condemnation_master
                LEFT JOIN am_condemnation_details 
                    ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno                    
               LEFT JOIN co_employee_master inch_employee_mast
                    ON inch_employee_mast.em_id = am_condemnation_master.inch_employee                    
               LEFT JOIN co_employee_master hod_employee_mast
                    ON hod_employee_mast.em_id = am_condemnation_master.hod_employee
               LEFT JOIN co_department_mast  ON co_department_mast.dept_id = am_condemnation_master.req_dept
                WHERE condem_status = 1           
                AND hod_level_acknowledge = ?
                AND req_dept = ?
                AND condem_level = 0
                GROUP BY am_condemnation_master.condem_mast_slno
            ) AS filtered
            WHERE count_of_spare > 0 OR count_of_asset > 0`,
            [

                data.hod_apprv,
                data.req_dept,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

        InchargeReview: (data, callback) => {
        pool.query(`
           UPDATE am_condemnation_master
           SET 
           inch_level_acknowledge = ?, 
           inch_level_state = ?,
           inch_employee=?,
           inch_review=?,
           condemn_rejected=?,
           inch_review_date = NOW()
           WHERE 
           condem_mast_slno = ? `
            ,
            [
                data.inch_level_acknowledge,
                data.inch_level_state,
                data.inch_employee,
                data.inch_review,       
                data.condemn_rejected,  
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

    HodReview: (data, callback) => {
        pool.query(`
           UPDATE am_condemnation_master
           SET 
           hod_level_acknowledge = ?, 
           hod_level_state = ?,
           hod_employee=?,
           hod_review=?,
           condemn_rejected=?,
           hod_review_date = NOW()
           WHERE 
           condem_mast_slno = ? `
            ,
            [
                data.hod_level_acknowledge,
                data.hod_level_state,
                data.hod_employee,
                data.hod_review,    
                data.condemn_rejected,     
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

        getAllpendingApprovals: (data, callback) => {              
        pool.query(
           `SELECT 
                *,
            COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
            COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
            FROM am_condemnation_master
            LEFT JOIN am_condemnation_details 
            ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno
            LEFT JOIN co_employee_master inch_employee_mast
            ON inch_employee_mast.em_id = am_condemnation_master.inch_employee                    
            LEFT JOIN co_employee_master hod_employee_mast
            ON hod_employee_mast.em_id = am_condemnation_master.hod_employee
            WHERE condem_status = 1
            and
            condem_level=?`
            ,
            [
                data.condemnLevel
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    
    getEmployeeCondemnApprovalLevel: (id, callBack) => {
                pool.query(
            //    `SELECT 
            //     m.level_slno,
            //     co_employee_master.em_name,
            //     sec_id,
            //     co_employee_master.em_id,
            //     m.level_no,
            //     m.level_name, 
            //     m.level_status,
            //     d.condemn_level_slno,
            //     IF(m.level_status = 1, 'Yes', 'No') AS status,
            //     d.levels_approved_for_view,
            //     d.levels_approved_for_approve,
            //     GROUP_CONCAT(DISTINCT view_level.level_name) AS approved_for_view_names,
            //     GROUP_CONCAT(DISTINCT approve_level.level_name) AS approved_for_approve_names
            //     FROM am_condem_approval_level_master m
            //     LEFT JOIN am_condemnation_level_detail d 
            //         ON d.condemn_level_slno = m.level_slno

            //     LEFT JOIN JSON_TABLE(d.levels_approved_for_view, '$[*]' 
            //         COLUMNS(level_no INT PATH '$')) AS view_json 
            //         ON TRUE
            //     LEFT JOIN am_condem_approval_level_master view_level 
            //         ON view_level.level_no = view_json.level_no

            //     LEFT JOIN co_employee_master  
            //         ON co_employee_master.em_id = m.emp_id
                    
            //     LEFT JOIN co_deptsec_mast  
            //         ON co_deptsec_mast.sec_id = co_employee_master.em_dept_section

            //     LEFT JOIN JSON_TABLE(d.levels_approved_for_approve, '$[*]' 
            //         COLUMNS(level_no INT PATH '$')) AS approve_json 
            //         ON TRUE
            //     LEFT JOIN am_condem_approval_level_master approve_level 
            //         ON approve_level.level_no = approve_json.level_no
            //     where m.emp_id =?
            //     and m.level_status =1
            //     GROUP BY 
            //         m.level_slno, m.level_no, m.level_name, m.level_status, 
            //         d.levels_approved_for_view, d.levels_approved_for_approve`,

            `SELECT 
                m.level_slno,
                co_employee_master.em_name,
                sec_id,
                co_employee_master.em_id,
                m.level_no,
                m.level_name, 
                m.level_status,
                d.condemn_level_slno,
                IF(m.level_status = 1, 'Yes', 'No') AS status,
                d.levels_approved_for_view,
                d.levels_approved_for_approve,

                GROUP_CONCAT(DISTINCT view_level.level_name) AS approved_for_view_names,
                GROUP_CONCAT(DISTINCT approve_level.level_name) AS approved_for_approve_names

            FROM am_condem_approval_level_master m
            LEFT JOIN am_condemnation_level_detail d 
                ON d.condemn_level_slno = m.level_slno

            LEFT JOIN JSON_TABLE(d.levels_approved_for_view, '$[*]' 
                COLUMNS(level_no INT PATH '$')) AS view_json 
                ON TRUE
            LEFT JOIN (
                SELECT DISTINCT level_no, level_name
                FROM am_condem_approval_level_master
            ) AS view_level 
                ON view_level.level_no = view_json.level_no

            LEFT JOIN co_employee_master  
                ON co_employee_master.em_id = m.emp_id
                                
            LEFT JOIN co_deptsec_mast  
                ON co_deptsec_mast.sec_id = co_employee_master.em_dept_section

            LEFT JOIN JSON_TABLE(d.levels_approved_for_approve, '$[*]' 
                COLUMNS(level_no INT PATH '$')) AS approve_json 
                ON TRUE
            LEFT JOIN (
                SELECT DISTINCT level_no, level_name
                FROM am_condem_approval_level_master
            ) AS approve_level 
                ON approve_level.level_no = approve_json.level_no

            WHERE m.emp_id = ?
            AND m.level_status = 1

            GROUP BY 
                m.level_slno, m.level_no, m.level_name, m.level_status, 
                d.levels_approved_for_view, d.levels_approved_for_approve`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    //     getPendingCondemApprovalList: (data, callback) => {          
    //     pool.query(
    //         `SELECT * FROM (
    //             SELECT 
    //                 am_condemnation_master.*,
    //                 inch_employee_mast.em_name as inch_emp,
    //                  hod_employee_mast.em_name as hod_emp,
    //                 COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
    //                 COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
    //             FROM am_condemnation_master
    //             LEFT JOIN am_condemnation_details 
    //                 ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno                    
    //            LEFT JOIN co_employee_master inch_employee_mast
    //                 ON inch_employee_mast.em_id = am_condemnation_master.inch_employee                    
    //            LEFT JOIN co_employee_master hod_employee_mast
    //                 ON hod_employee_mast.em_id = am_condemnation_master.hod_employee
    //             WHERE condem_status = 1
    //             and
    //             condem_level = ?
    //             AND (condemn_level_state IS NULL OR condemn_level_state != 'R')
    //             AND hod_level_state ='A'
                
    //             GROUP BY am_condemnation_master.condem_mast_slno
    //         ) AS filtered
    //         WHERE count_of_spare > 0 OR count_of_asset > 0`,
    //         [

    //             data.condem_level,
            
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);
    //         }
    //     );
    // },
    
    



getPendingCondemApprovalList: (data, callback) => {


    // Step 1: Build dynamic column list for ALL levels in the system
    const getColumnsSql = `
        SELECT 
            GROUP_CONCAT(
                DISTINCT CONCAT(
                    "MAX(CASE WHEN al.level_no = ", level_no,
                    " AND clr.level_review_state = 'A' THEN 1 ELSE 0 END) AS \`", level_name, "\`"
                )
                ORDER BY level_no
            ) AS cols
        FROM am_condem_approval_level_master
        WHERE level_status = 1
    `;

    pool.query(getColumnsSql, (err, colResult) => {
        if (err) {
            return callback(err);
        }

        const dynamicCols = colResult[0].cols;
        if (!dynamicCols) {
            return callback(null, []); // No levels in the system
        }


        // Step 2: Build the main query with dynamic columns
        const mainSql = `
            SELECT 
                m.condem_mast_slno,
                m.condem_form_no,
                m.condem_form_prefix,
                m.reg_date,
                m.condem_status,
                m.condem_level,
                m.condemn_level_state,
                m.inch_level_acknowledge,
                m.inch_review,
                m.inch_review_date,
                m.inch_level_state,
                m.hod_level_acknowledge,
                m.hod_review,
                m.hod_review_date,
                m.hod_level_state,
                inch_employee_mast.em_name AS inch_emp,
                hod_employee_mast.em_name AS hod_emp,
                approve_lvl.level_name AS current_lvl,
                co_department_mast.dept_name as req_dpt_name,
                ${dynamicCols},
                COUNT(CASE WHEN d.am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
                COUNT(CASE WHEN d.am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
            FROM am_condemnation_master m
            LEFT JOIN am_condemnation_details d
                ON d.condem_mast_slno = m.condem_mast_slno
            LEFT JOIN co_employee_master inch_employee_mast
                ON inch_employee_mast.em_id = m.inch_employee
            LEFT JOIN co_employee_master hod_employee_mast
                ON hod_employee_mast.em_id = m.hod_employee
            LEFT JOIN am_condem_levels_review clr
                ON clr.condemn_mast_slno = m.condem_mast_slno
            LEFT JOIN am_condem_approval_level_master al
                ON al.level_no = clr.level_no
            LEFT JOIN am_condem_approval_level_master approve_lvl
                ON approve_lvl.level_no = m.condem_level
            LEFT JOIN co_department_mast
                ON co_department_mast.dept_id = m.req_dept
            WHERE m.condem_status = 1
              AND condemn_all_approved = 0
              AND condemn_rejected = 0
              AND m.hod_level_state = 'A'             
            GROUP BY m.condem_mast_slno
            HAVING count_of_spare > 0 OR count_of_asset > 0
        `;
          

        // Step 3: Execute main query
        pool.query(mainSql, [data.empid], (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    });
},

    getCondemnLlevelsApproved: (id, callBack) => {
                pool.query(
               `select 
                *,
                am_condem_approval_level_master.level_name ,
                co_employee_master.em_name as level_ackw_emp
                from 
                am_condem_levels_review
                left join am_condem_approval_level_master on am_condem_approval_level_master.level_no = am_condem_levels_review.level_no
                left join co_employee_master on co_employee_master.em_id = am_condem_levels_review.level_employee
                where
                condemn_mast_slno=?`,

            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

        CondemnUpdateLevel: (data, callback) => {
        pool.query(`
           UPDATE am_condemnation_master
           SET 
           condem_level = ?, 
           condemn_level_state = ?,
           condemn_all_approved=?,
           condemn_rejected=?
           WHERE 
           condem_mast_slno = ? `
            ,
            [
                data.condem_level,
                data.condemn_level_state,
                data.condemn_all_approved,
                data.condemn_rejected,         
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
    InsertLevelReview: (data, callback) => {
    pool.query(
        `INSERT INTO am_condem_levels_review
        (
            condemn_mast_slno,
            level_no,
            level_review_state,
            level_review,
            level_employee,
            level_review_date,
            level_review_status
        )
        VALUES(?,?,?,?,?, NOW(), 1)`,
        [
            data.condemn_mast_slno,
            data.level_no,
            data.level_review_state,
            data.level_review,
            data.level_employee
        ],
        (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
},
  UpdateLevelReview: (data, callback) => {
        pool.query(`
           UPDATE am_condem_levels_review
           SET           
           level_review_state = ?,
           level_review=?,
           level_employee=?,
           level_review_date=?
           WHERE 
           level_review_slno = ? `
            ,
            [
            
                data.level_review_state,
                data.level_review,
                data.level_employee,  
                data.level_review_date,       
                data.level_review_slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    getcondemlevelDetails: (data, callback) => {
       
        pool.query(
            `   select *,
                lvl_mast.level_name
                from
                am_condem_levels_review lvl_review
                left join am_condem_approval_level_master lvl_mast on lvl_mast.level_no = lvl_review.level_no
                where
                lvl_review.condemn_mast_slno = ?
                and
                lvl_review.level_no = ?
                and
                lvl_review.level_review_status =1`,
            [

                data.condem_mast_slno,
                data.level_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getAllDeptApprovedOrRejected: (sql, params, callback) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

getCondemnInchargeApprovalList: (data, callback) => {    
        pool.query(
            `SELECT * FROM (
                SELECT 
                    am_condemnation_master.*,
                      inch_employee_mast.em_name as inch_emp,
                     hod_employee_mast.em_name as hod_emp,
                     co_department_mast.dept_name as req_dpt_name,
                    COUNT(CASE WHEN am_spare_item_slno IS NOT NULL THEN 1 END) AS count_of_spare,
                    COUNT(CASE WHEN am_asset_item_slno IS NOT NULL THEN 1 END) AS count_of_asset
                FROM am_condemnation_master
                LEFT JOIN am_condemnation_details 
                    ON am_condemnation_details.condem_mast_slno = am_condemnation_master.condem_mast_slno
                           LEFT JOIN co_employee_master inch_employee_mast
                    ON inch_employee_mast.em_id = am_condemnation_master.inch_employee                    
               LEFT JOIN co_employee_master hod_employee_mast
                    ON hod_employee_mast.em_id = am_condemnation_master.hod_employee
                     LEFT JOIN co_department_mast  ON co_department_mast.dept_id = am_condemnation_master.req_dept
                WHERE condem_status = 1                    
                AND req_dept = ?
                AND condem_level = 0      
               GROUP BY am_condemnation_master.condem_mast_slno
            ) AS filtered
            WHERE count_of_spare > 0 OR count_of_asset > 0          
            `,
            [
              
                data.req_dept
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