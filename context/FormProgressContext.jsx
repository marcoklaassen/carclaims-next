'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getRouteIndex, formRoutes } from '../utils/routes';

const FormProgressContext = createContext();

export const FormProgressProvider = ({ children }) => {
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (pathname) {
      const index = getRouteIndex(pathname);
      setCurrentStep(index);
    }
  }, [pathname]);

  const totalSteps = formRoutes.length;
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <FormProgressContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        totalSteps,
        progress,
      }}
    >
      {children}
    </FormProgressContext.Provider>
  );
};

export const useFormProgress = () => useContext(FormProgressContext);
