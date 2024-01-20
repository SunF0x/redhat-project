import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { REACT_APP_API } from '../../config/config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useFormik } from 'formik';

const UsersId = () => {
  const { id } = useParams();
  const [create, setCreate] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  if (!(parseJwt()?.role == 'Admin')) {
    return <Navigate to="/" />;
  }
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/admin/user/${id}`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setUsers(result);
    };
    asyncFn();
  }, []);

  const rolelist = [
    {
      id: 2,
      role: 'Client'
    },
    {
      id: 3,
      role: 'Courier'
    },
    {
      id: 4,
      role: 'Cook'
    },
    {
      id: 5,
      role: 'Inspector'
    },
    {
      id: 6,
      role: 'Operator'
    },
    {
      id: 5,
      role: 'SecretShopper'
    }
  ];

  const deleteUser = (id) => {
    const asyncCansel = () => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      fetch(`${REACT_APP_API}/admin/user/${id}`, {
        method: 'DELETE',
        headers: myHeaders //,
      }).then((res) => {
        if (res.status == 200) {
          window.location.reload();
        } else {
          enqueueSnackbar('Не удалось удалить пользователя', { variant: 'error' });
        }
      });
    };
    asyncCansel();
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      login: users.login,
      password: '',
      //role: users.role,
      name: users?.name || null,
      redhat: users?.hatCode || null
    },
    onSubmit: async (values) => {
      let value = '';
      if (users.role === 'Courier') {
        value = {
          login: values.login,
          password: values.password,
          name: values.name,
          hatCode: values.redhat
        };
        if (values.redhat == users.hatCode) delete value['hatCode'];
      } else {
        value = {
          login: values.login,
          password: values.password,
          name: values.name
        };
      }
      if (values.password == '') delete value['password'];
      if (values.name == users?.name && values.name == null) delete value['name'];
      if (values.login == users.login) delete value['login'];
      fetch(`${REACT_APP_API}/admin/user/${users.id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(value)
      }).then((res) => {
        if (res.status == 200) {
          setCreate(false);
          //window.location.reload();
        } else {
          alert('Something wrong');
        }
      });
    }
  });

  const filterUser = () => {
    let arr = users.filter(
      (user) => user.login.lastIndexOf(document.getElementById('search').value, 0) === 0
    );
    setUsers(arr);
  };

  return (
    <div className="fon">
      <div className="pole1">
        <div className="title2">Пользователь</div>
        <div className="text2">Логин: {users.login}</div>
        <div className="text2">Роль: {users.role}</div>
        {users.role === 'Courier' && <div className="text2">Код: {users.hatCode}</div>}
        <SnackbarProvider />
        <Button
          type="submit"
          variant="contained"
          onClick={() => setCreate(!create)}
          style={{
            position: 'absolute',
            top: 70,
            right: 40,
            width: '300px',
            height: '40px',
            backgroundColor: `#90182E`,
            fontFamily: 'El Messiri',
            fontSize: 16
          }}>
          Внести изменения
        </Button>
        <Dialog onClose={() => setCreate(false)} open={create}>
          <DialogContent className="bg-[rgb(245,229,231,0.9)]">
            <form
              method="POST"
              id="uploadForm"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-4">
              <input
                className="h-10 rounded-md pl-2"
                id="login"
                type="text"
                label="login"
                placeholder="Логин"
                defaultValue={users.login}
                value={values.login}
                onChange={handleChange}
              />
              <input
                className="h-10 rounded-md pl-2"
                id="password"
                type="password"
                label="password"
                placeholder="Пароль"
                value={values.password}
                onChange={handleChange}
              />
              <input
                className="h-10 rounded-md pl-2"
                id="name"
                type="text"
                label="name"
                placeholder="Имя"
                value={values.name}
                onChange={handleChange}
              />
              {/* <select id="select_field" className="h-12 w-96 rounded-md pl-2">
                {rolelist?.length !== 0 &&
                  rolelist?.map((el) => (
                    <option key={el.id} selected={el.role === users.role} value={el.role}>
                      {el.role}
                    </option>
                  ))}
              </select> */}
              <input
                className="h-10 rounded-md pl-2"
                id="redhat"
                type="text"
                label="redhat"
                placeholder="Код шапки (только для курьера)"
                defaultValue={users?.hatCode}
                value={values.redhat}
                onChange={handleChange}
              />
              <div className="flex flex-row gap-4">
                <Button
                  type="submit"
                  variant="contained"
                  // onClick={addreport}
                  style={{
                    bottom: 0,
                    right: 0,
                    width: '180px',
                    backgroundColor: `#90182E`,
                    fontFamily: 'El Messiri',
                    fontSize: 16
                  }}>
                  Обновить
                </Button>
                <Button
                  // type="submit"
                  variant="contained"
                  onClick={() => setCreate(false)}
                  style={{
                    bottom: 0,
                    right: 0,
                    width: '150px',
                    backgroundColor: `black`,
                    fontFamily: 'El Messiri',
                    fontSize: 16
                  }}>
                  Закрыть
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <div className="button-left">
          <Button
            type="submit"
            onClick={() => navigate('/users')}
            variant="contained"
            style={{
              width: '150px',
              backgroundColor: `#90182E`,
              fontFamily: 'El Messiri',
              fontSize: 16
            }}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
};
export default UsersId;
