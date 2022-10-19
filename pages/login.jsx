// React
import { useEffect, useState } from 'react';
import Head from 'next/head';

// Redux
import { login as reduxLogin, logout as reduxLogout } from '/utils/store/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import { blue } from '@mui/material/colors';
import { TextField, Button } from '@mui/material';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

// Routing
import { useRouter } from 'next/router';

// Hooks
import { useLogin } from '../utils/hooks';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Set MUI variables
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--login-main-border-color',
      blue[400]
    );
    document.documentElement.style.setProperty(
      '--login-main-icon-color',
      blue[700]
    );
  }, []);

  // Manage state
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const {
    email,
    setEmail,
    password,
    setPassword,
    login
  } = useLogin();

  return (
    <div className='login login__container'>
      <Head>
        <title>Login - TaskPlanner</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <main className='login__main'>
        <div className='login__main--icon'>
          <FontAwesomeIcon icon={faListCheck} />
        </div>

        <form action='' className='form__container'>
          {/* Email */}
          <TextField
            required
            className='login__input--email'
            label='Email'
            variant='outlined'
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />

          {/* Password */}
          <TextField
            id='login__input--password'
            className='login__input--password'
            label='Password'
            type='password'
            variant='outlined'
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          <div className='form__actions'>
            {/* Login */}
            <Button
              className='form__actions--button'
              variant='contained'
              onClick={() => {
                login();
                isLoggedIn ? dispatch(reduxLogout()) : dispatch(reduxLogin());
                router.push('/tasks');
              }}
            >
              {/* Login */}
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>

            {/* Sign Up */}
            <Button className='form__actions--button' variant='outlined'>
              Sign Up
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
