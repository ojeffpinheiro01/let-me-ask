import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

import { database } from '../services/firebase'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import logo from '../assets/img/logo.svg'

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function Room() {
  const params = useParams<RoomParams>()
  const roomID = params.id

  const { user } = useAuth()
  const { questions, title } = useRoom(roomID)
  
  const [newQuestion, setNewQuestion] = useState('')

  async function handleSendNewQuestion(e: FormEvent) {
    e.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('Oops, Você deve estar logado');
    }

    const question = {
      content: newQuestion,
      author: {
        username: user?.username,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomID}/questions`).push(question)
    setNewQuestion('')
  }

  return (
    <div id='page-room'>
      <header>
        <div className="content">
          <img src={logo} alt="logo" />
          <RoomCode code={roomID} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)  </span>}
        </div>
        <form onSubmit={handleSendNewQuestion}>
          <textarea placeholder='O que você quer perguntar?'
            onChange={t => setNewQuestion(t.target.value)}
            value={newQuestion} />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.username} />
                <span>{user.username}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça login</button></span>
            )}

            <Button type='submit' disabled={!user}>ENVIAR PERGUNTA</Button>
          </div>
        </form>
        <div className="question-list">
          {questions.map(q => {
            return (
              <Question key={q.id}
                content={q.content} author={q.author} />
            )
          })}
        </div>

      </main>
    </div>
  )
}