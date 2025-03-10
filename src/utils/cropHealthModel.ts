
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

export class CropAnalyzer {
  model: tf.LayersModel | null = null;

  async loadModel() {
    if (!this.model) {
      try {
        console.log("Loading VGG model...");
        this.model = await tf.loadLayersModel("/model/model.json");
        console.log("✅ Model loaded successfully!");
      } catch (error) {
        console.error("Error loading model:", error);
        throw new Error("Failed to load crop analysis model");
      }
    }
    return this.model;
  }

  async predict(imageElement: HTMLImageElement) {
    if (!this.model) {
      await this.loadModel();
    }

    // Preprocess the image
    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(255.0)
      .expandDims();

    // Make prediction
    const predictions = this.model!.predict(tensor) as tf.Tensor;
    const values = await predictions.data();
    
    // Cleanup to prevent memory leaks
    tensor.dispose();
    predictions.dispose();
    
    return this.interpretResults(Array.from(values));
  }

  interpretResults(values: number[]) {
    const labels = ["Healthy", "Needs Attention", "Disease Detected"];
    const maxIndex = values.indexOf(Math.max(...values));
    const condition = labels[maxIndex] as "Healthy" | "Needs Attention" | "Disease Detected";
    const confidence = values[maxIndex];
    
    // Get remedy based on condition
    const disease = cropDiseases.find(d => 
      (condition === "Healthy" && d.name === "Healthy") ||
      (condition === "Disease Detected" && d.name !== "Healthy") ||
      (condition === "Needs Attention" && d.name !== "Healthy")
    ) || cropDiseases[0];
    
    return {
      condition,
      confidence,
      remedy: disease.remedy
    };
  }
}

// Create a singleton instance
const cropAnalyzer = new CropAnalyzer();

export const loadModel = async (): Promise<tf.LayersModel> => {
  return cropAnalyzer.loadModel();
};

export const preprocessImage = async (imageFile: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(imageFile);
  });
};

export const analyzeCropHealth = async (imageFile: File): Promise<CropHealthPrediction> => {
  try {
    const imageElement = await preprocessImage(imageFile);
    return cropAnalyzer.predict(imageElement);
  } catch (error) {
    console.error("Error in analysis:", error);
    throw new Error("Failed to analyze crop health");
  }
};
