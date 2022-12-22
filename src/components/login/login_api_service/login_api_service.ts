import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ApiService from "../../../utils/api_service/api_service";
import Session from "../../../utils/session/session";
import { LoginServiceTypes, LoginTypes } from "../login_types/login_types";
const apiService = new ApiService();
const session = new Session();

const loginUser = (data: LoginTypes) => {
    const url = `${process.env.REACT_APP_ENDPOINT}${process.env.REACT_APP_LOGIN_ENDPOINT}`;
    // Convert the login data to Base64 using format 'username:password'
    const base64 = window.btoa(`${data.username}:${data.password}`);
    // Add Authorization header
    const header = {
        Authorization: `Basic ${base64}`
    }
    // Show loading toast
    const loadToastId = toast.loading('Authentication In Progress...');
    // Send API Request
    return apiService.SendRequest({ url: url, method: "GET", headers: header }).then(async (response) => {
        const resp: LoginServiceTypes = await response.json();
        if (resp.authenticated) {
            const storageData = {
                sessionId: resp.sessionId,
                uuid: resp.user.uuid,
                display: resp.user.display,
                base64: base64
            }
            // Store data in localStorage
            session.setUserSession(storageData);
            // Show user success toast message
            toast.success('Authentication Successful.', { id: loadToastId });
            return true;
        } else {
            // Show user error toast message
            toast.error('Authentication Error. Please Enter Your Correct Credentials.', { id: loadToastId });
            return false;
        }
    }).catch((e) => {
        // Show user error toast message
        toast.error(`${e}`, { id: loadToastId });
        return false;
    })
}

export default loginUser;