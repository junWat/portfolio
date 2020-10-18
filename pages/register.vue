<template>
  <v-app>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar dense color="brown darken-2" dark>
        <v-toolbar-title>
          <v-icon>mdi-chat</v-icon>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn to="/login" outlined x-small>Login</v-btn>
      </v-toolbar>
    </v-card>
    <v-card shaped width="400" class="mx-auto mt-5">
      <!-- m=margin, x=leftとrightの両方の間隔を調整, t=margin-topとpadding-topを適用 5=20px -->
      <v-card-title>
        <h1 class="display-1">Register</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="registerUser">
          <v-text-field label="email" type="email" prepend-icon="mdi-email" v-model="email" />
          <v-text-field
            v-bind:type="showPassword ? 'text' : 'password'"
            v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="password"
            prepend-icon="mdi-lock"
            @click:append="showPassword = !showPassword"
            v-model="password"
          />
          <!-- showPasswordがtrueならtypeをtextに、falseならpasswordにする -->
          <!-- prepend-iconは先頭に、append-iconは後ろ側にアイコンを設定する -->
          <!-- appendアイコンをクリック=>showPasswordのtrue,false切り替え -->

          <v-row justify="center">
            <v-card-title v-for="(error, index) in errors" :key="index" class="error--text">{{ error }}</v-card-title>
            <v-card-actions>
              <v-btn dark class="title brown darken-2" width="200" type="submit">submit</v-btn>
            </v-card-actions>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import firebase from "@/plugins/firebase";
// import { auth } from "@/plugins/firebase"; 必要なし？

export default {
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    registerUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          const user = response.user;
          firebase
            .database()
            .ref("users")
            .child(user.uid)
            .set({
              user_id: user.uid,
              email: user.email,
            })
            .then(() => {
              this.$router.push("/chat");
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
          if (e.code == "auth/email-already-in-use") {
            this.errors.push("入力したメールアドレスは登録済みです");
          } else {
            this.errors.push(
              "入力したメールアドレスかパスワードに問題があります。"
            );
          }
        });
    },
  },
};
</script>