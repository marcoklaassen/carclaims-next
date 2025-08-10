'use client';
import { useGlobalFormStore, WitnessDetails, WitnessesFormState } from '@/types/state';
import PersonalInfoFields from '../../../components/PersonalInfoFields';
import { Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Form, Formik } from 'formik';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { ClaimsSubmissionService } from '@/utils/claimsSubmissionService';

export default function WitnessesPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

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

  async function sendClaimsdata() {
    try {
      console.log('📤 Sende Claims-Daten mit Service...');
      const result = await ClaimsSubmissionService.submitClaims();

      if (result.success) {
        console.log('✅ Claims erfolgreich übermittelt!');
        router.push('/frida-carclaims/success');
      }
    } catch (error) {
      console.error('❌ Fehler beim Übermitteln der Claims:', error);
      alert('Fehler beim Übermitteln der Schadendaten: ' + error);
    }
  }

  return (
    <Formik
      initialValues={values}
      onSubmit={(formData) => {
        const limitedValues = {
          ...formData,
          witnesses: formData.witnesses?.slice(0, formData.witnessesCount) || [],
          witnessesCount: formData.hasWitnesses ? formData.witnessesCount : 0,
        };

        console.log({ WITNESSES_FORM_SUBMIT: limitedValues });
        setGlobalForm(formData);
        // Send claims data to the insurance company before navigating to the next page
        sendClaimsdata();
      }}
    >
      {({ handleChange, handleSubmit, values, setFieldValue, errors, touched }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <div className="form-group radio-group">
              <label>Gab es Zeugen?</label>
              <RadioGroup
                name="hasWitnesses"
                row
                value={values.hasWitnesses}
                onChange={(e) => {
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
                      const newCount = (values.witnessesCount || 0) + 1;
                      setFieldValue('witnessesCount', newCount);

                      const currentWitnesses = [...(values.witnesses || [])];
                      if (currentWitnesses.length < newCount) {
                        const newWitness = { ...emptyWitnessDetails };
                        currentWitnesses.push(newWitness);
                        setFieldValue('witnesses', currentWitnesses);

                        console.log('Adding new witness:', {
                          newCount,
                          newWitness,
                          currentWitnesses,
                        });
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

                  <PersonalInfoFields
                    fieldPrefix="witnesses"
                    arrayIndex={index}
                    formValues={values as Record<string, unknown>}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    onAddressChange={(streetName, houseNumber) => {
                      setFieldValue(`witnesses[${index}].streetName`, streetName);
                      setFieldValue(`witnesses[${index}].houseNumber`, houseNumber);
                    }}
                  />
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
