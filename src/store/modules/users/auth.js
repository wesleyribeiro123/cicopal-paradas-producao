import { user, password } from './access_system.json'
import firebase from '../../../firebase'
import 'firebase/auth'

export default async function auth() {

  await firebase
    .auth()
    .signInWithEmailAndPassword(
      user,
      password
    );

}
