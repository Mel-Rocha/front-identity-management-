<!-- src/views/pages/UserList.vue -->
<template>
  <div>
    <h1>Usuários</h1>

    <VDataTable
      :headers="headers"
      :items="users"
      class="elevation-1"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchUsersList } from "@/services/userService";

const users = ref([]);

const headers = [
  { text: "Nome", value: "firts_name" },
  { text: "Email", value: "email" }
];

onMounted(async () => {
  try {
    const response = await fetchUsersList();
    users.value = response.data;
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
  }
});
</script>
