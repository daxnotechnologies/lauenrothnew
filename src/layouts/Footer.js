import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import logo1 from '../components/logo/logo1.png';
import { Link } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FooterDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.logo[0], 1),
}));
export default function Footer() {
  const location = useLocation();
  const isDashboardAppRoute =
    location.pathname === '/dashboard/app' ||
    location.pathname === '/login' ||
    location.pathname === '/contact' ||
    location.pathname === '/register' ||
    location.pathname === '/thank-you';
  const { t } = useTranslation();

  return (
    <FooterDiv className={`container-fluid pt-5 ${isDashboardAppRoute ? '' : 'mt-5'} pb-4`} style={{ zIndex: '2' }}>
      <div className="container text-white">
        <div className="row">
          <div className="col-lg-3 col-md-5 col-sm-7 col-12">
            <p className="text-white font-bold">{t('footer.title')}</p>
            <a className="" target="_blank" href="https://www.lauenroth-gmbh.de/">
              <img src={logo1} style={{ maxWidth: '240px' }} />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mt-2 d-flex justify-content-sm-start justify-content-center align-items-center">
            <Link className="text-white me-md-4 me-sm-3 me-2 text-decoration-none" to="/contact">
              {t('footer.contact')}
            </Link>
            <Link className="text-white mx-md-4 mx-sm-3 mx-2 text-decoration-none" to="/privacy">
              {t('footer.pp')}
            </Link>
            <Link className="text-white mx-md-4 mx-sm-3 mx-2 text-decoration-none" to="/terms">
              {t('footer.tnc')}
            </Link>
            <Link className="text-white mx-md-4 mx-sm-3 mx-2 text-decoration-none" to="/imprint">
              {t('footer.imprint')}
            </Link>
          </div>
          <div className="col-sm-6 d-flex justify-content-sm-end justify-content-center mt-2">
            <a
              className="mx-md-4 text-decoration-none text-white mt-auto mx-sm-3 mx-2"
              target="_blank"
              href="https://www.linkedin.com/in/jörg-lauenroth-1bb82953"
            >
              <Iconify width="50px" icon="fa6-brands:linkedin" />
            </a>
            <a
              className="mx-md-4 text-decoration-none text-white mt-auto mx-sm-3 mx-2"
              target="_blank"
              href="https://www.xing.com/profile/Joerg_Lauenroth/portfolio"
            >
              <Iconify width="50px" icon="fa6-brands:square-xing" />
            </a>
            <a
              className="ms-md-4 text-decoration-none text-white mt-auto ms-sm-3 ms-2"
              target="_blank"
              href="https://www.facebook.com/Lauenrothpotenzialtraining"
            >
              <Iconify width="50px" icon="fa6-brands:square-facebook" />
            </a>
          </div>
        </div>
      </div>
    </FooterDiv>
  );
}
