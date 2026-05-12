const { isValid, parseISO } = require('date-fns');
const {
    insertPatientDietPlan: insertService,
    getAllPatientDietPlan: getAllService,
    updatePatientDietPlan: updateService,
    getDieticians: getDieticiansService,
    getAllTemplatedtl,
    StopCurrentPlan,
    getAllDietProcessList,
    FetchAllActivePatient,
    getAllActiveDietPatient,
    getCurrentTemplateFood,
    fetchAllPatientMealType
} = require('./patientdietplan.service');

module.exports = {

    insertPatientDietPlan: (req, res) => {
        const data = req.body;

        if (!data.patient_id || !data.admission_id || !data.diet_id) {
            return res.status(200).json({
                success: 0,
                message: "Patient ID, Admission ID and Diet ID are required"
            });
        }

        insertService(data, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({
                    success: 0,
                    message: "Error in Inserting Patient Diet Plan"
                });
            }
            // EMIT SOCKET EVENT HERE
            req.io.emit("newDietPlanCreated", {
                plan_id: result?.insertId,
                patient_id: data.patient_id,
                admission_id: data.admission_id,
                diet_id: data.diet_id
            });

            return res.status(200).json({
                success: 2,
                message: "Patient Diet Plan Inserted Successfully"
            });
        });
    },

    getAllPatientDietPlan: (req, res) => {
        const { ns_code } = req.body;

        if (!ns_code) {
            return res.status(200).json({
                success: 0,
                message: "Nurse Station Code Required"
            });
        }

        getAllService(ns_code, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });
    },
    getAllActiveDietPatient: (req, res) => {
        const { ns_code } = req.body;

        if (!ns_code) {
            return res.status(200).json({
                success: 0,
                message: "Nurse Station Code Required"
            });
        }

        getAllActiveDietPatient(ns_code, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });
    },


    FetchAllActivePatient: (req, res) => {
        const { date } = req.body;

        if (!date) {
            return res.status(200).json({
                success: 0,
                message: "Date is Required"
            });
        }
        FetchAllActivePatient(date, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });
    },

    fetchAllPatientMealType: (req, res) => {
        const { date } = req.body;

        if (!date) {
            return res.status(200).json({
                success: 0,
                message: "Date is Required"
            });
        }
        fetchAllPatientMealType(date, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });
    },

    getAllDietProcessList: (req, res) => {
        const { date } = req.body;

        if (!date || !isValid(parseISO(date))) {
            return res.status(200).json({
                success: 0,
                message: "Valid date is required"
            });
        }

        getAllDietProcessList(date, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });
    },

    getAllTemplateDetail: (req, res) => {
        const { template_id } = req.body;


        console.log({
            template_id
        });


        if (!template_id) {
            return res.status(200).json({
                success: 0,
                message: "Template Id is Required"
            });
        }

        getAllTemplatedtl(template_id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }


            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });
    },

    getCurrentTemplateFood: (req, res) => {
        const { template_id, typeIds } = req.body;
        if (!template_id) {
            return res.status(200).json({
                success: 0,
                message: "Template Id is Required"
            });
        }

        if (typeIds?.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "Type Id is Missing"
            });
        }

        getCurrentTemplateFood(template_id, typeIds, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });
    },

    updatePatientDietPlan: (req, res) => {
        const data = req.body;

        if (!data.plan_id) {
            return res.status(200).json({
                success: 0,
                message: "Plan ID Required"
            });
        }

        updateService(data, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Patient Diet Plan Updated Successfully"
            });

        });
    },
    getDieticians: (req, res) => {
        getDieticiansService((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });
    },
    StopCurrentPlan: (req, res) => {
        const data = req.body;

        if (!data.plan_id) {
            return res.status(200).json({
                success: 0,
                message: "Plan ID Required"
            });
        }

        StopCurrentPlan(data, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Patient Diet Plan Stopped Successfully"
            });

        });
    },


};