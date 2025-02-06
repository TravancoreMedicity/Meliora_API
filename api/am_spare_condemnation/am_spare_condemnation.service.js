const { pool } = require('../../config/database')
module.exports = {
    CondemnationList: (id, callBack) => {
        pool.query(
            `           
                    select
                    ROW_NUMBER() over (order by am_spare_item_map_slno) as slno,am_spare_item_map_slno,
                    spare_creation_slno, am_item_name_creation.item_name,
                    category_name,spare_dept_slno, spare_deptsec_slno,
                    spare_room_slno, spare_subroom_slno, spare_rack_slno, spare_custodian_dept, 
                    spare_custodian_dept_sec, spare_asset_no, spare_create_status, spare_asset_no_only, 
                    spare_condamtn, spare_service
                    from am_spare_item_map_master
                    left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
                    left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
                    left join am_custodian_department on am_custodian_department.am_custodian_slno=am_spare_item_map_master.spare_custodian_dept
                    where am_custodian_dept_slno=? and spare_condamtn=1`,

            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    getAssetCondemnationList: (id, callBack) => {
        pool.query(
            `       select
                    category_name,
                    em_name as condm_trans_user,
                    am_item_map_slno, am_asset_item_map_master.item_creation_slno, item_dept_slno, item_deptsec_slno, item_room_slno, item_subroom_slno, item_rack_slno, 
                    item_custodian_dept, item_custodian_dept_sec, item_asset_no, item_asset_no_only, item_create_status,am_item_name_creation.item_name,
					asset_item_condmnation,
                    asset_item_condm_user
                    from am_asset_item_map_master
                    left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
                    left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno                    
                    left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
                    left join co_employee_master on co_employee_master.em_id=am_asset_item_map_master.asset_item_condm_user
                    where am_custodian_dept_slno=? and asset_item_condmnation=1`,

            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    ServiceList: (id, callBack) => {
        pool.query(
            // `
            //     select ROW_NUMBER() over (order by am_spare_item_map_slno) as slno,am_spare_item_map_slno,
            //      spare_creation_slno, am_item_name_creation.item_name,
            //     category_name,spare_dept_slno, spare_deptsec_slno,
            //     spare_room_slno, spare_subroom_slno, spare_rack_slno, spare_custodian_dept, 
            //     spare_custodian_dept_sec, spare_asset_no, spare_create_status, spare_asset_no_only, 
            //     spare_condamtn, spare_service
            //     from am_spare_item_map_master
            //     left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
            //     left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
            //      where spare_custodian_dept_sec=? and spare_service=1 `,
            `SELECT 
            am_spare_item_map_master.am_spare_item_map_slno,                
            hold_color,      
            am_bill_mastslno,
            am_bill_master.am_bill_no,
            amccmc_slno,
            am_item_wargar_slno,
            warrenty_status, 
            guarenty_status,
            am_item_map_wargrarnt_detail.from_date as wargar_from_date,
			am_item_map_wargrarnt_detail.to_date as wargar_to_date,            
            troll_free,
            ph_one,
            ph_two,
            address,          
            am_amc_cmc_master.from_date as amcm_from_date,
			am_amc_cmc_master.to_date as amcm_to_date,  
            am_lease_mastslno,
            lease_suppler_slno, 
            lease_fromdate,
            lease_todate, 
            lease_amount,
            lease_status,
            amccmc_slno,
            am_amc_cmc_master.amc_status,
            am_amc_cmc_master.cmc_status,
            am_grn_no,
            am_grn_date,      
            am_bill_supplier,
            am_item_map_details.am_asset_old_no,
            am_item_map_details.am_bill_amount,
            lease_amount,
            B.it_supplier_name as bill_supplier_name,
            am_lease_mast_slno,
            L.it_supplier_name as lease_suppliername,
            A.it_supplier_name as amc_cmc_suppliername,
            am_item_name_creation.item_name,category_name,
            am_lease_mastslno,
            lease_suppler_slno,
            B.it_supplier_name as bill_supplier_name,
            am_lease_mast_slno,
            L.it_supplier_name as lease_suppliername,
            A.it_supplier_name as amc_cmc_suppliername,
            am_item_name_creation.item_name,category_name,
            am_lease_mastslno, lease_suppler_slno,
            service_transferd_emp,
            em_name,
                spare_creation_slno,
                spare_service_hold,
                cm_hold_reason,
                spare_status,
                am_item_name_creation.item_name,
                category_name,
                spare_dept_slno,
                spare_deptsec_slno,
                spare_room_slno,
                spare_subroom_slno,
                 spare_rack_slno,
                spare_custodian_dept,
                spare_custodian_dept_sec,
                spare_asset_no,
                spare_create_status,
                spare_asset_no_only,
                spare_condamtn,
                spare_service,
                asset_spare_slno
                FROM am_spare_item_map_master
                LEFT JOIN am_item_name_creation  ON am_item_name_creation.item_creation_slno = am_spare_item_map_master.spare_creation_slno
                LEFT JOIN am_category  ON am_category.category_slno = am_item_name_creation.item_category_slno
                LEFT JOIN am_asset_spare_details  ON am_asset_spare_details.am_spare_item_map_slno = am_spare_item_map_master.am_spare_item_map_slno
                LEFT JOIN cm_hold_reason_mast  ON cm_hold_reason_mast.cm_hold_id = am_spare_item_map_master.spare_service_hold
                left join am_item_map_details on am_item_map_details.am_spare_item_map_slno =am_spare_item_map_master.am_spare_item_map_slno
                left join am_bill_master on am_bill_master.am_bill_mastslno =am_item_map_details.am_bill_mast_slno
				left join am_lease_detail_mast on am_lease_detail_mast.am_lease_mastslno=am_item_map_details.am_lease_mast_slno
				left join it_bill_supplier_details_mast B  on B.it_supplier_slno=am_bill_master.am_bill_supplier
				left join it_bill_supplier_details_mast L on L.it_supplier_slno=am_lease_detail_mast.lease_suppler_slno				
                left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_spare_item_map_slno=am_spare_item_map_master.am_spare_item_map_slno
                left join am_amc_cmc_master on am_amc_cmc_master.amccmc_slno=am_item_map_amcpm_detail.amc_slno
                left join it_bill_supplier_details_mast A on A.it_supplier_slno=am_amc_cmc_master.suplier_slno
                left join am_item_map_wargrarnt_detail on am_item_map_wargrarnt_detail.am_spare_item_map_slno=am_spare_item_map_master.am_spare_item_map_slno   
                left join co_employee_master on co_employee_master.em_id=am_spare_item_map_master.service_transferd_emp            
                WHERE spare_custodian_dept_sec = ?
                AND spare_service = 1 
                AND spare_status=2
                group by am_spare_item_map_master.am_spare_item_map_slno
                ORDER BY am_spare_item_map_master.am_spare_item_map_slno`,
            // `  SELECT 
            //     am_spare_item_map_master.am_spare_item_map_slno,
            //     spare_creation_slno,
            //     spare_service_hold,
            //     cm_hold_reason,
            //     spare_status,
            //     am_item_name_creation.item_name,
            //     category_name,
            //     spare_dept_slno,
            //     spare_deptsec_slno,
            //     spare_room_slno,
            //     spare_subroom_slno,
            //      spare_rack_slno,
            //     spare_custodian_dept,
            //     spare_custodian_dept_sec,
            //     spare_asset_no,
            //     spare_create_status,
            //     spare_asset_no_only,
            //     spare_condamtn,
            //     spare_service,
            //     asset_spare_slno
            //     FROM am_spare_item_map_master
            //     LEFT JOIN am_item_name_creation 
            //     ON am_item_name_creation.item_creation_slno = am_spare_item_map_master.spare_creation_slno
            //     LEFT JOIN am_category 
            //     ON am_category.category_slno = am_item_name_creation.item_category_slno
            //     LEFT JOIN am_asset_spare_details 
            //     ON am_asset_spare_details.am_spare_item_map_slno = am_spare_item_map_master.am_spare_item_map_slno
            //     LEFT JOIN cm_hold_reason_mast 
            //     ON cm_hold_reason_mast.cm_hold_id = am_spare_item_map_master.spare_service_hold
            //     WHERE spare_custodian_dept_sec = ?
            //     AND spare_service = 1 
            //     AND spare_status=2
            //     ORDER BY am_spare_item_map_master.am_spare_item_map_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    pmDueOverList: (id, callBack) => {
        pool.query(
            `
            select  ROW_NUMBER() over (order by am_item_amcpm_slno) as slno ,
            am_asset_item_map_master.am_item_map_slno,instalation_date,due_date,
            item_asset_no,item_asset_no_only,item_dept_slno,item_deptsec_slno,am_manufacture_no,
            item_name,dept_name,sec_name,rm_newroom_creation.rm_room_name,rm_subroom_master.subroom_name
            from am_item_map_amcpm_detail
            left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=am_item_map_amcpm_detail.am_item_map_slno
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=am_asset_item_map_master.item_deptsec_slno
            left join am_item_map_details on am_item_map_details.am_Item_map_slno=am_item_map_amcpm_detail.am_item_map_slno
            left join rm_newroom_creation on rm_newroom_creation.rm_room_slno=am_asset_item_map_master.item_room_slno
           left join rm_subroom_master on rm_subroom_master.subroom_slno=am_asset_item_map_master.item_subroom_slno
            where due_date<current_date() and am_asset_item_map_master.item_custodian_dept_sec=? `,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },


    AssetServiceList: (id, callBack) => {
        pool.query(
            `select
            am_category_pm_days,
            em_name,
            am_asset_transfer_master.transfrd_employee,
            am_amc_cmc_master.from_date,
            am_amc_cmc_master.to_date,           
            item_custodian_dept,
            am_asset_item_map_master.am_item_map_slno,
            lease_fromdate,
            lease_todate,
            lease_amount,
            am_item_wargar_slno,
            warrenty_status, 
            guarenty_status,
            am_item_map_wargrarnt_detail.from_date as wargar_from_date,
			am_item_map_wargrarnt_detail.to_date as wargar_to_date,            
            troll_free,
            ph_one,
            ph_two,
            address,    
            cm_hold_reason,
            hold_color,
            am_bill_master.am_bill_no,
            am_bill_master.am_bill_date,
            am_item_map_details.am_bill_amount,
            am_bill_mastslno,
            amccmc_slno,
            asset_item_service_hold,
            am_asset_item_map_master.item_creation_slno,
            item_dept_slno, item_deptsec_slno, 
            item_room_slno,
            item_subroom_slno,
            item_rack_slno,
            am_custodian_department.am_custodian_dept_slno, 
            am_custodian_department.am_custodian_deptsec_slno,
            item_asset_no,
            item_asset_no_only, 
            item_create_status, 
            asset_item_condmnation, 
            asset_item_service, 
            asset_item_service_user,
            asset_item_condm_user,
            am_bill_supplier,
            B.it_supplier_name as bill_supplier_name,
            am_lease_mast_slno,
            L.it_supplier_name as lease_suppliername,
            A.it_supplier_name as amc_cmc_suppliername,
            am_item_name_creation.item_name,category_name,
            am_lease_mastslno, lease_suppler_slno
            from
            am_asset_item_map_master
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
            left join cm_hold_reason_mast ON cm_hold_reason_mast.cm_hold_id = am_asset_item_map_master.asset_item_service_hold
            left join am_item_map_details on am_item_map_details.am_item_map_slno =am_asset_item_map_master.am_item_map_slno
            left join am_bill_master on am_bill_master.am_bill_mastslno =am_item_map_details.am_bill_mast_slno
            left join am_lease_detail_mast on am_lease_detail_mast.am_lease_mastslno=am_item_map_details.am_lease_mast_slno
            left join it_bill_supplier_details_mast B  on B.it_supplier_slno=am_bill_master.am_bill_supplier
            left join it_bill_supplier_details_mast L on L.it_supplier_slno=am_lease_detail_mast.lease_suppler_slno
            left join am_spare_item_map_master S on S.am_spare_item_map_slno=am_item_map_details.am_spare_item_map_slno
            left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
            left join am_amc_cmc_master on am_amc_cmc_master.amccmc_slno=am_item_map_amcpm_detail.amc_slno
            left join it_bill_supplier_details_mast A on A.it_supplier_slno=am_amc_cmc_master.suplier_slno
            left join am_item_map_wargrarnt_detail on am_item_map_wargrarnt_detail.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
            left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
            left join am_asset_transfer_detail on am_asset_transfer_detail.asset_item_map_slno=am_asset_item_map_master.am_item_map_slno
             left join am_asset_transfer_master on am_asset_transfer_master.transfr_mast_slno=am_asset_transfer_detail.transfr_mast_slno
             left join co_employee_master on co_employee_master.em_id=am_asset_transfer_master.transfrd_employee
            where
            asset_item_service=1 and item_custodian_dept_sec=?
            group by am_asset_item_map_master.am_item_map_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
}