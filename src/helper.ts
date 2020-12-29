import * as SQS from '@aws-sdk/client-sqs';
import { ILogger } from 'typescript-ilogger';
import { BaseClass } from 'typescript-helper-functions';
import { ISQSHelper } from './interface';
import { Attributes, AttributeValues } from './any';

/**
 * SQS Helper
 */
export class SQSHelper extends BaseClass implements ISQSHelper {

    /**
     * AWS Repository for SQS
     */
    public Repository: SQS.SQS;

    /**
     * Initializes new instance of SQSHelper
     * @param logger {ILogger} Injected logger
     * @param repository {SQS.SQS} Injected Repository. A new repository will be created if not supplied
     * @param options {SQS.SQSClientConfig} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: SQS.SQS,
        options?: SQS.SQSClientConfig) {

        super(logger);
        options = this.ObjectOperations.IsNullOrEmpty(options) ? { region: 'us-east-1' } as SQS.SQSClientConfig : options!;
        this.Repository = repository || new SQS.SQS(options);
    }

    public async CreateQueueAsync(queueName: string,
        attributes: Attributes): Promise<SQS.CreateQueueResult> {

        const action = `${SQSHelper.name}.${this.CreateQueueAsync.name}`;
        this.LogHelper.LogInputs(action, { queueName, attributes });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(queueName)) { throw new Error(`[${action}]-Must supply queueName`); }

        // create params object
        const params: SQS.CreateQueueRequest = {
            Attributes: attributes,
            QueueName: queueName,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.createQueue(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async DeleteMessageAsync(queueUrl: string,
        receiptHandle: string): Promise<object> {

        const action = `${SQSHelper.name}.${this.DeleteMessageAsync.name}`;
        this.LogHelper.LogInputs(action, { queueUrl, receiptHandle });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }
        if (this.ObjectOperations.IsNullOrWhitespace(receiptHandle)) { throw new Error(`[${action}]-Must supply receiptHandle`); }

        // create params object
        const params: SQS.DeleteMessageRequest = {
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteMessage(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async DeleteMessagesAsync(queueUrl: string,
        receiptHandles: string[]): Promise<SQS.DeleteMessageBatchResult> {

        const action = `${SQSHelper.name}.${this.DeleteMessagesAsync.name}`;
        this.LogHelper.LogInputs(action, { queueUrl, receiptHandles });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }
        if (!receiptHandles || receiptHandles.length === 0) { throw new Error(`[${action}]-Must supply at least one receiptHandle`); }
        if (receiptHandles.length > 10) { throw new Error(`[${action}]-Can only supply up to 10 receiptHandles`); }

        // create entries to delete
        const entries: SQS.DeleteMessageBatchRequestEntry[] = [];
        for (const handle of receiptHandles) {
            entries.push({ Id: handle, ReceiptHandle: handle });
        }

        // create params object
        const params: SQS.DeleteMessageBatchRequest = {
            Entries: entries,
            QueueUrl: queueUrl,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteMessageBatch(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async DeleteQueueAsync(queueUrl: string): Promise<object> {

        const action = `${SQSHelper.name}.${this.DeleteQueueAsync.name}`;
        this.LogHelper.LogInputs(action, { queueUrl });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }

        // create params object
        const params: SQS.DeleteQueueRequest = {
            QueueUrl: queueUrl,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteQueue(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async GetNumberOfMessagesOnQueueAsync(queueUrl: string): Promise<number> {

        const action = `${SQSHelper.name}.${this.GetNumberOfMessagesOnQueueAsync.name}`;
        this.LogHelper.LogInputs(action, { queueUrl });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }

        const params: SQS.GetQueueAttributesRequest = {
            QueueUrl: queueUrl,
            AttributeNames: ['ApproximateNumberOfMessages'],
        };
        this.LogHelper.LogRequest(action, params);

        const response = await this.Repository.getQueueAttributes(params);
        this.LogHelper.LogResponse(action, response);

        let messages = '';
        if (response && response.Attributes) {
            messages = response.Attributes['ApproximateNumberOfMessages'];
        }

        return parseInt(messages, 10);
    }

    public async GetQueueAttributesAsync(queueUrl: string): Promise<Attributes> {

        const action = `${SQSHelper.name}.${this.GetQueueAttributesAsync.name}`;
        this.LogHelper.LogInputs(action, { queueUrl });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }

        const params: SQS.GetQueueAttributesRequest = {
            QueueUrl: queueUrl,
            AttributeNames: ['ALL'],
        };
        this.LogHelper.LogRequest(action, params);

        const response = await this.Repository.getQueueAttributes(params);
        this.LogHelper.LogResponse(action, response);

        return response.Attributes || {} as Attributes;
    }

    public async PurgeQueueAsync(queueUrl: string): Promise<object> {

        const action = `${SQSHelper.name}.${this.PurgeQueueAsync.name}`;
        this.LogHelper.LogInputs(action, { queueUrl });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }

        // create params object
        const params: SQS.PurgeQueueRequest = {
            QueueUrl: queueUrl,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.purgeQueue(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async ReceiveAllMessagesAsync(queueUrl: string,
        visibilityTimeout?: number,
        attributeNames?: string[],
        messageAttributeNames?: string[]): Promise<SQS.Message[]> {

        let allMessages: SQS.Message[] = [];
        while (true) {
            const messages = await this.ReceiveMessagesAsync(queueUrl, 10, visibilityTimeout, attributeNames, messageAttributeNames);
            if (!messages || !messages.Messages || messages.Messages.length < 1) { break; }
            allMessages = allMessages.concat(messages.Messages);
        }

        return allMessages;
    }

    public async ReceiveMessagesAsync(queueUrl: string,
        maxNumberOfMessages?: number,
        visibilityTimeout?: number,
        attributeNames?: string[],
        messageAttributeNames?: string[]): Promise<SQS.ReceiveMessageResult> {

        const action = `${SQSHelper.name}.${this.ReceiveMessagesAsync.name}`;
        this.LogHelper.LogInputs(action, { queueUrl, maxNumberOfMessages, visibilityTimeout, attributeNames, messageAttributeNames });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }

        // set defaults
        if (!maxNumberOfMessages) { maxNumberOfMessages = 10; }
        if (!visibilityTimeout) { visibilityTimeout = 10; }
        if (!attributeNames || attributeNames.length === 0) { attributeNames = ['ALL']; }

        // create params object
        const params: SQS.ReceiveMessageRequest = {
            AttributeNames: attributeNames,
            MaxNumberOfMessages: maxNumberOfMessages,
            MessageAttributeNames: messageAttributeNames,
            QueueUrl: queueUrl,
            VisibilityTimeout: visibilityTimeout,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.receiveMessage(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async SendMessageAsync(queueUrl: string,
        messageBody: string,
        delaySeconds?: number,
        messageAttributes?: AttributeValues): Promise<SQS.SendMessageResult> {

        const action = `${SQSHelper.name}.${this.SendMessageAsync.name}`;
        this.LogHelper.LogInputs(action, { queueUrl, messageBody, delaySeconds, messageAttributes });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }
        if (this.ObjectOperations.IsNullOrWhitespace(messageBody)) { throw new Error(`[${action}]-Must supply messageBody`); }

        // set defaults
        if (!delaySeconds) { delaySeconds = 0; }

        // create params object
        const params: SQS.SendMessageRequest = {
            DelaySeconds: delaySeconds,
            MessageAttributes: messageAttributes,
            MessageBody: messageBody,
            QueueUrl: queueUrl,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.sendMessage(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async SendMessagesAsync(queueUrl: string,
        entries: SQS.SendMessageBatchRequestEntry[]): Promise<SQS.SendMessageBatchResult> {

        const action = `${SQSHelper.name}.${this.SendMessagesAsync.name}`;
        this.LogHelper.LogInputs(action, { queueUrl });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(queueUrl)) { throw new Error(`[${action}]-Must supply queueUrl`); }
        if (!entries || entries.length === 0) { throw new Error(`[${action}]-Must supply at least one entry`); }

        // create params object
        const params: SQS.SendMessageBatchRequest = {
            Entries: entries,
            QueueUrl: queueUrl,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.sendMessageBatch(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }
}
