export const state = () => ({
    headers: [
      {
        text: "タスク",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "登録日時", value: "created" },
      { text: "状態", value: "state" },
      { text: "アクション", value: "actions", sortable: false }
    ],
    tasks: [
      {
        name: "training",
        created: "2020-04-30 17:00",
        state: "作業前"
      },
      {
        name: "study",
        created: "2020-04-30 16:00",
        state: "作業中"
      }
    ],
    option: [
      { id: 0, label: "作業前" },
      { id: 1, label: "作業中" },
      { id: 2, label: "完了" }
    ]
  });
  
  export const mutations = {
    insert(state, obj) {
      var d = new Date();
      var fmt =
        d.getFullYear() +
        "-" +
        ("00" + (d.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + d.getDate()).slice(-2) +
        " " +
        ("00" + d.getHours()).slice(-2) +
        ":" +
        ("00" + d.getMinutes()).slice(-2);
      console.log(obj);
      state.tasks.unshift({
        name: obj.content,
        created: fmt,
        state: obj.state
      });
    },
    edit(state, obj) {
      console.log(obj);
      console.log("h", state.tasks[obj.editedIndex]);
      console.log("II", obj.editedIndex);
      Object.assign(state.tasks[obj.editedIndex], obj.editedItem);
    },
    remove: function(state, obj) {
      const index = state.tasks.indexOf(obj);
      confirm("Are you sure you want to delete this item?") &&
        state.tasks.splice(index, 1);
      // for (let i = 0; i < state.tasks.length; i++) {
      //   const ob = state.tasks[i];
      //   if (ob.content == obj.content && ob.created == obj.created) {
      //     if (confirm('"' + ob.content + '"を削除しますか？')) {
      //       state.tasks.splice(i, 1);
      //       return;
      //     }
      //   }
      // }
    },
    changeState: function(state, obj) {
      for (let i = 0; i < state.tasks.length; i++) {
        const ob = state.tasks[i];
        if (
          ob.content == obj.content &&
          ob.created == obj.created &&
          ob.state == obj.state
        ) {
          let nowState;
          for (let j = 0; j < state.option.length; j++) {
            if (state.option[j].label == ob.state) {
              nowState = state.option[j].id;
            }
          }
          nowState++;
          if (nowState >= state.option.length) {
            nowState = 0;
          }
          obj.state = state.option[nowState].label;
        }
      }
    }
  };
  
  export const actions = {
    insert(context, obj) {
      context.commit("insert", obj);
    },
    edit(context, obj) {
      context.commit("edit", obj);
    },
    remove(context, obj) {
      context.commit("remove", obj);
    },
    changeState(context, obj) {
      context.commit("changeState", obj);
    }
  };
  