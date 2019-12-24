<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-card>
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        ref="form"
        @submit.native.prevent="login"
        id="form1"
      >
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="Username" prefix-icon="fas fa-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            prefix-icon="fas fa-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script src="http://apps.bdimg.com/libs/jquery/1.10.2/jquery.min.js"></script>
<script>
export default {
  name: "Login",
  data() {
    return {
      validCredentials: {
        username: "lightscope",
        password: "lightscope"
      },
      model: {
        username: "bowei",
        password: "z13630063"
      },
      loading: false
    };
  },
  methods: {
    simulateLogin() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    store(resp){
       localStorage.setItem('jwt_token', resp.data.token);
            this.$router.push("/board");
            // window.location.href = "/board";
    },
    async login() {
      event.preventDefault();
      
      // ajax({
      //   type: "POST",
      //   url: "http://127.0.0.1:8000/api-token-auth/",
      //   data: this.serialize(),
      //   success: function(data) {s
      //     localStorage.setItem("jwt_token", data.token);
      //     window.location.href = "http://127.0.0.1:8000/account/";
      //   }
      // });
      let axios = require('axios')
      try{
        let resp = await axios({
        method:'POST',
        url: 'http://13.231.90.159:8001/token/',
        data: {
          username: this.model.username,
          password: this.model.password
        },
      });
      await this.store(resp);
      }
      catch(error){
        alert(error);
      }
      console.log(resp.data)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
