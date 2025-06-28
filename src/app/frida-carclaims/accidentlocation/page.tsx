'use client';
import { Button, TextField, Tooltip } from '@mui/material';
import { Formik, Form } from 'formik';
import { ArrowRight, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGlobalFormStore, CarclaimsDetailsState } from '@/types/state';
import { parseAddress } from '@/utils/adress';
import { useEffect, useState } from 'react';
import { useGetAddress } from '../../../../hooks';

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

  const [addressInput, setAddressInput] = useState(
    `${values.accidentStreetName || ''} ${values.accidentHouseNumber || ''}`.trim(),
  );

  const { getAddress, error, loading } = useGetAddress();

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={(formData) => {
        console.log({ ACCIDENTLOCATION_FORM_SUBMIT: formData });
        setGlobalForm(formData);
        router.push('/frida-carclaims/personalinfo/a');
      }}
      // validationSchema={carclaimsDatailsValidator}
    >
      {({ handleChange, handleSubmit, setFieldValue, values }) => {
        return (
          <Form onSubmit={handleSubmit} className="form-wrapper">
            <div className="form-content">
              <div className="section-title">
                <h2>Wo ist der Schaden entstanden?</h2>
                <div className="info-box">
                  <div className="info-icon">i</div>
                  <p>
                    Je genauer Sie den Ort angeben, umso schneller können wir Ihren Schaden
                    bearbeiten.
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
                  onChange={(e) => {
                    setAddressInput(e.target.value);
                  }}
                  onBlur={(e) => {
                    const { streetName, houseNumber } = parseAddress(e.target.value);
                    setFieldValue('accidentStreetName', streetName);
                    setFieldValue('accidentHouseNumber', houseNumber);
                  }}
                  onClick={() => {
                    // Original onClick handler, if any
                  }}
                />
              </div>

              <div className="location-button">
                <Tooltip title="Geolocation erfassen">
                  <Button
                    name="geoloactionBtn"
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      const address = await getAddress();
                      if (address) {
                        console.log('Address from useGetAddress:', address.address.postcode);

                        // Adresse Input aktualisieren
                        setAddressInput(
                          `${address.address.road || ''} ${
                            address.address.house_number || ''
                          }`.trim(),
                        );

                        // Formik-Felder setzen
                        setFieldValue('accidentStreetName', address.address.road || '');
                        setFieldValue('accidentHouseNumber', address.address.house_number || '');
                        setFieldValue('accidentCity', address.address.town || '');
                        setFieldValue('accidentPostalCode', address.address.postcode || '');

                        console.log('Address:', address);
                      } else if (error) {
                        console.error('Fehler beim Abrufen der Adresse:', error);
                        // Hier könnten Sie eine Benutzerbenachrichtigung hinzufügen
                      }
                    }}
                    disabled={loading}
                    className="geolocation-button"
                  >
                    <MapPin size={20} style={{ color: 'black' }} />
                    Genauen Standort auf der Karte suchen
                  </Button>
                </Tooltip>
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
                />
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
                />
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
