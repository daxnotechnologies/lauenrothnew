import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
// sections
import { ContactForm } from '../../sections/auth/contact';
import LoginHeader from 'src/components/LoginHeader';
import Footer from 'src/layouts/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

export default function ContactPage() {
  const mdUp = useResponsive('up', 'md');
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title> Contact | Lauenroth </title>
      </Helmet>
      <LoginHeader />
      <StyledRoot style={{ overflow: 'hidden', position: 'relative' }}>
        <div
          className="d-md-block d-none"
          style={{
            position: 'absolute',
            height: '119vh',
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
        <Container maxWidth="sm" style={{ marginBottom: '-55px' }}>
          <StyledContent>
            <Typography className="text-center mt-3 mb-5" variant="h4" gutterBottom>
              {t('contact_pg.title')} <br />
              {t('contact_pg.description')}
            </Typography>

            <ContactForm />
          </StyledContent>
        </Container>
      </StyledRoot>
      <Footer />
    </>
  );
}
