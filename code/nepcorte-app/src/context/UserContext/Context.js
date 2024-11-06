import createDataContext from '../createDataContext';
import Reducer from './Reducer';
import { SetEmail, Login, Logout, SetAuthenticated, Register, SendEmailToken, ChangePassword, GetUser } from './Actions'; 

// Initial States from Sorting.
const initialState = { 
    email: '',
    token: '',
    modalVisible: false,
    loading: false,
    user:'',
    isAuthenticated: false,
};

export const { Context, Provider } = createDataContext(
    Reducer,
    { SetEmail, Login, Logout, SetAuthenticated, Register, SendEmailToken, ChangePassword, GetUser },
    initialState
);