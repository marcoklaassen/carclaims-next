"use client";
import { useFormProgress } from "@/context/FormProgressContext";
import { formRoutes, getPreviousRoute } from "@/utils/routes";
import { IconButton, LinearProgress } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  const { progress, currentStep } = useFormProgress();

  return (
    <div className="header-container">
      <div className="form-header">
        {currentStep > 0 && (
          <IconButton
            onClick={() => router.push(getPreviousRoute(currentStep))}
            style={{color: "white"}}
            className="back-button"
          >
            <ArrowLeft size={24} />
          </IconButton>
        )}
        <div className="header-title">
          {formRoutes[currentStep].name}
        </div>
          <Image
            src="/icon-carclaimsapi.svg"
            alt="CarClaims API"
            width={45}
            height={45}
            className="carclaims-icon"
          />
      </div>

      <div className="progress-container">
        <LinearProgress
          variant="determinate"
          value={progress}
        />
      </div>
    </div>
  );
}
