
import { ValidationResult, createPostHandler } from '../lib/serverHelper';
import * as dbHelper from '../lib/dbHelper';
import { Request, Response } from 'express';
// import { TypeExpressionOperator } from 'mongoose';
// jest.mock('../lib/dbHelper');
// jest.mock('../lib/serverHelper');

// const mockInsertPost = dbHelper.insertPost as jest.MockedFunction<typeof dbHelper.insertPost>
// const mockValidatePost = validatePost as jest.MockedFunction<typeof validatePost>


describe('createPostHandler', () => {
  var res: Response;
  const mockReq = {
    body: {
      title: 'Test post',
      content: 'This is a test post',
      author: 'John',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });



  it('should send OK when post is successfully inserted', async () => {
    const post = {
      title: 'Test Post',
      content: 'This is a test post.',
      author: 'John',
    };
    const validatePost = jest.fn().mockReturnValue({
      success: true,
    });
    const insertPost = jest.fn().mockResolvedValue(true);


    await createPostHandler({ body: post } as Request, res);

    //expect(validatePostMock).toHaveBeenCalledWith(post);
    expect(insertPost).toHaveBeenCalled();
    // expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.send).toHaveBeenCalledWith('OK');
  });

});
