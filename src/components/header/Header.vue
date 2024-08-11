<template>
  <div class="container">
    <header class="d-flex py-4">
      <router-link
        class="text-decoration-none text-danger fs-2 fw-bold me-auto"
        to="/"
        >FIREBASE PROJECT</router-link
      >
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/"
            >Yazılarım</router-link
          >
        </li>
        <li v-if="isAuth" class="nav-item">
          <router-link class="nav-link" to="/admin/add-article"
            >Yazı Ekle</router-link
          >
        </li>
        <li v-if="!isAuth" class="nav-item">
          <router-link class="nav-link" to="/users/register"
            >Kaydol</router-link
          >
        </li>
        <li v-if="isAuth" class="nav-item">
          <p style="cursor: pointer" class="nav-link" @click="logout">
            Çıkış Yap
          </p>
        </li>
      </ul>
    </header>
  </div>
</template>
<script setup>
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/configs";
import { ref } from "vue";
const isAuth = ref(auth.currentUser);
onAuthStateChanged(auth, (user) => {
  // console.log("User: ", user);
  isAuth.value = user;
});

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
</script>
