const { pool } = require('../../config/database')
module.exports = {
    EquipmentInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_equipment_mast
            ( 
                equip_name, procedure_names, asset_no, equip_status, create_user
            )
            VALUES(?,?,?,?,?)`,
            [
                data.equip_name,
                JSON.stringify(data.procedure_names),
                data.asset_no,
                data.equip_status,
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
    EquipmentViews: (callBack) => {
        pool.query(
            `SELECT 
                   equip_no,equip_name,procedure_names,asset_no,if(equip_status=1,'Yes','No') status
             FROM
                   qi_equipment_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        );
    },

    EquipmentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                  qi_equipment_mast 
             SET 
                  equip_name=?,
                  procedure_names=?,
                  asset_no=?,
                  equip_status=?,
                  edit_user=?
            WHERE 
                   equip_no=?`,
            [
                data.equip_name,
                JSON.stringify(data.procedure_names),
                data.asset_no,
                data.equip_status,
                data.edit_user,
                data.equip_no
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