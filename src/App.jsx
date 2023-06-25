import { useEffect, useState } from "react";
import "./App.css";
import "./WheatherContainer.css";
import { BsSearch } from "react-icons/bs";
// const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [apiData, setApiData] = useState({});
  const [inputState, setInputState] = useState("Ranchi");
  const [searchState, setSearchState] = useState("Ranchi");

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
  };

  // const localTime = (utcTime) => {
  //   const date = new Date(utcTime);
  //   return date.toLocaleTimeString();
  // };

  const inputHandler = (e) => {
    setInputState(e.target.value);
  };

  const d = new Date();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();

  const hour = d.getHours();
  const minutes = d.getMinutes();
  // const seconds = d.getSeconds();

  const currentDate = `${day} / ${month} / ${year}`
  const currentTime = `${hour} : ${minutes}`;

  // setInterval(() => {
  //   setCurrentTime(`${hour} : ${minutes} : ${seconds}`);
  // }, 1000);

  return (
    <>
      <div className='container'>
        <div className='innerContainer'>
          <h1>WindBuddy</h1>
          <div className='searchBar'>
            <input
              className='searchInput'
              id='searchInput'
              type='text'
              placeholder='Enter the CityName'
              onChange={inputHandler}
              value={inputState}
            />
            <BsSearch
              className='searchIcon'
              htmlFor='searchInput'
              size={"25px"}
              onClick={() => setSearchState(inputState)}
            />
          </div>
          <div className='CityContainer'>
            <div>
              <h1>{apiData.name}</h1>
              <h2>{apiData.sys?.country}</h2>
            </div>
            <div className='cityInnerDiv'>
              <span>
                <img
                  src={`http://openweathermap.org/img/w/${
                    apiData.weather && apiData.weather[0].icon
                  }.png`}
                  alt='weather status icon'
                  className='weather-icon'
                />
              </span>
              <span className="cityTemp">
                <h2>{findTemp(apiData.main?.temp)} °C</h2>
                <h2>{apiData.weather && apiData.weather[0]?.description}</h2>
              </span>
            </div>
          </div>
          <div className='weatherInfo'>
            <div className='info'>
              <h3>
                <span>Pressure</span> <b>{apiData.main?.pressure} hPa</b>
              </h3>
              <h3>
                <span>Humidity</span> <b>{apiData.main?.humidity} %</b>
              </h3>
              <h3>
                <span>WindSpeed</span> <b>{apiData.wind?.speed} Km/h</b>
              </h3>
              <h3>
                <span>Visibility</span> <b>{apiData.visibility} mi</b>
              </h3>
            </div>
            <div className='localtime'>
              <h2>
                <span>Date</span> <b>{currentDate}</b>
              </h2>
              <h2>
                <span>Loaded Time</span> <b>{currentTime}</b>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
