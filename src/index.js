import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
var _ = require('lodash'),
d3 = require('d3');

// render(<App />, document.getElementById('root'));
var H1BGraph = React.createClass({

	componentWillMount: function () {
		this.loadRawData();
	},
	getInitialState: function () {
		return {rawData: []};
	},
	loadRawData: function () {
		console.log(this.props.url);
		var dateFormat = d3.timeFormat("%m/%d/%Y");
		d3.csv(this.props.url)
			.row(function (d) {
				if (!d['base salary']) {
					return null;
				}
				return {employer: d.employer,
					submit_date: dateFormat(d['submit date']),
					start_date: dateFormat(d['start date']),
					case_status: d['case status'],
					job_title: d['job title'],
					base_salary: Number(d['base salary']),
					salary_to: d['salary to'] ? Number(d['salary to']) : null,
					city: d.city,
					state: d.state};
			}.bind(this))
			.get(function (error, rows) {
				if (error) {
					console.error(error);
					console.error(error.stack);
				}else{
					this.setState({rawData: rows});
				}
			}.bind(this));
	},
	render: function () {
		if (!this.state.rawData.length) {
			return (
				<h2>Loading data about 81,000 H1B visas in the software industry</h2>
			);
		}
		return (
			<div className="row">
				<div className="col-md-12">
					<svg width="700" height="500">
					</svg>
				</div>
			</div>
		);
	}
});

render(
	<H1BGraph url="public/data/h1bs.csv" />,
	document.querySelectorAll('.h1bgraph')[0]
);