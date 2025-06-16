"use client";
import { InsuranceHolderFormState, useGlobalFormStore } from "@/types/state";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InsuranceholderPage() {
  const router = useRouter();

  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  const values: InsuranceHolderFormState = {
    vatDeduction: globalForm.vatDeduction || "",
    carBrand: globalForm.carBrand || "",
    carModel: globalForm.carModel || "",
    licensePlate: globalForm.licensePlate || "",
    insuranceCompany: globalForm.insuranceCompany || "",
    insuranceNumber: globalForm.insuranceNumber || "",
    chassisNumber: globalForm.chassisNumber || "",
    odometerReading: globalForm.odometerReading || "",
    greenCardNumber: globalForm.greenCardNumber || "",
    validDateGreenCard: globalForm.validDateGreenCard ?? dayjs(),
    allRiskInsurance: globalForm.allRiskInsurance || "",
  };

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={(values) => {
        console.log({"FORM_SUBMIT" : values});
        setGlobalForm(values);
        router.push("/frida-carclaims/driverinfo");
      }}
      // validationSchema={carclaimsDatailsValidator}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        errors,
        touched,
        values,
      }) => (
        <Form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-content">
            <div className="form-group radio-group">
              <label>Besteht Berechtigung zum Vorsteuerabzug?</label>
              <RadioGroup
                name="vatDeduction"
                row
                value={values.vatDeduction}
                onChange={handleChange}
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

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>Automarke (z.B. Audi, Mercedes Benz etc.):</label>
                <TextField
                  name="carBrand"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.carBrand}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item-big">
                <label>Automodell (z.B. A4, CLA etc.):</label>
                <TextField
                  name="carModel"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.carModel}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item-big">
                <label>Amtliches Kennzeichen (z.B. BGJ9854):</label>
                <TextField
                  name="licensePlate"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.licensePlate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>Name der Versicherungsgesellschaft:</label>
                <TextField
                  name="insuranceCompany"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.insuranceCompany}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item-big">
                <label>
                  Versicherungsscheinnummer (ID-Nr. der Versicherung):
                </label>
                <TextField
                  name="insuranceNumber"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.insuranceNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>Fahrgestellnummer (Fahrzeugzulassung):</label>
                <TextField
                  name="chassisNumber"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.chassisNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item-big">
                <label>Aktueller KM-Stand (Siehe Tachometer des Autos):</label>
                <TextField
                  name="odometerReading"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.odometerReading}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group-horizontal">
              <div className="form-group-item-big">
                <label>Nummer der Grünen Karte des Versicherers:</label>
                <TextField
                  name="greenCardNumber"
                  fullWidth
                  placeholder="Bitte ausfüllen"
                  variant="outlined"
                  value={values.greenCardNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item-small">
                <label>Grüne Karte gültig bis:</label>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="de"
                >
                  <MobileDatePicker
                    value={values.validDateGreenCard}
                    enableAccessibleFieldDOMStructure={false}
                    onChange={(newValue) => {
                      setFieldValue("validDateGreenCard", newValue);
                      setFieldTouched("validDateGreenCard", true);
                    }}
                    slots={{
                      textField: props => {
                        return <TextField {...props} />;
                      },
                    }}
                    slotProps={{
                      textField: {
                        readOnly: true,
                        fullWidth: true,
                        variant: "outlined",
                        placeholder: "Datum auswählen",
                        error: !!(
                          errors.validDateGreenCard &&
                          touched.validDateGreenCard
                        ),
                        helperText:
                          touched.validDateGreenCard &&
                          errors.validDateGreenCard
                            ? errors.validDateGreenCard
                            : null,
                      },
                    }}
                    format="DD.MM.YYYY"
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className="form-group radio-group">
              <label>Besteht eine Vollkaskoversicherung?</label>
              <RadioGroup
                name="allRiskInsurance"
                row
                value={values.allRiskInsurance}
                onChange={handleChange}
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
