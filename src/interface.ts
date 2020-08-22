import * as AWS from 'aws-sdk';

/**
 * Functions to interact with the AWS SQS service
 */
export interface ISQSHelper {

    /**
     * AWS Repository for SQS
     */
    Repository: AWS.SQS;

    /**
     * Create queue
     * @param queueName {string} URL of queue
     * @param attributes {AWS.SQS.QueueAttributeMap} Attributes to give the queue
     */
    CreateQueueAsync(queueName: string,
        attributes: AWS.SQS.QueueAttributeMap): Promise<AWS.SQS.CreateQueueResult>;

    /**
     * Delete message from a queue
     * @param queueUrl {string} URL of queue
     * @param receiptHandle {string} Receipt handle of message to delete
     */
    DeleteMessageAsync(queueUrl: string,
        receiptHandle: string): Promise<object>;

    /**
     * Delete messages from a queue
     * @param queueUrl {string} URL of queue
     * @param receiptHandles {string[]} String array of receipt handle of messages to delete
     */
    DeleteMessagesAsync(queueUrl: string,
        receiptHandles: string[]): Promise<AWS.SQS.DeleteMessageBatchResult>;

    /**
     * Delete queue
     * @param queueUrl {string} URL of queue
     */
    DeleteQueueAsync(queueUrl: string): Promise<object>;

    /**
     * Get number of messages on a queue
     * @param queueUrl {string} URL of queue
     */
    GetNumberOfMessagesOnQueueAsync(queueUrl: string): Promise<number>;

    /**
     * Get queue attributes
     * @param queueUrl {string} URL of queue
     */
    GetQueueAttributesAsync(queueUrl: string): Promise<AWS.SQS.QueueAttributeMap>;

    /**
     * Purge all messages on a queue
     * @param queueUrl {string} URL of queue
     */
    PurgeQueueAsync(queueUrl: string): Promise<object>;

    /**
     * Receive all the messages on a queue
     * @param queueUrl {string} URL of queue
     * @param visibilityTimeout {number} Time in seconds that a message is hidden from the queue. Default is 10
     * @param attributeNames {string[]} List of attribute names that need to be returned for each message. Default is 'ALL'
     * @param messageAttributeNames {string[]} List of message attributes to be returned for each message
     */
    ReceiveAllMessagesAsync(queueUrl: string,
        visibilityTimeout?: number,
        attributeNames?: string[],
        messageAttributeNames?: string[]): Promise<AWS.SQS.Message[]>;

    /**
     * Receive messages from a queue
     * @param queueUrl {string} URL of queue
     * @param maxNumberOfMessages {number} Maximum number of messages to receive. Default and maximum is 10
     * @param visibilityTimeout {number} Time in seconds that a message is hidden from the queue. Default is 10
     * @param attributeNames {string[]} List of attribute names that need to be returned for each message. Default is 'ALL'
     * @param messageAttributeNames {string[]} List of message attributes to be returned for each message
     */
    ReceiveMessagesAsync(queueUrl: string,
        maxNumberOfMessages?: number,
        visibilityTimeout?: number,
        attributeNames?: string[],
        messageAttributeNames?: string[]): Promise<AWS.SQS.ReceiveMessageResult>;

    /**
     * Send message to a queue
     * @param queueUrl {string} URL of queue
     * @param messageBody {string} Body of message
     * @param delaySeconds {number} How long to delay sending message. Default is 0
     * @param messageAttributes {AWS.SQS.MessageBodyAttributeMap} Attributes to send with the message
     */
    SendMessageAsync(queueUrl: string,
        messageBody: string,
        delaySeconds?: number,
        messageAttributes?: AWS.SQS.MessageBodyAttributeMap): Promise<AWS.SQS.SendMessageResult>;

    /**
     * Send messages to a queue
     * @param queueUrl {string} URL of queue
     * @param messages {AWS.SQS.SendMessageBatchRequestEntry[]} Messages
     */
    SendMessagesAsync(queueUrl: string,
        messages: AWS.SQS.SendMessageBatchRequestEntry[]): Promise<AWS.SQS.SendMessageBatchResult>;
}
