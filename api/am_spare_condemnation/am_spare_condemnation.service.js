const { pool } = require('../../config/database')
module.exports = {
    CondemnationList: (id, callBack) => {
        pool.query(
            `
                select ROW_NUMBER() over (order by am_spare_item_map_slno) as slno,am_spare_item_map_slno,
                 spare_creation_slno, am_item_name_creation.item_name,
                category_name,spare_dept_slno, spare_deptsec_slno,
                spare_room_slno, spare_subroom_slno, spare_rack_slno, spare_custodian_dept, 
                spare_custodian_dept_sec, spare_asset_no, spare_create_status, spare_asset_no_only, 
                spare_condamtn, spare_service
                from am_spare_item_map_master
                left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
                left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
                 where spare_custodian_dept_sec=? and spare_condamtn=1 `,
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
            `
                select ROW_NUMBER() over (order by am_spare_item_map_slno) as slno,am_spare_item_map_slno,
                 spare_creation_slno, am_item_name_creation.item_name,
                category_name,spare_dept_slno, spare_deptsec_slno,
                spare_room_slno, spare_subroom_slno, spare_rack_slno, spare_custodian_dept, 
                spare_custodian_dept_sec, spare_asset_no, spare_create_status, spare_asset_no_only, 
                spare_condamtn, spare_service
                from am_spare_item_map_master
                left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
                left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
                 where spare_custodian_dept_sec=? and spare_service=1 `,
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
                select  ROW_NUMBER() over (order by am_item_amcpm_slno) as slno ,am_asset_item_map_master.am_item_map_slno,instalation_date,due_date,
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
}