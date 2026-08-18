# Employee Identity & Records — Lambda

This folder contains a sanitized portfolio version of the Lambda function I worked on for employee identity and onboarding records.

## Responsibilities Demonstrated

- Accept employee onboarding input from an API Gateway-style event.
- Validate the required `employeeId`.
- Build an employee record with onboarding metadata.
- Persist the employee record to DynamoDB using the AWS SDK for JavaScript.
- Start an AWS Step Functions execution for API Gateway-originated requests.
- Prevent recursive Step Functions execution when the Lambda is invoked by the workflow itself.
- Return appropriate success and error responses.

## AWS SDK Components

The function uses:

- `@aws-sdk/client-dynamodb`
- `@aws-sdk/lib-dynamodb`
- `@aws-sdk/client-sfn`

## Request Flow

```text
API Gateway request
        |
        v
Employee Identity Lambda
        |
        +----> Validate employeeId
        |
        +----> Save employee record to DynamoDB
        |
        +----> Start Step Functions execution
        |
        v
Return response
```

When the same Lambda is invoked from Step Functions, it processes the record without starting another Step Functions execution. This prevents recursive workflow execution.

## Sanitization

The following project-specific values were replaced with placeholders:

- AWS region
- AWS account ID
- Step Functions state machine name/ARN
- DynamoDB table name

No credentials, tokens, employee data, or private endpoints are included.
