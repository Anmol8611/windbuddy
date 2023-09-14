import { useEffect, useState } from "react";
import "./App.css";
import "./WheatherContainer.css";
import { FaSearch } from "react-icons/fa";
// const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [apiData, setApiData] = useState({});
  const [inputState, setInputState] = useState("");
  const [searchState, setSearchState] = useState("Ranchi");

  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentData, setCurrentData] = useState({});

  const apiKey = `3798b33e884811f9b8be4924f71b718b`;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchState}&appid=${apiKey}`;

  // console.log(apiData);

  // preLoader
  const [loading, setLoading] = useState(false);
  // useEffect(()=>{
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // },[])

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setApiData(data);
      setLoading(false);
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
  const currentDate = `${day} / ${month} / ${year}`;

  // method to get current time

  // const getCurrentTime = () => {
  //   let hh = d.getHours();
  //   let mm = d.getMinutes();
  //   let ss = d.getSeconds();
  //   let session = "AM";

  //   if(hh == 0) {
  //     hh = 12;
  //   }
  //   if ( hh > 12 ) {
  //     hh = hh - 12;
  //     session = "PM";
  //   }

  //   hh = (hh < 10) ? "0" + hh : hh;
  //   mm = (mm < 10) ? "0" + mm : mm;
  //   ss = (ss < 10) ? "0" + ss : ss;

  //   setCurrentTime(() => {
  //     currentTime();
  //   }, 1000);

  //   setInterval(() => {
  //     setCurrentTime(getCurrentTime());
  //   }, 1000);

  //   return `${hh} : ${mm} : ${ss}`;
  // }

  // getCurrentPosition
  // navigator.geolocation.getCurrentPosition(res, rej, option).then(res => console.log(res))
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        searchCoords(position.coords.latitude, position.coords.longitude);
        setPermission(true);
      });
    } else {
      setPermission(false);
    }
  }, []);

  const searchCoords = async (lat, lon) => {
    const coordsData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`
    );

    const data = await coordsData.json();
    setCurrentData(data);
    // console.log(data);
  };

  const refreshClock = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <>
      <div className='container'>
        {loading ? (
          <div
            className='innerContainer'
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className='loaderGif'></div>
            <h3
              style={{
                color: "#ff8400",
                fontWeight: "300",
                fontSize: "10px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Your current location wil be displayed on the App <br></br> & used
              for calculating Real time weather.
            </h3>
            <h4
              style={{
                color: "#ff8800",
              }}
            >
              --- Okk Darling? ---
            </h4>
          </div>
        ) : (
          <div className='innerContainer'>
            <div>
              <h1>WindBuddy</h1>
            </div>
            <div className='searchBar'>
              <input
                className='searchInput'
                id='searchInput'
                type='text'
                placeholder='Enter the CityName'
                onChange={inputHandler}
                value={inputState}
              />
              <FaSearch
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
                <span className='cityTemp'>
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

              {permission === false ? (
                <div
                  className='localtime'
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#c2b7b1",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    --- Geolocation not available ---
                  </p>
                </div>
              ) : (
                <div className='localtime'>
                  <div>
                    <h2>
                      <span>Your Location :</span>{" "}
                      <b>
                        {currentData.name}, {currentData.sys?.country}
                      </b>
                    </h2>
                    <h2>
                      <span>Temperature :</span>{" "}
                      <b>
                        {currentData.main?.temp} °C (
                        {currentData.weather &&
                          currentData.weather[0]?.description}
                        )
                      </b>
                    </h2>
                    <h2>
                      <span>Date :</span> <b>{currentDate}</b>
                    </h2>
                    <h2>
                      <span>Time :</span>{" "}
                      <b>{currentTime.toLocaleTimeString()}</b>
                    </h2>
                  </div>
                  <p>
                    ---Your current location is being displayed on the App{" "}
                    <br></br> & used for calculating Real time weather.---
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: "30px",
            padding: "10px 30px",
            backgroundColor: "#020b13d5",
            borderRadius: "10px",
            width: "1100px",
            boxShadow: "0 8px 32px 0 rgba(193, 208, 227, 0.655)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              color: "white",
            }}
          >
            Developed by{" "}
            <a
              style={{
                color: "#ff8400",
                textDecoration: "none",
              }}
              href='https://www.linkedin.com/in/anmol-kumar-a7593125b/'
              target='_blank'
            >
              @Anmol Kumar
            </a>
          </p>
          <p
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            <a
              style={{
                color: "#ff8400",
                textDecoration: "none",
                transition: "0.2s all",
              }}
              href='https://github.com/Anmol8611/windbuddy'
              target='_blank'
            >
              Github
            </a>{" "}
            <a
              style={{
                color: "#ff8400",
                textDecoration: "none",
              }}
              href='https://twitter.com/AnmolDotX'
              target='_blank'
            >
              Twitter
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
