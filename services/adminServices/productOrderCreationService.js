const ProductionOrderCreation = require("../../models/productionOrderCreation");
const PurchaseOrderCreation = require("../../models/purchaseOrderCreation");
const ProductionOrderCreationOutput = require("../../models/productionOrderCreationOutput");
let productOrderCreationService = {};
require("dotenv").config();
let adminAuthPassword = process.env.ADMIN_AUTH_PASS;

productOrderCreationService.fetchProductOrderCreation = async () => {
  try {
    const data = await ProductionOrderCreation.find({}).sort({ createdAt: -1 });
    const batches = await PurchaseOrderCreation.distinct("batchNumber");
    return {
      status: 200,
      data: data,
      batches: batches,
    };
  } catch (error) {
    console.log(
      "An error occured at fetching Production Order Creation in admin service",
      error.message
    );
    res.status(500).json({
      info: "An error occured in fetching Production Order Creation in admin services",
    });
  }
};

productOrderCreationService.fetchProductOrderCreationOutput = async () => {
  try {
    const data = await ProductionOrderCreationOutput.find({}).sort({
      createdAt: -1,
    });
    const batches = await PurchaseOrderCreation.distinct("batchNumber");
    return {
      status: 200,
      data: data,
      batches: batches,
    };
  } catch (error) {
    console.log(
      "An error occured at fetching Production Order outputs Creation in admin service",
      error.message
    );
    res.status(500).json({
      info: "An error occured in fetching Production Order reation Outputs in admin services",
    });
  }
};
productOrderCreationService.newProductionOrderCreation = async (
  productionOrderData
) => {
  try {
    const {
      processOrder,
      plant,
      materialCode,
      productDescription,
      storageLocation,
      batch,
      requiredQuantity,
      instructions,
      startDate,
      endDate,
    } = productionOrderData;

    const existing = await ProductionOrderCreation.findOne({
      $and: [
        { processOrder: processOrder },
        { plant: plant },
        { materialCode: materialCode },
        { productDescription: productDescription },
        { storageLocation: storageLocation },
        { batch: batch },
        { requiredQuantity: requiredQuantity },
        { instructions: instructions },
        { startDate: startDate },
        { endDate: endDate },
      ],
    });

    if (existing) {
      return {
        status: 409,
        message: "Production Order already exists with the same details",
      };
    }

    const newData = new ProductionOrderCreation({
      processOrder,
      plant,
      materialCode,
      productDescription,
      storageLocation,
      batch,
      requiredQuantity,
      instructions,
      startDate,
      endDate,
    });

    await newData.save();
    return {
      status: 201,
      message: " New production order added successfully",
      data: newData,
      token: "sampleToken",
    };
  } catch (error) {
    console.log(
      "An error occured at adding production order in admin service",
      error.message
    );
    res.status(500).json({
      info: "An error occured in adding production order in admin services",
    });
  }
};

productOrderCreationService.newProductionOrderCreationOutput = async (
  productionOrderData
) => {
  try {
    const {
      producedQuantity,
      productionCompletionDate,
      qualityCheckStatus,
      storageLocationforOutput,
      batchNumberforOutput,
      productionNotes,
      Yield,
      outputQualityRating,
      outputHandlingInstructions,
    } = productionOrderData;

    const existing = await ProductionOrderCreationOutput.findOne({
      $and: [
        { producedQuantity: producedQuantity },
        { productionCompletionDate: productionCompletionDate },
        { qualityCheckStatus: qualityCheckStatus },
        { storageLocationforOutput: storageLocationforOutput },
        { batchNumberforOutput: batchNumberforOutput },
        { productionNotes: productionNotes },
        { Yield: Yield },
        { outputQualityRating: outputQualityRating },
        { outputHandlingInstructions: outputHandlingInstructions },
      ],
    });

    if (existing) {
      return {
        status: 409,
        message: "Production Order Output already exists with the same details",
      };
    }

    const newData = new ProductionOrderCreationOutput({
      producedQuantity,
      productionCompletionDate,
      qualityCheckStatus,
      storageLocationforOutput,
      batchNumberforOutput,
      productionNotes,
      Yield,
      outputQualityRating,
      outputHandlingInstructions,
    });

    await newData.save();
    return {
      status: 201,
      message: " New production order output added successfully",
      data: newData,
      token: "sampleToken",
    };
  } catch (error) {
    console.log(
      "An error occured at adding production order output in admin service",
      error.message
    );
    res.status(500).json({
      info: "An error occured in adding production order output in admin services",
    });
  }
};

productOrderCreationService.editProductionOrderCreation = async (
  productionOrderData
) => {
  try {
    const {
      authPassword,
      productionOrderId,
      processOrder,
      plant,
      materialCode,
      productDescription,
      storageLocation,
      batch,
      requiredQuantity,
      instructions,
      startDate,
      endDate,
    } = productionOrderData;

    if (adminAuthPassword !== authPassword) {
      return {
        status: 401,
        message: "Authorization Password is Invalid",
      };
    }

    const existing = await ProductionOrderCreation.findOne({
      $and: [
        { processOrder: processOrder },
        { plant: plant },
        { materialCode: materialCode },
        { productDescription: productDescription },
        { storageLocation: storageLocation },
        { batch: batch },
        { requiredQuantity: requiredQuantity },
        { instructions: instructions },
        { startDate: startDate },
        { endDate: endDate },
      ],
    });

    const currentProductionOrder = await ProductionOrderCreation.findOne({
      $and: [
        { _id: productionOrderId },
        { processOrder: processOrder },
        { plant: plant },
        { materialCode: materialCode },
        { productDescription: productDescription },
        { storageLocation: storageLocation },
        { batch: batch },
        { requiredQuantity: requiredQuantity },
        { instructions: instructions },
        { startDate: startDate },
        { endDate: endDate },
      ],
    });

    if (existing && !currentProductionOrder) {
      return {
        status: 409,
        message: "Production order already exists with the same details",
      };
    } else {
      const ProductionOrderUpdate =
        await ProductionOrderCreation.findByIdAndUpdate(
          productionOrderId,
          {
            processOrder,
            plant,
            materialCode,
            productDescription,
            storageLocation,
            batch,
            requiredQuantity,
            instructions,
            startDate,
            endDate,
          },
          {
            new: true,
            runValidators: true,
          }
        );
    }

    return {
      status: 201,
      message: "Production Order  Edited Successfully",
      token: "sampleToken",
    };
  } catch (error) {
    console.log("An error occured at editing Production Order ", error.message);
    res.status(500).json({
      info: "An error occured in editing Production Order  services",
    });
  }
};

productOrderCreationService.editProductionOrderCreationOutput = async (
  productionOrderData
) => {
  try {
    const {
      authPassword,
      productionOrderoutputId,
      producedQuantity,
      productionCompletionDate,
      qualityCheckStatus,
      storageLocationforOutput,
      batchNumberforOutput,
      productionNotes,
      Yield,
      outputQualityRating,
      outputHandlingInstructions,
    } = productionOrderData;

    if (adminAuthPassword !== authPassword) {
      return {
        status: 401,
        message: "Authorization Password is Invalid",
      };
    }

    const existing = await ProductionOrderCreationOutput.findOne({
      $and: [
        { producedQuantity: producedQuantity },
        { productionCompletionDate: productionCompletionDate },
        { qualityCheckStatus: qualityCheckStatus },
        { storageLocationforOutput: storageLocationforOutput },
        { batchNumberforOutput: batchNumberforOutput },
        { productionNotes: productionNotes },
        { Yield: Yield },
        { outputQualityRating: outputQualityRating },
        { outputHandlingInstructions: outputHandlingInstructions },
      ],
    });

    const currentProductionOrderOutput =
      await ProductionOrderCreationOutput.findOne({
        $and: [
          { _id: productionOrderoutputId },
          { producedQuantity: producedQuantity },
          { productionCompletionDate: productionCompletionDate },
          { qualityCheckStatus: qualityCheckStatus },
          { storageLocationforOutput: storageLocationforOutput },
          { batchNumberforOutput: batchNumberforOutput },
          { productionNotes: productionNotes },
          { Yield: Yield },
          { outputQualityRating: outputQualityRating },
          { outputHandlingInstructions: outputHandlingInstructions },
        ],
      });

    if (existing && !currentProductionOrderOutput) {
      return {
        status: 409,
        message: "Production order output already exists with the same details",
      };
    } else {
      const ProductionOrderOutputUpdate =
        await ProductionOrderCreationOutput.findByIdAndUpdate(
          productionOrderoutputId,
          {
            producedQuantity,
            productionCompletionDate,
            qualityCheckStatus,
            storageLocationforOutput,
            batchNumberforOutput,
            productionNotes,
            Yield,
            outputQualityRating,
            outputHandlingInstructions,
          },
          {
            new: true,
            runValidators: true,
          }
        );
    }

    return {
      status: 201,
      message: "Production Order output  Edited Successfully",
      token: "sampleToken",
    };
  } catch (error) {
    console.log(
      "An error occured at editing Production Order output ",
      error.message
    );
    res.status(500).json({
      info: "An error occured in editing Production Order output  services",
    });
  }
};
productOrderCreationService.removeProductionOrderCreation = async (
  productionOrderId
) => {
  try {
    const productionOrderCreation =
      await ProductionOrderCreation.findByIdAndDelete(productionOrderId);

    if (!productionOrderCreation) {
      return {
        status: 201,
        message:
          "production order creation not found or can't able to delete right now,Please try again later",
        token: "sampleToken",
      };
    }
    if (productionOrderCreation) {
      return {
        status: 201,
        message: "production order creation deleted successfully",
        token: "sampleToken",
      };
    }
  } catch (error) {
    console.log(
      "An error occured at production order creation remove",
      error.message
    );
    res.status(500).json({
      info: "An error occured in productio order creation remove in current stock services",
    });
  }
};

productOrderCreationService.removeProductionOrderCreationOutput = async (
  productionOrderoutputId
) => {
  try {
    const productionOrderCreationOutput =
      await ProductionOrderCreationOutput.findByIdAndDelete(
        productionOrderoutputId
      );

    if (!productionOrderCreationOutput) {
      return {
        status: 201,
        message:
          "production order creation output not found or can't able to delete right now,Please try again later",
        token: "sampleToken",
      };
    }

    return {
      status: 201,
      message: "production order output creation deleted successfully",
      token: "sampleToken",
    };
  } catch (error) {
    console.log(
      "An error occured at production order creation output remove",
      error.message
    );
    res.status(500).json({
      info: "An error occured in productio order creation output remove in current stock services",
    });
  }
};

module.exports = productOrderCreationService;
