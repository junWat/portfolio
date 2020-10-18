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
              contain
            >
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    cards: [
      {
        title: "Todo Appページ概要",
        src: require("@/assets/image/todo1.png"),
        flex: 12,
      },
      {
        title: "タスクを追加しましょう",
        src: require("@/assets/image/todo2.png"),
        flex: 12,
      },

      {
        title: "タスクを編集しましょう",
        src: require("@/assets/image/todo3.png"),
        flex: 12,
      },
    ],
  }),
};
</script>