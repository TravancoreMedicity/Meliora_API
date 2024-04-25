
const { SimTypeInsert, SimTypeView, SimtypeUpdate } = require('../it_sim_type_master/sim_type.service')
module.exports = {
    SimTypeInsert: (req, res) => {
        const body = req.body;
        SimTypeInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Sim type inserted successfully"
            })
        })
    },
    SimTypeView: (req, res) => {

        SimTypeView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },
    SimtypeUpdate: (req, res) => {
        const body = req.body;

        SimtypeUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Sim type Updated successfully"
            })
        })
    },
}