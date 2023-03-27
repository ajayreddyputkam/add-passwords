import './index.css'

const InputItem = props => {
  const {eachObject, onDeleteItem, isChecked} = props
  const {id, website, username, password} = eachObject
  const logoLetter = website.slice(0, 1).toUpperCase()

  const deleteItem = () => {
    onDeleteItem(id)
  }

  const isPasswordDisplayed = isChecked ? (
    <p className="password-para">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="password-stars-image"
    />
  )

  return (
    <li className="list-item">
      <div className="name-logo-container">
        <div className="user-logo-container">
          <p className="user-logo">{logoLetter}</p>
        </div>
        <div className="web-name-container">
          <p className="website">{website}</p>
          <p className="username">{username}</p>
          {isPasswordDisplayed}
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={deleteItem}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default InputItem
