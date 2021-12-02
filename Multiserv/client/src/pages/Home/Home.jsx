/** @jsxImportSource @emotion/react */
import { AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  BsSortAlphaDownAlt,
  BsSortAlphaUpAlt,
  BsSortDown,
  BsSortDownAlt,
} from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
/* React redux */
import { useSelector, useDispatch } from "react-redux";
import {
  buscar,
  orderAlph,
  orderRating,
  services,
  filterCats,
  getCats,
  users,
  usuarioId,
  mapServices,
} from "../../redux/actions/actions";
import ServiceCard from "../../Components/Molecules/ServiceCard/ServiceCard";
import { useNavigate } from "react-router";
import Input from "../../Components/Atoms/Input/Input";
import ListBox from "../../Components/HeadLess/ListBox/ListBox";
import { Link } from "react-router-dom";
import Footer from "../../Components/Organisms/Footer/Footer";

const Home = () => {
  const loading = useSelector((state) => state.loadingServices);
  const [expandedFilter, setExpandedFilter] = useState(false)
  const [notOverflow, setNotOverflow] = useState(false)
  const servicios = useSelector((state) => state.servicios);
  const usuarios = useSelector((state) => state.usuarios);
  const categorias = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const [buscador, setBuscador] = useState("");
  const [order, setOrder] = useState(null);
  const [filter, setFilter] = useState(null);
  const dispatch = useDispatch();

  let datosSesionFromLocalStorage = JSON.parse(
    localStorage.getItem("datoSesion")
  );
  const handleBuscador = (texto) => {
    setBuscador(texto);
  };

  useEffect(() => {
    if (datosSesionFromLocalStorage) {
      dispatch(usuarioId(datosSesionFromLocalStorage.uid));
    }
  }, []);

  useEffect(() => {
    document.title = "Explorar servicios";
    if (
      datosSesionFromLocalStorage != null &&
      !datosSesionFromLocalStorage.emailVerified
    ) {
      navigate("/email-verification");
    }
    dispatch(services());
    dispatch(users());
    dispatch(mapServices());
  }, []);

  useEffect(() => {
    dispatch(getCats());
  }, [loading]);

  useEffect(() => {
    if (filter !== null) {
      if (filter.value === "none") {
        dispatch(services());
      } else {
        dispatch(filterCats(filter.name));
      }
    }
  }, [filter]);

  useEffect(() => {
    buscador.length > 0 ? dispatch(buscar(buscador)) : dispatch(services());
  }, [buscador]);

  const handleListValue2 = (obj) => {
    setFilter(obj);
  };

  // si necesitan datos de la sesión se encuentran en la variable datosSesionFromLocalStorage

  const handleListValue = (obj) => {
    setOrder(obj);
    if (obj.type === "none") {
      dispatch(services());
    }
    if (obj.type === "alph") {
      console.log("Se despacho la accion de tipo:", obj.type);
      dispatch(orderAlph(obj.value));
    }
    if (obj.type === "rat") {
      console.log("Se despacho la accion de tipo:", obj.type);
      dispatch(orderRating(obj.value));
    }
  };
  const options = [
    {
      name: "Sin ordenar",
      type: "none",
      value: "none",
      icon: <AiFillStar className="text-xl" />,
    },
    {
      name: "Alfabético (ascendente)",
      type: "alph",
      value: "asc",
      icon: <BsSortAlphaUpAlt className="text-xl" />,
    },
    {
      name: "Alfabético (descendente)",
      type: "alph",
      value: "desc",
      icon: <BsSortAlphaDownAlt className="text-xl" />,
    },
    {
      name: "Por calificación (menor a mayor)",
      type: "rat",
      value: "asc",
      icon: <BsSortDownAlt className="text-xl" />,
    },
    {
      name: "Por calificación (mayor a menor)",
      type: "rat",
      value: "desc",
      icon: <BsSortDown className="text-xl" />,
    },
  ];
  const optionsFilter = [
    {
      name: "Sin filtrar",
      value: "none",
    },
    ...categorias,
  ];
  return (
    <div className=" w-screen h-screen">
      {loading ? (
        <div className="w-full flex flex-col h-screen justify-center items-center">
          <AiOutlineLoading3Quarters
            className={`text-5xl text-indigo-900 animate-spin`}
          />
          <h1 className="text-xl font-semibold text-gray-800 mt-2">
            Buscando servicios disponibles en tu zona...
          </h1>
        </div>
      ) : (
          <div className="flex flex-col justify-center items-center h-screen overflow-y-auto">
          <div
              css={{
                zIndex: 500,
                '@media (max-width: 640px)': {
                  height: `${expandedFilter ? '40rem' : '4rem'}`,
                  overflow: `${expandedFilter ? 'visible' : 'hidden'}`,
                },
                '@media (max-width: 768px)': {
                  height: `${expandedFilter ? '26rem' : '4rem'}`,
                  overflow: `${expandedFilter ? 'visible' : 'hidden'}`,
                }
              }}
              id="fiterBar"
              className={`w-full flex flex-col lg:flex-row lg:justify-center items-center filter drop-shadow-md bg-white pb-4 lg:pb-0 transition-all ease-in-out duration-150`}
            >
              <div className="flex flex-row w-full justify-between lg:hidden px-4 py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-800 self-center">Filtrar servicios:</span>
                <button
                  onClick={() => { setExpandedFilter((expanded) => !expanded) }}
                  className="p-2 self-center">
                  {expandedFilter ? <GrClose className="text-xl" /> : <GiHamburgerMenu className="text-xl" />}
                </button>
              </div>
              <div className="w-full">
                <Input
                  flexed
                  theme="#0C4A6E"
                  label="Buscar por nombre"
                  placeholder="Buscar..."
                  type="text"
                  id="buscar"
                  callBack={handleBuscador}
                />
              </div>
              <div className="px-4 lg:px-2 lg:p-0 lg:self-center flex flex-col w-full">
                <span className="text-gray-600 lg:p-0 text-sm font-medium">
                Ordenar por:{" "}
              </span>
              <ListBox
                  width="100%"
                  customBorder="#9CA3AF"
                  className="border-gray-400 w-full lg:w-56"
                options={options}
                callBack={handleListValue}
                text="Selecciona una opción..."
                theme="#0C4A6E"
                />
              </div>
              <div className="px-4 lg:px-2 lg:p-0 lg:pl-4 lg:self-center flex flex-col w-full">
                <span className="text-gray-600 lg:pl-0 text-sm font-medium">
                Filtrar por:{" "}
              </span>
              <ListBox
                  customBorder="#9CA3AF"
                  width="100%"
                  className="border-gray-400 w-full lg:w-56"
                options={optionsFilter}
                callBack={handleListValue2}
                text="Selecciona una opción..."
                theme="#0C4A6E"
              />
            </div>
          </div>
            {/* flex-row aqui, l-235 */}
          <div
            style={{ scrollBehavior: "smooth" }}
              className="justify-center items-center flex flex-row  flex-wrap h-full overflow-y-auto"
          >
            {servicios.map((service, index) =>
              service.estadoDePago === "Aprobado" ? (
                <Link key={index} to={`/home/detalleServicio/${service.id}`}>
                  <ServiceCard key={index} service={service} />
                </Link>
              ) : (
                ""
              )
            )}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Home;
