/**
 * Form Configuration Helper for Cypress Tests
 *
 * Uses the API endpoint to fetch the original field mappings from the main application.
 * This ensures no code duplication and maintains consistency with the actual form configuration.
 */

/**
 * Get all field names for a specific form type and section
 * @param {string} formType - Either 'a' or 'b' (or '' for 'a')
 * @param {string} section - Section name
 * @returns {Cypress.Chainable} Cypress chainable with field mappings for the section
 */
function getSectionFields(formType, section) {
  const type = formType === '' ? 'a' : formType;

  const baseUrl = Cypress.config('baseUrl') || 'http://localhost:3000';
  let url = `${baseUrl}/api/form-config`;

  const params = new URLSearchParams();
  if (section) params.append('section', section);
  params.append('type', type);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  return cy
    .request({
      method: 'GET',
      url: url,
      failOnStatusCode: true,
    })
    .then((response) => {
      const mappings = response.body;

      // If we got mappings for a specific section, return them directly
      if (section && typeof mappings === 'object' && !mappings.personalInfo) {
        return mappings;
      }

      // Otherwise extract the section from the full mappings
      const sectionFields = mappings[section];
      if (!sectionFields) {
        throw new Error(`Unknown section: ${section}`);
      }

      return sectionFields[type] || sectionFields;
    });
}

Cypress.Commands.add('getSectionFields', getSectionFields);
