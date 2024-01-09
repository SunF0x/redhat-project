import './ProcessOrder.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { REACT_APP_API } from '../../config/config';

const Order = () => {
  const { id } = useParams();
  const [app, setApp] = useState([]);
  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }
  const route = [
    'Избушка бабы яги',
    'Поверните направо',
    'Пройдите до зеленого дуба',
    'Поздоровайтесь с котом',
    'Прямо до пруда',
    'Утопитесь (Шутка)',
    'Налево до гриба'
  ];
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/order/${id}`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response?.json();
      //   console.log(result);
      setApp(result);
    };
    asyncFn();
    // if (localStorage.getItem('goods') === null) {
    //   localStorage.setItem('goods', []);
    // }
  }, [change]);

  function countsum() {
    let sum = 0;
    // if (app.length > 0) {
    app?.items?.map((row) => (sum += parseFloat(row.pricePerPiece) * parseFloat(row.count)));
    // console.log(sum);
    // }
    return sum;
  }

  const handlecookorder = () => {
    const asyncCookOper = async () => {
      await fetch(`${REACT_APP_API}/order/${id}`, {
        method: 'PUT',
        headers: myHeaders
      }).then(() => setChange(!change));
    };
    const asyncCourier = async () => {
      await fetch(`${REACT_APP_API}/order/take/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          method: 'take'
        })
      }).then(() => setChange(!change));
    };
    if (parseJwt()?.role !== 'Courier') {
      asyncCookOper();
    } else if (app.status === 'WaitingTakeout') {
      asyncCourier();
    }
  };

  const handleready = () => {
    const asyncReady = async () => {
      await fetch(`${REACT_APP_API}/order/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          method: 'issue'
        })
      }).then(() => setChange(!change));
    };
    asyncReady();
  };

  const verifycourier = () => {
    const asyncVerify = async () => {
      await fetch(
        `${REACT_APP_API}/validate/hat/${document.getElementById('courier_code').value}`,
        {
          method: 'GET',
          headers: myHeaders
        }
      )
        .then((res) =>
          res.status == 200
            ? enqueueSnackbar('Верификация прошла успешно', { variant: 'success' })
            : enqueueSnackbar('Курьер не найден', { variant: 'error' })
        )
        .catch((e) => {
          console.log('Error: ' + e.message);
          console.log(e.response);
        });

      //navigate('/process-order');
    };
    asyncVerify();
  };

  const verifyclient = () => {
    const asyncVerify = async () => {
      await fetch(`${REACT_APP_API}/order/${id}/${document.getElementById('client_code').value}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          method: 'issue'
        })
      })
        .then((res) =>
          res.status == 200
            ? (enqueueSnackbar('Заказ доставлен', { variant: 'success' }),
              navigate('/process-order'))
            : enqueueSnackbar('Неверный код', { variant: 'error' })
        )
        .catch((e) => {
          console.log('Error: ' + e.message);
          console.log(e.response);
        });

      //navigate('/process-order');
    };
    asyncVerify();
  };

  return (
    <div className="fon">
      <div className="pole">
        <div className="title2">Заказ</div>
        <div className="text2">
          Дата: {app?.created?.substring(0, 10)} {app?.created?.substring(11, 19)}
        </div>
        <div className="text2">Адрес: {app.address}</div>{' '}
        <div className="text2">
          Позиции:{' '}
          {app?.items?.map((el) => (
            <div>
              <div className="text2">
                {el.itemName} - {parseInt(el.count)} шт.
              </div>
            </div>
          ))}
        </div>
        <div className="text2">Сумма: {countsum()}</div>
        <div className="text2">Комментарий: {app.comment}</div>
        <div className="text2">Статус: {app.status}</div>
        <div className="text2">
          Заказ обрабатывает:
          {app.status === 'Cooking'
            ? ' Повар'
            : app.status === 'WaitingTakeout'
            ? ' Оператор'
            : app.status === 'Delivering'
            ? ' Курьер'
            : ' -'}
        </div>
      </div>
      {parseJwt()?.role === 'Cook' && (
        <Button
          disabled={app.status === 'Cooking'}
          type="submit"
          onClick={handlecookorder}
          variant="contained"
          style={{
            width: '200px',
            backgroundColor: `#3e131b`,
            fontFamily: 'El Messiri',
            fontSize: 16,
            margin: '30px',
            color: 'white'
          }}>
          Взять в работу
        </Button>
      )}
      {parseJwt()?.role === 'Operator' && (
        <Button
          disabled={app.status === 'WaitingTakeout'}
          type="submit"
          onClick={handlecookorder}
          variant="contained"
          style={{
            width: '200px',
            backgroundColor: `#3e131b`,
            fontFamily: 'El Messiri',
            fontSize: 16,
            margin: '30px',
            color: 'white'
          }}>
          Взять на выдачу
        </Button>
      )}
      {parseJwt()?.role === 'Operator' && app.status === 'WaitingTakeout' && (
        <Button
          type="submit"
          onClick={() => setOpen(!open)}
          variant="contained"
          style={{
            width: '200px',
            backgroundColor: `#3e131b`,
            fontFamily: 'El Messiri',
            fontSize: 16,
            margin: '30px',
            color: 'white'
          }}>
          Выдать заказ
        </Button>
      )}
      {open && (
        <div className="flex flex-row gap-4 ml-8 mt-4">
          <input
            className="h-10 rounded-md pl-2"
            id="courier_code"
            type="courier_code"
            label="courier_code"
            placeholder="Введите код курьера"
          />
          <Button
            variant="contained"
            onClick={() => verifycourier()}
            style={{
              bottom: 0,
              right: 0,
              width: '150px',
              backgroundColor: `#90182E`,
              fontFamily: 'El Messiri',
              fontSize: 16
            }}>
            Проверить
          </Button>
        </div>
      )}
      {parseJwt()?.role === 'Courier' && (
        <Button
          disabled={app.status === 'Delivering'}
          type="submit"
          onClick={handlecookorder}
          variant="contained"
          style={{
            width: '200px',
            backgroundColor: `#3e131b`,
            fontFamily: 'El Messiri',
            fontSize: 16,
            margin: '30px',
            color: 'white'
          }}>
          Взять в доставку
        </Button>
      )}
      {parseJwt()?.role === 'Courier' && (
        <Button
          type="submit"
          onClick={() => setShow(!show)}
          variant="contained"
          style={{
            width: '220px',
            backgroundColor: `#3e131b`,
            fontFamily: 'El Messiri',
            fontSize: 16,
            margin: '30px',
            color: 'white'
          }}>
          Показать маршрут
        </Button>
      )}
      {show && (
        <div>
          <div className="text2">Текущий адрес: {route[count]}</div>
          <div className="text2">Адрес клиента: {app.address}</div>
          <div className="text2">Инструкция: {route[count + 1] || app.address}</div>
          <Button
            variant="contained"
            onClick={() => setCount(count + 1)}
            style={{
              width: '220px',
              backgroundColor: `white`,
              fontFamily: 'El Messiri',
              fontSize: 12,
              margin: '30px',
              color: 'black'
            }}>
            Следующая инструкция
          </Button>
        </div>
      )}
      {parseJwt()?.role === 'Courier' && app.status === 'Delivering' && (
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-4 ml-8 mt-4">
            <input
              className="h-10 rounded-md pl-2"
              id="client_code"
              type="client_code"
              label="client_code"
              placeholder="Введите код клиента"
            />
            <Button
              variant="contained"
              onClick={verifyclient}
              style={{
                bottom: 0,
                right: 0,
                width: '150px',
                backgroundColor: `#90182E`,
                fontFamily: 'El Messiri',
                fontSize: 16
              }}>
              Проверить
            </Button>
          </div>
          <Button
            type="submit"
            onClick={handleready}
            variant="contained"
            style={{
              width: '200px',
              backgroundColor: `black`,
              fontFamily: 'El Messiri',
              fontSize: 16,
              margin: '16px'
            }}>
            Заказ доставлен
          </Button>
        </div>
      )}
      {parseJwt()?.role === 'Admin' && (
        <Button
          disabled={app.status === 'Canceled'}
          type="submit"
          onClick={handlecookorder}
          variant="contained"
          style={{
            width: '200px',
            backgroundColor: `#3e131b`,
            fontFamily: 'El Messiri',
            fontSize: 16,
            margin: '30px',
            color: 'white'
          }}>
          Отменить заказ
        </Button>
      )}
      <div className="button-left">
        <Button
          type="submit"
          onClick={() => navigate('/process-order')}
          variant="contained"
          style={{
            width: '150px',
            backgroundColor: `#90182E`,
            fontFamily: 'El Messiri',
            fontSize: 16
          }}>
          Закрыть
        </Button>
      </div>
      <SnackbarProvider />
    </div>
  );
};
export default Order;
