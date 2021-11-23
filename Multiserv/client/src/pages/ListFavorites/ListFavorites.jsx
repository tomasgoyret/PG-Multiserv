import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getListFavorites, deleteListFavorites } from "../../redux/actions/actions";

const ListFavorites = ({ favoritos, getListFavorites, deleteListFavorites }) => {
    var { uid } = useParams();

  useEffect(() => {
    document.title = 'Mis favoritos'
    getListFavorites(uid);
  }, []);

  let eliminarFav = (e) => {
    deleteListFavorites(e.target.name,uid)
  }

  return (
    <div className="block  bg-green-100">
      <h1 className="">Mis favoritos ♥</h1>
      <ul className="">
        { typeof favoritos !== 'string'  && favoritos.length > 0 
          ? favoritos.map((favorito) => ( <div key={favorito.id}>
              <li >{favorito.title} ♥</li>
              <button name={favorito.id} onClick={(e) => eliminarFav(e)}> Eliminar </button> </div>
            ))
          : <li className="" >No hay favoritos</li>}
      </ul>

    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    favoritos: state.misFavoritos,
  };
};

export default connect(mapStateToProps, { getListFavorites, deleteListFavorites })(ListFavorites);
