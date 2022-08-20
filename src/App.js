import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    // window.location.reload()
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    const blogJSON = {
      title: title,
      author: author,
      url: url,
    }

    blogService.create(blogJSON)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" 
              onChange={ ({target}) => {setUsername(target.value)} }
            />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" 
              onChange={ ({target}) => {setPassword(target.value)} }
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <form onSubmit={handleLogout}>
        <div>
          {user.username} logged in
          <button type="submit">logout</button>
        </div>
      </form>

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
        <button >create</button>
      </form>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>

    </div>
  )
}

export default App
