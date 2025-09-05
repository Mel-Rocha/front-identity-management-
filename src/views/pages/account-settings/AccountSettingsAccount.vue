<script setup>
import { ref, onMounted } from 'vue'
import avatar1 from '@images/avatars/avatar-1.png'
import { fetchMe } from '@/services/userService'
import { updateUser } from '@/services/userService'
import { fetchChoices } from '@/services/choicesService'
import { deactivateCurrentUser } from '@/services/userService'
import router from "@/router/index.js";

const refInputEl = ref()
const error = ref('')
const isAccountDeactivated = ref(false)

const currencies = ref([])
const languages = ref([])
const timezones = ref([])
const countries = ref([])

const accountDataLocal = ref({
  avatarImg: avatar1,
  first_name: '',
  last_name: '',
  email: '',
  organization: '',
  phone_number: '',
  address: '',
  state: '',
  zip_code: '',
  country: '',
  language: '',
  timezone: 'UTC+0', // padrão UTC+0
  currency: ''
})

const resetForm = () => fetchAccountData()

const changeAvatar = (file) => {
  const { files } = file.target
  if (files && files.length) {
    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = () => {
      if (typeof reader.result === 'string')
        accountDataLocal.value.avatarImg = reader.result
    }
  }
}

const resetAvatar = () => {
  accountDataLocal.value.avatarImg = avatar1
}

const fetchSelectChoices = async () => {
  currencies.value = await fetchChoices('currency')
  languages.value = await fetchChoices('language')
  timezones.value = await fetchChoices('timezone')
  countries.value = await fetchChoices('country')
}

const fetchAccountData = async () => {
  try {
    const data = await fetchMe() // agora não precisa passar token
    accountDataLocal.value = {
      avatarImg: data.avatarImg || avatar1,
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      email: data.email || '',
      organization: data.organization || '',
      phone_number: data.phone_number || '',
      address: data.address || '',
      state: data.state || '',
      zip_code: data.zip_code || '',
      country: data.country || '',
      language: data.language || '',
      timezone: data.timezone || 'UTC+0',
      currency: data.currency || ''
    }
  } catch (err) {
    error.value = 'Não foi possível carregar os dados do usuário.'
    console.error(err)
  }
}

onMounted(async () => {
  await fetchSelectChoices()  // carrega selects primeiro
  await fetchAccountData()    // depois carrega os dados do usuário
})

const handleSaveChanges = async () => {
  try {
    // Prepara o payload com os nomes corretos que o back espera
    const payload = {
      email: accountDataLocal.value.email,
      first_name: accountDataLocal.value.first_name,
      last_name: accountDataLocal.value.last_name,
      language: accountDataLocal.value.language,
      timezone: accountDataLocal.value.timezone,
      currency: accountDataLocal.value.currency,
      country: accountDataLocal.value.country,
      organization: accountDataLocal.value.organization,
      address: accountDataLocal.value.address,
      state: accountDataLocal.value.state,
      zip_code: accountDataLocal.value.zip_code,
      phone_number: accountDataLocal.value.phone_number
    }

    // Faz a requisição de update
    await updateUser(payload)

    // Recarrega os dados do usuário para refletir alterações
    await fetchAccountData()

    console.log('Usuário atualizado com sucesso')
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err)
  }
}


const handleDeactivateUser = async () => {
  try {
    await deactivateCurrentUser()
    // após desativar, redireciona ou limpa token
    localStorage.removeItem('token')
    router.push({ name: 'Login' })
  } catch (err) {
    console.error('Falha ao desativar conta:', err)
  }
}

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Account Details">
        <VCardText class="d-flex">
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          />
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn color="primary" @click="refInputEl?.click()">
                <VIcon icon="bx-cloud-upload" class="d-sm-none"/>
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
                <span class="d-none d-sm-block">Reset</span>
                <VIcon icon="bx-refresh" class="d-sm-none"/>
              </VBtn>
            </div>
            <p class="text-body-1 mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <VForm class="mt-6">
            <VRow>
              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.first_name" placeholder="John" label="First Name"/>
              </VCol>
              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.last_name" placeholder="Doe" label="Last Name"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.email" label="E-mail" type="email"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.organization" label="Organization"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.phone_number" label="Phone Number"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.address" label="Address"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.state" label="State"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.zip_code" label="Zip Code"/>
              </VCol>
<VSelect
  v-model="accountDataLocal.currency"
  label="Currency"
  :items="currencies"
  item-title="label"
  item-value="value"
  :menu-props="{ maxHeight: 200 }"
/>

<VSelect
  v-model="accountDataLocal.language"
  label="Language"
  :items="languages"
  item-title="label"
  item-value="value"
  :menu-props="{ maxHeight: 200 }"
/>

<VSelect
  v-model="accountDataLocal.timezone"
  label="Timezone"
  :items="timezones"
  item-title="label"
  item-value="value"
  :menu-props="{ maxHeight: 200 }"
/>

<VSelect
  v-model="accountDataLocal.country"
  label="Country"
  :items="countries"
  item-title="label"
  item-value="value"
  :menu-props="{ maxHeight: 200 }"
/>

              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn color="primary" @click.prevent="handleSaveChanges">
  Save changes
      </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Deactivate Account">
        <VBtn color="error" @click="handleDeactivateUser">Deactivate Account</VBtn>
        <VCardText>
          <VCheckbox v-model="isAccountDeactivated" label="I confirm my account deactivation"/>
          <VBtn :disabled="!isAccountDeactivated" color="error" class="mt-3">Deactivate Account</VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
