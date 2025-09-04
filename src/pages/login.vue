<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { ref } from 'vue'
import logo from '@images/logo.svg?raw'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?url'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?url'
import axios from "axios";

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const showRecoverEmail = ref(false)
const recoverEmail = ref('')

const recoverPassword = async () => {
  if (!recoverEmail.value) {
    error.value = 'Informe seu e-mail para recuperar a senha.'
    return
  }
  try {
    const response = await axios.post('http://0.0.0.0:8000/users/recover_password-service/', {
      email: recoverEmail.value
    })
    error.value = 'Verifique seu e-mail para instruções de recuperação.'
    showRecoverEmail.value = false
    recoverEmail.value = ''
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao recuperar senha'
    console.error(err)
  }
}
const isPasswordVisible = ref(false)

const error = ref('')

const login = async () => {
  try {
    const response = await axios.post('http://0.0.0.0:8000/users/login-service/', {
      email: form.value.email,
      password: form.value.password
    })
    console.log(response.data)
    // Aqui você pode salvar o token ou redirecionar o usuário
  } catch (err) {
    error.value = 'Login falhou'
    console.error(err)
  }
}

</script>

<template>
  <VCardText>
    <VForm @submit.prevent="login">
      <VRow>
        <VCol cols="12">
          <VTextField
            v-model="form.email"
            label="Email"
            type="email"
            required
          />
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="form.password"
            label="Password"
            placeholder="············"
            :type="isPasswordVisible ? 'text' : 'password'"
            autocomplete="password"
            :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
            required
          />
        </VCol>
        <VCol cols="12">
          <div class="d-flex align-center justify-space-between flex-wrap my-6">
            <VCheckbox
              v-model="form.remember"
              label="Remember me"
            />
            <span
              class="text-primary"
              style="cursor:pointer"
              @click="showRecoverEmail = true"
            >
              Forgot Password?
            </span>
          </div>
          <VBtn block type="submit">
            Login
          </VBtn>
          <div v-if="error" class="text-error">{{ error }}</div>
        </VCol>
        <VCol cols="12" class="text-body-1 text-center">
          <span class="d-inline-block">New on our platform?</span>
          <RouterLink class="text-primary ms-1 d-inline-block text-body-1" to="/register">
            Create an account
          </RouterLink>
        </VCol>
        <VCol cols="12" class="d-flex align-center">
          <VDivider />
          <span class="mx-4 text-high-emphasis">or</span>
          <VDivider />
        </VCol>
        <VCol cols="12" class="text-center">
          <AuthProvider />
        </VCol>
      </VRow>
    </VForm>
    <VDialog v-model="showRecoverEmail" max-width="400">
      <VCard>
        <VCardTitle>Recuperar senha</VCardTitle>
        <VCardText>
          <VTextField
            v-model="recoverEmail"
            label="Email"
            type="email"
            required
          />
          <div v-if="error" class="text-error">{{ error }}</div>
        </VCardText>
        <VCardActions>
          <VBtn color="primary" @click="recoverPassword">Enviar</VBtn>
          <VBtn text @click="showRecoverEmail = false">Cancelar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VCardText>
</template>