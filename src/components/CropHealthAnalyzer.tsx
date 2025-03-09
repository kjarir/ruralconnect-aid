
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Upload, AlertTriangle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeCropHealth, CropHealthPrediction } from '@/utils/cropHealthModel';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const CropHealthAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<CropHealthPrediction | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check if the file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file (JPG, PNG, etc.)",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset any previous analysis
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select an image of your crop to analyze",
        variant: "destructive"
      });
      return;
    }
    
    setAnalyzing(true);
    try {
      const prediction = await analyzeCropHealth(selectedImage);
      setResult(prediction);
      
      // Show toast with result
      const toastVariant = 
        prediction.condition === 'Healthy' ? 'default' :
        prediction.condition === 'Needs Attention' ? 'default' : 'destructive';
        
      toast({
        title: `Crop Analysis: ${prediction.condition}`,
        description: prediction.remedy || "Your crop is in good condition!",
        variant: toastVariant
      });
      
    } catch (error) {
      console.error("Error analyzing crop health:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your crop image",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const getResultBadge = () => {
    if (!result) return null;
    
    let badgeColor = "";
    let icon = null;
    
    switch (result.condition) {
      case 'Healthy':
        badgeColor = "bg-green-100 hover:bg-green-100 text-green-800";
        icon = <CheckCircle className="h-3 w-3 mr-1" />;
        break;
      case 'Needs Attention':
        badgeColor = "bg-yellow-100 hover:bg-yellow-100 text-yellow-800";
        icon = <AlertTriangle className="h-3 w-3 mr-1" />;
        break;
      case 'Disease Detected':
        badgeColor = "bg-red-100 hover:bg-red-100 text-red-800";
        icon = <AlertCircle className="h-3 w-3 mr-1" />;
        break;
    }
    
    return (
      <Badge className={`flex items-center ${badgeColor}`}>
        {icon}
        {result.condition} ({Math.round(result.confidence * 100)}%)
      </Badge>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          Crop Health Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <motion.div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageSelection}
            />
            
            {imagePreview ? (
              <div className="space-y-3">
                <img 
                  src={imagePreview} 
                  alt="Crop preview" 
                  className="max-h-48 mx-auto rounded-lg object-contain"
                />
                <div className="text-sm text-muted-foreground">
                  Click to change image
                </div>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-gray-400" />
                <div className="text-sm font-medium">Upload crop image for analysis</div>
                <div className="text-xs text-muted-foreground">
                  Click to browse or drag and drop
                </div>
              </div>
            )}
          </motion.div>
          
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 p-4 rounded-lg space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Analysis Result</h3>
                {getResultBadge()}
              </div>
              
              {result.remedy && (
                <div className="text-sm border-l-2 border-primary pl-3 mt-2">
                  <div className="font-medium mb-1">Recommendation:</div>
                  <div className="text-muted-foreground">{result.remedy}</div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t">
        <Button 
          className="w-full gap-2" 
          onClick={handleAnalyze}
          disabled={!selectedImage || analyzing}
        >
          {analyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Leaf className="h-4 w-4" />
              Analyze Crop Health
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CropHealthAnalyzer;
