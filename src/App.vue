<template>
  <ul class="nav nav-tabs justify-content-center" v-if="!$route.meta.hideNavbar">
    <li class="nav-item">
      <RouterLink class="nav-link" to="/">Books</RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink class="nav-link" to="/readers">Readers</RouterLink>
    </li>
    <li class="nav-item">
       <RouterLink class="nav-link" to="/borrows">Borrows</RouterLink>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" @click.stop.prevent="logout">Logout</a>
    </li>
  </ul>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import router from "./router";
import { refreshAccessToken, logoutUser } from './services/authService';

router.beforeEach(async (to, from) => {
  if (to.name !=='login' && !sessionStorage.getItem('accessToken')) {
    try{
      await refreshAccessToken();
    }catch(err){
      return { name: 'login' };
    }
  };

  const isAuthenticated = sessionStorage.getItem('accessToken');

  if (to.name !== 'login' && !isAuthenticated) {
    return { name: 'login' };
  }

  if (isAuthenticated && to.name === 'login') {
    return { name: 'books' };
  }
});

const logout = async () => {
  await logoutUser();
  sessionStorage.clear('accessToken');
  router.push({ name: 'login' });
}

</script>
