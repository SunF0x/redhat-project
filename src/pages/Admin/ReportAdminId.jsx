// import './Report.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { REACT_APP_API } from '../../config/config';
import { getAccessToken } from '../../utils/accessToken';

const ReportAdminId = () => {
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
      const response = await fetch(`${REACT_APP_API}/admin/review/${id}`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      // const arr = result.filter((el) => el.reportId.toString() == id);
      setApp(result);
    };
    asyncFn();
  }, []);

  const handlepublic = () => {
    const asyncCansel = () => {
      fetch(`${REACT_APP_API}/admin/review/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          status: 'Published'
        })
      }).then((res) => (res.status === 200 ? window.location.reload() : alert('Something wrong')));
    };
    asyncCansel();
    // navigate('/process-admin');
  };

  return (
    <div className="fon">
      <div className="pole1">
        <div className="title2">Мои отчеты - Отчет</div>
        <div className="text2">
          Дата: {app?.created?.substring(0, 10)} {app?.created?.substring(11, 19)}
        </div>
        <div className="text2">
          {app?.dataUris?.map((el, index) => (
            <img src={`http://localhost:7777${el}`} key={index} />
          ))}
        </div>

        <div className="text2">Комментарий: {app.text}</div>
        <div className="text2">Оценка: {app.mark}</div>
        <div className="text2">Заказ номер: {app.orderId}</div>
        <div className="text2">Статус: {app.reportStatus}</div>
        <Button
          disabled={app.status === 'Cooking'}
          type="submit"
          onClick={handlepublic}
          variant="contained"
          style={{
            width: '200px',
            backgroundColor: `#3e131b`,
            fontFamily: 'El Messiri',
            fontSize: 16,
            margin: '30px',
            color: 'white'
          }}>
          Опубликовать
        </Button>

        <div className="button-left">
          <Button
            type="submit"
            onClick={() => navigate('/report-admin')}
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
    </div>
  );
};
export default ReportAdminId;
