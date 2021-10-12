import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react';
import { Region } from '../api/api';

interface IRegionProps {
}

const RegionComponent: React.FC<IRegionProps> = ({}) => {

    const [countryCode, setCountryCode] = useState<string>();
	const [isError, setIsError] = useState<boolean>(false);

    const onRegionSelect = (event: React.FormEvent<HTMLFormElement>) => {
		// Preventing the page from reloading
		event.preventDefault();
        Region.setRegion(countryCode ?? "US")
			.then((data) => {
				setCountryCode(data);
			})
			.catch((err) => {
				setIsError(true);
			});
    }

    useEffect(() => {
		Region.getRegion()
			.then((data) => {
				setCountryCode(data);
			})
			.catch((err) => {
				setIsError(true);
			});
		return () => {};
	}, []);

    return (
        <div>
            {isError && (
				<Box
					mt='1'
					fontWeight='bold'
					fontSize='sm'
					as='p'
					isTruncated
					color='red'
				>
					Oop!!! Error getting the media type
				</Box>
			)}
            <h1>Currently selected: {countryCode} </h1>
			<form onSubmit={onRegionSelect}>
				<input
				value={countryCode}
				onChange={(e) => setCountryCode(e.target.value)}
				type="text"
				placeholder="Enter a country code"
				className="input"
				/>
				<button type="submit" className="btn">Submit</button>
			</form>
        </div>
    )

}

export default RegionComponent;