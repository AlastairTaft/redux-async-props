function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
    } = action

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected fetch to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return Promise.resolve()
    }

    const [ requestType, successType, failureType ] = types

    dispatch(Object.assign({}, payload, {
      type: requestType
    }))

    return callAPI()
    .then(response => response.json())
    .then(
      json => dispatch(Object.assign({}, payload, {
        response: json,
        type: successType
      })),
      error => dispatch(Object.assign({}, payload, {
        error,
        type: failureType
      }))
    )
  }
}

export default callAPIMiddleware