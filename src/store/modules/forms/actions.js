import firebase from '../../../firebase';
import auth from "../users/auth";
import dateToNumber from '../../../helpers/dateToNumber'

const db = firebase.firestore();

export async function getRegister({ commit }, infos) {
  const dtI = dateToNumber(infos.from) * 1;
  const dtF = dateToNumber(infos.to) * 1;

  await auth();

  try {
    commit("shared/setLoadingMessage", "Atualizando com registros selecionados", {
      root: true
    });

    const registers = [];
    const snapshot = await db
      .collection('forms')
      .where('data', '>=', dtI)
      .where('data', '<=', dtF)
      .get()

    snapshot.forEach(doc => {
      registers.push({ ...doc.data(), id: doc.id });
    });
    
    commit('setQuestions', registers);
    commit('shared/setLoadingMessage', null, { root: true });
  } catch (er) {
    console.error(er);
    commit('shared/setLoadingMessage', null, { root: true });

    commit(
      'shared/setNotification',
      {
        message: 'Falha ao buscar registros solicitados.',
        color: 'red',
        position: 'top'
      },
      { root: true }
    );
  }
}

export async function burnData({ commit }, payload) {

  await auth();

  try {
    await db.collection('forms').add(payload)

    commit('shared/setLoadingMessage', null, { root: true });
  } catch (er) {
    console.error(er);
    commit('shared/setLoadingMessage', null, { root: true });
    throw new Error('Falha no envio das respostas. Tente novamente!');
  }
}