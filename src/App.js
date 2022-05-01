import React, { useEffect, useState } from "react";
import { adminApi } from "./utils/admin.api";
import { notesApi } from "./utils/notes.api";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import Register from "./components/pages/register/Register";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = async (email, password) => {
		try {
			const res = await adminApi.login({ email, password });
			if (res.data.isSuccess) {
				setIsLoggedIn(true);
				console.log(res);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("userId",res.data.Data.userId);
				localStorage.setItem("userName",res.data.Data.userName);
			} else {
				console.log(res.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const registerHandler = async (userData) => {
		try {
			const res = await adminApi.register(userData);
			console.log(res);
			if (res.data.isSuccess) {
			} else {
				console.log(res.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const logoutHandler = () => {
		localStorage.clear();
		setIsLoggedIn(false);
	};

	return (
		<>

			<Router>
				<main>
					<Routes>
						 <Route path="/register" element={!isLoggedIn ? <Register onRegister={registerHandler} /> : <Navigate to="/" />} />
						<Route path="/" element={isLoggedIn ? <Home onLogout={logoutHandler} /> : <Login onLogin={loginHandler} />} exact />
					</Routes>
				</main>
			</Router>
		</>
	);
}

export default App;
