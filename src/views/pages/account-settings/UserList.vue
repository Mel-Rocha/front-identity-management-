<!-- src/views/pages/UserList.vue -->
<template>
  <div>
    <h1>Usuários</h1>

    <VDataTable
      :headers="headers"
      :items="users"
      class="elevation-1"
    />

    <div class="mt-4">
      <p>Total de usuários: {{ totalUsers }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchUsersList } from "@/services/userService";

const users = ref([]);
const totalUsers = ref(0);

const headers = [
  { text: "Nome", value: "first_name" },
  { text: "Sobrenome", value: "last_name" },
  { text: "Email", value: "email" },
];

onMounted(async () => {
  try {
    const response = await fetchUsersList();
    users.value = response.results;   // pega só os usuários
    totalUsers.value = response.count; // total do backend
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
  }
});
</script>

