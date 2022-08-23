import { useState, useEffect } from "react"
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
    const newBlog = await {...blog}
    newBlog.likes += 1
    delete newBlog.user

    console.log(blog)

    blogService.update(blog.id, newBlog)
    blogService.getAll().then(blogs => { setBlogs(blogs) })
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
    </div>

    :

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggledetailVisible}>view</button>
      </div>
    </div>
)}

export default Blog