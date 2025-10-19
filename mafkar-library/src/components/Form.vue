<script setup>
import { ref } from 'vue'

/* -----------------------------
   1️⃣ Data models
----------------------------- */
const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])

/* -----------------------------
   2️⃣ Error messages (for validation)
----------------------------- */
const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null
})

/* -----------------------------
   3️⃣ Validation functions
----------------------------- */
const validateName = (fromBlur) => {
  const v = formData.value.username.trim()
  if (v.length < 3) {
    if (fromBlur) errors.value.username = 'Username must be at least 3 characters long.'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (fromBlur) => {
  const pwd = formData.value.password
  const hasUpper = /[A-Z]/.test(pwd)
  const hasLower = /[a-z]/.test(pwd)
  const hasNumber = /\d/.test(pwd)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
  if (pwd.length < 8 || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
    if (fromBlur) {
      errors.value.password =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
    }
  } else {
    errors.value.password = null
  }
}

const validateResident = (fromBlur) => {
  if (!formData.value.isAustralian) {
    if (fromBlur) errors.value.resident = 'Please confirm you are an Australian resident.'
  } else {
    errors.value.resident = null
  }
}

const validateGender = (fromBlur) => {
  if (!formData.value.gender) {
    if (fromBlur) errors.value.gender = 'Please select your gender.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (fromBlur) => {
  const len = formData.value.reason.trim().length
  if (len < 50 || len > 250) {
    if (fromBlur) errors.value.reason = 'Reason must be between 50 and 250 characters.'
  } else {
    errors.value.reason = null
  }
}

/* -----------------------------
   4️⃣ Form submission + clear
----------------------------- */
const submitForm = () => {
  // Run all validators
  validateName(true)
  validatePassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  // Check for any errors
  const hasErrors = Object.values(errors.value).some(Boolean)
  if (hasErrors) return

  // Add form data to list
  submittedCards.value.push({ ...formData.value })

  // Reset form
  clearForm()
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }
  errors.value = {
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <h1 class="text-center mb-3">User Information Form</h1>

        <!-- ✅ Bootstrap-styled form with custom validation -->
        <form @submit.prevent="submitForm" novalidate>
          <!-- Username -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              id="username"
              type="text"
              class="form-control"
              v-model="formData.username"
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
              placeholder="Enter your username"
            />
            <div v-if="errors.username" class="text-danger mt-1">{{ errors.username }}</div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              v-model="formData.password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
              placeholder="Enter a strong password"
            />
            <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
          </div>

          <!-- Resident Checkbox -->
          <div class="form-check mb-3">
            <input
              id="isAustralian"
              type="checkbox"
              class="form-check-input"
              v-model="formData.isAustralian"
              @change="() => validateResident(true)"
            />
            <label class="form-check-label" for="isAustralian">
              Australian Resident?
            </label>
            <div v-if="errors.resident" class="text-danger mt-1">{{ errors.resident }}</div>
          </div>

          <!-- Gender Select -->
          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select
              id="gender"
              class="form-select"
              v-model="formData.gender"
              @change="() => validateGender(true)"
            >
              <option disabled value="">Select…</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <div v-if="errors.gender" class="text-danger mt-1">{{ errors.gender }}</div>
          </div>

          <!-- Reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason For Joining</label>
            <textarea
              id="reason"
              rows="3"
              class="form-control"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
              placeholder="Tell us why you want to join (50–250 characters)"
            ></textarea>
            <div v-if="errors.reason" class="text-danger mt-1">{{ errors.reason }}</div>
          </div>

          <!-- Buttons -->
          <button type="submit" class="btn btn-primary me-2">Submit</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </form>

        <!-- ✅ Submitted Cards -->
        <div class="row mt-5" v-if="submittedCards.length">
          <div class="d-flex flex-wrap justify-content-start">
            <div
              v-for="(card, index) in submittedCards"
              :key="index"
              class="card m-2"
              style="width: 18rem;"
            >
              <div class="card-header bg-primary text-white">User Information</div>
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  border-radius: 10px 10px 0 0;
}
</style>
