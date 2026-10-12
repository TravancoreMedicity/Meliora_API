const router = require('express').Router();

const { checkToken } = require('../../authentication/token_validation');
const { requireMenuRight } = require('../../authentication/menuRights');
const { MENU_HIGHLIGHT_MAPPING } = require('../../authentication/menuNumbers');

const {
    createItemHighlight,
    getItemHighlights,
    updateItemHighlight,
    deleteItemHighlight,
    getTodaySpecialItems
} = require('./highlightmapping.controller');

// These routes had no checkToken at all. Writes now need a login and the "Canteen Highlight mapping"
// right (menu 360); the list needs a login. /today-special stays public: no screen of ours calls it,
// so it is probably read by a separate display, and it only returns today's highlighted menu items.
router.post('/item-highlight', checkToken, requireMenuRight(MENU_HIGHLIGHT_MAPPING), createItemHighlight);

router.get('/item-highlight', checkToken, getItemHighlights);

router.patch('/item-highlight', checkToken, requireMenuRight(MENU_HIGHLIGHT_MAPPING), updateItemHighlight);

router.delete('/item-highlight/:mapping_id', checkToken, requireMenuRight(MENU_HIGHLIGHT_MAPPING), deleteItemHighlight);

router.get('/today-special', getTodaySpecialItems);

module.exports = router;
