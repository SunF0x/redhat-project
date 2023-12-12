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

const Menus = () => {
  const [menu, setMenu] = useState([]);
  if (!(parseJwt()?.role == 'Admin')) {
    return <Navigate to="/" />;
  }
  useEffect(() => {
    const asyncFn = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      const response = await fetch(`${REACT_APP_API}/menus`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setMenu(result);
    };
    asyncFn();
  }, []);

  return (
    <div className="fon">
      <div className="pole">
        <div className="title2">Меню</div>
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
                Статус
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.map((menu) => (
              <TableRow
                key={menu.menuId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  className="goods"
                  component="th"
                  scope="row"
                  sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                  {menu.menuId}
                </TableCell>
                <TableCell
                  className="goods"
                  align="center"
                  sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                  {menu.menuName}
                </TableCell>
                <TableCell
                  className="goods"
                  align="center"
                  sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                  {menu.isCurrentMenu ? 'Текущее меню' : 'Устаревшее меню'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Menus;
