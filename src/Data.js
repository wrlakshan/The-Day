import React from 'react';
import { useState ,useEffect } from 'react'; 
import { DataGrid } from '@mui/x-data-grid';
import './App.css';

const RenderCast = (props) =>{
    let icon = props?.formattedValue.icon
    let imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    return(
        <>
            {props?.formattedValue.main}<span> &nbsp; &nbsp; </span>
            <div style={{ border: "1px solid ",borderRadius: "50%",borderColor: "#BFEAF5" }}>
                <img id="wicon" src={`${imgUrl}`} alt="Weather icon" height={"30px"}/>
            </div>
        </>
    )
}

const RenderTemp = (props) => {
    let icon = <span role="img" aria-label="sheep">😀</span>;
    let bgColor = '';

    if (props?.formattedValue > 28){
        icon = <span role="img" aria-label="sheep">🥵</span>;
        bgColor = "#FF0032"
    } else if (28 > props?.formattedValue > 25){
        icon = <span role="img" aria-label="sheep">🥳</span>;
        bgColor = "#FDFDBD"
    } else {
        icon = <span role="img" aria-label="sheep">🥶</span>;
        bgColor = "#86E5FF";
    }
    return(
        <div style={{ border: "1px solid ",borderRadius: "5px", padding: "5px",backgroundColor: `${bgColor}` , color: "white" }}>
            {props?.formattedValue} <span> &nbsp; ℃ &nbsp;</span>
            {icon}
        </div>
    )
}

const columns = [
  { field: 'date', headerName: 'Date/Time', width: 250 },
  { field: 'cast', headerName: 'Forecast', width: 250, renderCell: RenderCast },
  { field: 'sum', headerName: 'Summary', width: 300 },
  { field: 'temp', headerName: 'Temperature', width: 150, renderCell: RenderTemp },
];
 
const API_KEY = "ca8d270187df18cd127f8ba27c9aa041";
const LAT = "6.9319";
const LON = "79.8478";

const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

export default function Data() {

    const [city, setCity] = useState([]);
    const [data, setData] = useState([]);

    async function getData() {
        await fetch(apiUrl)
        .then((response) => response.json())
        .then((response) => {
            console.log(response.list)
            setCity(response.city);
            const rows = response.list.map((row, index) => {
                
                return ({
                    id: index,
                    date: row.dt_txt,
                    cast: row.weather[0],
                    sum: row.weather[0].description,
                    temp: row.main.temp
                })
            });
            setData(rows)
        })
        .catch(error => console.log("Error: ",error))

    }

    useEffect(() => {

        getData(); 
        
    },[]);

    return (
        <div style={{ height: '90vh', width: '100%' }}>
            <div className='head'>
                <h1>Weather forecast for {city.name}</h1>
                <h3>Population: {city.population} 🐑</h3>
            </div>
            <DataGrid rows={data} columns={columns} />
        </div>
  );
}
