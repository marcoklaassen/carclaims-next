import { NextRequest, NextResponse } from 'next/server';
import {
  PERSONAL_INFO_FIELDS,
  VEHICLE_INFO_FIELDS,
  DRIVER_INFO_FIELDS,
  DAMAGE_LOCATION_FIELDS,
  DAMAGE_DESCRIPTION_FIELDS
} from '../../../../config/formConfig';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const formType = searchParams.get('type') || 'a';

  try {
    const fieldMappings = {
      personalInfo: PERSONAL_INFO_FIELDS,
      vehicleInfo: VEHICLE_INFO_FIELDS,
      driverInfo: DRIVER_INFO_FIELDS,
      damageLocation: DAMAGE_LOCATION_FIELDS,
      damageDescription: DAMAGE_DESCRIPTION_FIELDS,
    };

    if (section) {
      const sectionFields = fieldMappings[section as keyof typeof fieldMappings];
      if (!sectionFields) {
        return NextResponse.json(
          { error: `Unknown section: ${section}` },
          { status: 400 }
        );
      }

      const typeFields = sectionFields[formType as keyof typeof sectionFields];
      if (!typeFields) {
        return NextResponse.json(
          { error: `Unknown form type: ${formType}` },
          { status: 400 }
        );
      }

      return NextResponse.json(typeFields);
    }

    // Return all mappings if no specific section requested
    return NextResponse.json({
      personalInfo: PERSONAL_INFO_FIELDS,
      vehicleInfo: VEHICLE_INFO_FIELDS,
      driverInfo: DRIVER_INFO_FIELDS,
      damageLocation: DAMAGE_LOCATION_FIELDS,
      damageDescription: DAMAGE_DESCRIPTION_FIELDS,
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
