'use server';
/**
 * @fileOverview Estimates the fare for a ride based on the pickup and dropoff locations.
 *
 * - estimateFare - A function that estimates the fare for a ride.
 * - EstimateFareInput - The input type for the estimateFare function.
 * - EstimateFareOutput - The return type for the estimateFare function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateFareInputSchema = z.object({
  pickupLocation: z
    .string()
    .describe('The latitude and longitude of the pickup location.'),
  dropoffLocation: z
    .string()
    .describe('The latitude and longitude of the dropoff location.'),
});
export type EstimateFareInput = z.infer<typeof EstimateFareInputSchema>;

const EstimateFareOutputSchema = z.object({
  estimatedFare: z
    .number()
    .describe('The estimated fare for the ride in US dollars.'),
});
export type EstimateFareOutput = z.infer<typeof EstimateFareOutputSchema>;

export async function estimateFare(input: EstimateFareInput): Promise<EstimateFareOutput> {
  return estimateFareFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateFarePrompt',
  input: {schema: EstimateFareInputSchema},
  output: {schema: EstimateFareOutputSchema},
  prompt: `You are an expert fare estimator for a ride-sharing app.

  Given the pickup and dropoff locations, estimate the fare for the ride in US dollars.
  Take into account distance, time, and real-time traffic data.

  Pickup Location: {{{pickupLocation}}}
  Dropoff Location: {{{dropoffLocation}}}

  Estimated Fare:`,
});

const estimateFareFlow = ai.defineFlow(
  {
    name: 'estimateFareFlow',
    inputSchema: EstimateFareInputSchema,
    outputSchema: EstimateFareOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
