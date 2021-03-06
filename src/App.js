import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}

	componentDidMount() {
		fetch('https://my.api.mockaroo.com/peopledata.json?key=e620b840')
			.then(res => res.json())
			.then(
				result => {
					this.setState({
						isLoaded: true,
						items: result
					});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				error => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);
	}

	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<ul>
					{items.map(item => (
						<li key={item.age}>
							{item.first_name} {item.last_name}
						</li>
					))}
				</ul>
			);
		}
	}
}

export default App;
