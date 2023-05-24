import axios from 'axios';

const testApiEndpoint = async (endpoint: string) => {
    const response = await axios.get(endpoint);
    return response.status;
};

describe('API Endpoint Tests', () => {
    const endpoints = [
        'https://623ca3ca7efb5abea684d5d3.mockapi.io/items',
        'https://623ca3ca7efb5abea684d5d3.mockapi.io/cart',
        'https://623ca3ca7efb5abea684d5d3.mockapi.io/orders',
        'https://623ca3ca7efb5abea684d5d3.mockapi.io/favorites',
    ];

    endpoints.forEach((endpoint) => {
        const endpointPath = endpoint.substring(endpoint.lastIndexOf('/') + 1);
        test(`Check response from server - ${endpointPath}`, async () => {
            const status = await testApiEndpoint(endpoint);
            console.log(`Response status - ${endpointPath}: ${status}`);
            expect(status).toBe(200);
        });
    });
});
