import * as React from "react";

export class Restaurant {
    constructor(public key: string, public name: string, public adresse: string, public link: string, public location: string) {

    }
}

const restaurantComponent = (props: Restaurant) => {
    const cardstyle = {
        border: '3px solid black',
        margin: 'auto',
        padding: '10px',
        width: '50%'
    }
    return (
    <div className="card" style={cardstyle}>
            <div className={'card-body'}>
                <h5 className={'card-title'}>
                    {props.name}
                </h5>
                <p className={'card-text'}>
                    {props.adresse}
                </p>
                <p className={'card-text'}>
                    {props.link}
                </p>
            </div>
        </div>
    )
}


export default restaurantComponent;
