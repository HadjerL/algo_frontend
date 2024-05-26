import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [step, setStep] = useState(1);
  const [airlineData, setAirlineData] = useState({ name: '', baseURL: '' });
  const [paramsData, setParamsData] = useState({ departure: '', arrival: '', departure_date: '', arrival_date: '', classe: '',endpointId:'' });
  const [endpointData, setEndpointData] = useState({ path: '',airlineId:'' });
  const [responseMappingData, setResponseMappingData] = useState({ id: '', description: '', departure: '', arrival: '', departure_date: '', arrival_date: '', classe: '',price:'',endpointId:'',airlineId:'' });

  const handleNextStep = () => {
    setStep(step + 1);
  };



  const handleSubmitAirline = (e) => {
    e.preventDefault();
    handleNextStep();
    axios.post('https://service-registery-flight-reservation.onrender.com/airlines', airlineData)
    .then(response => {
      console.log('Airline submitted successfully:', response.data);
      const airlineId = response.data.data.id; // Access the id from response.data.data
      setEndpointData(prevData => ({
        ...prevData,
        airlineId: airlineId
      }));
      setResponseMappingData(prevData => ({
        ...prevData,
        airlineId: airlineId
      }));
      handleNextStep();
    })
    .catch(error => {
      console.error('There was an error submitting the airline form:', error);
    });
  };
  const handleSubmitEndpoint = (e) => {
    e.preventDefault();
    handleNextStep();
    axios.post('https://service-registery-flight-reservation.onrender.com/endpoints', endpointData)
      .then(response => {
        console.log('Endpoint submitted successfully:', response.data);
        const endpointId = response.data.data.id; 
        setParamsData(prevData => ({
          ...prevData,
          endpointId: endpointId
        }));
        setResponseMappingData(prevData => ({
          ...prevData,
          endpointId: endpointId
        }));
        handleNextStep();
      })
      .catch(error => {
        console.error('There was an error submitting the endpoint form:', error);
      });
  };

  const handleSubmitParams = (e) => {
    e.preventDefault();
    handleNextStep();
    axios.post('https://service-registery-flight-reservation.onrender.com/params', paramsData)
      .then(response => {
        console.log('Params submitted successfully:', response.data);
        handleNextStep();
      })
      .catch(error => {
        console.error('There was an error submitting the endpoint form:', error);
      });
  };

  const handleSubmitResponseMapping = (e) => {
    e.preventDefault();
    axios.post('https://service-registery-flight-reservation.onrender.com/response', responseMappingData)
      .then(response => {
        console.log('Response Mapping submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error submitting the response mapping form:', error);
      });
  };

  return (
    <div className="main">
      <div className="form-container">
        {step === 1 && (
          <form onSubmit={handleSubmitAirline} className='form1' >
            <h2>Add Airline</h2>
            <div>
              <label>Airline Name:</label>
              <input
                type="text"
                value={airlineData.airlineName}
                onChange={(e) => setAirlineData({ ...airlineData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Base URL:</label>
              <input
                type="text"
                value={airlineData.baseUrl}
                onChange={(e) => setAirlineData({ ...airlineData, baseURL: e.target.value })}
                required
              />
            </div>
            <button type="submit">Suivant</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmitEndpoint} className='form2' >
            <h2>Add Endpoint</h2>
            <div>
              <label>Path:</label>
              <input
                type="text"
                value={endpointData.path}
                onChange={(e) => setEndpointData({ ...endpointData, path: e.target.value })}
                required
              />
            </div>
            <button type="submit">Suivant</button>
          </form>
        )}
         {step === 3 && (
          <form onSubmit={handleSubmitParams} className='form2' >
            <h2>Add Params</h2>
            <div>
              <label>Departure:</label>
              <input
                type="text"
                value={paramsData.departure}
                onChange={(e) => setParamsData({ ...paramsData, departure: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Arrival:</label>
              <input
                type="text"
                value={paramsData.arrival}
                onChange={(e) => setParamsData({ ...paramsData, arrival: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Departure Date:</label>
              <input
                type="text"
                value={paramsData.departure_date}
                onChange={(e) => setParamsData({ ...paramsData, departure_date: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Arrival Date:</label>
              <input
                type="text"
                value={paramsData.arrival_date}
                onChange={(e) => setParamsData({ ...paramsData, arrival_date: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Class:</label>
              <input
                type="text"
                value={paramsData.classe}
                onChange={(e) => setParamsData({ ...paramsData, classe: e.target.value })}
                required
              />
            </div>
            <button type="submit">Suivant</button>
          </form>
        )}


        {step === 4 && (
          <form onSubmit={handleSubmitResponseMapping} className='form3' >
            <h2>Add Response Mapping</h2>
            <div>
              <label>ID:</label>
              <input
                type="text"
                value={responseMappingData.id}
                onChange={(e) => setResponseMappingData({ ...responseMappingData, id: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={responseMappingData.description}
                onChange={(e) => setResponseMappingData({ ...responseMappingData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="text"
                value={responseMappingData.price}
                onChange={(e) => setResponseMappingData({ ...responseMappingData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Departure:</label>
              <input
                type="text"
                value={responseMappingData.departure}
                onChange={(e) => setResponseMappingData({ ...responseMappingData, departure: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Arrival:</label>
              <input
                type="text"
                value={responseMappingData.arrival}
                onChange={(e) => setResponseMappingData({ ...responseMappingData, arrival: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Departure Date:</label>
              <input
                type="text"
                value={responseMappingData.departure_date}
                onChange={(e) => setResponseMappingData({ ...responseMappingData, departure_date: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Arrival Date:</label>
              <input
                type="text"
                value={responseMappingData.arrival_date}
                onChange={(e) => setResponseMappingData({ ...responseMappingData, arrival_date: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Class:</label>
              <input
                type="text"
                value={responseMappingData.classe}
                onChange={(e) => setResponseMappingData({ ...responseMappingData, classe: e.target.value })}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
