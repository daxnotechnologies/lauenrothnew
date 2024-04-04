import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/ic_flag_de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/ic_flag_fr.svg',
  },
  {
    value: 'ae',
    label: 'Arabic',
    icon: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ae.svg',
  },

  {
    value: 'es',
    label: 'Spainish',
    icon: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/es.svg',
  },
  {
    value: 'fi',
    label: 'Finish',
    icon: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/fi.svg',
  },
  {
    value: 'ir',
    label: 'Persian',
    icon: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ir.svg',
  },
  {
    value: 'in',
    label: 'Hindi',
    icon: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/in.svg',
  },
  {
    value: 'my',
    label: 'Malay',
    icon: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/my.svg',
  },
  {
    value: 'pk',
    label: 'Urdu',
    icon: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/pk.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === LANGS[0].value} onClick={() => handleClose()}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
