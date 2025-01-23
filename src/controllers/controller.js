import { Component } from "../models/component.model.js";
import mongoose from "mongoose";

export const createComponent = async (req, res) => {
  try {
    const {
      Brand,
      Model,
      AccelSec,
      TopSpeed_KmH,
      Range_Km,
      Efficiency_WhKm,
      FastCharge_KmH,
      RapidCharge,
      PowerTrain,
      PlugType,
      BodyStyle,
      Segment,
      Seats,
      PriceEuro,
      Date,
    } = req.body;

    const newComponent = new Component({
      Brand,
      Model,
      AccelSec,
      TopSpeed_KmH,
      Range_Km,
      Efficiency_WhKm,
      FastCharge_KmH,
      RapidCharge,
      PowerTrain,
      PlugType,
      BodyStyle,
      Segment,
      Seats,
      PriceEuro,
      Date,
    });

    const savedComponent = await newComponent.save();

    return res.status(201).json({
      success: true,
      message: "Component created successfully",
      data: savedComponent,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllComponents = async (req, res) => {
  try {
    // Fetch all documents from the collection
    const components = await Component.find();

    // Return the result
    return res.status(200).json({
      success: true,
      message: "Components retrieved successfully.",
      data: components,
    });
  } catch (error) {
    console.error("Error retrieving components:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getComponent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID parameter." });
    }

    const component = await Component.findById(id);

    if (!component) {
      return res.status(404).json({ error: "Component not found." });
    }

    return res.json(component);
  } catch (error) {
    console.error("Error fetching component:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteComponent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID parameter." });
    }

    const deletedComponent = await Component.findByIdAndDelete(id);

    if (!deletedComponent) {
      return res.status(404).json({ error: "Component not found." });
    }

    return res.json({
      success: true,
      message: "Component deleted successfully.",
      data: deletedComponent,
    });
  } catch (error) {
    console.error("Error deleting component:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const searchComponents = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required." });
    }

    const searchResults = await Component.find({
      $or: [
        { Brand: { $regex: query, $options: "i" } },
        { Model: { $regex: query, $options: "i" } },
        { BodyStyle: { $regex: query, $options: "i" } },
      ],
    });

    return res.json(searchResults);
  } catch (error) {
    console.error("Error searching components:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const filterComponent = async (req, res) => {
  try {
    const { column, criteria, value } = req.body;

    if (!column || !criteria) {
      return res
        .status(400)
        .json({ error: "Column and criteria are required." });
    }

    let filterQuery = {};
    switch (criteria) {
      case "contains":
        filterQuery[column] = { $regex: value, $options: "i" };
        break;
      case "equals":
        filterQuery[column] = value;
        break;
      case "starts with":
        filterQuery[column] = { $regex: `^${value}`, $options: "i" };
        break;
      case "ends with":
        filterQuery[column] = { $regex: `${value}$`, $options: "i" };
        break;
      case "is empty":
        filterQuery[column] = { $in: [null, ""] };
        break;
      default:
        return res.status(400).json({ error: "Invalid criteria specified." });
    }

    const filteredResults = await Component.find(filterQuery);

    return res.json(filteredResults);
  } catch (error) {
    console.error("Error filtering components:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
