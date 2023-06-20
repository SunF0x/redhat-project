import './Menu.css';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import imges from './pirozhki_s_myasom_10_sht.webp';

const Item = (element) => {
  const el = element?.element;
  const addElementtoBag = (element) => {
    if (localStorage.getItem('goods') === null) {
      localStorage.setItem('goods', []);
    }
    if (localStorage.getItem('goods') !== '') {
      let dict = JSON.parse(localStorage.getItem('goods'));
      let flag = false;
      for (const [key, value] of Object.entries(dict)) {
        if (key === element) {
          dict[key] = value + 1;
          flag = true;
          break;
        }
      }
      //   console.log(dict);
      if (!flag) dict[element] = 1;
      localStorage.setItem('goods', JSON.stringify(dict));
    } else {
      let dict = {};
      dict[element] = 1;
      localStorage.setItem('goods', JSON.stringify(dict));
    }
    enqueueSnackbar('Товар добавлен в корзину');
  };
  return (
    <div className="p-4 flex flex-row">
      {/* <img src={`../../${el.photoUri}`}></img> */}
      <img src={imges} />
      <div className="flex flex-col pl-4 max-w-4xl">
        <div className="name">{el.name}</div>
        <div className="description">{el.description}</div>
        <div className="description">Стоимость: {el.cost} руб.</div>
        {parseInt(el.discount) !== 0 ? (
          <div className="discount">Скидка: {parseInt(el.discount)} руб.</div>
        ) : (
          ''
        )}
      </div>
      <SnackbarProvider />
      <button onClick={() => addElementtoBag(el.menuItemGuid)}>✛</button>
    </div>
  );
};
export default Item;
