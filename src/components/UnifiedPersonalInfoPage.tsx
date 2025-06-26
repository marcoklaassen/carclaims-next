'use client';

import { useGlobalFormStore } from '@/types/state';
import { parseAddress } from '@/utils/adress';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FormType,
  PERSONAL_INFO_FIELDS,
  FORM_ROUTES,
  FORM_LABELS,
  createPersonalInfoValidationSchema,
} from '@/config/formConfig';
import { createPersonalInfoValues } from '@/utils/formHelpers';

interface Props {
  formType?: FormType;
}

export default function UnifiedPersonalInfoPage({ formType: propFormType }: Props) {
  const router = useRouter();

  // Fallback: verwende den type aus der URL
  const formType: FormType =
    propFormType ||
    (typeof window !== 'undefined' && window.location.pathname.includes('/b')
      ? 'b'
      : 'a');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const globalForm = useGlobalFormStore(s => s.form);
  const setGlobalForm = useGlobalFormStore(s => s.setGlobalForm);

  const fields = PERSONAL_INFO_FIELDS[formType];
  const labels = FORM_LABELS.personalInfo;

  const validationSchema = createPersonalInfoValidationSchema(formType);
  const values = createPersonalInfoValues(globalForm, formType);

  const [addressInput, setAddressInput] = useState(
    `${values[fields.streetName] || ''} ${values[fields.houseNumber] || ''}`.trim(),
  );

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={formValues => {
        console.log('Form submit - formValues:', formValues);
        setGlobalForm(formValues);
        router.push(FORM_ROUTES.personalInfo[formType]);
      }}
    >
      {({ handleChange, handleSubmit, errors, touched, values, setFieldValue }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <h2>{labels.title[formType]}</h2>

            <div className="form-group">
              <label>{labels.salutation}</label>
              <FormControl fullWidth variant="outlined">
                <Select
                  name={fields.salutation}
                  displayEmpty
                  value={values[fields.salutation] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.salutation] && touched[fields.salutation])}
                  renderValue={selected => {
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
                    touched[fields.surName] && errors[fields.surName]
                      ? errors[fields.surName]
                      : ''
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
                onInput={e => {
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
              <label>{labels.email}</label>
              <TextField
                name={fields.email}
                fullWidth
                placeholder={FORM_LABELS.common.fillPlaceholder}
                variant="outlined"
                value={values[fields.email] || ''}
                onChange={handleChange}
                error={!!(errors[fields.email] && touched[fields.email])}
                helperText={
                  touched[fields.email] && errors[fields.email]
                    ? errors[fields.email]
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
