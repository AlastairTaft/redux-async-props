import fetch from 'isomorphic-fetch'

export default function fetchCats() {
	
	console.log('fetchCats called')

  return {
    // Types of actions to emit before and after
    types: ['FETCH_CATS_REQUEST', 'FETCH_CATS_SUCCESS', 'FETCH_CATS_FAILURE'],
    // Check the cache (optional):
    shouldCallAPI: (state) => !state.cats,
    // Perform the fetching:
    callAPI: () => fetch(`http://localhost:8081/api/cats`),
    // Arguments to inject in begin/end actions
    payload: { }
  }
}