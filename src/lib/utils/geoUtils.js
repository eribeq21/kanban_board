export async function getCountry() {
	const API_KEY = '1625a5fc9c4240fdbe1726a04343e712';

	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error('Geolocation not supported'));
			return;
		}

		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				try {
					const response = await fetch(
						`https://api.geoapify.com/v1/geocode/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&type=country&apiKey=${API_KEY}`
					);
					const data = await response.json();
					const country = data.features[0]?.properties?.country || 'Unknown';

					let flag = null;
					if (country !== 'Unknown') {
						const flagResponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
						const flagData = await flagResponse.json();
						flag = flagData[0]?.flags?.png || null;
					}

					resolve({ country, flag });
				} catch (error) {
					reject(error);
				}
			},
			(error) => {
				reject(error);
			},
			{ enableHighAccuracy: true, timeout: 5000 }
		);
	});
}
