'use client';

import { OtherInsuranceHolderFormState, useGlobalFormStore } from '@/types/state';
import { parseAddress } from '@/utils/adress';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PersonalInfoPage() {
  const router = useRouter();

  const globalForm = useGlobalFormStore(s => s.form);
  const setGlobalForm = useGlobalFormStore(s => s.setGlobalForm);

  const values: OtherInsuranceHolderFormState = {
    otherInsuranceHolderSalutation: globalForm.otherInsuranceHolderSalutation || '',
    otherInsuranceHolderName: globalForm.otherInsuranceHolderName || '',
    otherInsuranceHolderSurName: globalForm.otherInsuranceHolderSurName || '',
    otherInsuranceHolderStreetName: globalForm.otherInsuranceHolderStreetName || '',
    otherInsuranceHolderHouseNumber: globalForm.otherInsuranceHolderHouseNumber || '',
    otherInsuranceHolderPostalCode: globalForm.otherInsuranceHolderPostalCode || '',
    otherinsuranceHolderCity: globalForm.otherinsuranceHolderCity || '',
    otherInsuranceHolderTelephone: globalForm.otherInsuranceHolderTelephone || '',
    otherInsuranceHolderEmail: globalForm.otherInsuranceHolderEmail || '',
  };

  const [addressInput, setAddressInput] = useState(
    `${values.otherInsuranceHolderStreetName || ''} ${
      values.otherInsuranceHolderHouseNumber || ''
    }`.trim(),
  );

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={values => {
        console.log({ FORM_SUBMIT: values });
        setGlobalForm(values);
        window.scrollTo(0, 0);
        router.push('/frida-carclaims/insuranceholder-b/vehicleinfo');
      }}
      // validationSchema={carclaimsDatailsValidator}
    >
      {({ handleChange, handleSubmit, values, setFieldValue }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <div className="form-group">
              <label>Anrede:</label>
              <FormControl fullWidth variant="outlined">
                <Select
                  name="otherInsuranceHolderSalutation"
                  displayEmpty
                  value={values.otherInsuranceHolderSalutation}
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
                  <MenuItem value="" selected>
                    Bitte auswählen
                  </MenuItem>
                  <MenuItem value="Herr">Herr</MenuItem>
                  <MenuItem value="Frau">Frau</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>Name:</label>
                <TextField
                  name="otherInsuranceHolderSurName"
                  autoComplete="family-name"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherInsuranceHolderSurName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item-big">
                <label>Vorname:</label>
                <TextField
                  name="otherInsuranceHolderName"
                  autoComplete="given-name"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherInsuranceHolderName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Straße, Hausnummer:</label>
              <TextField
                name="address"
                fullWidth
                placeholder="Bitte ausfüllen"
                variant="outlined"
                value={addressInput}
                onInput={e => {
                  const value = (e.target as HTMLInputElement).value ?? '';
                  setAddressInput(value);
                  const { streetName, houseNumber } = parseAddress(value);
                  setFieldValue('otherInsuranceHolderStreetName', streetName);
                  setFieldValue('otherInsuranceHolderHouseNumber', houseNumber);
                }}
              />
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-small">
                <label>PLZ:</label>
                <TextField
                  name="otherInsuranceHolderPostalCode"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherInsuranceHolderPostalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group-item-big">
                <label>Ort:</label>
                <TextField
                  name="otherinsuranceHolderCity"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherinsuranceHolderCity}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Telefon:</label>
              <TextField
                name="otherInsuranceHolderTelephone"
                fullWidth
                placeholder="Bitte ausfüllen"
                variant="outlined"
                value={values.otherInsuranceHolderTelephone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>E-Mail-Adresse:</label>
              <TextField
                name="otherInsuranceHolderEmail"
                fullWidth
                placeholder="Bitte ausfüllen"
                variant="outlined"
                value={values.otherInsuranceHolderEmail}
                onChange={handleChange}
              />
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
