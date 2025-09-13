import ImageKit from "imagekit";
import config from "@/lib/env.config";
import { NextResponse } from "next/server";

const {
  env: {
    imageKit: { urlEndpoint, publicKey, privateKey },
  },
} = config;

if (!urlEndpoint || !publicKey || !privateKey) {
  throw new Error(
    "ImageKit URL endpoint, public key or private key is not defined",
  );
}

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

/**
 * Handles a GET request and retrieves authentication parameters from ImageKit.
 *
 * @return {Promise<NextResponse>} A promise resolving to a JSON response with authentication parameters.
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
