import './Menu.css';
import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { useEffect, useState } from 'react';
import Item from './Item';
import { Navigate } from 'react-router-dom';

const Menu = () => {
  const [app, setApp] = useState([]);
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }
  if (parseJwt()?.role === 'Cook') {
    return <Navigate to="/cook-order" />;
  }
  useEffect(() => {
    const asyncFn = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      const response = await fetch('http://127.0.0.1:7777/v1/menu', { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setApp(result);
    };
    asyncFn();
  }, []);
  return (
    <div className="fon">
      <div className="pole">
        {app.length > 0
          ? app?.map((el) => (
              <div key={el.menuItemGuid}>
                <Item element={el} />
                <div className="Line"></div>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};
export default Menu;
