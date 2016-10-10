
export default function fetchNeeds(params, store) {

	// Filter out undefined values, can happen if components are loaded 
	// asynchonously
  var components = params.components.filter(c => c)
  var args = Array.prototype.slice.call(arguments)

  var needs = []
  components.forEach(c => needs.push(c.needs || null), []);

  const promises = needs.map((need) => {
    if (!need) return Promise.resolve(need)
    return need.apply(this, args)
  });

  return Promise.all(promises)
  
}
