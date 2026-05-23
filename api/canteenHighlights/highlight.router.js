const router = require('express').Router();

const {
    createHighlightType,
    getHighlightTypes,
    getTodaySpecialItems,
    UpdateHighLightType
} = require('./highlight.controller');

router.post('/highlight-type', createHighlightType);

router.get('/highlight-type', getHighlightTypes);

router.patch('/update-highlight-type', UpdateHighLightType);

router.get('/today-special', getTodaySpecialItems);

module.exports = router;