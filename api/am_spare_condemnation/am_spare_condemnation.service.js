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
}