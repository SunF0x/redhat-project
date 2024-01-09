import './Menu.css';
import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { useEffect, useState } from 'react';
import { Carousel } from './Carousel';
import Item from './Item';
import { Navigate } from 'react-router-dom';
import { REACT_APP_API } from '../../config/config';

const Menu = () => {
  const [app, setApp] = useState([]);
  const [promo, setPromo] = useState([]);
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
      const res_promo = await fetch(`${REACT_APP_API}/promo`, { headers: myHeaders });
      const promo = await res_promo.json();
      setPromo(promo);
    };
    asyncFn();
  }, []);

  const images = [];
  promo?.map((el, index) =>
    images.push({
      id: index,
      title: 'promo',
      url: `http://localhost:7777${el}`
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
