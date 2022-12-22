import toast from 'react-hot-toast';
import ApiService from '../../../utils/api_service/api_service';
import Session from "../../../utils/session/session";
import { VisitTypes } from '../visits_types/visits_types';
const apiService = new ApiService();

const session = new Session();

const viewPatientVisits = (uuid: string): Promise<Array<VisitTypes>> => {
    const url = `${process.env.REACT_APP_ENDPOINT}${process.env.REACT_APP_VISITS_ENDPOINT}?patient=${uuid}`;
    // fetch the base64 auth from localStorage
    const base64 = session.getUserSession().base64;
    // Add Authorization and Cookie header
    const header = {
        Authorization: `Basic ${base64}`
    }
    // Show loading toast
    const loadToastId = toast.loading('Searching Patient Visits...');
    // Send API Request
    return apiService.SendRequest({ url: url, method: "GET", headers: header }).then(async (response) => {
        const resp = await response.json();
        const results: Array<VisitTypes> = resp.results;
        if (results.length > 0) {
            // Show user success toast message
            toast.success('Search Completed.', { id: loadToastId });
            return results;
        }
        // Show user warning toast message
        toast.error('Visits Not Found.', { id: loadToastId });
        return [];
    }).catch((e) => {
        // Show user error toast message
        toast.error(`${e}`, { id: loadToastId });
        return [];
    })
}

export default viewPatientVisits;