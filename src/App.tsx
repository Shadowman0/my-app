import axios, {AxiosResponse} from 'axios';
import * as React from 'react';
import './App.css';

import RestaurantComponent, {Restaurant} from "./Restaurant";

class App extends React.Component {


    public state = {
        restaurants: [new Restaurant('1', 'Name', 'Adresse', '', 'test')]
    };

    public componentDidMount(): void {
        axios.get<string>('https://schlemmerblock.de/Gutscheinbuch/Karlsruhe-Umgebung-2019')
            .then(value => {
                    const restaurantsWithoutAdresse = this.parseRestaurants(value);
                    const restaurantsWithAdressen = this.buildRestaurantsWithAdressen(restaurantsWithoutAdresse);
                    Promise.all(restaurantsWithAdressen)
                        .then(res => this.setState({restaurants: res}));
                    // this.setState({restaurants: restaurantsWithAdressen});
                    console.log(this.state.restaurants);
                }
            );
    }


    public render() {
        const restaurants = this.state.restaurants.map((value: Restaurant) => {
            return <RestaurantComponent {...value} key={value.key}/>
        });
        return (
            <div className="App">
                {restaurants}
            </div>

        );
    }

    public parseRestaurants(value: AxiosResponse<string>) {
        const elementNodeListOf: NodeListOf<Element> = new DOMParser().parseFromString(value.data, 'text/html')
            .querySelectorAll('#sbl_block_anbieter_content > div.anbieter_content_liste.marker_2zu1-restaurant > div.anbieter_content_liste_line > div.anbieter_content_liste_name > a');
        // @ts-ignore
        const result = new Array<Restaurant>();
        elementNodeListOf.forEach((value1) => {
            // @ts-ignore
            const name = value1.textContent.split(',')[0].trim();
            // @ts-ignore
            const link = value1.baseURI + value1.pathname;
            const metaData = new Restaurant(name, name, '', link, '');
            result.push(metaData);
        })
        return result;
    }

    public buildRestaurantsWithAdressen(restaurants: Restaurant[]): Array<Promise<{ name: string; adresse: string; link: string; location: string; key: string }>>{
        return restaurants.map(async restaurant => {
            const result = {...restaurant};
            await axios.get<string>(restaurant.link)
                .then(value => {
                        result.adresse = this.parseAdresse(value);
                    }
                );
            return result;
        })

    }

    public parseAdresse(value: AxiosResponse<string>) {
        const elementNodeListOf = new DOMParser().parseFromString(value.data, 'text/html').querySelector('#sbl_content_main > table > tbody > tr:nth-child(1) > td:nth-child(1)');
        // @ts-ignore
        const string1 = elementNodeListOf.textContent.split('Tel.:')[0];
        // @ts-ignore
        return string1;
    }


}

export default App;
