<script lang="ts">
import { defineComponent, ref, computed } from "vue";
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

    const checkLoginForm = async (e: any) => {
      e.target.classList.add("was-validated");
      if (e.target.checkValidity()) await performLogin();
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
        store.commit("user/loginFailed");
        // TODO: Make this look better
        invalidLoginCredentialTooltip.value = "Invalid account credentials";
        invalidLoginPasswordTooltip.value = "Invalid account credentials";
        document
          .getElementById("login_credential")
          ?.classList.add("is-invalid");
        document.getElementById("login_password")?.classList.add("is-invalid");
      }
    };

    const isBeingLoggedIn = computed(
      () => store.getters["user/isBeingLoggedIn"]
    );

    const createAccountModalShowing = ref(false);
    const router = useRouter();

    const username = ref();
    const email = ref();
    const firstname = ref();
    const lastname = ref();
    const createAccountPassword = ref();

    const checkFormCreateAccountForm = (e: any) => {
      e.target.classList.add("was-validated");
      if (e.target.checkValidity()) performCreateAccount();
    };

    const showLoginModal = () => {
      createAccountModalShowing.value = false;
      loginModalShowing.value = true;
      activeTab.value = "login";
    };

    const showCreateAccountModal = () => {
      createAccountModalShowing.value = true;
      loginModalShowing.value = false;
      activeTab.value = "create";
    };

    const cancelScreen = () => {
      router.back();
    };

    const invalidCreateAccountUserNameTooltip = ref("Please enter a username");
    const accountBeingCreated = computed(
      () => store.getters["user/accountBeingCreated"]
    );
    const performCreateAccount = async () => {
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
        store.commit("user/accountCreationFailed");
        // TODO: Make this look better
        invalidCreateAccountUserNameTooltip.value =
          "That username has already been taken";
        document
          .getElementById("createAccount_username")
          ?.classList.add("is-invalid");
      }
    };

    const activeTab = ref("login");

    return {
      activeTab,
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
      accountBeingCreated,
      isBeingLoggedIn,
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
    @submit.prevent="checkFormCreateAccountForm"
    v-on:keydown.enter.prevent="checkFormCreateAccountForm"
  >
    <mdb-modal-header class="hideButton">
      <mdb-tabs v-model="activeTab">
        <!-- Tabs navs -->
        <mdb-tab-nav pills tabsClasses="btn btn-light">
          <mdb-tab-item tabId="login" @click="showLoginModal">
            Login
          </mdb-tab-item>
          <mdb-tab-item tabId="create" @click="showCreateAccountModal">
            Create Account
          </mdb-tab-item>
        </mdb-tab-nav>
        <!-- Tabs navs -->
      </mdb-tabs>
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
        type="password"
        autocomplete="off"
      />
    </mdb-modal-body>
    <mdb-modal-footer>
      <div v-if="!accountBeingCreated">
        <mdb-btn color="danger" @click="cancelScreen"> Cancel </mdb-btn>
        <mdb-btn color="success" type="submit"> Create Account </mdb-btn>
      </div>
      <div class="noselect" v-else="accountBeingCreated">
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
    @submit.prevent="checkLoginForm"
    v-on:keydown.enter.prevent="checkLoginForm"
  >
    <mdb-modal-header class="hideButton">
      <mdb-modal-title id="loginModalLabel">
        <mdb-tabs v-model="activeTab">
          <!-- Tabs navs -->
          <mdb-tab-nav pills tabsClasses="btn btn-light pillHover">
            <mdb-tab-item tabId="login" @click="showLoginModal">
              Login
            </mdb-tab-item>
            <mdb-tab-item tabId="create" @click="showCreateAccountModal">
              Create Account
            </mdb-tab-item>
          </mdb-tab-nav>
          <!-- Tabs navs -->
        </mdb-tabs>
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
        type="password"
        autocomplete="off"
      />
    </mdb-modal-body>
    <mdb-modal-footer>
      <div v-if="!isBeingLoggedIn">
        <mdb-btn color="danger" @click="cancelScreen"> Cancel </mdb-btn>
        <mdb-btn color="success" type="submit"> Login </mdb-btn>
      </div>
      <div class="noselect" v-else="isBeingLoggedIn">
        Logging in...<mdb-spinner style="width: 1rem; height: 1rem" />
      </div>
    </mdb-modal-footer>
  </mdb-modal>
</template>

<style scoped>
#tab-create.active:hover, #tab-login.active:hover {
  background-color: #1266f1 !important;
  color: white !important;
}

#tab-create:active, #tab-login:active {
  color: green !important;
}


#tab-create.active, #tab-login.active {
  color: white;
  background-color: #1266f1;
}

#tab-create, #tab-login {
  outline: 1px solid black;
}

#tab-create:hover, #tab-login:hover {
  color: #1266f1;
  background-color: white;
  outline: 1px solid black;
}

.nav-pills {
  flex-direction: row;
  margin: 0;
}
.nav-item {
  border: 0 !important;
  height: 50px;
  margin-bottom: 20px;
  padding: 0;
}
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

.modal-footer {
  margin-top: 20px;
}

</style>




