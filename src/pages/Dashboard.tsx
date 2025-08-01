import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RiskBadge from "@/components/RiskBadge";
import { 
  FileText, 
  Upload, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-legal.jpg";

const Dashboard = () => {
  // Mock data for demo
  const stats = {
    totalDocuments: 24,
    clausesAnalyzed: 186,
    highRiskClauses: 7,
    documentsThisWeek: 5,
  };

  const recentDocuments = [
    {
      id: 1,
      name: "Master Service Agreement - TechCorp",
      uploadDate: "2024-01-15",
      clauses: 12,
      riskLevel: "medium" as const,
      riskScore: 65,
    },
    {
      id: 2,
      name: "Software License Agreement",
      uploadDate: "2024-01-14",
      clauses: 8,
      riskLevel: "low" as const,
      riskScore: 25,
    },
    {
      id: 3,
      name: "Employment Contract - Senior Dev",
      uploadDate: "2024-01-13",
      clauses: 15,
      riskLevel: "high" as const,
      riskScore: 85,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-soft to-primary-lighter">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  AI-Powered Legal Analysis
                </Badge>
                <h1 className="text-5xl font-bold leading-tight">
                  Analyze Legal Documents with
                  <span className="block text-primary-foreground/90">AI Precision</span>
                </h1>
                <p className="text-xl text-white/90">
                  Upload contracts, extract clauses, assess risks, and get intelligent insights 
                  powered by IBM Watson NLU and Granite AI.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/upload">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Document
                  </Button>
                </Link>
                <Link to="/assistant">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Try AI Assistant
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src={heroImage} 
                alt="Legal Document Analysis" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalDocuments}</p>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.clausesAnalyzed}</p>
                  <p className="text-sm text-muted-foreground">Clauses Analyzed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-risk-high/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-risk-high" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.highRiskClauses}</p>
                  <p className="text-sm text-muted-foreground">High Risk Clauses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-risk-safe/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-risk-safe" />
                </div>
                <div>
                  <p className="text-2xl font-bold">+{stats.documentsThisWeek}</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Documents
              <Link to="/upload">
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {doc.clauses} clauses • Uploaded {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RiskBadge level={doc.riskLevel} score={doc.riskScore} />
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;