import {BrowserRouter,Routes,Route} from 'react-router'
import Login from './features/auth/pages/login' 
import Registration from './features/auth/pages/Register'

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes