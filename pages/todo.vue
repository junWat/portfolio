<template>
  <v-data-table
    :headers="headers"
    :items="display_tasks"
    :items-per-page="10"
    class="elevation-1"
    :search="search"
    :custom-filter="filter"
  >
    <template v-slot:top>
      <v-toolbar dark flat color="brown darken-2">
        <v-toolbar-title>To Do List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="deep-orange darken-4"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="reset_editIndex"
            >
              <v-icon x-small>mdi-plus-circle-outline</v-icon>
              タスクを追加する
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">タスクを{{ InsertOrEdit }}する</span>
            </v-card-title>
            <v-card-text>
              タスクを{{ InsertOrEdit }}しましょう。(例: #プログラミング)
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-if="editedIndex === -1"
                      label="タスク名*"
                      required
                      solo
                      v-model="content"
                    ></v-text-field>
                    <v-text-field
                      v-else
                      label="タスク名*"
                      required
                      solo
                      v-model="editedItem.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-if="editedIndex === -1"
                      :items="['作業前', '作業中', '完了']"
                      label="状態"
                      v-model="state"
                    ></v-autocomplete>
                    <v-autocomplete
                      v-else
                      :items="['作業前', '作業中', '完了']"
                      label="状態"
                      v-model="editedItem.state"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-orange darken-4" text @click="dialog = false"
                >閉じる</v-btn
              >
              <v-btn color="deep-orange darken-4" dark @click="insert">{{
                InsertOrEdit
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-text-field
        append-icon="mdi-magnify"
        v-model="search"
        label="Search"
        class="mx-4"
      ></v-text-field>
      <v-btn
        dark
        class="brown lighten-1"
        :class="{ 'is-active': !find_flg }"
        @click="flag_reset"
        >全状態</v-btn
      >
      <v-btn
        class="brown lighten-1"
        dark
        :class="{ 'is-active': find_flg && find_state == '作業前' }"
        @click="find('作業前')"
        >作業前</v-btn
      >
      <v-btn
        class="brown lighten-1"
        dark
        :class="{ 'is-active': find_flg && find_state == '作業中' }"
        @click="find('作業中')"
        >作業中</v-btn
      >
      <v-btn
        class="brown lighten-1"
        dark
        :class="{ 'is-active': find_flg && find_state == '完了' }"
        @click="find('完了')"
        >完了</v-btn
      >
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="changeState(item)">
        mdi-list-status
      </v-icon>
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="remove(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      dialog_edit: false,
      content: "",
      state: "作業前",
      search: "",
      find_flg: false,
      find_state: "",
      editedIndex: -1,
      editedItem: {
        name: "",
        created: "",
        state: "",
      },
    };
  },
  computed: {
    ...mapState("todo", ["headers", "tasks"]),
    display_tasks: function () {
      if (this.find_flg) {
        let arr = [];
        let data = this.tasks;
        data.forEach((element) => {
          if (element.state == this.find_state) {
            arr.push(element);
          }
        });
        return arr;
      } else {
        return this.tasks;
      }
    },
    InsertOrEdit() {
      return this.editedIndex === -1 ? "追加" : "編集";
    },
  },
  methods: {
    ...mapActions("todo", ["remove", "filter", "changeState"]),
    insert() {
      if ((this.content != "") | (this.editedItem != "")) {
        if (this.editedIndex > -1) {
          this.edit();
          this.editedIndex = -1;
          this.editedItem = "";
          this.dialog = false;
        } else {
          this.$store.dispatch("todo/insert", {
            content: this.content,
            state: this.state,
          });
          this.content = "";
          this.dialog = false;
          console.log("insert");
        }
      }
    },
    edit() {
      console.log("a", this.tasks[this.editedIndex]);
      console.log("b", this.editedItem);
      this.$store.dispatch("todo/edit", {
        editedItem: this.editedItem,
        editedIndex: this.editedIndex,
      });
      // Object.assign(this.tasks[this.editedIndex], this.editedItem);
    },
    editItem(item) {
      this.editedIndex = this.tasks.indexOf(item);
      console.log("editItem => this.editedIndex:", this.editedIndex);
      this.editedItem = Object.assign({}, item);
      console.log("editedItem", this.editedItem);
      this.dialog = true;
      // this.editedItem = item
      // this.$store.commit("todo/editItem", item);
      // console.log("c", item);
    },
    filter(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    },
    find: function (findState) {
      this.find_state = findState;
      this.find_flg = true;
    },
    flag_reset: function () {
      this.find_flg = false;
    },
    reset_editIndex() {
      this.editedIndex = -1;
      console.log("rr", this.editedIndex);
    },
  },
};
</script>