import { useState } from 'react'

const Blog = ({ blog, clickLike, clickRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailVisible, setDetailVisible] = useState(false)

  const toggledetailVisible = () => {
    setDetailVisible(!detailVisible)
  }

  return (
    detailVisible ?

      <div style={blogStyle} className="fullContent">
        <div>
          {blog.title} {blog.author} <button onClick={toggledetailVisible}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={() => clickLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>

        {
          JSON.parse(window.localStorage.getItem('loggedUser')) &&

          (JSON.parse(window.localStorage.getItem('loggedUser')).username ===
          blog.user.username)

          &&

          <div>
            <button onClick={() => clickRemove(blog)}>remove</button>
          </div>
        }

      </div>

      :

      <div style={blogStyle} className="togglableContent">
        <div>
          {blog.title} {blog.author} <button onClick={toggledetailVisible}>view</button>
        </div>
      </div>
  )
}

export default Blog