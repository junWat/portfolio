<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card>
            <v-card-title v-text="card.title"></v-card-title>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              contain
            >
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-card>
        <v-card-title>チャンネルでトークを開始しましょう</v-card-title>
        <v-img
          :src="channel"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          contain
        ></v-img>
        <v-card-title>ダイレクトメッセージを送りましょう</v-card-title>
        <v-img
          :src="direct"
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
    cards: [
      {
        title: "ユーザー登録をしましょう",
        src: require("@/assets/image/register.png"),
        flex: 6,
      },
      {
        title: "ログインをしましょう",
        src: require("@/assets/image/login.png"),
        flex: 6,
      },
    ],
    channel: require("@/assets/image/channel.png"),
    direct: require("@/assets/image/directmessage.png"),
  }),
};
</script>