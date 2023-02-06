import { createTheme as createMuiTheme, ThemeOptions, Theme } from '@mui/material/styles';

export const brandColors = {
  main: '#0086b3',
};

declare module '@mui/material/styles' {
  interface Theme {
    brandColors: typeof brandColors;
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    brandColors?: typeof brandColors;
  }
}

const baseTheme: Partial<ThemeOptions> = {
  brandColors,
  palette: {
    primary: {
      main: brandColors.main,
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  shape: {
    borderRadius: 4,
  },
};

const theme = createMuiTheme(baseTheme);

export type IbrandColors = keyof Theme['brandColors'];
export default theme;
