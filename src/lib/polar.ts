import { Polar } from '@polar-sh/sdk';

export const polarClient = new Polar({
    apiKey: process.env.POLAR_ACCESS_TOKEN,
    server: 'sandbox',
});