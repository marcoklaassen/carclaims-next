'use client';
import { OtherInsuranceHolderFormState, useGlobalFormStore } from '@/types/state';
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Formik, Form } from 'formik';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InsuranceholderPage() {
  const router = useRouter();

  const globalForm = useGlobalFormStore(s => s.form);
  const setGlobalForm = useGlobalFormStore(s => s.setGlobalForm);

  const values: OtherInsuranceHolderFormState = {
    otherVatDeduction: globalForm.otherVatDeduction || '',
    otherCarBrand: globalForm.otherCarBrand || '',
    otherCarModel: globalForm.otherCarModel || '',
    otherLicensePlate: globalForm.otherLicensePlate || '',
    otherInsuranceCompany: globalForm.otherInsuranceCompany || '',
    otherinsuranceNumber: globalForm.otherinsuranceNumber || '',
    otherChassisNumber: globalForm.otherChassisNumber || '',
    otherOdometerReading: globalForm.otherOdometerReading || '',
    otherGreenCardNumber: globalForm.otherGreenCardNumber || '',
    otherValidDateGreenCard: globalForm.otherValidDateGreenCard ?? dayjs(),
    otherAllRiskInsurance: globalForm.otherAllRiskInsurance || '',
  };

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={values => {
        console.log({ FORM_SUBMIT: values });
        setGlobalForm(values);
        router.push('/frida-carclaims/injuredpersons');
      }}
      // validationSchema={carclaimsDatailsValidator}
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
            <div className="form-group radio-group">
              <label>Besteht Berechtigung zum Vorsteuerabzug?</label>
              <RadioGroup
                name="otherVatDeduction"
                row
                value={values.otherVatDeduction}
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
                <label>Automarke (z.B. Audi, Mercedes Benz etc.):</label>
                <TextField
                  name="otherCarBrand"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherCarBrand}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item-big">
                <label>Automodell (z.B. A4, CLA etc.):</label>
                <TextField
                  name="otherCarModel"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherCarModel}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item-big">
                <label>Amtliches Kennzeichen (z.B. BGJ9854):</label>
                <TextField
                  name="otherLicensePlate"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherLicensePlate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>Name der Versicherungsgesellschaft:</label>
                <TextField
                  name="otherInsuranceCompany"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherInsuranceCompany}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item-big">
                <label>Versicherungsscheinnummer (ID-Nr. der Versicherung):</label>
                <TextField
                  name="otherinsuranceNumber"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherinsuranceNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>Fahrgestellnummer (Fahrzeugzulassung):</label>
                <TextField
                  name="otherChassisNumber"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherChassisNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item-big">
                <label>Aktueller KM-Stand (Siehe Tachometer des Autos):</label>
                <TextField
                  name="otherOdometerReading"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherOdometerReading}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>Nummer der Grünen Karte des Versicherers:</label>
                <TextField
                  name="otherGreenCardNumber"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.otherGreenCardNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item-small">
                <label>Grüne Karte gültig bis:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                  <MobileDatePicker
                    value={values.otherValidDateGreenCard}
                    enableAccessibleFieldDOMStructure={false}
                    onChange={newValue => {
                      setFieldValue('otherValidDateGreenCard', newValue);
                      setFieldTouched('otherValidDateGreenCard', true);
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
                        error: !!(
                          errors.otherValidDateGreenCard &&
                          touched.otherValidDateGreenCard
                        ),
                        helperText:
                          touched.otherValidDateGreenCard &&
                          errors.otherValidDateGreenCard
                            ? errors.otherValidDateGreenCard
                            : null,
                      },
                    }}
                    format="DD.MM.YYYY"
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className="form-group radio-group">
              <label>Besteht eine Vollkaskoversicherung?</label>
              <RadioGroup
                name="otherAllRiskInsurance"
                row
                value={values.otherAllRiskInsurance}
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
