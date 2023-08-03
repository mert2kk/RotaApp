<template>
  <div class="p-dialog-header">
    <div class="flex justify-content-center">
      <form @submit.prevent="submitForm">
        <Dialog
          :visible="visible"
          :style="{ width: '50vw' }"
          modal
          close-icon="false"
          content-class="bg-gray-300 p-5 m-8 mb-20 rounded-lg  shadow-[0_35px_6000px_625px_rgba(3,22,49,0.54)] w-full  bg-signup bg-cover items-center custom-dialog-header"
          content-style="header"
        >
          <template #header>
            <div class="Font1 m-auto text-xl font-bold">
              Synchronize Success with Effective Time Management
            </div>
          </template>

          <div class="flex flex-row justify-end">
            <button @click="DialogClose">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                id="close"
              >
                <path
                  fill="#212121"
                  d="M2.39705176,2.55378835 L2.46966991,2.46966991 C2.73593648,2.20340335 3.15260016,2.1791973 3.44621165,2.39705176 L3.53033009,2.46966991 L8,6.939 L12.4696699,2.46966991 C12.7625631,2.1767767 13.2374369,2.1767767 13.5303301,2.46966991 C13.8232233,2.76256313 13.8232233,3.23743687 13.5303301,3.53033009 L9.061,8 L13.5303301,12.4696699 C13.7965966,12.7359365 13.8208027,13.1526002 13.6029482,13.4462117 L13.5303301,13.5303301 C13.2640635,13.7965966 12.8473998,13.8208027 12.5537883,13.6029482 L12.4696699,13.5303301 L8,9.061 L3.53033009,13.5303301 C3.23743687,13.8232233 2.76256313,13.8232233 2.46966991,13.5303301 C2.1767767,13.2374369 2.1767767,12.7625631 2.46966991,12.4696699 L6.939,8 L2.46966991,3.53033009 C2.20340335,3.26406352 2.1791973,2.84739984 2.39705176,2.55378835 L2.46966991,2.46966991 L2.39705176,2.55378835 Z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="flex flex-col w-2/3">
            <div class="flex flex-col m-auto">
              <label class="mb-1">Name </label>
              <input
                class="w-80 rounded-lg p-3"
                v-model="user.name"
                placeholder="Name"
              />
            </div>
            <div class="flex flex-col m-auto">
              <label class="mb-1 mt-1">Lastname</label>
              <p style="white-space: pre-line"></p>
              <input
                class="w-80 rounded-lg p-3"
                v-model="user.lastname"
                placeholder="Lastname"
              />
            </div>
            <div class="flex flex-col m-auto">
              <label class="mb-1 mt-1">E-mail</label>
              <p style="white-space: pre-line"></p>
              <input
                class="w-80 rounded-lg p-3"
                v-model="user.email"
                placeholder="E-mail"
                type="email"
              />
            </div>
            <div class="flex flex-col m-auto">
              <label class="mb-1 mt-1">Password</label>
              <p style="white-space: pre-line"></p>
              <input
                class="w-80 rounded-lg p-3"
                v-model="user.password"
                placeholder="Password"
                type="password"
              />
            </div>
            <div class="flex flex-row mt-8 m-auto">
              <button
                type="submit"
                @click="submitForm"
                class="bg-orange-500 p-1 h-10 w-24 rounded-md m-none"
              >
                Sign Up
              </button>
            </div>
          </div>
        </Dialog>
      </form>
    </div>
  </div>
</template>
<script setup>
import Dialog from "primevue/dialog";

const props = defineProps({
  user: Object,
  DialogClose: Function,
  visible: Boolean,
  submitForm: Function,
});
</script>

<style scoped>
.Font1 {
  font-family: "Font1", Dancing Script;
}
</style>
