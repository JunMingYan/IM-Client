import Cookies from 'js-cookie'

const authorization = "authorization"
const key = "Bearer"

export const setCookie = (token) => {
  Cookies.set(authorization, key + " " +token)
}

export const getCookie = () => {
  return Cookies.get(authorization)
}

export const removeCookie = () => {
  return Cookies.remove(authorization)
}
