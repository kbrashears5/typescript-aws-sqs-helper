/**
 * Test values
 */
export class TestingValues {
    // descriptions
    public AWSError: string = 'AWS Error';
    public InvalidTest: string = 'returns error from AWS';
    public MustSupply: string = 'Must supply';
    public ThrowsOnEmpty: string = 'throws on empty';
    public ThrowsOnTooMany: string = 'throws on too many';
    public ValidTest: string = 'returns valid response from AWS';

    // empty values
    public EmptyArray = [];
    public EmptyString: string = '';

    // strings
    public Body: string = 'body';
    public StringValue: string = 'value';
    public ReceiptHandle: string = 'receipt-handle';
    public Url: string = 'url';

    // objects
    public Entries: AWS.SQS.SendMessageBatchRequestEntry[] = [{ Id: this.StringValue, MessageBody: this.Body }];
}
