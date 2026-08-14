import Image from "next/image";
import { PrimeiroComponente } from "./componentes/PrimeiroComponente";

export default function Home() {
  return (
    <div>
      <main>
        <h1>BINARIO GORDON</h1>
        <PrimeiroComponente
          mensagem="clica direit0 ."
          mensagemBotao="Você clicou no meu butão!"
        />

      </main>
    </div>
  );
}