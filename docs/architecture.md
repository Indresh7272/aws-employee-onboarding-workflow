# Architecture Notes

## Scope

This document describes only the AWS components relevant to my contribution.

## High-Level Flow

```text
                +----------------------+
                | Employee Onboarding  |
                | Input / Application  |
                +----------+-----------+
                           |
                           v
                +----------------------+
                | AWS Step Functions   |
                | Standard Workflow    |
                +----------+-----------+
                           |
                           v
                +----------------------+
                | AWS Lambda           |
                | Employee Processing   |
                +----------+-----------+
                           |
                           v
                +----------------------+
                | Amazon DynamoDB      |
                | Status Update        |
                +----------------------+

Frontend Deployment:

Static Frontend
      |
      v
Amazon S3
      |
      v
S3 Website Endpoint
```

## Step Functions Stages

1. Process employee onboarding
2. Update onboarding status in DynamoDB
3. IT provisioning stage
4. Policy sign-off stage
5. Manager introduction stage
6. Workflow completion

## Retry Handling

The Lambda task includes retry handling for service, SDK, and throttling-related Lambda errors, with exponential backoff and jitter.

## Sanitization

This document intentionally avoids real account IDs, resource ARNs, bucket names, employee information, credentials, and internal endpoints.
