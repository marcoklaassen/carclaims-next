'use client';
import { useGlobalFormStore, WitnessDetails, WitnessesFormState } from '@/types/state';
import { parseAddress } from '@/utils/adress';
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function WitnessesPage() {
  const router = useRouter();

  const globalForm = useGlobalFormStore(s => s.form);
  const setGlobalForm = useGlobalFormStore(s => s.setGlobalForm);

  const emptyWitnessDetails: WitnessDetails = {
    salutation: '',
    surName: '',
    name: '',
    streetName: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    telephone: '',
    email: '',
  };

  const values: WitnessesFormState = {
    hasWitnesses: globalForm.hasWitnesses || false,
    witnessesCount: globalForm.witnessesCount || 0,
    witnesses: globalForm.witnesses || [],
  };

  const [addressInputs, setAddressInputs] = useState<string[]>(() => {
    return Array.from({ length: values.witnesses?.length || 0 }, (_, i) => {
      if (values.witnesses?.[i]) {
        return `${values.witnesses[i].streetName || ''} ${
          values.witnesses[i].houseNumber || ''
        }`.trim();
      }
      return '';
    });
  });

  console.log(
    { 'Actual witnesses[] Length:': values.witnesses?.length },
    { 'Address Inputs Length:': addressInputs.length },
  );

  return (
    <Formik
      initialValues={values}
      onSubmit={values => {
        const limitedValues = {
          ...values,
          witnesses: values.witnesses?.slice(0, values.witnessesCount) || [],
          witnessesCount: values.hasWitnesses ? values.witnessesCount : 0,
        };

        console.log({ WITNESS_LIST: limitedValues.witnesses });
        console.log({ FORM_SUBMIT: limitedValues });

        setGlobalForm(values);

        router.push('/frida-carclaims/miscellaneousdamages');
      }}
    >
      {({ handleChange, handleSubmit, values, setFieldValue }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <div className="form-group radio-group">
              <label>Gab es Zeugen?</label>
              <RadioGroup
                name="hasWitnesses"
                row
                value={values.hasWitnesses}
                onChange={e => {
                  const newValue = e.target.value === 'true';
                  setFieldValue('hasWitnesses', newValue);
                }}
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

            {values.hasWitnesses && (
              <div className="form-group">
                <div className="number-input-container">
                  <button
                    type="button"
                    className="number-btn"
                    onClick={() => {
                      // Verringere die Anzahl der Zeugen (minimum 0)
                      const newCount = Math.max(0, (values.witnessesCount ?? 0) - 1);
                      setFieldValue('witnessesCount', newCount);
                    }}
                  >
                    <Minus size={24} />
                  </button>
                  <input
                    name="witnessesCount"
                    type="text"
                    value={values.witnessesCount}
                    readOnly
                    className="number-input"
                  />
                  <button
                    type="button"
                    className="number-btn"
                    onClick={() => {
                      // Erhöhe die Anzahl der Zeugen
                      const newCount = (values.witnessesCount || 0) + 1;
                      setFieldValue('witnessesCount', newCount);

                      // Stelle sicher, dass für den neuen Zeugen ein neues Objekt mit leeren Feldern erstellt wird
                      const currentWitnesses = [...(values.witnesses || [])];
                      if (currentWitnesses.length < newCount) {
                        // Füge leere Zeugendetails für den neuen Index hinzu
                        currentWitnesses.push({ ...emptyWitnessDetails });
                        setFieldValue('witnesses', currentWitnesses);
                      }
                    }}
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            )}
            {values.hasWitnesses &&
              values.witnessesCount !== 0 &&
              Array.from(Array(values.witnessesCount)).map((_, index) => (
                <div key={index}>
                  <h2 style={{ marginBottom: '8px', marginTop: '12px' }}>
                    Angaben zum Zeugen {index + 1}
                  </h2>
                  <div className="form-group">
                    <label>Anrede:</label>
                    <FormControl fullWidth variant="outlined">
                      <Select
                        name={`witnesses[${index}].salutation`}
                        displayEmpty
                        value={values.witnesses?.[index]?.salutation || ''}
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
                        name={`witnesses[${index}].surName`}
                        autoComplete="family-name"
                        fullWidth
                        placeholder="Bitte ausfüllen"
                        variant="outlined"
                        value={values.witnesses?.[index]?.surName || ''}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group-item-big">
                      <label>Vorname:</label>
                      <TextField
                        name={`witnesses[${index}].name`}
                        autoComplete="given-name"
                        fullWidth
                        placeholder="Bitte ausfüllen"
                        variant="outlined"
                        value={values.witnesses?.[index]?.name || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Straße, Hausnummer:</label>
                    <TextField
                      name={`witnesses[${index}].address`}
                      fullWidth
                      placeholder="Bitte ausfüllen"
                      variant="outlined"
                      value={addressInputs[index] || ''}
                      onChange={e => {
                        const newAddressInputs = [...addressInputs];
                        newAddressInputs[index] = e.target.value;
                        setAddressInputs(newAddressInputs);
                      }}
                      onBlur={e => {
                        const { streetName, houseNumber } = parseAddress(e.target.value);
                        setFieldValue(`witnesses[${index}].streetName`, streetName);
                        setFieldValue(`witnesses[${index}].houseNumber`, houseNumber);
                      }}
                    />
                  </div>

                  <div className="form-group-horizontal">
                    <div className="form-group-item-small">
                      <label>PLZ:</label>
                      <TextField
                        name={`witnesses[${index}].postalCode`}
                        fullWidth
                        placeholder="Bitte ausfüllen"
                        variant="outlined"
                        value={values.witnesses?.[index]?.postalCode || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group-item-big">
                      <label>Ort:</label>
                      <TextField
                        name={`witnesses[${index}].city`}
                        fullWidth
                        placeholder="Bitte ausfüllen"
                        variant="outlined"
                        value={values.witnesses?.[index]?.city || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Telefon:</label>
                    <TextField
                      name={`witnesses[${index}].telephone`}
                      fullWidth
                      placeholder="Bitte ausfüllen"
                      variant="outlined"
                      value={values.witnesses?.[index]?.telephone || ''}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>E-Mail-Adresse:</label>
                    <TextField
                      name={`witnesses[${index}].email`}
                      fullWidth
                      placeholder="Bitte ausfüllen"
                      variant="outlined"
                      value={values.witnesses?.[index]?.email || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ))}
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
