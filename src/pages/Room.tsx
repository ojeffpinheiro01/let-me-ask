import { useParams } from 'react-router-dom'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import logo from '../assets/img/logo.svg'

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function Room(){
  const params = useParams<RoomParams>()
  const roomID = params.id

  return(
    <div id='page-room'>
      <header>
        <div className="content">
          <img src={logo} alt="logo" />
          <RoomCode code={roomID} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>SALA FÍSICA</h1>
          <span>4 perguntas</span>
        </div>
        <form>
          <textarea placeholder='O que você quer perguntar?' />
          <div className="form-footer">
            <span>Para enviar uma pergunta, <button>faça login</button></span>
            <Button type='submit'>ENVIAR PERGUNTA</Button>
          </div>
        </form>
      </main>
    </div>
  )
}