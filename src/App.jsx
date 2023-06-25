import { useEffect, useState } from "react";
import "./App.css";
import "./WheatherContainer.css";
import { BsSearch } from "react-icons/bs";
// const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [apiData, setApiData] = useState({});
  const [inputState, setInputState] = useState("");
  const [searchState, setSearchState] = useState("");

  const apiKey = `3798b33e884811f9b8be4924f71b718b`;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchState}&appid=${apiKey}`;

  console.log(apiData);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setApiData(data);
    };

    fetchData();
  }, [apiUrl]);
  

  const findTemp = (k) => {
    let temp = k - 273;
    temp = temp.toFixed(2);
    return temp;
  }

  const localTime = (utcTime) => {
    const date = new Date(utcTime);
    return date.toLocaleTimeString();
  }

  const inputHandler = (e) => {
    setInputState(e.target.value);
  }

  return (
    <>
      <div className='container'>
        <div className='innerContainer'>
          <h1>WindBuddy</h1>
          <div className='searchBar'>
            <input className='searchInput' type='text' placeholder="Enter the CityName" onChange={inputHandler} value={inputState} />
            <BsSearch className='searchIcon' size={"25px"} onClick={() => (setSearchState(inputState))} />
          </div>
          <div className='CityContainer'>
            <h1>{apiData.name}</h1>
            <div className='cityInnerDiv'>
              <span>
              <img
              src={`http://openweathermap.org/img/w/${apiData.weather && apiData.weather[0].icon}.png`}
              alt="weather status icon"
              className="weather-icon"
            />
              </span>
              <span>
                <h2>{findTemp(apiData.main?.temp)} °C</h2>
                <h2>{apiData.weather && apiData.weather[0]?.description}</h2>
              </span>
            </div>
          </div>
          <div className='weatherInfo'>
            <div className='info'>
              <h3>
                Pressure - <b>{apiData.main?.pressure} hPa</b>
              </h3>
              <h3>
                Humidity - <b>{apiData.main?.humidity} %</b>
              </h3>
              <h3>
                Longitude - <b>{apiData.coord?.lon}</b>
              </h3>
              <h3>
                Latitude - <b>{apiData.coord?.lat}</b>
              </h3>
            </div>
            <div className='suntime'>
              <h2>
                sunrise - <b>{localTime(apiData.sys && apiData.sys.sunrise)}</b>
              </h2>
              <h2>
                sunset - <b>{localTime(apiData.sys && apiData.sys.sunset)}</b>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
