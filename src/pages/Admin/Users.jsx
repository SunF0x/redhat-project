import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';

const Users = () => {
  const [open, setOpen] = useState(false);
  if (!(parseJwt()?.role == 'Admin')) {
    return <Navigate to="/" />;
  }

  const userlist = [
    {
      username: '222222',
      role: 'client'
    },
    {
      username: '333333',
      role: 'courier'
    },
    {
      username: '444444',
      role: 'cook'
    },
    {
      username: '666666',
      role: 'operator'
    },
    {
      username: '555555',
      role: 'secretshopper'
    }
  ];

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
                Имя
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
            {userlist.map((user, index) => (
              <TableRow
                key={user.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  className="goods"
                  component="th"
                  scope="row"
                  sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                  {index + 1}
                </TableCell>
                <TableCell
                  className="goods"
                  align="center"
                  sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                  {user.username}
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
