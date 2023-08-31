const { RoomInsert, RoomView, RoomUpdate, roomgetById, lastUpdatedRoomgetById, RoomLastUpdate } = require('../rm_roomnew_creation/rm_newroom.services')
module.exports = {
    RoomInsert: (req, res) => {
        const body = req.body;
        RoomInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            const data = {
                floor_slno: body.rm_room_floor_slno,
                last_room_slno: body.actual_rm_no
            }
            RoomLastUpdate(data, (err, results) => {
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
                    success: 1,
                    insetid: result.insertId
                })
            })
        })
    },

    RoomView: (req, res) => {

        RoomView((err, results) => {
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
    RoomUpdate: (req, res) => {
        const body = req.body;
        RoomUpdate(body, (err, results) => {
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
                message: "Room Updated successfully"
            })
        })
    },
    roomgetById: (req, res) => {

        const id = req.params.id;
        roomgetById(id, (err, results) => {

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
    lastUpdatedRoomgetById: (req, res) => {

        const id = req.params.id;

        lastUpdatedRoomgetById(id, (err, results) => {

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
