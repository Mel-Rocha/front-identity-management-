<script setup>
import { ref, onMounted } from 'vue'
import avatar1 from '@images/avatars/avatar-1.png'
import { fetchMe } from '@/services/userService'
import { updateUser } from '@/services/userService'

const refInputEl = ref()
const error = ref('')
const isAccountDeactivated = ref(false)

const accountDataLocal = ref({
  avatarImg: avatar1,
  first_name: '',
  last_name: '',
  email: '',
  org: '',
  phone: '',
  address: '',
  state: '',
  zip: '',
  country: '',
  language: '',
  timezone: 'UTC+0', // padrão UTC+0
  currency: ''
})

// constantes para selects
const timezones = [
  'UTC-11', 'UTC-10', 'UTC-9', 'UTC-8', 'UTC-7', 'UTC-6', 'UTC-5', 'UTC-4',
  'UTC-3', 'UTC-2', 'UTC-1', 'UTC+0', 'UTC+1', 'UTC+2', 'UTC+3', 'UTC+4',
  'UTC+5', 'UTC+6', 'UTC+7', 'UTC+8', 'UTC+9', 'UTC+10', 'UTC+11', 'UTC+12'
]
const currencies = ['USD','EUR','GBP','AUD','BRL','CAD','CNY','CZK','DKK','HKD','HUF','INR']

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

const fetchAccountData = async () => {
  try {
    const data = await fetchMe() // agora não precisa passar token
    accountDataLocal.value = {
      avatarImg: data.avatarImg || avatar1,
      firstName: data.first_name || '',
      lastName: data.last_name || '',
      email: data.email || '',
      org: data.org || '',
      phone: data.phone || '',
      address: data.address || '',
      state: data.state || '',
      zip: data.zip || '',
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

onMounted(() => fetchAccountData())


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
      organization: accountDataLocal.value.org,
      address: accountDataLocal.value.address,
      state: accountDataLocal.value.state,
      zip_code: accountDataLocal.value.zip,
      phone_number: accountDataLocal.value.phone
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
                <VTextField v-model="accountDataLocal.firstName" placeholder="John" label="First Name"/>
              </VCol>
              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.lastName" placeholder="Doe" label="Last Name"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.email" label="E-mail" type="email"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.org" label="Organization"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.phone" label="Phone Number"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.address" label="Address"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.state" label="State"/>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.zip" label="Zip Code"/>
              </VCol>
              <VCol cols="12" md="6">
                <VSelect v-model="accountDataLocal.country" label="Country" :items="['USA', 'Canada', 'UK', 'India', 'Australia']"/>
              </VCol>
              <VCol cols="12" md="6">
                <VSelect v-model="accountDataLocal.language" label="Language" :items="['English', 'Spanish', 'Arabic', 'Hindi', 'Urdu']"/>
              </VCol>
              <VCol cols="12" md="6">
                <VSelect v-model="accountDataLocal.timezone" label="Timezone" :items="timezones" :menu-props="{ maxHeight: 200 }"/>
              </VCol>
              <VCol cols="12" md="6">
                <VSelect v-model="accountDataLocal.currency" label="Currency" :items="currencies" :menu-props="{ maxHeight: 200 }"/>
              </VCol>

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
        <VCardText>
          <VCheckbox v-model="isAccountDeactivated" label="I confirm my account deactivation"/>
          <VBtn :disabled="!isAccountDeactivated" color="error" class="mt-3">Deactivate Account</VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
