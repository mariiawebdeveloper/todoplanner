import './App.css';
import { Route, Routes } from "react-router";
import Menu from "./components/Menu";
import Header from "./components/Header";
import LoginPage from "./components/user/LoginPage";
import Main from "./components/user/Main";
import Register from "./components/user/Register";

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
                        <Route path="/register" element={<Register />} />

                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
