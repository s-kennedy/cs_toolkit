import { api } from './init'
import firebase from '../firebase/init'

export function savePage(pageId, data, token, onSuccess, onFail){
  const url = `/pages/${pageId}`;

  return api.put(url, data, { headers: { 'Authorization': 'Bearer ' + token } })
    .then((res) => {
      if (res.status === 200) {
        onSuccess(res.data)
        console.log(res.data)
      } else {
        onFail(res)
      }
    })
   .catch((err) => onFail(err)) // Handle errors
}
