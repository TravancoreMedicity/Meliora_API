const router = require('express').Router();

const {
    createItemHighlight,
    getItemHighlights,
    updateItemHighlight,
    deleteItemHighlight,
    getTodaySpecialItems
} = require('./highlightmapping.controller');

router.post('/item-highlight', createItemHighlight);

router.get('/item-highlight', getItemHighlights);

router.patch('/item-highlight', updateItemHighlight);

router.delete('/item-highlight/:mapping_id', deleteItemHighlight);

router.get('/today-special', getTodaySpecialItems);

module.exports = router;