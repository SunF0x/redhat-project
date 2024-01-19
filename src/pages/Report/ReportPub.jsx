import './Report.css';
import { Link, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
import { getAccessToken } from '../../utils/accessToken';

const ReportPub = () => {
  const [app, setApp] = useState([]);
  const [create, setCreate] = useState(false);
  // const [file, setFile] = useState([]);
  const [file, setFile] = useState(null);

  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/reports/all`, { headers: myHeaders }); //,{mode: 'no-cors'}
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
            </TableRow>
          </TableHead>
          <TableBody>
            {app
              .sort((a, b) => (a.created > b.created ? 1 : -1))
              .map((row) => (
                <TableRow
                  key={row.reportId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell
                    className="goods"
                    component="th"
                    scope="row"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    <Link style={{ textDecoration: 'underline' }} to={`${row.reportId}`}>
                      Отчет №{row.reportId} {console.log(row.reportId)}
                    </Link>
                  </TableCell>
                  <TableCell
                    className="goods"
                    align="center"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    {row.created.substring(0, 10)} {row.created.substring(11, 19)}
                  </TableCell>
                  {/* <TableCell
                    className="goods"
                    align="center"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    {row.result}
                  </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="Line"></div>
      </div>
    </div>
  );
};
export default ReportPub;
