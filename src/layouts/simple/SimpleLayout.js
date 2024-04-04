import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// components
import Logo from '../../components/logo';
import { Typography,Toolbar } from '@mui/material';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;
const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
 
}));
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <StyledHeader className="border-bottom bg-white">
        <StyledToolbar>
          <div className="d-flex flex-wrap align-items-center">
            <Logo style={{ maxWidth: '210px'}} />
            <Typography className="text-dark ms-sm-3 mt-2">Your digital team space</Typography>
          </div>
        </StyledToolbar>
      </StyledHeader>

      <Outlet />
    </>
  );
}
