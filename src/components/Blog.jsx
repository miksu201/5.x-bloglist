import { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const buttonLabel =  blogVisible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleBlogVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const addLike = (event) => {
    event.preventDefault()
    setLikes(likes +1)
    const newLikes = likes +1
    updateBlog(blog.id,{
      likes: newLikes
    })

  }

  const removeBlog= (event) => {
    event.preventDefault()
    deleteBlog(blog)

  }

  return(
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author} <button data-testid="reveal-button" onClick={toggleBlogVisibility }>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
        likes {likes} <button onClick={addLike}>like</button>
        </div>
        <div>
          {user.name}
        </div>
        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>)
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog

