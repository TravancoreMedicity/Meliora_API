const { pool } = require('../../config/database');

module.exports = {
    insertAllOrderPartyType: (data, callBack) => {
       
        pool.query(
            `INSERT INTO order_party_type
        (
            party_name,
            is_active,
            created_by
        ) VALUES (?, ?, ?)`,
            [
                data.party_name,
                data.is_active,
                data.created_by
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateAllOrderPartyType: (data, callBack) => {
        pool.query(
            `UPDATE order_party_type
            SET 
                party_name = ?,
                is_active = ?,
                updated_by = ?
            WHERE party_type_id = ?`,
            [
                data.party_name,
                data.is_active,
                data.updated_by,
                data.party_type_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }, getAllOrderPartyType: (callBack) => {
        pool.query(
            `
            SELECT 
				party_type_id,
				party_name,
				is_active
            FROM
                order_party_type;
                `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


}