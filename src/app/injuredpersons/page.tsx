'use client';

import { useGlobalFormStore } from '@/types/state';
import { Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Form, Formik } from 'formik';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InjuredPersonsPage() {
  const router = useRouter();

  const globalForm = useGlobalFormStore(s => s.form);
  const setGlobalForm = useGlobalFormStore(s => s.setGlobalForm);

  const values = {
    hasInjured: globalForm.hasInjured || false,
    injuredCount: globalForm.injuredCount || 0,
  };

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={formData => {
        const valuesForSubmit = {
          ...formData,
          injuredCount: formData.hasInjured === false ? 0 : formData.injuredCount,
        };
        console.log({ INJUREDPERSONS_FORM_SUBMIT: valuesForSubmit });

        setGlobalForm(valuesForSubmit);
        router.push('/miscellaneousdamages');
      }}
      // validationSchema={carclaimsDatailsValidator}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <div className="form-group radio-group">
              <label>Gab es Verletzte?</label>
              <RadioGroup
                name="hasInjured"
                row
                value={values.hasInjured}
                onChange={e => {
                  const newValue = e.target.value === 'true';
                  setFieldValue('hasInjured', newValue);
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
            {values.hasInjured && (
              <div className="form-group">
                <label>Anzahl der Verletzten</label>
                <div className="number-input-container">
                  <button
                    type="button"
                    className="number-btn"
                    onClick={() =>
                      setFieldValue('injuredCount', Math.max(0, values.injuredCount - 1))
                    }
                  >
                    <Minus size={24} style={{color: 'black'}} />
                  </button>
                  <input
                    name="injuredCount"
                    type="text"
                    value={values.injuredCount}
                    readOnly
                    className="number-input"
                  />
                  <button
                    type="button"
                    className="number-btn"
                    onClick={() =>
                      setFieldValue('injuredCount', (values.injuredCount || 0) + 1)
                    }
                  >
                    <Plus size={24} style={{color: 'black'}} />
                  </button>
                </div>
              </div>
            )}
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
