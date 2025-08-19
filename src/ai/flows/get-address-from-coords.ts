'use server';
/**
 * @fileOverview Converts latitude and longitude coordinates into a human-readable address.
 *
 * - getAddressFromCoords - A function that takes coordinates and returns an address.
 * - GetAddressFromCoordsInput - The input type for the getAddressFromCoords function.
 * - GetAddressFromCoordsOutput - The return type for the getAddressFromCoords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import fetch from 'node-fetch';

const GetAddressFromCoordsInputSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
});
export type GetAddressFromCoordsInput = z.infer<typeof GetAddressFromCoordsInputSchema>;

const GetAddressFromCoordsOutputSchema = z.object({
    address: z.string().describe('The human-readable street address.'),
});
export type GetAddressFromCoordsOutput = z.infer<typeof GetAddressFromCoordsOutputSchema>;

const getAddressTool = ai.defineTool(
    {
        name: 'getAddressFromCoordinates',
        description: 'Get the human-readable address from latitude and longitude coordinates using a third-party geocoding service.',
        inputSchema: GetAddressFromCoordsInputSchema,
        outputSchema: z.object({
            display_name: z.string()
        }),
    },
    async ({ latitude, longitude }) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
            headers: {
                'User-Agent': 'SwiftRoute Ride-Sharing App'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch address: ${response.statusText}`);
        }
        return await response.json() as any;
    }
);


const getAddressFromCoordsFlow = ai.defineFlow(
  {
    name: 'getAddressFromCoordsFlow',
    inputSchema: GetAddressFromCoordsInputSchema,
    outputSchema: GetAddressFromCoordsOutputSchema,
  },
  async (input) => {
    const toolResult = await getAddressTool(input);
    return { address: toolResult.display_name };
  }
);

export async function getAddressFromCoords(input: GetAddressFromCoordsInput): Promise<GetAddressFromCoordsOutput> {
    return getAddressFromCoordsFlow(input);
}
