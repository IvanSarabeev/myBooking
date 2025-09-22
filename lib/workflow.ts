import { Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/env.config";

const {
  env: {
    qStash: { url, token },
  },
} = config;

if (!url || !token)
  throw new Error(
    "QStash URL or token is not defined. Please check your environment variables.",
  );

const workflowClient = new WorkflowClient({
  baseUrl: url,
  token: token,
});

export default workflowClient;
