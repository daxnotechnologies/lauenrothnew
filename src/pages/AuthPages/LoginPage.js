import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
// sections
import { LoginForm } from '../../sections/auth/login';
import LoginHeader from 'src/components/LoginHeader';
import Footer from 'src/layouts/Footer';
import logo2 from '../../components/logo/logo2.png';
import { useTranslation } from 'react-i18next';
import Translate from 'src/components/GoogleTranslate/Translate';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title> Login | Lauenroth </title>
      </Helmet>
      <LoginHeader />

      <StyledRoot style={{ overflow: 'hidden', position: 'relative' }}>
        <div
          className="d-md-block d-none"
          style={{
            position: 'absolute',
            height: '115vh',
            width: '120%',
            backgroundColor: '#EFF4FF',
            bottom: '-30vh',
            left: '-10%',
            zIndex: '-2',
            borderTopLeftRadius: '50%', // Sets border radius for the top-left corner
            borderTopRightRadius: '50%', // Sets border radius for the top-right corner
            borderBottomLeftRadius: '0', // No border radius for the bottom-left corner
            borderBottomRightRadius: '0', // No border radius for the bottom-right corner
          }}
        ></div>
        <Container maxWidth="sm">
          <StyledContent>
            <img src={logo2} style={{ maxWidth: '140px' }} className="mx-auto" />
            <Typography className="text-center mt-3 mb-5" variant="h4" gutterBottom>
              {t('login_pg.WB')}
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
      <Footer />
    </>
  );
}
