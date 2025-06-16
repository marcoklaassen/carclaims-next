"use client"

import { DriverOfInsuranceHolderFormState, useGlobalFormStore } from "@/types/state";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Formik, Form } from "formik";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DamageLocationPage() {
  const router = useRouter();

  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

 const values : DriverOfInsuranceHolderFormState = {
  driverHolderDamagedParts: globalForm.driverHolderDamagedParts || [],

 }
  const availableDamageParts = [
    "Reifen vorne rechts",
    "Reifen vorne links",
    "Reifen hinten rechts",
    "Reifen hinten links",
    "Scheibe vorne rechts",
    "Scheibe vorne links",
    "Scheibe hinten rechts",
    "Scheibe hinten links",
    "Kennzeichen vorne",
    "Kennzeichen hinten",
    "Kotflügel vorne rechts",
    "Kotflügel vorne links",
    "Stoßstange vorne",
    "Stoßstange hinten",
    "Motorhaube",
    "Kofferraumklappe",
    "Dach",
  ];

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={(values) => {
        console.log({"FORM_SUBMIT" : values});
        setGlobalForm(values);

        router.push("/frida-carclaims/damagedescription");
      }}
      // validationSchema={carclaimsDatailsValidator}
    >
      {({ handleSubmit, setFieldValue, setFieldTouched, values }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <div className="section-title">
              <h2>Markieren Sie die Unfallstelle</h2>
              <div className="info-box">
                <div className="info-icon">i</div>
                <p>
                  Wählen Sie die jeweiligen Stellen auf der Grafik per Klick
                  aus. Wenn Sie erneut auf die Stelle klicken, heben Sie Ihre
                  Auswahl wieder auf.
                </p>
              </div>
            </div>

            {/* Schadensbereiche als Auswahloptionen anzeigen */}
            <div className="damage-options-grid">
              {(values.driverHolderDamagedParts ?? []).map((part, index) => (
                <div
                  key={index}
                  className="damage-option selected"
                  onClick={() => {
                    setFieldValue(
                      "driverHolderDamagedParts",
                      (values.driverHolderDamagedParts ?? []).filter((element) => element !== part)
                    );
                    setFieldTouched("driverHolderDamagedParts", true);
                  }}
                >
                  {part} <span className="check-icon">✓</span>
                </div>
              ))}
            </div>

            {/* Dropdown für die Auswahl weiterer Bereiche */}
            <FormControl
              fullWidth
              variant="outlined"
            >
              <InputLabel shrink={false} style={{color: "rgba(0, 0, 0, 0.87", opacity: "0.5"}}>Weitere Schadensstellen hinzufügen</InputLabel>
              <Select
                value=""
                onChange={(e) => {
                  if (
                    !(values.driverHolderDamagedParts ?? []).includes(e.target.value)
                  ) {
                    setFieldValue("driverHolderDamagedParts", [
                      ...(values.driverHolderDamagedParts ?? []),
                      e.target.value,
                    ]);
                  }
                  // setFieldTouched("driverHolderDamagedParts", true);
                }}
              >
                <MenuItem value="" disabled>
                  Bitte auswählen
                </MenuItem>
                {availableDamageParts
                  .filter((part) => !(values.driverHolderDamagedParts ?? []).includes(part))
                  .map((part, index) => (
                    <MenuItem key={index} value={part}>
                      {part}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Platzhalter für Fahrzeugbild -wird durch ein tatsächliches Bild ersetzt */}
            <div className="car-image-placeholder">
              <div>Fahrzeugbild hier</div>
              <div style={{ fontSize: "12px", marginTop: "8px" }}>
                Klicken Sie auf die entsprechenden Bereiche am Fahrzeug, um
                Schäden zu markieren
              </div>
            </div>
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
