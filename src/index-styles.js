export const colors = {
  primary: '#009ad3',
  primaryGlow: 'rgba(0, 154, 211, 0.25)',
  secondary: '#8855a7',
  background: '#F7F9FC',
  white: '#fff',
  gray100: '#f1f2f7',
  gray200: '#d1d3dd',
  gray300: '#b9bcc6',
  gray400: '#8d919a',
  gray500: '#6e717a',
  gray600: '#5a5e69',
  gray700: '#444952',
  gray800: '#30343c',
  gray900: '#1f2228',
  gray1000: '#090a0d',
  black: '#000',
};

export const typography = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  mono: '"Source Code Pro", monospace',
  headingColor: colors.gray600,
  bodyColor: colors.gray800,
  anchorColor: colors.primary,
  fontBase: '1rem',
};

export const breakpoints = {
  tabletPortrait: `@media (min-width: 600px)`,
  tabletLandscape: `@media (min-width: 900px)`,
  desktop: `@media (min-width: 1200px)`,
};

export const globalBorderRadius = '4px';
export const globalBoxShadow =
  '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)';
export const globalPadding = {
  padding: '12px',
  [breakpoints.tabletPortrait]: {
    padding: '16px',
  },
  [breakpoints.tabletLandscape]: {
    padding: '20px',
  },
  [breakpoints.desktop]: {
    padding: '24px',
  },
};

export const themeConfig = {
  colors,
  typography,
  breakpoints,
  globalPadding,
  globalBorderRadius,
  globalBoxShadow,
};
