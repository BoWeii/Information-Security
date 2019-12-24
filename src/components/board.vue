<template>
  <div class="board">
    <el-form :model="model" ref="form" @submit.native.prevent="send" id="form1">
      <el-form-item prop="content">
        <el-input v-model="model.msg" placeholder="content" prefix-icon="fas fa-user"></el-input>
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
  </div>
</template>
<script src="http://apps.bdimg.com/libs/jquery/1.10.2/jquery.min.js"></script>
<script>

import Base64 from "crypto-js/enc-base64";
import { KJUR } from "jsrsasign";
import { async } from "q";
// import Buffer from 'buffer'
let axios = require("axios");
let jwt_token = localStorage.getItem("jwt_token");
let data = { token: jwt_token };

export default {
  name: "board",
  data() {
    return {
      model: {
        msg: "thisisamessage",
        signature: ""
      },
      loading: false
    };
  },
  methods: {
    async exacution(message) {
      const utf8 = require("utf8");
      let rsa = require("js-crypto-rsa");
      let sha = require("crypto-js");
      //const crypto = require("crypto-js");
      //console.log(message)
      //const privateKey ="MIIBOgIBAAJAYn8taNMlCb/ZvyI9kVqLfp+2yLFPihNU3qR028hT9jMfphd35MN+dqochu8hwRZghGvWf7lgsDdhKo8TYJ/LzQIDAQABAkAcAP6fJBEOwY4eKpUIo46vlKc6TjdIEZD6sBVNe5prj+cWGXYSI061NnxyaolWHM4wRPnlr5xvsRkNih0kMIlhAiEAxOjFLWchDlsnCKKhTDesBXHAx77I4+WjLMBkBQNvMXkCIQCADgfrSNgFu4O24TMBUHOLBW9p/9t6j7on0iutwq9L9QIhAIbyR3+QN/VQvvWKDyTe2oN4q/e4ZpDY5fVbfLB65A9xAiAKsCEdFEFjiRkfRICbVXmvWs7HzCEng6OH+1TF9f/nmQIhAIyUm7cJD3rIjQTEjq+prh5ghXJFPl4e/ivw71ahBqnU";
      const privateKey =
        "-----BEGIN RSA PRIVATE KEY-----MIIBOgIBAAJAYn8taNMlCb/ZvyI9kVqLfp+2yLFPihNU3qR028hT9jMfphd35MN+dqochu8hwRZghGvWf7lgsDdhKo8TYJ/LzQIDAQABAkAcAP6fJBEOwY4eKpUIo46vlKc6TjdIEZD6sBVNe5prj+cWGXYSI061NnxyaolWHM4wRPnlr5xvsRkNih0kMIlhAiEAxOjFLWchDlsnCKKhTDesBXHAx77I4+WjLMBkBQNvMXkCIQCADgfrSNgFu4O24TMBUHOLBW9p/9t6j7on0iutwq9L9QIhAIbyR3+QN/VQvvWKDyTe2oN4q/e4ZpDY5fVbfLB65A9xAiAKsCEdFEFjiRkfRICbVXmvWs7HzCEng6OH+1TF9f/nmQIhAIyUm7cJD3rIjQTEjq+prh5ghXJFPl4e/ivw71ahBqnU-----END RSA PRIVATE KEY-----";

      var CryptoJS = require("crypto-js");
      let data = { msg: "thisisamessage" };
      let parseData = [];
      for (let key in data) {
        parseData.push(`${key}=${data[key]}`)
      }
      const parsedStr = parseData.join('&')
      console.log(parsedStr)
      const hashDigest = CryptoJS.SHA256(parsedStr);
      const input = hashDigest.toString();
      console.log("input->>>>>", input);
      console.log(
        "HMACSHA1 :",
        CryptoJS.HmacSHA1(input, "finalProject").toString()
      );
      //////////////////////////////////////////////////////////////////////

      var crypto = require("crypto");
      var aaa = this.model.msg;
      var signer = crypto.createSign("RSA-SHA1");
      signer.write('a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', "base64");
      signer.end();
      this.model.signature = signer.sign(privateKey, "base64");
      console.log("ggggggg =>", this.model.signature);

      
      /*var crypto = require('crypto');
      var sign = crypto.createSign('RSA-SHA256');
      sign.update(input);
      var sig = sign.sign(privateKey,'base64');
      console.log("result===>",sig)
      
      2
      const sig2 = new KJUR.crypto.Signature({ "alg": "SHA256withRSA" });
      sig2.init(privateKey);
      sig2.updateString(input)
      const signatureHex = sig2.sign()
      console.log("rsa->>>>>>",signatureHex)*/
    },
    async send() {
      await this.exacution(this.model.content);
      try {
        let resp = await axios({
          headers: {
            Authorization: "JWT" + " " + localStorage.getItem("jwt_token")
          },
          method: "POST",
          url: "http://13.231.90.159:8001/board/",
          data: {
            msg: this.model.content,
            signature: this.model.signature
          }
        });
        await console.log(resp);
        await alert(resp.data);
      } catch (error) {
        alert(error);
      }
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
