import config from "@/lib/env.config";

const {
  env: {
    apiServer: { url },
  },
} = config;

if (!url) {
  throw new Error("API server URL is not defined");
}

/**
 * An asynchronous function that authenticates the user with an external API service. The function
 * retrieves a signature, expiration time, and token for authentication.
 *
 * @throws {Error} If the API server URL is not defined in configuration.
 * @throws {Error} If the fetch request fails or returns a non-OK HTTP status.
 * @throws {Error} If an unexpected error is encountered during the request.
 *
 * @return {Promise<{signature: string, expire: number, token: string}>} A promise that resolves with
 * an object containing the authentication signature, expiration time, and token.
 */
export const authenticator = async (): Promise<{
  signature: string;
  expire: number;
  token: string;
}> => {
  try {
    const response = await fetch(`${url}/api/auth/imagekit`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const message = await response.text();

      throw new Error(
        `Request failed with status: ${response.status} , ${message}`,
      );
    }

    const { signature, expire, token } = await response.json();

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
