"use client";

import { FC } from "react";
import { IKVideo, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/env.config";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

type BookVideoProps = {
  videoUrl: string;
};

const BookVideo: FC<BookVideoProps> = ({ videoUrl }) => {
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint}>
      <IKVideo path={videoUrl} controls className="w-full rounded-xl" />
    </ImageKitProvider>
  );
};

export default BookVideo;
