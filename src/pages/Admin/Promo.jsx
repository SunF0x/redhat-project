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

const Promo = () => {
  const [promo, setPromo] = useState([]);
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [file, setFile] = useState('');
  if (!(parseJwt()?.role == 'Admin')) {
    return <Navigate to="/" />;
  }
  useEffect(() => {
    const asyncFn = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      const response = await fetch(`${REACT_APP_API}/promo/settings`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setPromo(result);
    };
    asyncFn();
  }, [open, change]);

  const handleFile = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const addpromo = (e) => {
    e.preventDefault();
    const asyncReport = () => {
      const formData = new FormData();
      formData.append(`photo`, file);
      // file.map((el, i) => {
      //   i == 0 ? formData.append(`photo`, el) : formData.append(`photo${i}`, el);
      // });

      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      fetch(`${REACT_APP_API}/promo/settings`, {
        method: 'POST',
        headers: myHeaders,
        body: formData
      }).then((res) => (res.status == 201 ? '' : alert('Something wrong')));
    };
    asyncReport();
  };

  const handleChange = (files) => {
    let arr = [];
    promo.map((el) => el?.isShown && arr.push(el.filePath));
    var index = arr.indexOf(files);
    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      arr.push(files);
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    fetch(`${REACT_APP_API}/promo/settings`, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(arr)
    }).then((res) => (res.status == 200 ? setChange(!change) : alert('Something wrong')));
  };

  return (
    <div className="fon">
      <div className="pole">
        <div className="title2">Промо</div>
        <Button
          type="submit"
          variant="contained"
          onClick={() => setOpen(!open)}
          style={{
            position: 'absolute',
            top: 65,
            left: 60,
            width: '200px',
            backgroundColor: `#90182E`,
            fontFamily: 'El Messiri',
            fontSize: 16
          }}>
          Добавить промо
        </Button>
        {open && (
          <div className="flex flex-row gap-4 ml-3 mt-6">
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
                onClick={addpromo}
                style={{
                  bottom: 0,
                  right: 0,
                  width: '180px',
                  backgroundColor: `#90182E`,
                  fontFamily: 'El Messiri',
                  fontSize: 16
                }}>
                Добавить
              </Button>
            </div>
          </div>
        )}
        {promo.map((el, index) => (
          <div className="text2 flex flex-row gap-2">
            <img src={`http://localhost:7777${el.filePath}`} key={index} className="promo" />
            <div>{el?.isShown ? 'Используется' : 'Не используется'}</div>
            <button className="w-24" onClick={() => handleChange(el.filePath)}>
              Изменить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Promo;
