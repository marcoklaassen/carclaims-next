'use client';

import { useGlobalFormStore } from '@/types/state';
import { Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  FormType,
  PERSONAL_INFO_FIELDS,
  FORM_ROUTES,
  FORM_LABELS,
  createPersonalInfoValidationSchema,
} from '@/config/formConfig';
import { createPersonalInfoValues } from '@/utils/formHelpers';
import PersonalInfoFields from './PersonalInfoFields';


interface Props {
  formType?: FormType;
}

export default function UnifiedPersonalInfoPage({ formType: propFormType }: Props) {
  const router = useRouter();

  // Fallback: verwende den type aus der URL
  const formType: FormType =
    propFormType ||
    (typeof window !== 'undefined' && window.location.pathname.includes('/b') ? 'b' : 'a');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  const fields = PERSONAL_INFO_FIELDS[formType];
  const labels = FORM_LABELS.personalInfo;

  const validationSchema = createPersonalInfoValidationSchema(formType);
  const values = createPersonalInfoValues(globalForm, formType);

  // Helper function to get field prefix for PersonalInfoFields
  const getFieldPrefix = (type: FormType) => {
    return type === 'a' ? 'insuranceHolder' : 'otherInsuranceHolder';
  };

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={(formData) => {
        console.log({ PERSONALINFO_FORM_SUBMIT: formData, TYPE: formType });
        setGlobalForm(formData);
        router.push(FORM_ROUTES.personalInfo[formType]);
      }}
    >
      {({ handleChange, handleSubmit, errors, touched, values, setFieldValue }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <h2>{labels.title[formType]}</h2>

            <PersonalInfoFields
              fieldPrefix={getFieldPrefix(formType)}
              formValues={values}
              handleChange={handleChange}
              errors={errors}
              touched={touched}
              onAddressChange={(streetName, houseNumber) => {
                setFieldValue(fields.streetName, streetName);
                setFieldValue(fields.houseNumber, houseNumber);
              }}
            />
          </div>

          <div className="navigation-container">
            <Button type="submit" variant="contained" className="next-button">
              {FORM_LABELS.common.nextButton}
              <ArrowRight size={'20'} />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
