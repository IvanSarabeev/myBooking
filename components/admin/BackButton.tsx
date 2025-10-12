"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  label?: string;
  className?: string;
};

const BackButton: FC<BackButtonProps> = ({ label = "Go back", className }) => {
  const router = useRouter();

  return (
    <Button
      type="button"
      aria-label="back button"
      title="Go back"
      onClick={() => router.back()}
      className={cn(
        "size-fit flex items-center border border-white rounded-md gap-x-1 text-dark-100 text-sm font-medium bg-transparent leading-5 cursor-pointer transition transform hover:scale-105 duration-300 hover:bg-transparent hover:border-b-primary-admin",
        className,
      )}
    >
      <ArrowLeft size={18} />
      {label}
    </Button>
  );
};

export default BackButton;
