/** @format */

import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const MapBox = ReactMapboxGl({
	accessToken:
		'pk.eyJ1IjoiZGVlcGFrYmhhdHRtaXRzIiwiYSI6ImNrOG9wbHJiNDAzbDUzbG85d21pYjhwMnMifQ.9UEH_jDMLMRyJVCJmS406g',
});
const Map = ({ className, style, center, zoom }) => {
	return (
		<div className={`map ${className}`} style={style}>
			<MapBox
				style={`mapbox://styles/mapbox/streets-v8`}
				zoom={zoom}
				center={center}
				containerStyle={{
					height: '300px',
					width: `100%`,
				}}>
				<Layer type='symbol' id='marker' layout={{ 'icon-image': 'marker-15' }}>
					<Feature coordinates={center} />
				</Layer>
			</MapBox>
		</div>
	);
};
export default Map;
