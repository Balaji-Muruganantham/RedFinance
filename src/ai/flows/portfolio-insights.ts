// This is an AI-powered analysis of the user's portfolio, providing insights, trends, risks and opportunities.
// It contains the function analyzePortfolio, the input type AnalyzePortfolioInput and output type AnalyzePortfolioOutput.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePortfolioInputSchema = z.object({
  holdings: z.string().describe('A list of investment holdings with ticker symbols and quantities.'),
  transactionHistory: z.string().describe('A record of all transactions, including purchases and sales, with dates and amounts.'),
  assetAllocation: z.string().describe('The portfolio asset allocation across different investment types and sectors.'),
});
export type AnalyzePortfolioInput = z.infer<typeof AnalyzePortfolioInputSchema>;

const AnalyzePortfolioOutputSchema = z.object({
  insights: z.string().describe('Personalized insights and analysis of portfolio performance, highlighting key trends and opportunities.'),
  riskFactors: z.string().describe('Identified risk factors within the portfolio.'),
  opportunities: z.string().describe('Potential opportunities for portfolio improvement.'),
});
export type AnalyzePortfolioOutput = z.infer<typeof AnalyzePortfolioOutputSchema>;

export async function analyzePortfolio(input: AnalyzePortfolioInput): Promise<AnalyzePortfolioOutput> {
  return analyzePortfolioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePortfolioPrompt',
  input: {schema: AnalyzePortfolioInputSchema},
  output: {schema: AnalyzePortfolioOutputSchema},
  prompt: `You are a financial advisor providing insights on investment portfolios.

  Analyze the following portfolio data to identify key trends, risk factors, and potential opportunities for improvement.

  Holdings: {{{holdings}}}
  Transaction History: {{{transactionHistory}}}
  Asset Allocation: {{{assetAllocation}}}

  Provide personalized insights and analysis of the portfolio's performance, risk factors, and potential opportunities.
  `, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const analyzePortfolioFlow = ai.defineFlow(
  {
    name: 'analyzePortfolioFlow',
    inputSchema: AnalyzePortfolioInputSchema,
    outputSchema: AnalyzePortfolioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
