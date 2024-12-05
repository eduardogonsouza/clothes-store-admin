"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

type Inputs = {
  name: string;
};

function NovaMarca() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/brands`,
        data,
        {
          headers: {
            "Content-type": "application/json",
            authtoken: `${Cookies.get("admin_logado_token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Marca cadastrada com sucesso");
        reset();
        router.push("/principal/marcas");
      } else {
        toast.error("Erro no cadastro da Marca");
      }
    } catch {
      toast.error("Erro na requisição");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="mb-6 mt-24 text-4xl font-extrabold text-gray-900 text-center">
        Inclusão de Marca
      </h1>

      <form
        className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300"
          >
            Nome da Marca
          </label>
          <input
            type="text"
            id="name"
            className={`w-full p-4 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            placeholder="Ex: Nike"
            {...register("name", { required: "Campo obrigatório" })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.name.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors ${
            isLoading ? "bg-blue-400 cursor-not-allowed" : ""
          } flex items-center justify-center`}
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </>
  );
}

export default NovaMarca;
