<template>
    <q-banner class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
        You have no upcoming deliveries.
      <template v-slot:action>
        <q-btn
          flat
          color="primary"
          @click="$root.$emit('showAddTask')"
          label="Add Delivery" />
      </template>
    </q-banner>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>