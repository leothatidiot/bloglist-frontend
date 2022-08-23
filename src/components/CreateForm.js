import { useState } from "react"
import blogService from "../services/blogs"

const CreateForm = ({setMessage}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()

    const blogJSON = {
      title: title,
      author: author,
      url: url,
    }

    blogService.create(blogJSON)

    setMessage(`a new blog "${title}" by "${author}" added`)
    setTimeout(() => {setMessage('')}, 5000);

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input type="text" value={title} name="Title"
            onChange={({ target }) => { setTitle(target.value) }}
          />
        </div>
        <div>
          author:
          <input type="text" value={author} name="Author"
            onChange={({ target }) => { setAuthor(target.value) }}
          />
        </div>
        <div>
          url:
          <input type="text" value={url} name="Url"
            onChange={({ target }) => { setUrl(target.value) }}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateForm