"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import ItemClothes from "@/components/ItemClothes";
import { ClotheI } from "@/utils/types/clothes";

function CadRoupas() {
  const [roupas, setRoupas] = useState<ClotheI[]>([]);

  useEffect(() => {
    async function getClothes() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clothes`
      );
      const dados = await response.json();
      console.log(dados);
      setRoupas(dados);
    }
    getClothes();
  }, []);

  const listaRoupas = roupas.map((roupa) => (
    <ItemClothes
      key={roupa.id}
      roupa={roupa}
      roupas={roupas}
      setRoupas={setRoupas}
    />
  ));

  return (
    <div className="m-4 mt-24">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Roupas
        </h1>
        <Link
          href="roupas/novo"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Nova Roupa
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo da Roupa
              </th>
              <th scope="col" className="px-6 py-3">
                Marca
              </th>
              <th scope="col" className="px-6 py-3">
                Tamanho
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>{listaRoupas}</tbody>
        </table>
      </div>
    </div>
  );
}

export default CadRoupas;