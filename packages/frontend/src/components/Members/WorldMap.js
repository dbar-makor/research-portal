import { Typography } from '@material-ui/core';
import { useMapData } from '../../customHooks/useMapData';
import { useState } from 'react';
import { geoNaturalEarth1, geoMercator, geoPath, geoGraticule, path, map } from 'd3';
import WorldMapSingle from './ShowPublication/WorldMapSingle';

const width = 350;
const height = 200;

const citiesStatus = {
	'New York': 'closed',
	'Bermuda': 'closed',
	'London': 'closed',
	'Monaco': 'closed',
	'Singapore': 'open',
	'Melbourne': 'open',
};

function WorldMap() {
	const { mapData, mapLoading, mapError, citiesData } = useMapData();

	const projection = geoMercator()
		.center([20, 50]) // GPS of location to zoom on
		.scale(50) // This is like the zoom
		.translate([width / 2, height / 2]);

	const path = geoPath(projection);

	const [tooltipState, setTooltipState] = useState(false);

	return (
		<>
			{mapLoading && <Typography variant="caption">LOADING...</Typography>}
			{mapError && <></>}
			{mapData && (
				<svg width={width} height={height}>
					<g>
						{mapData.map((feature) => (
							<path key={feature.id} d={path(feature)} fill="#3E3E3E" stroke="#3E3E3E" />
						))}
						{citiesData?.map((d) => {
							const [x, y] = projection([d.lng, d.lat]);
							return <WorldMapSingle d={d} x={x} y={y} citiesStatus={citiesStatus} />;
						})}
					</g>
				</svg>
			)}
		</>
	);
}

export default WorldMap;
