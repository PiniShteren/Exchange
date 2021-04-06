import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Home(props) {
	const [disabled, setDisabled] = useState(false);
	// const [history, setHistory] = useState();s
	const [from, setFrom] = useState();
	const [to, setTo] = useState();
	const [num, setNum] = useState();
	useEffect(() => {
		if (from && to && num) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	});

	const validFrom = (e) => {
		let index = Number(e.target.value);
		if (index === 0 || index) {
			props.coins.map((item, i) => {
				if (i === index) {
					setFrom(item);
				}
			});
		} else {
			setFrom(null);
		}
	};

	const validTo = (e) => {
		debugger;
		let index = Number(e.target.value);
		if (index === 0 || index) {
			props.coins.map((item, i) => {
				if (i === index) {
					setTo(item);
					return;
				}
			});
		} else {
			setTo(null);
		}
	};

	const validNum = (e) => {
		if (e.target.value) {
			setNum(e.target.value);
		} else {
			setNum("");
		}
	};
	return (
		<div className="Home">
			<div className="from">
				<select onChange={validFrom}>
					<option id="option" value="0">
						Type
					</option>
					{props.coins.map((e, i) => {
						return <option value={i}>{e.type}</option>;
					})}
				</select>
				<input id="num" type="number" onChange={validNum} />
				<select onChange={validTo}>
					<option id="option" value="0">
						Type
					</option>
					{props.coins.map((e, i) => {
						return <option value={i}>{e.type}</option>;
					})}
				</select>
				<p>{props.result}</p>
				<button
					id="start"
					disabled={!disabled}
					onClick={() => {
						props.convert(from, to, num);
					}}
				>
					start
				</button>
			</div>
			<div className="navigation">
				<Link to="/coins">update</Link>
				<button>shere in FACBOOK</button>
				<button>View exchange list</button>
			</div>
			<div className="history">
				{props.history.map((e) => {
					return (
						<div className="historyItem">
							<p id="idHistory">#{e.index}</p>
							<p id="historyDetails">
								<span>{e.from}</span>
								<span>{e.numFrom}</span>

								<span>{e.to}</span>
								<span>{e.numTo}</span>
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
