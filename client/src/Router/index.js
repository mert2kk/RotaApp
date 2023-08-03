import { createRouter, createWebHistory } from "vue-router";
import TasksView from "../Views/TasksView.vue"
import HomeView from "../Views/HomeView.vue";
import HabitsView from "../Views/HabitsView.vue";
import StaticsView from "../Views/StaticsView.vue";
import ProjectsView from "../Views/ProjectsView.vue";
import ErrorView from "../Views/ErrorView.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/Tasks",
        name: "tasks",
        component: TasksView,
      },
      {
        path: "/Habits",
        name: "habits",
        component: HabitsView,
      },  
      {
        path: "/Statics",
        name: "statics",
        component: StaticsView,
      },
      {
        path: "/Projects",
        name: "projects",
        component: ProjectsView,
      },
      {
        path: "/Tasks/Update/:id",
        name: "update",
        component: TasksView,
      },
      {
        path: "/Tasks/Tick/:id",
        name: "updatetick",
        component: TasksView,
      },
      {
        path:"/Habits/Tick/:id",
        name:"markAsDoneHabit",
        component:HabitsView,
      },
      {
        path:"/:pathMatch(.*)*",
        name:"404Page",
        component:ErrorView,
      }

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  
});

export default router