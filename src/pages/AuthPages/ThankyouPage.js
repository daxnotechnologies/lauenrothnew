import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Iconify from '../../components/iconify';
// sections
import LoginHeader from 'src/components/LoginHeader';
import Footer from 'src/layouts/Footer';

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

export default function ThankyouPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> ThankYou | Lauenroth </title>
      </Helmet>
      <LoginHeader />
      <StyledRoot style={{ overflow: 'hidden', position: 'relative' }}>
        <div
          className="d-md-block d-none"
          style={{
            position: 'absolute',
            height: '110vh',
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
            <Typography className="text-center mt-3 mb-4" variant="h3" gutterBottom>
              Thank you for contacting us!
            </Typography>
            <p className="text-muted text-center mb-4">
              We will get back to you soon to discuss your inquiry individually. Meanwhile find out more about our
              product and services.
            </p>
            <a className="mx-auto" target="_blank" href="www.lauenroth-gmbh.de">
              <Button>
                Discover Gute Ziele App <Iconify icon="mingcute:right-fill" />
              </Button>
            </a>
          </StyledContent>
        </Container>
      </StyledRoot>
      <Footer />
    </>
  );
}
