<h1 align="center">typescript-aws-sqs-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS SQS service</b>
    
[![CI/CD](https://github.com/kbrashears5/typescript-aws-sqs-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-sqs-helper/actions/workflows/ci-cd.yml)
[![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-sqs-helper/branch/master/graph/badge.svg?token=KA021SKDXO)](https://codecov.io/gh/kbrashears5/typescript-aws-sqs-helper)
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
import * as SQS from '@aws-sdk/client-sqs';

const logger = new Logger(LogLevel.Trace);

const options: SQS.SQSClientConfig = {
  accessKeyId: '{access_key}',
  secretAccessKey: '{secret_key}',
  region: 'us-east-1',
};

const repository = new SQS.SQS(options);

const helper = new SQSHelper(logger, repository);

const response = await helper.DeleteMessageAsync('queueUrl', 'receiptHandle');
```

## Notes

If no options are supplied, will default to `us-east-1` as the region

## Development

Clone the latest and run

```npm
npm run prep
```

to install packages and prep the git hooks
