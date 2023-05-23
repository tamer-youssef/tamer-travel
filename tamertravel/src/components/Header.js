import { useState, useEffect } from 'react';
import axios from 'axios';

function Header() {
  const [locationinput, setlocationinput] = useState('')
  const [budgetinput, setbudgetinput] = useState('')
  const [countries, setCountries] = useState([]);
  const [numDays, setNumDays] = useState(0);

  useEffect(() => {
    if (locationinput) {
      setbudgetinput('');
    }
  }, [locationinput]);

  useEffect(() => {
    if (budgetinput) {
      setlocationinput('');
    }
  }, [budgetinput]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (locationinput) {
        response = await axios.get(`http://localhost:8080/api/countries/name/${locationinput}`);
      } else if (budgetinput) {
        response = await axios.get(`http://localhost:8080/api/countries/budget/${budgetinput}`);
      }
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={locationinput} onChange={(e) => setlocationinput(e.target.value)} disabled={budgetinput !== ''} style={{backgroundColor: budgetinput !== '' ? '#d9d9d9' : 'white'}} placeholder="Location"></input>
        or
        <input type="number" value={budgetinput} onChange={(e) => setbudgetinput(e.target.value)} disabled={locationinput !== ''} style={{backgroundColor: locationinput !== '' ? '#d9d9d9' : 'white'}} min="0" placeholder="Budget"></input>
        from
        <input type="date" placeholder="Date" required></input>
        for
        <input type="number" placeholder="nights" min="0" value={numDays} onChange={(e) => setNumDays(parseInt(e.target.value))} required></input>
        night(s)
        <br></br>
        <button type="submit">Travel!</button>
      </form>
      {countries.map((country) => (
        <div key={country.id}>
          <h3>{country.name}</h3>
          <p>{country.description}</p>
          <p>Price: <b>{country.budget * numDays} EGP</b> for {numDays} night(s)</p>
        </div>
      ))}
    </div>
  );
}

export default Header;