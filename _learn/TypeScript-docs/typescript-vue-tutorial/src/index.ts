import Vue from "vue";

import Hello from "./component/Hello.vue";
const v = new Vue({
  el: "#app",
  components: {
    Hello
  },
  template: `
    <div>
      <hello :name="name" :initialEnthusiasm="5" />
      <div>Hello {{name}}!</div>
      Name: <input v-model="name" type="text">
    </div>`,
  data: {
    name: "World"
  }
});
