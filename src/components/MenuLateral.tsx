"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { IoExitOutline } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { FaShirt, FaTags } from "react-icons/fa6";
import { BsChatDots } from "react-icons/bs";
import Link from "next/link";

export function MenuLateral() {
  const router = useRouter();

  function adminSair() {
    if (confirm("Confirma Saída?")) {
      Cookies.remove("admin_logado_id");
      Cookies.remove("admin_logado_nome");
      Cookies.remove("admin_logado_token");
      router.replace("/");
    }
  }

  return (
    <aside
      id="default-sidebar"
      className="fixed mt-24 left-0 z-40 w-64 h-screen overflow-y-auto transition-transform -translate-x-full sm:translate-x-0 bg-white"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 border-r-2 border-gray-500">
        <ul className="space-y-2">
          <li>
            <Link
              href="/principal"
              className="flex items-center p-2 text-black rounded-lg hover:bg-blue-600"
            >
              <BiSolidDashboard className="text-2xl" />
              <span className="ml-3">Visão Geral</span>
            </Link>
          </li>
          <li>
            <Link
              href="/principal/roupas"
              className="flex items-center p-2 text-black rounded-lg hover:bg-blue-600"
            >
              <FaShirt className="text-2xl" />
              <span className="ml-3">Cadastro de Roupas</span>
            </Link>
          </li>
          <li>
            <Link
              href="/principal/marcas"
              className="flex items-center p-2 text-black rounded-lg hover:bg-blue-600"
            >
              <FaTags className="text-2xl" />
              <span className="ml-3">Controle de Marcas</span>
            </Link>
          </li>
          <li>
            <Link
              href="/principal/comentarios"
              className="flex items-center p-2 text-black rounded-lg hover:bg-blue-600"
            >
              <BsChatDots className="text-2xl" />
              <span className="ml-3">Controle de Comentários</span>
            </Link>
          </li>
          <li>
            <button
              className="flex items-center w-full p-2 text-black rounded-lg hover:bg-blue-600"
              onClick={adminSair}
            >
              <IoExitOutline className="text-2xl" />
              <span className="ml-3">Sair do Sistema</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
