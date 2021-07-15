<template>
  <el-button type="primary" @click="openDrawer" style="margin-right: 80px"
    >修改系统设置</el-button
  >
  <el-drawer title="系统设置" v-model="table" direction="rtl" size="30%">
    <div class="root">
      <div class="el-parameters">
        <div class="title">文献大小限制</div>
        <el-input
          v-model="input0"
          :placeholder="parameterValue0"
          type="number"
          class="operator"
          @change="inputDown0"
        ></el-input>
      </div>
      <div class="el-parameters">
        <div class="title">是否允许注册</div>
        <el-switch
          v-model="allowRegister"
          active-text="允许"
          inactive-text="不允许"
          class="operator"
          @change="inputDown1"
        >
        </el-switch>
      </div>
      <div class="el-parameters">
        <div class="title">用户文献数量限制</div>
        <el-input
          v-model="input2"
          :placeholder="parameterValue2"
          type="number"
          class="operator"
          @change="inputDown2"
        ></el-input>
      </div>
      <div class="el-parameters">
        <div class="title">文献版本数限制</div>
        <el-input
          v-model="input3"
          :placeholder="parameterValue3"
          type="number"
          class="operator"
          @change="inputDown3"
        ></el-input>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { ref } from "vue";
import { adminSettingsQuery, adminSettingsModify } from "../net/network";

export default {
  setup() {
    return {
      input0: ref(""),
      input1: ref(""),
      input2: ref(""),
      input3: ref(""),
    };
  },
  data() {
    return {
      table: false,
      dialog: false,
      loading: false,
      formLabelWidth: "80px",
      timer: null,
      allowRegister: false,
      parameterValue0: "",
      parameterValue1: "",
      parameterValue2: "",
      parameterValue3: "",
      systemParameters: [
        "FileSize",
        "RegisterEnabled",
        "SingleUserFileCountLimit",
        "FileRevisionLimit",
      ],
    };
  },
  methods: {
    inputDown0() {
      console.log("input down0");
      adminSettingsModify(
        {
          Key: this.systemParameters[0],
          Value: this.input0,
        },
        (res) => {
          console.log(res);
        }
      );
    },
    inputDown1() {
      console.log("input down1");
      adminSettingsModify(
        {
          Key: this.systemParameters[1],
          Value: this.input1,
        },
        (res) => {
          console.log(res);
        }
      );
    },
    inputDown2() {
      console.log("input down2");
      adminSettingsModify(
        {
          Key: this.systemParameters[2],
          Value: this.input2,
        },
        (res) => {
          console.log(res);
        }
      );
    },
    inputDown3() {
      console.log("input down3");
      adminSettingsModify(
        {
          Key: this.systemParameters[3],
          Value: this.input3,
        },
        (res) => {
          console.log(res);
        }
      );
    },
    openDrawer() {
      console.log("openDrawer");
      this.table = true;
      for (let i = 0; i < this.systemParameters.length; i++) {
        console.log(i);
        console.log(this.systemParameters[i]);
        adminSettingsQuery(
          {
            Key: this.systemParameters[i],
          },
          (res) => {
            console.log(res);
            if (i == 0) {
              this.parameterValue0 = res.data.value;
            } else if (i == 1) {
              this.parameterValue1 = res.data.value;
            } else if (i == 2) {
              this.parameterValue2 = res.data.value;
            } else if (i == 3) {
              this.parameterValue3 = res.data.value;
            }
          }
        );
      }
    },
  },
};
</script>

<style>
.title {
  display: flex;
  margin-right: 20px;
  width: auto;
  font-weight: bold;
}

.el-textTemp {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.root {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}

.el-parameters {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 4vh;
}

.operator {
  padding: 0;
}
</style>
