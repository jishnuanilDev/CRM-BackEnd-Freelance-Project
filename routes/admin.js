const express = require('express');
const adminRouter = express.Router();
const vendorController = require('../controllers/adminController/vendorController');
const purchaseOrderController = require('../controllers/adminController/purchaseOrderController');
const gateEntryController = require('../controllers/adminController/gateEntryController');
const currentStockController = require('../controllers/adminController/currentStockController');
const qualityCheckController = require('../controllers/adminController/qualityCheckController');
const reworkController = require('../controllers/adminController/reworkController');
const productionOrderCreationController = require('../controllers/adminController/productionOrderCreationController');
const requestCreationMaterialController = require('../controllers/adminController/requestCreationMaterialController');
const materialAssignmentController = require('../controllers/adminController/materialAssignmentController');
const billOfMaterialsController = require('../controllers/adminController/billOfMaterialsController');
const qualityInspectionController = require('../controllers/adminController/qualityInspectionController');
const finishedGoodsController = require('../controllers/adminController/finishedGoodsController');
const invoiceCreationController = require('../controllers/adminController/invoiceCreationController');
const adminController = require('../controllers/adminController/adminController');
const mainStockController = require('../controllers/adminController/mainStockController');
const processOrderController = require('../controllers/adminController/processOrderController')

adminRouter.get('/vendorManagement',vendorController.vendorManagement);
adminRouter.get('/purchaseOrderCreation',purchaseOrderController.fetchPurchaseOrderCreation);
adminRouter.get('/gateEntry',gateEntryController.fetchGateEntry);
adminRouter.get('/currentStock',currentStockController.fetchCurrentStock);
adminRouter.get('/qualityCheck',qualityCheckController.fetchQualityCheck);
adminRouter.get('/mainStock',mainStockController.fetchMainStock);
adminRouter.get('/processOrder',processOrderController.fetchProcessOrder);
adminRouter.get('/rework',reworkController.fetchRework);
adminRouter.get('/productionOrderCreation',productionOrderCreationController.fetchProductOrderCreation);
adminRouter.get('/productionOrderCreationOutput',productionOrderCreationController.fetchProductOrderCreationOutput);
adminRouter.get('/requestCreationForMaterials',requestCreationMaterialController.fetchRequestCreationForMaterials);
adminRouter.get('/materialAssignment',materialAssignmentController.fetchMaterialAssignment);
adminRouter.get('/billOfMaterials',billOfMaterialsController.fetchbillOfMaterials);
adminRouter.get('/qualityInpsection',qualityInspectionController.fetchQualityInspection);
adminRouter.get('/finishedGoods',finishedGoodsController.fetchFinishedGoods);
// adminRouter.get('/firms',purchaseOrderController.fetchFirms);
adminRouter.get('/invoiceCreations',invoiceCreationController.fetchInvoiceCreations);

adminRouter.post('/newVendorManagmenent',vendorController.newVendorManagement); 
adminRouter.post('/newPurchaseOrderCreation',purchaseOrderController.newPurchaseOrderCreation);
adminRouter.post('/newGateEntry',gateEntryController.newGateEntry);
adminRouter.post('/newCurrentStock',currentStockController.newCurrentStock);
adminRouter.post('/newQualityCheck',qualityCheckController.newQualityCheck);
adminRouter.post('/newMainStock',mainStockController.newMainStock);
adminRouter.post('/newProcessOrder',processOrderController.newProcessOrder); 
adminRouter.post('/newRework',reworkController.newRework);
adminRouter.post('/newProductionOrderCreation',productionOrderCreationController.newProductionOrderCreation);
adminRouter.post('/newProductionOrderCreationOutput',productionOrderCreationController.newProductionOrderCreationOutput);
adminRouter.post('/newRequestCreationForMaterials',requestCreationMaterialController.newRequestCreationForMaterials);
adminRouter.post('/newMaterialAssignment',materialAssignmentController.newMaterialAssignment);
adminRouter.post('/newBillOfMaterials',billOfMaterialsController.newBillOfMaterials);
adminRouter.post('/newQualityInspection',qualityInspectionController.newQualityInspection);
adminRouter.post('/newFinishedGoods',finishedGoodsController.newFinishedGoods);
adminRouter.post('/newInvoiceCreation',invoiceCreationController.newInvoiceCreation);

adminRouter.put('/editInvoiceCreation',invoiceCreationController.editInvoiceCreation);
adminRouter.put('/editVendorManagmenent',vendorController.editVendorManagement);
adminRouter.put('/editPurchaseOrderCreation',purchaseOrderController.editPurchaseOrderCreation);
adminRouter.put('/editGateEntry',gateEntryController.editGateEntry);
adminRouter.put('/editCurrentStock',currentStockController.editCurrentStock);
adminRouter.put('/editQualityCheck',qualityCheckController.editQualityCheck);
adminRouter.put('/editMainStock',mainStockController.editMainStock);
adminRouter.put('/editProcessOrder',processOrderController.editProcessOrder);
adminRouter.put('/editRework',reworkController.editRework);
adminRouter.put('/editProductionOrderCreation',productionOrderCreationController.editProductionOrderCreation);
adminRouter.put('/editProductionOrderCreationOutput',productionOrderCreationController.editProductionOrderCreationOutput);
adminRouter.put('/editRequestCreationForMaterials',requestCreationMaterialController.editRequestCreationForMaterials);
adminRouter.put('/editMaterialAssignment',materialAssignmentController.editMaterialAssignment);
adminRouter.put('/editBillOfMaterials',billOfMaterialsController.editBillOfMaterials);
adminRouter.put('/editQualityInspection',qualityInspectionController.editQualityInspection);
adminRouter.put('/editFinishedGoods',finishedGoodsController.editFinishedGoods);

adminRouter.delete('/removeVendorManagement',vendorController.removeVendorManagement);
adminRouter.delete('/removePurchaseOrderCreation',purchaseOrderController.removePurchaseOrderCreation);
adminRouter.delete('/removeGateEntry',gateEntryController.removeGateEntry);
adminRouter.delete('/removeCurrentStock',currentStockController.removeCurrentStock);
adminRouter.delete('/removeQualityCheck',qualityCheckController.removeQualityCheck);
adminRouter.delete('/removeMainStock',mainStockController.removeMainStock);
adminRouter.delete('/removeRework',reworkController.removeRework);
adminRouter.delete('/removeProductionOrderCreation',productionOrderCreationController.removeProductionOrderCreation);
adminRouter.delete('/removeProductionOrderCreationOutput',productionOrderCreationController.removeProductionOrderCreationOutput);
adminRouter.delete('/removeRequestCreationForMaterials',requestCreationMaterialController.removeRequestCreationForMaterials);
adminRouter.delete('/removeMaterialAssignment',materialAssignmentController.removeMaterialAssignment);
adminRouter.delete('/removeBillOfMaterials',billOfMaterialsController.removeBillOfMaterials);
adminRouter.delete('/removeFinalQualityInspection',qualityInspectionController.removeFinalQualityInspection);
adminRouter.delete('/removeFinishedGoods',finishedGoodsController.removeFinishedGoods);
adminRouter.delete('/removeInvoiceCreation',invoiceCreationController.removeInvoiceCreation);
adminRouter.post('/signIn',adminController.signIn);
adminRouter.post('/signUp',adminController.signUp);
adminRouter.post('/verifyOtp',adminController.verifyOtp);
// adminRouter.post('/otpSignUp',adminController.otpSignUp);


module.exports = adminRouter;