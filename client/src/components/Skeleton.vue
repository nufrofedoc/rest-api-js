<template>
  <div class="container pt-5" v-cloak>
    <h1>REST API Skeleton</h1>
    <form @submit.prevent="createContact">
      <div class="form-row align-items-center">
        <div class="col-sm-3 my-1">
          <label class="sr-only" for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="form.name" />
        </div>
        <div class="col-sm-3 my-1">
          <label class="sr-only" for="username">Username</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">@</div>
            </div>
            <input type="text" class="form-control" id="username" v-model="form.value" />
          </div>
        </div>
        <div class="col-auto my-1 mt-3">
          <button type="submit" class="btn btn-primary mb-2" :disabled="!canCreate">Create</button>
        </div>
      </div>
    </form>
    <div v-if="loading">
      <loader />
    </div>
    <div v-else-if="contacts.length">
      <div class="card text-white bg-dark mb-3" v-for="contact in contacts">
        <div class="card-body" :style="{ background: contact.marked ? 'black' : '#282828' }">
          <h5 class="card-title">{{ contact.name }}</h5>
          <p class="card-text">{{ contact.value }}</p>
          <button class="btn btn-primary mb-2" @click="markContact(contact.id)" :disabled="contact.marked">Select</button>
          <button class="btn btn-danger mb-2" @click="removeContact(contact.id)">Delete</button>
        </div>
      </div>
    </div>
    <p v-else>Not found contacts</p>
  </div>
</template>

<script>
import ContactsService from '@/services/ContactsService'

export default {
  name: 'Skeleton',
  data() {
    return {
      loading: false,
      form: {
        name: '',
        value: ''
      },
      contacts: []
    }
  },
  computed: {
    canCreate() {
      return this.form.value.trim() && this.form.name.trim()
    }
  },
  methods: {
    async getContacts() {
      const response = await ContactsService.fetchContacts()
      this.contacts = response.data
    },
    async createContact() {
      const { ...contact } = this.form

      const newContact = await ContactsService.addContact(contact)

      this.contacts.push(newContact.data)

      this.form.name = this.form.value = ''
    },
    async markContact(id) {
      const contact = this.contacts.find((c) => c.id === id)
      contact.marked = true

      const updated = await ContactsService.editContact(id, ...contact)
    },
    async removeContact(id) {
      await ContactsService.deleteContact(id)
      this.contacts = this.contacts.filter((c) => c.id !== id)
    }
  },
  async mounted() {
    this.loading = true
    this.contacts = this.getContacts()
    this.loading = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
