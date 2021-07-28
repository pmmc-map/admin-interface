import React, { useState, useEffect } from 'react';
import { getSurveyData, getPinData, getDonationVisits } from '../api';
import { CSVLink } from 'react-csv';

const DataDownloadForm = () => {
	const [loadTime, setLoadTime] = useState(undefined);
	const [surveyData, setSurveyData] = useState(undefined);
	const [pinData, setPinData] = useState(undefined);
	const [donationData, setDonationData] = useState(undefined);

	useEffect(() => {
		const fetchData = async () => {
			setLoadTime(new Date());

			const surveyData = await getSurveyData();
			setSurveyData(surveyData);

			const pinData = await getPinData();
			setPinData(pinData);

			const donationData = await getDonationVisits();
			setDonationData(donationData);
		};
		fetchData();
	}, []);

	return (
		<div className='section'>
			<h1 className='subtitle is-1'>Download all app data</h1>
			<p style={{ marginBottom: '24px' }}>
				Click to download the data in .csv format
			</p>
			{surveyData && surveyData.responses && (
				<CSVLink
					className='button is-info'
					data={surveyData.responses}
					filename={`survey-responses-${loadTime.toISOString()}.csv`}
					style={{ marginRight: '16px' }}
				>
					Survey Responses
				</CSVLink>
			)}

			{pinData && pinData.responses && (
				<CSVLink
					className='button is-info'
					data={pinData.responses}
					filename={`location-responses-${loadTime.toISOString()}.csv`}
					style={{ marginRight: '16px' }}
				>
					Location Data (Pins)
				</CSVLink>
			)}

			{donationData && donationData.responses && (
				<CSVLink
					className='button is-info'
					data={donationData.responses}
					filename={`donation-visits-${loadTime.toISOString()}.csv`}
				>
					Donation Page Visits
				</CSVLink>
			)}
		</div>
	);
};

export default DataDownloadForm;
