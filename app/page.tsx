
import GetAPI from "./GetAPI";
import Posts from "./posts/page";
import RegisterForm from "../components/RegisterForm";
import { getUserFromCookie } from "../lib/getUser"


export default async function Home() {
  const user = await getUserFromCookie()
  return (
    <>

      {user && (
        <p>Bienvenido, Estas Conectado</p>
      )}
      {!user && (
        <>
          {/* <GetAPI />
          <Posts /> */}
          <p className="text-center text-2xl text-gray-600 mb-5">No tienes una cuenta? <strong>Crea una</strong></p>
          <RegisterForm />
        </>
      )}
    </>
  );
}