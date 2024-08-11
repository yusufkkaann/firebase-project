<template>
  <div class="row">
    <div class="col-md-6 offset-3">
      <h1 class="text-center">Yazı Ekle</h1>
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

        <button type="submit" class="btn btn-primary btn-lg">Ekle</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { collection, addDoc } from "firebase/firestore";
import { DB } from "@/firebase/configs";
import { reactive } from "vue";
import { useRouter } from "vue-router";
const form = reactive({
  title: "",
  description: "",
});
const router = useRouter();

const handleSubmit = async () => {
  try {
    const notesCollection = collection(DB, "notes");
    await addDoc(notesCollection, {
      ...form,
    });
    form.title = "";
    form.description = "";
    router.push("/");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
</script>
