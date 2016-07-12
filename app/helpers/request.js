export const request = {
	get: (authToken) => {
		return {
			method: 'GET',
			headers: {
				'x-auth-token': authToken
			}
		};
	},
	post: (authToken, body) => {
		return {
			method: 'POST',
			headers: {
				'x-auth-token': authToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		};
	},
	put: (authToken, body) => {
		return {
			method: 'PUT',
			headers: {
				'x-auth-token': authToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		};
	}
};
