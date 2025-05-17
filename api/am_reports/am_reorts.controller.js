const { getItemList, getItemsFronList, getAllItemList } = require('../am_reports/am_reports.service');
const logger = require('../../logger/logger');


module.exports = {

    getItemList: (req, res) => {
        getItemList((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    // getItemsFronList: (req, res) => {
    //     const body = req.body
    //     getItemsFronList(body, (err, results) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }

    //         if (results.length == 0) {
    //             logger.infologwindow("No Results Found")
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Record Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     })
    // },
    getItemsFronList: (req, res) => {
        const { item_dept_slno, item_deptsec_slno, item_custodian_slno } = req.body;
        let sql = `
        SELECT
            am_asset_item_map_master.am_item_map_slno, 
            co_department_mast.dept_name AS deptname,
            co_deptsec_mast.sec_name AS secname,
            am_custodian_name,
            item_asset_no,
            item_asset_no_only,
            am_item_name_creation.item_name,
            due_date,
            rm_newroom_creation.rm_room_name,
            rm_subroom_master.subroom_name,
            item_custodian_dept,
            am_asset_item_map_master.item_creation_slno,
            item_dept_slno,
            item_deptsec_slno,
            am_manufacture_no
        FROM
            am_asset_item_map_master
        LEFT JOIN co_department_mast ON co_department_mast.dept_id = am_asset_item_map_master.item_dept_slno
        LEFT JOIN co_deptsec_mast ON co_deptsec_mast.sec_id = am_asset_item_map_master.item_deptsec_slno
        LEFT JOIN am_item_name_creation ON am_item_name_creation.item_creation_slno = am_asset_item_map_master.item_creation_slno
        LEFT JOIN am_custodian_department ON am_custodian_department.am_custodian_slno = am_asset_item_map_master.item_custodian_dept
        LEFT JOIN am_item_map_amcpm_detail ON am_item_map_amcpm_detail.am_item_map_slno = am_asset_item_map_master.am_item_map_slno
        LEFT JOIN am_item_map_details ON am_item_map_details.am_item_map_slno = am_asset_item_map_master.am_item_map_slno
        LEFT JOIN rm_newroom_creation ON rm_newroom_creation.rm_room_slno = am_asset_item_map_master.item_room_slno
        LEFT JOIN rm_subroom_master ON rm_subroom_master.subroom_slno = am_asset_item_map_master.item_subroom_slno
        WHERE item_create_status = 1`;

        const queryParams = [];
        if (item_dept_slno) {
            sql += " AND am_asset_item_map_master.item_dept_slno = ?";
            queryParams.push(item_dept_slno);
        }
        if (item_deptsec_slno) {
            sql += " AND am_asset_item_map_master.item_deptsec_slno = ?";
            queryParams.push(item_deptsec_slno);
        }
        if (item_custodian_slno) {
            sql += " AND am_asset_item_map_master.item_custodian_dept = ?";
            queryParams.push(item_custodian_slno);
        }
        sql += `
        GROUP BY
            am_asset_item_map_master.am_item_map_slno
        ORDER BY
            am_asset_item_map_master.am_item_map_slno DESC`;

        getItemsFronList(sql, queryParams, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: error.message
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No data found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    // getItemsFronList: (req, res) => {
    //     const { item_dept_slno, item_deptsec_slno, item_custodian_slno, } = req.body;
    //     let sql = `           
    //     SELECT        
    //     am_asset_item_map_master.am_item_map_slno, 
    //     co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,
    //     am_custodian_name,item_asset_no,item_asset_no_only,
    //     am_item_name_creation.item_name,item_asset_no,item_asset_no_only,due_date,
    //     rm_newroom_creation.rm_room_name,rm_subroom_master.subroom_name,
    //     item_custodian_dept,am_asset_item_map_master.item_creation_slno,item_dept_slno,item_deptsec_slno,
    //     am_manufacture_no
    //     FROM
    //     am_asset_item_map_master
    //     left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
    //     left join co_deptsec_mast on co_deptsec_mast.sec_id=am_asset_item_map_master.item_deptsec_slno
    //     left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
    //     left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
    //     left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
    //     left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
    //     left join rm_newroom_creation on rm_newroom_creation.rm_room_slno=am_asset_item_map_master.item_room_slno
    //     left join rm_subroom_master on rm_subroom_master.subroom_slno=am_asset_item_map_master.item_subroom_slno
    //     WHERE   
    //     item_create_status=1    `
    //     const queryParams = [];
    //     if (item_dept_slno) {
    //         sql += " AND item_dept_slno = ?";
    //         queryParams.push(item_dept_slno);
    //     }
    //     if (item_deptsec_slno) {
    //         sql += " AND item_deptsec_slno = ?";
    //         queryParams.push(item_deptsec_slno);
    //     }
    //     if (item_custodian_slno) {
    //         sql += " AND item_custodian_dept = ?";
    //         queryParams.push(item_custodian_slno);
    //     }
    //     sql += `
    //         GROUP BY 
    //          am_asset_item_map_master.am_item_map_slno
    //         ORDER BY 
    //          ORDER BY am_asset_item_map_master.am_item_map_slno DESC `;

    //     getItemsFronList(sql, queryParams, (error, results) => {

    //         if (error) {
    //             return res.status(500).json({
    //                 success: 0,
    //                 message: error.message
    //             });
    //         }
    //         if (!results || results.length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No data found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },

    getAllItemList: (req, res) => {
        getAllItemList((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
}