import { configureStore } from '@reduxjs/toolkit'
// import genreReducer from './genresReducer';
import genreReducer from '../components/genres/genreSlice'
import mediaTypeReducer from '../components/mediaTypes/mediaTypeSlice'
import regionReducer from '../components/region/regionSlice'
import contentRatingReducer from '../components/contentRating/contentRatingSlice'
import providerReducer from '../components/provider/providerSlice'
import recommendationReducer from '../components/recommendation/recommendationSlice'

export const store = configureStore({
  reducer: {
    genres: genreReducer,
    mediaTypes: mediaTypeReducer,
    region: regionReducer,
    contentRating: contentRatingReducer,
    provider: providerReducer,
    recommendations: recommendationReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch