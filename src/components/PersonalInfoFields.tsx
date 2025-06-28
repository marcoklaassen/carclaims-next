'use client';

import React, { useState } from 'react';
import { TextField, FormControl, Select, MenuItem } from '@mui/material';
import { FormikErrors, FormikTouched } from 'formik';
import { parseAddress } from '@/utils/adress';
import { FORM_LABELS } from '@/config/formConfig';

interface PersonalInfoFieldsProps {
  fieldPrefix: string;
  formValues: Record<string, unknown>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: FormikErrors<Record<string, unknown>>;
  touched: FormikTouched<Record<string, unknown>>;
  onAddressChange?: (streetName: string, houseNumber: string) => void;
  arrayIndex?: number; // Optional index für Array-Strukturen wie witnesses
}

export default function PersonalInfoFields({
  fieldPrefix,
  formValues,
  handleChange,
  errors,
  touched,
  onAddressChange,
  arrayIndex,
}: PersonalInfoFieldsProps) {

  const getFieldName = (field: string) => {

    if (arrayIndex !== undefined && fieldPrefix === 'witnesses') {
      return `witnesses[${arrayIndex}].${field}`;
    }
    // Handle different field patterns
    if (fieldPrefix === 'insuranceHolder') {
      return `${fieldPrefix}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    } else if (fieldPrefix === 'otherInsuranceHolder') {
      return `${fieldPrefix}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    } else if (fieldPrefix === 'driver' || fieldPrefix === 'driver') {
      return `driver${field.charAt(0).toUpperCase() + field.slice(1)}`;
    } else if (fieldPrefix === 'otherDriver' || fieldPrefix === 'otherDriver') {
      return `otherDriver${field.charAt(0).toUpperCase() + field.slice(1)}`;
    }

    return `${fieldPrefix}${field.charAt(0).toUpperCase() + field.slice(1)}`;
  };

  const getFieldValue = (field: string) => {
    const fieldName = getFieldName(field);

    if (arrayIndex !== undefined && fieldPrefix === 'witnesses') {
      const formData = formValues as Record<string, unknown>;
      const witnesses = formData.witnesses as Array<Record<string, unknown>> | undefined;
      return witnesses?.[arrayIndex]?.[field] as string || '';
    }

    return formValues[fieldName] as string || '';
  };

  // Helper function to check for errors
  const hasError = (field: string) => {
    const fieldName = getFieldName(field);
    return touched[fieldName] && Boolean(errors[fieldName]);
  };

  const getErrorMessage = (field: string) => {
    const fieldName = getFieldName(field);
    return touched[fieldName] && errors[fieldName];
  };

  // State for combined address input
  const [addressInput, setAddressInput] = useState(() => {
    const streetName = getFieldValue('streetName');
    const houseNumber = getFieldValue('houseNumber');
    return `${streetName} ${houseNumber}`.trim();
  });

  // Address parsing function
  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddressInput(value);

    if (onAddressChange) {
      const { streetName, houseNumber } = parseAddress(value);
      onAddressChange(streetName, houseNumber);
    }
  };

  return (
    <>
      {/* Anrede */}
      <div className="form-group">
        <label>{FORM_LABELS.personalInfo.salutation}</label>
        <FormControl fullWidth variant="outlined">
          <Select
            name={getFieldName('salutation')}
            displayEmpty
            value={getFieldValue('salutation')}
            onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
            error={hasError('salutation')}
            renderValue={(selected) => {
              if (selected === '') {
                return (
                  <span
                    style={{
                      color: 'rgba(0, 0, 0, 0.87) !important',
                      opacity: '0.5',
                    }}
                  >
                    {FORM_LABELS.common.selectPlaceholder}
                  </span>
                );
              }
              return String(selected);
            }}
          >
            <MenuItem value="">{FORM_LABELS.common.selectPlaceholder}</MenuItem>
            <MenuItem value="Herr">{FORM_LABELS.common.salutations.mr}</MenuItem>
            <MenuItem value="Frau">{FORM_LABELS.common.salutations.mrs}</MenuItem>
          </Select>
          {hasError('salutation') && (
            <div className="error-message">{String(getErrorMessage('salutation'))}</div>
          )}
        </FormControl>
      </div>

      {/* Vorname und Nachname */}
      <div className="form-group-horizontal">
        <div className="form-group-item-big">
          <label>{FORM_LABELS.personalInfo.surName}</label>
          <TextField
            name={getFieldName('surName')}
            autoComplete="family-name"
            fullWidth
            placeholder={FORM_LABELS.common.fillPlaceholder}
            variant="outlined"
            value={getFieldValue('surName')}
            onChange={handleChange}
            error={hasError('surName')}
            helperText={getErrorMessage('surName') ? String(getErrorMessage('surName')) : ''}
          />
        </div>

        <div className="form-group-item-big">
          <label>{FORM_LABELS.personalInfo.name}</label>
          <TextField
            name={getFieldName('name')}
            autoComplete="given-name"
            fullWidth
            placeholder={FORM_LABELS.common.fillPlaceholder}
            variant="outlined"
            value={getFieldValue('name')}
            onChange={handleChange}
            error={hasError('name')}
            helperText={getErrorMessage('name') ? String(getErrorMessage('name')) : ''}
          />
        </div>
      </div>

      {/* Kombinierte Adresse */}
      <div className="form-group">
        <label>{FORM_LABELS.personalInfo.streetAndNumber}</label>
        <TextField
          name="address"
          fullWidth
          placeholder={FORM_LABELS.common.fillPlaceholder}
          variant="outlined"
          value={addressInput}
          onInput={handleAddressInput}
          error={hasError('streetName') || hasError('houseNumber')}
          helperText={
            getErrorMessage('streetName')
              ? String(getErrorMessage('streetName'))
              : getErrorMessage('houseNumber')
              ? String(getErrorMessage('houseNumber'))
              : ''
          }
        />
      </div>

      {/* PLZ und Ort */}
      <div className="form-group-horizontal">
        <div className="form-group-item-small">
          <label>{FORM_LABELS.personalInfo.postalCode}</label>
          <TextField
            name={getFieldName('postalCode')}
            fullWidth
            placeholder={FORM_LABELS.common.fillPlaceholder}
            variant="outlined"
            value={getFieldValue('postalCode')}
            onChange={handleChange}
            error={hasError('postalCode')}
            helperText={getErrorMessage('postalCode') ? String(getErrorMessage('postalCode')) : ''}
          />
        </div>
        <div className="form-group-item-big">
          <label>{FORM_LABELS.personalInfo.city}</label>
          <TextField
            name={getFieldName('city')}
            fullWidth
            placeholder={FORM_LABELS.common.fillPlaceholder}
            variant="outlined"
            value={getFieldValue('city')}
            onChange={handleChange}
            error={hasError('city')}
            helperText={getErrorMessage('city') ? String(getErrorMessage('city')) : ''}
          />
        </div>
      </div>

      {/* Telefon */}
      <div className="form-group">
        <label>{FORM_LABELS.personalInfo.telephone}</label>
        <TextField
          name={getFieldName('telephone')}
          fullWidth
          placeholder={FORM_LABELS.common.fillPlaceholder}
          variant="outlined"
          value={getFieldValue('telephone')}
          onChange={handleChange}
          error={hasError('telephone')}
          helperText={getErrorMessage('telephone') ? String(getErrorMessage('telephone')) : ''}
        />
      </div>

      {/* E-Mail */}
      <div className="form-group">
        <label>{FORM_LABELS.personalInfo.email}</label>
        <TextField
          name={getFieldName('email')}
          fullWidth
          placeholder={FORM_LABELS.common.fillPlaceholder}
          variant="outlined"
          value={getFieldValue('email')}
          onChange={handleChange}
          error={hasError('email')}
          helperText={getErrorMessage('email') ? String(getErrorMessage('email')) : ''}
        />
      </div>
    </>
  );
}
