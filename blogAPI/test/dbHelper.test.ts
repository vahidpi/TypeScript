import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { insertPost, getPostList } from '../lib/dbHelper';
import { Post } from '../lib/models';

jest.mock('mongodb');
jest.mock('../lib/db', () => ({
    connect: jest.fn(),
    disconnect: jest.fn(),
    client: {
        db: jest.fn()
    }
}));

describe('Database Helper Tests', () => {
    let mockCollection: jest.Mocked<Collection>;
    let mockDb: jest.Mocked<Db>;
    
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        
        // Create mock collection
        mockCollection = {
            insertOne: jest.fn(),
            find: jest.fn(),
            toArray: jest.fn(),
        } as unknown as jest.Mocked<Collection>;

        // Create mock db
        mockDb = {
            collection: jest.fn().mockReturnValue(mockCollection)
        } as unknown as jest.Mocked<Db>;

        // Setup client.db mock
        const { client } = require('../lib/db');
        client.db.mockReturnValue(mockDb);
    });

    describe('insertPost', () => {
        it('should successfully insert a post', async () => {
            const testPost: Post = {
                title: 'Test Post',
                content: 'Test Content',
                author: 'Test Author'
            };

            mockCollection.insertOne.mockResolvedValueOnce({
                acknowledged: true,
                insertedId: new ObjectId()
            });

            const result = await insertPost(testPost);
            expect(result).toBe(true);
            expect(mockCollection.insertOne).toHaveBeenCalledWith(testPost);
        });

        it('should handle insertion errors', async () => {
            const testPost: Post = {
                title: 'Test Post',
                content: 'Test Content',
                author: 'Test Author'
            };

            mockCollection.insertOne.mockRejectedValueOnce(new Error('DB Error'));

            const result = await insertPost(testPost);
            expect(result).toBe(false);
        });
    });

    describe('getPostList', () => {
        it('should return posts when available', async () => {
            const mockPosts = [
                { title: 'Post 1', content: 'Content 1', author: 'Author 1' },
                { title: 'Post 2', content: 'Content 2', author: 'Author 2' }
            ];

            mockCollection.find.mockReturnValueOnce({
                toArray: jest.fn().mockResolvedValueOnce(mockPosts)
            } as any);

            const result = await getPostList();
            expect(result).toEqual(mockPosts);
        });

        it('should return null when no posts are found', async () => {
            mockCollection.find.mockReturnValueOnce({
                toArray: jest.fn().mockResolvedValueOnce([])
            } as any);

            const result = await getPostList();
            expect(result).toBeNull();
        });

        it('should handle errors', async () => {
            mockCollection.find.mockReturnValueOnce({
                toArray: jest.fn().mockRejectedValueOnce(new Error('DB Error'))
            } as any);

            const result = await getPostList();
            expect(result).toBeNull();
        });
    });
}); 