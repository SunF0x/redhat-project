// import './Menu.css';
import { Link, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { REACT_APP_API } from '../../config/config';
import { useFormik } from 'formik';

const Dishes = (element) => {
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [file, setFile] = useState(null);
  const [new_file, setNewFile] = useState(null);
  const el = element?.element;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  const deleteDishes = (id) => {
    const asyncCansel = () => {
      fetch(`${REACT_APP_API}/menu/dish/${id}`, {
        method: 'DELETE',
        headers: myHeaders //,
      }).then((res) => {
        if (res.status == 200) {
          enqueueSnackbar('Блюдо удалено', { variant: 'success' });
        } else {
          enqueueSnackbar('Не удалось удалить блюдо', { variant: 'error' });
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
          enqueueSnackbar('Блюдо создано', { variant: 'success' });
        } else {
          enqueueSnackbar('Блюдо создать не удалось', { variant: 'error' });
        }
      });
    };
    asyncReport();
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      name: el.name,
      description: el.description
    },
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      if (new_file) formData.append(`image`, new_file);
      if (values.name !== el.name) formData.append('name', values.name);
      if (values.description !== el.description) formData.append('description', values.description);

      const myHeaders2 = new Headers();
      myHeaders2.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      fetch(`${REACT_APP_API}/menu/dish/${el.id}`, {
        method: 'PUT',
        headers: myHeaders2,
        body: formData
      }).then((res) => {
        if (res.status == 200) {
          setUpdate(false);
          enqueueSnackbar('Блюдо обновлено', { variant: 'success' });
        } else {
          enqueueSnackbar('Блюдо не удалось обновить', { variant: 'error' });
        }
      });
    }
  });

  return (
    <div className="p-4 flex flex-row">
      <img src={`http://localhost:7777${el.imageUri}`} />
      <div className="flex flex-col pl-4 max-w-4xl">
        <div className="name" onClick={() => setUpdate(true)}>
          {/* <Link style={{ textDecoration: 'underline' }} to={`/dishes/${el.id}`}> */}
          <Link>{el.name}</Link>
          {/* </Link> */}
        </div>
        <div className="description">{el.description}</div>
      </div>
      <button onClick={() => deleteDishes(el.id)}>🗑</button>
      {/* <button onClick={() => addDishes}>✛</button> */}
      <Button
        type="submit"
        variant="contained"
        onClick={handleCreate}
        style={{
          position: 'absolute',
          top: 70,
          right: 40,
          width: '200px',
          height: '40px',
          backgroundColor: `#90182E`,
          fontFamily: 'El Messiri',
          fontSize: 16
        }}>
        Добавить блюдо
      </Button>
      <Dialog onClose={() => setCreate(false)} open={create}>
        <DialogContent className="bg-[rgb(245,229,231,0.9)]">
          <form
            method="POST"
            id="uploadForm"
            onSubmit={addDish}
            className="flex flex-col gap-4 mt-4">
            <input
              className="h-10 rounded-md pl-2"
              id="name"
              type="name"
              label="name"
              placeholder="Имя"
            />
            <input
              className="h-10 rounded-md pl-2"
              id="description"
              type="description"
              label="description"
              placeholder="Описание"
            />
            <input
              className="h-10 rounded-md pl-2 mt-2"
              id="file"
              type="file"
              label="file"
              onChange={handleFile}
              accept="image/*,image/jpeg"
              placeholder="Прикрепить изображение"></input>
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
                onClick={() => setCreate(false)}
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
      <Dialog onClose={() => setUpdate(false)} open={update}>
        <DialogContent className="bg-[rgb(245,229,231,0.9)]">
          <form
            method="POST"
            id="uploadForm"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-4">
            <input
              className="h-10 rounded-md pl-2"
              id="name"
              type="name"
              label="name"
              placeholder="Имя"
              value={values.name}
              onChange={handleChange}
            />
            <input
              className="h-10 rounded-md pl-2"
              id="description"
              type="description"
              label="description"
              placeholder="Описание"
              value={values.description}
              onChange={handleChange}
            />
            <input
              className="h-10 rounded-md pl-2 mt-2"
              id="new_file"
              type="file"
              label="new_file"
              onChange={handleFileUpload}
              value={values.file}
              // onChange={handleChange}
              accept="image/*,image/jpeg"
              placeholder="Прикрепить изображение"></input>
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
      <SnackbarProvider />
      {/* <button onClick={() => addElementtoBag(el.menuItemId)}>✛</button> */}
    </div>
  );
};
export default Dishes;
