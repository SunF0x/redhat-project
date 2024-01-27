// import './Menu.css';
import { Link, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { REACT_APP_API } from '../../config/config';
import { useFormik } from 'formik';

const Position = (element) => {
  const [update, setUpdate] = useState(false);
  const [dishes, setDish] = useState([]);
  const el = element?.element;
  console.log(el);
  const [check, setCheck] = useState(el.available);
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

  useEffect(() => {
    const asyncFn = async () => {
      const response = await fetch(`${REACT_APP_API}/menu/dishes`, { headers: myHeaders }); //,{mode: 'no-cors'}
      const result = await response.json();
      setDish(result);
    };
    asyncFn();
  }, []);

  const deleteDishes = (id) => {
    const asyncCansel = () => {
      fetch(`${REACT_APP_API}/menuitem/${id}`, {
        method: 'DELETE',
        headers: myHeaders //,
      }).then((res) => {
        if (res.status == 204) {
          enqueueSnackbar('Позиция удалена', { variant: 'success' });
        } else {
          enqueueSnackbar('Не удалось удалить позицию', { variant: 'error' });
        }
      });
    };
    asyncCansel();
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      cost: el.cost,
      discount: el.discount,
      // name: el.dish.name
      id: el.dish.id
    },
    onSubmit: async (values) => {
      const value = {
        dishId: Number(document.getElementById('select_field').value),
        available: check,
        cost: values.cost,
        discount: values.discount
      };

      fetch(`${REACT_APP_API}/menuitem/${el.id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(value)
      }).then((res) => {
        if (res.status == 200) {
          setUpdate(false);
          enqueueSnackbar('Позиция обновлена', { variant: 'success' });
        } else {
          enqueueSnackbar('Не удалось обновить позицию', { variant: 'error' });
        }
      });
    }
  });

  return (
    <div className="p-4 flex flex-row">
      <img src={`http://localhost:7777${el.dish.imageUri}`} />
      <div className="flex flex-col pl-4 max-w-4xl">
        <div className="flex flex-row space-x-4">
          <div className="name">
            <Link style={{ textDecoration: 'underline' }} onClick={() => setUpdate(!update)}>
              {el.dish.name}
            </Link>
          </div>
          <div className="discount">{el.available ? 'Доступен' : 'Недоступен'}</div>
        </div>
        <div className="description">{el.dish.description}</div>
        <div className="description">Стоимость: {el.cost} руб.</div>
        {parseInt(el.discount) !== 0 ? (
          <div className="discount">Скидка: {parseInt(el.discount)} руб.</div>
        ) : (
          ''
        )}
      </div>
      <button
        style={{ width: '40px', position: 'absolute', right: '40px' }}
        onClick={() => deleteDishes(el.id)}>
        🗑
      </button>
      <SnackbarProvider />
      <Dialog onClose={() => setUpdate(false)} open={update}>
        <DialogContent className="bg-[rgb(245,229,231,0.9)]">
          <form
            method="POST"
            id="uploadForm"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-4">
            <select
              id="select_field"
              className="h-12 w-96 rounded-md pl-2"
              onChange={() => setFieldValue('id', el.id)}>
              {dishes?.length !== 0 &&
                dishes?.map((el) => (
                  <option key={el.id} selected={el.id == values.id} value={el.id}>
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
              value={values.cost}
              onChange={handleChange}
            />
            <input
              className="h-10 rounded-md pl-2"
              id="discount"
              type="number"
              label="discount"
              placeholder="Скидка"
              value={values.discount}
              onChange={handleChange}
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
                Обновить
              </Button>
              <Button
                // type="submit"
                variant="contained"
                onClick={() => setUpdate(false)}
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
      {/* <button onClick={() => addElementtoBag(el.menuItemId)}>✛</button> */}
    </div>
  );
};
export default Position;
