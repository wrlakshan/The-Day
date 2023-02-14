import React from 'react'
import { useState ,useEffect } from 'react'; 
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export default function DataCard() {

    const API_KEY = "ca8d270187df18cd127f8ba27c9aa041";
    const LAT = "6.9319";
    const LON = "79.8478";

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;
    const [city, setCity] = useState([]);
    const [data, setData] = useState([]);

    async function getData() {
        await fetch(apiUrl)
        .then((response) => response.json())
        .then((response) => {
            setCity(response.city);
            const rows = response.list.map((row, index) => {
                
                let dt = new Date(row.dt_txt)
                let date = `${dt.getDate()}/ ${dt.getMonth()}/ ${dt.getFullYear()}`;
                let time = `${dt.getHours()} : ${dt.getMinutes()} : ${dt.getSeconds()}`;

                let icon = row.weather[0].icon;
                let imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                let temp = row.main.temp;

                if (temp > 28){
                    temp = `🥵 ${temp} ℃ `
                } else if (28 > temp > 25){
                    temp = `🥳 ${temp} ℃ `
                } else {
                    temp = `🥶 ${temp}  ℃ `
                }

                return ({
                    id: index,
                    date: date,
                    time: time,
                    img: imgUrl,
                    cast: row.weather[0].main,
                    sum: row.weather[0].description,
                    temp: temp
                })
            });
            console.log(rows);
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

            <Container maxWidth="fixed" sx={{boxShadow: 1,borderRadius: 2, marginTop: 8}}>
                <Grid container spacing={{lg:4 ,md:2}} >
                    {data.map((weather, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
                            <Card sx={{ Width: 320, height: 180 }}>
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="button" sx={{fontWeight: 550 }}>
                                            {weather.date}
                                        </Typography>
                                        <Typography variant="button" sx={{fontWeight: 550 }}>
                                            {weather.time}
                                        </Typography>
                                    </Stack>
                                    <Divider />
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{marginTop: 4}}>
                                        <Avatar
                                            alt="wether image"
                                            src={`${weather.img}`}
                                            sx={{ width: 72, height: 72 }}
                                        />
                                        <Stack direction="column" justifyContent="space-around" alignItems="flex-start" sx={{width: 140}}>
                                            <Typography  variant="h5" sx={{fontWeight: 600 }}>
                                                {weather.cast}
                                            </Typography>
                                            <Typography  variant="body1" >
                                                {weather.sum}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="subtitle1" sx={{fontWeight: 550 ,marginTop: 3}}>
                                            {weather.temp}
                                        </Typography>
                                    </Stack>
                                    
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid> 
            </Container>
    
        </div>
  )
}
