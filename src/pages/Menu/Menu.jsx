import './Menu.css';
import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { useEffect, useState } from 'react';
import { Carousel } from './Carousel';
import Item from './Item';
import { Navigate } from 'react-router-dom';
import { REACT_APP_API } from '../../config/config';

const Menu = () => {
  const [app, setApp] = useState([]);
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }
  if (
    parseJwt()?.role === 'Cook' ||
    parseJwt()?.role === 'Operator' ||
    parseJwt()?.role === 'Courier' ||
    parseJwt()?.role === 'Admin'
  ) {
    return <Navigate to="/process-order" replace={true} />;
  } else if (parseJwt()?.role === 'Inspector' || parseJwt()?.role === 'SecretShopper') {
    return <Navigate to="/report" replace={true} />;
  } else if (parseJwt()?.role === null) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    const asyncFn = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      const response = await fetch(`${REACT_APP_API}/menu`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setApp(result);
    };
    asyncFn();
  }, []);

  const images = [];
  app?.map((el) =>
    images.push({
      id: el.menuItemId,
      title: el.name,
      url: `http://localhost:7777${el.photoUri}`
    })
  );
  return (
    <div className="fon">
      <div className="pole">
        <Carousel photos={images} />
        {app.length > 0
          ? app?.map((el) => (
              <div key={el.menuItemId}>
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
