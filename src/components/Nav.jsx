import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faBitcoinSign,
  faBars,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SearchResult from "./SearchResult";

export default function Nav() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(true);

  function createList(coins) {
    if (coins.length === 0) {
      setList([<SearchResult key={0} empty />]);
    }
    if (coins.length > 0) {
      const list = coins.map((coin, index) => {
        return (
          <SearchResult
            key={index}
            coin={coin}
            setShowList={setShowList}
            show
          />
        );
      });
      setList(list);
    }
  }

  useEffect(() => {
    if (value) {
      setList([<SearchResult key={0} loading />]);
      axios
        .get(`https://api.coingecko.com/api/v3/search?query=${value}`)
        .then((res) => {
          createList(res.data.coins);
        })
        .catch((e) => {
          console.error(e);
        });
    }

    if (!value) {
      setList([]);
    }
  }, [value]);

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="logo">
        <FontAwesomeIcon icon={faBitcoinSign} className="logo-icon" />
        <div className="logo-name">CryptoDash</div>
      </div>
      <form className="searchbar" onSubmit={(e) => e.preventDefault()}>
        <FontAwesomeIcon icon={faSearch} className="searchbar-icon" />
        <input
          className="searchbar-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search here..."
          autoFocus
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
          data-testid="searchbar-input"
        />
        {list.length !== 0 && showList && (
          <div className="searchbar-results" data-testid="searchbar-results">
            {list}
          </div>
        )}
        {value && (
          <FontAwesomeIcon
            icon={faClose}
            className="searchbar-clear"
            onClick={() => {
              setValue("");
            }}
          />
        )}
      </form>
      <div className="menu">
        <div className="menu-username">Xiang</div>
        <FontAwesomeIcon icon={faUser} className="menu-profile" />
        <FontAwesomeIcon icon={faBars} className="menu-bars" />
      </div>
    </nav>
  );
}
