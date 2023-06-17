import { Navigate, useNavigate } from 'react-router-dom';
import { deleteAccessToken, getAccessToken } from '../../utils/accessToken';
import { Button } from '@mui/material';

const Layout = () => {
  const navigate = useNavigate();
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    deleteAccessToken();
    navigate('/login');
  };

  return (
    <div>
      Users
      <Button onClick={handleLogout}>Выход</Button>
    </div>
  );
};
export default Layout;
