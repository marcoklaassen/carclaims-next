'use client';

import { useGlobalFormStore } from '@/types/state';
import { parseAddress } from '@/utils/adress';
import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  RadioGroup,
  Select,
  Radio,
  TextField,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FormType, DRIVER_INFO_FIELDS, FORM_ROUTES, FORM_LABELS } from '@/config/formConfig';
import { createDriverInfoValues } from '@/utils/formHelpers';

interface Props {
  formType?: FormType;
}

export default function UnifiedDriverInfoPage({ formType: propFormType }: Props) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fallback: erkenne formtype aus URL
  const formType: FormType =
    propFormType ||
    (typeof window !== 'undefined' && window.location.pathname.includes('/b') ? 'b' : 'a');

  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  const fields = DRIVER_INFO_FIELDS[formType];
  const labels = FORM_LABELS.driverInfo;

  // Type-safe values creation
  const values = createDriverInfoValues(globalForm, formType);

  const [addressInput, setAddressInput] = useState(
    `${values[fields.streetName] || ''} ${values[fields.houseNumber] || ''}`.trim(),
  );

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={(formValues) => {
        console.log('Driver form submit - formValues:', formValues);

        setGlobalForm(formValues);
        window.scrollTo(0, 0);
        router.push(FORM_ROUTES.driverInfo[formType]);
      }}
    >
      {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <h2>{labels.title[formType]}</h2>

            <div className="form-group radio-group">
              <label>{labels.isInsuredDriver[formType]}</label>
              <RadioGroup
                name={fields.isInsuredDriver}
                row
                value={values[fields.isInsuredDriver] || ''}
                onChange={handleChange}
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

            <div className="form-group">
              <label>{labels.salutation}</label>
              <FormControl fullWidth variant="outlined">
                <Select
                  name={fields.salutation}
                  displayEmpty
                  value={values[fields.salutation] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.salutation] && touched[fields.salutation])}
                  renderValue={(selected) => {
                    if (selected === '') {
                      return (
                        <span
                          style={{
                            color: 'rgba(0, 0, 0, 0.87) !important',
                            opacity: '0.5',
                          }}
                        >
                          {FORM_LABELS.common.selectPlaceholder}
                        </span>
                      );
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="">{FORM_LABELS.common.selectPlaceholder}</MenuItem>
                  <MenuItem value="Herr">{FORM_LABELS.common.salutations.mr}</MenuItem>
                  <MenuItem value="Frau">{FORM_LABELS.common.salutations.mrs}</MenuItem>
                </Select>
                {errors[fields.salutation] && touched[fields.salutation] && (
                  <div className="error-message">{errors[fields.salutation]}</div>
                )}
              </FormControl>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>{labels.surName}</label>
                <TextField
                  name={fields.surName}
                  autoComplete="family-name"
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.surName] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.surName] && touched[fields.surName])}
                  helperText={
                    touched[fields.surName] && errors[fields.surName] ? errors[fields.surName] : ''
                  }
                />
              </div>

              <div className="form-group-item-big">
                <label>{labels.name}</label>
                <TextField
                  name={fields.name}
                  autoComplete="given-name"
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.name] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.name] && touched[fields.name])}
                  helperText={
                    touched[fields.name] && errors[fields.name] ? errors[fields.name] : ''
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>{labels.streetAndNumber}</label>
              <TextField
                name="address"
                fullWidth
                placeholder={FORM_LABELS.common.fillPlaceholder}
                variant="outlined"
                value={addressInput}
                onInput={(e) => {
                  const value = (e.target as HTMLInputElement).value ?? '';
                  setAddressInput(value);
                  const { streetName, houseNumber } = parseAddress(value);
                  setFieldValue(fields.streetName, streetName);
                  setFieldValue(fields.houseNumber, houseNumber);
                }}
                error={
                  !!(
                    (errors[fields.streetName] && touched[fields.streetName]) ||
                    (errors[fields.houseNumber] && touched[fields.houseNumber])
                  )
                }
                helperText={
                  (touched[fields.streetName] && errors[fields.streetName]) ||
                  (touched[fields.houseNumber] && errors[fields.houseNumber]) ||
                  ''
                }
              />
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-small">
                <label>{labels.postalCode}</label>
                <TextField
                  name={fields.postalCode}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.postalCode] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.postalCode] && touched[fields.postalCode])}
                  helperText={
                    touched[fields.postalCode] && errors[fields.postalCode]
                      ? errors[fields.postalCode]
                      : ''
                  }
                />
              </div>
              <div className="form-group-item-big">
                <label>{labels.city}</label>
                <TextField
                  name={fields.city}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.city] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.city] && touched[fields.city])}
                  helperText={
                    touched[fields.city] && errors[fields.city] ? errors[fields.city] : ''
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>{labels.telephone}</label>
              <TextField
                name={fields.telephone}
                fullWidth
                placeholder={FORM_LABELS.common.fillPlaceholder}
                variant="outlined"
                value={values[fields.telephone] || ''}
                onChange={handleChange}
                error={!!(errors[fields.telephone] && touched[fields.telephone])}
                helperText={
                  touched[fields.telephone] && errors[fields.telephone]
                    ? errors[fields.telephone]
                    : ''
                }
              />
            </div>

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
                  touched[fields.licenseIssuingAuthority] && errors[fields.licenseIssuingAuthority]
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
      )}
    </Formik>
  );
}
