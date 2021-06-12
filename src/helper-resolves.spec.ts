import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';
import { SQSHelper } from './helper';
import * as SQS from '@aws-sdk/client-sqs';

const createQueueResultResponse: SQS.CreateQueueResult = {};
const deleteMessageOutputResponse = { Failed: [], Successful: [] };
const deleteMessageBatchResultResponse: SQS.DeleteMessageBatchResult = {
  Failed: [],
  Successful: [],
};
const deleteQueueResultResponse = {};
const getQueueAttributesResultResponse: SQS.GetQueueAttributesResult = {
  Attributes: { ApproximateNumberOfMessages: '5' },
};
const purgeQueueResultResponse = {};
const receiveMessageResultResponse: SQS.ReceiveMessageResult = { Messages: [] };
const sendMessageResultResponse: SQS.SendMessageResult = {};
const sendMessageBatchResultResponse: SQS.SendMessageBatchResult = {
  Failed: [],
  Successful: [],
};

const createQueue = jest.fn().mockImplementation(() => {
  return Promise.resolve<SQS.CreateQueueResult>(createQueueResultResponse);
});
const deleteMessage = jest.fn().mockImplementation(() => {
  return Promise.resolve<any>(deleteMessageOutputResponse);
});
const deleteMessageBatch = jest.fn().mockImplementation(() => {
  return Promise.resolve<SQS.DeleteMessageBatchResult>(
    deleteMessageBatchResultResponse,
  );
});
const deleteQueue = jest.fn().mockImplementation(() => {
  return Promise.resolve<any>(deleteQueueResultResponse);
});
const getQueueAttributes = jest.fn().mockImplementation(() => {
  return Promise.resolve<SQS.GetQueueAttributesResult>(
    getQueueAttributesResultResponse,
  );
});
const purgeQueue = jest.fn().mockImplementation(() => {
  return Promise.resolve<any>(purgeQueueResultResponse);
});
const receiveMessage = jest.fn().mockImplementation(() => {
  return Promise.resolve<SQS.ReceiveMessageResult>(
    receiveMessageResultResponse,
  );
});
const sendMessage = jest.fn().mockImplementation(() => {
  return Promise.resolve<SQS.SendMessageResult>(sendMessageResultResponse);
});
const sendMessageBatch = jest.fn().mockImplementation(() => {
  return Promise.resolve<SQS.SendMessageBatchResult>(
    sendMessageBatchResultResponse,
  );
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
  // set action for this method
  const action = `${SQSHelper.name}.${sqsHelperMock.CreateQueueAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} queueName`, () => {
    const actual = sqsHelperMock.CreateQueueAsync(TestValues.EmptyString, {});
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} queueName`,
    );
  });
  test(`${TestValues.ValidTest}`, () => {
    const actual = sqsHelperMock.CreateQueueAsync(TestValues.Url, {});
    return expect(actual).resolves.toEqual(createQueueResultResponse);
  });
});

/**
 * Test the DeleteMessageAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.DeleteMessageAsync.name}`, () => {
  // set action for this method
  const action = `${SQSHelper.name}.${sqsHelperMock.DeleteMessageAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
    const actual = sqsHelperMock.DeleteMessageAsync(
      TestValues.EmptyString,
      TestValues.ReceiptHandle,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} queueUrl`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} receiptHandle`, () => {
    const actual = sqsHelperMock.DeleteMessageAsync(
      TestValues.Url,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} receiptHandle`,
    );
  });
  test(`${TestValues.ValidTest}`, () => {
    const actual = sqsHelperMock.DeleteMessageAsync(
      TestValues.Url,
      TestValues.ReceiptHandle,
    );
    return expect(actual).resolves.toEqual(deleteMessageOutputResponse);
  });
});

/**
 * Test the DeleteMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.DeleteMessagesAsync.name}`, () => {
  // set action for this method
  const action = `${SQSHelper.name}.${sqsHelperMock.DeleteMessagesAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
    const actual = sqsHelperMock.DeleteMessagesAsync(TestValues.EmptyString, [
      TestValues.ReceiptHandle,
    ]);
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} queueUrl`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} receiptHandles`, () => {
    const actual = sqsHelperMock.DeleteMessagesAsync(
      TestValues.Url,
      TestValues.EmptyArray,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} at least one receiptHandle`,
    );
  });
  test(`${TestValues.ThrowsOnTooMany} receiptHandles`, () => {
    const actual = sqsHelperMock.DeleteMessagesAsync(TestValues.Url, [
      TestValues.StringValue,
      TestValues.StringValue,
      TestValues.StringValue,
      TestValues.StringValue,
      TestValues.StringValue,
      TestValues.StringValue,
      TestValues.StringValue,
      TestValues.StringValue,
      TestValues.StringValue,
      TestValues.StringValue,
      TestValues.StringValue,
    ]);
    return expect(actual).rejects.toThrow(
      `[${action}]-Can only supply up to 10 receiptHandles`,
    );
  });
  test(`${TestValues.ValidTest}`, () => {
    const actual = sqsHelperMock.DeleteMessagesAsync(TestValues.Url, [
      TestValues.ReceiptHandle,
    ]);
    return expect(actual).resolves.toEqual(deleteMessageOutputResponse);
  });
});

/**
 * Test the DeleteQueueAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.DeleteQueueAsync.name}`, () => {
  // set action for this method
  const action = `${SQSHelper.name}.${sqsHelperMock.DeleteQueueAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
    const actual = sqsHelperMock.DeleteQueueAsync(TestValues.EmptyString);
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} queueUrl`,
    );
  });
  test(`${TestValues.ValidTest}`, () => {
    const actual = sqsHelperMock.DeleteQueueAsync(TestValues.Url);
    return expect(actual).resolves.toEqual(deleteQueueResultResponse);
  });
});

/**
 * Test the GetNumberOfMessagesOnQueueAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.GetNumberOfMessagesOnQueueAsync.name}`, () => {
  // set action for this method
  const action = `${SQSHelper.name}.${sqsHelperMock.GetNumberOfMessagesOnQueueAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
    const actual = sqsHelperMock.GetNumberOfMessagesOnQueueAsync(
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} queueUrl`,
    );
  });
  test(`${TestValues.ValidTest}`, () => {
    const actual = sqsHelperMock.GetNumberOfMessagesOnQueueAsync(
      TestValues.Url,
    );
    return expect(actual).resolves.toBe(5);
  });
});

/**
 * Test the GetQueueAttributesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.GetQueueAttributesAsync.name}`, () => {
  // set action for this method
  const action = `${SQSHelper.name}.${sqsHelperMock.GetQueueAttributesAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
    const actual = sqsHelperMock.GetQueueAttributesAsync(
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} queueUrl`,
    );
  });
  test(`${TestValues.ValidTest}`, () => {
    const actual = sqsHelperMock.GetQueueAttributesAsync(TestValues.Url);
    return expect(actual).resolves.toBe(
      getQueueAttributesResultResponse.Attributes,
    );
  });
});

/**
 * Test the PurgeQueueAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.PurgeQueueAsync.name}`, () => {
  // set action for this method
  const action = `${SQSHelper.name}.${sqsHelperMock.PurgeQueueAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
    const actual = sqsHelperMock.PurgeQueueAsync(TestValues.EmptyString);
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} queueUrl`,
    );
  });
  test(`${TestValues.ValidTest}`, () => {
    const actual = sqsHelperMock.PurgeQueueAsync(TestValues.Url);
    return expect(actual).resolves.toEqual(purgeQueueResultResponse);
  });
});

/**
 * Test the ReceiveMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.ReceiveMessagesAsync.name}`, () => {
  // set action for this method
  const action = `${SQSHelper.name}.${sqsHelperMock.ReceiveMessagesAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
    const actual = sqsHelperMock.ReceiveMessagesAsync(TestValues.EmptyString);
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} queueUrl`,
    );
  });
  test(`${TestValues.ValidTest}`, () => {
    const actual = sqsHelperMock.ReceiveMessagesAsync(TestValues.Url);
    return expect(actual).resolves.toEqual(receiveMessageResultResponse);
  });
});

/**
 * Test the SendMessageAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.SendMessageAsync.name}`, () => {
  // set action for this method
  const action = `${SQSHelper.name}.${sqsHelperMock.SendMessageAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
    const actual = sqsHelperMock.SendMessageAsync(
      TestValues.EmptyString,
      TestValues.Body,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} queueUrl`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} messageBody`, () => {
    const actual = sqsHelperMock.SendMessageAsync(
      TestValues.Url,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} messageBody`,
    );
  });
  test(`${TestValues.ValidTest}`, () => {
    const actual = sqsHelperMock.SendMessageAsync(
      TestValues.Url,
      TestValues.Body,
    );
    return expect(actual).resolves.toEqual(sendMessageResultResponse);
  });
});

/**
 * Test the SendMessagesAsync method
 */
describe(`${SQSHelper.name}.${sqsHelperMock.SendMessagesAsync.name}`, () => {
  // set action for this method
  const action = `${SQSHelper.name}.${sqsHelperMock.SendMessagesAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} queueUrl`, () => {
    const actual = sqsHelperMock.SendMessagesAsync(
      TestValues.EmptyString,
      TestValues.Entries,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} queueUrl`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} entries`, () => {
    const actual = sqsHelperMock.SendMessagesAsync(
      TestValues.Url,
      TestValues.EmptyArray,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} at least one entry`,
    );
  });
  test(`${TestValues.ValidTest}`, () => {
    const actual = sqsHelperMock.SendMessagesAsync(
      TestValues.Url,
      TestValues.Entries,
    );
    return expect(actual).resolves.toEqual(sendMessageBatchResultResponse);
  });
});
