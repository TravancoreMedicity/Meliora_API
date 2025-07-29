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
      `select * from  ams_antibiotic_master `,
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
  getAntibioticPatientDetails: (callback) => {
    pool.query(
     `select * ,
      itc_desc,
      vital_essential,
      composition_volume,
      restricted,
      ams_antibiotic_master.item_code
      from  
      ams_antibiotic_patient_details 
      left join ams_antibiotic_master on ams_antibiotic_master.item_code =ams_antibiotic_patient_details.item_code
      where patient_status=1 and report_updated = 0`,
      [],
      (error, results, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  
  updatePatientDetails: (data, callback) => {    
    pool.query(
     `    UPDATE ams_antibiotic_patient_details SET 
          clinical_assesment = ?,
          sample_id = ?,
          date_of_collection = ?,
          samp_collect_for_antibiotic = ?,
          date_of_issue_of_report = ?,
          abst_culture_report = ?,
          emprical_antibiotic = ?,
          emprical_antibio_date_of_start = ?,
          escal_descal_iv_oral_switich = ?,
          emprical_antibio_complaince_policy = ?,
          compliance_pathogen_directed_therapy = ?,
          physician_ams_comments = ?,
          patient_outcome = ?,         
          lab_no = ?,
          specimen = ?, 
          fluid_type = ?,
          sample_type = ?,
          result_verified_date = ?,
          investigation = ?,
          organism_one = ?, 
          organism_two = ?,
          growth = ?, 
          growth_remark_one = ?,
          growth_remark_two = ?, 
          growth_remark_three = ?,
          culture_details_remarks = ?,              
          culture_details_added_date = ?,
          report_updated = ?,
          report_submitted_date = ?,
          report_submitted_user= ?
        WHERE 
          ams_patient_detail_slno = ?`,
      [
    data.clinicalAssesment,
    data.sampleID,
    data.dateOfCollection,
    data.sampleCollected,
    data.dateOfIssueOfReport,
    data.abstCultureReport,
    data.empricalAntibiotic,
    data.empricalAntibioDateOfStart,
    data.escalDescalIVOralSwitich,
    data.emprical_antibio_complaince_policy,
    data.compliance_pathogen_directed_therapy,
    data.physicianAmsComments,
    data.patientOutcome,
    data.labNo,
    data.Specimen,
    data.FluidType,
    data.SampleType,
    data.ResultVerifyDate,
    data.Investigation,
    data.organismOne,
    data.organismTwo,
    data.Growth,
    data.growthRemarkOne,
    data.growthRemarkTwo,
    data.growthRemarkThree,
    data.cultureDetailsRemarks,
    data.cultureDetailsAddedDate,
    data.report_updated,
    data.report_submitted_date,
    data.report_submitted_user,
    data.ams_patient_detail_slno,
      ],
      (error, results, feilds) => {          
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

    getReportAntibioticPatients: (data,callback) => {
    pool.query(
        `WITH distinct_antibiotics AS (
        SELECT
            ams_patient_antibiotics.patient_ip_no,
            ams_patient_antibiotics.item_code,
            MIN(ams_patient_antibiotics.bill_date) AS bill_date  -- use earliest bill_date to represent that item_code
        FROM ams_patient_antibiotics
        GROUP BY ams_patient_antibiotics.patient_ip_no, ams_patient_antibiotics.item_code
    ),

    merged_data AS (
        SELECT 
            apd.ams_patient_detail_slno,
            ab.patient_ip_no,
            apd.mrd_no,
            apd.patient_name, 
            apd.patient_age,
            apd.patient_gender, 
            apd.patient_location,
            apd.bed_code,
            apd.consultant_department,    
            apd.doc_name, 
            apd.clinical_assesment,
            apd.sample_id,
            apd.date_of_collection,
            apd.samp_collect_for_antibiotic,
            apd.date_of_issue_of_report,
            apd.abst_culture_report,
            apd.emprical_antibiotic,
            apd.emprical_antibio_date_of_start,
            apd.escal_descal_iv_oral_switich,
            apd.emprical_antibio_complaince_policy,
            apd.compliance_pathogen_directed_therapy,
            apd.lab_no,
            apd.specimen,
            apd.fluid_type,
            apd.sample_type,
            apd.investigation,
            apd.organism_one,
            apd.organism_two,
            apd.growth,
            apd.growth_remark_one,
            apd.growth_remark_two, 
            apd.growth_remark_three,
            apd.result_verified_date,
            apd.culture_details_remarks,
            apd.culture_details_added_date,
            apd.physician_ams_comments,
            apd.report_updated, 
            apd.patient_outcome,
            ab.bill_date,
            aba.item_priority,
            aba.item_code,
            CONCAT(
                aam.itc_desc,
                ' - ',
                CASE 
                    WHEN aam.restricted = 1 THEN 'Restricted' 
                    ELSE 'Unrestricted' 
                END
            ) AS antibiotic_info
        FROM distinct_antibiotics ab
        JOIN ams_patient_antibiotics aba 
            ON aba.patient_ip_no = ab.patient_ip_no 
            AND aba.item_code = ab.item_code
            AND aba.bill_date = ab.bill_date  
        LEFT JOIN ams_antibiotic_master aam 
            ON aam.item_code = aba.item_code
        LEFT JOIN ams_antibiotic_patient_details apd 
            ON apd.ams_patient_detail_slno = aba.ams_patient_detail_slno
        WHERE 
            apd.patient_status = 1 
            AND apd.report_updated = 1
            AND aba.bill_date BETWEEN ? AND ?
    ),

    numbered_antibiotics AS (
        SELECT *,
            ROW_NUMBER() OVER (
                PARTITION BY patient_ip_no 
                ORDER BY item_priority DESC, ams_patient_detail_slno
            ) AS rn
        FROM merged_data
    )

    SELECT 
        patient_ip_no,
        mrd_no,
        patient_name, 
        patient_age,
        patient_gender, 
        patient_location,
        bed_code,
        consultant_department,    
        doc_name, 
        clinical_assesment,
        sample_id,
        date_of_collection,
        samp_collect_for_antibiotic,
        date_of_issue_of_report,
        abst_culture_report,
        emprical_antibiotic,
        emprical_antibio_date_of_start,
        escal_descal_iv_oral_switich,
        emprical_antibio_complaince_policy,
        compliance_pathogen_directed_therapy,
        lab_no,
        specimen,
        fluid_type,
        sample_type,
        investigation,
        organism_one,
        organism_two,
        growth,
        growth_remark_one,
        growth_remark_two, 
        growth_remark_three,
        result_verified_date,
        culture_details_remarks,
        culture_details_added_date,
        physician_ams_comments,
        report_updated, 
        patient_outcome,

    MAX(CASE WHEN rn = 1 THEN antibiotic_info END) AS Antibiotic_1,
    MAX(CASE WHEN rn = 1 THEN bill_date END) AS Antibiotic_1_BillDate,

    MAX(CASE WHEN rn = 2 THEN antibiotic_info END) AS Antibiotic_2,
    MAX(CASE WHEN rn = 2 THEN bill_date END) AS Antibiotic_2_BillDate,

    MAX(CASE WHEN rn = 3 THEN antibiotic_info END) AS Antibiotic_3,
    MAX(CASE WHEN rn = 3 THEN bill_date END) AS Antibiotic_3_BillDate,

    MAX(CASE WHEN rn = 4 THEN antibiotic_info END) AS Antibiotic_4,
    MAX(CASE WHEN rn = 4 THEN bill_date END) AS Antibiotic_4_BillDate,

    MAX(CASE WHEN rn = 5 THEN antibiotic_info END) AS Antibiotic_5,
    MAX(CASE WHEN rn = 5 THEN bill_date END) AS Antibiotic_5_BillDate


    FROM numbered_antibiotics
    GROUP BY 
        patient_ip_no,
        mrd_no,
        patient_name, 
        patient_age,
        patient_gender, 
        patient_location,
        bed_code,
        consultant_department,    
        doc_name, 
        clinical_assesment,
        sample_id,
        date_of_collection,
        samp_collect_for_antibiotic,
        date_of_issue_of_report,
        abst_culture_report,
        emprical_antibiotic,
        emprical_antibio_date_of_start,
        escal_descal_iv_oral_switich,
        emprical_antibio_complaince_policy,
        compliance_pathogen_directed_therapy,
        lab_no,
        specimen,
        fluid_type,
        sample_type,
        investigation,
        organism_one,
        organism_two,
        growth,
        growth_remark_one,
        growth_remark_two, 
        growth_remark_three,
        result_verified_date,
        culture_details_remarks,
        culture_details_added_date,
        physician_ams_comments,
        report_updated, 
        patient_outcome;
        `,
      // `WITH numbered_antibiotics AS (
      //     SELECT 
      //         ams_patient_antibiotics.patient_ip_no,
      //         ams_antibiotic_patient_details.mrd_no,
      //         ams_antibiotic_patient_details.patient_name, 
      //         ams_antibiotic_patient_details.patient_age,
      //         ams_antibiotic_patient_details.patient_gender, 
      //         ams_antibiotic_patient_details.patient_location,
      //         ams_antibiotic_patient_details.bed_code,
      //         ams_antibiotic_patient_details.consultant_department,    
      //         ams_antibiotic_patient_details.doc_name, 
      //         ams_antibiotic_patient_details.clinical_assesment,
      //         ams_antibiotic_patient_details.sample_id,
      //         ams_antibiotic_patient_details.date_of_collection,
      //         ams_antibiotic_patient_details.samp_collect_for_antibiotic,
      //         ams_antibiotic_patient_details.date_of_issue_of_report,
      //         ams_antibiotic_patient_details.abst_culture_report,
      //         ams_antibiotic_patient_details.emprical_antibiotic,
      //         ams_antibiotic_patient_details.emprical_antibio_date_of_start,
      //         ams_antibiotic_patient_details.escal_descal_iv_oral_switich,
      //         ams_antibiotic_patient_details.emprical_antibio_complaince_policy,
      //         ams_antibiotic_patient_details.compliance_pathogen_directed_therapy,
      //         ams_antibiotic_patient_details.lab_no,
      //         ams_antibiotic_patient_details.specimen,
      //         ams_antibiotic_patient_details.fluid_type,
      //         ams_antibiotic_patient_details.sample_type,
      //         ams_antibiotic_patient_details.investigation,
      //         ams_antibiotic_patient_details.organism_one,
      //         ams_antibiotic_patient_details.organism_two,
      //         ams_antibiotic_patient_details.growth,
      //         ams_antibiotic_patient_details.growth_remark_one,
      //         ams_antibiotic_patient_details.growth_remark_two, 
      //         ams_antibiotic_patient_details.growth_remark_three,
      //         ams_antibiotic_patient_details.culture_details_remarks,
      //         ams_antibiotic_patient_details.culture_details_added_date,
      //         ams_antibiotic_patient_details.physician_ams_comments,
      //         ams_antibiotic_patient_details.report_updated, 
      //         ams_antibiotic_patient_details.patient_outcome, 
      //         ams_patient_antibiotics.bill_date,
      //         ams_patient_antibiotics.item_priority,
      //         ams_patient_antibiotics.item_code,
      //         CONCAT(
      //             ams_antibiotic_master.itc_desc,
      //             ' - ',
      //             CASE 
      //                 WHEN ams_antibiotic_master.restricted = 1 THEN 'Restricted' 
      //                 ELSE 'Unrestricted' 
      //             END
      //         ) AS antibiotic_info,

      //         ROW_NUMBER() OVER (
      //             PARTITION BY ams_patient_antibiotics.patient_ip_no 
      //             ORDER BY ams_patient_antibiotics.item_priority DESC, 
      //                     ams_patient_antibiotics.ams_patient_detail_slno
      //         ) AS rn
      //     FROM ams_antibiotic_patient_details 
      //     LEFT JOIN ams_patient_antibiotics 
      //         ON ams_patient_antibiotics.ams_patient_detail_slno = ams_antibiotic_patient_details.ams_patient_detail_slno
      //     LEFT JOIN ams_antibiotic_master 
      //         ON ams_antibiotic_master.item_code = ams_patient_antibiotics.item_code
      //     WHERE 
      //         ams_antibiotic_patient_details.patient_status = 1 
      //         AND ams_antibiotic_patient_details.report_updated = 1
      //         AND ams_patient_antibiotics.bill_date BETWEEN ? AND ?
      // )

      // SELECT 
      //     patient_ip_no,
      //     mrd_no,
      //     patient_name, 
      //     patient_age,
      //     patient_gender, 
      //     patient_location,
      //     bed_code,
      //     consultant_department,    
      //     doc_name, 
      //     clinical_assesment,
      //     sample_id,
      //     date_of_collection,
      //     samp_collect_for_antibiotic,
      //     date_of_issue_of_report,
      //     abst_culture_report,
      //     emprical_antibiotic,
      //     emprical_antibio_date_of_start,
      //     escal_descal_iv_oral_switich,
      //     emprical_antibio_complaince_policy,
      //     compliance_pathogen_directed_therapy,
      //     lab_no,
      //     specimen,
      //     fluid_type,
      //     sample_type,
      //     investigation,
      //     organism_one,
      //     organism_two,
      //     growth,
      //     growth_remark_one,
      //     growth_remark_two, 
      //     growth_remark_three,
      //     culture_details_remarks,
      //     culture_details_added_date,
      //     physician_ams_comments,
      //     report_updated, 
      //     patient_outcome,         

      //     MAX(CASE WHEN rn = 1 THEN antibiotic_info END) AS Antibiotic_1,
      //     MAX(CASE WHEN rn = 2 THEN antibiotic_info END) AS Antibiotic_2,
      //     MAX(CASE WHEN rn = 3 THEN antibiotic_info END) AS Antibiotic_3,
      //     MAX(CASE WHEN rn = 4 THEN antibiotic_info END) AS Antibiotic_4,
      //     MAX(CASE WHEN rn = 5 THEN antibiotic_info END) AS Antibiotic_5

      // FROM numbered_antibiotics
      // GROUP BY 
      //     patient_ip_no,
      //     mrd_no,
      //     patient_name, 
      //     patient_age,
      //     patient_gender, 
      //     patient_location,
      //     bed_code,
      //     consultant_department,    
      //     doc_name, 
      //     clinical_assesment,
      //     sample_id,
      //     date_of_collection,
      //     samp_collect_for_antibiotic,
      //     date_of_issue_of_report,
      //     abst_culture_report,
      //     emprical_antibiotic,
      //     emprical_antibio_date_of_start,
      //     escal_descal_iv_oral_switich,
      //     emprical_antibio_complaince_policy,
      //     compliance_pathogen_directed_therapy,
      //     lab_no,
      //     specimen,
      //     fluid_type,
      //     sample_type,
      //     investigation,
      //     organism_one,
      //     organism_two,
      //     growth,
      //     growth_remark_one,
      //     growth_remark_two, 
      //     growth_remark_three,
      //     culture_details_remarks,
      //     culture_details_added_date,
      //     physician_ams_comments,
      //     report_updated, 
      //     patient_outcome,
      //     item_code
   
      // `,
      [
           data.fromDate,
           data.toDate


      ],
      (error, results, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },



      getRestrictedAntibiotics: (callback) => {
    pool.query(
     `select 
      ams_mast_slno,
      item_code,
      itc_desc
      from
      ams_antibiotic_master
      where restricted=1
      and status=1
      order by itc_desc asc`,
      [],
      (error, results, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  
     getAllAntibioticCount: (data, callback) => {
        pool.query(  
                `SELECT 
                      p.item_code,
                      m.itc_desc,
                      COUNT(*) AS antibiotic_count
                  FROM 
                      ams_patient_antibiotics p
                  LEFT JOIN (
                      SELECT item_code, MIN(itc_desc) AS itc_desc
                      FROM ams_antibiotic_master
                      GROUP BY item_code
                  ) m ON TRIM(UPPER(m.item_code)) = TRIM(UPPER(p.item_code))
                  WHERE
                      p.bill_date BETWEEN ? AND ?
                  GROUP BY 
                      p.item_code, m.itc_desc
                  ORDER BY 
                      antibiotic_count DESC`,
            [
                data.from,
                data.to

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

         getRestrictedAntibioticCount: (data, callback) => {
        pool.query(
            `SELECT 
                m.item_code,
                m.itc_desc,
                COUNT(*) AS antibiotic_count
            FROM
                ams_patient_antibiotics p
            LEFT JOIN 
                ams_antibiotic_master m ON m.item_code = p.item_code
            WHERE
                m.restricted = 1
                AND p.bill_date BETWEEN ? AND ?
            GROUP BY 
                m.item_code, m.itc_desc
            ORDER BY 
                antibiotic_count DESC`,
            [
                data.from,
                data.to

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
         gettotUnRestrictedAntibioticCount: (data, callback) => {
        pool.query(
              ` select 
                COUNT(*) AS antibiotic_count
                from
                ams_patient_antibiotics
                LEFT JOIN  ams_antibiotic_master m on m.item_code = ams_patient_antibiotics.item_code
                where
                restricted = 0
                and
                ams_patient_antibiotics.bill_date BETWEEN ? AND ?`,
            [
                data.from,
                data.to

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

        gettotRestrictedAntibioticCount: (data, callback) => {
        pool.query(
            `  select 
                COUNT(*) AS antibiotic_count
                from
                ams_patient_antibiotics
                LEFT JOIN  ams_antibiotic_master m on m.item_code = ams_patient_antibiotics.item_code
                where
                restricted = 1
                and
                ams_patient_antibiotics.bill_date BETWEEN ? AND ? `,
            [
                data.from,
                data.to

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

      getTotAntibiotics: (data, callback) => {
        pool.query(
            `           
                select 
                COUNT(*) AS antibiotic_count
                from
                ams_patient_antibiotics
                LEFT JOIN  ams_antibiotic_master m on m.item_code = ams_patient_antibiotics.item_code
                where             
                ams_patient_antibiotics.bill_date BETWEEN ? AND ?
`,
            [
                data.from,
                data.to

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getPatientAntibioticList: (data, callback) => {
    pool.query(
     `select 
     patient_ip_no,
     item_priority,
     vital_essential,
     ams_patient_antibiotics.bill_date,
      antibiotic_master.item_code,
      antibiotic_master.itc_desc,
      antibiotic_master.composition_volume
      from  
      ams_patient_antibiotics 
      left join ams_antibiotic_master as antibiotic_master on antibiotic_master.item_code =ams_patient_antibiotics.item_code
      where item_status=1
      and ams_patient_detail_slno =?
      and patient_ip_no=?
      group by antibiotic_master.item_code `,

      [data.ams_patient_detail_slno,
        data.patient_ip_no
      ],
      (error, results, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

updatePatientAntibioticsPriority: (data, callback) => {
  const updates = data.priorityList.map((item) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE ams_patient_antibiotics
         SET item_priority = ?
         WHERE patient_ip_no = ? AND item_code = ?`,
        [item.item_priority, item.patient_ip_no, item.item_code],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  });

  Promise.all(updates)
    .then((results) => callback(null, results))
    .catch((err) => callback(err));
}

}
