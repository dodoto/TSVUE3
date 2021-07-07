<template>
  <div class="upload-container">
    <label class="upload-btn" for="upload">upload</label>
    <input
      type="file"
      style="display: none"
      id="upload"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import initSliceUpload from "@/utils/upload";

export default defineComponent({
  setup() {
    let instance: any;

    onMounted(() => {
      const baseUrl = "http://localhost:3000";
      const uploadUrl = `${baseUrl}/upload/single`;
      const uploadedUrl = `${baseUrl}/upload/exists`;
      const concatUrl = `${baseUrl}/upload/concatFiles`;
      instance = initSliceUpload(uploadUrl, uploadedUrl, concatUrl);
    });

    const handleChange = async (e: Event) => {
      const input = e.target as HTMLInputElement;
      const file = input.files![0];
      const MD5 = await instance.calcFileMD5(file);
      const result = await instance.getUploaded(file.name, MD5);
      console.log(result);
      if (result.status === "success" && !result.data.isExists) {
        const chunkIds = result.data.chunkIds;
        instance
          .upload({
            file,
            fileMd5: MD5,
            fileSize: file.size,
            chunkIds,
          })
          .then((res: any) => {
            instance
              .concatFiles(file.name, MD5)
              .then((res: any) => console.log(res));
          });
      }
    };
    return {
      handleChange,
    };
  },
});
</script>

<style scoped>
.upload-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload-btn {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  color: #17f;
  background-color: #fff;
  border: 4px solid #17f;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 8rem;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
