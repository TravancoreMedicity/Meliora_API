// dietdeliveryassign.router.js

const router = require('express').Router();

const { checkToken } = require('../../authentication/token_validation');
const { CreateDietDeliveryAssignment, getCurrentAssignedFoodDetail } = require('./dietorderassign.controller');


router.post(
    '/create',
    checkToken,
    CreateDietDeliveryAssignment
);

router.get(
    '/getcurrent',
    checkToken,
    getCurrentAssignedFoodDetail
);



module.exports = router;