import { isEmpty, isNil, omit } from 'lodash';

import axios from '../shared/axios.utils';

/**
 * Location API using Axios instance.
 */
export class LocationAPI {

    /**
     * fetch all Smartmile public locations and return it.
     */
    async getAll() {
        
        if (isNil(axios)) {
            // throw an error if axios was not correctly created.
            throw new Error('HTTP instance not found');
        }

        // destruction assigment to get direct the locations after fecthing all of them.
        const { data: { locations } } = await axios.get('public/locations');

        if (isEmpty(locations)) {
            return [];
        } else {
            // Omitting some fields to simplify the object;
            return locations.map(location => ({
                id: location.id,
                name: location.name,
                address: {
                    street: location.apt[0].UniAddress.line2,
                    cityAndPostcode: location.apt[0].UniAddress.line3,
                    country: location.apt[0].UniAddress.country,
                    longitude: location.apt[0].UniAddress.longitude,
                    latitude: location.apt[0].UniAddress.latitude
                },
                hours: omit(location.apt[0].UniOpeningHour, 'id')
            }))
        }

    }
}

export default new LocationAPI();