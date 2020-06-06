import React, { useState, useEffect, ChangeEvent } from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import api, { axios } from '../../services/api';

import './CreatePoint.css';
import logo from '../../assets/logo.svg';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
      setSelectedPosition([latitude, longitude])
    })
  }, []);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data)
    })
  }, []);

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        setUfs(response.data.map(uf => uf.sigla))
      })
  }, [selectedUf]);

  useEffect(() => {
    if(selectedUf === '0') {
      return;
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        setCities(response.data.map(city => city.nome))
      })
  }, [selectedUf]);

  function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>

        <Link to="/">
          <FiArrowLeft />
          Return to home
        </Link>
      </header>

      <form action="">
        <h1>Register Collect Point</h1>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address</span>
          </legend>

          <Map 
            center={initialPosition} 
            zoom={15}
            onclick={handleMapClick}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field">
            <label htmlFor="name">Entity name</label>
            <input 
              type="text"
              name="name"
              id="name"
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select an address</span>
          </legend>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">State</label>
              <select 
                name="uf" 
                id="uf" 
                value={selectedUf}
                onChange={handleSelectUF}
              >
                <option value="0">Select a State</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select 
                name="city" 
                id="city" 
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option value="0">Select a city</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        
        <fieldset>
          <legend>
            <h2>Collect Items</h2>
            <span>Select one or more items</span>
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li key={item.id}>
                <img src={item.image_url} alt="Oil"/>
                <span>{item.title}</span>
              </li>
              ))
            }
            
          </ul>
        </fieldset>

        <button type="submit">
          Registe a collect point
        </button>
      </form>
    </div>
  )
}

export default CreatePoint
