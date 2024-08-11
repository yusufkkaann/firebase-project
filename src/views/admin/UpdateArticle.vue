<template>
  <div class="row">
    <div class="col-md-6 offset-3">
      <h1 class="text-center">Yazıyı Güncelle</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Başlık</label>
          <input v-model="form.title" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Yazı</label>
          <textarea
            v-model="form.description"
            type="text"
            class="form-control"
            rows="3"
          ></textarea>
        </div>

        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary btn-lg">Güncelle</button>
          <button
            @click="deleteNote"
            type="submit"
            class="btn btn-danger btn-lg"
          >
            Sil
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { DB } from "@/firebase/configs";
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const form = reactive({
  title: "",
  description: "",
});
const docRef = doc(DB, "notes", route.params.id);
getDoc(docRef)
  .then((snapshot) => {
    form.title = snapshot.data().title;
    form.description = snapshot.data().description;
  })
  .catch((error) => {
    console.error("Error getting document: ", error);
  });
const router = useRouter();
const handleSubmit = async () => {
  try {
    const docRef = doc(DB, "notes", route.params.id);
    await updateDoc(docRef, {
      ...form,
    });
    router.push("/");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
const deleteNote = async () => {
  try {
    await deleteDoc(doc(DB, "notes", route.params.id));
    router.push("/");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
</script>
