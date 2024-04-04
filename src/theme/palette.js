import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const LOGO = {
  0: '#007BA4', // Zero opacity color
  100: '#1A89B5',
  200: '#2E9FCC',
  300: '#47B1E0',
  400: '#5ECAEB',
  500: '#79DFEE',
  600: '#93EDF2',
  700: '#AEEFF3',
  800: '#C9F7F7',
  900: '#E5FDFA',
};

const HOVER = {
  0: '#EFF4FF',
};
const PRIMARY = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#007BA4', // Updated main color
  dark: '#00A4DB', // on Hover
  darker: '#002533', // Adjusted darker color
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#C7EFFF', // Adjusted lighter color
  light: '#6BBBFF', // Adjusted light color
  main: '#00A4DB', // Updated main color
  dark: '#007699', // Adjusted dark color
  darker: '#00485F', // Adjusted darker color
  contrastText: '#fff',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  logo: LOGO,
  divider: alpha(LOGO[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    paper: '#fff',
    default: GREY[100],
    neutral: GREY[200],
  },
  action: {
    active: LOGO[0],
    hover: alpha(HOVER[0], 1),
    selected: alpha(HOVER[0], 0.60),
    disabled: alpha(LOGO[200], 0.8),
    disabledBackground: alpha(LOGO[200], 0.24),
    focus: alpha(HOVER[0], 0.70),
    hoverOpacity: 0.09,
    disabledOpacity: 0.48,
  },
};

export default palette;
