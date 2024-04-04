import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, Button, IconButton, InputAdornment, Alert, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// components
import Iconify from '../../../components/iconify';
import Typography from 'src/theme/overrides/Typography';
import { db, auth } from '../../../firebase';
import { useAuth } from '../../../Context/AuthContext';

// ----------------------------------------------------------------------
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { sendEmailVerification } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setisProcessing] = useState(false);
  const [loginError, setloginError] = useState('');

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');

  const { login, logout, ResetPassword } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [Emailerror, setEmailerror] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [User, setUser] = useState({});
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const openForgotPasswordModal = () => {
    setShowForgotPasswordModal(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  const resendLink = async () => {
    // await sendEmailVerification(auth.currentUser);
    toast.info('Email verification link has been sent.');
    return;
  };
  const doLogin = async () => {
    if (!loginEmail || !loginPassword) {
      setloginError('Please Enter Both Email and Pasword.');
      return;
    }

    setisProcessing(true);
    try {
      setloginError();

      await login(loginEmail, loginPassword);

      auth.currentUser
        .getIdTokenResult()
        .then((idTokenResult) => {
          window.location = '/dashboard/app';
          setisProcessing(false);
        })
        .catch((error) => {
          setisProcessing(false);
          console.log(error);
        });
    } catch (error) {
      setisProcessing(false);
      switch (error.code) {
        case 'auth/internal-error': {
          setloginError('Error! Please Try Again.');
          break;
        }
        case 'auth/invalid-password': {
          setloginError('Invalid Password.');
          break;
        }
        case 'auth/wrong-password': {
          setloginError('Invalid Password.');
          break;
        }
        case 'auth/invalid-email': {
          setloginError('No User Found With This Email.');
          break;
        }
        case 'auth/session-cookie-expired': {
          setloginError('Session Expired Please Login Again.');
          break;
        }
        case 'auth/user-not-found': {
          setloginError('User Not Found.');
          break;
        }
        case 'auth/invalid-credential': {
          setloginError('Invalid Credentials.');
          break;
        }
        case 'auth/user-disabled': {
          setloginError('Your Account Has Been Disabled.');
          break;
        }
        default: {
          setloginError(error.message);
        }
      }
    }
  };
  const handleForgotPassword = async () => {
    try {
      // Validate the email (you can add more validation)
      if (!forgotPasswordEmail) {
        setForgotPasswordError('Please enter your email.');
        return;
      }

      // Send a password reset email
      await ResetPassword(forgotPasswordEmail);

      // Close the modal and provide feedback to the user
      closeForgotPasswordModal();
      toast.success('Password reset email sent. Please check your email.');
    } catch (error) {
      setForgotPasswordError('Error sending password reset email.');
      console.error(error);
    }
  };
  const { t } = useTranslation();

  return (
    <>
      <Dialog open={showForgotPasswordModal} onClose={closeForgotPasswordModal} style={{ zIndex: '100000' }}>
        <DialogTitle>{t('login_pg.forgetpassword.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('login_pg.forgetpassword.description')}</DialogContentText>
          <TextField
            label={t('login_pg.email')}
            variant="outlined"
            className="mt-3"
            fullWidth
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            error={!!forgotPasswordError}
            helperText={forgotPasswordError}
          />
          <Button variant="contained" className="my-3" color="primary" fullWidth onClick={handleForgotPassword}>
            {t('login_pg.forgetpassword.Reset')}
          </Button>
        </DialogContent>
      </Dialog>

      <Stack spacing={3}>
        {loginError && <Alert severity="error">{loginError}</Alert>}
        {Emailerror ? (
          <a href="#" onClick={() => resendLink()}>
            Resend Link
          </a>
        ) : (
          ''
        )}
        <TextField
          name="email"
          InputProps={{
            style: {
              backgroundColor: 'white',
            },
          }}
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          label={t('login_pg.email')}
        />

        <TextField
          name="password"
          label={t('login_pg.password')}
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            style: {
              backgroundColor: 'white',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <div>
          {' '}
          <Checkbox name="remember" label="Remember me" />
          <span>{t('login_pg.stay_logged_in')}</span>
        </div>
        <Link
          role="button"
          className="text-muted"
          variant="subtitle2"
          underline="hover"
          onClick={openForgotPasswordModal}
        >
          {t('login_pg.problems_logging_in')}
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={doLogin}>
        {isProcessing ? <CircularProgress className="text-white" size={27} /> : t('login_pg.login')}
      </LoadingButton>
    </>
  );
}
