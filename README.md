<h1 align="center">typescript-aws-sqs-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS SQS service</b>
    
[![Build Status](https://dev.azure.com/kbrashears5/github/_apis/build/status/kbrashears5.typescript-aws-sqs-helper?branchName=master)](https://dev.azure.com/kbrashears5/github/_build/latest?definitionId=11&branchName=master)
[![Tests](https://img.shields.io/azure-devops/tests/kbrashears5/github/11)](https://img.shields.io/azure-devops/tests/kbrashears5/github/11)
[![Code Coverage](https://img.shields.io/azure-devops/coverage/kbrashears5/github/11)](https://img.shields.io/azure-devops/coverage/kbrashears5/github/11)

[![NPM Version](https://img.shields.io/npm/v/typescript-aws-sqs-helper)](https://img.shields.io/npm/v/typescript-aws-sqs-helper)
[![Downloads](https://img.shields.io/npm/dt/typescript-aws-sqs-helper)](https://img.shields.io/npm/dt/typescript-aws-sqs-helper)

</div>

## Install

```
npm install typescript-aws-sqs-helper@latest
```

## Usage

### Default - running in Lambda in your own account

```typescript
const logger = new Logger(LogLevel.Trace);

const helper = new SQSHelper(logger);

const response = await helper.DeleteMessageAsync('queueUrl', 'receiptHandle');
```

### Running in separate account or not in Lambda

```typescript
const logger = new Logger(LogLevel.Trace);

const options: AWS.SQS.ClientConfiguration = {
  accessKeyId: '{access_key}',
  secretAccessKey: '{secret_key}',
  region: 'us-east-1',
};

const repository = new AWS.SQS(options);

const helper = new SQSHelper(logger, repository);

const response = await helper.DeleteMessageAsync('queueUrl', 'receiptHandle');
```

## Notes

If no options are supplied, will default to `us-east-1` as the region
