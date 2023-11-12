import Login from './pages/login/Login';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './pages/users/Users';
import ChangeUser from './pages/changeUser/ChangeUser';
import PrivateRoute from './components/PrivateRoute/PrivateRouter';
import { Navigate } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<PrivateRoute />}>
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Users />} />
                </Route>

                <Route path="/changeUser/:id" element={<PrivateRoute />}>
                    <Route path="/changeUser/:id" element={<ChangeUser />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
