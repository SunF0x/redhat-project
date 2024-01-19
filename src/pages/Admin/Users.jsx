import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { REACT_APP_API } from '../../config/config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Users = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
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
    };
    asyncFn();
  }, []);

  // const userlist = [
  //   {
  //     username: '222222',
  //     role: 'client'
  //   },
  //   {
  //     username: '333333',
  //     role: 'courier'
  //   },
  //   {
  //     username: '444444',
  //     role: 'cook'
  //   },
  //   {
  //     username: '666666',
  //     role: 'operator'
  //   },
  //   {
  //     username: '555555',
  //     role: 'secretshopper'
  //   }
  // ];

  return (
    <div className="fon">
      <div className="pole">
        <div className="title2">Пользователи</div>
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
                Редактировать
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.length > 0 &&
              users?.map((user) => (
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
                    {user.login}
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
                    *
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Users;
