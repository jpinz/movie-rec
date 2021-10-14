import axios, { AxiosResponse } from 'axios';
import MediaTypeOptions from '../models/MediaTypeOptions';
import { IContentRating } from '../components/contentRating/contentRatingSlice';
import { IProvider } from '../components/provider/providerSlice';
import {IMovie, IShow } from '../components/recommendation/recommendationSlice'

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
		requests.post('media_type', { mediaType: mediaType }) as Promise<MediaTypeOptions>,
}

export const Region = {
	getRegion: (): Promise<string> => requests.get('region') as Promise<string>,
	setRegion: (countryCode: string): Promise<string> =>
		requests.post('region', { countryCode: countryCode }) as Promise<string>,
};

export const GenresAPI = {
	getGenres: (mediaType: MediaTypeOptions): Promise<IGenre[]> => requests.get(`${mediaType}/genres`) as Promise<IGenre[]>,
};

export const ContentRatingAPI = {
	getContentRatings: (mediaType: MediaTypeOptions, countryCode: string): Promise<IContentRating[]> => requests.get(`${mediaType}/certification/${countryCode}`) as Promise<IContentRating[]>,
};

export const ProvidersAPI = {
	getProviders: (mediaType: MediaTypeOptions, countryCode: string): Promise<IProvider[]> => requests.get(`providers/${mediaType}/${countryCode}`) as Promise<IProvider[]>,
};

export const ImagesAPI = {
	getImage: (fileName: string) => { return `https://image.tmdb.org/t/p/original${fileName}` }
};

export const MovieRecommendationAPI = {
	getRecommendations: (body: {}): Promise<IMovie[]> => requests.post(`discover/movies`, body) as Promise<IMovie[]>
}

export const ShowRecommendationAPI = {
	getRecommendations: (body: {}): Promise<IShow[]> => requests.post(`discover/tv`, body) as Promise<IShow[]>
}