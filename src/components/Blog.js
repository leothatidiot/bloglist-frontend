import { useState } from "react"

const Blog = ({ blog }) => {
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

  console.log(blog)

  return (
    detailVisible ? 
    
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggledetailVisible}>view</button>
      </div>
      <div>{blog.url}</div>
      <div>{blog.likes} <button>like</button></div>
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