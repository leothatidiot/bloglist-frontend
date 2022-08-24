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
      setTimeout(() => {setMessage('')}, 5000);
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
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

      {
        message !== '' && <Notification message={message}/>
      }

      <form onSubmit={handleLogout}>
        <div>
          {user.username} logged in
          <button type="submit">logout</button>
        </div>
      </form>
      
      <Togglable expandButtonLable='create new blog' collapseButtonLable='cancel'>
        <CreateForm setMessage={setMessage}></CreateForm>
      </Togglable>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
        )}
      </div>

    </div>
  )
}

export default App
