"use client";
import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  RadioGroup,
  Select,
  TextField,
  Radio,
} from "@mui/material";
import { useFormik } from "formik";
import { ArrowRight, ZoomIn, Trash2, Paperclip, Plus } from "lucide-react";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import React from "react";
import "./upload-file-section.css";
import {
  DriverOfInsuranceHolderFormState,
  MAXFILES,
  useGlobalFormStore,
} from "@/types/state";

export default function DamageDescriptionPage() {
  const router = useRouter();

  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  const values: DriverOfInsuranceHolderFormState = {
    damageDescription: globalForm.damageDescription || "",
    additionalComments: globalForm.additionalComments || "",
    vehicleOperational: globalForm.vehicleOperational || "",
    damageType: globalForm.damageType || "",
    driverHolderFileUploads: globalForm.driverHolderFileUploads || [],
  };

  // Referenz für Blob URLs mit Map-Struktur für effiziente Suche
  const blobUrlsRef = React.useRef<Record<string, string>>({});

  const formik = useFormik({
    initialValues: values,
    onSubmit: (values) => {
      console.log({"FORM_SUBMIT" : values});
      setGlobalForm(values);
      router.push("/frida-carclaims/insuranceholder-b/personalinfo");
    },
    // validationSchema: carclaimsDatailsValidator
  });

  // Funktion um Blob-URL für eine Datei zu erhalten
  const getFileUrl = useCallback((file: File & { path?: string }): string => {
    // eindeutige ID für die Datei
    const fileId = file.name + '_' + file.size + '_' + (file.lastModified || Date.now());

    // Falls  bereits eine URL für diese Datei exstiert, verwenden wir sie
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
      Object.values(blobUrlsRef.current).forEach(url => {
        URL.revokeObjectURL(url);
      });
      blobUrlsRef.current = {};
    };
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: (File & { path?: string })[]) => {
      const currentFiles = formik.values.driverHolderFileUploads || [];
      const remainingSlots = MAXFILES - currentFiles.length;

      // Wenn keine Slots mehr übrig sind, Upload komplett verhindern
      if (remainingSlots <= 0) {
        alert(
          `Maximale Anzahl von ${MAXFILES} Dateien bereits erreicht. Bitte löschen Sie zuerst einige Dateien, bevor Sie weitere hinzufügen.`
        );
        return;
      }

      // Prüfen, ob das Hinzufügen der neuen Dateien das Limit überschreiten würde
      if (currentFiles.length + acceptedFiles.length > MAXFILES) {
        // Nur die ersten Dateien nehmen bis zum Erreichen des Limits
        const newFiles = acceptedFiles.slice(0, remainingSlots);
        alert(
          `Nur ${remainingSlots} ${
            remainingSlots === 1 ? "weitere Datei" : "weitere Dateien"
          } hinzugefügt. Maximal ${MAXFILES} Dateien erlaubt.`
        );

        const updatedFiles = [...currentFiles, ...newFiles];
        formik.setFieldValue("driverHolderFileUploads", updatedFiles);
      } else {
        // Alle akzeptierten Dateien können hinzugefügt werden
        const updatedFiles = [...currentFiles, ...acceptedFiles];
        formik.setFieldValue("driverHolderFileUploads", updatedFiles);
      }
    },
    [formik.values.driverHolderFileUploads]
  );

  const isMaxFilesReached =
    (formik.values.driverHolderFileUploads?.length || 0) >= MAXFILES;

  const { getRootProps, getInputProps} =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
        "image/jpg": [".jpg"],
      },
      disabled: isMaxFilesReached,
    });

  // Datei löschen
  const deleteFile = useCallback((index: number) => {
    const files = formik.values.driverHolderFileUploads || [];
    if (files[index]) {
      // Identifizieren der zu löschenden Datei für das Freigeben der Blob-URL
      const fileToDelete = files[index];
      const fileId = fileToDelete.name + '_' + fileToDelete.size + '_' + (fileToDelete.lastModified || Date.now());

      // Blob-URL freigeben, falls vorhanden
      if (blobUrlsRef.current[fileId]) {
        URL.revokeObjectURL(blobUrlsRef.current[fileId]);
        delete blobUrlsRef.current[fileId];
      }
    }

    // Datei aus dem formik-Zustand entfernen
    const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
    formik.setFieldValue("driverHolderFileUploads", updatedFiles);
    formik.setFieldTouched("driverHolderFileUploads", true);
  }, [formik]);

  return (
    <form onSubmit={formik.handleSubmit} className="form-wrapper">
      <div className="form-content">
        <div className="form-group">
          <label>Beschreiben Sie sichtbare Schäden am Fahrzeug:</label>
          <TextField
            name="damageDescription"
            fullWidth
            placeholder="Bitte ausfüllen"
            variant="outlined"
            multiline
            rows={4}
            value={formik.values.damageDescription}
            onChange={formik.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Weitere Bemerkungen:</label>
          <TextField
            name="additionalComments"
            fullWidth
            placeholder="Bitte ausfüllen"
            variant="outlined"
            multiline
            rows={4}
            value={formik.values.additionalComments}
            onChange={formik.handleChange}
          />
        </div>

        <div className="upload-file-section">
          {formik.values.driverHolderFileUploads?.map(
            (file: File & { path?: string }, i: number) => (
              <div key={`attached-file-${i}`} className="image-card">
                <div className="image-wrapper">
                  <img
                    src={getFileUrl(file)}
                    alt={file.path}
                    className="photo"
                  />
                  <div className="zoom-icon">
                    <ZoomIn size={"20"} className="zoom" />
                  </div>
                </div>
                <p className="filename">{file.path}</p>
                <Button
                  className="delete-button"
                  onClick={() => deleteFile(i)}
                  variant="contained"
                >
                  <Trash2 size={"16"} />
                  Anhang löschen
                </Button>
              </div>
            )
          )}
        </div>

        <div
          {...getRootProps({
            className: `attachment-section ${
              isMaxFilesReached ? "disabled-dropzone" : ""
            }`,
          })}
        >
          <Button className="attachment-button" disabled={isMaxFilesReached}>
            <Paperclip size={20} />
            <span>
              {isMaxFilesReached
                ? "Maximale Anzahl erreicht"
                : "Anhänge hinzufügen"}
            </span>
          </Button>
          {!isMaxFilesReached && <Plus size={24} />}
          <input {...getInputProps()} />
        </div>

        <div className="attachment-counter">
          {formik.values.driverHolderFileUploads?.length || 0} / {MAXFILES}
        </div>

        <div className="info-box file-info">
          <div className="info-icon">i</div>
          <div>
            <p style={{ fontWeight: "bold" }}>
              Akzeptierte Bildformate: .JPG, .JPEG, .PNG
            </p>
            <p>
              Sie können auch nützliche Dokumente wie Führerschein und
              Personalausweis hochladen.
            </p>
          </div>
        </div>

        <div className="form-group radio-group">
          <label>Ist das Fahrzeug vom Beschädigten fahrbereit?</label>
          <RadioGroup
            name="vehicleOperational"
            row
            value={formik.values.vehicleOperational}
            onChange={formik.handleChange}
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
          <label>Wie kam es zu dem Fahrzeugschaden?</label>
          <FormControl fullWidth variant="outlined">
            <Select
              name="damageType"
              displayEmpty
              value={formik.values.damageType}
              onChange={formik.handleChange}
              className="select-input"
              renderValue={(selected) => {
                if (selected === "") {
                  return (
                    <span
                      style={{
                        color: "rgba(0, 0, 0, 0.87) !important",
                        opacity: "0.5",
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
              <MenuItem value="Auffahren">Auffahren</MenuItem>
              <MenuItem value="Rangieren/ Parken">Rangieren/ Parken</MenuItem>
              <MenuItem value="Missachtung der Vorfahrt">
                Missachtung der Vorfahrt
              </MenuItem>
              <MenuItem value="Abbiegen">Abbiegen</MenuItem>
              <MenuItem value="Abkommen von der Fahrbahn">
                Abkommen von der Fahrbahn
              </MenuItem>
              <MenuItem value="Überholvorgang">Überholvorgang</MenuItem>
              <MenuItem value="Spurwechsel">Spurwechsel</MenuItem>
              <MenuItem value="Sonstiges">Sonstiges</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="navigation-container">
        <Button type="submit" variant="contained" className="next-button">
          Weiter
          <ArrowRight size={"20"} />
        </Button>
      </div>
    </form>
  );
}
