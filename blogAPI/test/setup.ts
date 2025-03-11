import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
config();

// Mock console methods to keep test output clean
global.console = {
    ...console,
    // Uncomment the following lines to suppress specific console outputs during tests
    // log: jest.fn(),
    // error: jest.fn(),
    // warn: jest.fn(),
};

// Clean up any test data or connections after all tests
afterAll(async () => {
    // Add any cleanup code here
}); 