'use client';

import { useGlobalFormStore } from '@/types/state';
import { Button, FormControlLabel, FormHelperText, Radio, RadioGroup, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
dayjs.locale('de');
import { Formik, Form } from 'formik';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  FormType,
  VEHICLE_INFO_FIELDS,
  FORM_ROUTES,
  FORM_LABELS,
  createVehicleInfoValidationSchema,
} from '@/config/formConfig';
import { createVehicleInfoValues } from '@/utils/formHelpers';
import { useEffect } from 'react';

interface Props {
  formType?: FormType;
}

export default function UnifiedVehicleInfoPage({ formType: propFormType }: Props) {
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

  const fields = VEHICLE_INFO_FIELDS[formType];
  const labels = FORM_LABELS.vehicleInfo;
  const validationSchema = createVehicleInfoValidationSchema(formType);

  // Type-safe values creation
  const values = createVehicleInfoValues(globalForm, formType);

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={(formData) => {
        console.log({ VEHICLE_FORM_SUBMIT: formData, TYPE: formType });
        setGlobalForm(formData);
        router.push(FORM_ROUTES.vehicleInfo[formType]);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        errors,
        touched,
        values,
      }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <h2>{labels.title[formType]}</h2>

            <div className="form-group radio-group">
              <label>{labels.vatDeduction}</label>
              <RadioGroup
                name={fields.vatDeduction}
                row
                value={values[fields.vatDeduction] || ''}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio className="custom-radio" />}
                  label="Ja"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio className="custom-radio" />}
                  label="Nein"
                />
              </RadioGroup>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>{labels.carBrand}</label>
                <TextField
                  name={fields.carBrand}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.carBrand] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.carBrand] && touched[fields.carBrand])}
                  helperText={
                    touched[fields.carBrand] && errors[fields.carBrand]
                      ? errors[fields.carBrand]
                      : ''
                  }
                />
              </div>

              <div className="form-group-item-big">
                <label>{labels.carModel}</label>
                <TextField
                  name={fields.carModel}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.carModel] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.carModel] && touched[fields.carModel])}
                  helperText={
                    touched[fields.carModel] && errors[fields.carModel]
                      ? errors[fields.carModel]
                      : ''
                  }
                />
              </div>

              <div className="form-group-item-big">
                <label>{labels.licensePlate}</label>
                <TextField
                  name={fields.licensePlate}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.licensePlate] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.licensePlate] && touched[fields.licensePlate])}
                  helperText={
                    touched[fields.licensePlate] && errors[fields.licensePlate]
                      ? errors[fields.licensePlate]
                      : ''
                  }
                />
              </div>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>{labels.insuranceCompany}</label>
                <TextField
                  name={fields.insuranceCompany}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.insuranceCompany] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.insuranceCompany] && touched[fields.insuranceCompany])}
                  helperText={
                    touched[fields.insuranceCompany] && errors[fields.insuranceCompany]
                      ? errors[fields.insuranceCompany]
                      : ''
                  }
                />
              </div>

              <div className="form-group-item-big">
                <label>{labels.insuranceNumber}</label>
                <TextField
                  name={fields.insuranceNumber}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.insuranceNumber] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.insuranceNumber] && touched[fields.insuranceNumber])}
                  helperText={
                    touched[fields.insuranceNumber] && errors[fields.insuranceNumber]
                      ? errors[fields.insuranceNumber]
                      : ''
                  }
                />
              </div>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>{labels.chassisNumber}</label>
                <TextField
                  name={fields.chassisNumber}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.chassisNumber] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.chassisNumber] && touched[fields.chassisNumber])}
                  helperText={
                    touched[fields.chassisNumber] && errors[fields.chassisNumber]
                      ? errors[fields.chassisNumber]
                      : ''
                  }
                />
              </div>

              <div className="form-group-item-big">
                <label>{labels.odometerReading}</label>
                <TextField
                  name={fields.odometerReading}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.odometerReading] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.odometerReading] && touched[fields.odometerReading])}
                  helperText={
                    touched[fields.odometerReading] && errors[fields.odometerReading]
                      ? errors[fields.odometerReading]
                      : ''
                  }
                />
              </div>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>{labels.greenCardNumber}</label>
                <TextField
                  name={fields.greenCardNumber}
                  fullWidth
                  placeholder={FORM_LABELS.common.fillPlaceholder}
                  variant="outlined"
                  value={values[fields.greenCardNumber] || ''}
                  onChange={handleChange}
                  error={!!(errors[fields.greenCardNumber] && touched[fields.greenCardNumber])}
                  helperText={
                    touched[fields.greenCardNumber] && errors[fields.greenCardNumber]
                      ? errors[fields.greenCardNumber]
                      : ''
                  }
                />
              </div>

              <div className="form-group-item-small">
                <label>{labels.validDateGreenCard}</label>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                  <MobileDatePicker
                    value={dayjs(values[fields.validDateGreenCard]?.toString())}
                    enableAccessibleFieldDOMStructure={false}
                    onChange={(newValue) => {
                      setFieldValue(fields.validDateGreenCard, newValue);
                      setFieldTouched(fields.validDateGreenCard, true);
                    }}
                    slots={{
                      textField: (props) => {
                        return <TextField {...props} />;
                      },
                    }}
                    slotProps={{
                      textField: {
                        readOnly: true,
                        fullWidth: true,
                        variant: 'outlined',
                        placeholder: 'Datum auswählen',
                        error: !!(
                          errors[fields.validDateGreenCard] && touched[fields.validDateGreenCard]
                        ),
                        helperText:
                          touched[fields.validDateGreenCard] && errors[fields.validDateGreenCard]
                            ? errors[fields.validDateGreenCard]
                            : null,
                      },
                    }}
                    format="DD.MM.YYYY"
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className="form-group radio-group">
              <label>{labels.allRiskInsurance}</label>
              <RadioGroup
                name={fields.allRiskInsurance}
                row
                value={values[fields.allRiskInsurance] || ''}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio className="custom-radio" />}
                  label="Ja"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio className="custom-radio" />}
                  label="Nein"
                />
              </RadioGroup>
               {touched[fields.allRiskInsurance] && errors[fields.allRiskInsurance] && (
                <FormHelperText error={true}>{String(errors[fields.allRiskInsurance])}</FormHelperText>
              )}
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
