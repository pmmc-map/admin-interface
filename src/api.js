const BASE_API_URL = 'http://127.0.0.1:5000';

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
