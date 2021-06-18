<template>
  <div class="form-background">
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
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Link from "@/components/Link.vue";
import { useRouteName } from "@/hooks/index";

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

    const routeName = useRouteName();

    const login = () => {
      console.log(formValue);
      router.push({ name: "BestSeller" });
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

    watch(routeName, () => {
      formValue.account = "";
      formValue.password = "";
    });

    return {
      login,
      regist,
      resetPassword,
      back,
      routeName,
      ...toRefs(formValue),
    };
  },
});
</script>

<style scoped>
.form-background {
  background-color: #4c6886;
  position: relative;
  min-height: 300px;
  overflow: hidden;
  height: 100vh;
}
.form-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 250px;
  z-index: 2;
}
.form-wrapper::before {
  content: "";
  display: table;
}

.form-background::before,
.form-background::after {
  content: "";
  position: absolute;
  left: -100%;
  min-width: 300vw;
  min-height: 300vw;
  background-color: #2c3e50;
  animation-name: rotate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.form-background::before {
  bottom: 25vh;
  border-radius: 45%;
  animation-duration: 16s;
}

.form-background::after {
  bottom: 22vh;
  opacity: 0.7;
  border-radius: 47%;
  animation-duration: 16s;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(180deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
