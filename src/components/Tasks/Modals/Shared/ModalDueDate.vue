<template>
    <div class="row q-mb-sm">
        <q-input
          label="Expected When"
          readonly
          outlined
          class="col"
          :value="dueDate"
          @input="$emit('update:dueDate',$event)">
            <template v-slot:append>
                <q-icon
                    v-if="dueDate" 
                    name="close" 
                    @click="$emit('clear')" 
                    class="cursor-pointer" />
                <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy>
                        <q-date 
                            :value="dueDate" 
                            @input="$emit('update:dueDate', $event)"
                            />
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>
</template>

<script>
    export default{
        props: ['dueDate']
    }
</script>