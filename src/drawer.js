var React = require('react'),
d3 = require('d3');
var Histogram = React.createClass({
	render: function () {
		var translate = "translate(0, "+this.props.topMargin+")";
		return (
			<g className="histogram" transform={translate}>
			</g>
		);
	}
});
module.exports = {
	Histogram: Histogram
};