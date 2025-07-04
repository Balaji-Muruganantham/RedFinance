'use server';

import { analyzePortfolio, AnalyzePortfolioInput, AnalyzePortfolioOutput } from '@/ai/flows/portfolio-insights';

export async function getPortfolioAnalysis(input: AnalyzePortfolioInput): Promise<AnalyzePortfolioOutput> {
  try {
    const result = await analyzePortfolio(input);
    return result;
  } catch (error) {
    console.error("Error getting portfolio analysis:", error);
    throw new Error("Failed to get AI portfolio analysis. Please try again.");
  }
}
