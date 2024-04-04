import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import Footer from '../Footer';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 13,
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 13,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <StyledRoot className="d-flex flex-wrap w-100  bg-white">
      <Header onOpenNav={() => setOpen(true)} />
      <div className="d-flex main-wrapper w-100 bg-white">
        <Nav sx={{ backgroundColor: '#fff' }} openNav={open} onCloseNav={() => setOpen(false)} />
        <Main className="w-100 px-0 pb-0 mx-0 ">
          <Outlet />
        </Main>
      </div>
      <Footer width="100%" />
    </StyledRoot>
  );
}
