import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { REACT_APP_API } from '../../config/config';

const Terms = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [userAgr, setUserAgr] = useState('');
  const [pDate, setPDate] = useState('');
  const [terms, setTerms] = useState('');

  if (!(parseJwt()?.role == 'Admin')) {
    return <Navigate to="/" />;
  }

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/terms/userAgreement`, { headers: myHeaders });
      const result = await response.text();
      setUserAgr(result);
      const response2 = await fetch(`${REACT_APP_API}/terms/personalPolicy`, {
        headers: myHeaders
      });
      const result2 = await response2.text();
      setPDate(result2);
      const response3 = await fetch(`${REACT_APP_API}/terms/deliveryTerms`, { headers: myHeaders });
      const result3 = await response3.text();
      setTerms(result3);
    };
    asyncFn();
  }, []);

  const saveinfo = () => {
    const asyncFn = async () => {
      await fetch(`${REACT_APP_API}/terms/userAgreement`, {
        method: 'PUT',
        headers: myHeaders,
        body: userAgr
      })
        .then((res) => res.status != 200 && alert('Something wrong'))
        .catch((e) => {
          console.log('Error: ' + e.message);
          console.log(e.response);
        });
      setOpen(false);
    };
    asyncFn();
  };

  const saveinfo1 = () => {
    const asyncFn = async () => {
      await fetch(`${REACT_APP_API}/terms/personalPolicy`, {
        method: 'PUT',
        headers: myHeaders,
        body: pDate
      })
        .then((res) => res.status != 200 && alert('Something wrong'))
        .catch((e) => {
          console.log('Error: ' + e.message);
          console.log(e.response);
        });
      setOpen1(false);
    };
    asyncFn();
  };

  const saveinfo2 = () => {
    const asyncFn = async () => {
      await fetch(`${REACT_APP_API}/terms/deliveryTerms`, {
        method: 'PUT',
        headers: myHeaders,
        body: terms
      })
        .then((res) => res.status != 200 && alert('Something wrong'))
        .catch((e) => {
          console.log('Error: ' + e.message);
          console.log(e.response);
        });
      setOpen2(false);
    };
    asyncFn();
  };

  return (
    <div className="fon">
      <div className="pole1">
        <div className="flex flex-col">
          <Button
            variant="contained"
            onClick={() => setOpen(!open)}
            style={{
              width: '450px',
              backgroundColor: `#3e131b`,
              fontFamily: 'El Messiri',
              fontSize: 12,
              margin: '30px',
              color: 'white'
            }}>
            Изменить пользовательское и лицензионное соглашение
          </Button>
          {open && (
            <form onSubmit={saveinfo} className="flex flex-row gap-4 ml-8 mt-4">
              <textarea
                className="h-40 w-[450px] rounded-md pl-2"
                id="report"
                type="text"
                label="report"
                placeholder=""
                value={userAgr}
                onChange={(e) => setUserAgr(e.target.value)}
              />
              <div className="flex flex-col">
                <Button
                  variant="contained"
                  //   onClick={() => setCount(count + 1)}
                  style={{
                    width: '200px',
                    backgroundColor: `black`,
                    fontFamily: 'El Messiri',
                    fontSize: 12,
                    margin: '20px',
                    color: 'white'
                  }}>
                  Отменить
                </Button>
                <Button
                  variant="contained"
                  onClick={saveinfo}
                  style={{
                    width: '200px',
                    backgroundColor: `#90182E`,
                    fontFamily: 'El Messiri',
                    fontSize: 12,
                    margin: '20px',
                    color: 'white'
                  }}>
                  Сохранить
                </Button>
              </div>
            </form>
          )}
          <Button
            variant="contained"
            onClick={() => setOpen1(!open1)}
            style={{
              width: '450px',
              backgroundColor: `#3e131b`,
              fontFamily: 'El Messiri',
              fontSize: 12,
              margin: '30px',
              color: 'white'
            }}>
            Изменить политику обработки персональных данных
          </Button>
          {open1 && (
            <form onSubmit={saveinfo1} className="flex flex-row gap-4 ml-8 mt-4">
              <textarea
                className="h-40 w-[450px] rounded-md pl-2"
                id="report"
                type="text"
                label="report"
                placeholder=""
                value={pDate}
                onChange={(e) => setPDate(e.target.value)}
              />
              <div className="flex flex-col">
                <Button
                  variant="contained"
                  onClick={() => setOpen1(false)}
                  style={{
                    width: '200px',
                    backgroundColor: `black`,
                    fontFamily: 'El Messiri',
                    fontSize: 12,
                    margin: '20px',
                    color: 'white'
                  }}>
                  Отменить
                </Button>
                <Button
                  variant="contained"
                  onClick={saveinfo1}
                  style={{
                    width: '200px',
                    backgroundColor: `#90182E`,
                    fontFamily: 'El Messiri',
                    fontSize: 12,
                    margin: '20px',
                    color: 'white'
                  }}>
                  Сохранить
                </Button>
              </div>
            </form>
          )}
          <Button
            variant="contained"
            onClick={() => setOpen2(!open2)}
            style={{
              width: '450px',
              backgroundColor: `#3e131b`,
              fontFamily: 'El Messiri',
              fontSize: 12,
              margin: '30px',
              color: 'white'
            }}>
            Изменить условия доставки и оплаты
          </Button>
          {open2 && (
            <form onSubmit={saveinfo2} className="flex flex-row gap-4 ml-8 mt-4">
              <textarea
                className="h-40 w-[450px] rounded-md pl-2"
                id="report"
                type="text"
                label="report"
                placeholder=""
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
              />
              <div className="flex flex-col">
                <Button
                  variant="contained"
                  onClick={() => setOpen2(false)}
                  style={{
                    width: '200px',
                    backgroundColor: `black`,
                    fontFamily: 'El Messiri',
                    fontSize: 12,
                    margin: '20px',
                    color: 'white'
                  }}>
                  Отменить
                </Button>
                <Button
                  variant="contained"
                  onClick={saveinfo2}
                  style={{
                    width: '200px',
                    backgroundColor: `#90182E`,
                    fontFamily: 'El Messiri',
                    fontSize: 12,
                    margin: '20px',
                    color: 'white'
                  }}>
                  Сохранить
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default Terms;
