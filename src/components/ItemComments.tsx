"use client";
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import Cookies from "js-cookie";
import { CommentI } from "@/utils/types/comments";
import { ClotheI } from "@/utils/types/clothes";
import Image from "next/image";
import axios from "axios";

interface ListaComentarioProps {
  comentario: CommentI;
  comentarios: CommentI[];
  roupa: ClotheI;
  setComentarios: Dispatch<SetStateAction<CommentI[]>>;
}

function ItemComment({
  comentario,
  comentarios,
  roupa,
  setComentarios,
}: ListaComentarioProps) {
  async function deleteComment() {
    if (confirm(`Confirma Exclusão do Comentário "${comentario.content}"?`)) {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL_API}/comments/${comentario.id}`,
        {
          headers: {
            "Content-type": "application/json",
            authtoken: Cookies.get("admin_logado_token") as string,
          },
        }
      );

      if (response.status === 204) {
        const comentariosAtualizados = comentarios.filter(
          (x) => x.id !== comentario.id
        );
        setComentarios(comentariosAtualizados);
        alert("Comentário excluído com sucesso");
      } else {
        alert("Erro... Comentário não foi excluído");
      }
    }
  }

  return (
    <tr
      key={comentario.id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Image
          src={roupa.photo}
          alt="Avatar do Usuário"
          style={{ borderRadius: "50%" }}
          width={120}
          height={120}
        />
      </th>
      <td className={"px-6 py-4"}>{roupa.name}</td>
      <td className={"px-6 py-4"}>{comentario.user.name}</td>
      <td className={"px-6 py-4"}>{comentario.content}</td>
      <td className={`px-6 py-4`}>
        {new Date(comentario.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-600 inline-block cursor-pointer"
          title="Excluir"
          onClick={deleteComment}
        />
      </td>
    </tr>
  );
}

export default ItemComment;
