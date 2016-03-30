
export default function fetchNeeds(params, store) {

  var components = params.components

  var needs = []
  components.forEach(c => {
    if (c.needs) {
      needs.push(c.needs)
    }
  }, []);

  const promises = needs.map((need) => {
    return need(params, store)
  });

  return Promise.all(promises)
  .then((allNewProps) => {    
    var newProps = {}
    allNewProps.forEach(props => Object.assign(newProps, props))
    return newProps
  })
}
