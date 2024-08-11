<template>
  <div class="row">
    <div class="col-md-6 offset-3">
      <h1 class="text-center">
        {{ register ? "Kayıt Formu" : "Kullanıcı Girişi" }}
      </h1>
      <Form @submit="handleSubmit" :validation-schema="schema">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <Field v-model="form.email" class="form-control" name="email" />
          <ErrorMessage name="email" as="div" v-slot="{ message }">
            <div class="alert alert-danger mt-3">
              {{ message }}
            </div>
          </ErrorMessage>
        </div>
        <div class="mb-3">
          <label class="form-label">Şifre</label>
          <Field
            v-model="form.password"
            class="form-control"
            name="password"
            type="password"
          />
          <ErrorMessage name="password" as="div" v-slot="{ message }">
            <div class="alert alert-danger mt-3">
              {{ message }}
            </div>
          </ErrorMessage>
        </div>

        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary btn-lg">
            {{ register ? "Kaydol" : "Giriş Yap" }}
          </button>
          <button
            @click="register = !register"
            type="button"
            class="btn btn-secondary btn-lg"
          >
            {{ register ? "Giriş Yap" : "Kayıt Ol" }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { auth } from "@/firebase/configs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "vue-router";
import * as yup from "yup";
import { ref, reactive } from "vue";
const register = ref(true);
const router = useRouter();
const form = reactive({
  email: "",
  password: "",
});
const schema = yup.object({
  email: yup
    .string()
    .required("Bu alan zorunludur")
    .email("Geçerli bir email adresi giriniz"),
  password: yup
    .string()
    .required("Bu alan zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
});
const registerUser = () => {
  try {
    createUserWithEmailAndPassword(auth, form.email, form.password);
    router.push("/"); // Anasayfaya yönlendirme
  } catch (error) {
    console.error("Error registering user: ", error);
  }
};
const signInUser = () => {
  try {
    signInWithEmailAndPassword(auth, form.email, form.password);
    router.push("/"); // Anasayfaya yönlendirme
  } catch (error) {
    console.error("Error signing in user: ", error);
  }
};
const handleSubmit = () => {
  if (register.value) {
    registerUser();
    form.email = "";
    form.password = "";
  } else {
    signInUser();
  }
};
</script>
