import '../styles/question.scss'

type QuestionProps = {
  content: string;
  author: {
    username: string;
    avatar: string;
  }
}

export function Question({ content, author }: QuestionProps){
  return(
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.username} />
          <span>{author.username}</span>
        </div>
        <div></div>
      </footer>
    </div>
  )
}