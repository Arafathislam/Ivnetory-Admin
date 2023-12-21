
const storeToken = (value) => {
    localStorage.setItem('token', value)
  }
  
  const getToken = () => {
    let token = localStorage.getItem('token')
    return token
  }
  
  const removeToken = (value) => {
    localStorage.removeItem(value)
  }



  const storeTokenAdmin = (value) => {
    localStorage.setItem('admin', value)
  }
  
  const getTokenAdmin = () => {
    let token = localStorage.getItem('admin')
    return token
  }
  
  const removeTokenAdmin = (value) => {
    localStorage.removeItem(value)
  }


  
  export { storeToken, getToken, removeToken,storeTokenAdmin, getTokenAdmin, removeTokenAdmin }