<template>
    <div class="">
        <div>
            <div class="w-auto bg-header p-5 m-5 flex flex-row justify-center rounded-md">
                <button @click="DialogOpen"
                    class="flex flex-row space-x-3 underline underline-offset-4 decoration-2 animate-bounce font-serif">
                    <strong>
                        <h1>Create a New Task</h1>
                    </strong>
                    <svg class="mt-0.5 hover:animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        id="add">
                        <g fill="#000100">
                            <rect width="4" height="20" x="8" rx="1.98"></rect>
                            <rect width="20" height="4" y="8" rx="1.98"></rect>
                        </g>
                    </svg>
                </button>
                <TaskForm :task="task" :submitForm="createTask" :DialogClose="DialogClose" :visible="visible" />
            </div>
            <div class="">
                <TaskCard  />
            </div>
        </div>
    </div>
</template>

<script setup>
import TaskCard from "../components/Tasks/TaskCard.vue";
import TaskForm from "../components/Tasks/TaskForm.vue";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";

const API_URL = "http://localhost:8000/tasks";
const router = useRouter();

const task = reactive({
    title: "",
    content: "",
});

async function createTask() {
    
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json", // express.json cagirdik uygulamada kullanmasini s,yledik 
                                                    //express content type i farkediyor express.json sayesinde
            },
            body: JSON.stringify({
                // converts JavaScript  objects into string to send to web server
                title: task.title,
                content: task.content,
            }),
        });
        const json = await response.json();

        router.go(); //refreshing page
        // router.push({
        //     name:"home",
        //                                    // to go to other url

        // })
        // alert("Created");
    } catch (error) {
        console.log(error);
    }
}

const visible = ref(false);

const DialogClose = () => {
    visible.value = false;
};
const DialogOpen = () => {
    visible.value = true;
};
</script>

<style lang="scss" scoped></style>
