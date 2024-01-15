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
  }, []);

  console.log(promo);

  return (
    <div className="fon">
      <div className="pole">
        <div className="title2">Промо</div>
        {promo.map((el, index) => (
          <div className="text2 flex flex-row gap-2">
            <img src={`http://localhost:7777${el.filePath}`} key={index} className="promo" />
            <div>{el?.isShown ? 'Используется' : 'Не используется'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Promo;
