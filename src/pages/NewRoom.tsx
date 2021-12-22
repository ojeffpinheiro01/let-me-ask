import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';

import illustrationImg from '../assets/img/illustration.svg'
import logoImg from '../assets/img/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function NewRoom() {
  const [newRoom, setNewRoom] = useState('');

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> 
          </p>
        </div>
      </main>
    </div>
  )
}