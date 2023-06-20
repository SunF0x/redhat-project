import './Order.css';
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getAccessToken } from '../../utils/accessToken';

const Order = () => {
  const [app, setApp] = useState([]);
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    const asyncFn = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      const response = await fetch('http://127.0.0.1:7777/v1/order', { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      // console.log(result);
      setApp(result);
    };
    asyncFn();
  }, []);
  return (
    <div className="fon">
      <div className="pole">
        <div className="title2">Мои заказы</div>
        <div className="Line"></div>
        <Table sx={{ minWidth: 650, padding: 10 }} aria-label="simple table">
          <TableHead sx={{ fontFamily: 'El Messiri', fontSize: 18 }}>
            <TableRow>
              <TableCell sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                Номер
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                Дата
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                Адрес
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                Статус
              </TableCell>
            </TableRow>
          </TableHead>
          <div className="Line"></div>
          <TableBody>
            {app.map((row, index) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  className="goods"
                  component="th"
                  scope="row"
                  sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                  <Link to={row.orderGuid}>Заказ №{index + 1}</Link>
                </TableCell>
                <TableCell
                  className="goods"
                  align="center"
                  sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                  {row.created.substring(0, 10)} {row.created.substring(11, 19)}
                </TableCell>
                <TableCell
                  className="goods"
                  align="center"
                  sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                  {row.address}
                </TableCell>
                <TableCell
                  className="goods"
                  align="center"
                  sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
            <div className="Line"></div>
          </TableBody>
        </Table>
        <div className="h-96"></div>
      </div>
    </div>
  );
};
export default Order;
