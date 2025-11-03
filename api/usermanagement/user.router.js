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
    userBasedLoginVerification, getelidertoken, getKmctoken
} = require('./user.controller');

router.post('/insertUser', verifyToken, insertUser);
router.patch('/editUser', verifyToken, editUser);
router.delete('/deleteUser/:id', verifyToken, deleteUser);
router.get('/getUser/:id', verifyToken, getUser);
router.get('/getAllUser', verifyToken, getAllUser);
router.get('/getRefershToken/:id', getRefershToken)
router.get('/logout/:id', logOutFunctionality)
router.post('/checkUserCres', userBasedLoginVerification)
router.get('/get-elider-token', verifyToken, getelidertoken);
router.get('/get-Kmc-token', verifyToken, getKmctoken);


module.exports = router