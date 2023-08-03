<template>
    <div class="flex flex-row justify-between ">
        <div class="m-7 ">
            <a href="/"> <img src="../assets/logo.svg" alt="logo" width="130" height="130" /></a>
        </div>
        <div class="flex flex-row mr-5 ">
            <button class="m-2 ml-2  mr-2 p-2" @click="DialogOpenSignIn" >
                Sign In
            </button>
            <SignIn :visibleSignIn="visibleSignIn" :DialogCloseSignIn="DialogCloseSignIn"  :user="user" />
            <button class="m-2 ml-2  mr-2 p-2" @click="DialogOpen" >
                Sign Up
            </button>
            <SignUp :visible="visible" :DialogClose="DialogClose" :submitForm="createUser" :user="user"  />
        </div>
    </div>
    
</template>


<script setup>
import { ref,reactive } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import SignUp from '../components/Register/SignUp.vue';
import SignIn from '../components/Register/SignIn.vue';
import { onMounted } from 'vue';

const API_URLSignUp = "http://localhost:8000/users/signup";
const API_URL = "http://localhost:8000/users";


const router = useRouter()
const route = useRoute()
const user = reactive({
    name: "",
    lastname: "",
    email:"",
    password:"",

});


async function createUser(){
    try {
        const response = await fetch(API_URLSignUp,{
            method:"POST",
            headers:{
                "content-type" : "application/json"
            },
            body:JSON.stringify({
                name:user.name,
                lastname:user.lastname,
                email:user.email,
                password:user.password
            }),
        })

        const json = await response.json();
        console.log(json)

        if (!response.ok) {
      throw new Error("Error creating user");
       }

        
        router.go()
        alert("User Created")
    } catch (error) {
        console.log(error)
        
    }
}



async function getUsers() {try {
  const response = await fetch(`${API_URL}`);
  const json = await response.json();
//   user.value = json;
  console.log(json)

 } 
catch (error) {
    console.log(error)
  }
}

onMounted (  () => {
    getUsers()
}) 








const visible = ref(false);

const DialogOpen = () => {
    visible.value=true
}
const DialogClose = () => {
    visible.value=false
}


const visibleSignIn = ref(false);

const DialogOpenSignIn = () => {
    visibleSignIn.value=true
}
const DialogCloseSignIn = () => {
    visibleSignIn.value=false
}

</script>

<style lang="scss" scoped>
 
</style>