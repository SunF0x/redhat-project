import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';

const User = () => {
  const [address, setAddress] = useState([]);
  const [change, setChange] = useState(false);
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch('http://127.0.0.1:7777/v1/client/address', {
        headers: myHeaders
      });
      const result = await response.json();
      setAddress(result);
    };
    asyncFn();
  }, [change]);

  const deleteaddress = (add) => {
    const asyncDel = async () => {
      await fetch(`http://127.0.0.1:7777/v1/client/address/${add}`, {
        method: 'DELETE',
        headers: myHeaders
      }).then(() => setChange(!change));
    };
    asyncDel();
  };

  const addaddress = () => {
    const asyncAdd = async () => {
      await fetch(`http://127.0.0.1:7777/v1/client/address`, {
        method: 'POST',
        headers: myHeaders,
        body: document.getElementById('address').value
      }).then(() => setChange(!change));
    };
    asyncAdd();
  };

  return (
    <div className="fon">
      <div className="pole">
        <div className="title2">Роль: {parseJwt()?.role}</div>
        <div className="text2"> Список доступных адресов: </div>
        {address?.map((el) => (
          <div className="text2" key={el.clientGuid} value={el.clientGuid}>
            {el.address}{' '}
            <button
              onClick={() => deleteaddress(el.clientGuid)}
              style={{ marginLeft: '20px', color: 'white' }}>
              ✕
            </button>
          </div>
        ))}
        <div className="flex flex-row gap-4 ml-8 mt-10">
          <input
            className="h-10 rounded-md pl-2"
            id="address"
            type="address"
            label="address"
            placeholder="Добавьте новый адрес"
          />
          <Button
            onClick={addaddress}
            type="submit"
            variant="contained"
            style={{
              bottom: 0,
              right: 0,
              width: '150px',
              backgroundColor: `#90182E`,
              fontFamily: 'El Messiri',
              fontSize: 16
            }}>
            Сохранить
          </Button>
        </div>
        <div className="h-96"></div>
      </div>
    </div>
  );
};
export default User;
