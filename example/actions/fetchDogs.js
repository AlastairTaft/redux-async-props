import fetch from 'isomorphic-fetch'

export default function fetchCats() {
	
	console.log('fetchDogs called')

  return {
    // Types of actions to emit before and after
    types: ['FETCH_DOGS_REQUEST', 'FETCH_DOGS_SUCCESS', 'FETCH_DOGS_FAILURE'],
    // Check the cache (optional):
    shouldCallAPI: (state) => !state.dogs,
    // Perform the fetching:
    callAPI: () => fetch(`http://localhost:8081/api/dogs`),
    // Arguments to inject in begin/end actions
    payload: { }
  }
}