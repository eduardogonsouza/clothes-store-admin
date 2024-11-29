"use client";
import { useEffect, useState } from "react";
import { CommentI } from "@/utils/types/comments";
import ItemComentario from "@/components/ItemComments";
import { ClotheI } from "@/utils/types/clothes";

function ControleComentarios() {
  const [roupas, setRoupas] = useState<ClotheI[]>([]);
  const [comentarios, setComentarios] = useState<CommentI[]>([]);

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

  useEffect(() => {
    if (roupas.length > 0) {
      async function fetchComentarios() {
        const commentsPromises = roupas.map((roupa) =>
          fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/comments/clothe/${roupa.id}`
          ).then((res) => res.json())
        );

        const commentsArrays = await Promise.all(commentsPromises);
        const allComentarios = commentsArrays.flat();
        setComentarios(allComentarios);
      }

      fetchComentarios();
    }
  }, [roupas]);

  const mappedComentarios = roupas.map((roupa) =>
    comentarios
      .filter((comentario) => comentario.clotheId === roupa.id)
      .map((comentario) => (
        <ItemComentario
          key={comentario.id}
          comentario={comentario}
          roupa={roupa}
          comentarios={comentarios}
          setComentarios={setComentarios}
        />
      ))
  );
  return (
    <div className="m-4 mt-24">
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Comentários
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto da Camisa
              </th>
              <th scope="col" className="px-6 py-3">
                Nome da Camisa
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do Usuário
              </th>
              <th scope="col" className="px-6 py-3">
                Conteudo
              </th>
              <th scope="col" className="px-6 py-3">
                Data do Comentário
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>{mappedComentarios}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ControleComentarios;
