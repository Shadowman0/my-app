// @ts-ignore
import {Circle, HereMap, Marker, PathFinder, Polygon, Polyline, Rectangle} from 'rc-here-maps';
import * as React from "react";
import {Component} from "react";
// @ts-ignore
import {Restaurant} from "./Restaurant";

export default class MapComponent extends Component {
    public state = {
        center: {
            lat: 49.00615,
            lng: 8.41113,
        },
        bounds: {
            north: 53.1,
            south: 13.1,
            east: 43.1,
            west: 40.1,
        }
    }

    constructor(props: any) {
        super(props);


        this.state.bounds = {
            north: 53.1,
            south: 13.1,
            east: 43.1,
            west: 40.1,
        };
    }

    public onPolylineDrawn = () => {
        console.log('polyline drawn');
    };

    public onPolygonDrawn = () => {
        console.log('Polygon drawn');
    };

    public onCircleDrawn = () => {
        console.log('circle drawn');
    };

    public onRectangleDrawn = () => {
        console.log('rectangle drawn');
    };

    public render() {
        const divStyle = {
            width: "1000px",
            height: "1000px",
            display: 'flex'
        };

        return (
            <div className="map-wrapper" style={divStyle}>
                <HereMap appId="7wezXe0q8aDG2eutrtja" appCode="7_C79lIqnij1DbnLZp91Mg" useHTTPS={false}
                         center={this.state.center}>
                    {this.props.children}
                    {/*<Circle*/}
                        {/*center={this.state.center}*/}
                        {/*radius={1000}*/}
                        {/*fillColor="#HexCode"*/}
                        {/*strokeColor="#HexCode"*/}
                        {/*onCircleDrawn={this.onCircleDrawn}*/}
                    {/*/>*/}
                </HereMap>
            </div>
        );
    }
}

