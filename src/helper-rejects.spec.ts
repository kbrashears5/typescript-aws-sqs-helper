import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';
import { SQSHelper } from './helper';

const error = new Error(`AWS Error`);

const createQueue = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const deleteMessage = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const deleteMessageBatch = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const deleteQueue = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const getQueueAttributes = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const purgeQueue = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const receiveMessage = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const sendMessage = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const sendMessageBatch = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});

// mock the functions
jest.mock('@aws-sdk/client-sqs', () => {
    return {
        SQS: jest.fn().mockImplementation(() => {
            return {
                createQueue,
                deleteMessage,
                deleteMessageBatch,
                deleteQueue,
                getQueueAttributes,
                purgeQueue,
                receiveMessage,
                sendMessage,
                sendMessageBatch,
            };
        }),
    };
});

const logger = new Logger(LogLevel.Off);
const sqsHelperMock = new SQSHelper(logger);
const TestValues = new TestingValues();

/**
 * Test the CreateQueueAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.CreateQueueAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMock.CreateQueueAsync(TestValues.Url, {});
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the DeleteMessageAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.DeleteMessageAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMock.DeleteMessageAsync(TestValues.Url, TestValues.ReceiptHandle);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the DeleteMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.DeleteMessagesAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMock.DeleteMessagesAsync(TestValues.Url, [TestValues.ReceiptHandle]);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the DeleteQueueAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.DeleteQueueAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMock.DeleteQueueAsync(TestValues.Url);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the GetNumberOfMessagesOnQueueAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.GetNumberOfMessagesOnQueueAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMock.GetNumberOfMessagesOnQueueAsync(TestValues.Url);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the GetQueueAttributesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.GetQueueAttributesAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMock.GetQueueAttributesAsync(TestValues.Url);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the PurgeQueueAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.PurgeQueueAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMock.PurgeQueueAsync(TestValues.Url);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the ReceiveMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.ReceiveMessagesAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMock.ReceiveMessagesAsync(TestValues.Url);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the SendMessageAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.SendMessageAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMock.SendMessageAsync(TestValues.Url, TestValues.Body);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the SendMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.SendMessagesAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = sqsHelperMock.SendMessagesAsync(TestValues.Url, TestValues.Entries);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});
