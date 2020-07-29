import * as AWS from 'aws-sdk';

/**
 * SQS Helper
 */
export interface ISQSHelper {

    /**
     * AWS Repository for SQS
     */
    Repository: AWS.SQS;

    /**
     * Delete a message from an SQS queue
     * @param queueUrl {string} Queue to delete a message from
     * @param receiptHandle {string} Receipt handle of message to delete
     */
    DeleteMessageAsync(queueUrl: string,
        receiptHandle: string): Promise<object>;

    /**
     * Delete a set of messages from an SQS queue
     * @param queueUrl {string} Queue to delete messages from
     * @param receiptHandles {string[]} String array of receipt handle of messages to delete
     */
    DeleteMessagesAsync(queueUrl: string,
        receiptHandles: string[]): Promise<AWS.SQS.DeleteMessageBatchResult>;

    /**
     * Get how many messages are on a given queue
     * @param queueUrl {string} Queue to query
     */
    GetNumberOfMessagesOnQueueAsync(queueUrl: string) : Promise<number>;

    /**
     * Purge all message from a queue
     * @param queueUrl {string} Queue to purge all messages from
     */
    PurgeQueueAsync(queueUrl: string): Promise<object>;

    /**
     * Receive up to 10 messages from a queue
     * @param queueUrl {string} Queue to receive message from
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
     * Receive all messages currently on a queue
     * @param queueUrl {string} Queue to receive message from
     * @param visibilityTimeout {number} Time in seconds that a message is hidden from the queue. Default is 10
     * @param attributeNames {string[]} List of attribute names that need to be returned for each message. Default is 'ALL'
     * @param messageAttributeNames {string[]} List of message attributes to be returned for each message
     */
    ReceiveAllMessagesAsync(queueUrl: string,
        visibilityTimeout?: number,
        attributeNames?: string[],
        messageAttributeNames?: string[]): Promise<AWS.SQS.Message[]>;

    /**
     * Send a message to a queue
     * @param queueUrl {string} Queue to send message to
     * @param messageBody {string} Body of message to send
     * @param delaySeconds {number} How long to delay sending message. Default is 0
     * @param messageAttributes {AWS.SQS.MessageBodyAttributeMap} Attributes to attach to the message
     */
    SendMessageAsync(queueUrl: string,
        messageBody: string,
        delaySeconds?: number,
        messageAttributes?: AWS.SQS.MessageBodyAttributeMap): Promise<AWS.SQS.SendMessageResult>;

    /**
     * Send messages to a queue
     * @param queueUrl {string} Queue to send messages to
     * @param entries {AWS.SQS.SendMessageBatchRequestEntry[]} Messages to send
     */
    SendMessagesAsync(queueUrl: string,
        entries: AWS.SQS.SendMessageBatchRequestEntry[]): Promise<AWS.SQS.SendMessageBatchResult>;
}
