<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Not Found",
    setup() {
        return {
        };
    },
})
</script>
<template>
    <main>
        <mdb-card>
<mdb-card-body>
         <mdb-card-text>
            <mdb-row tag="form" class="g-3 needs-validation" novalidate @submit.prevent="checkForm">
            <mdb-col md="12">
                  <mdb-input
                     inputGroup
                     aria-describedby="basic-addon1"
                     aria-label="Username"
                     placeholder="Username"
                     invalidFeedback="Please choose a unique and valid username."
                     validFeedback="Looks good!"
                     validationEvent="input"
                     required
                     pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                     title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                     >
                     <template v-slot:prepend>
                        <span class="input-group-text" id="basic-addon5">@</span>
                     </template>
                  </mdb-input>
               </mdb-col>
               <mdb-col md="6">
                  <mdb-input
                     label="First name"
                     invalidFeedback=""
                     validFeedback="Looks good!"
                     validationEvent="input"
                     required
                     title="Must contain between 5 and 30 characters"
                     minLength="5"
                     maxLength="30"
                     />
               </mdb-col>
               <mdb-col md="6">
                  <mdb-input
                     label="Last name"
                     invalidFeedback=""
                     validFeedback="Looks good!"
                     validationEvent="input"
                     required
                     title="Must contain between 5 and 30 characters"
                     minLength="5"
                     maxLength="30"
                     />
               </mdb-col>
               <mdb-col md="6">
                  <mdb-input
                     label="Email"
                     invalidFeedback=""
                     validFeedback="Looks good!"
                     validationEvent="input"
                     required
                     pattern="^[0-9]{5}(?:-[0-9]{4})?$"
                     title="Should match 12345 and 12345-6789 patterns"
                     />
               </mdb-col>
               <mdb-col col="12">
                  <mdb-checkbox
                     label="Agree to terms and conditions"
                     invalidFeedback=""
                     validFeedback="Looks good!"
                     validateOnChange
                     required
                     />
               </mdb-col>
               <mdb-col col="12">
                  <mdb-btn color="primary" type="submit">Create Account</mdb-btn >
               </mdb-col>
            </mdb-row>
         </mdb-card-text>
      </mdb-card-body>
        </mdb-card> 
    </main>
</template>

<style>
</style>




