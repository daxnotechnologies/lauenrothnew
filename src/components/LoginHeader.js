import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
// utils
import { bgBlur } from '../utils/cssStyles';
// components
import Iconify from '../components/iconify';
import Logo from './logo/Logo';
import { Link } from 'react-router-dom';
import MultilinguleDropDown from 'src/layouts/dashboard/header/MultilinguleDropDown';
import { useTranslation } from 'react-i18next';
import Translate from './GoogleTranslate/Translate';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `100%`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

LoginHeader.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function LoginHeader({ onOpenNav }) {
  const { t } = useTranslation();

  return (
    <StyledRoot className="border-bottom container-fluid text-center bg-white  d-flex jutify-content-center w-100">
      <StyledToolbar className="container mx-auto">
        <div className="d-flex flex-wrap align-items-center">
          <Logo
            sx={{
              maxWidth: '200px',
              top: { xs: 2, sm: 2, md: 2 },
              left: { xs: 16, sm: 24, md: 40 },
            }}
          />
          <Typography className="text-dark ms-sm-3 mt-2">{t('login_header.slogan')}</Typography>
        </div>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <Translate />
          {/* <MultilinguleDropDown /> */}
          <Link to="/contact">
            <Button className="me-4 text-muted">{t('login_header.contact')}</Button>
          </Link>
          <Link to="/register">
            <Button variant="contained" className="px-5 py-2" color="primary">
              {t('login_header.register')}
            </Button>
          </Link>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
