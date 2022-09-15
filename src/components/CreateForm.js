import { useState } from 'react'

const CreateForm = ({ createBlog, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const ClickCreate = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')

    setMessage(`a new blog "${title}" by "${author}" added`)
    setTimeout(() => {setMessage('')}, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ClickCreate}>
        <div>
          {/* title: */}
          <input type="text" value={title} name="Title"
            placeholder="write title content here"
            onChange={({ target }) => { setTitle(target.value) }}
          />
        </div>
        <div>
          {/* author: */}
          <input type="text" value={author} name="Author"
            placeholder="write author content here"
            onChange={({ target }) => { setAuthor(target.value) }}
          />
        </div>
        <div>
          {/* url: */}
          <input type="text" value={url} name="Url"
            placeholder="write url content here"
            onChange={({ target }) => { setUrl(target.value) }}
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateForm