<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "CreateAccount",
  props: ["userAction"],
  setup() {
      
    const store = useStore();
    const loginModalShowing = ref(false);
    const loginCredential = ref("");
    const loginPassword = ref("");

    const checkLoginForm = async (e) => {
      e.target.classList.add("was-validated");
      if (
        !(
          loginCredential?.value.length >= 1 &&
          loginCredential.value?.length <= 25 &&
          loginPassword.value?.length >= 1 &&
          loginPassword.value?.length <= 25
        )
      )
        return;
      await performLogin();
    };

    const invalidLoginCredentialTooltip = ref(
      "Please enter a username or an email"
    );
    const invalidLoginPasswordTooltip = ref("Please enter a password");
    const performLogin = async () => {
      let result = await store.dispatch("user/login", {
        credential: loginCredential.value,
        password: loginPassword.value,
      });
      if (result.ok) {
        router.push({ path: "/welcome", query: { justLoggedIn: "true" } });
      } else {
        // TODO: Make this look better
        invalidLoginCredentialTooltip.value = "Invalid account credentials";
        invalidLoginPasswordTooltip.value = "Invalid account credentials";
        document
          .getElementById("login_credential")
          ?.classList.add("is-invalid");
        document.getElementById("login_password")?.classList.add("is-invalid");
      }
    };

    const createAccountModalShowing = ref(false);
    const router = useRouter();

    const username = ref();
    const email = ref();
    const firstname = ref();
    const lastname = ref();
    const createAccountPassword = ref();

    const checkFormCreateAccountForm = (e) => {
      e.target.classList.add("was-validated");
      const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (
        !(
          username.value?.length >= 1 &&
          username.value?.length <= 25 &&
          createAccountPassword.value?.length >= 1 &&
          createAccountPassword.value?.length <= 25 &&
          lastname.value?.length >= 1 &&
          lastname.value?.length <= 25 &&
          email.value?.length >= 1 &&
          email.value?.length <= 25 &&
          emailPattern.test(email.value) &&
          firstname.value?.length >= 1 &&
          firstname.value?.length <= 25
        )
      )
        return;
      performCreateAccount();
    };

    const showLoginModal = () => {
      createAccountModalShowing.value = false;
      loginModalShowing.value = true;
    };

    const showCreateAccountModal = () => {
      createAccountModalShowing.value = true;
      loginModalShowing.value = false;
    };

    const cancelScreen = () => {
      router.back();
    };

    const invalidCreateAccountUserNameTooltip = ref("Please enter a username");
    const accountBeingCreated = ref(false);
    const performCreateAccount = async () => {
      accountBeingCreated.value = true;
      let result = await store.dispatch("user/asyncCreateAccount", {
        username: username.value,
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
        password: createAccountPassword.value,
      });

      if (result.ok) {
        router.push({ path: "/welcome", query: { newAccount: "true" } });
      } else {
        // TODO: Make this look better
        invalidCreateAccountUserNameTooltip.value =
          "Please enter a unique username, that one is already taken.";
        document
          .getElementById("createAccount_username")
          ?.classList.add("is-invalid");
      }
      accountBeingCreated.value = false;
    };

    return {
      accountBeingCreated,
      invalidCreateAccountUserNameTooltip,
      createAccountModalShowing,
      loginModalShowing,
      cancelScreen,
      checkFormCreateAccountForm,
      firstname,
      lastname,
      email,
      username,
      loginPassword,
      loginCredential,
      createAccountPassword,
      checkLoginForm,
      showLoginModal,
      showCreateAccountModal,
      invalidLoginCredentialTooltip,
      invalidLoginPasswordTooltip,
    };
  },
  mounted() {
    if (this.userAction == "create") {
      this.createAccountModalShowing = true;
    } else {
      this.loginModalShowing = true;
    }
  },
});
</script>

<template>
  <mdb-modal
    centered
    id="createAccountModal"
    tabindex="-1"
    labelledby="createAccountModalLabel"
    novalidate
    v-model="createAccountModalShowing"
    staticBackdrop
    tag="form"
    class="modal-width g-3 needs-validation"
    @submit.prevent="checkFormCreateAccountForm" v-on:keydown.enter.prevent='checkFormCreateAccountForm'
  >
    <mdb-modal-header class="hideButton">
      <mdb-modal-title id="createAccountModalLabel">
        <mdb-navbar expand="lg" light bg="white" container>
          <mdb-navbar-toggler target="#navbar"> </mdb-navbar-toggler>
          <mdb-navbar-nav
            collapse="navbar"
            class="justify-content-between w-100"
          >
            <mdb-navbar-item @click="showLoginModal"> Login </mdb-navbar-item>
            <mdb-navbar-item
              class="activeActionSelection"
              @click="showCreateAccountModal"
            >
              Create Account
            </mdb-navbar-item>
          </mdb-navbar-nav>
        </mdb-navbar>
      </mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>
      <mdb-input
        validationEvent="input"
        label="Username"
        v-model="username"
        :invalidFeedback="invalidCreateAccountUserNameTooltip"
        required
        title="Must contain between 1 and 25 characters"
        minLength="1"
        maxLength="25"
        tooltipFeedback
        id="createAccount_username"
      />
      <div class="create-account-inputs-seperator" />
      <mdb-input
        validationEvent="input"
        label="Email - example@email.com"
        v-model="email"
        invalidFeedback="Please enter a valid Email Address"
        required
        pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
        title="Must contain between 1 and 25 characters"
        minLength="1"
        maxLength="25"
        tooltipFeedback
      />
      <div class="create-account-inputs-seperator" />
      <mdb-input
        validationEvent="input"
        label="First Name"
        v-model="firstname"
        invalidFeedback="Please enter your First Name"
        required
        title="Must contain between 1 and 25 characters"
        minLength="1"
        maxLength="25"
        tooltipFeedback
      />
      <div class="create-account-inputs-seperator" />
      <mdb-input
        validationEvent="input"
        label="Last Name"
        v-model="lastname"
        invalidFeedback="Please enter your Last Name"
        required
        title="Must contain between 1 and 25 characters"
        minLength="1"
        maxLength="25"
        tooltipFeedback
      />
      <div class="create-account-inputs-seperator" />
      <mdb-input
        validationEvent="input"
        label="Password"
        v-model="createAccountPassword"
        invalidFeedback="Please enter a password"
        required
        title="Must contain between 1 and 15 characters"
        minLength="1"
        maxLength="25"
        tooltipFeedback
      />
    </mdb-modal-body>
    <mdb-modal-footer>
      <div v-if="!accountBeingCreated">
        <mdb-btn color="danger" @click="cancelScreen"> Cancel </mdb-btn>
        <mdb-btn color="success" type="submit"> Create Account </mdb-btn>
      </div>
      <div v-else="accountBeingCreated">
        Creating account...<mdb-spinner style="width: 1rem; height: 1rem" />
      </div>
    </mdb-modal-footer>
  </mdb-modal>
  <mdb-modal
    centered
    id="loginModal"
    tabindex="-1"
    labelledby="loginModalLabel"
    novalidate
    v-model="loginModalShowing"
    staticBackdrop
    tag="form"
    class="modal-width g-3 needs-validation"
    @submit.prevent="checkLoginForm" v-on:keydown.enter.prevent='checkLoginForm'
  >
    <mdb-modal-header class="hideButton">
      <mdb-modal-title id="loginModalLabel">
        <mdb-navbar expand="lg" light bg="white" container>
          <mdb-navbar-toggler target="#navbar2"> </mdb-navbar-toggler>
          <mdb-navbar-nav
            collapse="navbar2"
            class="justify-content-between w-100"
          >
            <mdb-navbar-item
              class="activeActionSelection"
              @click="showLoginModal"
            >
              Login
            </mdb-navbar-item>
            <mdb-navbar-item @click="showCreateAccountModal">
              Create Account
            </mdb-navbar-item>
          </mdb-navbar-nav>
        </mdb-navbar>
      </mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>
      <mdb-input
        validationEvent="input"
        label="Username or Email Address"
        v-model="loginCredential"
        :invalidFeedback="invalidLoginCredentialTooltip"
        required
        title="Must contain between 1 and 25 characters"
        minLength="1"
        maxLength="25"
        tooltipFeedback
        id="login_credential"
      />
      <div class="login-inputs-seperator" />
      <mdb-input
        validationEvent="input"
        label="Password"
        v-model="loginPassword"
        :invalidFeedback="invalidLoginPasswordTooltip"
        required
        title="Must contain between 1 and 25 characters"
        minLength="1"
        maxLength="25"
        tooltipFeedback
        id="login_password"
      />
    </mdb-modal-body>
    <mdb-modal-footer>
      <mdb-btn color="danger" @click="cancelScreen"> Cancel </mdb-btn>
      <mdb-btn color="success" type="submit"> Login </mdb-btn>
    </mdb-modal-footer>
  </mdb-modal>
</template>

<style scoped>
.is-valid {
  margin-bottom: 0px !important;
}

.create-account-inputs-seperator {
  margin-bottom: 40px;
}

.login-inputs-seperator {
  margin-bottom: 40px;
}

.modal-title {
  width: 100% !important;
}

.modal-width {
  width: 100% !important;
}

.modal-header {
  padding: 0px !important;
  display: block;
}

.nav-item {
  border: 1px solid black;
  padding: 20px;
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.nav-item:hover {
  background-color: lightblue;
  font-weight: bolder;
}

.activeActionSelection {
  background-color: lightblue;
  font-weight: bolder;
}
</style>




