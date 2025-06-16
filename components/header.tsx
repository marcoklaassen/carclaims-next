"use client";
import { useFormProgress } from "@/context/FormProgressContext";
import { formRoutes, getPreviousRoute } from "@/utils/routes";
import { IconButton, LinearProgress } from "@mui/material";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";

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
          >
            <ArrowLeft size={24} />
          </IconButton>
        )}
        <div className="header-title">{formRoutes[currentStep].name}</div>
        <IconButton className="X-button">
          <X size={24} style={{color: "white"}}/>
        </IconButton>
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
