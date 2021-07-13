import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

// ejecutar el contexto
export const RecetasContext = createContext();

// Escribimos al proveedor
const RecetasProvider = props => {

  const [busquedaReceta, setBusquedaReceta] = useState({
    nombre: '',
    categoria: ''
  })
  const [recetas, setRecetas] = useState([]);
  const [consultar, setConsultar] = useState(false);

  const {nombre, categoria} = busquedaReceta;

  useEffect(() =>{
    if(consultar){
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`
        const recetasResponse = await axios.get(url);
        setRecetas(recetasResponse.data.drinks);
      };
      obtenerRecetas();
    }
  },[busquedaReceta])

  return(
    <RecetasContext.Provider
      value={{
        setBusquedaReceta, 
        setConsultar,
        recetas
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

// exportar al proveedor
export default RecetasProvider;