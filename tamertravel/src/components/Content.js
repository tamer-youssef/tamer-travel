import axios from "axios";
import { useEffect, useState } from "react";

function Content() {
  // TAMER TRAVEL API
  const TamerTravelAPI = `http://localhost:8080/api`
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get(`${TamerTravelAPI}/countries`)
    .then(response => {
      Promise.all(
        response.data.map((country) => {
          return axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country.nationality}`)
          .then((mealResponse) => {
            if (mealResponse.data.meals != null) {
              country.meal = mealResponse.data;
              console.log(country.meal)
            } 
            else {
              mealResponse.data = {"meals" : [{strMeal: "not found"}]}
              country.meal = mealResponse.data;
            }

          return axios.get(`https://api.exchangerate.host/convert?from=${country.currency}&to=EGP&amount=1`)
          .then ((currencyResponse) => {
            country.exchangeRate = currencyResponse.data;

          return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${country.latitude}&longitude=${country.longitude}&current_weather=true`)
          .then ((weatherResponse) => {
            country.weather = weatherResponse.data

          return country;
          });
          })
        })
      })
      )
      .then((allResponses) => {
        setCountries(allResponses);
        console.log(allResponses);
      })
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

    return (
      <div>
        {countries.map(({name, description, currency, budget, meal, exchangeRate, weather},) => {
        return(
            <div className="content">
              <h2 className="content-header">{name}</h2>
              <div>
                <p className="content-description">{description}</p>
                <p className="content-weather">
                  <p>The temperature in {name} is currently <b>{weather.current_weather.temperature}°C</b> </p>
                </p>
                <div className="content-food">
                  <p>{name}'s most popular meal is <b>{meal.meals.length > 0 ? meal.meals[0].strMeal : ""}</b> </p>
                </div>
                <br></br>
                <div className="content-currency">
                  <p><b>Exchange Rate</b> 1 {currency} = {exchangeRate.result}  EGP</p>
                </div>
                <p className="content-price"><b>Total Price:</b> {budget} EGP/night</p>
              </div>
            </div>
        );
        })}
      </div>
    );
}

export default Content;