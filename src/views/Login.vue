<template>
  <div :style="backgroundStyle">
    <div class="form-wrapper">
      <form @submit.prevent="login">
        <Input
          :label="'邮箱'"
          v-model:value="account"
          :height="38"
          :labelWidth="40"
        />
        <Input
          :label="'密码'"
          :type="'password'"
          v-model:value="password"
          :height="38"
          :labelWidth="40"
        />
        <input type="submit" style="display: none" />
        <Button @click="login" v-if="routeName === 'Login'">登入</Button>
        <Button @click="regist" v-if="routeName !== 'ResetPassword'"
          >注册</Button
        >
        <Button @click="regist" v-if="routeName === 'ResetPassword'"
          >重置</Button
        >
        <Button @click="back" v-if="routeName !== 'Login'">返回</Button>
        <Link @click="resetPassword" v-if="routeName === 'Login'"
          >忘记密码</Link
        >
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Link from "@/components/Link.vue";
import { useWindowHeight } from "@/hooks/index";

export default defineComponent({
  components: {
    Input,
    Button,
    Link,
  },
  setup() {
    const formValue = reactive({
      account: "",
      password: "",
    });

    const router = useRouter();

    const route = useRoute();

    const height = useWindowHeight();

    const routeName = computed(() => route.name);

    const backgroundStyle = computed(() => ({
      height: `${height.value}px`,
      backgroundColor: "#35495e",
    }));

    const login = () => {
      console.log(formValue);
    };

    const regist = () => {
      if (routeName.value === "Register") {
        console.log("注册");
      } else {
        router.push({ name: "Register" });
      }
    };

    const resetPassword = () => router.push({ name: "ResetPassword" });

    const back = () => router.back();

    return {
      login,
      regist,
      resetPassword,
      back,
      routeName,
      backgroundStyle,
      ...toRefs(formValue),
    };
  },
});
</script>

<style scoped>
.form-wrapper {
  width: 250px;
  margin: auto;
}
.form-wrapper::before {
  content: "";
  display: table;
}
</style>
