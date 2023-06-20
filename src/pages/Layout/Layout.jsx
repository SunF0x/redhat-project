import './Layout.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { deleteAccessToken, getAccessToken, parseJwt } from '../../utils/accessToken';
import { Button } from '@mui/material';
import { useState } from 'react';

const Layout = () => {
  const navigate = useNavigate();
  const [openmenu, setOpenmenu] = useState(false);
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    deleteAccessToken();
    navigate('/login');
  };

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
        {openmenu && parseJwt().role === 'Client' && (
          <div className="ml-3 p-2 w-36 bg-[#3e131b] place-items-center text-white flex flex-col gap-2 rounded-md">
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
        {openmenu && parseJwt().role === 'Cook' && (
          <div className="ml-3 p-2 w-36 bg-[#3e131b] place-items-center text-white flex flex-col gap-2 rounded-md">
            <Link to="cook-order" style={{ fontFamily: 'El Messiri', fontSize: 16 }}>
              Заказы
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
