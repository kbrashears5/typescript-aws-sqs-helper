import { BaseMock } from 'typescript-helper-functions';

// tslint:disable-next-line: no-var-requires
const AWS = require('aws-sdk');

/**
 * SQS Mock class
 */
export class SQSMock extends BaseMock {

    /**
     * Mocks an AWS.SQS.CreateQueueResult response
     */
    public CreateQueueResult: AWS.SQS.CreateQueueResult = {};

    /**
     * Mocks an AWS.SQS.DeleteMessageOutput response
     * Technically doesn't exist
     */
    public DeleteMessageOutput: object = {};

    /**
     * Mocks an AWS.SQS.DeleteMessageBatchResult response
     */
    public DeleteMessageBatchResult: AWS.SQS.DeleteMessageBatchResult = { Failed: [], Successful: [] };

    /**
     * Mocks an AWS.SQS.DeleteQueueResult response
     * Technically doesn't exist
     */
    public DeleteQueueResult: object = {};

    /**
     * Mocks an AWS.SQS.DeleteMessageBatchResult response
     */
    public GetQueueAttributesResult: AWS.SQS.GetQueueAttributesResult = { Attributes: { ApproximateNumberOfMessages: '5' } };

    /**
     * Mocks an AWS.SQS.PurgeQueueResult response
     * Technically doesn't exist
     */
    public PurgeQueueResult: object = {};

    /**
     * Mocks an AWS.SQS.ReceiveMessageResult
     */
    public ReceiveMessageResult: AWS.SQS.ReceiveMessageResult = { Messages: [] };

    /**
     * Mocks an AWS.SQS.SendMessageResult
     */
    public SendMessageResult: AWS.SQS.SendMessageResult = {};

    /**
     * Mocks an AWS.SQS.SendMessageBatchResult
     */
    public SendMessageBatchResult: AWS.SQS.SendMessageBatchResult = { Failed: [], Successful: [] };

    /**
     * Create the SQS mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // create queue response
            createQueue: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SQS.CreateQueueResult>(this.CreateQueueResult);
                }),
            },
            // delete message response
            deleteMessage: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.DeleteMessageOutput);
                }),
            },
            // delete messages response
            deleteMessageBatch: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SQS.DeleteMessageBatchResult>(this.DeleteMessageBatchResult);
                }),
            },
            // delete queue response
            deleteQueue: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.DeleteQueueResult);
                }),
            },
            // get queue attributes response
            getQueueAttributes: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SQS.GetQueueAttributesResult>(this.GetQueueAttributesResult);
                }),
            },
            // purge queue response
            purgeQueue: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.PurgeQueueResult);
                }),
            },
            // receive message response
            receiveMessage: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SQS.ReceiveMessageResult>(this.ReceiveMessageResult);
                }),
            },
            // send message response
            sendMessage: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SQS.SendMessageResult>(this.SendMessageResult);
                }),
            },
            // send messages response
            sendMessageBatch: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<AWS.SQS.SendMessageBatchResult>(this.SendMessageBatchResult);
                }),
            },
        };

        // create the functions
        let functions = new AWS.SQS();
        functions = {
            createQueue: () => awsResponses.createQueue,
            deleteMessage: () => awsResponses.deleteMessage,
            deleteMessageBatch: () => awsResponses.deleteMessageBatch,
            deleteQueue: () => awsResponses.deleteQueue,
            getQueueAttributes: () => awsResponses.getQueueAttributes,
            purgeQueue: () => awsResponses.purgeQueue,
            receiveMessage: () => awsResponses.receiveMessage,
            sendMessage: () => awsResponses.sendMessage,
            sendMessageBatch: () => awsResponses.sendMessageBatch,
        };

        return functions;
    }
}
