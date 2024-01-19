import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Position from './Position';
import { REACT_APP_API } from '../../config/config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const MenusId = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  if (!(parseJwt()?.role == 'Admin')) {
    return <Navigate to="/" />;
  }
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/menu/${id}`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setMenu(result);
    };
    asyncFn();
  }, []);

  const changename = () => {
    const asyncVerify = async () => {
      await fetch(`${REACT_APP_API}/menu/${id}/${document.getElementById('menu_name').value}`, {
        method: 'PUT',
        headers: myHeaders
      })
        .then((res) => (res.status == 200 ? window.location.reload() : alert('Something wrong')))
        .catch((e) => {
          console.log('Error: ' + e.message);
          console.log(e.response);
        });
      setOpen(false);
      //navigate('/process-order');
    };
    asyncVerify();
  };

  const doCurrent = () => {
    const asyncVerify = async () => {
      await fetch(`${REACT_APP_API}/menus/${id}`, {
        method: 'PUT',
        headers: myHeaders
      })
        .then((res) => (res.status == 200 ? window.location.reload() : alert('Something wrong')))
        .catch((e) => {
          console.log('Error: ' + e.message);
          console.log(e.response);
        });
    };
    asyncVerify();
  };

  return (
    <div className="p-4 flex flex-row">
      <div className="pole">
        <div className="title2">Позиции</div>
        <div className="flex flex-row">
          <div className="text2">{menu?.name}</div>
          <button className="text2" onClick={() => setOpen(!open)}>
            ✎
          </button>
          {menu.isCurrent ? (
            <div className="text2">Текущее меню</div>
          ) : (
            <button className="text2 w-64 text-white" onClick={() => doCurrent()}>
              Сделать меню текущим
            </button>
          )}
        </div>
        {open && (
          <div className="flex flex-row gap-4 ml-8 mt-4">
            <input
              className="h-10 rounded-md pl-2"
              id="menu_name"
              type="menu_name"
              label="menu_name"
              placeholder="Новое название меню"
            />
            <Button
              variant="contained"
              onClick={changename}
              style={{
                bottom: 0,
                right: 0,
                width: '180px',
                backgroundColor: `#90182E`,
                fontFamily: 'El Messiri',
                fontSize: 16
              }}>
              Изменить имя
            </Button>
          </div>
        )}
        {menu?.items?.length > 0
          ? menu?.items?.map((el) => (
              <div key={el.menuItemId}>
                <Position element={el} />
                <div className="Line"></div>
              </div>
            ))
          : ''}
      </div>
      {/* <div className="button-left"> */}
      <Button
        type="submit"
        onClick={() => navigate('/menus')}
        variant="contained"
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '50px',
          width: '150px',
          backgroundColor: `#90182E`,
          fontFamily: 'El Messiri',
          fontSize: 16
        }}>
        Закрыть
      </Button>
      {/* </div> */}
    </div>
  );
};
export default MenusId;
