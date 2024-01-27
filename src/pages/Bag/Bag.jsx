import './Bag.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { REACT_APP_API } from '../../config/config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getAccessToken } from '../../utils/accessToken';
import { useFormik } from 'formik';

const Bag = () => {
  const [goods, setGoods] = useState([]);
  const [menu, setMenu] = useState([]);
  const [address, setAdress] = useState([]);
  const navigate = useNavigate();
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
      setGoods(JSON.parse(localStorage.getItem('goods')) || []);
    }
    enqueueSnackbar('Товар убран из корзины');
  };

  function countsum() {
    let sum = 0;
    {
      menu.map((row) => (sum += parseFloat(row.cost) * goods[row.menuItemId]));
    }
    return sum;
  }

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/menu`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      let menu;
      if (goods !== {}) menu = result.filter((el) => el.menuItemId in goods);
      setMenu(menu);
    };
    asyncFn();
  }, [goods]);

  useEffect(() => {
    const asyncFn2 = async () => {
      const response2 = await fetch(`${REACT_APP_API}/client/address`, {
        headers: myHeaders
      }).then(function (a) {
        return a.json();
      });
      setAdress(response2);
    };
    asyncFn2();
  }, []);

  if (
    goods.length === 0 &&
    localStorage.getItem('goods') !== null &&
    localStorage.getItem('goods') !== ''
  ) {
    setGoods(JSON.parse(localStorage.getItem('goods')));
  }

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      payment: 'Cash',
      comment: '',
      clientId: ''
    },
    onSubmit: async (values) => {
      let order = {
        clientId: values.clientId,
        payment: values.payment,
        comment: values.comment,
        orderItems: []
      };
      if (values.clientId === '') order.clientId = getvalue();
      Object.entries(goods).forEach(([key, value]) =>
        order.orderItems.push({
          menuItemId: key,
          count: value.toString(),
          preference: ''
        })
      );
      console.log(order);
      await fetch(`${REACT_APP_API}/order`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(order)
      }).then(function (a) {
        if (a.status === 201) {
          localStorage.removeItem('goods');
          // enqueueSnackbar('Заказ создан!', 'success');
          alert('Заказ создан!');
          navigate('/my-order');
        }
        return a.json(); // call the json method on the response to get JSON
      });
      // .then(function (res) {
      //   console.log(res);
      // });
    }
  });

  function getvalue() {
    var e = document.getElementById('select_field');
    var value = e.value;
    return value;
  }

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
                    {goods[row.menuItemId]}
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
                    <button onClick={() => removeElementfromBag(row.menuItemId)}>-</button>
                  </TableCell>
                </TableRow>
              ))}
              {/* <div className="Line"></div> */}
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
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontFamily: 'El Messiri', fontSize: 18, fontWeight: 700 }}>
                    У вас нет выбранных позиций
                  </TableCell>
                </TableRow>
              )}
              {/* <div className="Line"></div> */}
            </TableBody>
          </Table>
          <div className="maintext">Оформление заказа</div>
          {/* <div className="flex flex-row gap-2 justify-between m-6">
            <input
              className="h-12 rounded-md pl-2"
              id="address"
              type="address"
              label="address"
              onChange={handleChange}
              value={values.address}
              placeholder="Введите адрес"
            />
            <Button
              onClick={handleSaveAddress}
              type="submit"
              variant="contained"
              style={{
                // position: 'absolute',
                bottom: 0,
                right: 0,
                width: '150px',
                backgroundColor: `#3E131B`,
                fontFamily: 'El Messiri',
                fontSize: 16
              }}>
              Сохранить
            </Button>
          </div> */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 justify-center justify-items-center">
            <div className="flex flex-row gap-10 justify-center">
              <div className="flex flex-col mx-4">
                <div className="text">Укажите адрес доставки</div>
                <select
                  id="select_field"
                  value={values.clientId}
                  className="h-12 w-96 rounded-md pl-2"
                  onChange={() => setFieldValue('clientId', getvalue())}>
                  {address.length !== 0 &&
                    address?.map((el) => (
                      <option key={el.clientId} value={el.clientId}>
                        {el.address}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col mx-4">
                <div className="text">Выберите способ оплаты</div>
                <select
                  className="h-12 w-96 rounded-md pl-2"
                  onChange={() =>
                    setFieldValue('payment', values.payment === 'Card' ? 'Cash' : 'Card')
                  }>
                  <option value="Cash">Наличными</option>
                  <option value="Card">Волшебной картой</option>
                </select>
              </div>
            </div>
            <textarea
              placeholder="Напишите комментарий"
              className="h-48 rounded-md p-2 m-4"
              id="comment"
              type="comment"
              label="comment"
              onChange={handleChange}
              value={values.comment}
            />
            <div className="flex place-content-end m-14">
              <Button
                disabled={countsum() <= 0}
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
          </form>
        </div>
      </div>
    </div>
  );
};
export default Bag;
