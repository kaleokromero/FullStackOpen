import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { NewBlogForm } from './components/NewBlogForm'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'

const App = () => {
const [blogs, setBlogs] = useState([])
const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 
const [user, setUser] = useState(null)
const [title, setTitle] = useState("")
const [author, setAuthor] = useState("")
const [url, setUrl] = useState("")
const [message, setMessage] = useState(null)
const [error, setError] = useState(false)

useEffect(() => {
  try{
    blogService.setToken(user?.token)
    blogService.getAll()
    .then(blogs => {
      setBlogs( blogs )
    })
  }
  catch(exception){
    setMessage('Login to get blogs')
    setError(true)
    setTimeout(() => {
      setMessage(null)
      setError(false)
    }, 5000)
  }


  }, [])

// The empty array as the parameter of the effect ensures that the effect is executed only when the component is rendered for the first time.
useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user?.token)
  }
}, [])

const handleLogin = async (event) => {
  event.preventDefault()
  
  try {
    const user = await loginService.login({
      username, password,
    })
    
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
      ) 
      
      blogService.setToken(user?.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setError(true)
      setTimeout(() => {
        setMessage(null)
      setError(false)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
  
  try {
    
    window.localStorage.removeItem('loggedBlogappUser')
      
      blogService.setToken('')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      setTimeout(() => {
        // setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }

    try{
      await blogService.createBlog(blog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setMessage(`a new blog ${title} by ${author} created`)
      setAuthor("")
      setTitle("")
      setUrl("")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }catch(exception){
      setMessage('Failed to create blog, please try again')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }

  }


  const blogsForm = () => {
    return(
    <div>
      <h4>{user.username} logged in</h4>
      <button onClick={handleLogout}>Log out</button>
      <NewBlogForm title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleCreateBlog={handleCreateNewBlog} />
      {renderBlogs()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    )
  }


const renderBlogs = () => (
  <div>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
    )}
    </div>
    )

    return (
      <div>
        {
          message !== null && <Notification message={message} error={error} />
        }
        {
          user === null
          ?
          <LoginForm handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername} />
          :
          blogsForm()
          }
      </div>
    )

  }

export default App