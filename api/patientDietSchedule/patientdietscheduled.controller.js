const {
    insertPatientSchedule,
    getAllScheduledPatient,
    updateScheduleStatusService,
    cancelScheduleService,
    deactivateScheduleService,
    getPatientProcesssedFood,
    ServedSchedule
} = require('./patientdietscheduled.service');


module.exports = {

    schedulePatientDietDetail: (req, res) => {

        const { itemDetail, status, process_date, created_by } = req.body;


        if (itemDetail.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "No Data for Inserting"
            });
        }

        const values = itemDetail?.map(item => ([
            item.plan_id,
            process_date,
            item.type_id,
            status,
            created_by
        ]));


        insertPatientSchedule(values, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Scheduled Success Fully"
            });
        });
    },

    getAllScheduledPatient: (req, res) => {
        const { date } = req.body;
        getAllScheduledPatient(date, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    data: [],
                    message: "No Diet Plan Scheduled Yet "
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });
        });
    },

    getPatientProcesssedFood: (req, res) => {
        const { plan_id } = req.body;
        getPatientProcesssedFood(plan_id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    data: [],
                    message: "No Diet Plan Scheduled Yet"
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });
        });
    },


    updateScheduleStatus: (req, res) => {
        const { patient_diet_id, status, updated_by } = req.body;

        if (!patient_diet_id || !status) {
            return res.status(400).json({
                success: 0,
                message: "Missing required fields"
            });
        }

        updateScheduleStatusService(patient_diet_id, status, updated_by, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Status Updated Successfully"
            });
        });
    },
    cancelSchedule: (req, res) => {
        const { patient_diet_id, cancel_reason, cancelled_by, updated_by, status } = req.body;

        if (!patient_diet_id) {
            return res.status(400).json({
                success: 0,
                message: "patient_diet_id is required"
            });
        }

        cancelScheduleService(
            patient_diet_id,
            cancel_reason,
            cancelled_by,
            updated_by,
            status,
            (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 2,
                    data: results,
                    message: "Schedule Cancelled Successfully"
                });
            }
        );
    },
    ServedSchedule: (req, res) => {
        const { patient_diet_id, updated_by, status } = req.body;

        if (!patient_diet_id) {
            return res.status(400).json({
                success: 0,
                message: "patient_diet_id is required"
            });
        }

        ServedSchedule(
            status,
            updated_by,
            patient_diet_id,
            (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 2,
                    data: results,
                    message: "Schedule Cancelled Successfully"
                });
            }
        );
    },

    deactivateSchedule: (req, res) => {
        const { patient_diet_id, updated_by } = req.body;

        if (!patient_diet_id) {
            return res.status(400).json({
                success: 0,
                message: "patient_diet_id is required"
            });
        }

        deactivateScheduleService(patient_diet_id, updated_by, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Schedule Deactivated Successfully"
            });
        });
    }

};












