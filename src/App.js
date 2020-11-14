import React , {useState} from 'react';
import './App.css';

const api = {
	key: '1370eb8e861e9bd00de236f6108000eb',
	base: 'https://api.openweathermap.org/data/2.5/',
};

const dateBuilder = (d) => {
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return ` ${day} ${date} ${month} ${year}`;
};

const App = () => {

   const [query , setQuery] = useState('')
   const [weather , setWhether] = useState({})


   const search = evt => {
	   if(evt.key === "Enter"){
		   fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
		   .then(res => res.json())
		   .then(result => {
			setWhether(result)
			setQuery('')
			console.log(result)
		   })
	   }
   }

	return (
		<>
			<div className={(typeof weather.name != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
				<main>
					<div className="search-box">
						<input type="text" className="search-bar" placeholder="search..." 
						 onChange={(e)=> setQuery(e.target.value)}
						 value={query}
						 onKeyPress={search}
						/>

					</div>
					{(typeof weather.name != 'undefined') ? (
					<>
					<div className="location-box">
	                    <div className="location">{weather.sys.country}</div>
						<div className="date">{dateBuilder(new Date())}</div>
					</div>
					<div className="whether-box">
						<div className="temp">
							{Math.round(weather.main.temp)}C
						</div>
					<div className="whether">{weather.weather[0].main}</div>
					</div>
					</>
	               ) : ('')}
				</main>
			</div>
		</>
	);
};
export default App;
