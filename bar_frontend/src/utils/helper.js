export const removeObjectPrototype = (oldObj) => {
  const _newObj = Object.create(null)
  for (const field in oldObj) {
    _newObj[field] = oldObj[field]
  }
  return _newObj
}

export const getCurrentUser = () => JSON.parse(localStorage.getItem('user'))

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

export const isValidEmail = (_email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(_email).toLowerCase())
}

export const getToday = () => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  return yyyy + '-' + mm + '-' + dd
}

export const getYesterday = () => {
  const today = new Date()
  today.setDate(today.getDate() - 1)
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  return yyyy + '-' + mm + '-' + dd
}

export const valid_mobile = (value) => {
  /*When value not number then try to convert bangla to english number*/
  // if (isNaN(value)) {
  //     value = translteBanglaToEngNum(value);
  // }
  // /^(?:\+88|88)?(01[3-9]\d{8})$/
  const valid_number = value.match(
    '(?:+88|88)?(01[3-9]d{8})'
  ) /*Regular expression to validate number*/
  /*When valid return without +88/88 number if exist*/
  if (valid_number) {
    return valid_number[1] /*valid number method return 3 with actual input*/
  } else {
    return false /*return false when not valid*/
  }
}

/*
 * Bangla to English number conversion method
 * @author: Lincoln Mahmud
 * @company: Purple Patch
 */

function translteBanglaToEngNum(num_str) {
  var bengali = {
    '০': 0,
    '১': 1,
    '২': 2,
    '৩': 3,
    '৪': 4,
    '৫': 5,
    '৬': 6,
    '৭': 7,
    '৮': 8,
    '৯': 9,
  }
  var changed_nun = ''
  num_str
    .toString()
    .split('')
    .forEach((l) => {
      if (isNaN(l)) {
        changed_nun += bengali[l]
      } else {
        changed_nun += l
      }
    })
  return changed_nun
}

export const toastConfigLight = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}

export const toastConfigColoured = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
}

// Name minimization
export const nameMinimization = (name) => {
  name = name.toLowerCase()
  name = name.replace('mr', '')
  name = name.replace('mrs', '')
  name = name.replace('md', '')
  name = name.replace(/[^a-zA-Z0-9 ]/g, '')
  name = name.trim()
  name = name.toUpperCase()
  var name1 = name.split(' ')
  return name1[0][0] + name1[name1.length - 1][0]
}

export const getToken = () => localStorage.getItem('token') || ''

export const getBaseAPIUrl = () =>
  `${
    process.env.REACT_APP_ENV === 'DEV'
      ? process.env.REACT_APP_API_BASE_URL_DEV
      : process.env.REACT_APP_ENV === 'PROD'
      ? process.env.REACT_APP_API_BASE_URL_PROD
      : process.env.REACT_APP_API_BASE_URL_STAGING
  }`

export const getBaseAPIRootUrl = () =>
  `${
    process.env.REACT_APP_ENV === 'DEV'
      ? process.env.REACT_APP_API_ROOT_URL_DEV
      : process.env.REACT_APP_ENV === 'PROD'
      ? process.env.REACT_APP_API_ROOT_URL_PROD
      : process.env.REACT_APP_API_ROOT_URL_STAGING
  }`

export const DDMMYYYY = 'DD-MM-YYYY'
export const YYYYMMDD = 'YYYY-MM-DD'

export const commonErrorRes = {
  success: false,
  message: 'Something Went Wrong! Please Try Again',
}
