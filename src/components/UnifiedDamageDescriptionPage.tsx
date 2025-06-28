'use client';
import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  RadioGroup,
  Select,
  TextField,
  Radio,
} from '@mui/material';
import { useFormik } from 'formik';
import { ArrowRight, ZoomIn, Trash2, Paperclip, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import React from 'react';
import './upload-file-section.css';
import { MAXFILES, useGlobalFormStore } from '@/types/state';
import { FormType, DAMAGE_DESCRIPTION_FIELDS, FORM_ROUTES, FORM_LABELS } from '@/config/formConfig';
import { createDamageDescriptionValues } from '@/utils/formHelpers';

interface Props {
  formType?: FormType;
}

export default function UnifiedDamageDescriptionPage({ formType: propFormType }: Props) {
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

  const fields = DAMAGE_DESCRIPTION_FIELDS[formType];
  const labels = FORM_LABELS.damageDescription;

  const values = createDamageDescriptionValues(globalForm, formType);

  const blobUrlsRef = React.useRef<Record<string, string>>({});

  const formik = useFormik({
    initialValues: values,
    onSubmit: (formData) => {
      console.log({ DAMAGEDESCRIPTION_FORM_SUBMIT: formData, TYPE: formType });
      setGlobalForm(formData);
      router.push(FORM_ROUTES.damageDescription[formType]);
    },
  });

  // Funktion um Blob-URL für eine Datei zu erhalten
  const getFileUrl = useCallback((file: File & { path?: string }): string => {
    // eindeutige ID für die Datei
    const fileId = file.name + '_' + file.size + '_' + (file.lastModified || Date.now());

    // Falls bereits eine URL für diese Datei existiert, verwenden wir sie
    if (blobUrlsRef.current[fileId]) {
      return blobUrlsRef.current[fileId];
    }

    // Sonst erstellen wir eine neue URL
    const url = URL.createObjectURL(file);
    blobUrlsRef.current[fileId] = url;
    return url;
  }, []);

  // Bereinigt alle Blob-URLs wenn die Komponente unmounted wird
  React.useEffect(() => {
    return () => {
      // Beim Unmount alle Blob-URLs freigeben
      Object.values(blobUrlsRef.current).forEach((url) => {
        URL.revokeObjectURL(url);
      });
      blobUrlsRef.current = {};
    };
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: (File & { path?: string })[]) => {
      const currentFiles =
        (formik.values[fields.fileUploads] as (File & { path?: string })[]) || [];
      const remainingSlots = MAXFILES - currentFiles.length;

      // upload verhindern wenn keine Slots mehr vorhanden sind
      if (remainingSlots <= 0) {
        alert(
          `Maximale Anzahl von ${MAXFILES} Dateien bereits erreicht. Bitte löschen Sie zuerst einige Dateien, bevor Sie weitere hinzufügen.`,
        );
        return;
      }

      // Prüfen, ob das Hinzufügen neuer Dateien das Limit überschreiten würde
      if (currentFiles.length + acceptedFiles.length > MAXFILES) {
        // Nur die ersten Dateien nehmen bis zum Erreichen des Limits
        const newFiles = acceptedFiles.slice(0, remainingSlots);
        alert(
          `Nur ${remainingSlots} ${
            remainingSlots === 1 ? 'weitere Datei' : 'weitere Dateien'
          } hinzugefügt. Maximal ${MAXFILES} Dateien erlaubt.`,
        );

        formik.setFieldValue(fields.fileUploads, [...currentFiles, ...newFiles]);
      } else {
        formik.setFieldValue(fields.fileUploads, [...currentFiles, ...acceptedFiles]);
      }
    },
    [formik, fields.fileUploads],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    const currentFiles = formik.values[fields.fileUploads] as (File & { path?: string })[];
    const newFiles = currentFiles.filter((_, i) => i !== index);
    formik.setFieldValue(fields.fileUploads, newFiles);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="form-wrapper">
      <div className="form-content">
        <h2>{labels.title[formType]}</h2>

        <div className="form-group">
          <label>{labels.damageDescription}</label>
          <TextField
            name={fields.damageDescription}
            fullWidth
            multiline
            rows={4}
            placeholder={FORM_LABELS.common.fillPlaceholder}
            variant="outlined"
            value={formik.values[fields.damageDescription]}
            onChange={formik.handleChange}
          />
        </div>

        <div className="form-group">
          <label>{labels.additionalComments}</label>
          <TextField
            name={fields.additionalComments}
            fullWidth
            multiline
            rows={4}
            placeholder={FORM_LABELS.common.fillPlaceholder}
            variant="outlined"
            value={formik.values[fields.additionalComments]}
            onChange={formik.handleChange}
          />
        </div>

        {/* Upload File Section - Original Design */}
        <div className="upload-file-section">
          {((formik.values[fields.fileUploads] as (File & { path?: string })[]) || []).map(
            (file: File & { path?: string }, i: number) => (
              <div key={`attached-file-${i}`} className="image-card">
                <div className="image-wrapper">
                  <img src={getFileUrl(file)} alt={file.path} className="photo" />
                  <div className="zoom-icon">
                    <ZoomIn size={'20'} className="zoom" />
                  </div>
                </div>
                <p className="filename">{file.path}</p>
                <Button className="delete-button" onClick={() => removeFile(i)} variant="contained">
                  <Trash2 size={'16'} />
                  {labels.deleteAttachment}
                </Button>
              </div>
            ),
          )}
        </div>

        <div
          {...getRootProps({
            className: `attachment-section ${
              ((formik.values[fields.fileUploads] as (File & { path?: string })[]) || []).length >=
              MAXFILES
                ? 'disabled-dropzone'
                : ''
            }`,
          })}
        >
          <Button
            className="attachment-button"
            disabled={
              ((formik.values[fields.fileUploads] as (File & { path?: string })[]) || []).length >=
              MAXFILES
            }
          >
            <Paperclip size={20} />
            <span>
              {((formik.values[fields.fileUploads] as (File & { path?: string })[]) || []).length >=
              MAXFILES
                ? labels.maxFilesReached
                : labels.attachFiles}
            </span>
          </Button>
          {((formik.values[fields.fileUploads] as (File & { path?: string })[]) || []).length <
            MAXFILES && <Plus size={24} />}
          <input {...getInputProps()} />
        </div>

        <div className="attachment-counter">
          {((formik.values[fields.fileUploads] as (File & { path?: string })[]) || []).length} /{' '}
          {MAXFILES}
        </div>

        <div className="info-box file-info">
          <div className="info-icon">i</div>
          <div>
            <p style={{ fontWeight: 'bold' }}>{labels.acceptedFormats}</p>
            <p>{labels.documentInfo}</p>
          </div>
        </div>

        <div className="form-group radio-group">
          <label>{labels.vehicleOperational}</label>
          <RadioGroup
            name={fields.vehicleOperational}
            row
            value={formik.values[fields.vehicleOperational]}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value={true}
              control={<Radio className="custom-radio" />}
              label={FORM_LABELS.common.yes}
            />
            <FormControlLabel
              value={false}
              control={<Radio className="custom-radio" />}
              label={FORM_LABELS.common.no}
            />
          </RadioGroup>
        </div>

        <div className="form-group">
          <label>{labels.damageType}</label>
          <FormControl fullWidth variant="outlined">
            <Select
              name={fields.damageType}
              displayEmpty
              value={formik.values[fields.damageType] as string}
              onChange={formik.handleChange}
              renderValue={(selected: string) => {
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
                return selected;
              }}
            >
              <MenuItem value="">{FORM_LABELS.common.selectPlaceholder}</MenuItem>
              <MenuItem value="Auffahren">Auffahren</MenuItem>
              <MenuItem value="Rangieren/ Parken">Rangieren/ Parken</MenuItem>
              <MenuItem value="Missachtung der Vorfahrt">Missachtung der Vorfahrt</MenuItem>
              <MenuItem value="Abbiegen">Abbiegen</MenuItem>
              <MenuItem value="Abkommen von der Fahrbahn">Abkommen von der Fahrbahn</MenuItem>
              <MenuItem value="Überholvorgang">Überholvorgang</MenuItem>
              <MenuItem value="Spurwechsel">Spurwechsel</MenuItem>
              <MenuItem value="Sonstiges">Sonstiges</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="navigation-container">
        <Button type="submit" variant="contained" className="next-button">
          {FORM_LABELS.common.nextButton}
          <ArrowRight size={'20'} />
        </Button>
      </div>
    </form>
  );
}
