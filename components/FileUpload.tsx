"use client";

import React, { FC, FormEvent, useRef, useState } from "react";
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/env.config";
import Image from "next/image";
import { toast } from "sonner";
import { authenticator } from "@/lib/auth/imagekitAuthenticator";
import { cn } from "@/lib/utils";

const {
  env: {
    imageKit: { urlEndpoint, publicKey },
  },
} = config;

if (!urlEndpoint || !publicKey) {
  throw new Error("ImageKit URL endpoint or public key is not defined");
}

const MAX_IMAGE_FILE_SIZE = 20 * 1024 * 1024;
const MAX_VIDEO_FILE_SIZE = 50 * 1024 * 1024;

type Props = {
  onFileChange: (filePath: string) => void;
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  value?: string;
};

const FileUpload: FC<Props> = ({
  onFileChange,
  type = "image",
  accept,
  placeholder,
  folder,
  variant,
  value,
}) => {
  const ikUploadRef = useRef(null);

  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  /**
   * Callback function to handle errors during an operation.
   *
   * @param {any} error - The error object or message that needs to be handled.
   */
  const onError = (error: any) => {
    console.error(error);

    toast(`${type} upload failed, please try again!`, {
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

    toast(`${type} uploaded successfully!`, {
      description: `${response.filePath} uploaded successfully!`,
      action: {
        label: "Undo",
        onClick: () => setFile({ filePath: null }),
      },
    });
  };

  /**
   * Validates the provided file based on its type and size.
   *
   * @param {File} file - The file to validate.
   * @returns {boolean} Returns true if the file meets the conditions, false otherwise.
   */
  const onValidate = (file: File): boolean => {
    if (type === "image") {
      if (file.size > MAX_IMAGE_FILE_SIZE) {
        toast("File size too large!", {
          description: "Please upload a file that is less than 200MB in size.",
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size > MAX_VIDEO_FILE_SIZE) {
        toast("File size too large!", {
          description: "Please upload a file that is less than 200MB in size.",
        });

        return false;
      }
    }

    return true;
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
        useUniqueFileName
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);

          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />

      <button
        type="button"
        className={cn("upload-btn", styles.button)}
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

        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

        {file && (
          <p className={cn("upload-filename truncate", styles.text)}>
            {file.filePath}
          </p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}` }}>
            {progress}% uploaded
          </div>
        </div>
      )}

      {file &&
        file.filePath &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath || ""}
            path={file.filePath || ""}
            width={500}
            height={300}
            loading="lazy"
            lang="en_BG"
          />
        ) : type === "video" ? (
          <IKVideo
            path={file?.filePath || ""}
            controls
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
