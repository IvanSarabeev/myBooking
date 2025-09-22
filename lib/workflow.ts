import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/env.config";

const {
  env: {
    qStash: { url, token },
    resendToken,
  },
} = config;

if (!url || !token || !resendToken)
  throw new Error(
    "QStash URL or token is not defined. Please check your environment variables.",
  );

export const workflowClient = new WorkflowClient({
  baseUrl: url,
  token: token,
});

export const qstashClient = new QStashClient({ token: token });

type InitialData = {
  email: string;
  subject: string;
  message: string;
};

export const sendEmail = async ({ email, subject, message }: InitialData) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: resendToken }),
    },
    body: {
      from: "Acme <onboarding@resend.com>",
      to: [email],
      subject,
      html: message,
    },
  });
};
