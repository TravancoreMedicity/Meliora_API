const { floorDashgetById, RoomDashgetById, FloorNDroomById } = require("../rm_dashboard/dashboard.services")
module.exports = {
    floorDashgetById: (req, res) => {

        const id = req.params.id;

        floorDashgetById(id, (err, results) => {

            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },
    RoomDashgetById: (req, res) => {
        const id = req.params.id;

        RoomDashgetById(id, (err, results) => {

            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },
    FloorNDroomById: (req, res) => {
        const id = req.params.id;

        FloorNDroomById(id, (err, results) => {

            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },
}