import './Report.css';
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { REACT_APP_API } from '../../config/config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getAccessToken } from '../../utils/accessToken';

const Report = () => {
  const [app, setApp] = useState([]);
  console.log(app);
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    const asyncFn = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      const response = await fetch(`${REACT_APP_API}/report`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setApp(result);
    };
    asyncFn();
  }, []);
  return (
    <div className="fon">
      <div className="pole1">
        <div className="title2">Мои отчеты</div>
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
          <TableBody>
            {app
              .sort((a, b) => (a.created > b.created ? 1 : -1))
              .map((row, index) => (
                <TableRow
                  key={row.orderId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell
                    className="goods"
                    component="th"
                    scope="row"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    <Link style={{ textDecoration: 'underline' }} to={row.orderId}>
                      Заказ №{index + 1}
                    </Link>
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
                    {/* {row.address} */}
                  </TableCell>
                  <TableCell
                    className="goods"
                    align="center"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    {/* {row.status} */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="Line"></div>
      </div>
    </div>
  );
};
export default Report;
