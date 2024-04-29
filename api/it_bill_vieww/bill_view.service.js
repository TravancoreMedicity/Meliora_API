const { pool } = require('../../config/database')
module.exports = {
    TelemonthlyPaid: (callback) => {
        pool.query(
            `SELECT
			monthly_slno,
			monthly_bill_generate,
            it_bill_monthly_tariff.bill_add_slno,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            bill_tariff,
            bill_amount,
            bill_name,bill_category,
            it_bill_category_name,
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_bill_monthly_tariff
            left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=1
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    TeleQuarterPaid: (callback) => {
        pool.query(
            `SELECT
			quaterly_slno,
			quaterly_bill_generate,
            it_quaterly_tarrif_details.bill_add_slno,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            bill_tariff,
            bill_amount,
            bill_name,bill_category,
            it_bill_category_name,
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_quaterly_tarrif_details
            left join it_bill_add on it_bill_add.bill_add_slno=it_quaterly_tarrif_details.bill_add_slno
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=1
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    TeleYearPaid: (callback) => {
        pool.query(
            `SELECT
			yearly_slno,
	        yearly_bill_generate,
            it_yearly_tarrif_details.bill_add_slno,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            bill_amount,
            bill_tariff,
            bill_name,bill_category,
            it_bill_category_name,
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_yearly_tarrif_details
            left join it_bill_add on it_bill_add.bill_add_slno=it_yearly_tarrif_details.bill_add_slno
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=1
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    TeleOthrPaid: (callback) => {
        pool.query(
            ` SELECT
			other_bill_slno,  
            bill_amount,
            bill_name,bill_category,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            it_bill_category_name,            
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_other_bills    
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_other_bills.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=1
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    SoftwaremonthlyPaid: (callback) => {
        pool.query(
            `SELECT
			monthly_slno,
			monthly_bill_generate,
            it_bill_monthly_tariff.bill_add_slno,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            bill_tariff,
            bill_amount,
            bill_name,bill_category,
            it_bill_category_name,
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_bill_monthly_tariff
            left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=2
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },
    SoftwareQuarterlyPaid: (callback) => {
        pool.query(
            `SELECT
			quaterly_slno,
			quaterly_bill_generate,
            it_quaterly_tarrif_details.bill_add_slno,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            bill_tariff,
            bill_amount,
            bill_name,bill_category,
            it_bill_category_name,
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_quaterly_tarrif_details
            left join it_bill_add on it_bill_add.bill_add_slno=it_quaterly_tarrif_details.bill_add_slno
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=2
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    SoftYearPaid: (callback) => {
        pool.query(
            `SELECT
			yearly_slno,
	        yearly_bill_generate,
            it_yearly_tarrif_details.bill_add_slno,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            bill_amount,
            bill_tariff,
            bill_name,bill_category,
            it_bill_category_name,
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_yearly_tarrif_details
            left join it_bill_add on it_bill_add.bill_add_slno=it_yearly_tarrif_details.bill_add_slno
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=2
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },
    SoftOthrPaid: (callback) => {
        pool.query(
            ` SELECT
			other_bill_slno,  
            bill_amount,
            bill_name,bill_category,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            it_bill_category_name,            
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_other_bills    
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_other_bills.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=2
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ServicemonthlyPaid: (callback) => {
        pool.query(
            `SELECT
			monthly_slno,
			monthly_bill_generate,
            it_bill_monthly_tariff.bill_add_slno,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            bill_tariff,
            bill_amount,
            bill_name,bill_category,
            it_bill_category_name,
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_bill_monthly_tariff
            left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=3
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    SerViceQuarterPaid: (callback) => {
        pool.query(
            `SELECT
			quaterly_slno,
			quaterly_bill_generate,
            it_quaterly_tarrif_details.bill_add_slno,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            bill_tariff,
            bill_amount,
            bill_name,bill_category,
            it_bill_category_name,
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_quaterly_tarrif_details
            left join it_bill_add on it_bill_add.bill_add_slno=it_quaterly_tarrif_details.bill_add_slno
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=3
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ServiceYearPaid: (callback) => {
        pool.query(
            `SELECT
			yearly_slno,
	        yearly_bill_generate,
            it_yearly_tarrif_details.bill_add_slno,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            bill_amount,
            bill_tariff,
            bill_name,bill_category,
            it_bill_category_name,
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_yearly_tarrif_details
            left join it_bill_add on it_bill_add.bill_add_slno=it_yearly_tarrif_details.bill_add_slno
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=3
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ServiceOthrPaid: (callback) => {
        pool.query(
            ` SELECT
			other_bill_slno,  
            bill_amount,
            bill_name,bill_category,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            it_bill_category_name,            
            payed_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            bill_number
            FROM
            it_other_bills    
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_other_bills.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status=1 and it_bill_category_mast.it_bill_type_slno=3
            ORDER BY bill_date desc`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getMonthlyTariffBillAmount: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            ` Select
                    monthly_slno,
                    monthly_bill_generate,
                    it_bill_add.bill_tariff,          
                    bill_category,
                    bill_amount,
                    bill_date,
                    bill_paid_date,
                    bill_number,
                    bill_due_date,                    
                    it_bill_category_mast.it_bill_category_name

            From  it_bill_monthly_tariff

                   left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno
                   left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category     
            where
                  payed_status=1 
                  and bill_paid_date between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getQuarterlyTariffBillAmount: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `Select
            quaterly_slno,
            quaterly_bill_generate,
                    it_bill_add.bill_tariff,          
                    bill_category,
                    bill_amount,
                    bill_date,
                    bill_paid_date,
                    bill_number,
                    bill_due_date,                    
                    it_bill_category_mast.it_bill_category_name

            From  it_quaterly_tarrif_details

                   left join it_bill_add on it_bill_add.bill_add_slno=it_quaterly_tarrif_details.bill_add_slno
                   left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category     
            where
                  payed_status=1 
                  and bill_paid_date between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getYearlyTariffBillAmount: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `Select
            yearly_slno,
            yearly_bill_generate,
                    it_bill_add.bill_tariff,          
                    bill_category,
                    bill_amount,
                    bill_date,
                    bill_paid_date,
                    bill_number,
                    bill_due_date,                    
                    it_bill_category_mast.it_bill_category_name

            From  it_yearly_tarrif_details

                   left join it_bill_add on it_bill_add.bill_add_slno=it_yearly_tarrif_details.bill_add_slno
                   left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category     
            where
                  payed_status=1 
                  and bill_paid_date between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getOtherTariffBillAmount: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `Select
                    other_bill_slno,
                    bill_category,
                    bill_amount,
                    bill_date,
                    bill_paid_date,
                    bill_number,
                    bill_due_date,                    
                    it_bill_category_mast.it_bill_category_name
            From
                   it_other_bills
                   left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_other_bills.bill_category
            where
                  payed_status=1 
                  and bill_paid_date between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getMonthlyTariffYear: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            ` Select
                    monthly_slno,                          
                    bill_category,
                    bill_amount,                    
                    bill_paid_date,                                                         
                    it_bill_category_mast.it_bill_category_name

            From  it_bill_monthly_tariff

                   left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno
                   left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category     
            where
                  payed_status=1 
                  and bill_paid_date between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getQuarterlyTariffYear: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `Select
            quaterly_slno,
            bill_category,
            bill_amount,                 
            bill_paid_date,                                   
            it_bill_category_mast.it_bill_category_name
            From  it_quaterly_tarrif_details
                   left join it_bill_add on it_bill_add.bill_add_slno=it_quaterly_tarrif_details.bill_add_slno
                   left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category     
            where
                  payed_status=1 
                  and bill_paid_date between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getYearlyTariffYear: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `Select
            yearly_slno,                   
            bill_category,
            bill_amount,                   
            bill_paid_date,                                       
            it_bill_category_mast.it_bill_category_name

            From  it_yearly_tarrif_details

                   left join it_bill_add on it_bill_add.bill_add_slno=it_yearly_tarrif_details.bill_add_slno
                   left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category     
            where
                  payed_status=1 
                  and bill_paid_date between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getOtherTariffYear: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `Select
                    other_bill_slno,
                    bill_category,
                    bill_amount,                    
                    bill_paid_date,                                     
                    it_bill_category_mast.it_bill_category_name
            From
                   it_other_bills
                   left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_other_bills.bill_category
            where
                  payed_status=1 
                  and bill_paid_date between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },


}