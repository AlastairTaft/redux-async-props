
export default function fetchNeeds(params, store) {

  var components = params.components

  var needs = []
  components.forEach(c => needs.push(c.needs || null), []);

  const promises = needs.map((need) => {
    if (!need) return Promise.resolve(need)
    return need(params, store)
  });

  return Promise.all(promises)
  
}
