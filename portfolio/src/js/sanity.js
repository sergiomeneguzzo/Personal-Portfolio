import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: '1ces81nc',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: true,
});
