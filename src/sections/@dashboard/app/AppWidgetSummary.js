// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({
  imageUrl,
  rotate,
  title,
  bgColorgradiant,
  total,
  svg,
  icon,
  bgColor,
  color = 'primary',
  sx,
  ...other
}) {
  return (
    <>
      <Card
        sx={{
          py: 3,
          boxShadow: 0,
          textAlign: 'center',
          color: 'white',
          background: `${bgColor}`,
          background: `${bgColorgradiant}`,
          ...sx,
        }}
        {...other}
      >
        <StyledIcon
          sx={{
            margin: 'auto',
            color: 'white',
          }}
        >
          <img src={imageUrl} alt="Image" width={54} height={54} />
        </StyledIcon>
      </Card>

      <Typography className="mt-3 text-muted ms-1">{title}</Typography>
    </>
  );
}
