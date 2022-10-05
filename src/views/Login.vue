<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" 
          v-model.trim="email" 
          :class="{invalid: (v$.email.$dirty && (email.length == 0 || v$.email.email.$invalid))}"
        
        />
        <label for="email">Email</label>
        <small class="helper-text invalid"
          v-if="v$.email.$dirty && email.length == 0"
        >Поле Email должно быть заполнено</small>
        <small class="helper-text invalid"
          v-else-if="v$.email.$dirty && v$.email.email.$invalid"
        >Введите корректный Email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password"
          v-model.trim="pass.value"
          :class="{invalid: v$.pass.value.$dirty && (pass.value.length < pass.minLength)}"
        />
        <label for="password">Пароль</label>
        <small class="helper-text invalid"
          v-if="v$.pass.value.$dirty && (pass.value.length == 0)"
        >Поле пароля не должно быть пустым</small>
        <small class="helper-text invalid"
          v-else-if="v$.pass.value.$dirty && (pass.value.length < pass.minLength)"
        >Длина пароля не должна быть менее {{pass.minLength}}! Текущая длина {{pass.value.length}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import messages from '@/utils/messages';

export default {
  name: 'login',
  data: ()=>({
    email: '',
    pass: {
      value: '',
      minLength: 6
    }
  }),
  setup: () => ({ v$: useVuelidate() }),
  validations:{
    email: {email,required},
    pass: {
      value: {required},
      minLength: {}
    }
  },
  methods:{
    async onSubmit(){
      if(this.v$.$invalid){
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.pass.value
      };
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (e) {
      }
    }
  },
  mounted() {
    if(messages[this.$route.query.message]) 
      this.$message(messages[this.$route.query.message]);
  }
}
</script>
