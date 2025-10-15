export async function getCountry() {
	const API_KEY = '1625a5fc9c4240fdbe1726a04343e712';
	const CACHE_KEY = 'cached-country-data';

	// Try to get cached data first
	const cachedData = localStorage.getItem(CACHE_KEY);
	
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			// If offline and cached, use cached data
			if (cachedData) {
				const parsed = JSON.parse(cachedData);
				resolve({ ...parsed, isOffline: true });
				return;
			}
			reject(new Error('Geolocation not supported'));
			return;
		}

		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				try {
					const response = await fetch(
						`https://api.geoapify.com/v1/geocode/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&apiKey=${API_KEY}`
					);
					const data = await response.json();
					const properties = data.features[0]?.properties || {};
					const country = properties.country || 'Unknown';
					const city = properties.city || properties.town || properties.village || 'Unknown';

					let flag = null;
					if (country !== 'Unknown') {
						const flagResponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
						const flagData = await flagResponse.json();
						flag = flagData[0]?.flags?.png || null;
					}

					const result = { country, city, flag, isOffline: false };
					
					// Cache the result for offline use
					localStorage.setItem(CACHE_KEY, JSON.stringify(result));
					
					resolve(result);
				} catch (error) {
					// If API fails (offline), use cached data
					if (cachedData) {
						const parsed = JSON.parse(cachedData);
						resolve({ ...parsed, isOffline: true });
					} else {
						reject(error);
					}
				}
			},
			(error) => {
				// If geolocation fails but we have cache, use it
				if (cachedData) {
					const parsed = JSON.parse(cachedData);
					resolve({ ...parsed, isOffline: true });
				} else {
					reject(error);
				}
			},
			{ enableHighAccuracy: true, timeout: 5000 }
		);
	});
}
