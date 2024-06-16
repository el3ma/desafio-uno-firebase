import { createStore } from 'vuex'
import {
  getFirestore,
  collection,
  query,
  // getDocs,
  orderBy,
  doc,
  addDoc,
  deleteDoc,
  // updateDoc,
  onSnapshot
} from 'firebase/firestore';
import firebaseApp from '../firebaseConfig.js'

let db = getFirestore(firebaseApp)

export default createStore({
  state: {
    usuarios: undefined
  },
  getters: {
  },
  mutations: {
    SET_USERS(state, usuarios) {
      state.usuarios = usuarios
    },
    DEL_USERS(state, id) {
      let index = state.usuarios.findIndex(usuario => usuario.id == id)
      console.log(index)
      state.usuarios.splice(index, 1)
    }
  },
  actions: {
    setUsers({ commit }) {
      try {
        let usuarios = []
        let usuariosRef = collection(db, 'usuarios')
        const queryData = query(usuariosRef, orderBy('nombre', 'asc'))
        // let firstLoad = true;
        onSnapshot(queryData, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            let dataChange = change.doc.data();
            if (change.type == 'added') {
              console.log(`Se ha agregado el usuario ${dataChange.nombre}`);
            } else if (change.type == 'modified') {
              console.log(`Se ha modificado el usuario ${dataChange.nombre}`);
            } else if (change.type == "removed") {
              console.log(`Se ha eliminado el usuario ${dataChange.nombre}`);
              commit('DEL_USERS', change.doc.id)
            }
          })
          // firstLoad = false;
          usuarios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          commit('SET_USERS', usuarios)
        });
      } catch (error) {
        console.log(error)
      }
    },
    async addUser(context, newUser) {
      try {
        // let db = getFirestore(firebaseApp);
        let usuariosRef = collection(db, 'usuarios')
        let usuarios = {
          nombre: newUser.nombre,
          correo: newUser.correo,
          alias: newUser.alias
        }
        await addDoc(usuariosRef, usuarios);
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async delUser(context, userID) {
      try {
        console.log("Datos: ", userID)
        let confirmDel = confirm("Desea eliminar el usuario: " + userID + "?");
        if (!confirmDel) {
          return
        }
        const usuariosRef = doc(db, 'usuarios', userID)
        await deleteDoc(usuariosRef)
        alert("Usuario eliminado correctamente.")
      } catch (error) {
        console.log(error)
        alert("Error al intentar eliminar el usuario.")
      }
    },
    // preUpdateUser(userID) {
    //   let { id, name, mail, username } = this.users.find(user => user.id == userID);
    //   this.editUser = { id, name, mail, username };
    // },
    // async updateUser() {
    //   try {
    //     // let db = getFirestore(firebaseApp);
    //     let userRef = doc(db, 'users', this.editUser.id);
    //     await updateDoc(userRef, {
    //       name: this.editUser.name,
    //       mail: this.editUser.mail,
    //       username: this.editUser.username
    //     });
    //     alert('Usuario editado correctamente.');
    //     this.editUser = {
    //       id: '',
    //       name: '',
    //       mail: '',
    //       username: ''
    //     }
    //     this.updateModal.hide();
    //   } catch (error) {
    //     console.log(error);
    //     alert('Error al intentar editar el usuario.')
    //   }
    // }
  },
  modules: {
  }
})