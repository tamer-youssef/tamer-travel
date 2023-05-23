import React from "react";
import Title from "../components/Title";
import axios from "axios";
import { Link } from "react-router-dom";


const TamerTravelURL = "http://localhost:8080/api";

function addCountry(event) {
  event.preventDefault();
  const countryData = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      nationality: document.getElementById("nationality").value,
      currency: document.getElementById("currency").value,
      latitude: document.getElementById("latitude").value,
      longitude: document.getElementById("longitude").value,
      budget: document.getElementById("budget").value
  };

  axios.post(`${TamerTravelURL}/countries/`, countryData)
  .then(response => {
      console.log(response.data);
  })
  .catch(error => {
      console.log(error.response.data);
  });
}

function updateCountry(event) {
  event.preventDefault();
  const countryName = document.getElementById("update-country-name").value;
  const countryData = {};

  // Update only the fields that have been filled in the form
  const description = document.getElementById("update-country-description").value;
  if (description) {
      countryData.description = description;
  }
  const nationality = document.getElementById("update-country-nationality").value;
  if (nationality) {
      countryData.nationality = nationality;
  }
  const currency = document.getElementById("update-country-currency").value;
  if (currency) {
      countryData.currency = currency;
  }
  const latitude = document.getElementById("update-country-latitude").value;
  if (latitude) {
      countryData.latitude = latitude;
  }
  const longitude = document.getElementById("update-country-longitude").value;
  if (longitude) {
      countryData.longitude = longitude;
  }
  const budget = document.getElementById("update-country-budget").value;
  if (budget) {
      countryData.budget = budget;
  }

  axios.put(`${TamerTravelURL}/countries/${countryName}`, countryData)
  .then(response => {
      console.log(response.data);
  })
  .catch(error => {
      console.log(error.response.data);
  });
}

function deleteCountry(event) {
  event.preventDefault();
  const countryName = document.getElementById("delete-country-name").value;

  axios.delete(`${TamerTravelURL}/countries/${countryName}`)
  .then(response => {
      console.log(response.data);
  })
  .catch(error => {
      console.log(error.response.data);
  });
}

function Admin() {
    return (
      <div className="main">
        <Title />
        <div className="content">
          <h3 className="content-header">Add Country</h3>
            <form onSubmit={addCountry}>
              <input id="name" type="text" placeholder="name" required></input><br></br>
              <input id="description" type="text" placeholder="description" required></input><br></br>
              <input id="nationality" type="text" placeholder="nationality" required></input><br></br>
              <input id="currency" type="text" placeholder="currency" required></input><br></br>
              <input id="latitude" type="number" placeholder="latitude" required></input><br></br>
              <input id="longitude" type="number" placeholder="longitude" required></input><br></br>
              <input id="budget" type="number" min="0" placeholder="budget" required></input><br></br>
              <button type="submit">Add Country</button>
            </form>
          <h3 className="content-header">Update Country</h3>
          <form onSubmit={updateCountry}>
              <input id="update-country-name" type="text" placeholder="name"></input><br></br>
              <input id="update-country-description" type="text" placeholder="description"></input><br></br>
              <input id="update-country-nationality" type="text" placeholder="nationality"></input><br></br>
              <input id="update-country-currency" type="text" placeholder="currency"></input><br></br>
              <input id="update-country-latitude" type="number" placeholder="latitude" step="any"></input><br></br>
              <input id="update-country-longitude" type="number" placeholder="longitude" step="any"></input><br></br>
              <input id="update-country-budget" type="number" min="0" placeholder="budget"></input><br></br>
              <button type="submit">Update Country</button>
            </form>
          <h3 className="content-header">Delete Country</h3>
          <form onSubmit={deleteCountry}>
              <input id="delete-country-name" type="text" placeholder="name"></input><br></br>
              <button type="submit">Delete Country</button>
          </form>
        </div>
        <br></br><br></br><br></br><br></br><Link to="/">back to Home</Link>
  </div>  
  );
    }

  export default Admin;