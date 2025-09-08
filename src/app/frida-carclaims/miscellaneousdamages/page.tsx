"use client";
import { createMiscellaneousDamagesValidationSchema } from "@/config/formConfig";
import { useGlobalFormStore } from "@/types/state";
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState} from "react";

export default function MiscellaneousdamagesPage() {
  const router = useRouter();

  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  // Gespeicherte Beschreibung direkt aus sessionStorage holen
  const getSavedDescription = () =>
    sessionStorage.getItem("miscellaneousDamageDescription") || "";

  // Wurde die Beschreibung beim Seitenladen bereits gelöscht?
  const wasInitiallyCleared =
    globalForm.miscellaneousDamages === true &&
    globalForm.miscellaneousDamageDescription === "";

  // State um zu verfolgen, ob das Feld manuell gelöscht wurde (also bewusst leer gelassen)
  const [fieldWasCleared, setFieldWasCleared] = useState(wasInitiallyCleared);

  const validationSchema = createMiscellaneousDamagesValidationSchema();

  const values = {
    miscellaneousDamages: globalForm.miscellaneousDamages || false,
    miscellaneousDamageDescription:
      globalForm.miscellaneousDamages === true
        ? (fieldWasCleared
            ? "" // Wenn bewusst gelöscht wurde, leeren String beibehalten
            : (globalForm.miscellaneousDamageDescription || getSavedDescription()))
        : "",
  };

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={(formData) => {
        console.log({ MISCELLANEOUSDAMAGES_FORM_SUBMIT: formData });
        setGlobalForm(formData);
        router.push("/frida-carclaims/witnesses");
      }}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values, setFieldValue, errors, touched }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <div className="form-group radio-group">
              <label>Gab es andere Sachschäden?</label>
              <RadioGroup
                name="miscellaneousDamages"
                row
                value={values.miscellaneousDamages}
                onChange={(e) => {
                  const newValue = e.target.value === "true";
                  setFieldValue("miscellaneousDamages", newValue);

                  if (newValue) {
                    // Bei "Ja": Gespeicherte Beschreibung laden, aber nur wenn nicht vorher bewusst gelöscht
                    if (!fieldWasCleared) {
                      // Nur wiederherstellen, wenn das Feld nicht bewusst gelöscht wurde
                      const savedDescription = getSavedDescription();
                      // console.log("Lade gespeicherte Beschreibung:", savedDescription);
                      setFieldValue("miscellaneousDamageDescription", savedDescription);
                    } else {
                      // console.log("Feld wurde bewusst gelöscht, behalte leeren Zustand");
                      // Stelle sicher, dass das Feld leer bleibt
                      setFieldValue("miscellaneousDamageDescription", "");
                    }
                  } else {
                    // Bei "Nein": Aktuelle Beschreibung in sessionStorage speichern und Feld leeren
                    if (values.miscellaneousDamageDescription.trim() !== '') {
                      // console.log("Speichere Beschreibung vor Wechsel zu Nein:", values.miscellaneousDamageDescription);
                      sessionStorage.setItem("miscellaneousDamageDescription", values.miscellaneousDamageDescription);
                    } else {
                      console.log("Leeres Feld beim Wechsel zu Nein, entferne aus Storage");
                      // Wenn das Feld bereits leer ist, entferne auch den Storage-Wert
                      sessionStorage.removeItem("miscellaneousDamageDescription");
                    }
                    setFieldValue("miscellaneousDamageDescription", "");
                  }
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

            {values.miscellaneousDamages && (
              <div className="form-group">
                <label>
                  Beschreiben Sie die entstandenen Sachschäden (z.B.
                  Straßenlampe, Bauwerk beschädigt usw.)
                </label>
                <TextField
                  name="miscellaneousDamageDescription"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={values.miscellaneousDamageDescription}
                  error={touched.miscellaneousDamageDescription && Boolean(errors.miscellaneousDamageDescription)}
                  helperText={touched.miscellaneousDamageDescription && errors.miscellaneousDamageDescription}
                  onChange={(e) => {
                    handleChange(e);
                    // Zusätzlich den Zustand verfolgen, ob das Feld geleert wurde
                    if (e.target.value.trim() === '') {
                      setFieldWasCleared(true);
                      // Wenn das Feld manuell gelöscht wurde, auch den Storage leeren
                      sessionStorage.removeItem("miscellaneousDamageDescription");
                    } else {
                      setFieldWasCleared(false);
                      // Eingabe direkt im Storage speichern
                      sessionStorage.setItem("miscellaneousDamageDescription", e.target.value);
                    }
                  }}
                />
              </div>
            )}
          </div>

          <div className="navigation-container">
            <Button type="submit" variant="contained" className="next-button">
              Weiter
              <ArrowRight size={"20"} />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}