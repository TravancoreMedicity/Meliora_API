const { pool } = require('../../config/database')
module.exports = {
    EquipmentInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_equipment_mast
            ( 
                equip_name, procedure_names, asset_no, equip_status, create_user,qi_dept_no
            )
            VALUES(?,?,?,?,?,?)`,
            [
                data.equip_name,
                JSON.stringify(data.procedure_names),
                data.asset_no,
                data.equip_status,
                data.create_user,
                data.qi_dept_no
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
                   equip_no,equip_name,procedure_names,asset_no,if(equip_status=1,'Yes','No') status,
                   qi_equipment_mast.qi_dept_no,qi_dept_mast.qi_dept_desc,GROUP_CONCAT( jt.PDC_DESC) as procname  
             FROM 
                   qi_equipment_mast
                   left join qi_dept_mast on qi_dept_mast.qi_dept_no=qi_equipment_mast.qi_dept_no,
                   JSON_TABLE(procedure_names, '$[*]' COLUMNS (PDC_DESC VARCHAR(255) PATH '$.PDC_DESC')) AS jt
                   group by equip_no`,
            [],
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
                   edit_user=?,
                   qi_dept_no=?
             WHERE 
                   equip_no=?`,
            [
                data.equip_name,
                JSON.stringify(data.procedure_names),
                data.asset_no,
                data.equip_status,
                data.edit_user,
                data.qi_dept_no,
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
    EquipmentActive: (id, callBack) => {
        pool.query(
            `SELECT
                   equip_no,equip_name
             FROM 
                   qi_equipment_mast
             WHERE 
                   equip_status=1 AND qi_dept_no=?`, [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    GetProcedureList: (id, callBack) => {
        pool.query(
            `SELECT
                   procedure_names
             FROM 
                   qi_equipment_mast
             WHERE 
                   equip_status=1 AND equip_no=?`, [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}