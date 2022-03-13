import { useEffect, useState } from 'react';
import axios from 'axios';
import { csv } from 'd3';
import citiesCSV from '../data/citiesData.csv';

const jsonUrl = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';

export const useMapData = () => {
	const [mapData, setMapData] = useState(null);
	const [mapLoading, setMapLoading] = useState(false);
	const [mapError, setMapError] = useState(false);

	const [citiesData, setCitiesData] = useState(null);

	const getMapData = async () => {
		setMapLoading(true);

		try {
			delete axios.defaults.headers.common['Authorization'];
			const res = await axios.get(jsonUrl);
			if (res.status === 200) {
				setMapLoading(false);
				setMapData(res.data.features);
			}
		} catch (err) {
			setMapLoading(false);
			setMapError(true);
		}
	};

	const getCitiesData = () => {
		const row = (d) => {
			d.lat = +d.lat;
			d.lng = +d.lng;
			return d;
		};

		//setCitiesLoading(true);
		csv(citiesCSV, row).then((data) => {
			setCitiesData(data);
		});
	};

	useEffect(() => {
		getMapData();
		getCitiesData();
	}, []);

	return { mapData, mapLoading, mapError, citiesData };
};
