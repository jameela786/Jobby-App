import './index.css'

const NotFound = () => {
  console.log('inside not found')
  return (
    <div className="pageNotfound_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="pagenotfound_img"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  )
}

export default NotFound
