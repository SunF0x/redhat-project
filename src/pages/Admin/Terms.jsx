import { getAccessToken, parseJwt } from '../../utils/accessToken';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const Terms = () => {
  const [open, setOpen] = useState(false);
  if (!(parseJwt()?.role == 'Admin')) {
    return <Navigate to="/" />;
  }

  const saveinfo = () => {};

  return (
    <div className="fon">
      <div className="pole">
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
                value="Настоящее лицензионное соглашение (далее «Соглашение») является лицензионным договором
                о предоставлении права использования программного комплекса (программы для ЭВМ) (ст.1235,
                1286 Гражданского кодекса РФ) и регулирует отношения между Правообладателем на
                использование Автоматизированного программного комплекса «Податьвсуд.РФ», именуемое в
                дальнейшем «Лицензиар» и Вами, Лицензиатом Портала (далее «Лицензиат»), в отношении
                использования Портала."
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
                  //   onClick={() => setCount(count + 1)}
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
            //   onClick={() => setCount(count + 1)}
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
          <Button
            variant="contained"
            //   onClick={() => setCount(count + 1)}
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
        </div>
        <div className="flex flex-row gap-2 mt-48">
          <Button
            variant="contained"
            //   onClick={() => setCount(count + 1)}
            style={{
              width: '200px',
              backgroundColor: `black`,
              fontFamily: 'El Messiri',
              fontSize: 12,
              margin: '30px',
              color: 'white'
            }}>
            Отменить
          </Button>
          <Button
            variant="contained"
            //   onClick={() => setCount(count + 1)}
            style={{
              width: '200px',
              backgroundColor: `#90182E`,
              fontFamily: 'El Messiri',
              fontSize: 12,
              margin: '30px',
              color: 'white'
            }}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Terms;
