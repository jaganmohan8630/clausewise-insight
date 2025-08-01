import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Clock, CheckCircle } from "lucide-react";

interface RiskBadgeProps {
  level: "high" | "medium" | "low" | "safe";
  score?: number;
  showIcon?: boolean;
  className?: string;
}

const RiskBadge = ({ level, score, showIcon = true, className }: RiskBadgeProps) => {
  const getRiskConfig = (level: string) => {
    switch (level) {
      case "high":
        return {
          label: "High Risk",
          icon: AlertTriangle,
          className: "bg-risk-high/10 text-risk-high border-risk-high/20 hover:bg-risk-high/20",
        };
      case "medium":
        return {
          label: "Medium Risk",
          icon: Clock,
          className: "bg-risk-medium/10 text-risk-medium border-risk-medium/20 hover:bg-risk-medium/20",
        };
      case "low":
        return {
          label: "Low Risk",
          icon: Shield,
          className: "bg-risk-low/10 text-risk-low border-risk-low/20 hover:bg-risk-low/20",
        };
      case "safe":
        return {
          label: "Safe",
          icon: CheckCircle,
          className: "bg-risk-safe/10 text-risk-safe border-risk-safe/20 hover:bg-risk-safe/20",
        };
      default:
        return {
          label: "Unknown",
          icon: Shield,
          className: "bg-muted text-muted-foreground",
        };
    }
  };

  const config = getRiskConfig(level);
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`${config.className} ${className}`}>
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {config.label}
      {score && <span className="ml-1 font-mono text-xs">({score}%)</span>}
    </Badge>
  );
};

export default RiskBadge;