import toast from 'react-hot-toast';
import ApiService from '../../../utils/api_service/api_service';
import Session from "../../../utils/session/session";
import { VitalTypes } from '../vitals_types/vitals_types';
const apiService = new ApiService();

const session = new Session();

const viewPatientVitals = (uuid: string): Promise<Array<VitalTypes>> => {
    const concepts = '5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5092AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,1343AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5242AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5283AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    const url = `${process.env.REACT_APP_ENDPOINT}${process.env.REACT_APP_VITALS_ENDPOINT}?patient=${uuid}&concepts=${concepts}&v=full`;
    // fetch the base64 auth from localStorage
    const base64 = session.getUserSession().base64;
    // Add Authorization and Cookie header
    const header = {
        Authorization: `Basic ${base64}`
    }
    // Show loading toast
    const loadToastId = toast.loading('Searching Patient Vitals...');
    // Send API Request
    return apiService.SendRequest({ url: url, method: "GET", headers: header }).then(async (response) => {
        const resp = await response.json();
        const results: Array<VitalTypes> = resp.results;
        if (results.length > 0) {
            // Show user success toast message
            toast.success('Search Completed.', { id: loadToastId });
            return results.sort();
        }
        // Show user warning toast message
        toast.error('Vitals Not Found.', { id: loadToastId });
        return [];
    }).catch((e) => {
        // Show user error toast message
        toast.error(`${e}`, { id: loadToastId });
        return [];
    })
}

export default viewPatientVitals;