var axios = require('axios')

export const post = (url, obj) => {
  
  axios
    .post(url, obj)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => console.log(error))
}
