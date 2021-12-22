import { useHistory } from "react-router";

import { auth, firebase } from '../services/firebase'

import '../styles/auth.scss';
import { Button } from "../components/Button";

import illustrationImg from "../assets/img/illustration.svg";
import logoImg from "../assets/img/logo.svg";
import googleIconImg from "../assets/img/google-icon.svg";
import { useContext } from "react";
import { AppContext } from "../App";

export function Home() {
  const { value, setValue} = useContext(AppContext)

  const history = useHistory();

  function handleCreateNewRoom(){
    const provider = new firebase.auth.GoogleAuthProvider()

    auth.signInWithPopup(provider).then(res => {
      console.log(res)
    })

    history.push('/rooms/new')
  }

  return (
    <div id='page-auth' >
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className='main-content'>
          <img src={logoImg} alt="LetMeAsk" />
          <h1>{value}</h1>
          <button onClick={handleCreateNewRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
