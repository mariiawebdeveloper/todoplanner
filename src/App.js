import './App.css';
import { Route, Routes } from "react-router";
import Menu from "./components/Menu";
import Header from "./components/Header";
import LoginPage from "./components/user/LoginPage";
import Main from "./components/user/Main";
import Register from "./components/user/Register";
import TaskPage from "./components/tasks/TaskPage";
import LogOut from "./components/user/LogOut";
import UserPage from "./components/user/UserPage";

function App() {
    return (
        <div className="App">
            <div className="SideMenu">
                <Menu />
            </div>

            <div className="MainContent">
                <div className="Header">
                    <Header />
                </div>

                <div className="Content">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/logout" element={<LogOut />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/todo" element={<TaskPage />} />
                        <Route path="/user" element={<UserPage />} />

                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;