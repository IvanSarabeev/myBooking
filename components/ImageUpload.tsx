"use client";

import React, { FC, FormEvent, useRef, useState } from "react";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/env.config";
import Image from "next/image";
import { toast } from "sonner";
import { authenticator } from "@/lib/auth/imagekitAuthenticator";

const {
  env: {
    imageKit: { urlEndpoint, publicKey },
  },
} = config;

if (!urlEndpoint || !publicKey) {
  throw new Error("ImageKit URL endpoint or public key is not defined");
}

type Props = {
  onFileChange: (filePath: string) => void;
};

const ImageUpload: FC<Props> = ({ onFileChange }) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  /**
   * Callback function to handle errors during an operation.
   *
   * @param {any} error - The error object or message that needs to be handled.
   */
  const onError = (error: any) => {
    console.error(error);

    toast("Image upload failed, please try again!", {
      description: `Your image could not be uploaded. Please try again.`,
    });
  };

  /**
   * Callback function to be executed upon the successful completion of an operation.
   *
   * @param {any} response - The response object returned from the operation.
   */
  const onSuccess = (response: any) => {
    setFile(response);

    onFileChange(response.filePath);

    toast("Image uploaded successfully!", {
      description: `${response.filePath} uploaded successfully!`,
      action: {
        label: "Undo",
        onClick: () => setFile(null),
      },
    });
  };

  /**
   * Handles the file upload process when triggered by a UI event.
   *
   * @param {FormEvent<HTMLButtonElement>} e - The form event triggered by clicking the button.
   */
  const handleFileUpload = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Upload the file...
    if (ikUploadRef.current) {
      // @ts-ignore
      ikUploadRef.current?.click();
    }
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
        fileName="upload.png"
      />

      <button
        type="button"
        className="upload-btn bg-dark-300"
        onClick={(e) => handleFileUpload(e)}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
          loading="lazy"
          decoding="async"
        />

        <p className="text-base text-light-100">Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
          loading="lazy"
          lang="en_BG"
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
