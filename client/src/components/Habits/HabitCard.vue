<template>
    <div>
        <div class="w-auto bg-header p-5 m-5 flex flex-row rounded-md h-24px place-content-between"  v-for="habit in habits" :key="habit._id"          :class="{'completed-habit': habit.done}"
     
>  
            <button @click="DialogOpen" class="flex flex-row space-x-3 align-center  font-times ">
                <strong class=" mt-1">
                    {{ habit.title }}
                </strong>
            </button>
            <div>
                <div v-if="habit.done ">
                    <button @click="TickHabit(habit._id)">
                        <img :src="gifImage" alt="My GIF" style="width: 35px; height: auto;">

                    </button>
                </div>
                <div v-else>
                    <button class="mr-2" @click="TickHabit(habit._id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                id="done"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path
                  d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                ></path>
              </svg>
            </button>
                </div>
           
            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted,ref } from 'vue';
import {useRouter,useRoute} from "vue-router"
import gifImage from "../../assets/gifImage.gif"
const router = useRouter();
const route = useRoute();

// const today =  ref (new Date().toDateString())
const today = new Date().getDate();



const API_URL = 'http://localhost:8000/habits';
const habits = ref([]);

async function getHabits(){
    const response = await fetch(`${API_URL}`);
    const json = await response.json();
    habits.value = json;

}
onMounted(()=> {
    getHabits();
})


async function getHabit(){
    const {id}= route.params;
    const response = await fetch(`${API_URL}/${id}`);
    const json = await response.json();
    habit.value=json;
}
const habit = ref({
    done:Boolean,
    completedDate:Date,
})


async function TickHabit(_id){
    await router.push({
        name:"markAsDoneHabit",
        params:{
            id:_id,
        },
    })
    await getHabit();
    await updateTickHabit(_id);
    await router.push({
        name:"habits",
    });
    getHabits()




}

async function updateTickHabit(_id){
    try {
        const {id} = route.params;
        console.log(route.params)
        const response = await fetch(`${API_URL}/${id}`,{
            method:"PUT",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify({
                done: !habit.value.done,
                completedDate:Date.now(),
            }),
        });
        // const json = await response.json()
    } catch (error) {
        console.log(error)
        
    }
}





// async function updateRefreshHabits(){
//     try {

//         const response = await fetch(`${API_URL}`,{
//             method:"PUT",
//             headers:{
//                 "content-type":"application/json",
//             },
//             body: JSON.stringify({
//                 done: !habit.value.done,
//             }),
//         });
//     } catch (error) {
//         console.log(error)
        
//     }
// }


// onMounted(() => {

//       setInterval(() => {
//         const today = new Date().getDate();
//         const storedDay = localStorage.getItem('lastClickedDay');
//         if (today.toString() !== storedDay) {
//           updateRefreshHabits()
//           localStorage.setItem('lastClickedDay', today.toString());
//         }
//       }, 5000); // Check every 
//     });



    


 


</script>

<style  scoped>

.completed-habit{ 
    
    background-color: #8cafc5 !important;
}
</style>