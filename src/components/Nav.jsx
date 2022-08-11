import React, { useState } from "react";
import './Nav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faU, faUser} from '@fortawesome/free-solid-svg-icons';

export default function Nav() {

  const [value, setValue] = useState();

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <nav className="navbar">
      <div className="logo">CryptoDash</div>
        <form className="searchbar" onSubmit={handleSubmit}>
          <FontAwesomeIcon icon={faSearch} className="searchbar-icon" />
          <input
            className="searchbar-input"
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Search crypto coins..."
          />
        </form>
      <div className="menu">
        <div className="menu-username">Xiang</div>
        <FontAwesomeIcon icon={faUser} className="menu-profile" />
      </div>
    </nav>
  );
}