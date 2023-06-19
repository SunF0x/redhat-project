import './Bag.css';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getAccessToken } from '../../utils/accessToken';

const Bag = () => {
  console.log('Bag');
  const [goods, setGoods] = useState(JSON.parse(localStorage.getItem('goods')) || {});
  const [menu, setMenu] = useState([]);
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }

  const removeElementfromBag = (element) => {
    if (localStorage.getItem('goods') !== '') {
      let dict = JSON.parse(localStorage.getItem('goods'));
      dict[element] -= 1;
      if (dict[element] <= 0) {
        delete dict[element];
      }
      //   console.log(dict);
      localStorage.setItem('goods', JSON.stringify(dict));
      setGoods(JSON.parse(localStorage.getItem('goods')) || {});
    }
    enqueueSnackbar('Товар убран из корзины');
  };
  function countsum() {
    let sum = 0;
    {
      menu.map((row) => (sum += parseFloat(row.cost) * goods[row.menuItemGuid]));
    }
    return sum;
  }

  useEffect(() => {
    const asyncFn = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      const response = await fetch('http://127.0.0.1:7777/v1/menu', { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      let menu;
      console.log(goods);
      if (goods !== {}) menu = result.filter((el) => el.menuItemGuid in goods);
      setMenu(menu);
    };
    asyncFn();
  }, [goods]);
  return (
    <div className="fon">
      <div className="pole">
        <div className="flex flex-col gap-4 justify-between">
          <Table sx={{ minWidth: 650, padding: 10 }} aria-label="simple table">
            <TableHead sx={{ fontFamily: 'El Messiri', fontSize: 18 }}>
              <TableRow>
                <TableCell sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                  Позиции заказа
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                  Количество
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                  Стоимость
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell
                    className="goods"
                    component="th"
                    scope="row"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    {row.name}
                  </TableCell>
                  <TableCell
                    className="goods"
                    align="center"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    {goods[row.menuItemGuid]}
                  </TableCell>
                  <TableCell
                    className="goods"
                    align="center"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    {row.cost}
                  </TableCell>
                  <TableCell
                    className="goods"
                    align="center"
                    sx={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                    <SnackbarProvider />
                    <button onClick={() => removeElementfromBag(row.menuItemGuid)}>-</button>
                  </TableCell>
                </TableRow>
              ))}
              <div className="Line"></div>
              {countsum() > 0 ? (
                <TableRow>
                  {' '}
                  <TableCell></TableCell>
                  <TableCell
                    sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}
                    align="center">
                    Итог:{' '}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                    {countsum()}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ) : (
                <div className="title">У вас нет выбранных позиций</div>
              )}
              <div className="Line"></div>
            </TableBody>
          </Table>
          <div className="flex place-content-end m-14">
            <Button
              type="submit"
              variant="contained"
              style={{
                // position: 'absolute',
                bottom: 0,
                right: 0,
                width: '150px',
                backgroundColor: `#90182E`,
                fontFamily: 'El Messiri',
                fontSize: 16
              }}>
              Заказать
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bag;
