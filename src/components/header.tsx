"use client";
import { useFormProgress } from "@/context/FormProgressContext";
import { formRoutes, getPreviousRoute } from "@/utils/routes";
import { IconButton, LinearProgress } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { brandConfig } from "@/config/brand";

const { logoUrl, logoPosition } = brandConfig;

export default function Header() {
  const router = useRouter();
  const { progress, currentStep } = useFormProgress();

  const backButton = currentStep > 0 ? (
    <IconButton
      onClick={() => router.push(getPreviousRoute(currentStep))}
      style={{ color: "white" }}
      className="back-button"
    >
      <ArrowLeft size={24} />
    </IconButton>
  ) : (
    <div style={{ width: 40 }} />
  );

  const logo = (
    <Image
      src={logoUrl}
      alt="Logo"
      width={200}
      height={44}
      className="carclaims-icon"
      style={{ height: 44, width: 'auto' }}
    />
  );

  return (
    <div className="header-container">
      <div className="form-header">
        {logoPosition === 'left' ? (
          <>
            {logo}
            <div className="header-title">{formRoutes[currentStep].name}</div>
            {backButton}
          </>
        ) : (
          <>
            {currentStep > 0 ? backButton : <div style={{ width: 40 }} />}
            <div className="header-title">{formRoutes[currentStep].name}</div>
            {logo}
          </>
        )}
      </div>
      <div className="progress-container">
        <LinearProgress variant="determinate" value={progress} />
      </div>
    </div>
  );
}
