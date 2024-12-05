"use client";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Cookies from "js-cookie";
import axios from "axios";

type ClothesByBrand = {
  id: number;
  name: string;
  _count: {
    clothes: number;
  };
};

type AnalyticsData = {
  clothesByBrand: ClothesByBrand[];
  totalComments: number;
};

type ClothingBrand = {
  brand: string;
  num: number;
};

type GeneralData = {
  comments: number;
  clothes: number;
  brands: number;
};

type DataRow = [string, number, string];

export default function Main() {
  const [clothingBrands, setClothingBrands] = useState<ClothingBrand[]>([]);
  const [data, setData] = useState<GeneralData>({} as GeneralData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_API}/admin/analytics`,
          {
            headers: {
              "Content-type": "application/json",
              authtoken: Cookies.get("admin_logado_token") as string,
            },
          }
        );
        const data: AnalyticsData = response.data;

        const generalData: GeneralData = {
          comments: data.totalComments,
          clothes: data.clothesByBrand.reduce(
            (acc, brand) => acc + brand._count.clothes,
            0
          ),
          brands: data.clothesByBrand.length,
        };
        setData(generalData);

        const clothingBrandData: ClothingBrand[] = data.clothesByBrand.map(
          (brand) => ({
            brand: brand.name,
            num: brand._count.clothes,
          })
        );
        setClothingBrands(clothingBrandData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const chartData: (["Marca", "NºRoupas", { role: string }] | DataRow)[] = [
    ["Marca", "NºRoupas", { role: "style" }],
  ];

  const colors = [
    "red",
    "blue",
    "violet",
    "green",
    "gold",
    "cyan",
    "chocolate",
    "purple",
    "brown",
    "orangered",
  ];

  clothingBrands.forEach((item, index) => {
    chartData.push([item.brand, item.num, colors[index % colors.length]]);
  });

  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {data.comments}
          </span>
          <p className="font-bold mt-2 text-center">Nº Comentários</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {data.clothes}
          </span>
          <p className="font-bold mt-2 text-center">Nº Roupas</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {data.brands}
          </span>
          <p className="font-bold mt-2 text-center">Nº Marcas</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-4">
        Gráfico: Nº de Roupas por Marca
      </h2>
      <Chart
        chartType="ColumnChart"
        width="95%"
        height="380px"
        data={chartData}
      />
    </div>
  );
}
