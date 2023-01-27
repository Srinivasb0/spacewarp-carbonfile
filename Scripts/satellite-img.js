import fs from 'fs';
import fetch from "node-fetch";

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjM2ZhMzg0LTJmMzYtNDhlNC1hYjI3LTI2MmIwZjJlNWZhMyIsImtleSI6IjB4OXExMG00IiwiaWF0IjoxNjY0MTQzNDQzfQ.sZAITgYVoi-27sayi6gTR5W4PGgHNybyvjNEW1CfXck"; //this needs to be replaced by the AUTH TOKEn you generate
const revise = new Revise({auth: AUTH_TOKEN});


const API = async function() {
	const url = "http://api.agromonitoring.com/agro/1.0/soil?polyid=635cf25a176fe6831443f2df&appid=b58f66ea030f42fad0c0d3c651b4fbe5"
	const data = await fetch(url).then(response => response.json())
	const soil_data = { 'date' : data['dt'], 'soil-moisture' : data['moisture'], 'soil-temp' : data['t0']}
	// convert unix date to time stamp
	var recorded_date = new Date(soil_data['date']*1000)
	// convert kelvin to celsius
	var soil_temp = Math.round(soil_data['soil-temp'] - 273.15)
	var soil_moisture = Math.round(soil_data['soil-moisture'] * 100)

	var api_data = {
		'recorded_date' : recorded_date,
		'soil_temp' : soil_temp,
		'soil_moisture' : soil_moisture
	}
	var today = new Date();
	var filename = "../data/soil-data/" + 'soil-data-' + today+".json";
	const daily_soil_data = JSON.stringify(api_data)
	fs.writeFileSync(filename, daily_soil_data);
	// return api_data['soil_temp'], api_data['soil_moisture']
}