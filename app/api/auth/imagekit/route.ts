import { NextResponse } from "next/server";
import imagekit from "@/lib/imagekit";

/**
 * Handles a GET request and retrieves authentication parameters from ImageKit.
 *
 * @return {Promise<NextResponse>} A promise resolving to a JSON response with authentication parameters.
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
