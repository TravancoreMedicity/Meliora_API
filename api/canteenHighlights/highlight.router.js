const router = require('express').Router();

const { checkToken } = require('../../authentication/token_validation');
const { requireMenuRight } = require('../../authentication/menuRights');
const { MENU_CANTEEN_HIGHLIGHT } = require('../../authentication/menuNumbers');

const {
    createHighlightType,
    getHighlightTypes,
    getTodaySpecialItems,
    UpdateHighLightType
} = require('./highlight.controller');

// These routes had no checkToken at all. Writes now need a login and the "Canteen Highlight" right
// (menu 353); the list (also read by the mobile app) needs a login. /today-special stays public: no
// screen of ours calls it, so it is probably read by a separate display.
router.post('/highlight-type', checkToken, requireMenuRight(MENU_CANTEEN_HIGHLIGHT), createHighlightType);

router.get('/highlight-type', checkToken, getHighlightTypes);

router.patch('/update-highlight-type', checkToken, requireMenuRight(MENU_CANTEEN_HIGHLIGHT), UpdateHighLightType);

router.get('/today-special', getTodaySpecialItems);

module.exports = router;
