# AWS Employee Onboarding — My Cloud Contribution

> Sanitized portfolio representation of my individual AWS work on an employee onboarding project.

This repository focuses only on the AWS responsibilities I personally handled. It intentionally excludes teammates' application/backend implementations and removes environment-specific identifiers.

## My Contribution

### 1. AWS Step Functions
- Created and configured the employee onboarding state machine.
- Orchestrated employee onboarding processing through sequential workflow states.
- Integrated the workflow with a Lambda task for employee processing.
- Added a DynamoDB status-update task.
- Configured retry handling for Lambda service, SDK, and throttling-related errors.
- Used JSONata for state-machine data transformation.

### 2. Employee Identity & Records
- Worked on the employee identity and employee-record portion of the onboarding solution.
- The workflow passes employee onboarding input to the identity-processing Lambda and updates onboarding status in DynamoDB.
- Project-specific implementation details are intentionally not published here.

### 3. Amazon S3 Static Website Hosting
- Created/configured a dedicated S3 bucket for frontend hosting.
- Uploaded the provided static frontend assets.
- Enabled S3 static website hosting.
- Configured website access through the bucket policy.
- Validated the deployed S3 website endpoint.

> The frontend source itself is not included here because the frontend application code was developed by other team members. This repository documents my hosting/deployment contribution instead.

## Workflow

```text
Start
  |
  v
ProcessEmployeeOnboarding (Lambda)
  |
  v
DynamoDB UpdateItem
  |
  v
ITProvisioning
  |
  v
PolicySignoff
  |
  v
ManagerIntro
  |
  v
WorkflowComplete
  |
  v
End
```

## AWS Services Demonstrated

- AWS Step Functions
- AWS Lambda
- Amazon DynamoDB
- Amazon S3

## Repository Contents

```text
aws-employee-onboarding-portfolio/
├── README.md
├── step-functions/
│   └── onboarding-workflow.json
├── employee-identity/
│   └── README.md
├── s3-hosting/
│   └── README.md
└── docs/
    └── architecture.md
```

## Security / Sanitization

The portfolio version does **not** contain:
- AWS account IDs
- Real Lambda ARNs
- Real DynamoDB table names
- Access keys or secret keys
- Passwords or tokens
- Employee/customer data
- Internal API endpoints
- Other team members' source code

Resource identifiers in the Step Functions definition are represented using placeholders such as `<account-id>` and `<employee-onboarding-table>`.

## Note

This is a sanitized portfolio representation and is not intended to reproduce or expose the original project's complete source code or infrastructure configuration.
