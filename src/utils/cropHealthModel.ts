"use client";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // Enable WebGL backend for better performance
import * as mobilenet from "@tensorflow-models/mobilenet"; // Import MobileNet

export interface CropHealthPrediction {
  condition: "Healthy" | "Needs Attention" | "Disease Detected";
  confidence: number;
  remedy?: string;
  diseaseName?: string;
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
  { name: "Leaf Spot", remedy: "Use neem oil spray. Remove and destroy affected leaves." },
  { name: "Nutrient Deficiency", remedy: "Apply balanced fertilizer with micronutrients. Test soil pH." },
  { name: "Pest Infestation", remedy: "Use neem oil or appropriate insecticide. Introduce beneficial insects." }
];

// Load MobileNet Model for Crop Detection
let mobileNetModel: mobilenet.MobileNet | null = null;
const loadMobileNet = async () => {
  if (!mobileNetModel) {
    mobileNetModel = await mobilenet.load();
    console.log("✅ MobileNet model loaded successfully");
  }
};

// Function to check if the image contains a crop
const cropKeywords = [
  "plant", "leaf", "tree", "flower", "vegetation", "crop", 
  "corn", "wheat", "hay", "ear", "spike", "capitulum", "grass"
];

const isCropImage = async (imageElement: HTMLImageElement): Promise<boolean> => {
  await loadMobileNet();
  const predictions = await mobileNetModel?.classify(imageElement);
  console.log("🔍 MobileNet Predictions:", predictions);

  // Check if any prediction matches the updated crop keywords list
  return predictions?.some((p) => cropKeywords.some((kw) => p.className.toLowerCase().includes(kw))) || false;
};


// Feature extraction model for crop analysis
class CropAnalyzer {
  async analyzeImage(imageElement: HTMLImageElement): Promise<CropHealthPrediction> {
    return tf.tidy(() => {
      // Convert image to tensor
      const tensor = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(255.0);
      
      // Extract image features (color statistics)
      const rgbChannels = tf.split(tensor, 3, 2); // Split into R,G,B channels
      
      // Calculate mean of each channel
      const redMean = rgbChannels[0].mean().dataSync()[0];
      const greenMean = rgbChannels[1].mean().dataSync()[0];
      const blueMean = rgbChannels[2].mean().dataSync()[0];
      
      // Calculate standard deviation of each channel
      const redStd = tf.moments(rgbChannels[0]).variance.sqrt().dataSync()[0];
      const greenStd = tf.moments(rgbChannels[1]).variance.sqrt().dataSync()[0];
      const blueStd = tf.moments(rgbChannels[2]).variance.sqrt().dataSync()[0];

      let condition: "Healthy" | "Needs Attention" | "Disease Detected";
      let confidence: number;
      let diseaseIndex: number;

      // Basic classification based on color features
      if (greenMean > 0.5 && redStd < 0.2) {
        condition = "Healthy";
        confidence = 0.85;
        diseaseIndex = 0;
      } else if (redMean > 0.55 && greenMean < 0.4) {
        condition = "Disease Detected";
        confidence = 0.75;
        diseaseIndex = 2; // Late Blight
      } else {
        condition = "Needs Attention";
        confidence = 0.65;
        diseaseIndex = Math.floor(Math.random() * 4) + 1;
      }

      console.log("✅ Crop health analysis:", {
        condition,
        confidence,
        remedy: cropDiseases[diseaseIndex].remedy,
        diseaseName: cropDiseases[diseaseIndex].name
      });

      return {
        condition,
        confidence,
        remedy: cropDiseases[diseaseIndex].remedy,
        diseaseName: cropDiseases[diseaseIndex].name
      };
    });
  }
}

// Create a singleton instance
const cropAnalyzer = new CropAnalyzer();

// Preprocess the image
export const preprocessImage = async (imageFile: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => {
      console.error("Error loading image:", e);
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(imageFile);
  });
};

// **Main Function to Analyze Crop Health**
export const analyzeCropHealth = async (imageFile: File): Promise<CropHealthPrediction> => {
  try {
    console.log("🔍 Analyzing crop health...");
    const imageElement = await preprocessImage(imageFile);

    // First, check if it's a crop image using MobileNet
    const isCrop = await isCropImage(imageElement);
    if (!isCrop) {
      console.warn("❌ No crop detected. Please upload a valid crop image.");
      throw new Error("No crop detected. Please upload a valid plant image.");
    }

    // If it's a crop, proceed to disease detection
    const prediction = await cropAnalyzer.analyzeImage(imageElement);
    
    // Clean up object URL to prevent memory leaks
    URL.revokeObjectURL(imageElement.src);

    console.log("✅ Final Analysis:", prediction);
    return prediction;
  } catch (error) {
    console.error("🚨 Error in analysis:", error);
    throw new Error(error.message || "Failed to analyze crop health");
  }
};
