import * as SQS from '@aws-sdk/client-sqs';

/**
 * Test values
 */
export class TestingValues {
  // descriptions
  public AWSError = 'AWS Error';
  public InvalidTest = 'returns error from AWS';
  public MustSupply = 'Must supply';
  public ThrowsOnEmpty = 'throws on empty';
  public ThrowsOnTooMany = 'throws on too many';
  public ValidTest = 'returns valid response from AWS';

  // empty values
  public EmptyArray = [];
  public EmptyString = '';

  // strings
  public Body = 'body';
  public StringValue = 'value';
  public ReceiptHandle = 'receipt-handle';
  public Url = 'url';

  // objects
  public Entries: SQS.SendMessageBatchRequestEntry[] = [
    // eslint-disable-next-line no-invalid-this
    { Id: this.StringValue, MessageBody: this.Body },
  ];
}
