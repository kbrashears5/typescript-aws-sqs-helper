import { BaseMock } from 'typescript-helper-functions';
import * as SQS from '@aws-sdk/client-sqs';

/**
 * SQS Mock class
 */
export class SQSMock extends BaseMock {

    /**
     * Mocks an SQS.CreateQueueResult response
     */
    public CreateQueueResult: SQS.CreateQueueResult = {};

    /**
     * Mocks an SQS.DeleteMessageOutput response
     * Technically doesn't exist
     */
    public DeleteMessageOutput: object = {};

    /**
     * Mocks an SQS.DeleteMessageBatchResult response
     */
    public DeleteMessageBatchResult: SQS.DeleteMessageBatchResult = { Failed: [], Successful: [] };

    /**
     * Mocks an SQS.DeleteQueueResult response
     * Technically doesn't exist
     */
    public DeleteQueueResult: object = {};

    /**
     * Mocks an SQS.DeleteMessageBatchResult response
     */
    public GetQueueAttributesResult: SQS.GetQueueAttributesResult = { Attributes: { ApproximateNumberOfMessages: '5' } };

    /**
     * Mocks an SQS.PurgeQueueResult response
     * Technically doesn't exist
     */
    public PurgeQueueResult: object = {};

    /**
     * Mocks an SQS.ReceiveMessageResult
     */
    public ReceiveMessageResult: SQS.ReceiveMessageResult = { Messages: [] };

    /**
     * Mocks an SQS.SendMessageResult
     */
    public SendMessageResult: SQS.SendMessageResult = {};

    /**
     * Mocks an SQS.SendMessageBatchResult
     */
    public SendMessageBatchResult: SQS.SendMessageBatchResult = { Failed: [], Successful: [] };

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
                        Promise.resolve<SQS.CreateQueueResult>(this.CreateQueueResult);
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
                        Promise.resolve<SQS.DeleteMessageBatchResult>(this.DeleteMessageBatchResult);
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
                        Promise.resolve<SQS.GetQueueAttributesResult>(this.GetQueueAttributesResult);
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
                        Promise.resolve<SQS.ReceiveMessageResult>(this.ReceiveMessageResult);
                }),
            },
            // send message response
            sendMessage: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<SQS.SendMessageResult>(this.SendMessageResult);
                }),
            },
            // send messages response
            sendMessageBatch: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<SQS.SendMessageBatchResult>(this.SendMessageBatchResult);
                }),
            },
        };

        const options = {} as SQS.SQSClientConfig;

        // create the functions
        let functions = new SQS.SQS(options);
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
