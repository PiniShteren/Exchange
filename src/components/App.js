import React, { useState } from 'react';
import '../App.css';
import Lottie from "react-lottie";
import animationData from "./animation/scals.json";
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Coins from './Coins';

function App() {
	const [
		coins,
		setCoins
	] = useState([
		{ type: 'Shekel', value: 0.3 },
		{ type: 'Dollar', value: 3.2 },
		{ type: 'Euro', value: 3.4 }
	]);
	const [
		history,
		setHistory
	] = useState([]);
	const [
		result,
		setResult
	] = useState();

	const convert = (from, to, num) => {
		let res = 0;
		if (from.value === to.value) {
			res = num;
		}
		else if (from.value > to.value) {
			res = num * from.value;
		}
		else {
			res = num / to.value;
		}
		let resString = res.toString();
		console.log(resString);
		let dot = resString.indexOf(".");
		dot ? res = resString.slice(0, dot + 3) : res = resString
		to.type === "Shekel" ? res = "₪" + res : to.type === "Dollar" ? res = "$" + res : res = "€" + res;
		setResult(res);
		addHistory(from, to, num, res);
	};
	const addHistory = (from, to, num, res) => {
		from.type === "Shekel" ? num = "₪" + num : from.type === "Dollar" ? num = "$" + num : num = "€" + num;
		let newHistory = {
			index: history.length + 1,
			from: from.type,
			to: to.type,
			numFrom: num,
			numTo: res
		};
		setHistory([
			...history,
			newHistory
		]);
	};
	const addCoins = (type, value) => {
		setCoins([
			...coins,
			{ type: type, value: value }
		]);
	};
	return (
		<div className="App">
			<div className="top">
				<h1 id="logo">Exchange</h1>
			</div>
			<div className="footer">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							component={() => {
								return <Home coins={coins} convert={convert} result={result} history={history} />;
							}}
						/>
						<Route
							exact
							path="/coins"
							component={() => {
								return <Coins coins={coins} addCoins={addCoins} />;
							}}
						/>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
