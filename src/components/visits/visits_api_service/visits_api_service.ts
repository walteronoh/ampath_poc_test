import toast from 'react-hot-toast';
import ApiService from '../../../utils/api_service/api_service';
import Session from "../../../utils/session/session";
import { PatientSearchTypes } from '../visits_types/visits_types';
const apiService = new ApiService();

const session = new Session();

const viewPatientVisits = (uuid: string) => {
    const url = `https://kibana.ampath.or.ke/openmrs/ws/rest/v1/visit?patient=uuid`;
    // fetch the base64 auth from localStorage
    const base64 = session.getUserSession().base64;
    // Add Authorization and Cookie header
    const header = {
        Authorization: `Basic ${base64}`
    }
    // Show loading toast
    const loadToastId = toast.loading('Searching Patient Visits...');
    // Send API Request
    apiService.SendRequest({ url: url, method: "GET", headers: header }).then(async (response) => {
        const resp: PatientSearchTypes = await response.json();
        // Show user success toast message
        toast.success('Search Was Completed.', { id: loadToastId });
    }).catch((e) => {
        // Show user error toast message
        toast.error(`${e}`, { id: loadToastId });
    })
}

export default viewPatientVisits;