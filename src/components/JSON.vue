<script setup>
import { ref, computed } from 'vue'

// ① Import JSON (paths are correct for your project)
import authorsData from '../assets/json/authors.json'
import storesData  from '../assets/json/bookstores.json'

// ② Make them reactive (good habit even if static now)
const authors = ref(authorsData)
const bookstores = ref(storesData)

// === Activity 2.1: Get Authors Born After 1850 ===
const modernAuthors = computed(() =>
  authors.value.filter(a => Number(a.birthYear) > 1850)
)

// (You’ll need these in later activities in the PDF — leaving them here)
const allFamousWorks = computed(() =>
  authors.value.flatMap(a => a.famousWorks.map(w => w.title))
)

const orwell = computed(() => authors.value.find(a => a.name === 'George Orwell'))
const austen = computed(() => authors.value.find(a => a.name === 'Jane Austen'))

// v-if / v-else toggle (Activity 4)
const showMessage = ref(false)
</script>

<template>
  <div class="json-lab">
    <h1>🗄️ JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>

      <h3>Iterating through Arrays</h3>
      <!-- Activity 3.1: list all authors -->
      <ul>
        <li v-for="a in authors" :key="a.id">
          {{ a.name }} ({{ a.birthYear }})
        </li>
      </ul>

      <h3>Filtering Arrays</h3>
      <p>Authors born after 1850:</p>
      <!-- ✅ Activity 3.2: render modernAuthors (this visualizes Activity 2.1) -->
      <ul>
        <li v-for="a in modernAuthors" :key="a.id">
          {{ a.name }} ({{ a.birthYear }})
        </li>
      </ul>

      <h3>Mapping Arrays</h3>
      <p>Famous works:</p>
      <ul>
        <!-- Activity 3.3: render all famous works -->
        <li v-for="t in allFamousWorks" :key="t">{{ t }}</li>
      </ul>

      <h3>Finding in Arrays</h3>
      <p>Finding by property: {{ orwell?.name }}</p>

      <h3>Nested Arrays/Objects</h3>
      <p>{{ austen?.name }}'s works:</p>
      <ul>
        <li v-for="w in (austen?.famousWorks ?? [])" :key="w.title">
          {{ w.title }} ({{ w.year }})
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Company: <strong>{{ bookstores.name }}</strong></p>
      <p>Total Stores: <strong>{{ bookstores.totalStores }}</strong></p>

      <p>Store Types:</p>
      <ul>
        <li v-for="(count, type) in bookstores.storeTypes" :key="type">
          {{ type }} — {{ count }}
        </li>
      </ul>

      <p>Opening Hours:</p>
      <ul>
        <li v-for="(hours, day) in bookstores.openingHours" :key="day">
          {{ day }}: {{ hours.open }} – {{ hours.close }}
        </li>
      </ul>

      <p>We operate in: {{ bookstores.countries.join(', ') }}</p>
      <p>Our #1 seller: {{ bookstores.topSellers[0] }}</p>
    </section>

    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <button @click="showMessage = !showMessage">Toggle Message</button>
      <p v-if="showMessage" class="message success">✨ You're a Vue superstar! ✨</p>
      <p v-else class="message">Click the button to see a message.</p>
    </section>

    <section class="lab-section">
      <h2>Attribute/Class/Style Binding (HD idea)</h2>
      <ul>
        <li
          v-for="a in authors"
          :key="a.id"
          :class="{ highlight: a.name === 'George Orwell' }"
          :style="a.name === 'George Orwell' ? { color: 'crimson', fontWeight: '700' } : {}"
          :title="`Born in ${a.birthYear}`"
        >
          {{ a.name }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.json-lab { max-width: 900px; margin: 0 auto; padding: 20px; font: 16px system-ui; }
.lab-section { background: #fff; padding: 16px; margin: 16px 0; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
.message.success { background:#e7faf3; color:#42b883; border:1px solid #42b883; padding:.5rem .75rem; border-radius:6px; }
.highlight { background: #fff3cd; padding: 0 .35rem; border-radius: .25rem; }
ul { list-style: none; padding: 0; }
li { background: #f7f7f7; margin: .3rem 0; padding: .5rem .75rem; border-radius: 6px; }
</style>
