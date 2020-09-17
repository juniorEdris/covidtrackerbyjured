import React from 'react'
import './Map.css'
import {showDataOnMap} from './util'
import { Map as LeafLetMap, TileLayer } from 'react-leaflet'

export default function Map({countries,center, zoom, casesType}) {
    return (
        <div className="map">
            {/* <h2>I am a Map</h2> */}
            <LeafLetMap center={center} zoom={zoom}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
                />

                {showDataOnMap(countries,casesType)}
            </LeafLetMap>

            
            
        </div>
    )
}
