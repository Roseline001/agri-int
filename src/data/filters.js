const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const regions = ['All regions', 'Rift Valley', 'Eastern', 'Central']

// what the search conditions look like before the user changes anything
const defaultFilters = { region: 'All regions', maxTemp: 40, minHumidity: 0, month: null }

export { months, regions, defaultFilters }
