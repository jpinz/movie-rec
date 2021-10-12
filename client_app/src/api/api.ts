import axios, { AxiosResponse } from 'axios';
import MediaTypeOptions from '../models/MediaTypeOptions';

const instance = axios.create({
	baseURL: '/api/v1/',
	timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: any) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

export const MediaType = {
	getMediaType: (): Promise<MediaTypeOptions> => requests.get('media_type') as Promise<MediaTypeOptions>,
	setMediaType: (mediaType: MediaTypeOptions): Promise<MediaTypeOptions> =>
		requests.post('media_type', {mediaType: MediaTypeOptions[mediaType]}) as Promise<MediaTypeOptions>,
};

export const Region = {
	getRegion: (): Promise<string> => requests.get('region') as Promise<string>,
	setRegion: (countryCode: string): Promise<string> =>
		requests.post('region', {countryCode: countryCode}) as Promise<string>,
};