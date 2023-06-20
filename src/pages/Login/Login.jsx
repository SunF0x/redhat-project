import './Login.css';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { getAccessToken, setAccessToken } from '../../utils/accessToken';
import { useFormik } from 'formik';

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
      password: ''
    },
    onSubmit: async (values) => {
      let auth = {
        login: values.login,
        password: values.password
      };
      if (check) {
        await fetch('http://localhost:7777/v1/auth/register', {
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
        await fetch('http://localhost:7777/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(auth)
        })
          .then(function (a) {
            return a.text();
          })
          .then(function (res) {
            if (res !== 'User was not found' && res !== 'Problems retrieving user') {
              setAccessToken(res);
              navigate('/');
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
          <div className="flex place-content-center">
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
          </div>
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
        </form>
      </div>
    </div>
  );
};

export default Login;
