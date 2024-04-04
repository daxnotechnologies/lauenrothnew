import React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import LoginHeader from 'src/components/LoginHeader';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/layouts/Footer';

const Imprint = () => {
  return (
    <>
      <Helmet>
        <title> Privacy Policy | Lauenroth </title>
      </Helmet>
      <LoginHeader />
      <Container style={{ marginTop: '100px', minHeight: 'calc(100vh - 250px)' }} className="py-5">
        <Typography variant="h3" className="text-start my-2" gutterBottom>
          Imprint
        </Typography>
        <div className="text-muted">
          <br />
          <p>Verantwortlich:</p>
          <p>Lauenroth GmbH</p>
          <p>Jörg Lauenroth</p>
          <p>Schnetzen 1/1</p>
          <p>88276 Berg</p>
          <p>
            <br />
          </p>
          <p>
            <a
              href="mailto:hallo@lauenroth-gmbh.de"
              rel="noopener noreferrer"
              target="_blank"
              style={{
                color: 'rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1))',
              }}
            >
              hallo@lauenroth-gmbh.de
            </a>
          </p>
          <p>07505 – 9578900</p>
          <p>
            <br />
          </p>
          <p>Umsatzsteuer-ID:</p>
          <p>Handelsregister: Amtsgericht Ulm, HRB 747174</p>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Imprint;
