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

              {/* Persönliche Daten des Fahrers */}
              <div className="form-group">
                <h3>Persönliche Daten des Fahrers</h3>
              </div>

              {isInsuredDriver ? (
                /* Anzeige der bereits erfassten Versicherungsnehmer-Daten */
                <div className="insurance-holder-display">
                  <div className="form-group">
                    <label>Anrede:</label>
                    <div className="display-value">
                      {formType === 'a'
                        ? globalForm.insuranceHolderSalutation
                        : globalForm.otherInsuranceHolderSalutation}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Nach- und Vorname:</label>
                    <div className="display-value">
                      {formType === 'a'
                        ? `${globalForm.insuranceHolderSurName}, ${globalForm.insuranceHolderName}`
                        : `${globalForm.otherInsuranceHolderSurName}, ${globalForm.otherInsuranceHolderName}`}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Anschrift:</label>
                    <div className="display-value">
                      {formType === 'a'
                        ? `${globalForm.insuranceHolderStreetName} ${globalForm.insuranceHolderHouseNumber}, ${globalForm.insuranceHolderPostalCode} ${globalForm.insuranceHolderCity}`
                        : `${globalForm.otherInsuranceHolderStreetName} ${globalForm.otherInsuranceHolderHouseNumber}, ${globalForm.otherInsuranceHolderPostalCode} ${globalForm.otherInsuranceHolderCity}`}
                    </div>
                  </div>

                  {(formType === 'a'
                    ? globalForm.insuranceHolderTelephone
                    : globalForm.otherInsuranceHolderTelephone) && (
                    <div className="form-group">
                      <label>Telefon:</label>
                      <div className="display-value">
                        {formType === 'a'
                          ? globalForm.insuranceHolderTelephone
                          : globalForm.otherInsuranceHolderTelephone}
                      </div>
                    </div>
                  )}

                  {(formType === 'a'
                    ? globalForm.insuranceHolderEmail
                    : globalForm.otherInsuranceHolderEmail) && (
                    <div className="form-group">
                      <label>E-Mail:</label>
                      <div className="display-value">
                        {formType === 'a'
                          ? globalForm.insuranceHolderEmail
                          : globalForm.otherInsuranceHolderEmail}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Eingabefelder für separate Fahrer-Daten */
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
