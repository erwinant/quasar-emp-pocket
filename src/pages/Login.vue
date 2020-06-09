<template>
  <div class="login-container">
    <div class="row items-center login-row-container">
      <div class="col-12 col-md-3 offset-md-1 col-sm-6 offset-sm-1 q-px-md">
        <h6>Employee Pocket Apps</h6>
        <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
          <q-input
            square
            outlined
            type="text"
            v-model="form.userName"
            label="Username"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your username']"
          />
          <q-input
            square
            outlined
            type="password"
            v-model="form.password"
            label="Password"
            lazy-rules
            :rules="[val => val !== null && val !== '' || 'Please type your password']"
          />
          <div>
            <q-btn class="full-width" label="Submit" type="submit" color="primary"/>
            <q-btn
              class="full-width q-mt-sm"
              label="Forgot Password ?"
              type="button"
              color="primary"
              flat
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
<script>
import JwtService from "../services/jwt.service";
import { mapState, mapActions } from "vuex";
import { LOGIN } from "../store/auth/action.type";
export default {
  data() {
    return {
      form: {
        userName: "erwin_ant",
        password: "Sunter123"
      }
    };
  },
  computed: {
    ...mapState("auth", ["state"]), //means args 1: store name, 2: attributes name
    ...mapState("auth", { errors: ({ state }) => state.errors }) // i want directly accessing and map the errors
  },
  methods: {
    handleSubmit() {
      this[LOGIN](this.form).then(() => {
          this.$router.push({ name: "landing" });
      });
    },
    ...mapActions("auth", [LOGIN]) //get action named login
  },
  created() {
    console.log(this.$appConfig);
    if (JwtService.getToken()) {
      this.$router.push("/"); //redirect if already login
    }
  }
};
</script>
<style lang="scss" scoped>
.login-row-container {
  height: 100vh;
}
.login-container {
  background: url("@~assets/images/login-background.jpg") no-repeat center
    center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>