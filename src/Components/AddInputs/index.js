import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import InputItem from '../InputItem'
import './index.css'

class AddInputs extends Component {
  state = {
    webNamePasswordsList: [],
    website: '',
    username: '',
    password: '',
    searchResult: '',
    isChecked: false,
    passwordsCount: 0,
  }

  showPasswords = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  searchItem = event => {
    this.setState({searchResult: event.target.value})
  }

  addWebsite = event => {
    this.setState({website: event.target.value})
  }

  addUsername = event => {
    this.setState({username: event.target.value})
  }

  addPasswords = event => {
    this.setState({password: event.target.value})
  }

  addWebNamePasswords = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const detailsObject = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    if (website !== '' && username !== '' && password !== '') {
      this.setState(prevState => ({
        webNamePasswordsList: [
          ...prevState.webNamePasswordsList,
          detailsObject,
        ],
        website: '',
        username: '',
        password: '',
        passwordsCount: prevState.passwordsCount + 1,
      }))
    }
  }

  onDeleteItem = id => {
    const {webNamePasswordsList, passwordsCount} = this.state
    const listAfterItemDeletion = webNamePasswordsList.filter(
      eachObject => eachObject.id !== id,
    )

    const decrementedCount = passwordsCount - 1

    this.setState({
      webNamePasswordsList: listAfterItemDeletion,
      passwordsCount: decrementedCount,
    })
  }

  gettingTheDisplayItem = () => {
    const {webNamePasswordsList, isChecked, searchResult} = this.state
    const searchList = webNamePasswordsList.filter(eachObject =>
      eachObject.website.toLowerCase().includes(searchResult.toLowerCase()),
    )

    if (searchList.length === 0) {
      return (
        <div className="no-password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-password-image"
          />
          <p className="no-password">No Passwords</p>
        </div>
      )
    }
    return (
      <ul className="list-container">
        {searchList.map(eachObject => (
          <InputItem
            eachObject={eachObject}
            key={eachObject.id}
            onDeleteItem={this.onDeleteItem}
            isChecked={isChecked}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {website, username, password, passwordsCount} = this.state

    const isNoPasswordsDisplayed = this.gettingTheDisplayItem()

    return (
      <div className="bg-container">
        <div className="main-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="input-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="manager-sm-image"
            />
            <form
              className="input-container"
              onSubmit={this.addWebNamePasswords}
            >
              <h1 className="add-password-heading">Add New Password</h1>
              <div className="website-container">
                <div className="web-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="web-logo"
                  />
                </div>
                <input
                  type="text"
                  className="web-input"
                  placeholder="Enter Website"
                  onChange={this.addWebsite}
                  value={website}
                />
              </div>
              <div className="username-container">
                <div className="username-logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="username-logo"
                  />
                </div>
                <input
                  type="text"
                  className="username-input"
                  placeholder="Enter Username"
                  onChange={this.addUsername}
                  value={username}
                />
              </div>
              <div className="password-container">
                <div className="password-logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="password-logo"
                  />
                </div>
                <input
                  type="password"
                  className="password-input"
                  placeholder="Enter Password"
                  onChange={this.addPasswords}
                  value={password}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="manager-lg-image"
            />
          </div>
          <div className="passwords-card">
            <div className="password-search-container">
              <div className="password-container">
                <h1 className="your-heading">Your Passwords</h1>
                <div className="no-of-passwords-con">
                  <p className="no-of-passwords">{passwordsCount}</p>
                </div>
              </div>
              <div className="search-container">
                <div className="search-logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-logo"
                  />
                </div>
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.searchItem}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="showPassword"
                className="checkbox-input"
                onClick={this.showPasswords}
              />
              <label htmlFor="showPassword" className="checkbox-des">
                Show Passwords
              </label>
            </div>
            {isNoPasswordsDisplayed}
          </div>
        </div>
      </div>
    )
  }
}

export default AddInputs
