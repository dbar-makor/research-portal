import React from 'react';

const WorldMapSingleView = (props) => {
	return (
		<g key={props.d.city}>
			<circle
				cx={props.x}
				cy={props.y}
				r={4}
				onMouseEnter={() => props.setTooltipState(true)}
				onMouseLeave={() => props.setTooltipState(false)}
				fill={props.citiesStatus[props.d.city] === 'open' ? '#1C67FF' : '#868DA2'}
			/>
			<g>
				{props.tooltipState && (
					<>
						<rect x={props.x} y={props.y} width={100} height={30} fill="#1C67FF" rx="4" />
						<text x={props.x + 50} y={props.y + 20} fill="#fff" textAnchor="middle">
							{props.d.city}
						</text>
					</>
				)}
			</g>
		</g>
	);
};

WorldMapSingleView.displayName = 'WorldMapSingleView';
WorldMapSingleView.defaultProps = {};

export default React.memo(WorldMapSingleView);
