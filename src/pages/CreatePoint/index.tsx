import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';

import './CreatePoint.css';
import logo from '../../assets/logo.svg';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data)
    })
  }, []);

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

          <Map center={[59.189180, 17.619574]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[59.189180, 17.619574]} />
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
              <select name="uf" id="uf">
                <option value="0">Select a State</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city">
                <option value="0">Select a city</option>
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
