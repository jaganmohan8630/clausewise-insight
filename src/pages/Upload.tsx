import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FileUploader from "@/components/FileUploader";
import RiskBadge from "@/components/RiskBadge";
import { Badge } from "@/components/ui/badge";
import { Brain, FileText, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Clause {
  id: string;
  type: string;
  text: string;
  summary: string;
  riskLevel: "high" | "medium" | "low" | "safe";
  riskScore: number;
  confidence: number;
}

const Upload = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const { toast } = useToast();

  const mockClauses: Clause[] = [
    {
      id: "1",
      type: "Liability Limitation",
      text: "In no event shall the Company's total liability to Customer for any claims arising under or related to this Agreement exceed the total amount paid by Customer to Company in the twelve (12) months preceding the claim.",
      summary: "Limits company liability to amount paid by customer in previous 12 months.",
      riskLevel: "medium",
      riskScore: 65,
      confidence: 89,
    },
    {
      id: "2",
      type: "Termination Rights",
      text: "Either party may terminate this Agreement at any time, with or without cause, by providing thirty (30) days written notice to the other party.",
      summary: "Both parties can terminate with 30 days notice for any reason.",
      riskLevel: "high",
      riskScore: 85,
      confidence: 94,
    },
    {
      id: "3",
      type: "Intellectual Property",
      text: "Customer retains all rights, title, and interest in and to Customer Data. Company grants Customer a non-exclusive license to use the Software.",
      summary: "Customer keeps data rights, company provides software license.",
      riskLevel: "safe",
      riskScore: 15,
      confidence: 92,
    },
    {
      id: "4",
      type: "Payment Terms",
      text: "Payment is due within thirty (30) days of invoice date. Late payments are subject to a 1.5% monthly service charge.",
      summary: "30-day payment terms with 1.5% monthly late fee.",
      riskLevel: "low",
      riskScore: 25,
      confidence: 88,
    },
  ];

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const steps = [
      { progress: 20, message: "Extracting text from document..." },
      { progress: 40, message: "Identifying clause boundaries..." },
      { progress: 60, message: "Analyzing with IBM Watson NLU..." },
      { progress: 80, message: "Scoring risks with Granite AI..." },
      { progress: 100, message: "Analysis complete!" },
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnalysisProgress(step.progress);
      
      toast({
        title: "Analysis Progress",
        description: step.message,
      });
    }

    setClauses(mockClauses);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: `Successfully analyzed ${mockClauses.length} clauses from your document.`,
    });
  };

  const handleUploadComplete = (fileUrl: string, fileName: string) => {
    setUploadedFileName(fileName);
    // Auto-start analysis after upload
    setTimeout(() => {
      simulateAnalysis();
    }, 1000);
  };

  const getRiskStats = () => {
    const stats = clauses.reduce((acc, clause) => {
      acc[clause.riskLevel] = (acc[clause.riskLevel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return stats;
  };

  const riskStats = getRiskStats();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Document Analysis</h1>
            <p className="text-lg text-muted-foreground">
              Upload your legal document and let AI analyze clauses, assess risks, and provide insights
            </p>
          </div>

          {/* File Upload */}
          <FileUploader onUploadComplete={handleUploadComplete} />

          {/* Analysis Progress */}
          {isAnalyzing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary animate-pulse" />
                  <span>AI Analysis in Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Analyzing "{uploadedFileName}"</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Please wait while we extract and analyze clauses using IBM Watson NLU and Granite AI...
                </p>
              </CardContent>
            </Card>
          )}

          {/* Analysis Results */}
          {clauses.length > 0 && !isAnalyzing && (
            <>
              {/* Risk Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span>Analysis Complete</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{clauses.length}</p>
                      <p className="text-sm text-muted-foreground">Total Clauses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-risk-high">{riskStats.high || 0}</p>
                      <p className="text-sm text-muted-foreground">High Risk</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-risk-medium">{riskStats.medium || 0}</p>
                      <p className="text-sm text-muted-foreground">Medium Risk</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">{(riskStats.low || 0) + (riskStats.safe || 0)}</p>
                      <p className="text-sm text-muted-foreground">Low/Safe</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Extracted Clauses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Extracted Clauses</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {clauses.map((clause) => (
                      <AccordionItem key={clause.id} value={clause.id}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline">{clause.type}</Badge>
                              <span className="font-medium">{clause.summary}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RiskBadge level={clause.riskLevel} score={clause.riskScore} />
                              <Badge variant="outline" className="text-xs">
                                {clause.confidence}% confidence
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-4">
                            <div>
                              <h4 className="font-medium mb-2">Full Clause Text:</h4>
                              <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg leading-relaxed">
                                {clause.text}
                              </p>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Risk Analysis: {clause.riskLevel} risk level with {clause.riskScore}% score
                              </span>
                              <Badge variant="outline">
                                AI Confidence: {clause.confidence}%
                              </Badge>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button className="h-auto p-4 justify-start" variant="outline">
                      <div className="text-left">
                        <div className="font-medium">Compare Versions</div>
                        <div className="text-sm text-muted-foreground">
                          Upload another version to see changes
                        </div>
                      </div>
                    </Button>
                    <Button className="h-auto p-4 justify-start" variant="outline">
                      <div className="text-left">
                        <div className="font-medium">Ask AI Assistant</div>
                        <div className="text-sm text-muted-foreground">
                          Get insights about specific clauses
                        </div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;