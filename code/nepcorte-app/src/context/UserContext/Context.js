import createDataContext from '../createDataContext';
import Reducer from './Reducer';
import { SetEmail, SetPassword, Login, Logout, SetAuthenticated } from './Actions'; 

// Initial States from Sorting.
const initialState = { 
    email: '',
    password: '',
    token: '',
    user:'',
    isAuthenticated: false,
};

export const { Context, Provider } = createDataContext(
    Reducer,
    { SetEmail, SetPassword, Login, Logout, SetAuthenticated },
    initialState
);