import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Blogform from './components/Blogform'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [messageStatus, setMessageStatus] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlock => {
        setBlogs(blogs.concat(returnedBlock))
        setMessageStatus(true)
        setMessage(`a new blog ${returnedBlock.title} by ${returnedBlock.author}`)
        setTimeout(() => {
          setMessageStatus(false)
          setMessage(null)
        }, 5000)
      })
  }

  const addLike = (id,blogObject) => {
    blogService
      .update(id,blogObject)
  }

  const removeBlog = (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      blogService
        .remove(blog.id)
        .then(result => {
          setBlogs(blogs.filter(n => n.id !== blog.id))
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage(`${error.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout =  (event) => {
    setUser(null)
    window.localStorage.clear()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} messageStatus={messageStatus} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageStatus={messageStatus} />
      <p>{user.name} logged in
        <button onClick={() => {handleLogout()}}>logout</button> </p>
      <Togglable buttonLabel='new note'>
        <Blogform createBlog={addBlog}/>
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog}
          updateBlog={addLike} user={user}
          deleteBlog={removeBlog}/>
      )}


    </div>
  )
}

export default App