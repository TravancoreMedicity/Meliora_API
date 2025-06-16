const { pool } = require("../../config/database");

module.exports = {
  insertAntibiotic: (data, callback) => {
    pool.query(
      `INSERT INTO ams_antibiotic_master
          ( 
          item_code,
          itc_desc,
          composition_volume,
          vital_essential,
          dosage_form,
          strip,
          pregnancy_category,
          storage_condition,
          item_mrp,
          manufacturer,
          restricted,
          inactive,
          stopped_medicine,
          high_risk,
          antibiotic,
          status,
          create_user         
          )          
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.item_code,
        data.itc_desc,
        data.composition_volume,
        data.vital_essential,
        data.dosage_form,
        data.strip,
        data.pregnancy_category,
        data.storage_condition,
        data.item_mrp,
        data.manufacturer,
        data.restricted,
        data.inactive,
        data.stopped_medicine,
        data.high_risk,
        data.antibiotic,
        data.status,
        data.create_user,
      ],

      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getAllAntibiotics: (callback) => {
    pool.query(
      `select * from  ams_antibiotic_master where status = 1`,
      [],
      (error, results, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  updateAntibiotic: (data, callback) => {
    pool.query(
      `UPDATE ams_antibiotic_master SET 
          item_code=?,
          itc_desc=?,
          composition_volume=?,
          vital_essential=?,
          dosage_form=?,
          strip=?,
          pregnancy_category=?,
          storage_condition=?,
          item_mrp=?,
          manufacturer=?,
          restricted=?,
          inactive=?,
          stopped_medicine=?,
          high_risk=?,
          antibiotic=?,
          status=?,
          edit_user=?      
           WHERE 
          ams_mast_slno=?`,
      [
        data.item_code,
        data.itc_desc,
        data.composition_volume,
        data.vital_essential,
        data.dosage_form,
        data.strip,
        data.pregnancy_category,
        data.storage_condition,
        data.item_mrp,
        data.manufacturer,
        data.restricted,
        data.inactive,
        data.stopped_medicine,
        data.high_risk,
        data.antibiotic,
        data.status,
        data.edit_user,
        data.ams_mast_slno,
      ],
      (error, results, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
