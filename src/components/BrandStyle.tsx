import { brandConfig, lighten, darken, toRgbString } from '@/config/brand';

export default function BrandStyle() {
  const { primaryColor, secondaryColor, headerBg, buttonRadius } = brandConfig;
  const primaryLight = lighten(primaryColor, 0.25);
  const primaryDark = darken(primaryColor, 0.15);
  const primaryRgb = toRgbString(primaryColor);

  const css = `
:root {
  --primary-color: ${primaryColor};
  --primary-color-light: ${primaryLight};
  --primary-color-dark: ${primaryDark};
  --primary-rgb: ${primaryRgb};
  --primary-color-light--50: rgba(${primaryRgb}, 0.25);
  --primary-color-light--75: rgba(${primaryRgb}, 0.40);
  --secondary-color: ${secondaryColor};
  --dark-gray: ${headerBg};
  --border-radius-button: ${buttonRadius};
}
`.trim();

  return (
    // React 19: <style precedence> is hoisted to <head> from anywhere in the tree.
    // precedence="high" places it after default-precedence stylesheets so it wins the cascade.
    <style
      href="brand-vars"
      precedence="high"
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
}
