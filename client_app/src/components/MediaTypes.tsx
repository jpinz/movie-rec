import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react';
import MediaTypeOptions from '../models/MediaTypeOptions';
import { MediaType } from '../api/api';

interface IMediaTypesProps {
}

const MediaTypes: React.FC<IMediaTypesProps> = ({}) => {

    const [mediaType, setMediaType] = useState<MediaTypeOptions>();
	const [isError, setIsError] = useState<boolean>(false);

    const onMediaTypeSelect = (mediaType: MediaTypeOptions) => {
        MediaType.setMediaType(mediaType)
			.then((data) => {
				setMediaType(data);
			})
			.catch((err) => {
				setIsError(true);
			});
    }

    useEffect(() => {
		MediaType.getMediaType()
			.then((data) => {
				setMediaType(data);
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
            <h1>Currently selected: {mediaType} </h1>
            <button onClick={() => onMediaTypeSelect(MediaTypeOptions.Movie)}>
                Movie!
            </button>
            <button onClick={() => onMediaTypeSelect(MediaTypeOptions.TV)}>
                TV Show!
            </button>
        </div>
    )

}

export default MediaTypes;