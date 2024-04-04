import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, Icon, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import Iconify from '../iconify/Iconify';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const { currentUser } = useAuth();

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 5 }}>
        {data.map((item) => {
          const isRoleAllowed = item[currentUser?.role.toLowerCase()];
          console.log('Items', item[currentUser?.role.toLowerCase()]);
          return isRoleAllowed ? (
            <NavItem style={{ marginTop: '100px', backgroundColor: 'blue' }} key={item.title} item={item} />
          ) : null;
        })}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};
function NavItem({ item }) {
  const location = useLocation();
  const { t } = useTranslation();

  const { title, path, icon, info } = item;
  const pathSegments = path.split('/').filter((segment) => segment !== ''); // Split the path and remove empty segments
  const locationSegments = location.pathname.split('/').filter((segment) => segment !== '');

  // Check if the first two segments of the path match the location pathname
  const isActive =
    pathSegments.length >= 2 &&
    locationSegments.length >= 2 &&
    pathSegments[0] === locationSegments[0] &&
    pathSegments[1] === locationSegments[1];

  return (
    <div style={{ marginTop: path === '/dashboard/company/companies' ? '80px' : '22px' }}>
      <Link to={path} className={`w-100 text-decoration-none  ${isActive ? 'text-primary' : 'text-muted'}`}>
        {' '}
        {icon && <Iconify className="me-2" icon={icon} />} <b>{t(`sidebar.${title}`)}</b>
      </Link>
    </div>
  );
}
