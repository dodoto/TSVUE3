<template>
  <select @change="handleSelect">
    <option value="">选择固定列</option>
    <option v-for="title of titles" :key="title" :value="title">
      {{ title }}
    </option>
  </select>
  <div class="drag-table" @scroll="handleScroll" :ref="getTableBoxEl">
    <!-- 固定列 -->
    <div
      class="fixed-column"
      v-if="fixedField !== ''"
      :style="{
        left: `${fixedColumnLeft}px`,
        transform: `translate3D(${fixedColumnTransformLeft}px,0,0)`,
        width: `${fixedColumnWidth}px`,
      }"
    >
      <table>
        <thead>
          <th>{{ fixedField }}</th>
        </thead>
        <tbody>
          <tr v-for="(column, index) of fixedColumnData" :key="index">
            <td>{{ column }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 固定头 -->
    <div class="fixed-head" v-if="false">
      <table>
        <colgroup>
          <col
            v-for="(title, index) of titles"
            :key="title"
            :width="ColumnWidths[index]"
          />
          <!-- 隐形col,当内容宽度小于实际宽度时,接收剩余的宽度 -->
          <col />
        </colgroup>
        <thead>
          <th v-for="title of titles" :key="title">{{ title }}</th>
        </thead>
      </table>
    </div>
    <!-- 实际表内容 -->
    <table>
      <colgroup>
        <col
          v-for="(title, index) of titles"
          :key="title"
          :width="ColumnWidths[index]"
        />
        <!-- 隐形col,当内容宽度小于实际宽度时,接收剩余的宽度 -->
        <col />
      </colgroup>
      <thead>
        <th v-for="title of titles" :key="title">{{ title }}</th>
      </thead>
      <tbody>
        <tr v-for="item of data" :key="item.id">
          <td v-for="title of titles" :key="title">{{ item[title] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watchEffect } from "vue";
import { GET } from "@/plugins/axios";

interface TableDataItem {
  [key: string]: any;
}

type TableData = TableDataItem[];

export default defineComponent({
  setup() {
    let TableBoxEl: HTMLElement;

    const ColumnWidths = ref<number[]>([]);

    const data = ref<TableData>([]);

    const fixedField = ref<string>("");

    const fixedColumnTransformLeft = ref<number>(0);

    const titles = computed(() => {
      const item = data.value[0];
      if (item === undefined) return [];
      return Object.keys(item);
    });

    const fixedColumnData = computed(() => {
      const key = fixedField.value;
      return data.value.map((item) => item[key]);
    });

    const fixedColumnIndex = computed(() => {
      return titles.value.findIndex((title) => title === fixedField.value);
    });

    const fixedColumnWidth = computed(() => {
      const widths = ColumnWidths.value;
      const index = fixedColumnIndex.value;
      return widths[index] + 1;
    });

    const fixedColumnLeft = computed(() => {
      const index = fixedColumnIndex.value;
      if (index > 0) {
        const widths = ColumnWidths.value;
        let left = 0;
        for (let i = 0; i < index; i++) {
          left += widths[i];
        }
        return left;
      } else {
        return 0;
      }
    });

    const getColumnWidths = (len: number) => {
      for (let i = 0; i < len; i++) {
        ColumnWidths.value.push(200);
      }
    };

    const getData = () => {
      GET("http://localhost:3000/users")
        .then((res) => {
          const item = res[0];
          if (item !== undefined) getColumnWidths(Object.keys(item).length);
          data.value = res;
        })
        .catch((err) => console.log(err));
    };

    const handleSelect = (e: InputEvent) => {
      const selectEl = e.target as HTMLInputElement;
      const value = selectEl.value;
      fixedField.value = value;
    };

    const getTableBoxEl = (ref: HTMLElement) => (TableBoxEl = ref);

    const handleScroll = () => {
      if (fixedField.value !== "") {
        const scrollLeft = TableBoxEl.scrollLeft;
        const offsetLeft = scrollLeft - fixedColumnLeft.value;
        fixedColumnTransformLeft.value = Math.max(offsetLeft, 0);
      }
    };

    watchEffect(handleScroll);

    onMounted(getData);

    return {
      data, //表格数据
      titles, //表格头
      fixedField, //固定字段
      fixedColumnIndex, //固定列下标
      fixedColumnData, //固定列数据
      fixedColumnLeft, //固定列x坐标
      fixedColumnWidth, //固定列宽度
      fixedColumnTransformLeft, //固定列x轴偏移量
      ColumnWidths, //单元格宽度集合
      handleSelect, //选择处理函数
      handleScroll, //滚动处理函数
      getTableBoxEl,
    };
  },
});
</script>

<style scoped>
.drag-table {
  width: 800px;
  margin: 100px auto;
  overflow: auto;
  text-align: left;
  position: relative;
  background-color: #fff;
}
.fixed-column,
.fixed-head {
  position: absolute;
  top: 0;
}
.fixed-column {
  background-color: turquoise;
  box-shadow: 0 2px 10px rgba(10, 16, 20, 0.48), 0 0 2px rgba(10, 16, 20, 0.24);
}
table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}
.drag-table > table {
  border: 1px solid slategray;
}
th,
td {
  height: 40px;
  padding-left: 20px;
  border: 1px solid slategray;
}
</style>
