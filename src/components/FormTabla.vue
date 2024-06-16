<template>
    <div id="formComp">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6">
                <h3 class="py-3 text-center">Agregar nuevo usuario</h3>
                <form @submit.prevent="addNewUser">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" id="inputName" v-model="formUser.nombre" required>
                        <label for="inputName">Nombre</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" id="inputEmail" v-model="formUser.correo" required>
                        <label for="inputEmail">Correo</label>
                    </div>
                    <div class="input-group mb-2">

                        <div class="form-floating">
                            <input type="text" class="form-control" id="inputUsername" v-model="formUser.alias"
                                required>
                            <label for="inputUsername">Alias</label>
                        </div>
                    </div>
                    <div class="form-floating mb-2 text-end">
                        <button class="btn btn-primary">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'FormTabla',
    props: {
    },
    data() {
        return {
            formUser: {
                nombre: '',
                correo: '',
                alias: ''
            },
        }
    },
    methods: {
        ...mapActions(['addUser']),
        async addNewUser() {
            let user = {
                nombre: this.formUser.nombre,
                correo: this.formUser.correo,
                alias: this.formUser.alias,
            }
            await this.addUser(user)
            this.formUser.nombre = '';
            this.formUser.correo = ''
            this.formUser.alias = ''
            alert("Usuario agregado correctamente.");
        },
    },
}
</script>

<style scoped></style>