const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertUser,
    editUser,
    deleteUser,
    getUser,
    getAllUser,
    getRefershToken,
    logOutFunctionality,
    userBasedLoginVerification
} = require('./user.controller');

router.post('/insertUser', verifyToken, insertUser);
router.patch('/editUser', verifyToken, editUser);
router.delete('/deleteUser/:id', verifyToken, deleteUser);
router.get('/getUser/:id', verifyToken, getUser);
router.get('/getAllUser', verifyToken, getAllUser);
router.get('/getRefershToken/:id', getRefershToken)
router.get('/logout/:id', logOutFunctionality)
router.post('/checkUserCres', userBasedLoginVerification)


module.exports = router