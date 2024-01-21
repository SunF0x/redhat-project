import { Link, Navigate } from 'react-router-dom';
import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Dishes from './Dishes';
import { REACT_APP_API } from '../../config/config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Menus = () => {
  const [menu, setMenu] = useState([]);
  const [dishes, setDish] = useState([]);
  const [open, setOpen] = useState(false);
  if (!(parseJwt()?.role == 'Admin')) {
    return <Navigate to="/" />;
  }
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/menus`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setMenu(result);
      const response2 = await fetch(`${REACT_APP_API}/menu/dishes`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result2 = await response2.json();
      setDish(result2);
    };
    asyncFn();
  }, [open]);

  const AddMenu = () => {
    const asyncVerify = async () => {
      await fetch(`${REACT_APP_API}/menu`, {
        method: 'POST',
        headers: myHeaders,
        body: document.getElementById('menu_name').value
      })
        .then((res) => (res.status == 201 ? '' : alert('Something wrong')))
        .catch((e) => {
          console.log('Error: ' + e.message);
          console.log(e.response);
        });
      setOpen(false);
      //navigate('/process-order');
    };
    asyncVerify();
  };

  return (
    <div className="fon">
      <div className="pole">
        <div className="title2">Меню</div>
        <Button
          type="submit"
          variant="contained"
          onClick={() => setOpen(!open)}
          style={{
            position: 'absolute',
            top: 70,
            left: 40,
            width: '200px',
            height: '40px',
            backgroundColor: `#90182E`,
            fontFamily: 'El Messiri',
            fontSize: 16
          }}>
          Добавить меню
        </Button>
        {open && (
          <div className="flex flex-row gap-4 ml-3 mt-6">
            <input
              className="h-10 rounded-md pl-2"
              id="menu_name"
              type="menu_name"
              label="menu_name"
              placeholder="Название меню"
            />
            <Button
              variant="contained"
              onClick={AddMenu}
              style={{
                width: '180px',
                backgroundColor: `#90182E`,
                fontFamily: 'El Messiri',
                fontSize: 16
              }}>
              Создать
            </Button>
          </div>
        )}
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
                  <Link style={{ textDecoration: 'underline' }} to={`${menu.menuId}`}>
                    {menu.menuName}
                  </Link>
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
      <div className="pole">
        <div className="title2">Блюда</div>
        {dishes.length > 0
          ? dishes?.map((el) => (
              <div key={el.menuItemId}>
                <Dishes element={el} />
                <div className="Line"></div>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};
export default Menus;
