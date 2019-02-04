import axios from "axios";

export class HereGeocoder {

    static setLocation(adresse: string, func: any) {
        return axios.get("https://geocoder.api.here.com/6.2/geocode.json?app_id=7wezXe0q8aDG2eutrtja&app_code=7_C79lIqnij1DbnLZp91Mg&" +
            "searchtext="+adresse
        ).then(value => {
            const position = value.data.Response.View[0].Result[0].Location.DisplayPosition;
            func(position);
        })
    }
}
