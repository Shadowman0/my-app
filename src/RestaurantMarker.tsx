import {Circle, Marker} from 'rc-here-maps';
import * as React from "react";
import {Restaurant} from "./Restaurant";

export const restaurantMarkersText = (list: Restaurant[]) => list.map((value: Restaurant) => {
    return (
        <Marker key={value.key} {...extractLoc(value)}>
            <b>
                <a style={{color: 'black'}} href={value.link}>{value.name}</a>
            </b>
        </Marker>);
});

let extractLoc = (value: Restaurant) => {
    return {
        lng: value.location.Longitude,
        lat: value.location.Latitude,
    };
};

export const restaurantMarkersCircle = (list: Restaurant[]) => list.map((value: Restaurant) => {
    return (
        <Circle key={value.key}
                center={extractLoc(value)}
                radius={10}
                fillColor="#CD5C5C"
                strokeColor="#HexCode"
        />)
});
