import { Link, Navigate } from 'react-router-dom';
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

const Users = () => {
  const [open, setOpen] = useState(false);
  const [create, setCreate] = useState(false);
  const [users, setUsers] = useState([]);
  const [filter_users, setFilterUsers] = useState([]);
  if (!(parseJwt()?.role == 'Admin')) {
    return <Navigate to="/" />;
  }
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/admin/users`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setUsers(result);
      setFilterUsers(result);
    };
    asyncFn();
  }, [open]);

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
        if (res.status == 204) {
          setOpen(!open);
          enqueueSnackbar('Пользователь удален', { variant: 'success' });
        } else {
          console.log('!');
        }
      });
    };
    asyncCansel();
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      login: '',
      password: '',
      role: 'Client',
      name: null,
      redhat: null
    },
    onSubmit: async (values) => {
      console.log(document.getElementById('select_field').value);
      let value = '';
      if (document.getElementById('select_field').value === 'Courier') {
        value = {
          login: values.login,
          password: values.password,
          role: document.getElementById('select_field').value,
          name: values.name,
          hatCode: values.redhat
        };
      } else {
        value = {
          login: values.login,
          password: values.password,
          role: document.getElementById('select_field').value,
          name: values.name
        };
      }
      fetch(`${REACT_APP_API}/admin/user`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(value)
      }).then((res) => {
        if (res.status == 201) {
          setCreate(false);
          setOpen(!open);
          enqueueSnackbar('Пользователь создан', { variant: 'success' });
        } else {
          enqueueSnackbar('Не создать пользователя', { variant: 'error' });
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
      <div className="pole">
        <div className="title2">Пользователи</div>
        <div className="flex flex-row gap-2"></div>
        <input
          className="h-10 rounded-md pl-2 ml-4"
          id="search"
          type="serch"
          label="search"
          placeholder="Поиск"
        />
        <button className="ml-4 w-24" onClick={filterUser}>
          Искать
        </button>
        <Table sx={{ minWidth: 650, padding: 10 }} aria-label="simple table">
          <TableHead sx={{ fontFamily: 'El Messiri', fontSize: 18 }}>
            <TableRow>
              <TableCell sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                Логин
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                Роль
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                Cтатус
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                Удалить
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filter_users?.length > 0 &&
              filter_users?.map(
                (user) =>
                  user.login.lastIndexOf(document.getElementById('search').value, 0) === 0 && (
                    <TableRow
                      key={user.username}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell
                        className="goods"
                        component="th"
                        scope="row"
                        sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                        {user.id}
                      </TableCell>
                      <TableCell
                        className="goods"
                        align="center"
                        sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                        <Link style={{ textDecoration: 'underline' }} to={`${user.id}`}>
                          {user.login}
                        </Link>
                      </TableCell>
                      <TableCell
                        className="goods"
                        align="center"
                        sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                        {user.role}
                      </TableCell>
                      <TableCell
                        className="goods"
                        align="center"
                        sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                        {user.isDeleted ? 'Удален' : 'В системе'}
                      </TableCell>
                      <TableCell
                        className="goods"
                        align="center"
                        sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                        <button onClick={() => deleteUser(user.id)}>🗑</button>
                      </TableCell>
                    </TableRow>
                  )
              )}
          </TableBody>
        </Table>
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
          Добавить пользователя
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
              <select id="select_field" className="h-12 w-96 rounded-md pl-2">
                {rolelist?.length !== 0 &&
                  rolelist?.map((el) => (
                    <option key={el.id} value={el.role}>
                      {el.role}
                    </option>
                  ))}
              </select>
              <input
                className="h-10 rounded-md pl-2"
                id="redhat"
                type="text"
                label="redhat"
                placeholder="Код шапки (только для курьера)"
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
                  Создать
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
      </div>
    </div>
  );
};
export default Users;
