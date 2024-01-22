// import './Report.css';
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

const InspectAdmin = () => {
  const [app, setApp] = useState([]);
  const [create, setCreate] = useState(false);
  const [del, setDelete] = useState(false);
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
      const response = await fetch(`${REACT_APP_API}/inspections`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setApp(result);
    };
    asyncFn();
  }, [create, del]);

  const handleCreate = () => {
    setCreate(!create);
  };

  // const handleFile = (event) => {
  //   // if (file && file.length > 0) {
  //   //   setFile([...file, URL.createObjectURL(event.target.files[file.length])]);
  //   // } else {URL.createObjectURL(
  //   setFile(event.target.files[0]);
  //   // }
  // };

  const handleFile = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  console.log(file);

  const addreport = (e) => {
    e.preventDefault();
    const asyncReport = () => {
      const formData = new FormData();
      formData.append(`photo`, file);
      formData.append('data', document.getElementById('report').value);
      formData.append('verdict', document.getElementById('verdict').value);
      // file.map((el, i) => {
      //   i == 0 ? formData.append(`photo`, el) : formData.append(`photo${i}`, el);
      // });

      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      fetch(`${REACT_APP_API}/report`, {
        method: 'POST',
        headers: myHeaders,
        body: formData
      }).then((res) => (res.status == 201 ? setCreate(false) : alert('Something wrong')));
      console.log(file);
    };
    asyncReport();
  };

  const handledelete = (id) => {
    const asyncCansel = () => {
      fetch(`${REACT_APP_API}/inspection/${id}`, {
        method: 'DELETE',
        headers: myHeaders
      }).then((res) => (res.status === 204 ? setDelete(!del) : alert('Something wrong')));
    };
    asyncCansel();
  };

  return (
    <div className="fon">
      <div className="pole1">
        <div className="title2">Мои отчеты</div>
        {/* <Button
          type="submit"
          variant="contained"
          onClick={handleCreate}
          style={{
            position: 'absolute',
            top: 70,
            right: 40,
            width: '180px',
            height: '40px',
            backgroundColor: `#90182E`,
            fontFamily: 'El Messiri',
            fontSize: 16
          }}>
          Создать отчет
        </Button> */}
        <Dialog onClose={() => setCreate(false)} open={create}>
          <DialogContent className="bg-[rgb(245,229,231,0.9)]">
            <form
              method="POST"
              // encType="multipart/form-data"
              id="uploadForm"
              name="report"
              onSubmit={addreport}
              className="flex flex-col gap-4 mt-4">
              <input
                className="h-10 rounded-md pl-2"
                id="report"
                type="report"
                label="report"
                placeholder="Оставьте отзыв"
              />
              <input
                className="h-10 rounded-md pl-2"
                id="verdict"
                type="verdict"
                label="verdict"
                placeholder="Вынесите вердикт"
              />
              <input
                className="h-10 rounded-md pl-2 mt-2"
                id="file"
                type="file"
                label="file"
                multiple
                onChange={handleFile}
                accept="image/*,image/jpeg"
                placeholder="Прикрепить изображение"></input>
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
                  Создать отчет
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
                Статус
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                Создатель
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {app
              .sort((a, b) => (a.created > b.created ? 1 : -1))
              .map((row) => (
                <TableRow
                  key={row.inspectionId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell
                    className="goods"
                    component="th"
                    scope="row"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    <Link style={{ textDecoration: 'underline' }} to={`${row.inspectionId}`}>
                      Отчет №{row.inspectionId}
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
                    {row.status}
                  </TableCell>
                  <TableCell
                    className="goods"
                    align="center"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    {row.inspectedBy}
                  </TableCell>
                  <TableCell
                    className="goods"
                    align="center"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    <button onClick={() => handledelete(row.inspectionId)}>-</button>
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
export default InspectAdmin;
