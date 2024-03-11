<template>
    <div class="row q-mb-sm">
        <q-input             
            ref="product"
            label="Product"
            v-select-all
            @input="$emit('update:product', $event)"
            :rules="[val => !!val || 'Field is required']" class="col" outlined
            :value="product">
            <template v-slot:append>
                <q-icon
                v-if="product"
                @click="$emit('update:product', '')"
                name="close"
                class="cursor-pointer"
                />
            </template>
        </q-input>
        
    </div>
</template>

<script>
    import { selectAll } from 'src/directives/directives-select-all';
    export default{
        props: ['product'],
        directives: {
            selectAll
        }
    }
</script>