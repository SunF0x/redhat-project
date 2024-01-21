// import './Report.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { REACT_APP_API } from '../../config/config';
import { getAccessToken } from '../../utils/accessToken';

const InspectAdminId = () => {
  const { id } = useParams();
  const [app, setApp] = useState([]);
  const [status, setStatus] = useState([]);
  const navigate = useNavigate();
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/inspection/${id}`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      // const arr = result.filter((el) => el.reportId.toString() == id);
      setApp(result);
      const response1 = await fetch(`${REACT_APP_API}/inspection/statuses`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result1 = await response1.json();
      // const arr = result.filter((el) => el.reportId.toString() == id);
      setStatus(result1);
    };
    asyncFn();
  }, [status]);

  const handlepublic = () => {
    const asyncCansel = () => {
      fetch(`${REACT_APP_API}/inspection/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          status: 'Explored'
        })
      }).then((res) => (res.status === 200 ? setStatus(!status) : alert('Something wrong')));
    };
    asyncCansel();
    // navigate('/process-admin');
  };

  const handlearchive = () => {
    const asyncCansel = () => {
      fetch(`${REACT_APP_API}/inspection/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          status: 'Archived'
        })
      }).then((res) => (res.status === 200 ? setStatus(!status) : alert('Something wrong')));
    };
    asyncCansel();
    // navigate('/process-admin');
  };

  return (
    <div className="fon">
      <div className="pole1">
        <div className="title2">Отчет</div>
        <div className="text2">
          Дата: {app?.created?.substring(0, 10)} {app?.created?.substring(11, 19)}
        </div>
        <div className="text2">
          {app?.photoUris?.map((el, index) => (
            <img src={`http://localhost:7777${el}`} key={index} />
          ))}
        </div>

        <div className="text2">Комментарий: {app.text}</div>
        <div className="text2">Создатель: {app.inspectionBy}</div>
        <div className="text2">Статус: {app.status}</div>
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
          Изучено
        </Button>
        <Button
          disabled={app.status === 'Cooking'}
          type="submit"
          onClick={handlearchive}
          variant="contained"
          style={{
            width: '200px',
            backgroundColor: `#3e131b`,
            fontFamily: 'El Messiri',
            fontSize: 16,
            margin: '30px',
            color: 'white'
          }}>
          Архивировать
        </Button>

        <div className="button-left">
          <Button
            type="submit"
            onClick={() => navigate('/inspect-admin')}
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
export default InspectAdminId;
