<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Switch :value="isChecked" @change="toggle" />
    {{ len }}
    <StarRate @change="rateChange" />
    <div style="width: 500px; margin: auto">
      <Input :height="50" :fontSize="20" label="测试" />
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Switch from "@/components/Switch.vue";
import StarRate from "@/components/StarRate.vue";
import Input from "@/components/Input.vue";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    Switch,
    StarRate,
    Input,
  },
  setup() {
    const instance = getCurrentInstance();

    const axios = instance?.proxy?.$axios;

    const graphQLTest = () => {
      axios
        ?.get("http://localhost:3000/", {
          params: {
            query:
              "{ Post(id: 1) { id title views User { name } Comments { date body } } }",
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => console.log("请求 graphQl"));
    };

    const isChecked = ref(false);

    const store = useStore();

    const len = computed(() => {
      return store.state.todos.length;
    });

    const toggle = async (value: boolean): Promise<any> => {
      isChecked.value = value;
      if (value) {
        // store.commit('ADDTODO')
        console.log("start loading");
        const res = await store.dispatch("addTodo");
        console.log(res);
        console.log("end loading");
        console.log(store.state);
      } else {
        store.commit("DELETETODO");
        console.log(store.state);
      }
    };

    const rateChange = (value: string): void => {
      console.log(`当前评分${value}`);
    };

    onMounted(() => {
      toggle(true);
      graphQLTest();
    });

    return {
      isChecked,
      toggle,
      len,
      rateChange,
    };
  },
});
</script>
