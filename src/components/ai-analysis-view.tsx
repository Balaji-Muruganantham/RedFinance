'use client';

import type { AnalyzePortfolioOutput } from "@/ai/flows/portfolio-insights";
import { BotMessageSquare, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Skeleton } from "./ui/skeleton";

type AiAnalysisViewProps = {
  analysis: AnalyzePortfolioOutput | null;
  isLoading: boolean;
  onRunAnalysis: () => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
};

const availableModels = [
    { value: 'googleai/gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
    { value: 'googleai/gemini-pro', label: 'Gemini Pro' },
    { value: 'googleai/gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
    { value: 'googleai/gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
];

export default function AiAnalysisView({ analysis, isLoading, onRunAnalysis, selectedModel, onModelChange }: AiAnalysisViewProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-primary/20 border-dashed">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
           <div className="p-3 rounded-full bg-primary/20 shrink-0">
             <BotMessageSquare className="h-6 w-6 text-primary" />
           </div>
          <div className="flex-grow">
            <CardTitle>AI-Powered Insights</CardTitle>
            <CardDescription className="mt-1">
              Let our AI analyze your portfolio for trends, risks, and opportunities.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="grid gap-2 w-full sm:w-auto">
              <Label htmlFor="model-select">Choose a Model</Label>
              <Select value={selectedModel} onValueChange={onModelChange} disabled={isLoading}>
                <SelectTrigger id="model-select" className="w-full sm:w-[240px]">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map(model => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={onRunAnalysis} disabled={isLoading} className="w-full sm:w-auto sm:self-end">
              {isLoading ? 'Analyzing...' : <> <Sparkles className="mr-2 h-4 w-4" /> Generate Analysis </>}
            </Button>
        </CardContent>
      </Card>

      {isLoading && <LoadingSkeleton />}
      
      {analysis && (
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in-50">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground whitespace-pre-wrap">
              {analysis.insights}
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Risk Factors</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground whitespace-pre-wrap">
              {analysis.riskFactors}
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground whitespace-pre-wrap">
              {analysis.opportunities}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
     <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
     <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </CardContent>
    </Card>
  </div>
);
