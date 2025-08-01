import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FileUploader from "@/components/FileUploader";
import { GitCompare, FileText, ArrowRight, Plus, Minus, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ComparisonResult {
  clauseType: string;
  changeType: "added" | "removed" | "modified" | "unchanged";
  originalText?: string;
  newText?: string;
  summary: string;
}

const Compare = () => {
  const [originalFile, setOriginalFile] = useState<string>("");
  const [newFile, setNewFile] = useState<string>("");
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);
  const { toast } = useToast();

  const mockComparisonResults: ComparisonResult[] = [
    {
      clauseType: "Payment Terms",
      changeType: "modified",
      originalText: "Payment is due within thirty (30) days of invoice date.",
      newText: "Payment is due within fifteen (15) days of invoice date. Late payments incur a 2% monthly fee.",
      summary: "Payment period reduced from 30 to 15 days, late fee increased to 2%",
    },
    {
      clauseType: "Liability Limitation",
      changeType: "added",
      newText: "Company's liability is limited to direct damages only and excludes consequential damages.",
      summary: "New liability limitation clause added excluding consequential damages",
    },
    {
      clauseType: "Termination Notice",
      changeType: "removed",
      originalText: "Either party may terminate with 90 days written notice.",
      summary: "90-day termination notice requirement removed",
    },
    {
      clauseType: "Intellectual Property",
      changeType: "unchanged",
      originalText: "Customer retains all rights to Customer Data.",
      newText: "Customer retains all rights to Customer Data.",
      summary: "No changes to intellectual property clause",
    },
  ];

  const simulateComparison = async () => {
    setIsComparing(true);
    
    // Simulate comparison process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setComparisonResults(mockComparisonResults);
    setIsComparing(false);
    
    toast({
      title: "Comparison Complete",
      description: `Found ${mockComparisonResults.length} clauses to compare between versions.`,
    });
  };

  const handleOriginalUpload = (fileUrl: string, fileName: string) => {
    setOriginalFile(fileName);
  };

  const handleNewUpload = (fileUrl: string, fileName: string) => {
    setNewFile(fileName);
  };

  const runComparison = () => {
    if (!originalFile || !newFile) {
      toast({
        title: "Missing Files",
        description: "Please upload both versions of the document to compare.",
        variant: "destructive",
      });
      return;
    }
    simulateComparison();
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case "added":
        return <Plus className="w-4 h-4 text-accent" />;
      case "removed":
        return <Minus className="w-4 h-4 text-destructive" />;
      case "modified":
        return <RotateCcw className="w-4 h-4 text-risk-medium" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getChangeBadge = (changeType: string) => {
    const configs = {
      added: { label: "Added", className: "bg-accent/10 text-accent border-accent/20" },
      removed: { label: "Removed", className: "bg-destructive/10 text-destructive border-destructive/20" },
      modified: { label: "Modified", className: "bg-risk-medium/10 text-risk-medium border-risk-medium/20" },
      unchanged: { label: "Unchanged", className: "bg-muted text-muted-foreground" },
    };
    
    const config = configs[changeType as keyof typeof configs] || configs.unchanged;
    
    return (
      <Badge variant="outline" className={config.className}>
        {getChangeIcon(changeType)}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  const getChangeStats = () => {
    return comparisonResults.reduce((acc, result) => {
      acc[result.changeType] = (acc[result.changeType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const changeStats = getChangeStats();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Document Comparison</h1>
            <p className="text-lg text-muted-foreground">
              Compare two versions of a contract to identify changes, additions, and deletions
            </p>
          </div>

          {/* File Upload Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Original Version</h3>
              <FileUploader onUploadComplete={handleOriginalUpload} />
              {originalFile && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>Uploaded: {originalFile}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">New Version</h3>
              <FileUploader onUploadComplete={handleNewUpload} />
              {newFile && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>Uploaded: {newFile}</span>
                </div>
              )}
            </div>
          </div>

          {/* Compare Button */}
          {originalFile && newFile && !isComparing && comparisonResults.length === 0 && (
            <div className="text-center">
              <Button size="lg" onClick={runComparison} className="bg-gradient-to-r from-primary to-primary-soft">
                <GitCompare className="w-5 h-5 mr-2" />
                Compare Documents
              </Button>
            </div>
          )}

          {/* Comparison Progress */}
          {isComparing && (
            <Card>
              <CardContent className="p-8 text-center">
                <GitCompare className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-medium mb-2">Analyzing Differences</h3>
                <p className="text-muted-foreground">
                  Comparing clauses between versions using AI-powered semantic analysis...
                </p>
              </CardContent>
            </Card>
          )}

          {/* Comparison Results */}
          {comparisonResults.length > 0 && !isComparing && (
            <>
              {/* Summary Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GitCompare className="w-5 h-5" />
                    <span>Comparison Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">{changeStats.added || 0}</p>
                      <p className="text-sm text-muted-foreground">Added</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-destructive">{changeStats.removed || 0}</p>
                      <p className="text-sm text-muted-foreground">Removed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-risk-medium">{changeStats.modified || 0}</p>
                      <p className="text-sm text-muted-foreground">Modified</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-muted-foreground">{changeStats.unchanged || 0}</p>
                      <p className="text-sm text-muted-foreground">Unchanged</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Changes */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {comparisonResults.map((result, index) => (
                      <div key={index} className="border border-border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline">{result.clauseType}</Badge>
                            {getChangeBadge(result.changeType)}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{result.summary}</p>
                        
                        {result.changeType === "modified" && (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2 text-destructive">Original</h4>
                              <div className="bg-destructive/5 border border-destructive/20 rounded p-3 text-sm">
                                {result.originalText}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2 text-accent">New</h4>
                              <div className="bg-accent/5 border border-accent/20 rounded p-3 text-sm">
                                {result.newText}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {result.changeType === "added" && (
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-accent">Added Clause</h4>
                            <div className="bg-accent/5 border border-accent/20 rounded p-3 text-sm">
                              {result.newText}
                            </div>
                          </div>
                        )}
                        
                        {result.changeType === "removed" && (
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-destructive">Removed Clause</h4>
                            <div className="bg-destructive/5 border border-destructive/20 rounded p-3 text-sm">
                              {result.originalText}
                            </div>
                          </div>
                        )}
                        
                        {result.changeType === "unchanged" && (
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Unchanged</h4>
                            <div className="bg-muted/50 border border-border rounded p-3 text-sm">
                              {result.originalText}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Export Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline">
                      Export as PDF Report
                    </Button>
                    <Button variant="outline">
                      Generate Redline Document
                    </Button>
                    <Button variant="outline">
                      Save Comparison
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

export default Compare;