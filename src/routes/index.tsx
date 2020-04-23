import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import DashBoard from "../pages/Dashboard";

const Routes: React.FC = () => (
	<Switch>
		<Route path="/" exact component={SignIn}></Route>
		<Route path="/signup" exact component={SignUp}></Route>
		<Route path="/dashboard" exact component={DashBoard} isPrivate />
	</Switch>
);

export default Routes;
