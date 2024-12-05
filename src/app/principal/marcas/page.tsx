"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import ItemBrand from "@/components/ItemBrand";
import { ClothingBrandI } from "@/utils/types/clothingBrand";
import axios from "axios";

function BrandsPage() {
  const [marcas, setMarcas] = useState<ClothingBrandI[]>([]);

  useEffect(() => {
    async function getBrands() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_API}/brands`
        );
        const dados = response.data;
        console.log(dados);
        setMarcas(dados);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }
    getBrands();
  }, []);

  const listaMarcas = marcas.map((marca) => (
    <ItemBrand
      key={marca.id}
      brand={marca}
      brands={marcas}
      setBrands={setMarcas}
    />
  ));

  return (
    <div className="m-4 mt-24">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Marcas
        </h1>
        <Link
          href="marcas/nova"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Nova Marca
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome da Marca
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>{listaMarcas}</tbody>
        </table>
      </div>
    </div>
  );
}

export default BrandsPage;
