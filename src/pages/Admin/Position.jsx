// import './Menu.css';
import { Link, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { REACT_APP_API } from '../../config/config';
import { useFormik } from 'formik';

const Position = (element) => {
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [file, setFile] = useState(null);
  const [new_file, setNewFile] = useState(null);
  const el = element?.element;
  console.log(el);
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  const deleteDishes = (id) => {
    const asyncCansel = () => {
      fetch(`${REACT_APP_API}/menuitem/${id}`, {
        method: 'DELETE',
        headers: myHeaders //,
      }).then((res) => {
        if (res.status == 204) {
          window.location.reload();
        } else {
          enqueueSnackbar('Не удалось удалить позицию', { variant: 'error' });
        }
      });
    };
    asyncCansel();
  };

  const handleCreate = () => {
    setCreate(!create);
  };

  const handleFile = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files) {
      setNewFile(e.target.files[0]);
    }
  };

  const addDish = (e) => {
    e.preventDefault();
    const asyncReport = () => {
      const formData = new FormData();
      formData.append(`image`, file);
      formData.append('name', document.getElementById('name').value);
      formData.append('description', document.getElementById('description').value);

      const myHeaders2 = new Headers();
      myHeaders2.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      fetch(`${REACT_APP_API}/menu/dish`, {
        method: 'POST',
        headers: myHeaders2,
        body: formData
      }).then((res) => {
        if (res.status == 201) {
          setCreate(false);
          window.location.reload();
        } else {
          alert('Something wrong');
        }
      });
    };
    asyncReport();
  };

  return (
    <div className="p-4 flex flex-row">
      <img src={`http://localhost:7777${el.dish.imageUri}`} />
      <div className="flex flex-col pl-4 max-w-4xl">
        <div className="flex flex-row space-x-4">
          <div className="name">{el.dish.name}</div>
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
      <button onClick={() => deleteDishes(el.id)}>🗑</button>
      <SnackbarProvider />
      {/* <button onClick={() => addElementtoBag(el.menuItemId)}>✛</button> */}
    </div>
  );
};
export default Position;
