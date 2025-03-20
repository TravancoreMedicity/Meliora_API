const { pool } = require('../../config/database')

module.exports = {

    getCategoryDetails: (data, callback) => {
        pool.query(
            // `select 
            //     am_item_name_creation.item_creation_slno,
            //     category_slno,
            //     category_name,
            //     file_name,              
            //     am_custodian_dept_slno,
            //     item_custodian_dept
            // FROM
            //     am_item_name_creation
            //     left join am_category on am_category.category_slno = am_item_name_creation.item_category_slno 
            //     left join am_asset_item_map_master on am_asset_item_map_master.item_creation_slno = am_item_name_creation.item_creation_slno
            //     left join am_custodian_department on am_custodian_department.am_custodian_slno = am_asset_item_map_master.item_custodian_dept 
            // where
            //     category_status=1
            // and
            //      am_custodian_department.am_custodian_dept_slno=?
            //     and
            //     item_create_status=1 
            // group by category_slno
            // order by category_name asc`,
            `SELECT
            
            a.item_creation_slno,
            a.category_slno,
            a.category_name,
            a.file_name,
            a.am_custodian_dept_slno,
            IFNULL(b.asset_item_service_0_count, 0) AS asset_item_service_0_count,
            IFNULL(b.asset_item_service_1_count, 0) AS asset_item_service_1_count,
            IFNULL(b.asset_item_service_2_count, 0) AS asset_item_service_2_count
            FROM (
                SELECT
                am_item_name_creation.item_creation_slno,
                am_category.category_slno,
                am_category.category_name,
                am_category.file_name,
                am_custodian_department.am_custodian_dept_slno
                FROM
                am_item_name_creation
                LEFT JOIN am_category 
                ON am_category.category_slno = am_item_name_creation.item_category_slno
                LEFT JOIN am_asset_item_map_master 
                ON am_asset_item_map_master.item_creation_slno = am_item_name_creation.item_creation_slno
                LEFT JOIN am_custodian_department 
                ON am_custodian_department.am_custodian_slno = am_asset_item_map_master.item_custodian_dept
                WHERE
                am_category.category_status = 1
                AND am_custodian_department.am_custodian_dept_slno = ?
                AND am_item_name_creation.item_creation_status = 1
                ) a
                LEFT JOIN (
                    SELECT
                    am_category.category_slno,
                    SUM(CASE WHEN am_asset_item_map_master.asset_item_service = 0 THEN 1 ELSE 0 END) AS asset_item_service_0_count,
                    SUM(CASE WHEN am_asset_item_map_master.asset_item_service = 1 THEN 1 ELSE 0 END) AS asset_item_service_1_count,
                    SUM(CASE WHEN am_asset_item_map_master.asset_item_service = 2 THEN 1 ELSE 0 END) AS asset_item_service_2_count
                    FROM
                    am_item_name_creation
                    LEFT JOIN am_category 
                    ON am_category.category_slno = am_item_name_creation.item_category_slno
                    LEFT JOIN am_asset_item_map_master 
                    ON am_asset_item_map_master.item_creation_slno = am_item_name_creation.item_creation_slno
                    LEFT JOIN am_custodian_department 
                    ON am_custodian_department.am_custodian_slno = am_asset_item_map_master.item_custodian_dept
                    WHERE
                    am_category.category_status = 1
                    AND am_custodian_department.am_custodian_dept_slno = ?
                    AND am_item_name_creation.item_creation_status = 1
                    GROUP BY
                    am_category.category_slno
                    ) b
                    ON a.category_slno = b.category_slno
                    group by item_creation_slno
                    ORDER BY a.category_name ASC`,
            [
                data.am_custodian_dept_slno,
                data.am_custodian_dept_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );

    },
    getCategoryDetailsSpare: (data, callback) => {
        pool.query(
            //     `select 
            //         am_item_name_creation.item_creation_slno,
            //         category_slno,
            //         category_name,
            //         file_name,
            //         am_spare_item_map_master.spare_creation_slno,
            //       spare_custodian_dept,
            //       am_custodian_slno,
            //       am_custodian_dept_slno
            //     FROM
            //         am_item_name_creation
            //         left join am_category on am_category.category_slno = am_item_name_creation.item_category_slno 
            //         left join am_spare_item_map_master on am_spare_item_map_master.spare_creation_slno = am_item_name_creation.item_creation_slno
            //         left join am_custodian_department on am_custodian_department.am_custodian_slno = am_spare_item_map_master.spare_custodian_dept 
            //     where
            //         category_status=1
            //     and 
            //         spare_create_status=1
            //     and
            //         spare_service=0
            //    and
            //          am_custodian_department.am_custodian_dept_slno=?
            //     group by 
            //         category_slno
            //     order by
            //         category_name asc`,
            `SELECT 
    a.item_creation_slno,
    a.category_slno,
    a.category_name,
    a.file_name,
    a.spare_creation_slno,
    a.spare_custodian_dept,
    a.am_custodian_slno,
    a.am_custodian_dept_slno,
    IFNULL(b.spare_service_0_count, 0) AS spare_service_0_count,
    IFNULL(b.spare_service_1_count, 0) AS spare_service_1_count,
    IFNULL(b.spare_service_2_count, 0) AS spare_service_2_count
FROM (
    SELECT 
        am_item_name_creation.item_creation_slno,
        am_category.category_slno,
        am_category.category_name,
        am_category.file_name,
        am_spare_item_map_master.spare_creation_slno,
        am_spare_item_map_master.spare_custodian_dept,
        am_custodian_department.am_custodian_slno,
        am_custodian_department.am_custodian_dept_slno
    FROM
        am_item_name_creation
        LEFT JOIN am_category 
            ON am_category.category_slno = am_item_name_creation.item_category_slno
        LEFT JOIN am_spare_item_map_master 
            ON am_spare_item_map_master.spare_creation_slno = am_item_name_creation.item_creation_slno
        LEFT JOIN am_custodian_department 
            ON am_custodian_department.am_custodian_slno = am_spare_item_map_master.spare_custodian_dept
    WHERE
        am_category.category_status = 1
        AND am_spare_item_map_master.spare_create_status = 1
        AND am_spare_item_map_master.spare_service = 0
        AND am_custodian_department.am_custodian_dept_slno = ?
    GROUP BY 
        am_category.category_slno
    ORDER BY 
        am_category.category_name ASC
) a
LEFT JOIN (
    SELECT 
        am_category.category_slno,
        SUM(CASE WHEN am_spare_item_map_master.spare_service = 0 THEN 1 ELSE 0 END) AS spare_service_0_count,
        SUM(CASE WHEN am_spare_item_map_master.spare_service = 1 THEN 1 ELSE 0 END) AS spare_service_1_count,
        SUM(CASE WHEN am_spare_item_map_master.spare_service = 2 THEN 1 ELSE 0 END) AS spare_service_2_count
    FROM
        am_item_name_creation
        LEFT JOIN am_category 
            ON am_category.category_slno = am_item_name_creation.item_category_slno
        LEFT JOIN am_spare_item_map_master 
            ON am_spare_item_map_master.spare_creation_slno = am_item_name_creation.item_creation_slno
        LEFT JOIN am_asset_spare_details 
            ON am_asset_spare_details.am_spare_item_map_slno = am_spare_item_map_master.am_spare_item_map_slno
        LEFT JOIN am_custodian_department 
            ON am_custodian_department.am_custodian_slno = am_spare_item_map_master.spare_custodian_dept
    WHERE
        am_category.category_status = 1
        AND am_spare_item_map_master.spare_create_status = 1
        AND am_custodian_department.am_custodian_dept_slno =?
    GROUP BY 
        am_category.category_slno
) b
ON a.category_slno = b.category_slno
ORDER BY a.category_name ASC;`,
            [
                data.am_custodian_dept_slno,
                data.am_custodian_dept_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },
    getCountCategory: (data, callback) => {
        pool.query(
            `select 
                SUM(CASE WHEN asset_item_service = 0 THEN 1 ELSE 0 END) AS asset_item_service_0_count,
				SUM(CASE WHEN asset_item_service = 1 THEN 1 ELSE 0 END) AS asset_item_service_1_count,
				SUM(CASE WHEN asset_item_service = 2 THEN 1 ELSE 0 END) AS asset_item_service_2_count,   
                category_slno,
                category_name,           
                asset_item_service
            FROM
                am_item_name_creation
                left join am_category on am_category.category_slno = am_item_name_creation.item_category_slno 
                left join am_asset_item_map_master on am_asset_item_map_master.item_creation_slno = am_item_name_creation.item_creation_slno
                left join am_custodian_department on am_custodian_department.am_custodian_slno = am_asset_item_map_master.item_custodian_dept 
             
            where
                category_status=1
            and
                   am_custodian_department.am_custodian_dept_slno=?
            and
                item_create_status=1       
            and 
				category_slno=?`,
            [
                data.am_custodian_dept_slno,
                data.category_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },
    getTotalCountCategory: (data, callback) => {
        pool.query(
            `select 
                SUM(CASE WHEN asset_item_service = 0 THEN 1 ELSE 0 END) AS asset_item_service_0_count,
				SUM(CASE WHEN asset_item_service = 1 THEN 1 ELSE 0 END) AS asset_item_service_1_count,
				SUM(CASE WHEN asset_item_service = 2 THEN 1 ELSE 0 END) AS asset_item_service_2_count,   
                category_slno,
                category_name,           
                asset_item_service
            FROM
                am_item_name_creation
                left join am_category on am_category.category_slno = am_item_name_creation.item_category_slno 
                left join am_asset_item_map_master on am_asset_item_map_master.item_creation_slno = am_item_name_creation.item_creation_slno 
             
            where
                category_status=1
            and
                item_create_status=1       
            and 
				category_slno=?`,
            [
                data.category_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },
    getCountCategorySpare: (data, callback) => {
        pool.query(
            `select     
            SUM(CASE WHEN spare_service = 0 THEN 1 ELSE 0 END) AS spare_service_0_count,
            SUM(CASE WHEN spare_service = 1 THEN 1 ELSE 0 END) AS spare_service_1_count,
            SUM(CASE WHEN spare_service = 2 THEN 1 ELSE 0 END) AS spare_service_2_count,
              category_slno,  
  	        category_name,
         spare_service
            FROM
                am_item_name_creation
                left join am_category on am_category.category_slno = am_item_name_creation.item_category_slno 
                left join am_spare_item_map_master on am_spare_item_map_master.spare_creation_slno = am_item_name_creation.item_creation_slno  
				left join am_asset_spare_details on am_asset_spare_details.am_spare_item_map_slno =  am_spare_item_map_master.am_spare_item_map_slno
                 left join am_custodian_department on am_custodian_department.am_custodian_slno =  am_spare_item_map_master.spare_custodian_dept                 
		   where
                category_status=1
		   and 
                spare_create_status=1           
           and
                am_custodian_dept_slno=? 
           and 
			   category_slno=?`,
            [
                data.am_custodian_dept_slno,
                data.category_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },
    getTotalCountCategorySpare: (data, callback) => {
        pool.query(
            `select     
            SUM(CASE WHEN spare_service = 0 THEN 1 ELSE 0 END) AS spare_service_0_count,
            SUM(CASE WHEN spare_service = 1 THEN 1 ELSE 0 END) AS spare_service_1_count,
            SUM(CASE WHEN spare_service = 2 THEN 1 ELSE 0 END) AS spare_service_2_count,
              category_slno,  
  	        category_name,
         spare_service
            FROM
                am_item_name_creation
                left join am_category on am_category.category_slno = am_item_name_creation.item_category_slno 
                left join am_spare_item_map_master on am_spare_item_map_master.spare_creation_slno = am_item_name_creation.item_creation_slno  
				left join am_asset_spare_details on am_asset_spare_details.am_spare_item_map_slno =  am_spare_item_map_master.am_spare_item_map_slno               
		   where
                category_status=1
		   and 
                spare_create_status=1          
                   and 
			   category_slno=?`,
            [
                data.category_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },
    getAssetCount: (data, callback) => {
        pool.query(
            `SELECT COUNT(*) AS total_count
                FROM am_asset_item_map_master
                left join am_custodian_department on am_custodian_department.am_custodian_slno = am_asset_item_map_master.item_custodian_dept 
                WHERE item_create_status = 1             
                AND am_custodian_dept_slno = ?`,
            [
                data.am_custodian_dept_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },
    getSpareCount: (data, callback) => {
        pool.query(
            `SELECT COUNT(*) AS total_count
                FROM am_spare_item_map_master
                left join am_custodian_department on am_custodian_department.am_custodian_slno = am_spare_item_map_master.spare_custodian_dept 
                WHERE spare_create_status = 1
                AND am_custodian_dept_slno = ?`,
            [
                data.am_custodian_dept_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },
    getAssetValue: (data, callback) => {
        pool.query(
            `select
                sum(am_bill_amount) as tot_asset
                from
                am_item_name_creation
                left join am_asset_item_map_master on am_asset_item_map_master.item_creation_slno =am_item_name_creation.item_creation_slno
                left join am_item_map_details on am_item_map_details.am_item_map_slno =am_asset_item_map_master.am_item_map_slno
                left join am_custodian_department on am_custodian_department.am_custodian_slno = am_asset_item_map_master.item_custodian_dept 
                where 
                am_item_name_creation.item_creation_status=1
                and
                am_asset_item_map_master.item_create_status=1
                and
               am_custodian_dept_slno=?
                        `,
            [
                data.am_custodian_dept_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },
    getSpareValue: (data, callback) => {
        pool.query(
            `select
              sum(am_bill_amount) as tot_spare
            from
            am_item_name_creation
            left join am_spare_item_map_master on am_spare_item_map_master.spare_creation_slno =am_item_name_creation.item_creation_slno
            left join am_item_map_details on am_item_map_details.am_spare_item_map_slno =am_spare_item_map_master.am_spare_item_map_slno
              left join am_custodian_department on am_custodian_department.am_custodian_slno = am_spare_item_map_master.item_custodian_dept 
            where 
            am_item_name_creation.item_creation_status=1
            and
            am_spare_item_map_master.spare_create_status=1
            and
            am_custodian_dept_slno=?
                        `,
            [
                data.am_custodian_dept_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },
    getTotAssetValue: (callback) => {
        pool.query(
            `select
                sum(am_bill_amount) as tot_asset
                from
                am_item_name_creation
                left join am_asset_item_map_master on am_asset_item_map_master.item_creation_slno =am_item_name_creation.item_creation_slno
                left join am_item_map_details on am_item_map_details.am_item_map_slno =am_asset_item_map_master.am_item_map_slno
                where 
                am_item_name_creation.item_creation_status=1
                and
                am_asset_item_map_master.item_create_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getTotspareValue: (callback) => {
        pool.query(
            `select
              sum(am_bill_amount) as tot_spare
            from
            am_item_name_creation
            left join am_spare_item_map_master on am_spare_item_map_master.spare_creation_slno =am_item_name_creation.item_creation_slno
            left join am_item_map_details on am_item_map_details.am_spare_item_map_slno =am_spare_item_map_master.am_spare_item_map_slno
            where 
            am_item_name_creation.item_creation_status=1
            and
            am_spare_item_map_master.spare_create_status=1`,

            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getTotAssetCount: (callback) => {
        pool.query(
            `SELECT 
                COUNT(*) AS asset_count
                FROM am_asset_item_map_master
                WHERE item_create_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getTotSpareCount: (callback) => {
        pool.query(
            `SELECT
             COUNT(*) AS spare_count
                FROM am_spare_item_map_master
                WHERE spare_create_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    // getTotalCountItemType: (data, callback) => {
    //     pool.query(
    //         `select 
    //             SUM(CASE WHEN asset_item_service = 0 THEN 1 ELSE 0 END) AS asset_item_service_0_count,
    // 			SUM(CASE WHEN asset_item_service = 1 THEN 1 ELSE 0 END) AS asset_item_service_1_count,
    // 			SUM(CASE WHEN asset_item_service = 2 THEN 1 ELSE 0 END) AS asset_item_service_2_count,   
    //             am_item_type.item_type_slno,
    //             item_type_name,           
    //             asset_item_service
    //         FROM
    //             am_item_name_creation
    //             left join am_item_type on am_item_type.item_type_slno = am_item_name_creation.item_type_slno 
    //             left join am_asset_item_map_master on am_asset_item_map_master.item_creation_slno = am_item_name_creation.item_creation_slno 

    //         where
    //             item_type_status=1
    //         and
    //             item_create_status=1       
    //         and 
    // 			am_item_type.item_type_slno=?`,
    //         [
    //             data.item_type_slno
    //         ],
    //         (error, results) => {
    //             if (error) {
    //                 return callback(error);
    //             }

    //             if (results.length > 0) {
    //                 return callback(null, results);
    //             } else {
    //                 return callback(null, []);
    //             }
    //         }
    //     );
    // },
    getTotalCountItemType: (callback) => {
        pool.query(
            `SELECT            
            am_item_type.item_type_slno,
            am_item_type.item_type_name,
            am_item_type.item_type_status,
            IF(am_item_type.item_type_status = 1, 'Yes', 'No') AS status,
            COALESCE(SUM(CASE WHEN asset_item_service = 0 THEN 1 ELSE 0 END), 0) AS asset_item_service_0_count,
            COALESCE(SUM(CASE WHEN asset_item_service = 1 THEN 1 ELSE 0 END), 0) AS asset_item_service_1_count,
            COALESCE(SUM(CASE WHEN asset_item_service = 2 THEN 1 ELSE 0 END), 0) AS asset_item_service_2_count
            FROM 
            am_item_type
            LEFT JOIN 
            am_item_name_creation ON am_item_type.item_type_slno = am_item_name_creation.item_type_slno
            LEFT JOIN 
            am_asset_item_map_master ON am_asset_item_map_master.item_creation_slno = am_item_name_creation.item_creation_slno
            WHERE 
            am_item_type.item_type_status = 1
            AND (am_item_name_creation.item_creation_status = 1 OR am_item_name_creation.item_creation_status IS NULL)
            GROUP BY 
            am_item_type.item_type_slno, am_item_type.item_type_name, am_item_type.item_type_status`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    getTotalCountItemTypeSpare: (data, callback) => {
        pool.query(
            `select     
            SUM(CASE WHEN spare_service = 0 THEN 1 ELSE 0 END) AS spare_service_0_count,
            SUM(CASE WHEN spare_service = 1 THEN 1 ELSE 0 END) AS spare_service_1_count,
            SUM(CASE WHEN spare_service = 2 THEN 1 ELSE 0 END) AS spare_service_2_count,
                am_item_type.item_type_slno,
                item_type_name,    
                 spare_service
            FROM
                am_item_name_creation
                left join am_item_type on am_item_type.item_type_slno = am_item_name_creation.item_type_slno 
                left join am_spare_item_map_master on am_spare_item_map_master.spare_creation_slno = am_item_name_creation.item_creation_slno  
				left join am_asset_spare_details on am_asset_spare_details.am_spare_item_map_slno =  am_spare_item_map_master.am_spare_item_map_slno               
		   where
                item_type_status=1
		   and 
                spare_create_status=1          
                   and 
			  	am_item_type.item_type_slno=?`,
            [
                data.item_type_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },
    // getTotalCountAssetType: (data, callback) => {
    //     pool.query(
    // `select 
    //     SUM(CASE WHEN asset_item_service = 0 THEN 1 ELSE 0 END) AS asset_item_service_0_count,
    // 	SUM(CASE WHEN asset_item_service = 1 THEN 1 ELSE 0 END) AS asset_item_service_1_count,
    // 	SUM(CASE WHEN asset_item_service = 2 THEN 1 ELSE 0 END) AS asset_item_service_2_count,   
    //     am_asset_type.asset_type_slno,
    //     asset_type_name,           
    //     asset_item_service
    // FROM
    //     am_item_name_creation
    //     left join am_asset_type on am_asset_type.asset_type_slno = am_item_name_creation.item_asset_type_slno 
    //     left join am_asset_item_map_master on am_asset_item_map_master.item_creation_slno = am_item_name_creation.item_creation_slno 

    // where
    //     asset_type_status=1
    // and
    //     am_asset_item_map_master.item_create_status=1       
    // and 
    // 	 am_asset_type.asset_type_slno = ?`,
    //         [
    //             data.asset_type_slno
    //         ],
    //         (error, results) => {
    //             if (error) {
    //                 return callback(error);
    //             }

    //             if (results.length > 0) {
    //                 return callback(null, results);
    //             } else {
    //                 return callback(null, []);
    //             }
    //         }
    //     );
    // },
    getTotalCountAssetSpareType: (data, callback) => {
        pool.query(
            `select     
            SUM(CASE WHEN spare_service = 0 THEN 1 ELSE 0 END) AS spare_service_0_count,
            SUM(CASE WHEN spare_service = 1 THEN 1 ELSE 0 END) AS spare_service_1_count,
            SUM(CASE WHEN spare_service = 2 THEN 1 ELSE 0 END) AS spare_service_2_count,
                am_asset_type.asset_type_slno,
                asset_type_name,    
                spare_service
            FROM
                am_item_name_creation
                left join am_asset_type on am_asset_type.asset_type_slno = am_item_name_creation.item_asset_type_slno 
                left join am_spare_item_map_master on am_spare_item_map_master.spare_creation_slno = am_item_name_creation.item_creation_slno  
				left join am_asset_spare_details on am_asset_spare_details.am_spare_item_map_slno =  am_spare_item_map_master.am_spare_item_map_slno               
		   where
                asset_type_status=1
		   and 
                spare_create_status=1          
           and 
			    am_asset_type.asset_type_slno=?`,
            [
                data.asset_type_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },
    getTotalCountAssetType: (callback) => {
        pool.query(
            `SELECT
            am_asset_type.asset_type_slno,
            am_asset_type.asset_type_name,
            am_asset_type.asset_type_status,
            IF(am_asset_type.asset_type_status = 1, 'Yes', 'No') AS status,
            COALESCE(SUM(CASE WHEN asset_item_service = 0 THEN 1 ELSE 0 END), 0) AS asset_item_service_0_count,
            COALESCE(SUM(CASE WHEN asset_item_service = 1 THEN 1 ELSE 0 END), 0) AS asset_item_service_1_count,
            COALESCE(SUM(CASE WHEN asset_item_service = 2 THEN 1 ELSE 0 END), 0) AS asset_item_service_2_count
            FROM 
            am_asset_type
            LEFT JOIN 
            am_item_name_creation ON am_asset_type.asset_type_slno = am_item_name_creation.item_asset_type_slno
            LEFT JOIN 
            am_asset_item_map_master ON am_asset_item_map_master.item_creation_slno = am_item_name_creation.item_creation_slno
            WHERE 
            am_asset_type.asset_type_status = 1
            AND (am_item_name_creation.item_creation_status = 1 OR am_item_name_creation.item_creation_status IS NULL)
            GROUP BY 
            am_asset_type.asset_type_slno, am_asset_type.asset_type_name, am_asset_type.asset_type_status;`

            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
}