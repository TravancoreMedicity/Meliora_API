const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getAssetDetails, getcomplaintDetails, getAssetcomplaintDetails, serviceDetailsInsert, getserviceDetails, serviceDetailsUpdate,
    getAllserviceDetails, AssetDetailsUpdate, SpareDetailsUpdate, spareServiceUpdate, servicedEmpDetailsInsert, getDeptServiceDetailsData, servicedEmpDetailsUpdate,
    AssetServiceHoldUpdate, SpareServiceHoldUpdate, getAssetListUnderCustodian, getAssetAlllDetails, getAssetUnderSelectdDeptAndSec, getPendingAsset, getPendingSpare,
    CmSpareComplaintService,InsertSupplierContactDetails,UpdateSupplierContactDetails,viewSupplierContactDetails
} = require('./spare_service_details.controller');

router.post("/getAssetDetails", checkToken, getAssetDetails);

router.post("/getcomplaintDetails", checkToken, getcomplaintDetails);

router.post("/getAssetcomplaintDetails", checkToken, getAssetcomplaintDetails);

router.post("/serviceDetailsInsert", checkToken, serviceDetailsInsert);
router.post("/getserviceDetails", checkToken, getserviceDetails);
router.patch('/serviceDetailsUpdate', checkToken, serviceDetailsUpdate)
router.post("/getAllserviceDetails", checkToken, getAllserviceDetails);


router.patch('/AssetDetailsUpdate', checkToken, AssetDetailsUpdate)
router.patch('/SpareDetailsUpdate', checkToken, SpareDetailsUpdate)
router.patch('/spareServiceUpdate', checkToken, spareServiceUpdate)

router.post("/servicedEmpDetailsInsert", checkToken, servicedEmpDetailsInsert);
router.post("/getDeptServiceDetailsData", checkToken, getDeptServiceDetailsData);
router.patch('/servicedEmpDetailsUpdate', checkToken, servicedEmpDetailsUpdate)

router.patch('/AssetServiceHoldUpdate', checkToken, AssetServiceHoldUpdate)
router.patch('/SpareServiceHoldUpdate', checkToken, SpareServiceHoldUpdate)

router.post("/getAssetListUnderCustodianDetails", checkToken, getAssetListUnderCustodian);
router.post("/getAssetAlllDetails", checkToken, getAssetAlllDetails);

router.post("/getAssetUnderSelectdDeptAndSec", checkToken, getAssetUnderSelectdDeptAndSec);

router.post("/getPendingAsset", checkToken, getPendingAsset);
router.post("/getPendingSpare", checkToken, getPendingSpare);

router.post('/CmSpareComplaintService', checkToken, CmSpareComplaintService)



router.post("/InsertSupplierContactDetails", checkToken, InsertSupplierContactDetails);
router.patch('/UpdateSupplierContactDetails', checkToken, UpdateSupplierContactDetails)
router.get("/viewSupplierContactDetails/:id", checkToken, viewSupplierContactDetails)

module.exports = router