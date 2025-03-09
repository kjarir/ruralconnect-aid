"use client";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // Enable WebGL backend for better performance

export interface CropHealthPrediction {
  condition: "Healthy" | "Needs Attention" | "Disease Detected";
  confidence: number;
  remedy?: string;
}

export interface CropDisease {
  name: string;
  remedy: string;
}

// Mapping predicted class indices to disease names and remedies
const cropDiseases: CropDisease[] = [
  { name: "Healthy", remedy: "No action needed. Maintain proper care." },
  { name: "Early Blight", remedy: "Apply fungicides like Mancozeb. Avoid overhead watering." },
  { name: "Late Blight", remedy: "Use copper-based fungicides. Remove infected leaves immediately." },
  { name: "Powdery Mildew", remedy: "Apply sulfur-based fungicides. Ensure proper air circulation." },
  { name: "Leaf Spot", remedy: "Use neem oil spray. Remove and destroy affected leaves." }
];

export const loadModel = async (): Promise<tf.GraphModel> => {
  try {
    console.log("Loading EfficientNet model...");
    const model = await tf.loadGraphModel("https://tfhub.dev/google/efficientnet/lite0/classification/1/default/1", { fromTFHub: true });
    console.log("Model loaded successfully.");
    return model;
  } catch (error) {
    console.error("Error loading model:", error);
    throw new Error("Failed to load model");
  }
};



export const preprocessImage = async (imageFile: File): Promise<tf.Tensor> => {
  const img = await tf.browser.fromPixels(await createImageBitmap(imageFile));
  const resized = tf.image.resizeBilinear(img, [224, 224]);
  const normalized = resized.div(255.0).expandDims(0);
  return normalized;
};

export const analyzeCropHealth = async (imageFile: File): Promise<CropHealthPrediction> => {
  try {
    const model = await loadModel();
    const tensor = await preprocessImage(imageFile);
    
    // Make a prediction
    const predictions = model.predict(tensor) as tf.Tensor;
    const predictionArray = await predictions.data();
    const maxIndex = predictionArray.indexOf(Math.max(...predictionArray));

    // Get predicted disease and remedy
    const disease = cropDiseases[maxIndex] || { name: "Unknown", remedy: "Consult an expert." };

    return {
      condition: disease.name === "Healthy" ? "Healthy" : "Disease Detected",
      confidence: Math.max(...predictionArray),
      remedy: disease.remedy
    };
  } catch (error) {
    console.error("Error in analysis:", error);
    throw new Error("Failed to analyze crop health");
  }
};
