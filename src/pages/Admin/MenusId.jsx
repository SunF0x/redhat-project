import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Position from './Position';
import { REACT_APP_API } from '../../config/config';

const MenusId = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [dishes, setDish] = useState([]);
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  if (!(parseJwt()?.role == 'Admin')) {
    return <Navigate to="/" />;
  }
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/menu/${id}`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setMenu(result);
      const response2 = await fetch(`${REACT_APP_API}/menu/dishes`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result2 = await response2.json();
      setDish(result2);
    };
    asyncFn();
  }, []);

  const changename = () => {
    const asyncVerify = async () => {
      await fetch(`${REACT_APP_API}/menu/${id}/${document.getElementById('menu_name').value}`, {
        method: 'PUT',
        headers: myHeaders
      })
        .then((res) => (res.status == 200 ? navigate('/menus') : alert('Something wrong')))
        .catch((e) => {
          console.log('Error: ' + e.message);
          console.log(e.response);
        });
      setOpen(false);
      //navigate('/process-order');
    };
    asyncVerify();
  };

  const doCurrent = () => {
    const asyncVerify = async () => {
      await fetch(`${REACT_APP_API}/menus/${id}`, {
        method: 'PUT',
        headers: myHeaders
      })
        .then((res) => (res.status == 200 ? navigate('/menus') : alert('Something wrong')))
        .catch((e) => {
          console.log('Error: ' + e.message);
          console.log(e.response);
        });
    };
    asyncVerify();
  };

  const addDish = (e) => {
    e.preventDefault();
    const asyncVerify = async () => {
      const value = {
        menuId: Number(id),
        dishId: Number(document.getElementById('select_field').value),
        available: check,
        cost: Number(document.getElementById('cost').value),
        discount: Number(document.getElementById('discount').value)
      };
      console.log(value);
      await fetch(`${REACT_APP_API}/menuitem`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(value)
      })
        .then((res) => (res.status == 201 ? navigate('/menus') : alert('Something wrong')))
        .catch((e) => {
          console.log('Error: ' + e.message);
          console.log(e.response);
        });
    };
    asyncVerify();
  };

  return (
    <div className="p-4 flex flex-row">
      <div className="pole">
        <div className="title2">Позиции</div>
        <div className="flex flex-row gap-4">
          <div className="text2">{menu?.name}</div>
          <button className="text2" onClick={() => setOpen(!open)}>
            ✎
          </button>
          {menu.isCurrent ? (
            <div className="text2">Текущее меню</div>
          ) : (
            <Button
              variant="contained"
              onClick={() => doCurrent()}
              style={{
                width: '200px',
                backgroundColor: `#3e131b`,
                fontFamily: 'El Messiri',
                fontSize: 12,
                color: 'white'
              }}>
              Сделать меню текущим
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => setAdd(!add)}
            style={{
              width: '300px',
              backgroundColor: `#3e131b`,
              fontFamily: 'El Messiri',
              fontSize: 12,
              color: 'white'
            }}>
            Добавить позицию в меню
          </Button>
        </div>
        <Dialog onClose={() => setAdd(false)} open={add}>
          <DialogContent className="bg-[rgb(245,229,231,0.9)]">
            <form
              method="POST"
              id="uploadForm"
              onSubmit={addDish}
              className="flex flex-col gap-4 mt-4">
              <select id="select_field" className="h-12 w-96 rounded-md pl-2">
                {dishes?.length !== 0 &&
                  dishes?.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
              </select>
              <input
                className="h-10 rounded-md pl-2"
                id="cost"
                type="number"
                label="cost"
                placeholder="Цена"
              />
              <input
                className="h-10 rounded-md pl-2"
                id="discount"
                type="number"
                label="discount"
                placeholder="Скидка"
              />
              <div className="flex flex-row gap-2">
                <div>Доступно: </div>
                <input
                  type="checkbox"
                  id="check"
                  checked={check}
                  onChange={() => setCheck(!check)}
                  style={{ marginTop: '5px' }}
                  name="check"
                />
              </div>
              <div className="flex flex-row gap-4">
                <Button
                  type="submit"
                  variant="contained"
                  // onClick={addreport}
                  style={{
                    bottom: 0,
                    right: 0,
                    width: '180px',
                    backgroundColor: `#90182E`,
                    fontFamily: 'El Messiri',
                    fontSize: 16
                  }}>
                  Добавить
                </Button>
                <Button
                  // type="submit"
                  variant="contained"
                  onClick={() => setAdd(false)}
                  style={{
                    bottom: 0,
                    right: 0,
                    width: '150px',
                    backgroundColor: `black`,
                    fontFamily: 'El Messiri',
                    fontSize: 16
                  }}>
                  Закрыть
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        {open && (
          <div className="flex flex-row gap-4 ml-8 mt-4">
            <input
              className="h-10 rounded-md pl-2"
              id="menu_name"
              type="menu_name"
              label="menu_name"
              placeholder="Новое название меню"
            />
            <Button
              variant="contained"
              onClick={changename}
              style={{
                bottom: 0,
                right: 0,
                width: '180px',
                backgroundColor: `#90182E`,
                fontFamily: 'El Messiri',
                fontSize: 16
              }}>
              Изменить имя
            </Button>
          </div>
        )}
        {menu?.items?.length > 0
          ? menu?.items?.map((el) => (
              <div key={el.menuItemId}>
                <Position element={el} />
                <div className="Line"></div>
              </div>
            ))
          : ''}
      </div>
      {/* <div className="button-left"> */}
      <Button
        type="submit"
        onClick={() => navigate('/menus')}
        variant="contained"
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '50px',
          width: '150px',
          backgroundColor: `#90182E`,
          fontFamily: 'El Messiri',
          fontSize: 16
        }}>
        Закрыть
      </Button>
      {/* </div> */}
    </div>
  );
};
export default MenusId;
