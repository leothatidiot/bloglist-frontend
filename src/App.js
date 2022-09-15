import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        if (a.likes < b.likes) return 1
        else if (a.likes > b.likes) return -1
        else return 0
      })
      setBlogs(blogs)
    })
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
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setMessage('wrong username or password')
      setTimeout(() => {setMessage('')}, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }

  const clickLike = async (blog) => {
    const newBlog = await { ...blog }
    newBlog.likes += 1
    delete newBlog.user

    await blogService.update(blog.id, newBlog)
    const blogs = await blogService.getAll()

    blogs.sort((a, b) => {
      if (a.likes < b.likes) return 1
      else if (a.likes > b.likes) return -1
      else return 0
    })
    setBlogs(blogs)
  }

  const clickRemove = async (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`)) {
      await blogService.remove(blog.id)
      blogService.getAll().then(blogs => {
        blogs.sort((a, b) => {
          if (a.likes < b.likes) return 1
          else if (a.likes > b.likes) return -1
          else return 0
        })
        setBlogs(blogs)
      })
    }
  }

  const createBlog = async  (blogJSON) => {
    await blogService.create(blogJSON)
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        if (a.likes < b.likes) return 1
        else if (a.likes > b.likes) return -1
        else return 0
      })
      setBlogs(blogs)
    })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        {
          message !== '' && <Notification message={message} />
        }

        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username"
              onChange={({ target }) => { setUsername(target.value) }}
            />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password"
              onChange={ ({ target }) => {setPassword(target.value)} }
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      {
        message !== '' && <Notification message={message}/>
      }

      <form onSubmit={handleLogout}>
        <div>
          {user.username} logged in
          <button type="submit">logout</button>
        </div>
      </form>

      <Togglable buttonLable='create new blog'>
        <CreateForm createBlog={createBlog} setMessage={setMessage} />
      </Togglable>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} clickLike={clickLike} clickRemove={clickRemove} />
        )}
      </div>

    </div>
  )
}

export default App
