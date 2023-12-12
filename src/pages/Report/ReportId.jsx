import './Report.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { REACT_APP_API } from '../../config/config';
import { getAccessToken } from '../../utils/accessToken';

const ReportId = () => {
  const { id } = useParams();
  const [app, setApp] = useState([]);
  const navigate = useNavigate();
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/order/${id}`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      //   console.log(result);
      setApp(result);
    };
    asyncFn();
    if (localStorage.getItem('goods') === null) {
      localStorage.setItem('goods', []);
    }
  }, []);

  function countsum() {
    let sum = 0;
    // if (app.length > 0) {
    app?.items?.map((row) => (sum += parseFloat(row.pricePerPiece) * parseFloat(row.count)));
    // console.log(sum);
    // }
    return sum;
  }

  const handledeleteorder = () => {
    const asyncCansel = () => {
      fetch(`${REACT_APP_API}/order/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          method: 'cancel'
        })
      });
    };
    asyncCansel();
    navigate('/my-order');
  };

  const addreport = () => {
    const asyncReport = () => {
      fetch(`${REACT_APP_API}/order/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          method: 'report',
          data: document.getElementById('report').value
        })
      });
    };
    asyncReport();
    navigate('/my-order');
  };

  return (
    <div className="fon">
      <div className="pole">
        <div className="title2">Мои заказы - Заказ</div>
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
      </div>
      {app.status === 'Created' && (
        <Button
          type="submit"
          onClick={handledeleteorder}
          variant="contained"
          style={{
            width: '200px',
            backgroundColor: `#3e131b`,
            fontFamily: 'El Messiri',
            fontSize: 16,
            margin: '30px'
          }}>
          Отменить заказ
        </Button>
      )}
      {app.status === 'Done' && (
        <form onSubmit={addreport} className="flex flex-row gap-4 ml-8 mt-4">
          <input
            className="h-10 rounded-md pl-2"
            id="report"
            type="report"
            label="report"
            placeholder="Оставьте отзыв"
          />
          <Button
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
            Отправить
          </Button>
        </form>
      )}
      <div className="button-left">
        <Button
          type="submit"
          onClick={() => navigate('/my-order')}
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
    </div>
  );
};
export default ReportId;