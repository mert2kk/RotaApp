<template>
  <div class=" ">
    <div class="flex flex-row content-start flex-wrap">
      <Card
        class="bg-card ml-5 mr-5 mt-3 rounded-md shadow-xl shadow-gray-500 opacity-80 hover:opacity-100 h-36 w-64 break-words"
        v-for="task in tasks"
        :key="task._id"
        :class="{'completed-task': task.complete}"
        
      >
        <template #title>
          <div class="flex flex-row mb-2"  >
            <strong 
              ><h4
                class="text-start p-3 capitalize text-black-950 h-10 text-sm/[22px] font-mono rounded-md"
              >
                {{ task.title }}
              </h4>
            </strong>
          </div>
        </template>
        <template #content>
          <p
            class="p-3 pt-1 text-gray-800 font-serif h-16 overflow-y-auto opacity-75 text-sm/[20px] pb-1 mb-1.5"
          >
            {{ task.content }}
          </p>

          <div class="flex flex-row justify-end mr-2">
            <button class="mr-3" @click="displayEditTaskModal(task._id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                id="edit"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path
                  d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                ></path>
              </svg>
            </button>
            <button class="mr-2" @click="TickTask(task._id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                id="done"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path
                  d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                ></path>
              </svg>
            </button>
            <button class="ml-2" @click="removeTask(task._id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                id="delete"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"
                ></path>
              </svg>
            </button>
          </div>
        </template>
      </Card>
      <TaskUpdate
      v-if="EditOn"
      :EditOn="EditOn"
      
       :EditClose="EditClose"
      ></TaskUpdate>
    </div>
  </div>
</template>

<script setup>
import Card from "primevue/card";
import {  onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import TaskUpdate from "./TaskUpdate.vue";

const tasks = ref([]);
const router = useRouter();
const route = useRoute();

const API_URL = "http://localhost:8000/tasks";

onMounted(() => { 
  getTasks();
});

async function getTasks() {
  const response = await fetch(API_URL);
  const json = await response.json();
  tasks.value = json;
}

async function removeTask(_id) {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: "DELETE",
  });
  getTasks();
}



async function displayEditTaskModal(id) {
  await router.push({
    name: "update",
    params: {
      //in router
      id: id,
    },
  });
  EditOn.value = true;
}

const EditOn = ref(false);
const EditClose = () => {
  EditOn.value = false;
  router.push({
    name: "tasks",
  });
};



async function TickTask(_id) {
  await router.push({
    name: "updatetick",
    params: {
      id: _id, //in router
    },
  });
  await getTask();
  await updateTick(_id);
  await router.push({
    name: "tasks",
  });
  getTasks()
}


const task = ref({
  complete: Boolean, //this is for update tick
});

async function updateTick(_id) {
  try {
    const { id } = route.params;
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        complete: !task.value.complete,
      }),
    });
  } catch (error) {
    console.log(error);
  }
  // const json = await response.json()
}


async function getTask() {
  const { id } = route.params;
  const response = await fetch(`${API_URL}/${id}`);
  const json = await response.json();
  task.value = json;
}


</script>
<style scoped>
.completed-task{
    text-decoration: line-through;
}
</style>
