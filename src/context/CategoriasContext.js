import { useState, useEffect, createContext } from "react";
import axios from 'axios';

// Crear nuestro primer context

export const CategoriasContext = createContext();

// Provider es donde se encuentran las func y el stado

const CategoriasProvider = (props) => {
    const [categorias, setCategorias] = useState([]);


    useEffect(() => {
        const obtenerCategoria = async ()=>{
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            const categorias = await axios.get(url);
            setCategorias(categorias.data.drinks);
        }
        obtenerCategoria()
    }, []);

    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;