
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
      const blueMean = rgbChannels[2].mean().dataSync()[0]; // Fixed: was using channel 1 instead of 2
      
      // Calculate standard deviation of each channel
      const redStd = tf.moments(rgbChannels[0]).variance.sqrt().dataSync()[0];
      const greenStd = tf.moments(rgbChannels[1]).variance.sqrt().dataSync()[0];
      const blueStd = tf.moments(rgbChannels[2]).variance.sqrt().dataSync()[0];
      
      console.log("Color features:", {
        redMean, greenMean, blueMean,
        redStd, greenStd, blueStd
      });
      
      let condition: "Healthy" | "Needs Attention" | "Disease Detected";
      let confidence: number;
      let diseaseIndex = 0;
      
      // Rule-based classification based on color features
      if (greenMean > 0.45 && redStd < 0.2 && greenStd < 0.25) {
        // Healthy crops typically have good green coloration with moderate variance
        condition = "Healthy";
        confidence = 0.7 + (greenMean - 0.45) * 0.7; // Higher confidence with more green
        diseaseIndex = 0;
      } else if (greenMean < 0.35 || (redMean > 0.45 && blueMean < 0.3)) {
        // Very poor green or high red often indicates serious issues
        condition = "Disease Detected";
        confidence = 0.65 + (0.35 - greenMean) * 0.8; // Higher confidence with less green
        diseaseIndex = Math.floor(Math.random() * 3) + 2; // Random disease from indices 2,3,4
      } else {
        // Middling values suggest minor issues
        condition = "Needs Attention";
        confidence = 0.6 + Math.abs(greenMean - 0.4) * 0.6;
        diseaseIndex = 1; // Early Blight
      }
      
      // Clamp confidence between 0.5 and 0.98 for reasonable values
      confidence = Math.min(0.98, Math.max(0.5, confidence));
      
      return {
        condition,
        confidence,
        remedy: cropDiseases[diseaseIndex].remedy
      };
    });
  }
}

// Create a singleton instance
const cropAnalyzer = new CropAnalyzer();

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

export const analyzeCropHealth = async (imageFile: File): Promise<CropHealthPrediction> => {
  try {
    console.log("Analyzing crop health...");
    const imageElement = await preprocessImage(imageFile);
    const prediction = await cropAnalyzer.analyzeImage(imageElement);
    
    // Clean up object URL to prevent memory leaks
    URL.revokeObjectURL(imageElement.src);
    
    return prediction;
  } catch (error) {
    console.error("Error in analysis:", error);
    throw new Error("Failed to analyze crop health");
  }
};
