import { ValidationResult, createPostHandler } from '../lib/serverHelper';
import * as dbHelper from '../lib/dbHelper';
import { Request, Response } from 'express';
// import { TypeExpressionOperator } from 'mongoose';
// jest.mock('../lib/dbHelper');
// jest.mock('../lib/serverHelper');

// const mockInsertPost = dbHelper.insertPost as jest.MockedFunction<typeof dbHelper.insertPost>
// const mockValidatePost = validatePost as jest.MockedFunction<typeof validatePost>

jest.mock('../lib/dbHelper');

describe('Server Helper Tests', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockResponse = {
            status: mockStatus,
            json: mockJson
        };
        jest.clearAllMocks();
    });

    describe('createPostHandler', () => {
        it('should create a post successfully', async () => {
            const testPost = {
                title: 'Test Post',
                content: 'Test Content',
                author: 'Test Author'
            };

            mockRequest = {
                body: testPost
            };

            jest.spyOn(dbHelper, 'insertPost').mockResolvedValueOnce(true);

            await createPostHandler(mockRequest as Request, mockResponse as Response);

            expect(dbHelper.insertPost).toHaveBeenCalledWith(testPost);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({ message: 'Post created successfully' });
        });

        it('should handle missing required fields', async () => {
            mockRequest = {
                body: {
                    title: 'Test Post',
                    // missing content and author
                }
            };

            await createPostHandler(mockRequest as Request, mockResponse as Response);

            expect(dbHelper.insertPost).not.toHaveBeenCalled();
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ 
                error: expect.stringContaining('Missing required fields') 
            });
        });

        it('should handle database errors', async () => {
            const testPost = {
                title: 'Test Post',
                content: 'Test Content',
                author: 'Test Author'
            };

            mockRequest = {
                body: testPost
            };

            jest.spyOn(dbHelper, 'insertPost').mockResolvedValueOnce(false);

            await createPostHandler(mockRequest as Request, mockResponse as Response);

            expect(dbHelper.insertPost).toHaveBeenCalledWith(testPost);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({ 
                error: expect.stringContaining('Failed to create post') 
            });
        });
    });
});
