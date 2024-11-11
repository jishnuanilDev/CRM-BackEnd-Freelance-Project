const express = require("express");

const qualityCheckService = require("../../services/adminServices/qualityCheckService");

let qualityCheckController = {};

qualityCheckController.fetchQualityCheck = async (req, res) => {
  try {
    console.log("loading quality checks...");

    const result = await qualityCheckService.fetchQualityCheck();

    res.status(result.status).json({
      message: result.message,
      data: result.data,
      userToken: "",
    });
  } catch (error) {
    console.log(
      "An error occurred while fetching quality checks in admin controller:",
      error.message
    );
    res.status(500).json({ info: "An error occurred in server" });
  }
};
qualityCheckController.newQualityCheck = async (req, res) => {
  try {
    console.log("Adding new quality check ");

    const {
      batchNumber,
      productName,
      inspectionDate,
      inspectorName,
      qualityStatus,
      comments,
    } = req.body;

    const result = await qualityCheckService.newQualityCheck({
      batchNumber,
      productName,
      inspectionDate,
      inspectorName,
      qualityStatus,
      comments,
    });

    res.status(result.status).json({
      message: result.message,
      data: result.data,
      userToken: result.token,
    });
  } catch (error) {
    console.log(
      "An error occurred while adding quality checks in admin controller:",
      error.message
    );
    res.status(500).json({ info: "An error occurred in Server" });
  }
};


qualityCheckController.editQualityCheck = async (req, res) => {
    try {
      console.log("editing quality check..");
  
      const {
        authPassword,
        qualityCheckId,
        batchNumber,
        productName,
        inspectionDate,
        inspectorName,
        qualityStatus,
        comments,
      } = req.body;
  

      const result = await qualityCheckService.editQualityCheck({
        authPassword,
        qualityCheckId,
        batchNumber,
        productName,
        inspectionDate,
        inspectorName,
        qualityStatus,
        comments,
      });
  
      res.status(result.status).json({
        message: result.message,
        data: result.data,
        userToken: result.token,
      });
    } catch (error) {
      console.log(
        "An error occurred while adding editing Current Stock in admin controller:",
        error.message
      );
      res.status(500).json({ info: "An error occurred" });
    }
  };

module.exports = qualityCheckController;
