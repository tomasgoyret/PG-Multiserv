import React, { useEffect, useState } from "react";
import Imagen from "../../../src/assets/images/img1.webp";
import { FaUser, FaUserTie } from "react-icons/fa";
import { MdHomeRepairService, MdCategory } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import ImagenPerfil from "../../assets/Icons/profile.png";
import {
  users,
  services,
  getCats,
  buscarClientes,
  buscarProvedores,
  buscarServicios,
  buscarCategorias,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ControlPanel = () => {
  const [vistaUsuarios, setVistaUsuarios] = useState("clientes");
  const {
    usuarios,
    servicios,
    categories,
    clientesBuscados,
    provedoresBuscados,
    serviciosBuscados,
    categoriasBuscadas,
    detalleUsuario,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [clientSearchValue, setClientSearchValue] = useState("");
  const [providerSearchValue, setProviderSearchValue] = useState("");
  const [serviceSearchValue, setServiceSearchValue] = useState("");
  const [categoriSearchValue, setCategoriSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChangeBuscadorClientes = (e) => {
    setClientSearchValue(e.target.value);
    dispatch(buscarClientes(e.target.value));
    dispatch(users());
  };

  const handleChangeBuscadorProvedores = (e) => {
    setProviderSearchValue(e.target.value);
    dispatch(buscarProvedores(e.target.value));
    dispatch(users());
  };

  const handleChangeBuscadorServicios = (e) => {
    setServiceSearchValue(e.target.value);
    dispatch(buscarServicios(e.target.value));
    dispatch(services());
  };

  const handleChangeBuscadorCategorias = (e) => {
    setCategoriSearchValue(e.target.value);
    dispatch(buscarCategorias(e.target.value));
    dispatch(getCats());
  };

  const cambiarAProvedor = () => {
    setVistaUsuarios("provedores");
  };

  const cambiarAClientes = () => {
    setVistaUsuarios("clientes");
  };

  const cambiarACategorias = () => {
    setVistaUsuarios("categorias");
  };

  const cambiarAServicios = () => {
    setVistaUsuarios("servicios");
  };

  // Eliminar usuario
  const eliminarUsuarioClient = (uid) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Al hacer esto perderás todo en tu usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32C1CD",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar usuario!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        axios(`eliminar-usuario/${uid}`)
          .then(async (response) => {
            Swal.fire(
              "¡Eliminado!",
              "El usuario se ha eliminado con éxito!",
              "success"
            );
            dispatch(users());
          })
          .catch((err) => {
            Swal.fire("Changes are not saved", "", "info");
          });
        setClientSearchValue("");
      }
    });
  };

  const eliminarUsuarioProvider = (uid) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Al hacer esto perderás todo en tu usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32C1CD",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar usuario!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        axios(`eliminar-usuario/${uid}`)
          .then(async (response) => {
            Swal.fire(
              "¡Eliminado!",
              "El usuario se ha eliminado con éxito!",
              "success"
            );
            dispatch(users());
          })
          .catch((err) => {
            Swal.fire("Changes are not saved", "", "info");
          });
        setProviderSearchValue("");
      }
    });
  };

  // cambiar admin
  const adminTrueClient = (user) => {
    const { uidClient } = user;
    const { displayName, photoURL, phone } = user;
    const [name, lastName] = displayName.trim().split(" ");
    axios
      .put(`editar-usuario/${uidClient}`, {
        name: name,
        lastName: lastName,
        photoURL: photoURL,
        phone: phone,
        isAdmin: true,
      })
      .then((response) => {
        console.log(response);
        // setLoading(false)
        Swal.fire(
          "¡Actualizado!",
          `Ahora ${response.data.usuarioActualizado.displayName} es administrador!`,
          "success"
        );
        dispatch(users());
        setClientSearchValue("");
      })
      .catch((err) => console.log(err));
  };

  const adminTrueProvider = (user) => {
    const { uidClient } = user;
    const { displayName, photoURL, phone } = user;
    const [name, lastName] = displayName.trim().split(" ");
    axios
      .put(`editar-usuario/${uidClient}`, {
        name: name,
        lastName: lastName,
        photoURL: photoURL,
        phone: phone,
        isAdmin: true,
      })
      .then((response) => {
        console.log(response);
        // setLoading(false)
        Swal.fire(
          "¡Actualizado!",
          `Ahora ${response.data.usuarioActualizado.displayName} es administrador!`,
          "success"
        );
        dispatch(users());
        setProviderSearchValue("");
      })
      .catch((err) => console.log(err));
  };

  const adminFalseClient = (user) => {
    const { uidClient } = user;
    const { displayName, photoURL, phone } = user;
    const [name, lastName] = displayName.trim().split(" ");
    axios
      .put(`editar-usuario/${uidClient}`, {
        name: name,
        lastName: lastName,
        photoURL: photoURL,
        phone: phone,
        isAdmin: false,
      })
      .then((response) => {
        console.log(response);
        // setLoading(false)
        Swal.fire("¡Actualizado!", `¡Permisos revocados!`, "success");
        dispatch(users());
        setClientSearchValue("");
      })
      .catch((err) => console.log(err));
  };

  const adminFalseProvider = (user) => {
    const { uidClient } = user;
    const { displayName, photoURL, phone } = user;
    const [name, lastName] = displayName.trim().split(" ");
    axios
      .put(`editar-usuario/${uidClient}`, {
        name: name,
        lastName: lastName,
        photoURL: photoURL,
        phone: phone,
        isAdmin: false,
      })
      .then((response) => {
        console.log(response);
        // setLoading(false)
        Swal.fire("¡Actualizado!", `Permisos revocados!`, "success");
        dispatch(users());
        setProviderSearchValue("");
      })
      .catch((err) => console.log(err));
  };

  const editarNombreCategorias = (id) => {
    Swal.fire({
      title: "¿Cual es el nuevo nombre?",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Modificar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .put("edit-categorias", {
            id,
            newTitle: result.value,
          })
          .then((response) => {
            Swal.fire(
              "Modificado!",
              "¡Nombre de categoría cambiado con éxito!",
              "success"
            );
            dispatch(getCats());
            setCategoriSearchValue("");
          });
      }
    });
  };

  const eliminarCategoria = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Al hacer esto perderás esta categoría y todos los servicios asociados a ella pasarán a Sin definir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32C1CD",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar categoría!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        axios
          .delete(`categorias/${id}`)
          .then((response) => {
            Swal.fire(
              "¡Eliminado!",
              "¡La categoría se ha eliminado con éxito!",
              "success"
            );
            dispatch(getCats());
          })
          .catch((err) => {
            Swal.fire("Ha ocurrido un error", "", "info");
          });
        setCategoriSearchValue("");
      }
    });
  };

  const eliminarServicio = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Al hacer esto perderás este servicio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32C1CD",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar servicio!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        axios
          .delete(`delete-service/${id}`)
          .then((response) => {
            Swal.fire(
              "¡Eliminado!",
              "El servicio se ha eliminado con éxito!",
              "success"
            );
            dispatch(services());
          })
          .catch((err) => {
            Swal.fire("Ha ocurrido un error", "", "info");
          });
        setServiceSearchValue("");
      }
    });
  };

  const mostrarDescripcion = (service) => {
    console.log(service);
    Swal.fire({
      title: "Descripción",
      text: service.description,
      imageUrl: service.photos[0],
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  };

  const agregarCategoria = () => {
    Swal.fire({
      title: "¿Cuál es el nombre de la nueva categoría?",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .post("categorias", {
            title: result.value,
          })
          .then((response) => {
            Swal.fire(
              "Categoría Agregada",
              "¡La categoría se ha agregado con éxito!",
              "success"
            );
            dispatch(getCats());
          });
        setCategoriSearchValue("");
      }
    });
  };

  useEffect(() => {
    // if (detalleUsuario.isAdmin) {
    //   navigate("/home");
    // }
    dispatch(users());
    dispatch(services());
    dispatch(getCats());
  }, [clientSearchValue]);

  return (
    <div className="w-full flex">
      <div className="w-1/5 h-screen bg-gray-100 ">
        <div className="w-full flex justify-center py-2 ">
          <h2 className="text-xl font-semibold">MultiServ</h2>
        </div>
        {/* Inicio seccion administrar usuarios */}
        <div className="w-full flex justify-start px-2 mt-5">
          <h2 className="text-md font-semibold ">Administrar usuarios</h2>
        </div>
        <div className="w-full flex flex-col items-start   mt-2">
          <button
            className="w-full flex items-center justify-start py-2 my-1 hover:bg-gray-300 focus:bg-gray-500 focus:text-gray-50 px-4"
            onClick={cambiarAClientes}
          >
            <FaUser width="30px" height="30px" className="mr-2" />
            <span>Clientes</span>
          </button>
          <button
            className="w-full flex items-center justify-start py-2 my-1 hover:bg-gray-300 focus:bg-gray-500 focus:text-gray-50  px-4"
            onClick={cambiarAProvedor}
          >
            <FaUserTie width="30px" height="30px" className="mr-2" />
            <span className="focus:text-gray-50">Proveedores</span>
          </button>
        </div>
        {/* Fin seccion administrar usuarios */}

        {/* Inicio seccion administrar servicios */}
        <div className="w-full flex justify-start px-2 mt-5">
          <h2 className="text-md font-semibold ">Administrar servicios</h2>
        </div>
        <div className="w-full flex flex-col items-start   mt-2">
          <button
            className="w-full flex items-center justify-start py-2 my-1 hover:bg-gray-300 focus:bg-gray-500 focus:text-gray-50 px-4"
            onClick={cambiarAServicios}
          >
            <MdHomeRepairService width="30px" height="30px" className="mr-2" />
            <span>Servicios</span>
          </button>
        </div>
        {/* Fin seccion administrar servicios */}

        {/* Inicio seccion administrar categorias */}
        <div className="w-full flex justify-start px-2 mt-5">
          <h2 className="text-md font-semibold ">Administrar categorías</h2>
        </div>
        <div className="w-full flex flex-col items-start   mt-2">
          <button
            className="w-full flex items-center justify-start py-2 my-1 hover:bg-gray-300 focus:bg-gray-500 focus:text-gray-50 px-4"
            onClick={cambiarACategorias}
          >
            <MdCategory width="30px" height="30px" className="mr-2" />
            <span>Categorías</span>
          </button>
        </div>
        {/* Fin seccion administrar categorias */}
        {/* Inicio seccion administrar newsletter */}
        <div className="w-full flex justify-start px-2 mt-5">
          <h2 className="text-md font-semibold ">Administrar newsletter</h2>
        </div>
        <div className="w-full flex flex-col items-start   mt-2">
          <button
            className="w-full flex items-center justify-start py-2 my-1 hover:bg-gray-300 focus:bg-gray-500 focus:text-gray-50 px-4"
            onClick={cambiarACategorias}
          >
            <MdCategory width="30px" height="30px" className="mr-2" />
            <span>Newsletter</span>
          </button>
        </div>
        {/* Fin seccion administrar newsletter */}
      </div>

      

      <div className="w-4/5 overflow-y-auto h-screen">
        {
          // Inicio de vista de clientes
          vistaUsuarios === "clientes" && (
            <div className="w-full flex flex-col border-2">
              <div className="w-full h-20 fixed">
                {/* Inicio de Buscador */}
                <div className="flex flex-row w-full py-1 filter drop-shadow-md bg-white">
                  <div className="w-1/2 my-2 px-4 flex items-center">
                    <input
                      className="border border-gray-400 p-2 rounded-md font-medium w-1/2"
                      type="text"
                      id="lastName"
                      onChange={handleChangeBuscadorClientes}
                      name="lastName"
                      value={clientSearchValue}
                      placeholder="Busca por nombre de proveedor"
                    />
                  </div>
                  <div className="flex w-96 ml-4 justify-end items-center pr-2">
                      <button 
                          onClick={() => navigate("/home")} 
                          className="flex  text-gray-700 text-3xl font-semibold items-end ml-3 pr-2"  
                      ><AiFillHome size='32' color='gray-700' /></button>
                  </div>
                </div>

                {/* Fin Buscador */}
              </div>

              {/* Inicio contenedor separado del buscador */}
              <div className="mt-20 w-full">
                {clientSearchValue.length > 0
                  ? clientesBuscados?.map((cliente) => (
                      <div className="w-full flex border-2 items-center py-2 px-2 my-2">
                        <div
                          className="h-20 w-24 rounded-full mr-4"
                          style={{
                            backgroundImage: `url(${cliente.photoURL})`,
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <div className="flex flex-col w-1/2">
                          <h2 className="text-1xl font-bold font-sans">
                            {cliente.displayName}(Cliente)
                          </h2>
                          <span className="text-gray-500 text-sm -mt-1">
                            {cliente.email}
                          </span>
                          <span className="text-gray-800 font-sans font-semibold text-sm ">
                            ID: {cliente.uidClient}
                          </span>
                        </div>
                        <div className="flex w-1/2 justify-between">
                          <div className="flex flex-col w-20 justify-center items-center">
                            <div className="flex items-center">
                              <div
                                className={`w-4 h-4 rounded-full mr-2 ${
                                  cliente.isAdmin
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                                }`}
                              ></div>
                              <h2 className="font-semibold text-lg">
                                Administrador
                              </h2>
                            </div>
                            <span className="text-sm">
                              {cliente.isAdmin ? "Activo" : "No Activo"}
                            </span>
                          </div>
                          <div className="flex w-80 items-center">
                            {cliente.isAdmin ? (
                              <button
                                className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                onClick={() => adminFalseClient({ ...cliente })}
                              >
                                Quitar admin
                              </button>
                            ) : (
                              <button
                                className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                onClick={() => adminTrueClient({ ...cliente })}
                              >
                                Volver admin
                              </button>
                            )}
                            <button
                              className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                              onClick={() =>
                                eliminarUsuarioClient(cliente.uidClient)
                              }
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  : clientSearchValue.length === 0 &&
                    usuarios?.map((cliente) => (
                      <div className="w-full flex border-2 items-center py-2 px-2 my-2">
                        <div
                          className="h-20 w-24 rounded-full mr-4"
                          style={{
                            backgroundImage: `url(${cliente.photoURL})`,
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <div className="flex flex-col w-1/2">
                          <h2 className="text-1xl font-bold font-sans">
                            {cliente.displayName}(Cliente)
                          </h2>
                          <span className="text-gray-500 text-sm -mt-1">
                            {cliente.email}
                          </span>
                          <span className="text-gray-800 font-sans font-semibold text-sm ">
                            ID: {cliente.uidClient}
                          </span>
                        </div>
                        <div className="flex w-1/2 justify-between">
                          <div className="flex flex-col w-20 justify-center items-center">
                            <div className="flex items-center">
                              <div
                                className={`w-4 h-4 rounded-full mr-2 ${
                                  cliente.isAdmin
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                                }`}
                              ></div>
                              <h2 className="font-semibold text-lg">
                                Administrador
                              </h2>
                            </div>
                            <span className="text-sm">
                              {cliente.isAdmin ? "Activo" : "No Activo"}
                            </span>
                          </div>
                          <div className="flex w-80 items-center">
                            {cliente.isAdmin ? (
                              <button
                                className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                onClick={() => {
                                  adminFalseClient({ ...cliente });
                                }}
                              >
                                Quitar admin
                              </button>
                            ) : (
                              <button
                                className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                onClick={() => adminTrueClient({ ...cliente })}
                              >
                                Volver admin
                              </button>
                            )}
                            <button
                              className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                              onClick={() =>
                                eliminarUsuarioClient(cliente.uidClient)
                              }
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                {/* Fin contenedor separado del buscador */}
              </div>
            </div>
          )

          // Fin de vista de clientes
        }

        {
          // Inicio de vista de Provedores
          vistaUsuarios === "provedores" && (
            <div className="w-full flex flex-col border-2">
              <div className="w-full h-20 fixed">
                {/* Inicio de Buscador */}
                <div className="flex flex-row w-full py-1 filter drop-shadow-md bg-white">
                  <div className="w-1/2 my-2 px-4 flex items-center">
                    <input
                      className="border border-gray-400 p-2 rounded-md font-medium w-1/2"
                      type="text"
                      id="lastName"
                      onChange={handleChangeBuscadorProvedores}
                      value={providerSearchValue}
                      name="lastName"
                      placeholder="Busca por nombre de proveedor"
                    />
                  </div>
                  <div className="flex w-96 ml-4 justify-end items-center pr-2">
                      <button 
                          onClick={() => navigate("/home")} 
                          className="flex  text-gray-700 text-3xl font-semibold items-end ml-3 pr-2"  
                      ><AiFillHome size='32' color='gray-700' /></button>
                  </div>
                </div>

                {/* Fin Buscador */}
              </div>

              {/* Inicio contenedor separado del buscador */}
              <div className="mt-20 w-full">
                {providerSearchValue.length > 0
                  ? provedoresBuscados?.map((provider) => {
                      if (provider.provider) {
                        return (
                          <div className="w-full flex border-2 items-center py-2 px-2 my-2">
                            <div
                              className="h-20 w-24 rounded-full mr-4"
                              style={{
                                backgroundImage: `url(${provider.photoURL})`,
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <div className="flex flex-col w-1/2">
                              <h2 className="text-1xl font-bold font-sans">
                                {provider.displayName}(Proveedor)
                              </h2>
                              <span className="text-gray-500 text-sm -mt-1">
                                {provider.email}
                              </span>
                              <span className="text-gray-800 font-sans font-semibold text-sm ">
                                ID: {provider.uidClient}
                              </span>
                            </div>
                            <div className="flex w-1/2 justify-between">
                              <div className="flex flex-col w-20 justify-center items-center">
                                <div className="flex items-center">
                                  <div
                                    className={`w-4 h-4 rounded-full mr-2 ${
                                      provider.isAdmin
                                        ? "bg-green-500"
                                        : "bg-gray-500"
                                    }`}
                                  ></div>
                                  <h2 className="font-semibold text-lg">
                                    Administrador
                                  </h2>
                                </div>
                                <span className="text-sm">
                                  {provider.isAdmin ? "Activo" : "No Activo"}
                                </span>
                              </div>
                              <div className="flex w-80 items-center">
                                {provider.isAdmin ? (
                                  <button
                                    className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                    onClick={() =>
                                      adminFalseProvider({ ...provider })
                                    }
                                  >
                                    Quitar admin
                                  </button>
                                ) : (
                                  <button
                                    className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                    onClick={() =>
                                      adminTrueProvider({ ...provider })
                                    }
                                  >
                                    Volver admin
                                  </button>
                                )}
                                <button
                                  className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                                  onClick={() =>
                                    eliminarUsuarioProvider(provider.uidClient)
                                  }
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                  : providerSearchValue.length === 0 &&
                    usuarios?.map((provider) => {
                      if (provider.provider) {
                        return (
                          <div className="w-full flex border-2 items-center py-2 px-2 my-2">
                            <div
                              className="h-20 w-24 rounded-full mr-4"
                              style={{
                                backgroundImage: `url(${provider.photoURL})`,
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <div className="flex flex-col w-1/2">
                              <h2 className="text-1xl font-bold font-sans">
                                {provider.displayName}(Proveedor)
                              </h2>
                              <span className="text-gray-500 text-sm -mt-1">
                                {provider.email}
                              </span>
                              <span className="text-gray-800 font-sans font-semibold text-sm ">
                                ID: {provider.uidClient}
                              </span>
                            </div>
                            <div className="flex w-1/2 justify-between">
                              <div className="flex flex-col w-20 justify-center items-center">
                                <div className="flex items-center">
                                  <div
                                    className={`w-4 h-4 rounded-full mr-2 ${
                                      provider.isAdmin
                                        ? "bg-green-500"
                                        : "bg-gray-500"
                                    }`}
                                  ></div>
                                  <h2 className="font-semibold text-lg">
                                    Administrador
                                  </h2>
                                </div>
                                <span className="text-sm">
                                  {provider.isAdmin ? "Activo" : "No Activo"}
                                </span>
                              </div>
                              <div className="flex w-80 items-center">
                                {provider.isAdmin ? (
                                  <button
                                    className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                    onClick={() =>
                                      adminFalseProvider({ ...provider })
                                    }
                                  >
                                    Quitar admin
                                  </button>
                                ) : (
                                  <button
                                    className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                    onClick={() =>
                                      adminTrueProvider({ ...provider })
                                    }
                                  >
                                    Volver admin
                                  </button>
                                )}
                                <button
                                  className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                                  onClick={() =>
                                    eliminarUsuarioProvider(provider.uidClient)
                                  }
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                {/* Fin contenedor separado del buscador */}
              </div>
            </div>
          )

          // Fin de vista de provedores
        }

        {
          // Inicio de vista de Categorias
          vistaUsuarios === "categorias" && (
            <div className="w-full flex flex-col border-2">
              <div className="w-full h-20 fixed">
                {/* Inicio de Buscador */}
                <div className="flex flex-row w-full py-1 filter drop-shadow-md bg-white">
                  <div className="w-1/2 my-2 px-4 flex items-center">
                    <input
                      className="border border-gray-400 p-2 rounded-md font-medium w-1/2"
                      type="text"
                      id="lastName"
                      onChange={handleChangeBuscadorCategorias}
                      value={categoriSearchValue}
                      name="lastName"
                      placeholder="Busca por nombre de categoría"
                    />
                  </div>
                  <div className="flex w-96 ml-4 justify-end items-center pr-2">
                      <button 
                          onClick={() => navigate("/home")} 
                          className="flex  text-gray-700 text-3xl font-semibold items-end ml-3 pr-2"  
                      ><AiFillHome size='32' color='gray-700' /></button>
                  </div>
                </div>
                {/* Fin Buscador */}
              </div>
              {/* Inicio contenedor separado del buscador */}
              <div className="mt-20 w-full">
                {categoriSearchValue.length > 0
                  ? categoriasBuscadas?.map((categoria) => (
                      <div className="w-full flex border-2 items-center py-4 px-4 my-2">
                        <div className="flex flex-col w-4/5">
                          <h2 className="text-2xl font-semibold font-sans">
                            {categoria.name}
                          </h2>
                          <span className="text-gray-800 font-sans font-semibold text-sm ">
                            ID: {categoria.id}
                          </span>
                        </div>
                        <div className="flex w-1/5 justify-end">
                          <div className="flex w-80 items-center">
                            <button
                              className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                              onClick={() =>
                                editarNombreCategorias(categoria.id)
                              }
                            >
                              Editar
                            </button>
                            <button
                              className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                              onClick={() => eliminarCategoria(categoria.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  : categoriSearchValue.length === 0 &&
                    categories?.map((categoria) => (
                      <div className="w-full flex border-2 items-center py-4 px-4 my-2">
                        <div className="flex flex-col w-4/5">
                          <h2 className="text-2xl font-semibold font-sans">
                            {categoria.name}
                          </h2>
                          <span className="text-gray-800 font-sans font-semibold text-sm ">
                            ID: {categoria.id}
                          </span>
                        </div>
                        <div className="flex w-1/5 justify-end">
                          <div className="flex w-80 items-center">
                            <button
                              className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                              onClick={() =>
                                editarNombreCategorias(categoria.id)
                              }
                            >
                              Editar
                            </button>
                            <button
                              className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                              onClick={() => eliminarCategoria(categoria.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                        <div
                          className="flex items-end justify-center w-20 h-20 pb-1 fixed button-0 bg-green-500 hover:bg-green-700 right-4 bottom-4  rounded-full text-8xl text-gray-50 cursor-pointer"
                          onClick={() => agregarCategoria()}
                        >
                          +
                        </div>
                      </div>
                    ))}
                {/* Fin contenedor separado del buscador */}
              </div>
            </div>
          )

          // Fin de vista de Categorias
        }

        {
          // Inicio de vista de Servicios
          vistaUsuarios === "servicios" && (
            <div className="w-full flex flex-col border-2">
              <div className="w-full h-20 fixed">
                {/* Inicio de Buscador */}
                <div className="flex flex-row w-full py-1 filter drop-shadow-md bg-white">
                  <div className="w-1/2 my-2 px-4 flex items-center">
                    <input
                      className="border border-gray-400 p-2 rounded-md font-medium w-1/2"
                      type="text"
                      id="lastName"
                      onChange={handleChangeBuscadorServicios}
                      value={serviceSearchValue}
                      name="lastName"
                      placeholder="Busca por nombre de servicio"
                    />
                  </div>
                  <div className="flex w-96 ml-4 justify-end items-center pr-2">
                    <button 
                        onClick={() => navigate("/home")} 
                        className="flex  text-gray-700 text-3xl font-semibold items-end ml-3 pr-2"  
                    ><AiFillHome size='32' color='gray-700' /></button>
                  </div>
                </div>
                {/* Fin Buscador */}
              </div>
              {/* Inicio contenedor separado del buscador */}
              <div className="mt-20 w-full">
                {serviceSearchValue.length > 0
                  ? serviciosBuscados?.map((servicio) => (
                      <div className="w-full flex border-2 items-center py-4 px-4 my-2">
                        <div className="flex flex-col w-1/2">
                          <h2 className="text-2xl font-semibold font-sans">
                            {servicio.title}
                          </h2>
                          <span className="text-gray-700 font-sans font-semibold text-sm ">{`Precio: ${servicio.min} - ${servicio.max} (${servicio.currency})`}</span>
                          <span className="text-gray-700 font-sans font-semibold text-sm ">
                            ID: {servicio.id}
                          </span>
                        </div>
                        <div className="flex w-1/2 justify-between">
                          <div className="flex flex-col w-20 justify-center items-center">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                              <h2 className="font-semibold text-lg">Estado</h2>
                            </div>
                            <span className="text-sm">Activo</span>
                          </div>
                          <div className="flex w-80 items-center">
                            <button
                              className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                              onClick={() => mostrarDescripcion(servicio)}
                            >
                              Ver descripción
                            </button>
                            <button
                              className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                              onClick={() => eliminarServicio(servicio.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  : serviceSearchValue.length === 0 &&
                    servicios?.map((servicio) => (
                      <div className="w-full flex border-2 items-center py-4 px-4 my-2">
                        <div className="flex flex-col w-1/2">
                          <h2 className="text-2xl font-semibold font-sans">
                            {servicio.title}
                          </h2>
                          <span className="text-gray-700 font-sans font-semibold text-sm ">{`Precio: ${servicio.min} - ${servicio.max} (${servicio.currency})`}</span>
                          <span className="text-gray-700 font-sans font-semibold text-sm ">
                            ID: {servicio.id}
                          </span>
                        </div>
                        <div className="flex w-1/2 justify-between">
                          <div className="flex flex-col w-20 justify-center items-center">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                              <h2 className="font-semibold text-lg">Estado</h2>
                            </div>
                            <span className="text-sm">Activo</span>
                          </div>
                          <div className="flex w-80 items-center">
                            <button
                              className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                              onClick={() => mostrarDescripcion(servicio)}
                            >
                              Ver descripción
                            </button>
                            <button
                              className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                              onClick={() => eliminarServicio(servicio.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                {/* Fin contenedor separado del buscador */}
              </div>
            </div>
          )
          // Fin de vista de Servicios
        }
      </div>
    </div>
  );
};

export default ControlPanel;
