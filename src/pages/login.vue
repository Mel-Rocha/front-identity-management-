<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login as loginService, recoverPassword as recoverPasswordService } from '@/services/auth'
import logo from '@images/logo.svg?raw'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?url'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?url'

const router = useRouter()

// Formulário principal
const form = ref({ email: '', password: '', remember: false })

// Estados do componente
const showRecoverEmail = ref(false)
const recoverEmail = ref('')
const error = ref('')
const isPasswordVisible = ref(false)

// Função de login
const login = async () => {
  error.value = ''
  try {
    const data = await loginService(form.value.email, form.value.password)
    // Armazena token no localStorage
    localStorage.setItem('token', data.token)
    // Redireciona para dashboard
    router.push({ name: 'Dashboard' })
  } catch (err) {
    error.value = err.response?.data?.detail || 'Login falhou'
    console.error(err)
  }
}

// Função de recuperação de senha
const recoverPassword = async () => {
  error.value = ''
  if (!recoverEmail.value) {
    error.value = 'Informe seu e-mail para recuperar a senha.'
    return
  }
  try {
    await recoverPasswordService(recoverEmail.value)
    error.value = 'Verifique seu e-mail para instruções de recuperação.'
    showRecoverEmail.value = false
    recoverEmail.value = ''
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao recuperar senha'
    console.error(err)
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- Top shape -->
      <VImg
        :src="authV1TopShape"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- Bottom shape -->
      <VImg
        :src="authV1BottomShape"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- Auth Card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-center">
          <RouterLink to="/" class="app-logo">
            <div class="d-flex" v-html="logo" />
            <h1 class="app-logo-title">sneat</h1>
          </RouterLink>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">Welcome to Sneat! 👋🏻</h4>
          <p class="mb-0">Please sign-in to your account and start the adventure</p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="login">
            <VRow>
              <!-- Email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  label="Email"
                  type="email"
                  required
                />
              </VCol>

              <!-- Password -->
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

              <!-- Remember & Forgot -->
              <VCol cols="12">
                <div class="d-flex align-center justify-space-between flex-wrap my-6">
                  <VCheckbox v-model="form.remember" label="Remember me" />
                  <span class="text-primary" style="cursor:pointer" @click="showRecoverEmail = true">
                    Forgot Password?
                  </span>
                </div>

                <VBtn block type="submit">Login</VBtn>
                <div v-if="error" class="text-error">{{ error }}</div>
              </VCol>

              <!-- Create account -->
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

              <!-- Auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>

    <!-- Dialog de recuperação de senha -->
    <VDialog v-model="showRecoverEmail" max-width="400">
      <VCard>
        <VCardTitle>Recuperar senha</VCardTitle>
        <VCardText>
          <VTextField v-model="recoverEmail" label="Email" type="email" required />
          <div v-if="error" class="text-error">{{ error }}</div>
        </VCardText>
        <VCardActions>
          <VBtn color="primary" @click="recoverPassword">Enviar</VBtn>
          <VBtn text @click="showRecoverEmail = false">Cancelar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>