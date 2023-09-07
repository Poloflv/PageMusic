import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ContainerAuth from "../components/layout/ContainerAuth";
import { axiosMusic } from "../config/axios.config";

const Register = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);

    axiosMusic.post("/api/auth/register", data)
    .then(({data}) => {
      alert("Usuario creado correctamente ahora realiza el login para ingresar")
      navigate("/auth/login")
    })
    .catch((err) => console.log(err))
  };
  return (
    <ContainerAuth>
      <header className="hidden sm:block sm:max-w-[350px]">
        <img className="rounded-2xl" src="/images/register-header.png" alt="" />
      </header>
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 w-[min(100%,_350px)] sm:w-[300px]"
      >
        <h2 className="uppercase font-semibold text-4xl">Cuenta nueva</h2>
        <div className="grid gap-4">
          <label className="text-white/50 " htmlFor="email">
            Correo
          </label>
          <input
            className="bg-transparent outline-none border-b border-yellow-border p-1"
            type="email"
            id="email"
            name="email"
          />
        </div>

        <div className="grid gap-4">
          <label className="text-white/50 " htmlFor="name">
            Nombre de usuario
          </label>
          <input
            className="bg-transparent outline-none border-b border-yellow-border p-1"
            type="text"
            id="name"
            name="name"
          />
        </div>

        <div className="grid gap-4">
          <label className="text-white/50 " htmlFor="password">
            Contraseña
          </label>
          <input
            className="bg-transparent outline-none border-b border-yellow-border p-1"
            id="password"
            type="password"
            name="password"
          />
        </div>

        <button className="bg-purple-light uppercase font-semibold max-w-max mx-auto px-6 py-1 rounded-full">
          Crear
        </button>

        <Link className="text-center  underline" to="/auth/login">
          O iniciar sesion
        </Link>
      </form>
    </ContainerAuth>
  );
};

export default Register;
