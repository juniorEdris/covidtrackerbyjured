import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import LineGraph from './LineGraph'
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core";
import { sortData, prettyPrintStat } from './util';
import 'leaflet/dist/leaflet.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:34.80746,lng:-40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(res => res.json())
    .then(data => {
      setCountryInfo(data)
    });
  },[])
  
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United State, United Kingdom, France
            value: country.countryInfo.iso2, //USA, UK, FR
          }));

          const sortedData = sortData(data);
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) =>{
    const countryCode = event.target.value;
    // setCountry(countryCode);
    const url = countryCode === 'worldwide'
    ? 'https://disease.sh/v3/covid-19/all'
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    
     await fetch(url)
     .then(res => res.json())
     .then(data =>{
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
        setMapZoom(4)
      });
      // 3.28.40
      
    }

    
  return (

    <div className="app">
      {/*BEM naming convension*/}
        <div className='app_left'>

          <div className="app_header">
            <h1>Covid 19 Tracker <span>(Developed by Jr Edris)</span></h1>
            <FormControl className="app_dropdown">
              <Select varient="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>

                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className='app_stats'>
              <InfoBox
              isRed= {casesType === "cases"}
              active={casesType === "cases"} 
              onClick={e => setCasesType('cases')} 
              title='Coronavirus Cases' 
              cases={prettyPrintStat(countryInfo.todayCases)} 
              total={prettyPrintStat(countryInfo.cases)}
              />
              <InfoBox
              isnotRed
              active={casesType === "recovered"} 
              onClick={e =>setCasesType('recovered')} 
              title='Recovered' 
              cases={prettyPrintStat(countryInfo.todayRecovered)} 
              total={prettyPrintStat(countryInfo.recovered)}
              />
              <InfoBox
              isRed={casesType === "deaths"}
              active={casesType === "deaths"} 
              onClick={e => setCasesType('deaths')} 
              title='Death' cases={prettyPrintStat(countryInfo.todayDeaths)} 
              total={prettyPrintStat(countryInfo.deaths)}
              />
          </div>
          {/* Map */}
          <Map 
          casesType={casesType}
          countries ={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          />

          </div>
          <Card className='app_right'>
            <CardContent>
            {/* Table */}
            <h3 className='app_table_heading'>Live Cases by Countries</h3>
            <Table countries={tableData}/>
            {/* Graph */}
                <h3  className='app_graph_heading'>Worldwide New {casesType}</h3>
            <LineGraph className='app_graph' casesType={casesType}/>
            </CardContent>
          </Card>
    </div>
  );
}

export default App;

