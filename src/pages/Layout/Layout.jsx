import './Layout.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { deleteAccessToken, getAccessToken, parseJwt } from '../../utils/accessToken';
import { Button } from '@mui/material';
import { REACT_APP_API } from '../../config/config';
import { useState } from 'react';

const Layout = () => {
  const navigate = useNavigate();
  const [openmenu, setOpenmenu] = useState(false);
  const [courierCode, setCouriercode] = useState(false);
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    deleteAccessToken();
    navigate('/login');
  };

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

  function getCourierCode() {
    const asyncCourier = async () => {
      const response = await fetch(`${REACT_APP_API}/profile`, {
        method: 'GET',
        headers: myHeaders
      });
      const result = await response.json();
      setCouriercode(result?.hatCode);
    };
    asyncCourier();
    return courierCode;
  }

  return (
    <>
      <div className="header">
        <div className="button">
          <Button
            onClick={() => setOpenmenu(!openmenu)}
            type="submit"
            variant="contained"
            style={{
              width: '150px',
              backgroundColor: `rgb(62, 19, 27)`,
              fontFamily: 'El Messiri',
              fontSize: 16
            }}>
            Меню
          </Button>
          {parseJwt()?.role === 'Client' && (
            <Button
              type="submit"
              variant="contained"
              style={{
                width: '200px',
                backgroundColor: `#3e131b`,
                fontFamily: 'El Messiri',
                fontSize: 16,
                marginLeft: '650px'
              }}>
              <Link to="user" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                Личный кабинет
              </Link>
            </Button>
          )}
          {parseJwt()?.role === 'Courier' && (
            <Button
              type="submit"
              variant="text"
              style={{
                width: '250px',
                color: 'white',
                fontFamily: 'El Messiri',
                fontSize: 16,
                marginLeft: '650px'
              }}>
              Код шапочки: {getCourierCode()}
            </Button>
          )}
          <Button
            onClick={handleLogout}
            type="submit"
            variant="contained"
            style={{
              width: '150px',
              backgroundColor: `#3e131b`,
              fontFamily: 'El Messiri',
              fontSize: 16
            }}>
            Выход
          </Button>
        </div>
        {openmenu && (parseJwt().role === 'Client' || parseJwt()?.role === 'SecretShopper') && (
          <div className="z-50 ml-8 p-2 w-36 bg-[#3e131b] place-items-center text-white flex flex-col gap-2 rounded-md">
            <Link to="menu" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
              Меню
            </Link>
            <Link to="bag" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
              Корзина
            </Link>
            <Link to="my-order" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
              Мои заказы
            </Link>
          </div>
        )}
        {openmenu &&
          (parseJwt()?.role === 'Cook' ||
            parseJwt()?.role === 'Operator' ||
            parseJwt()?.role === 'Courier' ||
            parseJwt()?.role === 'Inspector') && (
            <div className="ml-8 p-2 w-36 bg-[#3e131b] place-items-center text-white flex flex-col gap-2 rounded-md">
              <Link to="process-order" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
                Заказы
              </Link>
            </div>
          )}
        {openmenu && parseJwt()?.role === 'Admin' && (
          <div className="ml-8 p-2 w-36 bg-[#3e131b] place-items-center text-white flex flex-col gap-2 rounded-md">
            <Link to="menus" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
              Меню
            </Link>
            <Link to="process-order" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
              Заказы
            </Link>
            <Link to="report" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
              Отчеты
            </Link>
            <Link to="user-report" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
              Отзывы
            </Link>
            <Link to="users" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
              Пользователи
            </Link>
            <Link
              to="terms"
              style={{ fontFamily: 'El Messiri', fontSize: 16, textAlign: 'center' }}>
              Условия обслуживания
            </Link>
            <Link to="promo" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
              Промо
            </Link>
          </div>
        )}
        {openmenu && (parseJwt()?.role === 'SecretShopper' || parseJwt()?.role === 'Inspector') && (
          <div className="ml-8 p-2 w-36 bg-[#3e131b] place-items-center text-white flex flex-col gap-2 rounded-md">
            <Link to="report" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
              Отчеты
            </Link>
          </div>
        )}
      </div>
      <div className="fon">
        <div className="pole"></div>
      </div>
    </>
  );
};
export default Layout;
