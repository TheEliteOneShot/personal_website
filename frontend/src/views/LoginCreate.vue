<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toast-notification";

export default defineComponent({
    name: "CreateAccount",
    props: ['userAction'],
    setup() {
        const loginModalShowing = ref(false);
        const usernameOrEmail = ref();
        const loginPassword = ref();

        const checkLoginForm = e => {
            e.target.classList.add("was-validated");
            if (!(loginPassword.value?.length >= 1 && loginPassword.value?.length <= 25)) return;
            if (!(usernameOrEmail?.value.length >= 1 && usernameOrEmail.value?.length <= 25)) return;
            performLogin();
        };

        const performLogin = () => {
            toast.success("Successful login")
        }
        const createAccountModalShowing = ref(false);
        const router = useRouter();
        const toast = useToast();

        const username = ref();
        const email = ref();
        const firstname = ref();
        const lastname = ref();
        const createPassword = ref();

        const checkFormCreateAccountForm = e => {
            e.target.classList.add("was-validated");
            const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!(username.value?.length >= 1 && username.value?.length <= 25)) return;
            if (!(email.value?.length >= 1 && email.value?.length <= 25 && emailPattern.test(email.value))) return;
            if (!(firstname.value?.length >= 1 && firstname.value?.length <= 25)) return;
            if (!(lastname.value?.length >= 1 && lastname.value?.length <= 25)) return;
            if (!(createPassword.value?.length >= 1 && createPassword.value?.length <= 25)) return;
            performCreateAccount();
        };

        const showLoginModal = () => {
            createAccountModalShowing.value = false;
            loginModalShowing.value = true;
        }

        const showCreateAccountModal = () => {
            createAccountModalShowing.value = true;
            loginModalShowing.value = false;
        }

        const cancelScreen = () => {
            router.back()
        };

        const performCreateAccount = () => {
            toast.success("Successfully created an account")
        }

        return {
            createAccountModalShowing,
            loginModalShowing,
            cancelScreen,
            checkFormCreateAccountForm,
            firstname,
            lastname,
            email,
            username,
            loginPassword,
            usernameOrEmail,
            createPassword,
            checkLoginForm,
            showLoginModal,
            showCreateAccountModal,
        };
    },
    mounted() {
        if (this.userAction == "create") {
            this.createAccountModalShowing = true
        } else {
            this.loginModalShowing = true
        }
    }
})
</script>

<template>
    <mdb-modal centered id="createAccountModal" tabindex="-1" labelledby="createAccountModalLabel" novalidate
        v-model="createAccountModalShowing" staticBackdrop tag="form" class="modal-width g-3 needs-validation"
        @submit.prevent="checkFormCreateAccountForm">
        <mdb-modal-header class="hideButton">
            <mdb-modal-title id="createAccountModalLabel">
                <mdb-navbar expand="lg" light bg="white" container>
                    <mdb-navbar-toggler target="#navbarExample01"></mdb-navbar-toggler>
                    <mdb-navbar-nav collapse="navbarExample01" class="justify-content-between w-100">
                        <mdb-navbar-item @click="showLoginModal">
                            Login
                        </mdb-navbar-item>
                        <mdb-navbar-item class="activeActionSelection" @click="showCreateAccountModal">
                            Create Account
                        </mdb-navbar-item>
                    </mdb-navbar-nav>
                </mdb-navbar>
            </mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <mdb-input ref="usernameInputElement" validationEvent="input" label="Username" v-model="username"
                invalidFeedback="Please enter a Username" required title="Must contain between 1 and 25 characters"
                minLength="1" maxLength="25" tooltipFeedback />
            <div class="create-account-inputs-seperator" />
            <mdb-input validationEvent="input" label="Email - example@email.com" v-model="email"
                invalidFeedback="Please enter a valid Email Address" required
                pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                title="Must contain between 1 and 25 characters" minLength="1" maxLength="25" tooltipFeedback />
            <div class="create-account-inputs-seperator" />
            <mdb-input validationEvent="input" label="First Name" v-model="firstname"
                invalidFeedback="Please enter your First Name" required title="Must contain between 1 and 25 characters"
                minLength="1" maxLength="25" tooltipFeedback />
            <div class="create-account-inputs-seperator" />
            <mdb-input validationEvent="input" label="Last Name" v-model="lastname"
                invalidFeedback="Please enter your Last Name" required title="Must contain between 1 and 25 characters"
                minLength="1" maxLength="25" tooltipFeedback />
            <div class="create-account-inputs-seperator" />
            <mdb-input validationEvent="input" label="Password" v-model="createPassword"
                invalidFeedback="Please enter a password" required title="Must contain between 1 and 15 characters"
                minLength="1" maxLength="25" tooltipFeedback />
        </mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn color="danger" @click="cancelScreen">Cancel</mdb-btn>
            <mdb-btn color="success" type="submit">Create Account</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>
    <mdb-modal centered id="loginModal" tabindex="-1" labelledby="loginModalLabel" novalidate v-model="loginModalShowing"
        staticBackdrop tag="form" class="modal-width g-3 needs-validation" @submit.prevent="checkLoginForm">
        <mdb-modal-header class="hideButton">
            <mdb-modal-title id="loginModalLabel">
                <mdb-navbar expand="lg" light bg="white" container>
                    <mdb-navbar-toggler target="#navbarExample01"></mdb-navbar-toggler>
                    <mdb-navbar-nav collapse="navbarExample01" class="justify-content-between w-100">
                        <mdb-navbar-item class="activeActionSelection" @click="showLoginModal">
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
            <mdb-input validationEvent="input" label="Username or Email Address" v-model="usernameOrEmail"
                invalidFeedback="Please enter a Username or Email Address" required
                title="Must contain between 1 and 25 characters" minLength="1" maxLength="25" tooltipFeedback />
            <div class="login-inputs-seperator" />
            <mdb-input validationEvent="input" label="Password" v-model="loginPassword"
                invalidFeedback="Please enter a password" required title="Must contain between 1 and 25 characters"
                minLength="1" maxLength="25" tooltipFeedback />
        </mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn color="danger" @click="cancelScreen">Cancel</mdb-btn>
            <mdb-btn color="success" type="submit">Login</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>
</template>

<style>
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

.modal-header .btn-close {
    visibility: hidden;
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




