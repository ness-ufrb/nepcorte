import createDataContext from '../createDataContext';
import Reducer from './Reducer';
import { 
    Login, Logout, SetAuthenticated, 
    Register, SendEmailToken, ChangePassword, 
    GetUser, UserEdit 
} from './Actions'; 

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
    { 
        Login, Logout, SetAuthenticated, 
        Register, SendEmailToken, ChangePassword, 
        GetUser, UserEdit
    },
    initialState
);