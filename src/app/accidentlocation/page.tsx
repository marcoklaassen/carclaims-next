'use client';
import { Button, FormHelperText, TextField, Tooltip } from '@mui/material';
import { Formik, Form } from 'formik';
import { ArrowRight, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGlobalFormStore, CarclaimsDetailsState } from '@/types/state';
import { parseAddress } from '@/utils/adress';
import { useEffect, useState } from 'react';
import { useGetAddress } from '../../../hooks';
import { createAccidentLocationValidationSchema } from '@/config/formConfig';

export default function AccidentlocationPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  const values: CarclaimsDetailsState = {
    accidentStreetName: globalForm.accidentStreetName || '',
    accidentHouseNumber: globalForm.accidentHouseNumber || '',
    accidentCity: globalForm.accidentCity || '',
    accidentPostalCode: globalForm.accidentPostalCode || '',
    accidentDetails: globalForm.accidentDetails || '',
  };

  const validationSchema = createAccidentLocationValidationSchema();
  const [addressInput, setAddressInput] = useState(
    `${values.accidentStreetName || ''} ${values.accidentHouseNumber || ''}`.trim(),
  );

  const { getAddress, error, loading } = useGetAddress();

  const getErrorMessage = (error: Error | GeolocationPositionError | undefined): string => {
    if (!error) return '';

    // GeolocationPositionError spezifische Nachrichten
    if ('code' in error) {
      const geoError = error as GeolocationPositionError;
      switch (geoError.code) {
        case geoError.PERMISSION_DENIED:
          return 'Standortzugriff wurde verweigert. Bitte aktivieren Sie die Standortberechtigung in Ihren Browser-Einstellungen.';
        case geoError.POSITION_UNAVAILABLE:
          return 'Standort ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut oder geben Sie die Adresse manuell ein.';
        case geoError.TIMEOUT:
          return 'Standortermittlung hat zu lange gedauert. Bitte versuchen Sie es erneut oder geben Sie die Adresse manuell ein.';
        default:
          return 'Unbekannter Geolocation-Fehler. Bitte geben Sie die Adresse manuell ein.';
      }
    }

    // Standard Error Messages
    if (error.message.includes('nicht unterstützt')) {
      return 'Ihr Browser unterstützt keine Standortermittlung. Bitte geben Sie die Adresse manuell ein.';
    }
    if (error.message.includes('Backend-Fehler')) {
      return 'Fehler beim Laden der Adressdaten. Bitte versuchen Sie es erneut oder geben Sie die Adresse manuell ein.';
    }

    // Fallback
    return 'Standort konnte nicht ermittelt werden. Bitte geben Sie die Adresse manuell ein.';
  };

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={(formData) => {
        console.log({ ACCIDENTLOCATION_FORM_SUBMIT: formData });
        setGlobalForm(formData);
        router.push('/personalinfo/a');
      }}
    >
      {({ handleChange, handleSubmit, setFieldValue, setFieldTouched, values, errors, touched }) => {
        return (
          <Form onSubmit={handleSubmit} className="form-wrapper">
            <div className="form-content">
              <div className="section-title">
                <h2>Wo ist der Schaden entstanden?</h2>
                <div className="info-box">
                  <div className="info-icon">i</div>
                  <p>
                    Sie können Ihren genauen Unfallort über GPS abfragen oder alle Felder manuell eingeben.
                  </p>
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
                  error={
                    (touched.accidentStreetName && Boolean(errors.accidentStreetName)) ||
                    (touched.accidentHouseNumber && Boolean(errors.accidentHouseNumber))
                  }
                  onChange={(e) => {
                    setAddressInput(e.target.value);
                  }}
                  onBlur={(e) => {
                    const { streetName, houseNumber } = parseAddress(e.target.value);
                    setFieldValue('accidentStreetName', streetName);
                    setFieldValue('accidentHouseNumber', houseNumber);
                  }}
                />
                {((touched.accidentStreetName && errors.accidentStreetName) ||
                  (touched.accidentHouseNumber && errors.accidentHouseNumber)) && (
                    <FormHelperText error={true}>
                      {String(errors.accidentStreetName || errors.accidentHouseNumber)}
                    </FormHelperText>
                  )}
              </div>

              <div className="form-group">
                <label>PLZ:</label>
                <TextField
                  name="accidentPostalCode"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.accidentPostalCode}
                  onChange={handleChange}
                  error={touched.accidentPostalCode && Boolean(errors.accidentPostalCode)}
                />
                {touched.accidentPostalCode && errors.accidentPostalCode && (
                  <FormHelperText error={true}>{String(errors.accidentPostalCode)}</FormHelperText>
                )}
              </div>

              <div className="form-group">
                <label>Ort:</label>
                <TextField
                  name="accidentCity"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.accidentCity}
                  onChange={handleChange}
                  error={touched.accidentCity && Boolean(errors.accidentCity)}
                />
                {touched.accidentCity && errors.accidentCity && (
                  <FormHelperText error={true}>{String(errors.accidentCity)}</FormHelperText>
                )}
              </div>

              <div className="location-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Tooltip title="Geolocation erfassen">
                  <Button
                    name="geoloactionBtn"
                    variant="contained"
                    color="primary"
                    style={{ textAlign: 'left' }}
                    onClick={async () => {
                      const address = await getAddress();
                      if (address) {
                        // Adress-Input aktualisieren
                        setAddressInput(
                          `${address.address.road || ''} ${address.address.house_number || ''
                            }`.trim(),
                        );

                        // Formik-Felder setzen
                        setFieldValue('accidentStreetName', address.address.road || '');
                        setFieldValue('accidentHouseNumber', address.address.house_number || '');
                        setFieldValue('accidentCity', address.address.town || '');
                        setFieldValue('accidentPostalCode', address.address.postcode || '');

                        setFieldTouched('accidentStreetName', false);
                        setFieldTouched('accidentHouseNumber', false);
                        setFieldTouched('accidentCity', false);
                        setFieldTouched('accidentPostalCode', false);

                        // console.log('Address:', address);
                      }
                    }}
                    disabled={loading}
                    className="geolocation-button"
                  >
                    <MapPin size={20} style={{ color: 'black', minHeight: '24px', minWidth: '24px' }} />
                    Mein Standort
                  </Button>
                </Tooltip>
                {error && (
                  <FormHelperText error={true} style={{ marginTop: '8px' }}>
                    {getErrorMessage(error)}
                  </FormHelperText>
                )}
              </div>

              <div className="form-group">
                <label>Beschreibung:</label>
                <TextField
                  name="accidentDetails"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={values.accidentDetails}
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
        );
      }}
    </Formik>
  );
}
