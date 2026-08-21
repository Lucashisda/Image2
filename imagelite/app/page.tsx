import { PrimeiroComponente } from './componentes/PrimeiroComponente';

export default function Home() {
  return (
    <div>
      <main>
        <PrimeiroComponente
          mensagem="Esta é uma mensagem passada como propriedade para o PrimeiroComponente."
          mensagemBotao="Você clicou no botão!"
        />
      </main>
    </div>
  )
}