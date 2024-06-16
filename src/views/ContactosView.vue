<template>
  <div class="contacto">
    <h1>Pagina de contactos</h1>
    <CompTabla
    :usuarios="usuarios"/>
    <FormTabla/>
  </div>
</template>

<script>
import CompTabla from '@/components/CompTabla.vue'
import FormTabla from '@/components/FormTabla.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ContactosView',
  components: {
    CompTabla,
    FormTabla
  },
  computed: {
    ...mapState(["usuarios"])
  },
  methods: {
    ...mapActions(["setUsers"])
  },
  mounted() {
    this.setUsers();
  },
}
</script>
