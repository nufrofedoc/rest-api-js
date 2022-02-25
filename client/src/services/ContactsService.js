import api from '@/services/api'

export default {
  fetchContacts () {
    return api().get('contacts')
  },
  addContact(data) {
    return api().post('contacts', data)
  },
  editContact(id, data) {
    return api().put(`contacts/${id}`, data)
  },
  deleteContact(id) {
    return api().delete(`contacts/${id}`)
  }
}
