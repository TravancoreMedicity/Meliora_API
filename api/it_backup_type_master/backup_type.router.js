const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { BackupTypeInsert, BackupTypeView, BackupTypeUpdate, getBackupType } = require('../it_backup_type_master/backup_type.controller');

router.post('/insert', checkToken, BackupTypeInsert)
router.get('/view', checkToken, BackupTypeView)
router.patch('/update', checkToken, BackupTypeUpdate)

router.get('/getBackupType', checkToken, getBackupType)
module.exports = router