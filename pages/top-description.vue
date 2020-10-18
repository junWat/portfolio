<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-card>
        <v-card-title>トップページ解説</v-card-title>
        <v-img
          :src="top"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          contain
        ></v-img>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    top: require("@/assets/image/top.png"),
  }),
};
</script>