import React, { useState, useRef } from 'react';
import { buildPath as bp } from './Path.tsx';
import * as storage from '../tokenStorage.js';  

function CardUI() {
  const [message, setMessage] = useState<string>('');
  const [searchResults, setResults] = useState<string>('');
  const [cardList, setCardList] = useState<string>('');

  const cardRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Safely get and parse user data from localStorage
  const userData = localStorage.getItem('user_data');
  if (!userData) {
    throw new Error('User data not found in localStorage');
  }
  const ud = JSON.parse(userData);
  const userId = ud.id;

  const addCard = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!cardRef.current?.value) {
      setMessage('Please enter a card to add');
      return;
    }

    var obj = { userId: userId, card: cardRef.current.value, jwtToken: storage.retrieveToken() };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(bp('addcard'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' }
      });

      var txt = await response.text();
      var res = JSON.parse(txt);

      if (res.error && res.error.length > 0) {
        setMessage("API Error:" + res.error);
      } else {
        setMessage('Card has been added');
        storage.storeToken(res.jwtToken);
      }
    } catch (e: any) {
      setMessage(e.toString());
    }
  };

  const searchCard = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchRef.current?.value) {
      setResults('Please enter a search term');
      return;
    }

    var obj = { userId: userId, search: searchRef.current.value, jwtToken: storage.retrieveToken() };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(bp('searchcards'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' }
      });

      var txt = await response.text();
      var res = JSON.parse(txt);
      var _results = res.results;
      var resultText = _results.join(', '); // Join results with commas

      setResults('Card(s) have been retrieved');
      setCardList(resultText);

      if (res.jwtToken) {
        storage.storeToken(res.jwtToken);
      }
    } catch (e: any) {
      console.log(e.toString());
      setResults(e.toString());
    }
  };

  return (
    <div id="cardUIDiv">
      <br />
      <input
        type="text"
        id="searchText"
        placeholder="Card To Search For"
        ref={searchRef}
      />
      <button
        type="button"
        id="searchCardButton"
        className="buttons"
        onClick={searchCard}
      >
        Search Card
      </button>
      <br />
      <span id="cardSearchResult">{searchResults}</span>
      <p id="cardList">{cardList}</p>
      <br /><br />
      <input
        type="text"
        id="cardText"
        placeholder="Card To Add"
        ref={cardRef}
      />
      <button
        type="button"
        id="addCardButton"
        className="buttons"
        onClick={addCard}
      >
        Add Card
      </button>
      <br />
      <span id="cardAddResult">{message}</span>
    </div>
  );
}

export default CardUI;
