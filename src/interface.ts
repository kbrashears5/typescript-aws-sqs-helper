import * as SQS from '@aws-sdk/client-sqs';
import { Attributes, AttributeValues } from './any';

/**
 * Functions to interact with the AWS SQS service
 */
export interface ISQSHelper {
  /**
   * Create queue
   * @param queueName {string} URL of queue
   * @param attributes {Attributes} Attributes to give the queue
   */
  CreateQueueAsync(
    queueName: string,
    attributes: Attributes,
  ): Promise<SQS.CreateQueueResult>;

  /**
   * Delete message from a queue
   * @param queueUrl {string} URL of queue
   * @param receiptHandle {string} Receipt handle of message to delete
   */
  DeleteMessageAsync(queueUrl: string, receiptHandle: string): Promise<object>;

  /**
   * Delete messages from a queue
   * @param queueUrl {string} URL of queue
   * @param receiptHandles {string[]} String array of receipt handle of messages to delete
   */
  DeleteMessagesAsync(
    queueUrl: string,
    receiptHandles: string[],
  ): Promise<SQS.DeleteMessageBatchResult>;

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
  GetQueueAttributesAsync(queueUrl: string): Promise<Attributes>;

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
  ReceiveAllMessagesAsync(
    queueUrl: string,
    visibilityTimeout?: number,
    attributeNames?: string[],
    messageAttributeNames?: string[],
  ): Promise<SQS.Message[]>;

  /**
   * Receive messages from a queue
   * @param queueUrl {string} URL of queue
   * @param maxNumberOfMessages {number} Maximum number of messages to receive. Default and maximum is 10
   * @param visibilityTimeout {number} Time in seconds that a message is hidden from the queue. Default is 10
   * @param attributeNames {string[]} List of attribute names that need to be returned for each message. Default is 'ALL'
   * @param messageAttributeNames {string[]} List of message attributes to be returned for each message
   */
  ReceiveMessagesAsync(
    queueUrl: string,
    maxNumberOfMessages?: number,
    visibilityTimeout?: number,
    attributeNames?: string[],
    messageAttributeNames?: string[],
  ): Promise<SQS.ReceiveMessageResult>;

  /**
   * Send message to a queue
   * @param queueUrl {string} URL of queue
   * @param messageBody {string} Body of message
   * @param delaySeconds {number} How long to delay sending message. Default is 0
   * @param messageAttributes {SQS.MessageBodyAttributeMap} Attributes to send with the message
   */
  SendMessageAsync(
    queueUrl: string,
    messageBody: string,
    delaySeconds?: number,
    messageAttributes?: AttributeValues,
  ): Promise<SQS.SendMessageResult>;

  /**
   * Send messages to a queue
   * @param queueUrl {string} URL of queue
   * @param messages {SQS.SendMessageBatchRequestEntry[]} Messages
   */
  SendMessagesAsync(
    queueUrl: string,
    messages: SQS.SendMessageBatchRequestEntry[],
  ): Promise<SQS.SendMessageBatchResult>;
}
