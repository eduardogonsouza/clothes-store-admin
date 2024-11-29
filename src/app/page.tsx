"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaShirt } from "react-icons/fa6";
import Cookies from "js-cookie";

type Inputs = {
  email: string;
  senha: string;
};

export default function Home() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>();
  const router = useRouter();

  useEffect(() => {
    setFocus("email");
  }, []);

  async function verifyLogin(data: Inputs) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/admin/login`,
      {
        method: "POST",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify({ email: data.email, password: data.senha }),
      }
    );

    if (response.status == 200) {
      const admin = await response.json();

      Cookies.set("admin_logado_id", admin.id);
      Cookies.set("admin_logado_nome", admin.name);
      Cookies.set("admin_logado_token", admin.authToken);

      router.push("/principal");
    } else if (response.status == 400) {
      toast.error("Erro... Login ou senha incorretos");
    }
  }

  return (
    <main className="w-full max-w-screen-2xl flex flex-col items-center mx-auto p-6">
      <FaShirt color="black" size={100} />
      <div className="max-w-md">
        <h1 className="text-3xl font-bold my-8">Login Admin: Roupa Rouposa</h1>
        <form
          className="max-w-sm mx-auto flex flex-col justify-center"
          onSubmit={handleSubmit(verifyLogin)}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("email")}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("senha")}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
