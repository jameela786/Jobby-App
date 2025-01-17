import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <div>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link
                  to="/"
                  className="nav-link"
                  data-testid="desktop-home-link"
                >
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
              <li className="nav-menu-item" data-testid="desktop-logout-btn">
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
