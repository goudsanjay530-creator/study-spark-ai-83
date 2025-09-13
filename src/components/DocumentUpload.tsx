import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import documentIcon from "@/assets/document-icon.png";

const DocumentUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type.includes('pdf') || 
      file.type.includes('text') || 
      file.type.includes('document')
    );

    if (validFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, text, or document files.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setUploadedFiles(prev => [...prev, ...validFiles]);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Documents processed",
        description: `${validFiles.length} document(s) uploaded successfully.`,
      });
    }, 2000);
  };

  return (
    <section id="documents" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <img src={documentIcon} alt="Document processing" className="w-10 h-10" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Upload Your Study Materials
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload PDFs, documents, and notes. Our AI will analyze and process them 
            to create personalized assessments and study plans.
          </p>
        </div>

        <Card className="p-8">
          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/5 scale-105"
                : "border-border hover:border-primary/50 hover:bg-accent/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Drop your files here
                </h3>
                <p className="text-muted-foreground mb-4">
                  Support for PDF, DOC, DOCX, TXT files up to 10MB
                </p>
                
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="study" size="lg" className="cursor-pointer">
                    Choose Files
                  </Button>
                </label>
              </div>
            </div>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-8 space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                Uploaded Documents ({uploadedFiles.length})
              </h4>
              
              <div className="grid gap-3">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-accent/50 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {isProcessing ? (
                        <AlertCircle className="h-5 w-5 text-warning animate-pulse" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-success" />
                      )}
                      <span className="text-sm font-medium text-muted-foreground">
                        {isProcessing ? "Processing..." : "Ready"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {uploadedFiles.length > 0 && !isProcessing && (
                <Button variant="hero" className="w-full" size="lg">
                  Generate Study Materials
                </Button>
              )}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default DocumentUpload;