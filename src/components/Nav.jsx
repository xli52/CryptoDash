import React, { useEffect, useState } from "react";
import './Nav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faBitcoinSign, faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import SearchResult from "./SearchResult";

export default function Nav() {

  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function createList(coins) {
    const list = coins.map(coin => {
      console.log(coin);
      return (
        <SearchResult
          key={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          thumb={coin.thumb}
          rank={coin.market_cap_rank}
        />
      );
    });
    setList(list);
  }

  useEffect(() => {
    if (value) {
      axios({
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/search?query=${value}`
      })
        .then(res => {
          // console.log(res.data.coins);
          createList(res.data.coins);
        })
        .catch(e => {
          console.error(e);
        })
    }

    if (!value) {
      setList([]);
    }

  }, [value]);

  return (
    <nav className="navbar">
      <div className="logo">
        <FontAwesomeIcon icon={faBitcoinSign} className="logo-icon" />
        <div className="logo-name">CryptoDash</div>
      </div>
      <form className="searchbar" onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faSearch} className="searchbar-icon" />
        <input
          className="searchbar-input"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search crypto coins..."
        />
        {list.length !== 0 &&
          <div className="searchbar-results">
            {list}
          </div>
        }
        {value &&
          <FontAwesomeIcon icon={faClose} className="searchbar-clear" onClick={() => { setValue('') }} />
        }
      </form>
      <div className="menu">
        <div className="menu-username">Xiang</div>
        <FontAwesomeIcon icon={faUser} className="menu-profile" />
        <FontAwesomeIcon icon={faBars} className="menu-bars" />
      </div>
    </nav>
  );
}