'use client';

import { useGlobalFormStore } from '@/types/state';
import { Button, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Formik, Form } from 'formik';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  FormType,
  DRIVER_INFO_FIELDS,
  FORM_ROUTES,
  FORM_LABELS,
  createDriverInfoValidationSchema,
} from '@/config/formConfig';
import { createDriverInfoValues } from '@/utils/formHelpers';
import PersonalInfoFields from './PersonalInfoFields';
import './UnifiedDriverInfoPage.css';

interface Props {
  formType?: FormType;
}

export default function UnifiedDriverInfoPage({ formType: propFormType }: Props) {
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

  const fields = DRIVER_INFO_FIELDS[formType];
  const labels = FORM_LABELS.driverInfo;

  const validationSchema = createDriverInfoValidationSchema(formType);
  const values = createDriverInfoValues(globalForm, formType);

  // Helper function for displaying values
  const displayValue = (value: string | undefined) => {
    return value ? <span className="display-value">{value}</span> : <span className="display-value-empty">-</span>;
  };

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={(formData) => {
        console.log({ DRIVERINFO_FORM_SUBMIT: formData, TYPE: formType });
        setGlobalForm(formData);
        router.push(FORM_ROUTES.driverInfo[formType]);
      }}
    >
      {({ handleChange, handleSubmit, errors, touched, values, setFieldValue }) => {
        const isInsuredDriver = values[fields.isInsuredDriver] === 'true';

        return (
          <Form onSubmit={handleSubmit} className="form-wrapper">
            <div className="form-content">
              <h2>{labels.title[formType]}</h2>

              {/* Ist der Versicherungsnehmer auch der Fahrer? */}
              <div className="form-group radio-group">
                <label>{labels.isInsuredDriver[formType]}</label>
                <RadioGroup
                  name={fields.isInsuredDriver}
                  row
                  value={values[fields.isInsuredDriver] || ''}
                  onChange={(event) => {
                    const selectedValue = event.target.value;
                    handleChange(event);

                    if (selectedValue === 'true') {
                      if (formType === 'a') {
                        setFieldValue(
                          fields.salutation,
                          globalForm.insuranceHolderSalutation || '',
                        );
                        setFieldValue(fields.surName, globalForm.insuranceHolderSurName || '');
                        setFieldValue(fields.name, globalForm.insuranceHolderName || '');
                        setFieldValue(
                          fields.streetName,
                          globalForm.insuranceHolderStreetName || '',
                        );
                        setFieldValue(
                          fields.houseNumber,
                          globalForm.insuranceHolderHouseNumber || '',
                        );
                        setFieldValue(
                          fields.postalCode,
                          globalForm.insuranceHolderPostalCode || '',
                        );
                        setFieldValue(fields.city, globalForm.insuranceHolderCity || '');
                        setFieldValue(fields.telephone, globalForm.insuranceHolderTelephone || '');
                        setFieldValue(fields.email, globalForm.insuranceHolderEmail || '');
                      } else {
                        setFieldValue(
                          fields.salutation,
                          globalForm.otherInsuranceHolderSalutation || '',
                        );
                        setFieldValue(fields.surName, globalForm.otherInsuranceHolderSurName || '');
                        setFieldValue(fields.name, globalForm.otherInsuranceHolderName || '');
                        setFieldValue(
                          fields.streetName,
                          globalForm.otherInsuranceHolderStreetName || '',
                        );
                        setFieldValue(
                          fields.houseNumber,
                          globalForm.otherInsuranceHolderHouseNumber || '',
                        );
                        setFieldValue(
                          fields.postalCode,
                          globalForm.otherInsuranceHolderPostalCode || '',
                        );
                        setFieldValue(fields.city, globalForm.otherInsuranceHolderCity || '');
                        setFieldValue(
                          fields.telephone,
                          globalForm.otherInsuranceHolderTelephone || '',
                        );
                        setFieldValue(fields.email, globalForm.otherInsuranceHolderEmail || '');
                      }
                    } else if (selectedValue === 'false') {
                      setFieldValue(fields.salutation, '');
                      setFieldValue(fields.surName, '');
                      setFieldValue(fields.name, '');
                      setFieldValue(fields.streetName, '');
                      setFieldValue(fields.houseNumber, '');
                      setFieldValue(fields.postalCode, '');
                      setFieldValue(fields.city, '');
                      setFieldValue(fields.telephone, '');
                      setFieldValue(fields.email, '');
                    }
                  }}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio className="custom-radio" />}
                    label={FORM_LABELS.common.yes}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio className="custom-radio" />}
                    label={FORM_LABELS.common.no}
                  />
                </RadioGroup>
                {errors[fields.isInsuredDriver] && touched[fields.isInsuredDriver] && (
                  <div className="error-message">{errors[fields.isInsuredDriver]}</div>
                )}
              </div>

              {isInsuredDriver ? (
                /* Anzeige der bereits erfassten Versicherungsnehmer-Daten */
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Titel:</span>{displayValue(formType === 'a' ? globalForm.insuranceHolderTitle : globalForm.otherInsuranceHolderTitle)}</div>
                  <div className='display-row'><span className='display-label'>Anrede:</span>{displayValue(formType === 'a' ? globalForm.insuranceHolderSalutation : globalForm.otherInsuranceHolderSalutation)}</div>
                  <div className='display-row'><span className='display-label'>Name:</span>{displayValue(formType === 'a' ? globalForm.insuranceHolderName : globalForm.otherInsuranceHolderName)}</div>
                  <div className='display-row'><span className='display-label'>Nachname:</span>{displayValue(formType === 'a' ? globalForm.insuranceHolderSurName : globalForm.otherInsuranceHolderSurName)}</div>
                  <div className='display-row'><span className='display-label'>Straße:</span>{displayValue(formType === 'a' ? globalForm.insuranceHolderStreetName : globalForm.otherInsuranceHolderStreetName)}</div>
                  <div className='display-row'><span className='display-label'>Hausnummer:</span>{displayValue(formType === 'a' ? globalForm.insuranceHolderHouseNumber : globalForm.otherInsuranceHolderHouseNumber)}</div>
                  <div className='display-row'><span className='display-label'>PLZ:</span>{displayValue(formType === 'a' ? globalForm.insuranceHolderPostalCode : globalForm.otherInsuranceHolderPostalCode)}</div>
                  <div className='display-row'><span className='display-label'>Ort:</span>{displayValue(formType === 'a' ? globalForm.insuranceHolderCity : globalForm.otherInsuranceHolderCity)}</div>
                  <div className='display-row'><span className='display-label'>Telefon:</span>{displayValue(formType === 'a' ? globalForm.insuranceHolderTelephone : globalForm.otherInsuranceHolderTelephone)}</div>
                  <div className='display-row'><span className='display-label'>Email:</span>{displayValue(formType === 'a' ? globalForm.insuranceHolderEmail : globalForm.otherInsuranceHolderEmail)}</div>
                </div>
              ) : (
                <>
                  {/* Persönliche Daten des Fahrers */}
                  <div className="form-group">
                    <h3>Persönliche Daten des Fahrers</h3>
                  </div>

                  {/* Eingabefelder für separate Fahrer-Daten */}
                  <PersonalInfoFields
                    fieldPrefix={formType === 'a' ? 'driver' : 'otherDriver'}
                    formValues={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    onAddressChange={(streetName, houseNumber) => {
                      setFieldValue(fields.streetName, streetName);
                      setFieldValue(fields.houseNumber, houseNumber);
                    }}
                  />
                </>
              )}

              {/* Driver-spezifische Felder */}
              <div className="form-group">
                <label>{labels.driverLicense}</label>
                <TextField
                  name={fields.driverLicense}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.driverLicense] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.driverLicense] && touched[fields.driverLicense])}
                  helperText={
                    touched[fields.driverLicense] && errors[fields.driverLicense]
                      ? errors[fields.driverLicense]
                      : ''
                  }
                  autoComplete={"off"}
                />
              </div>

              <div className="form-group">
                <label>{labels.licenseIssuingAuthority}</label>
                <TextField
                  name={fields.licenseIssuingAuthority}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.licenseIssuingAuthority] || ''}
                  onChange={handleChange}
                  error={
                    !!(
                      errors[fields.licenseIssuingAuthority] &&
                      touched[fields.licenseIssuingAuthority]
                    )
                  }
                  helperText={
                    touched[fields.licenseIssuingAuthority] &&
                    errors[fields.licenseIssuingAuthority]
                      ? errors[fields.licenseIssuingAuthority]
                      : ''
                  }
                  autoComplete={"off"}
                />
              </div>
            </div>

            <div className="navigation-container">
              <Button type="submit" variant="contained" className="next-button">
                {FORM_LABELS.common.nextButton}
                <ArrowRight size={'20'} />
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
