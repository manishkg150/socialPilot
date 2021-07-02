const fetch = require("node-fetch");

const apiRequest = {
	fetchRequest: async (reqObj) => {
		try {
			let response = await fetch(reqObj.url, {
				method: 'GET',
				headers: null,
				body: (reqObj.body ? reqObj.body : null)
			});
			return response.buffer();
		} catch (err) {
			return err;
		}
	}
}
module.exports = apiRequest;