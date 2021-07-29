<template>
  <div class="animate-schedule">
    <div class="schedule-nav">
      <template v-for="(item, index) of week" :key="index">
        <input
          type="radio"
          name="weekday"
          v-model="currentDay"
          :value="item.key"
          :id="item.key"
        />
        <label class="week-day" :for="item.key">{{ item.label }}</label>
      </template>
    </div>
    <div class="schedule-main">
      <div
        v-for="(item, index) of currentList"
        :key="index"
        class="schedule-item"
      >
        <span class="animate-title">{{ item.title }}</span>
        <a :href="item.url" target="_blank">
          <div class="animate-detail">
            <img :src="item.image_url" />
            <div style="margin-left: 10px; color: #606266">
              <span>{{ item.title }}</span>
              <br />
              <span>放送时间:</span>
              {{ item.airing_start.split("T")[0] }}
              <br />
              <span>简介:</span>
              由于返回的文本都是英文所以就不要了
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface IAnimateScheduleItem {
  mal_id: number; //id
  url: string; //详情地址
  title: string; //标题
  image_url: string; //海报
  airing_start: string; //放送时间
}

interface IAnimateSchedule {
  monday?: IAnimateScheduleItem[];
  tuesday?: IAnimateScheduleItem[];
  wednesday?: IAnimateScheduleItem[];
  thursday?: IAnimateScheduleItem[];
  friday?: IAnimateScheduleItem[];
  saturday?: IAnimateScheduleItem[];
  sunday?: IAnimateScheduleItem[];
  [key: string]: any;
}

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  onBeforeUnmount,
} from "vue";
import { GET, CANCEL_TOEKN } from "@/plugins/axios";
export default defineComponent({
  setup() {
    const source = CANCEL_TOEKN.source();

    const schedule = ref<IAnimateSchedule>({});

    const currentDay = ref("");

    const week = [
      {
        key: "monday",
        label: "周一",
      },
      {
        key: "tuesday",
        label: "周二",
      },
      {
        key: "wednesday",
        label: "周三",
      },
      {
        key: "thursday",
        label: "周四",
      },
      {
        key: "friday",
        label: "周五",
      },
      {
        key: "saturday",
        label: "周六",
      },
      {
        key: "sunday",
        label: "周日",
      },
    ];

    const currentList = computed(() => schedule.value[currentDay.value]);

    const getSchedule = async () => {
      let res: IAnimateSchedule = await GET(
        "/jikan/schedule",
        undefined,
        source.token
      );
      let data: IAnimateSchedule = {};
      const keys = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      keys.forEach((key) => {
        let result = res[key];
        if (result.length > 0) {
          result = result.map((item: IAnimateScheduleItem) => ({
            mal_id: item.mal_id,
            url: item.url,
            title: item.title,
            image_url: item.image_url,
            airing_start: item.airing_start,
          }));
          data[key] = result;
        }
      });
      schedule.value = data;
    };

    const getCurrentDay = () => {
      const str = new Date().toDateString().split(" ")[0].toLowerCase();
      currentDay.value = week.filter((item) => item.key.startsWith(str))[0][
        "key"
      ];
    };

    onMounted(() => {
      getSchedule();
      getCurrentDay();
    });

    onBeforeUnmount(() => {
      source.cancel("cancel");
    });

    return {
      week,
      currentDay,
      currentList,
    };
  },
});
</script>

<style scoped>
.animate-schedule {
  min-width: 320px;
  max-width: 800px;
  margin: 10px auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}
.schedule-nav {
  display: flex;
}
.week-day {
  flex: 1;
  text-align: center;
  line-height: 50px;
  background-color: #44607c;
  color: #fefefe;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  cursor: pointer;
}
input[type="radio"] {
  display: none;
}
.week-day:hover {
  background-color: #2c3e50;
}
input:checked + .week-day {
  background-color: #233240;
}
img {
  width: 120px;
  object-fit: cover;
}
a {
  text-decoration: none;
}
.schedule-main {
  padding: 10px;
}
.schedule-item {
  text-align: left;
  cursor: pointer;
  padding: 10px;
}
.animate-detail {
  display: none;
}
.schedule-item:hover {
  background-color: #f6f8fa;
}
.schedule-item:hover .animate-title {
  display: none;
}
.schedule-item:hover .animate-detail {
  display: flex;
}
.animate-title {
  color: #909399;
  line-height: 20px;
}
</style>
