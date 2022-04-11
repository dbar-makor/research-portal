import { Typography } from '@material-ui/core';
import { useMapData } from '../../customHooks/useMapData';
import { geoMercator, geoPath } from 'd3';
import WorldMapSingle from '../ui/members/ShowPublication/WorldMapSingle/WorldMapSingle';

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

const WorldMap = () => {
	const { mapData, mapLoading, mapError, citiesData } = useMapData();

	const projection = geoMercator()
		.center([20, 50])
		.scale(50)
		.translate([width / 2, height / 2]);

	const path = geoPath(projection);

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
							return (
								<WorldMapSingle d={d} x={x} y={y} citiesStatus={citiesStatus} key={d.lat} />
							);
						})}
					</g>
				</svg>
			)}
		</>
	);
};

export default WorldMap;
