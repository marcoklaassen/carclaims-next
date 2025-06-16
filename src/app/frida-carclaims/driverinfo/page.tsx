'use client';
import { DriverOfInsuranceHolderFormState, useGlobalFormStore } from '@/types/state';
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
import { useState } from 'react';

export default function DriverInfoPage() {
  const router = useRouter();

  const globalForm = useGlobalFormStore(s => s.form);
  const setGlobalForm = useGlobalFormStore(s => s.setGlobalForm);

  const values: DriverOfInsuranceHolderFormState = {
    isInsuredDriver: globalForm.isInsuredDriver || '',
    driverSalutation: globalForm.driverSalutation || '',
    driverHolderName: globalForm.driverHolderName || '',
    driverHolderSurName: globalForm.driverHolderSurName || '',
    driverHolderStreetName: globalForm.driverHolderStreetName || '',
    driverHolderHouseNumber: globalForm.driverHolderHouseNumber || '',
    driverHolderPostalCode: globalForm.driverHolderPostalCode || '',
    driverHolderCity: globalForm.driverHolderCity || '',
    driverHolderTelephone: globalForm.driverHolderTelephone || '',
    // driverHolderEmail: globalForm.driverHolderEmail || "",
    driverHolderDriverLicense: globalForm.driverHolderDriverLicense || '',
    driverLicenseIssuingAuthority: globalForm.driverLicenseIssuingAuthority || '',
  };

  const [addressInput, setAddressInput] = useState(
    `${values.driverHolderStreetName} ${values.driverHolderHouseNumber}`.trim(),
  );

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={values => {
        console.log({ FORM_SUBMIT: values });
        setGlobalForm(values);
        router.push('/frida-carclaims/damagelocation');
      }}
      // validationSchema={carclaimsDatailsValidator}
    >
      {({ handleChange, handleSubmit, setFieldValue, values }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <div className="form-group radio-group">
              <label>Ist der Versicherungsnehmer A auch der Fahrlenker gewesen?</label>
              <RadioGroup
                name="isInsuredDriver"
                row
                value={values.isInsuredDriver}
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

            <div className="form-group">
              <label>Anrede:</label>
              <FormControl fullWidth variant="outlined">
                <Select
                  name="driverSalutation"
                  displayEmpty
                  value={values.driverSalutation}
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
                  <MenuItem value="" selected className="placeholder">
                    Bitte auswählen
                  </MenuItem>
                  <MenuItem value="Herr">Herr</MenuItem>
                  <MenuItem value="Frau">Frau</MenuItem>
                  <MenuItem value="Divers">Divers</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>Name:</label>
                <TextField
                  name="driverHolderSurName"
                  autoComplete="family-name"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.driverHolderSurName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group-item-big">
                <label>Vorname:</label>
                <TextField
                  name="driverHolderName"
                  autoComplete="given-name"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.driverHolderName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Führerschein-Nr:</label>
              <TextField
                name="driverHolderDriverLicense"
                fullWidth
                placeholder="Bitte ausfüllen"
                variant="outlined"
                value={values.driverHolderDriverLicense}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Ausgestellt durch (zuständige Fahrzulassungsbehörde):</label>
              <TextField
                name="driverLicenseIssuingAuthority"
                fullWidth
                placeholder="Bitte ausfüllen"
                variant="outlined"
                value={values.driverLicenseIssuingAuthority}
                onChange={handleChange}
              />
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
                  setFieldValue('driverHolderStreetName', streetName);
                  setFieldValue('driverHolderHouseNumber', houseNumber);
                }}
              />
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-small">
                <label>PLZ:</label>
                <TextField
                  name="driverHolderPostalCode"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.driverHolderPostalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group-item-big">
                <label>Ort:</label>
                <TextField
                  name="driverHolderCity"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.driverHolderCity}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Telefon:</label>
              <TextField
                name="driverHolderTelephone"
                fullWidth
                placeholder="Bitte ausfüllen"
                variant="outlined"
                value={values.driverHolderTelephone}
                onChange={handleChange}
              />
            </div>

            {/* <div className="form-group">
              <label>E-Mail-Adresse:</label>
              <TextField
                name="driverEmail"
                fullWidth
                placeholder="Bitte ausfüllen"
                variant="outlined"
                value={values.driverEmail}
                onChange={handleChange}
              />
            </div> */}
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
