import React, { Component } from 'react';

class ProgressRing extends Component {
	constructor(props) {
	    super(props);

	    const { radius, stroke } = this.props;

	    this.normalizedRadius = radius - stroke * 2;
	    this.circumference = this.normalizedRadius * 2 * Math.PI;
	}

	render() {
		const { radius, stroke, progress, count, strokeColor } = this.props;
		const strokeDashoffset = this.circumference - progress * this.circumference

		return (
			<svg
				height={radius * 2}
				width={radius * 2}
			>	
				<circle
				    stroke="#00000022"
				    fill="transparent"
				    strokeWidth={ stroke }
				    strokeDasharray={ this.circumference + ' ' + this.circumference }
				    style={ { strokeDashoffset: 0 } }
				    r={ this.normalizedRadius }
				    cx={ radius }
				    cy={ radius }
			    />
			    <circle
				    stroke={strokeColor}
				    fill="transparent"
				    strokeWidth={ stroke }
				    strokeDasharray={ this.circumference + ' ' + this.circumference }
				    style={ { strokeDashoffset } }
				    r={ this.normalizedRadius }
				    cx={ radius }
				    cy={ radius }
			    />
			    {	count < 50  &&
			    	<text x="50%" y="50%" textAnchor="middle" fontSize="0.75rem" fill={strokeColor} dy=".35em">{count}</text>
			    }
		    </svg>
		);
	}
}

export default ProgressRing;