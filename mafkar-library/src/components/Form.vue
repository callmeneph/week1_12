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
  <div class="container mt-5">
    <div class="row">
      <!-- Responsive column: full width on mobile, centered 8/12 on md+ -->
      <div class="col-12 col-md-8 offset-md-2">
        <h1 class="text-center mb-3">User Information Form</h1>

        <!-- Activity 1 & 2: Build the form -->
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              id="username"
              type="text"
              class="form-control"
              v-model="formData.username"
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              v-model="formData.password"
            />
          </div>

          <div class="form-check mb-3">
            <input
              id="isAustralian"
              type="checkbox"
              class="form-check-input"
              v-model="formData.isAustralian"
            />
            <label class="form-check-label" for="isAustralian">
              Australian Resident?
            </label>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason For Joining</label>
            <textarea
              id="reason"
              rows="3"
              class="form-control"
              v-model="formData.reason"
            />
          </div>

          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select id="gender" class="form-select" v-model="formData.gender">
              <option value="" disabled>Select…</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary me-2">Submit</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">
            Clear
          </button>
        </form>

        <!-- Activity 6: Show submitted cards -->
        <div class="row mt-5" v-if="submittedCards.length">
          <div class="d-flex flex-wrap justify-content-start">
            <div
              v-for="(card, index) in submittedCards"
              :key="index"
              class="card m-2"
              style="width: 18rem;"
            >
              <div class="card-header bg-primary text-white">
                User Information
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Username: {{ card.username }}</li>
                <li class="list-group-item">Password: {{ card.password }}</li>
                <li class="list-group-item">
                  Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
                </li>
                <li class="list-group-item">Gender: {{ card.gender }}</li>
                <li class="list-group-item">Reason: {{ card.reason }}</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
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
