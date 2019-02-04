import axios, {AxiosResponse} from 'axios';
import {Circle, Marker} from 'rc-here-maps';
import * as React from 'react';
import './App.css';
import {HereGeocoder} from "./here-geocoder";
import MapComponent from "./Map";
import RestaurantComponent, {LocationHere, Restaurant} from "./Restaurant";
import {restaurantMarkersText} from "./RestaurantMarker";


class App extends React.Component {


    public state = {
        restaurants: [new Restaurant('1', 'Name', 'Adresse', '', {Latitude: 0, Longitude: 0})]
    };


    public componentDidMount(): void {
        axios.get<string>('https://schlemmerblock.de/Gutscheinbuch/Karlsruhe-Umgebung-2019')
            .then(value => {
                    const restaurantsWithoutAdresse = this.parseRestaurants(value);
                    const restaurantsWithAdressen = this.buildRestaurantsWithAdressen(restaurantsWithoutAdresse);
                    Promise.all(restaurantsWithAdressen)
                        .then(restaurants => {
                            return this.setState({restaurants: restaurants});
                        });
                }
            );
    }

    public render() {
        const restaurants = this.state.restaurants.map((value: Restaurant) => {
            return <RestaurantComponent {...value} key={value.key}/>
        });
        return (<div>
                <table>
                    <tr>
                        <MapComponent>
                            {restaurantMarkersText(this.state.restaurants)}
                            {/*{restaurantMarkersCircle(this.state.restaurants)}*/}
                        </MapComponent>
                        <table>{restaurants}</table>

                    </tr>
                </table>
            </div>
        );
    }

    public parseRestaurants(value: AxiosResponse<string>) {
        const elementNodeListOf: NodeListOf<HTMLAnchorElement> = new DOMParser().parseFromString(value.data, 'text/html')
            .querySelectorAll('#sbl_block_anbieter_content > div.anbieter_content_liste > div.anbieter_content_liste_line > div.anbieter_content_liste_name > a');
        // @ts-ignore
        const result = new Array<Restaurant>();
        elementNodeListOf.forEach((value1) => {
            const name = value1.textContent.split(',')[0].trim();
            const link = value1.baseURI + value1.pathname;
            const metaData = new Restaurant(name, name, '', link, new LocationHere());
            result.push(metaData);
        })
        return result;
    }

    public buildRestaurantsWithAdressen(restaurants: Restaurant[]): Array<Promise<Restaurant>> {
        return restaurants.map(async restaurant => {
            const result = {...restaurant};
            await axios.get<string>(restaurant.link)
                .then(value => {
                        result.adresse = this.parseAdresse(value);
                        HereGeocoder.setLocation(result.adresse, (loc: LocationHere) => {
                            result.location = loc;
                        })
                    }
                );
            return result;
        })

    }

    public parseAdresse(value: AxiosResponse<string>) {
        const elementNodeListOf = new DOMParser().parseFromString(value.data, 'text/html').querySelector('#sbl_content_main > table > tbody > tr:nth-child(1) > td:nth-child(1)');
        const adresse = elementNodeListOf.textContent.split('Tel.:')[0];
        return adresse;
    }


}

export default App;
