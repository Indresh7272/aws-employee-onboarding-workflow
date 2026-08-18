import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {
    SFNClient,
    StartExecutionCommand
} from "@aws-sdk/client-sfn";

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);
const sfn = new SFNClient({});

const STATE_MACHINE_ARN =
    "arn:aws:states:<region>:<account-id>:stateMachine:<onboarding-workflow-name>";

export const handler = async (event) => {
    try {
        console.log("Received event:", JSON.stringify(event));

        const body =
            typeof event.body === "string"
                ? JSON.parse(event.body)
                : event.body || event;

        const {
            employeeId,
            name,
            email,
            department,
            employmentType,
            joiningDate,
            manager,
            onboardingStatus
        } = body;

        if (!employeeId) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "employeeId is required"
                })
            };
        }

        const item = {
            employeeId,
            name: name || "",
            email: email || "",
            department: department || "",
            employmentType: employmentType || "",
            joiningDate: joiningDate || "",
            manager: manager || "",
            onboardingStatus: onboardingStatus || "Pending",
            createdAt: new Date().toISOString()
        };

        // Save employee record
        await dynamodb.send(
            new PutCommand({
                TableName: "<employee-onboarding-table>",
                Item: item
            })
        );

        console.log("Employee saved to DynamoDB:", employeeId);

        // Only API Gateway requests should start Step Functions.
        // Step Functions -> Lambda must NOT start Step Functions again.
        const isApiGatewayRequest = !!event.requestContext;

        if (isApiGatewayRequest) {
            const executionInput = {
                body: JSON.stringify(item)
            };

            const execution = await sfn.send(
                new StartExecutionCommand({
                    stateMachineArn: STATE_MACHINE_ARN,
                    input: JSON.stringify(executionInput)
                })
            );

            console.log(
                "Step Functions execution started:",
                execution.executionArn
            );

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message:
                        "Employee onboarding record created and workflow started successfully",
                    employee: item,
                    executionArn: execution.executionArn
                })
            };
        }

        // Called from Step Functions — do NOT start another execution
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Employee onboarding record processed successfully",
                employee: item
            })
        };

    } catch (error) {
        console.error("Error:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Failed to create employee onboarding record",
                error: error.message
            })
        };
    }
};
