<script setup>
import MainHeader from "./layout/MainHeader.vue";
import Sidebar from "./layout/Sidebar.vue";
import MainFooter from "./layout/MainFooter.vue";
</script>

<template>
  <main class="flex flex-col h-screen">
    <header class="bg-header text-center container{witdh:100%} h-24">
      <MainHeader />
    </header>
    <section class="flex flex-row h-5/6">
      <aside class="w-1/12 bg-header">
        <Sidebar />
      </aside>
      <article class="w-11/12 bg-dashboard p-8 overflow-auto">
        <RouterView> </RouterView>
      </article>
    </section>
    <div class="bg-header h-24 text-center">
      <MainFooter />
    </div>
  </main>
</template>

<style scoped></style>
