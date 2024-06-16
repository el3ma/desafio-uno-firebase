<template>
    <div class="compTabla container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Alias</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.nombre }}</td>
                    <td>{{ usuario.correo }}</td>
                    <td>{{ usuario.alias }}</td>
                    <td>
                      <button class="btn btn-warning mx-2" @click="preUpdateUser(usuario.id)" data-bs-toggle="modal"
                    data-bs-target="#updateModal">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                        <button class="btn btn-danger" @click="delUser(usuario.id)"><i
                                class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="updateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="updateModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="updateModalLabel">Editar datos de usuario</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- agregar nuevos productos -->
          <form @submit.prevent="updateUser">
            <div class="py-2">
              <label for="" class="form-label">ID:</label>
              <input type="text" class="form-control" name="id" v-model="editUser.id" disabled>
            </div>
            <div class="py-2">
              <label for="" class="form-label">Nombre:</label>
              <input type="text" class="form-control" name="nombre" v-model="editUser.nombre">
            </div>
            <div class="py-2">
              <label for="" class="form-label">Correo:</label>
              <input type="text" class="form-control" name="email" v-model="editUser.correo">
            </div>
            <div class="py-2">
              <label for="" class="form-label">Alias:</label>
              <input type="text" class="form-control" name="username" v-model="editUser.alias">
            </div>
            <div class="py-2">
              <input type="submit" value="Actualizar usuario" class="btn btn-success">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
import {
  getFirestore,
  doc,
  updateDoc,
} from 'firebase/firestore';
import firebaseApp from '../firebaseConfig.js'

import { mapActions } from 'vuex'

export default {
  name: 'TableComp',
  props: {
    usuarios: Array
  },
  data() {
    return {
      updateModal: '',
      editUser: {
        id: '',
        nombre: '',
        correo: '',
        alias:''
      }
    }
  },
  methods: {
    ...mapActions(['delUser']),
    preUpdateUser(userID) {
      let { id, nombre, correo, alias } = this.usuarios.find(usuario => usuario.id == userID);
      this.editUser = { id, nombre, correo, alias};
    },
    async updateUser() {
      try {
        let db = getFirestore(firebaseApp);
        let userRef = doc(db, 'usuarios', this.editUser.id);
        await updateDoc(userRef, {
          nombre: this.editUser.nombre,
          correo: this.editUser.correo,
          alias: this.editUser.alias
        });
        alert('Usuario editado correctamente.');
        this.editUser = {
          id: '',
          nombre: '',
          correo: '',
          alias:''
        }
        this.updateModal.hide();
      } catch (error) {
        console.log(error);
        alert('Error al intentar editar el usuario.')
      }
    }
  },
  async mounted() {
    this.updateModal = new window.bootstrap.Modal('#updateModal');
  },
}
</script>
