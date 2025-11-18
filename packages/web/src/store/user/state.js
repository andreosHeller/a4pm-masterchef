export default () => ({
  me: JSON.parse(localStorage.getItem('me') || 'null'),
})
