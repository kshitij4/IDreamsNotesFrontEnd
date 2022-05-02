import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsLoggedIn(true);
		}
	}, []);

	const logoutHandler = () => {
		localStorage.clear();
		setIsLoggedIn(false);
	};

	return (
		<>

			<Router>
				<main>
					<Routes>
						<Route path="/" element={isLoggedIn ? <Home onLogout={logoutHandler}  /> : <Login onSetLoggedIn= {setIsLoggedIn}/>} exact />
					</Routes>
				</main>
			</Router>
		</>
	);
}

export default App;
