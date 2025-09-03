'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalFormStore } from '@/types/state';
import { ClaimsSubmissionService } from '@/utils/claimsSubmissionService';
import { Formik, Form } from 'formik';
import { Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { Car, Heart, Eye, User, MapPin, ChevronDown, ArrowRight, SquarePen, UserX, Home, CarFront, UserCheck, Users, NotebookPen } from 'lucide-react';
import './summary.css';


export default function SummaryPage() {
  const router = useRouter();

  const globalForm = useGlobalFormStore((s) => s.form);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function displayValue(value: any) {
    if (value === undefined || value === null || value === '') {
      return <span className='display-value-empty'>-</span>;
    }
    if (typeof value === 'boolean' || value === 'true' || value === 'false') {
      return <span className='display-value'>{value ? 'Ja' : 'Nein'}</span>;
    }
    return <span className='display-value'>{value}</span>;
  }

  const handleEdit = (route: string) => {
    router.push(route);
  };

  async function sendClaimsdata() {
    setLoading(true);
    setError(null);
    try {
      const result = await ClaimsSubmissionService.submitClaims();
      if (result.success) {
        router.push('/frida-carclaims/success');
      } else {
        setError('Fehler beim Übermitteln der Schadendaten.');
      }
    } catch (e) {
      setError('Fehler beim Übermitteln der Schadendaten: ' + (e instanceof Error ? e.message : 'Unbekannter Fehler'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Formik
      initialValues={{}}
      onSubmit={sendClaimsdata}
    >
      {() => (
        <Form className="form-wrapper">
          <div className="form-content">
            <h1 style={{ marginBottom: '8px' }}>Zusammenfassung</h1>
            <h3 style={{ marginBottom: '8px' }} className='sticky-header'>Location</h3>

            {/* 1. Unfallinfo */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <MapPin size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Angaben zum Unfallort
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Sprache:</span>{displayValue(globalForm.language)}</div>
                  <div className='display-row'><span className='display-label'>Bearbeitungsnr.:</span>{displayValue(globalForm.accidentReportNumber)}</div>
                  <div className='display-row'><span className='display-label'>Unfall-Datum:</span>{displayValue(globalForm.accidentDate?.format?.('DD.MM.YYYY') ?? globalForm.accidentDate?.toString())}</div>
                  <div className='display-row'><span className='display-label'>Unfall-Uhrzeit:</span>{displayValue(globalForm.accidentTime?.format?.('HH:mm') ?? globalForm.accidentTime?.toString())}</div>
                  <div className='display-row'><span className='display-label'>Straße:</span>{displayValue(globalForm.accidentStreetName)}</div>
                  <div className='display-row'><span className='display-label'>Hausnummer:</span>{displayValue(globalForm.accidentHouseNumber)}</div>
                  <div className='display-row'><span className='display-label'>PLZ:</span>{displayValue(globalForm.accidentPostalCode)}</div>
                  <div className='display-row'><span className='display-label'>Ort:</span>{displayValue(globalForm.accidentCity)}</div>
                  <div className='display-row'><span className='display-label'>Beschreibung:</span>{displayValue(globalForm.accidentDetails)}</div>
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/accidentinfo')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>

            <h3 style={{ marginBottom: '8px', marginTop: '24px' }} className='sticky-header'>Versicherungsnehmer</h3>
            {/* 2. Versicherungsnehmer A */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <User size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Angaben zum Versicherungsnehmer
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Anrede:</span>{displayValue(globalForm.insuranceHolderSalutation)}</div>
                  <div className='display-row'><span className='display-label'>Name:</span>{displayValue(globalForm.insuranceHolderName)}</div>
                  <div className='display-row'><span className='display-label'>Nachname:</span>{displayValue(globalForm.insuranceHolderSurName)}</div>
                  <div className='display-row'><span className='display-label'>Straße:</span>{displayValue(globalForm.insuranceHolderStreetName)}</div>
                  <div className='display-row'><span className='display-label'>Hausnummer:</span>{displayValue(globalForm.insuranceHolderHouseNumber)}</div>
                  <div className='display-row'><span className='display-label'>PLZ:</span>{displayValue(globalForm.insuranceHolderPostalCode)}</div>
                  <div className='display-row'><span className='display-label'>Ort:</span>{displayValue(globalForm.insuranceHolderCity)}</div>
                  <div className='display-row'><span className='display-label'>Telefon:</span>{displayValue(globalForm.insuranceHolderTelephone)}</div>
                  <div className='display-row'><span className='display-label'>Email:</span>{displayValue(globalForm.insuranceHolderEmail)}</div>
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/personalinfo/a')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            {/* 3. Fahrzeuginformationen - Versicherungsnehmer */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <Car size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px'}} />Angaben zum Fahrzeug (Versicherungsnehmer)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Vorsteuerabzug:</span>{displayValue(globalForm.vatDeduction)}</div>
                  <div className='display-row'><span className='display-label'>Automarke:</span>{displayValue(globalForm.carBrand)}</div>
                  <div className='display-row'><span className='display-label'>Automodell:</span>{displayValue(globalForm.carModel)}</div>
                  <div className='display-row'><span className='display-label'>Amtliches Kennzeichen:</span>{displayValue(globalForm.licensePlate)}</div>
                  <div className='display-row'><span className='display-label'>Versicherung:</span>{displayValue(globalForm.insuranceCompany)}</div>
                  <div className='display-row'><span className='display-label'>Versicherungsnummer:</span>{displayValue(globalForm.insuranceNumber)}</div>
                  <div className='display-row'><span className='display-label'>Fahrgestellnummer:</span>{displayValue(globalForm.chassisNumber)}</div>
                  <div className='display-row'><span className='display-label'>Kilometerstand:</span>{displayValue(globalForm.odometerReading)}</div>
                  <div className='display-row'><span className='display-label'>Grüne Karte:</span>{displayValue(globalForm.greenCardNumber)}</div>
                  <div className='display-row'><span className='display-label'>Grüne Karte - gültig bis:</span>{displayValue(globalForm.validDateGreenCard?.toString())}</div>
                  <div className='display-row'><span className='display-label'>Vollkaskoversichert:</span>{displayValue(globalForm.allRiskInsurance)}</div>
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/vehicleinfo/a')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            {/* 4. Fahrer Versicherungsnehmer A */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <UserCheck size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Angaben zum Fahrer (Versicherungsnehmer)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Anrede:</span>{displayValue(globalForm.driverSalutation)}</div>
                  <div className='display-row'><span className='display-label'>Name:</span>{displayValue(globalForm.driverName)}</div>
                  <div className='display-row'><span className='display-label'>Nachname:</span>{displayValue(globalForm.driverSurName)}</div>
                  <div className='display-row'><span className='display-label'>Straße:</span>{displayValue(globalForm.driverStreetName)}</div>
                  <div className='display-row'><span className='display-label'>Hausnummer:</span>{displayValue(globalForm.driverHouseNumber)}</div>
                  <div className='display-row'><span className='display-label'>PLZ:</span>{displayValue(globalForm.driverPostalCode)}</div>
                  <div className='display-row'><span className='display-label'>Ort:</span>{displayValue(globalForm.driverCity)}</div>
                  <div className='display-row'><span className='display-label'>Telefon:</span>{displayValue(globalForm.driverTelephone)}</div>
                  <div className='display-row'><span className='display-label'>Email:</span>{displayValue(globalForm.driverEmail)}</div>
                  <div className='display-row'><span className='display-label'>Führerscheinnummer:</span>{displayValue(globalForm.driverDriverLicense)}</div>
                  <div className='display-row'><span className='display-label'>Zulassungsbehörde:</span>{displayValue(globalForm.driverLicenseIssuingAuthority)}</div>
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/driverinfo/a')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            {/* 5. Schadensort Versicherungsnehmer A */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <CarFront size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Beschädigte Fahrzeugteile  (Versicherungsnehmer)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div style={{ marginBottom: 4 }}><strong>Fahrzeugteile:</strong></div>
                  {Array.isArray(globalForm.driverDamagedParts) && globalForm.driverDamagedParts.length > 0 ? (
                    <ul style={{ marginTop: 0, marginBottom: 12, paddingLeft: 20 }}>
                      {globalForm.driverDamagedParts.map((part, idx) => (
                        <li key={idx}>{part}</li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ marginBottom: 12 }}>Keine beschädigten Teile angegeben</div>
                  )}
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/damagelocation/a')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            {/* 6. Schadensbeschreibung Versicherungsnehmer A */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <NotebookPen size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Angaben zur Schadensbeschreibung (Versicherungsnehmer)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Fahrzeugschäden Beschreibung:</span>{displayValue(globalForm.damageDescription)}</div>
                  <div className='display-row'><span className='display-label'>Bemerkungen:</span>{displayValue(globalForm.additionalComments)}</div>
                  <div className='display-row'><span className='display-label'>Fahrbereitschaft:</span>{displayValue(globalForm.vehicleOperational)}</div>
                  <div className='display-row'><span className='display-label'>Hochgeladene Dateien:</span>{displayValue(globalForm.driverFileUploads?.length)}</div>
                  <div className='display-row'><span className='display-label'>Fahrzeugschaden Grund:</span>{displayValue(globalForm.damageType)}</div>
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/damagedescription/a')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            <h3 style={{ marginBottom: '8px', marginTop: '24px' }} className='sticky-header'>Geschädigter</h3>
            {/* 7. Geschädigter B */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <Users size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Angaben zum Geschädigten
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Anrede:</span>{displayValue(globalForm.otherInsuranceHolderSalutation)}</div>
                  <div className='display-row'><span className='display-label'>Name:</span>{displayValue(globalForm.otherInsuranceHolderName)}</div>
                  <div className='display-row'><span className='display-label'>Nachname:</span>{displayValue(globalForm.otherInsuranceHolderSurName)}</div>
                  <div className='display-row'><span className='display-label'>Straße:</span>{displayValue(globalForm.otherInsuranceHolderStreetName)}</div>
                  <div className='display-row'><span className='display-label'>Hausnummer:</span>{displayValue(globalForm.otherInsuranceHolderHouseNumber)}</div>
                  <div className='display-row'><span className='display-label'>PLZ:</span>{displayValue(globalForm.otherInsuranceHolderPostalCode)}</div>
                  <div className='display-row'><span className='display-label'>Ort:</span>{displayValue(globalForm.otherInsuranceHolderCity)}</div>
                  <div className='display-row'><span className='display-label'>Telefon:</span>{displayValue(globalForm.otherInsuranceHolderTelephone)}</div>
                  <div className='display-row'><span className='display-label'>Email:</span>{displayValue(globalForm.otherInsuranceHolderEmail)}</div>
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/personalinfo/b')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            {/* 8. Fahrzeuginformationen - Geschädigter */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <Car size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Angaben zum Fahrzeug (Geschädigter)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Vorsteuerabzug:</span>{displayValue(globalForm.otherVatDeduction)}</div>
                  <div className='display-row'><span className='display-label'>Marke:</span>{displayValue(globalForm.otherCarBrand)}</div>
                  <div className='display-row'><span className='display-label'>Modell:</span>{displayValue(globalForm.otherCarModel)}</div>
                  <div className='display-row'><span className='display-label'>Kennzeichen:</span>{displayValue(globalForm.otherLicensePlate)}</div>
                  <div className='display-row'><span className='display-label'>Versicherung:</span>{displayValue(globalForm.otherInsuranceCompany)}</div>
                  <div className='display-row'><span className='display-label'>Versicherungsnummer:</span>{displayValue(globalForm.otherInsuranceNumber)}</div>
                  <div className='display-row'><span className='display-label'>Fahrgestellnummer:</span>{displayValue(globalForm.otherChassisNumber)}</div>
                  <div className='display-row'><span className='display-label'>Kilometerstand:</span>{displayValue(globalForm.otherOdometerReading)}</div>
                  <div className='display-row'><span className='display-label'>Vollkaskoversichert:</span>{displayValue(globalForm.otherAllRiskInsurance)}</div>
                  <div className='display-row'><span className='display-label'>Grüne Karte - gültig bis:</span>{displayValue(globalForm.otherValidDateGreenCard?.toString())}</div>
                  <div className='display-row'><span className='display-label'>Vollkaskoversichert:</span>{displayValue(globalForm.otherAllRiskInsurance)}</div>
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/vehicleinfo/b')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            {/* 9. Fahrer Geschädigter */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <UserX size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Angaben zum Fahrer (Geschädigter)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Anrede:</span>{displayValue(globalForm.otherDriverSalutation)}</div>
                  <div className='display-row'><span className='display-label'>Name:</span>{displayValue(globalForm.otherDriverName)}</div>
                  <div className='display-row'><span className='display-label'>Nachname:</span>{displayValue(globalForm.otherDriverSurName)}</div>
                  <div className='display-row'><span className='display-label'>Straße:</span>{displayValue(globalForm.otherDriverStreetName)}</div>
                  <div className='display-row'><span className='display-label'>Hausnummer:</span>{displayValue(globalForm.otherDriverHouseNumber)}</div>
                  <div className='display-row'><span className='display-label'>PLZ:</span>{displayValue(globalForm.otherDriverPostalCode)}</div>
                  <div className='display-row'><span className='display-label'>Ort:</span>{displayValue(globalForm.otherDriverCity)}</div>
                  <div className='display-row'><span className='display-label'>Telefon:</span>{displayValue(globalForm.otherDriverTelephone)}</div>
                  <div className='display-row'><span className='display-label'>Email:</span>{displayValue(globalForm.otherDriverEmail)}</div>
                  <div className='display-row'><span className='display-label'>Führerscheinnummer:</span>{displayValue(globalForm.otherDriverDriverLicense)}</div>
                  <div className='display-row'><span className='display-label'>Zulassungsbehörde:</span>{displayValue(globalForm.otherDriverLicenseIssuingAuthority)}</div>
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/driverinfo/b')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            {/* 10. Schadensort Geschädigter */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <CarFront size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Beschädigte Fahrzeugteile (Geschädigter)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div style={{ marginBottom: 4 }}><strong>Schadensort:</strong></div>
                  {Array.isArray(globalForm.otherDriverDamagedParts) && globalForm.otherDriverDamagedParts.length > 0 ? (
                    <ul style={{ marginTop: 0, marginBottom: 12, paddingLeft: 20 }}>
                      {globalForm.otherDriverDamagedParts.map((part, idx) => (
                        <li key={idx}>{part}</li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ marginBottom: 12 }}>Keine beschädigten Teile angegeben</div>
                  )}
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/damagelocation/b')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            {/* 11. Schadensbeschreibung Geschädigter */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <NotebookPen size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Angaben zur Schadensbeschreibung (Geschädigter)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Fahrzeugschäden Beschreibung:</span>{displayValue(globalForm.otherDamageDescription)}</div>
                  <div className='display-row'><span className='display-label'>Bemerkungen:</span>{displayValue(globalForm.otherAdditionalComments)}</div>
                  <div className='display-row'><span className='display-label'>Fahrbereitschaft:</span>{typeof globalForm.otherVehicleOperational === 'boolean' ? (globalForm.otherVehicleOperational ? 'Ja' : 'Nein') : displayValue(undefined)}</div>
                  <div className='display-row'><span className='display-label'>Hochgeladene Dateien:</span>{displayValue(globalForm.otherDriverFileUploads?.length)}</div>
                  <div className='display-row'><span className='display-label'>Fahrzeugschaden Grund:</span>{displayValue(globalForm.otherDamageType)}</div>
                  <div className='display-row'><span className='display-label'>Verletzte vorhanden:</span>{displayValue(globalForm.hasInjured)}</div>
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/damagedescription/b')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            <h3 style={{ marginBottom: '8px', marginTop: '24px' }} className='sticky-header'>Allgemein</h3>
            {/* 12. Angaben zu verletzten Personen */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <Heart size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Angaben zu verletzten Personen
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Verletzte vorhanden:</span>{displayValue(globalForm.hasInjured)}</div>
                  <div className='display-row'><span className='display-label'>Anzahl:</span>{displayValue(globalForm.injuredCount)}</div>
                  <div className='display-row'><span className='display-label'>Sachschäden:</span>{displayValue(globalForm.miscellaneousDamages)}</div>
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/injuredpersons')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            {/* 13. Angaben zu anderen Sachschäden */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <Home size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Angaben zu anderen Sachschäden
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  <div className='display-row'><span className='display-label'>Sachschäden:</span>{displayValue(globalForm.miscellaneousDamages)}</div>
                  <div className='display-row'><span className='display-label'>Beschreibung:</span>{displayValue(globalForm.miscellaneousDamageDescription)}</div>
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/miscellaneousdamages')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>
            {/* 14. Angaben zu Zeugen */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <Eye size={24} color='teal' style={{ marginRight: '8px', minWidth: '24px' }} />Angaben zu Zeugen
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-grid">
                  {(globalForm.witnessesCount ?? 0) > 0 && Array.isArray(globalForm.witnesses) && globalForm.witnesses.length > 0 ? (
                    <>
                      {globalForm.witnesses.map((w, i) => (
                        <div key={i} style={{ marginBottom: 16 }}>
                          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Zeuge {i + 1}</div>
                          <div className='display-row'><span className='display-label'>Anrede:</span>{displayValue(w.salutation)}</div>
                          <div className='display-row'><span className='display-label'>Name:</span>{displayValue(w.name)}</div>
                          <div className='display-row'><span className='display-label'>Nachname:</span>{displayValue(w.surName)}</div>
                          <div className='display-row'><span className='display-label'>Straße:</span>{displayValue(w.streetName)}</div>
                          <div className='display-row'><span className='display-label'>Hausnummer:</span>{displayValue(w.houseNumber)}</div>
                          <div className='display-row'><span className='display-label'>PLZ:</span>{displayValue(w.postalCode)}</div>
                          <div className='display-row'><span className='display-label'>Ort:</span>{displayValue(w.city)}</div>
                          <div className='display-row'><span className='display-label'>Telefon:</span>{displayValue(w.telephone)}</div>
                          <div className='display-row'><span className='display-label'>Email:</span>{displayValue(w.email)}</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div>Keine Zeugen angegeben</div>
                  )}
                </div>
                <Button variant="text" onClick={() => handleEdit('/frida-carclaims/witnesses')} startIcon={<SquarePen size={18} />} sx={{ display: 'flex', paddingY: 1, color: 'black', marginTop: '20px' }}>Angaben anpassen</Button>
              </AccordionDetails>
            </Accordion>

            {error && <div style={{ color: 'teal' }}>{error}</div>}
          </div>
          <div className="navigation-container">
            <Button type="submit" variant="contained" className="next-button" disabled={loading}>
              {loading ? 'Wird gesendet...' : 'Bestätigen und weiter'}
              <ArrowRight size={'20'} />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

