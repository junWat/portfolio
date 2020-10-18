<template>
  <v-app>
    <v-app-bar clipped-left fixed app dark color="brown darken-4">
      <v-btn icon to="/login"
        ><v-icon>mdi-chat-processing-outline</v-icon></v-btn
      >
      <v-btn icon to="/todo"><v-icon>mdi-format-list-checks</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list dense nav>
        <template v-for="nav_list in nav_lists">
          <v-list-item
            v-if="!nav_list.lists"
            :to="nav_list.link"
            :key="nav_list.name"
            @click="menu_close"
          >
            <!-- 下の階層を持たないメニュー項目をクリックした際に開いたサブメニューを閉じたいので下の階層を持たないメニュー項目のv-list-itemにclickイベントを追加します。メソッド名はmenu_closeとします。 -->
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            v-else
            :key="nav_list.name"
            :prepend-icon="nav_list.icon"
            no-action
            v-model="nav_list.active"
          >
            <!-- v-list-groupではpropsのvalueでメニューの開け閉めを制御することができます。v-modelを設定することでv-list-groupのvalueの値を設定しています。 -->
            <!--:append-icon="nav_list.lists ? undefined : ''"
              -->
            <!-- nav_list.listsがあれば矢印(undefined)、なければ矢印なし('') -->
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="list in nav_list.lists"
              :key="list.name"
              :to="list.link"
            >
              <v-list-item-icon>
                <v-icon>{{ list.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ list.name }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app color="brown darken-4" dark>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Jun's portfolio site",
      nav_lists: [
        { name: "Profile", icon: "mdi-account-circle", link: "/profile" },
        {
          name: "Chat App",
          icon: "mdi-chat-processing-outline",
          active: false,
          // このactiveの値でメニューが開いているか閉じているかを管理します。そのためv-list-groupにv-modelを追加します。
          link: "",
          lists: [
            {
              name: "Register",
              link: "/register",
              icon: "mdi-account-plus",
            },
            {
              name: "Login",
              link: "/login",
              icon: "mdi-login",
            },
             {
              name: "Chat",
              link: "/chat",
              icon: "mdi-chat-processing-outline",
            },
          ],
        },
        {
          name: "To Do List",
          icon: "mdi-format-list-checks",
          link: "/todo",
        },

        {
          name: "Supports",
          icon: "mdi-help-circle",
          active: false,
          link: "",
          lists: [
            {
              name: "Top Page",
              icon: "mdi-book-open-variant",
              link: "/top-description",
            },
            {
              name: "Chat App Manual",
              icon: "mdi-book-open-variant",
              link: "/how-to-use-chat",
            },
            {
              name: "Todo App Manual",
              icon: "mdi-book-open-variant",
              link: "/how-to-use-todo",
            },
          ],
        },
        {
          name: "Contact",
          icon: "mdi-email-multiple-outline",
          link: "/profile",
        },
      ],
    };
  },
  methods: {
    menu_close() {
      this.nav_lists.forEach((nav_list) => (nav_list.active = false));
    },
  },
};
</script>
