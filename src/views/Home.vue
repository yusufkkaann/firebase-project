<template>
  <div class="row g-4">
    <div class="col-md-6" v-for="note in notes" :key="note.id">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ note.title }}</h5>
          <p class="card-text">
            {{ note.description }}
          </p>
        </div>
        <div class="card-footer">
          <router-link
            class="btn btn-warning"
            :to="`/admin/update-article/${note.id}`"
            >Yazıyı Düzenle</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { collection, getDocs } from "firebase/firestore"; // firestroreden collection ve getDocs fonksiyonlarını import ettik
import { DB } from "@/firebase/configs"; // firebase config dosyasından DB objesini import ettik
import { ref } from "vue";
const notes = ref([]);
const notesCollection = collection(DB, "notes"); // DB objesinden "notes" collection'ını aldık
getDocs(notesCollection)
  .then((snapShot) => {
    // notesCollection'ı getDocs fonksiyonu ile aldık ve snapShot objesine atadık
    let articles = []; // articles adında boş bir array oluşturduk
    snapShot.docs.forEach((doc) => {
      // snapShot objesini forEach ile döngüye aldık
      articles.push({ ...doc.data(), id: doc.id }); // articles array'ine her bir döngüdeki doc.data() objesini ekledik
    });
    notes.value = articles; // notes array'ine articles array'ini atadık
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });
</script>
