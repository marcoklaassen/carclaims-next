'use client';
import { useGlobalFormStore, CarclaimsDetailsState } from '@/types/state';
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
dayjs.locale('de');
import { Formik, Form } from 'formik';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import React from 'react';
// import * as Yup from 'yup';

export default function AccidentInfoPage() {
  const router = useRouter();

  const globalForm = useGlobalFormStore(s => s.form);
  const setGlobalForm = useGlobalFormStore(s => s.setGlobalForm);

  const values: CarclaimsDetailsState = {
    language: globalForm.language || '',
    accidentReportNumber: globalForm.accidentReportNumber || '',
    accidentDate: globalForm.accidentDate ?? dayjs(),
    accidentTime: globalForm.accidentTime ?? dayjs(),
  };

  // const carclaimsDatailsValidator = Yup.object().shape({
  //   language: Yup.string().required('Gesetzte Sprache erforderlich'),
  //   accidentDate: Yup.date().required('Datum des Unfalls erforderlich'),
  //   accidentTime: Yup.date().required('Zeit des Unfalls erforderlich'),
  //   accidentReportNumber: Yup.string().required(
  //     'Die Schadensnummer darf nicht leer sein',
  //   ),
  // });

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={formData => {
        console.log({ ACCIDENTINFO_FORM_SUBMIT: formData });

        setGlobalForm(formData);
        router.push('/frida-carclaims/accidentlocation');
      }}
      // validationSchema={carclaimsDatailsValidator}
    >
      {({
        handleChange,
        handleSubmit,
        errors,
        touched,
        values,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <div className="form-group">
              <label>Sprache wählen:</label>
              <FormControl
                fullWidth
                variant="outlined"
                error={touched.language && Boolean(errors.language)}
              >
                <Select
                  name="language"
                  value={values.language}
                  displayEmpty
                  onChange={handleChange}
                  renderValue={selected => {
                    if (selected === '') {
                      return (
                        <span
                          style={{
                            color: 'rgba(0, 0, 0, 0.87) !important',
                            opacity: '0.5',
                          }}
                        >
                          Bitte auswählen
                        </span>
                      );
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="">Bitte auswählen</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Deutsch">Deutsch</MenuItem>
                  <MenuItem value="Français">Français</MenuItem>
                </Select>
                {touched.language && errors.language && (
                  <FormHelperText>{errors.language}</FormHelperText>
                )}
              </FormControl>
            </div>

            <div className="form-group">
              <label>Bearbeitungsnr. des Unfallberichts:</label>
              <TextField
                name="accidentReportNumber"
                fullWidth
                placeholder="Bitte ausfüllen"
                variant="outlined"
                value={values.accidentReportNumber}
                onChange={handleChange}
                error={
                  touched.accidentReportNumber && Boolean(errors.accidentReportNumber)
                }
                helperText={touched.accidentReportNumber && errors.accidentReportNumber}
              />
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>Unfall-Datum:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                  <MobileDatePicker
                    value={values.accidentDate}
                    enableAccessibleFieldDOMStructure={false}
                    onChange={newValue => {
                      setFieldValue('accidentDate', newValue);
                      setFieldTouched('accidentDate', true);
                    }}
                    slots={{
                      textField: props => {
                        return <TextField {...props} />;
                      },
                    }}
                    slotProps={{
                      textField: {
                        readOnly: true,
                        fullWidth: true,
                        variant: 'outlined',
                        placeholder: 'Datum auswählen',
                        error: !!(errors.accidentDate && touched.accidentDate),
                        helperText:
                          touched.accidentDate && errors.accidentDate
                            ? errors.accidentDate
                            : null,
                      },
                    }}
                    format="DD.MM.YYYY"
                  />
                </LocalizationProvider>
              </div>
              <div className="form-group-item-big">
                <label>Unfall-Uhrzeit:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                  <MobileTimePicker
                    value={values.accidentTime}
                    enableAccessibleFieldDOMStructure={false}
                    onChange={newValue => {
                      setFieldValue('accidentTime', newValue);
                      setFieldTouched('accidentTime', true);
                    }}
                    slots={{
                      textField: props => {
                        return <TextField {...props} />;
                      },
                    }}
                    slotProps={{
                      textField: {
                        readOnly: true,
                        fullWidth: true,
                        variant: 'outlined',
                        placeholder: 'Uhrzeit auswählen',
                        error: !!(errors.accidentTime && touched.accidentTime),
                        helperText:
                          touched.accidentTime && errors.accidentTime
                            ? errors.accidentTime
                            : null,
                      },
                    }}
                    ampm={false}
                    format="HH:mm"
                    minutesStep={5}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <div className="navigation-container">
            <Button type="submit" variant="contained" className="next-button">
              Weiter
              <ArrowRight size={'20'} />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
