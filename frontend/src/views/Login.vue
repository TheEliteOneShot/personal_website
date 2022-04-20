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
                        <mdb-col md="6">
                            <mdb-input inputGroup aria-describedby="basic-addon1" aria-label="Username or Email Address"
                                placeholder="Username or Email Address"
                                invalidFeedback="Please enter a Username or Email Address" validFeedback="Looks good!"
                                validationEvent="input" required title="Must contain a Username or Email Address">
                            </mdb-input>
                        </mdb-col>
                        <mdb-col md="6">
                            <mdb-input inputGroup aria-describedby="basic-addon1" aria-label="Username or Email Address"
                                placeholder="Password"
                                invalidFeedback="Please a password" validFeedback="Looks good!"
                                validationEvent="input" required title="Must contain a password">
                            </mdb-input>
                        </mdb-col>
                        <mdb-col col="12">
                            <mdb-btn color="primary" type="submit">Login</mdb-btn>
                        </mdb-col>
                    </mdb-row>
                </mdb-card-text>
            </mdb-card-body>
        </mdb-card>
    </main>
</template>

<style>
</style>




