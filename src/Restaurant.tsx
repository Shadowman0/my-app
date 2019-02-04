import * as React from "react";

export class LocationHere {
    Longitude: number;
    Latitude: number;
}

export class Restaurant {
    constructor(public key: string, public name: string, public adresse: string, public link: string, public location: LocationHere) {

    }
}

const restaurantComponent = (props: Restaurant) => {
    const cardstyle = {
        border: '3px solid black',
        margin: 'auto',
        padding: '20px',
        width: '50%'
    }
    return (<tr
        // className="card"
        // style={cardstyle}
    >
            <td className={'card-title'}>
                <a href={props.link}> {props.name}</a>
            </td>
            <td className={'card-text'}>
                {props.adresse}
            </td>
    </tr>)
        {/*<div className="card" style={cardstyle}>*/}
            {/*<div className={'card-body'}>*/}
                {/*<h5 className={'card-title'}>*/}
                    {/*<a href={props.link}> {props.name}</a>*/}

                {/*</h5>*/}
                {/*<p className={'card-text'}>*/}
                    {/*{props.adresse}*/}
                {/*</p>*/}
            {/*</div>*/}
        {/*</div>*/}
}


export default restaurantComponent;
