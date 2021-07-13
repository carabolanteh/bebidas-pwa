import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: 'auto',
    maxHeight: 580
  },
}));


const Receta = ({receta}) => {

  // extrear los valores del context
  const { setIdReceta, getReceta, setGetReceta } = useContext(ModalContext);

  // configuracion del modal de materialUI
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleClose = () => setOpen(!open);
  
  // Mostrando los ingredientes y medidas de la receta

  const MostrarIngredientes = getReceta => {
    let ingredientes = []
    for(let i = 1; i < 16; i++){
      if(getReceta[`strIngredient${i}`]){
        ingredientes.push(
          <li>
            {getReceta[`strIngredient${i}`]}: 
            {getReceta[`strMeasure${i}`]}
          </li>
        )
      }
    }
    return ingredientes;
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>
        <img 
          className="card-img-top"
          src={receta.strDrinkThumb} 
          alt={receta.strDrink}
        />
        <div className="card-body d-grid gap-2">
          <button
            type="button"
            className="btn btn-block btn-danger "
            onClick={() => {
              setIdReceta(receta.idDrink)
              handleClose();
            }}
          >
            Ver receta 
          </button>
          <Modal
            open={open}
            onClose={() =>{
              setIdReceta(null)
              setGetReceta({})
              handleClose()
            }}
          >
            <Grid item xs={12} sm={6} style={modalStyle} className={classes.paper}>
              <h2>{getReceta.strDrink}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p>
                {getReceta.strInstructions}
              </p>
              <img className="img-fluid my-4" src={getReceta.strDrinkThumb} alt= {`Imagen de: ${getReceta.strDrink}`} />
              <h3>Ingredientes y cantidades</h3>
              <ul>
                {MostrarIngredientes(getReceta)}
              </ul>
            </Grid>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;