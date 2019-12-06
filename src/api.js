const BASE_API_URL = 'https://www.pmmc-map.xyz';

/*
 * add seal information
 */
export const addNewRescue = async (name, location, year, type, notes) => {
	const response = await fetch(BASE_API_URL + '/api/animal_locations', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({
			animal_name: name,
			location_name: location,
			placement_year: year,
			animal_type: type,
			animal_notes: notes,
			lat: 0,
			long: 0,
		}),
		withCredentials: true,
	});
	const json = await response.json();
	const successResponse = await json.success;
	return successResponse;
};

/*
 * update rescue counts
 */
export const updateNumRescues = async newCount => {
	const response = await fetch(BASE_API_URL + '/admin/count/num_rescues', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({
			new_total: newCount,
		}),
		withCredentials: true,
	});
	const json = await response.json();
	const successResponse = await json.success;
	return successResponse;
};

/*
 * get rescue counts
 */
export const getRescueCounts = async () => {
	const response = await fetch(BASE_API_URL + '/admin/count', {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': BASE_API_URL + '*',
		},
		withCredentials: true,
	});
	return await response.json();
};

/*
 * survey functions
 */

export const getAllQuestions = async () => {
	const response = await fetch(BASE_API_URL + '/api/questions', {
		method: 'GET',
	});

	const json = await response.json();
	const questions = await json.questions;
	return questions;
};

export const getQuestionOptions = async qid => {
	const response = await fetch(BASE_API_URL + '/api/options/qid/' + qid, {
		method: 'GET',
	});
	const json = await response.json();
	const options = await json.options;
	return options;
};

export const updateQuestionText = async (qid, newText) => {
	const response = await fetch(BASE_API_URL + '/api/questions/qid/' + qid, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({
			updated_text: newText,
		}),
		withCredentials: true,
	});
	const json = await response.json();
	const successResponse = await json.success;
	return successResponse;
};

export const deleteQuestion = async qid => {
	const response = await fetch(BASE_API_URL + '/api/questions/qid/' + qid, {
		method: 'DELETE',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		withCredentials: true,
	});
	const json = await response.json();
	const successResponse = await json.success;
	return successResponse;
};

export const addNewQuestion = async questionText => {
	const response = await fetch(BASE_API_URL + '/api/questions', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({
			text: questionText,
		}),
		withCredentials: true,
	});

	const json = await response.json();
	const successResponse = await json.success;
	if (!successResponse) throw 'Cant add new question';
	const qid = await json.qid;
	return qid;
};

export const addNewOption = async (qid, optionText) => {
	const theQid = await qid;
	const response = await fetch(BASE_API_URL + '/api/options/qid/' + qid, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({
			text: optionText,
		}),
		withCredentials: true,
	});

	const json = await response.json();
	const successResponse = await json.success;
	return successResponse;
};

/*
 * email
 */

export const sendEmail = async email => {
	const response = await fetch(BASE_API_URL + '/admin/email', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({
			email_address: email,
		}),
		withCredentials: true,
	});

	const json = await response.json();
	const successResponse = await json.success;
	return successResponse;
};

/*
 * login
 */
export const googleLogin = async resp => {
	console.log(resp);
	const response = await fetch(BASE_API_URL + '/flask/auth', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			Authorization: JSON.stringify(resp),
		},
		withCredentials: true,
	});

	const json = await response.json();
	console.log(json);
	return json;
};
