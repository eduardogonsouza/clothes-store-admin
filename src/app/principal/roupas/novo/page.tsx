"use client";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { ClothingBrandI } from "@/utils/types/clothingBrand";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  clothingBrandId: number;
  size: string;
  price: number;
  photo: string;
  description: string;
  isHighlight: boolean;
};

function NovaRoupa() {
  const router = useRouter();
  const [brands, setBrands] = useState<ClothingBrandI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/brands`
        );
        const dados = await response.json();
        setBrands(dados);
      } catch {
        toast.error("Erro ao carregar as marcas!");
      }
    }
    fetchBrands();
    setFocus("name");
  }, [setFocus]);

  const optionsBrands = brands.map((brand) => (
    <option key={brand.id} value={brand.id}>
      {brand.name}
    </option>
  ));

  async function addClothing(data: Inputs) {
    setIsLoading(true);
    const novaRoupa: Inputs = {
      ...data,
      clothingBrandId: Number(data.clothingBrandId),
      price: Number(data.price),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clothes`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authtoken: `${Cookies.get("admin_logado_token")}`,
          },
          body: JSON.stringify(novaRoupa),
        }
      );

      if (response.status === 201) {
        toast.success("Roupa cadastrada com sucesso");
        reset();
        router.push("/principal/roupas");
      } else {
        toast.error("Erro no cadastro da roupa");
      }
    } catch {
      toast.error("Erro na requisição");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1 className="mb-6 mt-24 text-4xl font-extrabold text-gray-900 text-center">
        Inclusão de Roupas
      </h1>

      <form
        className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col justify-center"
        onSubmit={handleSubmit(addClothing)}
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300"
          >
            Nome da Roupa
          </label>
          <input
            type="text"
            id="name"
            className={`w-full p-4 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            placeholder="Ex: Camisa Polo"
            {...register("name", { required: "Campo obrigatório" })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="clothingBrandId"
              className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Marca
            </label>
            <select
              id="clothingBrandId"
              className={`w-full p-4 border ${
                errors.clothingBrandId ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              {...register("clothingBrandId", {
                required: "Selecione uma Marca",
              })}
            >
              <option value="">Selecione uma Marca</option>
              {optionsBrands}
            </select>
            {errors.clothingBrandId && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.clothingBrandId.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="size"
              className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Tamanho
            </label>
            <input
              type="text"
              id="size"
              className={`w-full p-4 border ${
                errors.size ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              placeholder="Ex: M, G, GG"
              {...register("size", { required: "Campo obrigatório" })}
            />
            {errors.size && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.size.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Preço (R$)
            </label>
            <input
              type="number"
              id="price"
              min="0"
              step="0.01"
              className={`w-full p-4 border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              placeholder="Ex: 99.99"
              {...register("price", {
                required: "Preço obrigatório",
                min: { value: 0, message: "Preço não pode ser negativo" },
              })}
            />
            {errors.price && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.price.message}
              </span>
            )}
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isHighlight"
              className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              {...register("isHighlight")}
            />
            <label
              htmlFor="isHighlight"
              className="ml-3 text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Destacar
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="photo"
            className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300"
          >
            URL da Foto
          </label>
          <input
            type="url"
            id="photo"
            className={`w-full p-4 border ${
              errors.photo ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            placeholder="https://example.com/imagem.jpg"
            {...register("photo", {
              required: "URL obrigatória",
              pattern: {
                value: /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/,
                message: "URL inválida",
              },
            })}
          />
          {errors.photo && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.photo.message}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300"
          >
            Descrição
          </label>
          <textarea
            id="description"
            rows={5}
            className={`w-full p-4 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            placeholder="Descrição da roupa"
            {...register("description", { required: "Campo obrigatório" })}
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.description.message}
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
          {isLoading && (
            <svg
              className="mr-2 w-6 h-6 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {isLoading ? "Incluindo..." : "Incluir"}
        </button>
      </form>
    </>
  );
}

export default NovaRoupa;
