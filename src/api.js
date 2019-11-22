export const getAllQuestions = async () => {
	const response = await fetch('http://127.0.0.1:5000/api/questions', {
		method: 'GET',
	});

	const json = await response.json();
	const questions = await json.questions;
	return questions;
};

export const getQuestionOptions = async qid => {
	const response = await fetch(
		'http://127.0.0.1:5000/api/options/qid/' + qid,
		{
			method: 'GET',
		}
	);
	const json = await response.json();
	const options = await json.options;
	return options;
};
