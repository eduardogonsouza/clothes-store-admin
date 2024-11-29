"use client";
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { ClothingBrandI } from "@/utils/types/clothingBrand";
import Cookies from "js-cookie";

function ItemBrand({
  brand,
  brands,
  setBrands,
}: {
  brand: ClothingBrandI;
  brands: ClothingBrandI[];
  setBrands: Dispatch<SetStateAction<ClothingBrandI[]>>;
}) {
  async function deleteBrand() {
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/brands/${brand.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authtoken: Cookies.get("admin_logado_token") as string,
          },
        }
      );

      if (response.status === 200) {
        const brandsUpdated = brands.filter((x) => x.id !== brand.id);
        setBrands(brandsUpdated);
        alert("Marca excluída com sucesso");
      } else {
        alert("Erro... marca não foi excluída");
      }
    }
  }

  return (
    <tr
      key={brand.id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <td className={`px-6 py-4`}>{brand.name}</td>
      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-600 inline-block cursor-pointer"
          title="Excluir"
          onClick={deleteBrand}
        />
      </td>
    </tr>
  );
}

export default ItemBrand;
