<template>
  <div>
    <v-toolbar color="brown darken-2" dark>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-{{ `chevron-${drawer ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title>{{ channel_name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon small>mdi-star-outline</v-icon>
      <v-btn icon x-small>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon x-small>
        <v-icon>mdi-phone</v-icon>
      </v-btn>
      <v-btn icon x-small>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
      <v-btn icon x-small>
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
      <v-btn icon x-small>
        <v-icon>mdi-star-outline</v-icon>
      </v-btn>
      <v-btn
        @click="logout"
        x-small
        light
        class="white brown--text text--darken-4"
        right
      >
        <v-icon x-small>mdi-logout</v-icon>ログアウト
      </v-btn>
    </v-toolbar>
    <v-list two-line>
      <v-list-item v-for="message in messages" :key="message.key">
        <v-avatar>
          <img :src="'http://i.pravatar.cc/150?u=' + message.user" />
        </v-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ message.user }}</v-list-item-title>
          <v-list-item-subtitle>{{ message.content }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <br />
    <v-row>
      <v-col>
        <v-form >
          <v-textarea
            solo
            name="input-7-4"
            :label="placeholder"
            v-model="message"
            :placeholder="placeholder"
          ></v-textarea>
          <v-btn @click="sendMessage" dark class="title brown darken-2"
            >送信</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
      hide-overlay
      :permanent="drawer"
      class="brown darken-2"
      dark
    >
      <v-list>
        <v-list-item>
          <v-list-item-title>
            Chat App
            <v-icon right size="20">mdi-bell-outline</v-icon>
          </v-list-item-title>
        </v-list-item>
        <v-list-item dense class="pb-1">
          <v-icon x-small class="red--text">mdi-circle</v-icon>
          {{ user.email }}
        </v-list-item>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item style="opacity: 0.7">
              チャンネル
              <v-spacer></v-spacer>
              <v-icon x-small v-bind="attrs" v-on="on"
                >mdi-plus-circle-outline</v-icon
              >
            </v-list-item>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">チャンネルを作成する</span>
            </v-card-title>
            <v-card-text>
              チャンネルはチームがコニュニケーションを取る場所です。特定のトピックに基づいてチャンネルを作ると良いでしょう。(例:
              #マーケティング)
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="チャンネル名*"
                      required
                      solo
                      v-model="channel"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="[
                        'Skiing',
                        'Ice hockey',
                        'Soccer',
                        'Basketball',
                        'Hockey',
                        'Reading',
                        'Writing',
                        'Coding',
                        'Basejump',
                      ]"
                      label="Interests"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false"
                >閉じる</v-btn
              >
              <v-btn color="blue darken-1" dark @click="addChannel">作成</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-divider></v-divider>
        <v-list-item v-for="channel in channels" :key="channel.id" class="py-0">
          <v-list-item-title
            @click="channelMessage(channel)"
            style="opacity: 0.9; cursor: pointer"
            ># {{ channel.channel_name }}</v-list-item-title
          >
        </v-list-item>
        <v-list-item style="opacity: 0.7" class="pt-3">
          <v-list-item-title>
            ダイレクトメッセージ
            <v-icon x-small right>mdi-plus-circle-outline</v-icon>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="user in users" :key="user.id" class="py-0">
          <v-list-item-content>
            <v-list-item-title
              @click="directMessage(user)"
              style="opacity: 0.9; cursor: pointer"
            >
              <v-icon
                x-small
                :class="[isOnline(user) ? 'red--text' : 'grey--text']"
                >mdi-circle</v-icon
              >
              {{ user.email }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";

export default {
  name: "Home",
  data() {
    return {
      drawer: true,
      group: true,
      user: "",
      users: [],
      channel_name: "",
      message: "",
      placeholder: "",
      channel_id: "",
      messages: [],
      dialog: false,
      channel: "",
      channels: [],
      connectionRef: firebase.database().ref("connections"),
      connection_key: "",
      connections: [],
    };
  },
  // computed: {
  //   avator_url() {
  //     return "http://i.pravatar.cc/150?u=" + this.message.user;
  //   },
  // },
  methods: {
    logout() {
      this.connectionRef.child(this.connection_key).remove();
      firebase.auth().signOut();
      this.$router.push("/login");
    },
    sendMessage() {
      const newMessage = firebase
        .database()
        .ref("messages")
        .child(this.channel_id)
        .push();

      const key_id = newMessage.key;

      newMessage.set({
        key: key_id,
        content: this.message,
        user: this.user.email,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });

      this.message = "";
    },
    directMessage(user) {
      this.messages = [];
      this.user.uid > user.user_id
        ? (this.channel_id = this.user.uid + "-" + user.user_id)
        : (this.channel_id = user.user_id + "-" + this.user.uid);

      this.channel_name = user.email;
      this.placeholder = user.email + "へのメッセージ";

      if (this.channel_id != "") {
        firebase.database().ref("messages").child(this.channel_id).off();
      }

      firebase
        .database()
        .ref("messages")
        .child(this.channel_id)
        .on("child_added", (snapshot) => {
          this.messages.push(snapshot.val());
        });
    },
    addChannel() {
      const newChannel = firebase.database().ref("channel").push();

      const key_id = newChannel.key;

      newChannel
        .set({
          channel_name: this.channel,
          id: key_id,
        })
        .then(() => {
          this.dialog = false;
        });

      this.channel = "";
    },
    channelMessage(channel) {
      this.messages = [];
      this.channel_name = "#" + channel.channel_name;
      this.placeholder = "#" + channel.channel_name + "へのメッセージ";
      this.channel_id = channel.id;

      if (this.channel_id != "") {
        firebase.database().ref("messages").child(this.channel_id).off();
      }

      firebase
        .database()
        .ref("messages")
        .child(channel.id)
        .on("child_added", (snapshot) => {
          this.messages.push(snapshot.val());
        });
    },
    isOnline(user) {
      if (!user) return false; // ←Userにデータが入ってない場合はfalseを返す
      if (user.status === "online") {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.user = firebase.auth().currentUser;

    // var test = ""
    // firebase.auth().onAuthStateChanged(function (user) {
    //   if (user) {
    //     console.log("383" ,user);
    //     test = user;
    //   } else {
    //     this.user = firebase.auth().currentUser;
    //     console.log("else", this.user);
    //   }
    // });

    // this.user = test

    console.log("this.user", this.user);
    firebase
      .database()
      .ref("users")
      .on("child_added", (snapshot) => {
        let user = snapshot.val();
        //  console.log("a", user)
        //  console.log("b", this.users)
        this.users.push(user);
        //  console.log("c", user)   //変化なし？
        //  console.log("d", this.users)  //変化なし
      });

    firebase
      .database()
      .ref(".info/connected") //DBの.info/connectedにアクセスを行い、DBへの接続が完了しているかチェック
      .on("value", (snapshot) => {
        if (snapshot.val() === true) {
          let ref = this.connectionRef.push();
          this.connection_key = ref.key;
          ref.onDisconnect().remove();

          ref.set({
            user_id: this.user.uid,
            key: this.connection_key,
          });
        }
      });

    firebase
      .database()
      .ref("connections")
      .on("child_added", (snapshot) => {
        let new_connection = snapshot.val();
        this.connections.push(new_connection);
        console.log("f", this.users);
        console.log("g", new_connection);

        let user = this.users.find(
          (user) => user.user_id == new_connection.user_id
        );
        console.log("e", user);
        if (user) {
          user.status = "online";
        }
      });

    firebase
      .database()
      .ref("channel")
      .on("child_added", (snapshot) => {
        this.channels.push(snapshot.val());
      });
  },
  beforeDestroy() {
    //リスナーの停止
    firebase.database().ref("users").off();

    if (this.channel_id) {
      //messagesのリスナー停止
      firebase.database().ref("messages").child(this.channel_id).off();
    }
    // firebase.data().ref("./info/connected").off();
  },
};
</script>