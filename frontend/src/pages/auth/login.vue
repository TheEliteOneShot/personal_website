<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import { toFormValidator } from '@vee-validate/zod';
import { useDarkmode } from '/@src/stores/darkmode';
import { useUserSession } from '/@src/stores/userSession';
import { useNotyf } from '/@src/composable/useNotyf';
import { z as zod } from 'zod';
import { useForm } from 'vee-validate';
import { loginUser, getUser } from '/@src/utils/api/user';
import { useApi } from '/@src/composable/useApi';

const isLoading = ref(false);
const darkmode = useDarkmode();
const router = useRouter();
const userSession = useUserSession();
const route = useRoute();
const notif = useNotyf();
const api = useApi();
const redirect = route.query.redirect as string;

const validationSchema = toFormValidator(
  zod.object({
    credential: zod
      .string({
        required_error: 'A username or email is required',
      })
      .nonempty('You must provide a password'),
    password: zod
      .string({
        required_error: 'A password is required',
      })
      .nonempty('You must provide a password'),
  })
);

const { handleSubmit, setFieldError } = useForm({
  validationSchema,
  initialValues: {
    credential: '',
    password: '',
  },
});

const handleLogin = handleSubmit(async (values) => {
  if (!isLoading.value) {
    isLoading.value = true;

    notif.dismissAll();

    await loginUser(api, { credential: values.credential, password: values.password })
      .then(async (tokens) => {
        notif.success('Login Successful');
        userSession.setToken(tokens?.access_token);
        userSession.setRefreshToken(tokens?.refresh_token);
        await getUser(api).then((user) => userSession.setUser(user));
        if (redirect) {
          router.push(redirect);
        } else {
          router.push({
            name: 'app',
          });
        }
      })
      .catch(() => {
        setFieldError('credential', 'Invalid Combination');
        setFieldError('password', 'Invalid Combination');
      });

    isLoading.value = false;
  }
});

useHead({
  title: 'Login',
});
</script>

<template>
  <div class="auth-wrapper-inner is-single">
    <!--Fake navigation-->
    <div class="auth-nav">
      <div class="left"></div>
      <div class="center">
        <RouterLink :to="{ name: 'index' }" class="header-item">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>
      </div>
      <div class="right">
        <label
          class="dark-mode ml-auto"
          tabindex="0"
          @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
        >
          <input
            type="checkbox"
            :checked="!darkmode.isDark"
            @change="darkmode.onChange"
          />
          <span></span>
        </label>
      </div>
    </div>

    <!--Single Centered Form-->
    <div class="single-form-wrap">
      <div class="inner-wrap">
        <!--Form Title-->
        <div class="auth-head">
          <h2>Welcome Back.</h2>
          <p>Please sign in to your account</p>
          <RouterLink :to="{ name: 'auth-signup' }">
            I do not have an account yet
          </RouterLink>
        </div>

        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="handleLogin">
            <div class="login-form">
              <VField id="credential" v-slot="{ field }">
                <VControl icon="feather:user">
                  <VInput type="text" placeholder="Username" autocomplete="username" />
                  <p v-if="field?.errorMessage" class="help is-danger">
                    {{ field.errorMessage }}
                  </p>
                </VControl>
              </VField>
              <VField id="password" v-slot="{ field }">
                <VControl icon="feather:lock">
                  <VInput
                    type="password"
                    placeholder="Password"
                    autocomplete="current-password"
                  />
                  <p v-if="field?.errorMessage" class="help is-danger">
                    {{ field.errorMessage }}
                  </p>
                </VControl>
              </VField>

              <!-- Switch -->
              <VField>
                <VControl class="setting-item">
                  <VCheckbox label="Remember me" color="primary" paddingless />
                </VControl>
              </VField>

              <!-- Submit -->
              <div class="login">
                <VButton
                  :loading="isLoading"
                  type="submit"
                  color="primary"
                  bold
                  fullwidth
                  raised
                >
                  Sign In
                </VButton>
              </div>
            </div>
          </form>
        </div>

        <div class="forgot-link has-text-centered">
          <a>Forgot Password?</a>
        </div>
      </div>
    </div>
  </div>
</template>
