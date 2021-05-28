<template>
  <div class="todo-container">
    <div class="todo-card">
      <header>
        <div class="header-right">
          
        </div>
        <div class="header-left">
          <p>UR TO-DO</p>
          <nav>
            <span>TODAY</span>
            <span>WEEK</span>
            <span>MONTH</span>
          </nav>
        </div>
      </header>
      <main>
        <div class="time-todo" v-for="item of dayTime" :key="item">
          <p>
            {{`${item}:00`}}
          </p>
          <div class="time-line">
            <div class="todo-content">Running</div>
          </div>
        </div>
      </main>
      <div class="add-btn"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const dayTime = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]

export default defineComponent({
  setup() {
    return {
      dayTime
    }
  },
})
</script>

<style scoped>
.todo-container {
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background-color: #F1E9DC;
  /* --green: ;
  --yellow: ;
  --red: ; */
}
.todo-card {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  width: 300px;
  height: 600px;
  border-radius: 50px;
  box-shadow: 0 20px 20px -20px #997E6E,0 20px 20px -20px #997E6E; 
  overflow: hidden;
}
header {
  height: 160px;
  background-color: #2D1E14;
  color: #FAF8F4;
}
header > .header-right {
  float: right;
  width: 30%;
  height: 100%;
  padding-bottom: 40px;
  box-sizing: border-box;
}
header > .header-left {
  margin-right:30%;
  margin-top: 50px;
}
header::before {
  content: '';
  display: table;
}
header  p {
  font-size: 28px;
  font-weight: bold;
}
nav > span {
  font-size: 14px;
  text-align: center;
  /* color: #F68054; */
  font-weight: bold;
  line-height: 40px;
  margin-left: 10px;
  cursor: pointer;
}
nav > span:hover{
  color: #F68054;
}
main {
  position: absolute;
  top: 120px; bottom: 0;
  padding-top: 20px;
  padding-bottom: 60px;
  border-top-left-radius: 50px;
  width: 100%;
  overflow: auto;
  background-color: #FFF;
  /* padding-bottom: 80px; */
}
main .time-todo {
  overflow: hidden;
}
main .time-todo p {
  float: left;
  width: 46px;
  text-align: right;
  color: #74737B;
}
main .time-todo .time-line {
  position: relative;
  margin-left: 50px;
  min-height: 60px;
}
main .time-todo .time-line::before {
  content: '';
  display: table;
}
main .time-todo .time-line::after {
  content: '';
  display: block;
  position: absolute;
  top: 9px;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #EBEBEB, #EBEBEB 10px, transparent 10px, transparent);
  background-size: 18px 100%;
}
main .time-todo .time-line .todo-content{
  padding: 20px;
  margin: 12px;
  margin-top: 21px;
  text-align: left;
  color: #4F3430;
  border-radius: 16px;
  border-bottom-left-radius: 0;
  background-color: #FFC970;
  /* background-color: #A0ECD9; */
  /* background-color: #F98B84; */
}
.add-btn {
  position: absolute;
  right: 20px; bottom: 20px;
  width: 50px; height: 50px;
  border-radius: 100px;
  background-color: #F68054;
}
.add-btn::before {
  content: '';
  display: block;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 20px;
  height: 5px;
  border-radius: 50px;
  background-color: #2D1E14;
}
.add-btn::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 5px;
  height: 20px;
  border-radius: 50px;
  background-color: #2D1E14;
}
</style>
