const { pool } = require('../../config/database')
module.exports = {

    ContractMasterInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO  contract_master
            (  contract_name,
            status,
            created_id            )
            VALUES(?,?,?)`,
            [
                data.Contract_name,
                data.Contract_status,
                data.create_user,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    GetcontractMaster: (callBack) => {
        pool.query(
            `
            SELECT 
            contract_id,
            contract_name,
            status,
            created_id,
            edited_id,
            update_date,
            create_date
            FROM contract_master
            `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    ContractMasterUpdated: (data, callBack) => {
        pool.query(
            `Update contract_master SET 
                contract_name =?, status =?,edited_id=?
                WHERE contract_id=?`,
            [
                data.Contract_name,
                data.Contract_status,
                data.edit_user,
                data.Contract_id,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    WorkLocationInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO  work_locationmaster
            (  work_location_name,
            status,
            created_id ,
            building_slno           )
            VALUES(?,?,?,?)`,
            [
                data.Location_name,
                data.Location_status,
                data.create_user,
                data.building
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    GetlocationMaster: (callBack) => {
        pool.query(
            `
          SELECT 
            work_location_Id,
            work_location_name,
            status,
            building_slno,
            created_id,
            edited_id,
            update_date,
            work_locationmaster.create_date,
            rm_building_name
            FROM work_locationmaster
			LEFT JOIN rm_building_mast ON rm_building_mast.rm_building_slno=work_locationmaster.building_slno
            `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    LocationMasterUpdated: (data, callBack) => {
        pool.query(
            `Update work_locationmaster SET 
                work_location_name =?, status =?,edited_id=?,building_slno=?
                WHERE work_location_Id=?`,
            [
                data.Location_name,
                data.Location_status,
                data.edit_user,
                data.building,
                data.Location_id,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}