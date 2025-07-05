'use client';

import Image from 'next/image';
import { useGlobalFormStore } from '@/types/state';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Formik, Form } from 'formik';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormType, DAMAGE_LOCATION_FIELDS, FORM_ROUTES, FORM_LABELS } from '@/config/formConfig';
import { createDamageLocationValues } from '@/utils/formHelpers';
import carclaims from '../../public/carclaims-grafik.svg';

interface Props {
  formType?: FormType;
}

export default function UnifiedDamageLocationPage({ formType: propFormType }: Props) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fallback: verwende den type aus der URL
  const formType: FormType =
    propFormType ||
    (typeof window !== 'undefined' && window.location.pathname.includes('/b') ? 'b' : 'a');

  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  const fields = DAMAGE_LOCATION_FIELDS[formType];
  const labels = FORM_LABELS.damageLocation;

  const values = createDamageLocationValues(globalForm, formType);

  const availableDamageParts = [
    'Reifen vorne rechts',
    'Reifen vorne links',
    'Reifen hinten rechts',
    'Reifen hinten links',
    'Scheibe vorne rechts',
    'Scheibe vorne links',
    'Scheibe hinten rechts',
    'Scheibe hinten links',
    'Kennzeichen vorne',
    'Kennzeichen hinten',
    'Kotflügel vorne rechts',
    'Kotflügel vorne links',
    'Stoßstange vorne',
    'Stoßstange hinten',
    'Motorhaube',
    'Kofferraumklappe',
    'Dach',
  ];

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={(formData) => {
        console.log({ DAMAGELOCATION_FORM_SUBMIT: formData, TYPE: formType });
        setGlobalForm(formData);
        window.scrollTo(0, 0);
        router.push(FORM_ROUTES.damageLocation[formType]);
      }}
    >
      {({ handleSubmit, setFieldValue, setFieldTouched, values }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <div className="section-title">
              <h2>{labels.title[formType]}</h2>
              <div className="info-box">
                <div className="info-icon">i</div>
                <p>{labels.infoText}</p>
              </div>
            </div>

            {/* Schadensbereiche als Auswahloptionen anzeigen */}
            <div className="damage-options-grid">
              {(values[fields.damagedParts] ?? []).map((part: string, index: number) => (
                <div
                  key={index}
                  className="damage-option selected"
                  onClick={() => {
                    setFieldValue(
                      fields.damagedParts,
                      (values[fields.damagedParts] ?? []).filter(
                        (element: string) => element !== part,
                      ),
                    );
                    setFieldTouched(fields.damagedParts, true);
                  }}
                >
                  {part} <span className="check-icon">✓</span>
                </div>
              ))}
            </div>

            {/* Dropdown für die Auswahl weiterer Bereiche */}
            <FormControl fullWidth variant="outlined">
              <InputLabel shrink={false} style={{ color: 'rgba(0, 0, 0, 0.87', opacity: '0.5' }}>
                {labels.addMoreDamage}
              </InputLabel>
              <Select
                value=""
                onChange={(e) => {
                  if (!(values[fields.damagedParts] ?? []).includes(e.target.value)) {
                    setFieldValue(fields.damagedParts, [
                      ...(values[fields.damagedParts] ?? []),
                      e.target.value,
                    ]);
                  }
                }}
              >
                <MenuItem value="" disabled>
                  {FORM_LABELS.common.selectPlaceholder}
                </MenuItem>
                {availableDamageParts
                  .filter((part) => !(values[fields.damagedParts] ?? []).includes(part))
                  .map((part, index) => (
                    <MenuItem key={index} value={part}>
                      {part}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Platzhalter für Fahrzeugbild */}
            <div className="car-image-placeholder">
              <Image
                src={carclaims}
                alt="Car Image SVG"
                className="car-image"
                style={{
                  objectFit: 'contain',
                }}
                unoptimized
                priority
              />
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
