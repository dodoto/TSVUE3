import SparkMD5 from "spark-md5";
import { GET, POST } from "@/plugins/axios";

interface IuploadParam {
  file: File;
  fileMd5: string;
  fileSize: number;
  chunkSize: number;
  chunkIds: Array<string>;
  poolLimit: number;
}

interface IchunkParam {
  chunk: Blob;
  chunkIndex: number;
  fileMd5: string;
  fileName: string;
}

interface IuploadRecordItem {
  fileName: string;
  isUploaded: boolean;
  chunkIndex: number;
}

// 需要单片size, 默认上传地址
class SliceUpload {
  readonly chunkSize; //切片质量
  readonly uploadUrl;
  readonly uploadedUrl;
  readonly concatUrl;
  readonly uploadRecord: Array<IuploadRecordItem>;

  constructor(
    uploadUrl: string,
    uploadedUrl: string,
    concatUrl: string,
    chunkSize = 2097152
  ) {
    this.chunkSize = chunkSize;
    this.uploadUrl = uploadUrl;
    this.uploadedUrl = uploadedUrl;
    this.concatUrl = concatUrl;
    this.uploadRecord = [];
  }

  calcFileMD5(file: File) {
    return new Promise<{}>((resolve, reject) => {
      const chunks = Math.ceil(file.size / this.chunkSize);
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();
      const loadNext = (): void => {
        const start = currentChunk * this.chunkSize;
        const end =
          start + this.chunkSize >= file.size
            ? file.size
            : start + this.chunkSize;
        fileReader.readAsArrayBuffer(file.slice(start, end));
      };
      let currentChunk = 0;

      fileReader.onload = (e) => {
        spark.append(e.target!.result as ArrayBuffer);
        currentChunk++;
        if (currentChunk < chunks) {
          loadNext();
        } else {
          resolve(spark.end());
        }
      };

      fileReader.onerror = (e) => {
        reject(fileReader.error);
        fileReader.abort();
      };

      loadNext();
    });
  }

  async asyncPool(
    limit = 2,
    array: Array<number>,
    iteratorFn: (item: number, array: Array<number>) => Promise<{}>
  ) {
    const ret: Array<Promise<{}>> = [];
    const executing: Array<Promise<{}>> = [];
    for (const item of array) {
      const p = Promise.resolve().then(() => iteratorFn(item, array));
      ret.push(p);

      if (limit <= array.length) {
        const e: Promise<{}> = p.then(() =>
          executing.splice(executing.indexOf(e), 1)
        );
        executing.push(e);
        if (executing.length >= limit) {
          await Promise.race(executing);
        }
      }
    }
    return Promise.all(ret);
  }

  async getUploaded(name: string, md5: string) {
    const res = await GET(this.uploadedUrl, { params: { name, md5 } });
    return res;
  }

  upload({ file, fileMd5, fileSize, chunkIds, poolLimit = 3 }: IuploadParam) {
    const chunks =
      typeof this.chunkSize === "number"
        ? Math.ceil(fileSize / this.chunkSize)
        : 1;
    return this.asyncPool(
      poolLimit,
      [...new Array(chunks).keys()],
      (i: number) => {
        if (chunkIds.indexOf(i + "") !== -1) {
          // 已上传的分块直接跳过
          return Promise.resolve();
        }
        const start = i * this.chunkSize;
        const end = i + 1 == chunks ? fileSize : (i + 1) * this.chunkSize;
        const chunk = file.slice(start, end); // 对文件进行切割
        return this.uploadChunk({
          chunk,
          chunkIndex: i,
          fileMd5,
          fileName: file.name,
        });
      }
    );
  }

  uploadChunk({ chunk, chunkIndex, fileMd5, fileName }: IchunkParam) {
    const formData = new FormData();
    formData.set("file", chunk, fileMd5 + "-" + chunkIndex);
    formData.set("name", fileName);
    formData.set("timestamp", +Date.now() + "");
    this.uploadRecord.push({ fileName, chunkIndex, isUploaded: false }); //保存记录
    return POST(this.uploadUrl, formData);
  }

  concatFiles(name: string, md5: string) {
    return GET(this.concatUrl, { params: { name, md5 } });
  }
}

export default function initSliceUpload(
  uploadUrl: string,
  uploadedUrl: string,
  concatUrl: string
) {
  // if((window as any).SliceUpload === undefined) {
  //   (window as any).SliceUpload = new SliceUpload(uploadUrl,uploadedUrl,concatUrl)
  // }
  return new SliceUpload(uploadUrl, uploadedUrl, concatUrl);
}
