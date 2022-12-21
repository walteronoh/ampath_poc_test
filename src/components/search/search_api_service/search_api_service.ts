import toast from 'react-hot-toast';
import ApiService from '../../../utils/api_service/api_service';
import Session from "../../../utils/session/session";
import { PatientSearchTypes } from '../search_types/search_types';
const apiService = new ApiService();

const session = new Session();

const searchUser = (name: string): Promise<Array<PatientSearchTypes>> => {
    const url = `https://kibana.ampath.or.ke/openmrs/ws/rest/v1/patient?q=${name}&v=full`;
    // fetch the base64 auth from localStorage
    const base64 = session.getUserSession().base64;
    // Add Authorization and Cookie header
    const header = {
        Authorization: `Basic ${base64}`
    }
    // Show loading toast
    const loadToastId = toast.loading('Searching...');
    // Send API Request
    return apiService.SendRequest({ url: url, method: "GET", headers: header }).then(async (response) => {
        const resp = await response.json();
        const results: Array<PatientSearchTypes> = resp.results;
        if (results.length > 0) {
            // Show user success toast message
            toast.success('Search Completed.', { id: loadToastId });
            return results;
        }
        // Show user warning toast message
        toast.error('Patient Not Found.', { id: loadToastId });
        return [];
    }).catch((e) => {
        // Show user error toast message
        toast.error(`${e}`, { id: loadToastId });
        return [];
    })
}

export default searchUser;