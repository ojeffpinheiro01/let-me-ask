import { useHistory, useParams } from 'react-router-dom'

import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import { Button } from '../components/Button';

import logoImg from '../assets/img/logo.svg';
import deleteImg from '../assets/img/delete.svg';
import checkImg from '../assets/img/check.svg';
import answerImg from '../assets/img/answer.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomID = params.id;

  const { title, questions } = useRoom(roomID)

  async function handleDeleteQuestion(questionID: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomID}/questions/${questionID}`).remove()
    }
  }

  async function handleCheckQuestionAsAnswered(questionID: string) {
    await database.ref(`rooms/${roomID}/questions/${questionID}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionID: string) {
    await database.ref(`rooms/${roomID}/questions/${questionID}`).update({
      isHighlighted: true
    })
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomID}`).update({
      endedAt: new Date(),
    })
    history.push('/');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomID} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(q => {
            return (
              <Question
                key={q.id}
                content={q.content}
                author={q.author}
                isAnswered={q.isAnswered}
                isHighlighted={q.isHighlighted}>
                {!q.isAnswered &&
                  <>
                    <button type='button'
                      onClick={() => handleCheckQuestionAsAnswered(q.id)} >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button type='button'
                      onClick={() => handleHighlightQuestion(q.id)} >
                      <img src={answerImg} alt="Destacar pergunta" />
                    </button>
                  </>}
                <button type='button'
                  onClick={() => handleDeleteQuestion(q.id)} >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}