<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
   name: "Welcome",
   setup() {
      const activeItem = ref('flush-collapseOne')
      return {
         activeItem
      };
   },
})
</script>
<template>
   <main>
      <mdb-card>
         <mdb-card-body>
            <mdb-card-title>Welcome</mdb-card-title>
            <mdb-card-text>
               This website is in the process of being developed.
            </mdb-card-text>
         </mdb-card-body>
      </mdb-card>
      <mdb-card>
         <mdb-card-body>
            <mdb-card-title>This Website's Technical Specificiations</mdb-card-title>
            <mdb-accordion v-model="activeItem" flush>
               <mdb-accordion-item headerTitle="Frontend" collapseId="flush-collapseOne">
                  VueJS 3
               </mdb-accordion-item>
               <mdb-accordion-item headerTitle="API" collapseId="flush-collapseTwo">
                  FastAPI / SQLAlchemy
               </mdb-accordion-item>
               <mdb-accordion-item headerTitle="Database" collapseId="flush-collapseThree">
                  Postgres
               </mdb-accordion-item>
               <mdb-accordion-item headerTitle="Identity Server" collapseId="flush-collapseFour">
                  Keycloak
               </mdb-accordion-item>
               <mdb-accordion-item headerTitle="Reverse Proxy" collapseId="flush-collapseFive">
                  Caddy
               </mdb-accordion-item>
               <mdb-accordion-item headerTitle="Infrastructure" collapseId="flush-collapseSix">
                  Docker Multicontainer in Elastic Beanstalk
               </mdb-accordion-item>
            </mdb-accordion>
         </mdb-card-body>
      </mdb-card>
   </main>
</template>

<style>
</style>




