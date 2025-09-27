import config from "@/lib/env.config";
import ImageKit from "imagekit";

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

export default imagekit;
