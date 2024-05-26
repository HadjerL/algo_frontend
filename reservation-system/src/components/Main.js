import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import '../main.css';
import axios from 'axios';

function Main() {
  const [formData, setFormData] = useState({
    departure: '',
    arrival: '',
    departure_date: '',
    departureTime: '',
    arrival_date: '',
    arrivalTime: '',
    classe: 'Economy'
  });
  
  const [searchResults, setSearchResults] = useState([ ]);
  const [searchResult, setSearchResult] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotFound(false);
    const formattedDepartureDate = formData.departure_date !== '' ? new Date(`${formData.departure_date}T${formData?.departureTime}:00.000Z`).toISOString() : '';
    const formattedArrivalDate = formData.arrival_date !== '' ? new Date(`${formData?.arrival_date}T${formData?.arrivalTime}:00.000Z`).toISOString() : '';

    const params = new URLSearchParams({
      departure: formData.departure,
      arrival: formData.arrival,
      departure_date: formattedDepartureDate,
      arrival_date: formattedArrivalDate,
      classe: formData.classe.charAt(0).toUpperCase() + formData.classe.slice(1) // Capitalize the first letter
    }).toString();

    setSearchResult(true)
    axios.get(`https://alog-backend-search-service.onrender.com/search?${params}`)
      .then(response => {
        console.log('Endpoint submitted successfully:', response.data);
        setSearchResults(response.data); // Update search results
        setSearchResult(false);
        if(response.data.length === 0){
          setNotFound(true);
        }
      })
      .catch(error => {
        console.error('There was an error submitting the endpoint form:', error);
      });
  };
 
 
 
  const columns = [
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Departure Date',
      selector: row => new Date(row.departure_date).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Arrival Date',
      selector: row => new Date(row.arrival_date).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Departure',
      selector: row => row.departure,
      sortable: true,
    },
    {
      name: 'Arrival',
      selector: row => row.arrival,
      sortable: true,
    },
    {
      name: 'Classe',
      selector: row => row.classe,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true,
    },
  ];

  return (
    <div className='search-container'>
      <div className='container'>
        <h2>Search Plan</h2>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="form-group">
            <label>Departure</label>
            <input
              type="text"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Arrival</label>
            <input
              type="text"
              name="arrival"
              value={formData.arrival}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Departure Date</label>
            <div className="date-format">
              <input
                type="date"
                name="departure_date"
                value={formData.departure_date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Arrival Date</label>
            <div className="date-format">
              <input
                type="date"
                name="arrival_date"
                value={formData.arrival_date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Class:</label>
            <select
              name="classe"
              value={formData.classe}
              onChange={handleChange}
            >
              <option value="Economy">Economy</option>
              <option value="Premium">Premium</option>
              <option value="First">First Class</option>
            </select>
          </div>
          <div className="flex-end">
            <button type="submit" className="submit-button">Search</button>
          </div>
        </form>
      
  
          <div className="results-container">
            <h2>Search Results</h2>
            <div className="datatable">
            {searchResults.length > 0 && (
            <DataTable
              columns={columns}
              data={searchResults}
              pagination
            />
            )}
          {searchResult && (
            <p>Loading ... </p>)}
             {notFound  && (        
             <p>No Result Found </p>
           )}
    </div>
          </div>
     
      </div>
    </div>
  );
}

export default Main;
