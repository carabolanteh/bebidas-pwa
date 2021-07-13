import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// generar el contexto
export const ModalContext = createContext();

const ModalProvider = props => {

  // generar el state del provider
  const [idReceta, setIdReceta] = useState(null);
  const [getReceta, setGetReceta] = useState({});

  // llamamos al api con el id

  useEffect(() => {
    const obtenerId = async () => {
      if(!idReceta) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`; 
      const receta = await axios.get(url)
      setGetReceta(receta.data.drinks[0]);
    }
    obtenerId();
  },[idReceta])

  return(
    <ModalContext.Provider
      value={{
        setIdReceta,
        setGetReceta,
        getReceta
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}; 

export default ModalProvider;