const { pool } = require('../../config/database')
module.exports = {


    getAssetData: (data, callback) => {
        pool.query(
            `select
            item_name,
            am_item_name_creation.item_creation_slno,
            item_deptsec_slno,
            am_item_name_creation.item_category_slno,
            am_item_name_creation.item_group_slno,
            am_category.category_name,
            am_group.group_name,
            am_item_name_creation.item_name,
            co_deptsec_mast.sec_name,
            am_item_map_slno,
             item_asset_no,
            item_asset_no_only,
            am_custodian_dept_slno,
            item_custodian_dept,
            item_custodian_dept_sec
            from am_asset_item_map_master
            left join co_deptsec_mast on co_deptsec_mast.sec_id =am_asset_item_map_master.item_deptsec_slno
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
            left join am_group on am_group.group_slno=am_item_name_creation.item_group_slno
            left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
            where am_asset_item_map_master.item_asset_no=? and am_asset_item_map_master.item_asset_no_only=?`,
            [
                data.item_asset_no,
                data.item_asset_no_only
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    PasswordMasterInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_pswd_master
          ( 
            pswd_mast_slno,
            pswd_mast_asset_no,
            pswd_mast_categry_no,
            pswd_mast_group_no,
            pswd_mast_item_no,
            pswd_mast_location,
            pswd_mast_description,         
            create_user

          )
          VALUES(?,?,?,?,?,?,?,?)`,
            [
                data.pswd_mast_slno,
                data.pswd_mast_asset_no,
                data.pswd_mast_categry_no,
                data.pswd_mast_group_no,
                data.pswd_mast_item_no,
                data.pswd_mast_location,
                data.pswd_mast_description,
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
    CheckAssetInsert: (data, callBack) => {
        pool.query(
            `SELECT pswd_mast_asset_no           
            FROM it_pswd_master
            WHERE pswd_mast_asset_no=?`,
            [
                data.pswd_mast_asset_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },


    PasswordDetailInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_pswd_mast_detail
          (            
            pswd_detail_mast_slno,
            psw_detail_credintial,
            pswd_detail_description,
            psw_detail_username,
            psw_detail_password,
            psw_detail_port,
            psw_detail_ip_num,
            psw_detail_remarks,                     
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


PasswordMasterView: (callback) => {
        pool.query(
            `SELECT 
            pswd_mast_slno,
            am_item_name_creation.item_creation_slno,
            co_deptsec_mast.sec_id,
            am_category.category_slno,
            am_group.group_slno,
            am_category.category_name,
            am_group.group_name,
            co_deptsec_mast.sec_name,
            pswd_mast_description,         
            am_item_name_creation.item_name,
            pswd_mast_asset_no,
            it_pswd_mast_detail.pswd_detail_description,
            psw_detail_username,
            psw_detail_password,
            psw_detail_port,
            psw_detail_ip_num,
            psw_detail_remarks,
            credential_name
            FROM it_pswd_master
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=it_pswd_master.pswd_mast_item_no
            left join am_category on am_category.category_slno=it_pswd_master.pswd_mast_categry_no
            left join am_group on am_group.group_slno=it_pswd_master.pswd_mast_group_no
            left join it_pswd_mast_detail on it_pswd_mast_detail.pswd_detail_mast_slno=it_pswd_master.pswd_mast_slno
            left join it_passwrd_credential_type on it_passwrd_credential_type.credential_slno=it_pswd_mast_detail.psw_detail_credintial
            left join co_deptsec_mast on co_deptsec_mast.sec_id=it_pswd_master.pswd_mast_location`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    PasswordDetailviewByid: (id, callback) => {

        pool.query(
            `SELECT 
            pswd_detail_slno,
            psw_detail_credintial,
            pswd_detail_description,
            psw_detail_username,
            psw_detail_password,
            psw_detail_port,
            psw_detail_ip_num,
            credential_name,
            psw_detail_remarks
            FROM it_pswd_mast_detail
            left join it_passwrd_credential_type on it_passwrd_credential_type.credential_slno=it_pswd_mast_detail.psw_detail_credintial
             WHERE pswd_detail_mast_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    PasswordMasterUpdate: (data, callback) => {
        pool.query(

            `UPDATE it_pswd_master SET           
            pswd_mast_description=?,
            edit_user=?       
            WHERE 
            pswd_mast_slno=?`,

            [
                data.pswd_mast_description,
                data.edit_user,
                data.pswd_mast_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    PasswordDetailUpdate: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE it_pswd_mast_detail
                    SET
                    pswd_detail_mast_slno=?,
                    psw_detail_credintial=?,
                    pswd_detail_description=?,
                   psw_detail_username=?,
                   psw_detail_password=?,
                   psw_detail_port=?,
                   psw_detail_ip_num=?,
                   psw_detail_remarks=?,
                   edit_user=?       
                   WHERE 
                   pswd_detail_slno=?`,
                    [
                        data.pswd_detail_mast_slno,
                        data.psw_detail_credintial,
                        data.pswd_detail_description,
                        data.psw_detail_username,
                        data.psw_detail_password,
                        data.psw_detail_port,
                        data.psw_detail_ip_num,
                        data.psw_detail_remarks,
                        data.edit_user,
                        data.pswd_detail_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )


            })
        })
        )
    },

    PasswordSoftwareInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_pswd_software
          ( 
            paswd_soft_webname,
            paswd_soft_linkname,
            paswd_soft_username,
            paswd_soft_password,
            paswd_soft_remarks,
            create_user
         
          )
          VALUES(?,?,?,?,?,?)`,
            [
                data.paswd_soft_webname,
                data.paswd_soft_linkname,
                data.paswd_soft_username,
                data.paswd_soft_password,
                data.paswd_soft_remarks,
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
    PasswordSoftwareView: (callback) => {
        pool.query(
            `SELECT 
            paswd_soft_slno,
            paswd_soft_webname, 
            paswd_soft_linkname,
            paswd_soft_username,
            paswd_soft_password,
            paswd_soft_remarks          
            FROM
            it_pswd_software`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    PasswordSoftwareUpdate: (data, callback) => {
        pool.query(
            `UPDATE it_pswd_software SET 
            paswd_soft_webname=?,
            paswd_soft_linkname=?,
            paswd_soft_username=?,
            paswd_soft_password=?,
            paswd_soft_remarks=?,
            edit_user=?       
            WHERE 
            paswd_soft_slno=?`,

            [
                data.paswd_soft_webname,
                data.paswd_soft_linkname,
                data.paswd_soft_username,
                data.paswd_soft_password,
                data.paswd_soft_remarks,
                data.edit_user,
                data.paswd_soft_slno
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