// dietdeliveryassign.router.js

const router = require('express').Router();

const { checkToken } = require('../../authentication/token_validation');
const { CreateDietDeliveryAssignment, getCurrentAssignedFoodDetail, FetchDeliveryByAssigny, updateDeliveryStatus, UpdateDeliveryLogDetail, FetchAssignedItemStatus, fetchDeliveryLogDetail, UpdateAssignOrderDetail } = require('./dietorderassign.controller');


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



router.post(
    '/fetchbyassigny',
    checkToken,
    FetchDeliveryByAssigny
);

router.post(
    '/assign-status-update',
    checkToken,
    FetchDeliveryByAssigny
);

router.post(
    '/update-delivery-status',
    checkToken,
    updateDeliveryStatus
);


router.post(
    '/update-delivery-log',
    checkToken,
    UpdateDeliveryLogDetail
);


router.post(
    '/fetchassigny-item-status',
    checkToken,
    FetchAssignedItemStatus
);


router.post(
    '/fetch-delivery-log',
    checkToken,
    fetchDeliveryLogDetail
);

router.post(
    '/update-order-status',
    checkToken,
    UpdateAssignOrderDetail
);

module.exports = router;