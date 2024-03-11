<template>
    <div class="row q-mb-sm">
        <q-input
          class="col"
          @input="$emit('update.dueTime', $event)"
          label="At"
          outlined
          readonly
          :value="dueTime">
            <template v-slot:append>
                <q-icon
                  v-if="dueTime"
                  name="close"
                  @click="$emit('update:dueTime','')"
                  class="cursor-pointer" />
                <q-icon name="schedule" class="cursor-pointer">
                    <q-popup-proxy>
                        <q-time 
                            @input="$emit('update:dueTime',$event)"
                            :value="dueTime" />
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>
</template>

<script>
    export default{
        props: ['dueTime']
    }

</script>
