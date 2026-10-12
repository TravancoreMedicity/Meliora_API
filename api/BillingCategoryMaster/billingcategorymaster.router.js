const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');

const {
    insertBillingCategory,
    getAllBillingCategory,
    updateBillingCategory
} = require('./billlingcategorymaster.controller');

router.post('/insert', checkToken, insertBillingCategory);
router.get('/getall', checkToken, getAllBillingCategory);
router.patch('/update', checkToken, updateBillingCategory);

module.exports = router;

