<template>
    <div>
        <form @submit="updateTask">
            <div class="card flex justify-content-center">
                <Dialog :visible="EditOn" :style="{ width: '50vw' }" close-icon="false"
                    content-class="bg-orange-100 p-3 m-auto  rounded-lg  w-96 drop-shadow-2xl		">
                    <div class="flex flex-row justify-end">
                        <button @click="EditClose">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="close">
                                <path fill="#212121"
                                    d="M2.39705176,2.55378835 L2.46966991,2.46966991 C2.73593648,2.20340335 3.15260016,2.1791973 3.44621165,2.39705176 L3.53033009,2.46966991 L8,6.939 L12.4696699,2.46966991 C12.7625631,2.1767767 13.2374369,2.1767767 13.5303301,2.46966991 C13.8232233,2.76256313 13.8232233,3.23743687 13.5303301,3.53033009 L9.061,8 L13.5303301,12.4696699 C13.7965966,12.7359365 13.8208027,13.1526002 13.6029482,13.4462117 L13.5303301,13.5303301 C13.2640635,13.7965966 12.8473998,13.8208027 12.5537883,13.6029482 L12.4696699,13.5303301 L8,9.061 L3.53033009,13.5303301 C3.23743687,13.8232233 2.76256313,13.8232233 2.46966991,13.5303301 C2.1767767,13.2374369 2.1767767,12.7625631 2.46966991,12.4696699 L6.939,8 L2.46966991,3.53033009 C2.20340335,3.26406352 2.1791973,2.84739984 2.39705176,2.55378835 L2.46966991,2.46966991 L2.39705176,2.55378835 Z">
                                </path>
                            </svg>
                        </button>
                    </div>

                    <div class="flex flex-col">
                        <div class="flex flex-col m-auto">
                            <label class="mb-1">Task Title </label>
                            <input class="w-80 rounded-lg p-3" v-model="task.title" placeholder=" Update your task " />
                        </div>
                        <div class="flex flex-col m-auto">
                            <label class="mb-1 mt-1">Task Content</label>
                            <p style="white-space: pre-line"></p>
                            <textarea class="w-80 h-32 rounded-lg p-3" v-model="task.content"
                                placeholder="Update your task"></textarea>
                        </div>
                    </div>

                    <div class="flex flex-row justify-end">
                        <button type="submit" @click="updateTask">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" id="done">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path
                                    d="M20.47 5.63c.39.39.39 1.01 0 1.4L9.13 18.37c-.39.39-1.01.39-1.4 0l-4.2-4.2c-.39-.39-.39-1.01 0-1.4.39-.39 1.01-.39 1.4 0l3.5 3.5L19.07 5.63c.39-.39 1.01-.39 1.4 0zm-2.11-2.12l-9.93 9.93-2.79-2.79c-.78-.78-2.05-.78-2.83 0l-1.4 1.4c-.78.78-.78 2.05 0 2.83l5.6 5.6c.78.78 2.05.78 2.83 0L22.59 7.74c.78-.78.78-2.05 0-2.83l-1.4-1.4c-.79-.78-2.05-.78-2.83 0z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </Dialog>
            </div>
        </form>
    </div>
</template>

<script setup>
import Dialog from "primevue/dialog";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
    EditOn: Boolean,
    EditClose: Function,
});

const router = useRouter();
const route = useRoute();
const API_URL = "http://localhost:8000/tasks";

const task = ref({
    title: "", //ref() value can be reassigned entirely-
    content: "",// to a new object, while a reactive() cannot.
});

async function getTask() {
    const { id } = route.params;
    const response = await fetch(`${API_URL}/${id}`);
    const json = await response.json();
    task.value = json;
    console.log(task.value.complete);
}

onMounted(() => {
    getTask();
});

async function updateTask() {
    const { id } = route.params;
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            title: task.value.title,
            content: task.value.content,
        }),
    });
    const json = await response.json();
    await router.push({ name: "tasks" });
    router.go();
}
</script>
