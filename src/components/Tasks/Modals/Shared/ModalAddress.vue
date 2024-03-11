<template>
    <div class="row q-mb-sm">
        <q-input
          ref="address"
          v-select-all
          @input="$emit('update:address', $event)"
          :rules="[val => !!val || 'Field is required']"
          class="col"
          outlined
          :value="address"
          label="Address">
            <template v-slot:append>
                <q-icon
                  v-if="address"
                  @click="$emit('update:address', '')"
                  name="close"
                  class="cursor-pointer" />
            </template>
        </q-input>
    </div>
</template>

<script >
    import { selectAll } from 'src/directives/directives-select-all';
    export default{
        props: ['address'],
        directives: {
            selectAll
        }
    }

</script>

<style ></style>

