import * as SQS from '@aws-sdk/client-sqs';

/**
 * Represents SQS Attribute map
 */
export interface Attributes {
  [key: string]: string;
}

/**
 * Represents SQS Attribute Value map
 */
export interface AttributeValues {
  [key: string]: SQS.MessageAttributeValue;
}
