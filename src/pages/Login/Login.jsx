import './Login.css';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { getAccessToken, setAccessToken } from '../../utils/accessToken';
import { REACT_APP_API } from '../../config/config';
import { useFormik } from 'formik';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
}

const Login = () => {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  if (getAccessToken()) {
    return <Navigate to="/" />;
  }

  // const [app, setApp] = useState([]);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      login: '',
      password: '',
      password2: ''
    },
    onSubmit: async (values) => {
      let auth = {
        login: values.login,
        password: values.password
      };
      if (check) {
        if (auth.password === values.password2) {
          let code = getRandomInt(1000, 10000);
          const result = prompt(`Код подтверждения ${code}. Введите код подтверждения:`);
          if (Number(result) == code) {
            await fetch(`${REACT_APP_API}/auth/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(auth)
            })
              .then(function (a) {
                return a.text(); // call the json method on the response to get JSON
              })
              .then(function (res) {
                if (res !== 'Problems retrieving user' && res !== "Can't create user") {
                  setAccessToken(res);
                  navigate('/');
                } else {
                  alert('something wrong');
                }
              });
          } else {
            alert('Введен неверный код подтверждения');
          }
        } else {
          alert('Пароли не совпадают');
        }
      } else {
        await fetch(`${REACT_APP_API}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(auth)
        })
          .then(function (a) {
            if (a.status === 404) {
              alert('User was not found');
            }
            return a.text();
          })
          .then(function (res) {
            if (
              res !== null &&
              res !== 'User was not found' &&
              res !== 'Problems retrieving user' &&
              res !== 'The specified password does not match the user'
            ) {
              setAccessToken(res);
              navigate('/');
            } else {
              alert('User was not found');
            }
          });
      }
    }
  });
  return (
    <div className="App">
      <div className="header">
        <div className="Text">Добро пожаловать в кафе КРАСНОЙ ШАПОЧКИ</div>
      </div>
      <div className="Form">
        <div className="Text">Вход и регистрация</div>
        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-3 justify-center justify-items-center">
          <input
            className="h-12 rounded-md pl-2"
            id="login"
            type="login"
            label="Логин"
            onChange={handleChange}
            value={values.login}
            placeholder="Введите логин"
          />
          <input
            className="h-12 rounded-md pl-2"
            id="password"
            type="password"
            label="Пароль"
            onChange={handleChange}
            value={values.password}
            placeholder="Введите пароль"
          />
          {check && (
            <input
              className="h-12 rounded-md pl-2"
              id="password2"
              type="password2"
              label="Пароль повторно"
              onChange={handleChange}
              value={values.password2}
              placeholder="Повторите пароль"
            />
          )}
          <Link style={{ color: 'white', opacity: 0.7 }} onClick={() => setCheck(!check)}>
            {!check ? 'Зарегистрироваться' : 'Войти'}
          </Link>
          <div className="flex place-content-center">
            <Button
              type="submit"
              variant="contained"
              style={{
                width: '150px',
                backgroundColor: `#90182E`
              }}>
              Войти
            </Button>
          </div>
          {/* <div className="flex place-content-center">
            <FormControlLabel
              value="Первый раз на сайте?"
              control={
                <Checkbox
                  checked={check}
                  onChange={() => setCheck(!check)}
                  inputProps={{ 'aria-label': 'controlled' }}
                  sx={{ color: 'white' }}
                />
              }
              label="Первый раз на сайте?"
              labelPlacement="end"
              sx={{ color: 'white' }}
            />
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
