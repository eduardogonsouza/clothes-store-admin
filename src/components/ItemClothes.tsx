"use client";
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegStar, FaStar } from "react-icons/fa";
import { ClotheI } from "@/utils/types/clothes";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";

function ItemRoupa({
  roupa,
  roupas,
  setRoupas,
}: {
  roupa: ClotheI;
  roupas: ClotheI[];
  setRoupas: Dispatch<SetStateAction<ClotheI[]>>;
}) {
  async function deleteCloth() {
    if (confirm(`Confirma a exclusão`)) {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL_API}/clothes/${roupa.id}`,
        {
          headers: {
            "Content-type": "application/json",
            authtoken: Cookies.get("admin_logado_token") as string,
          },
        }
      );

      if (response.status == 200) {
        const roupas2 = roupas.filter((x) => x.id != roupa.id);
        setRoupas(roupas2);
        alert("Roupa excluído com sucesso");
      } else {
        alert("Erro... roupa não foi excluído");
      }
    }
  }

  async function toggleHighlight() {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_URL_API}/clothes/${roupa.id}`,
      { ...roupa, highlight: !roupa.highlight },
      {
        headers: {
          "Content-type": "application/json",
          authtoken: Cookies.get("admin_logado_token") as string,
        },
      }
    );

    if (response.status == 200) {
      const roupas2 = roupas.map((x) => {
        if (x.id == roupa.id) {
          return { ...x, highlight: !x.highlight };
        }
        return x;
      });
      setRoupas(roupas2);
    }
  }

  return (
    <tr
      key={roupa.id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Image src={roupa.photo} alt="Foto da Roupa" width={200} height={200} />
      </th>
      <td className={`px-6 py-4 ${roupa.highlight ? "font-extrabold" : ""}`}>
        {roupa.name}
      </td>
      <td className={`px-6 py-4 ${roupa.highlight ? "font-extrabold" : ""}`}>
        {roupa.clothingBrand.name}
      </td>
      <td className={`px-6 py-4 ${roupa.highlight ? "font-extrabold" : ""}`}>
        {roupa.size}
      </td>
      <td className={`px-6 py-4 ${roupa.highlight ? "font-extrabold" : ""}`}>
        {Number(roupa.price).toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-600 inline-block cursor-pointer"
          title="Excluir"
          onClick={deleteCloth}
        />
        &nbsp;
        {roupa.highlight ? (
          <FaStar
            className="text-3xl text-yellow-600 inline-block cursor-pointer"
            title="Destacar"
            onClick={toggleHighlight}
          />
        ) : (
          <FaRegStar
            className="text-3xl text-yellow-600 inline-block cursor-pointer"
            title="Destacar"
            onClick={toggleHighlight}
          />
        )}
      </td>
    </tr>
  );
}

export default ItemRoupa;
