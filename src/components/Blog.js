import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs }) => {
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

  const clickLike = async () => {
    const newBlog = await { ...blog }
    newBlog.likes += 1
    delete newBlog.user

    await blogService.update(blog.id, newBlog)

    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        if (a.likes < b.likes) return 1
        else if (a.likes > b.likes) return -1
        else return 0
      })
      setBlogs(blogs)
    })
  }

  const clickRemove = async () => {
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

  return (
    detailVisible ?

      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggledetailVisible}>view</button>
        </div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={clickLike}>like</button></div>
        <div>{blog.user.name}</div>

        {
          JSON.parse(window.localStorage.getItem('loggedUser')).username ===
          blog.user.username

          &&

          <div>
            <button onClick={clickRemove}>remove</button>
          </div>
        }

      </div>

      :

      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggledetailVisible}>view</button>
        </div>
      </div>
  )
}

export default Blog