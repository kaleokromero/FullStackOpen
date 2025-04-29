import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifications from './components/Notifications'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState(null)
  const [token, setToken] = useState('')

  // useEffect(() => {
  //   blogService
  //     .getAll()
  //     .then(initialBlogs => {
  //       setBlogs(initialBlogs)
  //     })
  // }, [])

  const handleLogin =  async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username,password})
      setToken(`Bearer ${user.token}`)
      setUsername(user.username)
      setUser('')
      setPassword('')
      setNotificationMessage('Welcome!')
      console.log('user--',user.username);
      
    } catch (exception) {
      setErrorMessage('Error: ', exception)
    }
  }

  const handleLogout = async (event) => {
    try{

    }catch{

    }
  }
  const getBlogs = () => {
    blogService.getAll(token).then((blogs) => setBlogs(blogs))
  }
  const blogsList= () => (
    blogs.map((blog) => 
      <Blog key={blog.id} blog={blog} />
    )
  )
  const blogsHeader = () => {
      <div>
        <h3>{user.username} logged in </h3>
        <button onClick={handleLogout}>logout</button>
      </div>
    }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      user
        <input
          type='text'
          value={user}
          name='user'
          onChange={({target}) => setUser(target.value)}
        />
    </div>
    <div>
      password
      <input
        type='password'
        value={password}
        name='password'
        onChange={({target}) => setPassword(target.value)}
      />
    </div>
    <button type='submit'>Login</button>
  </form>
  )
  const renderBlogs = () => (
    getBlogs(),
    blogsHeader(),
    blogsList()
  )


  return (
    <div>
       <Notifications message={message} text={text}/>

      <h2>blogs</h2>
    
      {username === null && loginForm()}
      
      {username !== null && renderBlogs()}

    </div>
  )
}

export default App