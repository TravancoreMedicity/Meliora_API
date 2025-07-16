
const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const {getValidateAuthentication} = require('./employeeData.controller');

router.get('/getEmployeeAuthentication/:id', checkToken, getValidateAuthentication)

module.exports = router