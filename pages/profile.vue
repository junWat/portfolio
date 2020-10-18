<template>
  <v-content class="py-0 my-0">
    <v-container class="bg fill-height" fluid dark>
      <div style="margin: auto">
        <h2 style="text-align: center">◆Profile◆</h2>
        <h3 class="white--text mx-auto">
          社会人２年目のジュンです。大手通信会社の法人部隊でネットワークやサーバなどインフラに関わるSEをやっています。将来的には開発などをやっていきたいと思いプログラミングを学習し始めました。そのポートフォリオとしてVue.js(Nuxt.js)やFirebaseを使って作ったチャットアプリや、タスク管理ツールなどを本ページに公開しています。
        </h3>
      </div>
      <div style="margin: auto">
        <h2>◆Skill Set◆</h2>
        <h3>
          ・HTML/CSS <br />
          ・JavaScript <br />
          ・Vue.js <br />
          ・Nuxt.js <br />
          ・Firebase <br />
          ・Vuetify
        </h3>
      </div>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.bg {
  height: 1000px;
  background-image: url("~@/assets/image/cape.jpg");
  /* 画像を常に天地左右の中央に配置 */
  background-position: center center;

  /* 画像をタイル状に繰り返し表示しない */
  background-repeat: no-repeat;

  /* コンテンツの高さが画像の高さより大きい時、動かないように固定 */
  background-attachment: fixed;

  /* 表示するコンテナの大きさに基づいて、背景画像を調整 */
  background-size: cover;

  /* 背景画像が読み込まれる前に表示される背景のカラー */
  background-color: #464646;
}
</style>