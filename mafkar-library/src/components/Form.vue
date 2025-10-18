<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])

const submitForm = () => {
  submittedCards.value.push({ ...formData.value })
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }
}
</script>

<template>
  <div class="form">
    <h1>User Information Form</h1>
    <form>
      <label for="username">Username:</label><br />
      <input id="username" type="text" /><br />

      <label for="password">Password:</label><br />
      <input id="password" type="password" /><br />

      <label for="isAustralian">Australian Resident?</label><br />
      <input id="isAustralian" type="checkbox" /><br />

      <label for="reason">Reason For Joining:</label><br />
      <textarea id="reason" rows="3"></textarea><br />

      <label for="gender">Gender</label><br />
      <select id="gender">
        <option>Female</option>
        <option>Male</option>
        <option>Other</option>
      </select>
    </form>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.card-header {
  background-color: #275FDA;
  color: white;
  border-radius: 10px 10px 0 0;
}
</style>
