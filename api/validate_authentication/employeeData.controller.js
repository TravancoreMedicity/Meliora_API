const { getValidateAuthentication } = require('./employeeData.service')
module.exports = {

    getValidateAuthentication: (req, res) => {
        const id = req.params.id;
        getValidateAuthentication(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
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
