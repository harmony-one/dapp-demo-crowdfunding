<template>
    <v-hover>
        <v-card slot-scope="{ hover }"
                :class="`elevation-${hover ? 10 : 2}`">
            <v-card-title>
                <span class="headline font-weight-bold mt-2 ml-4">{{ title }}</span>
            </v-card-title>
            <v-card-text class="pt-0" grid-list-md>
                <v-flex xs12 class="pl-5">
                    <span>{{ msg }}</span>
                </v-flex>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1"
                       flat
                       @click="closeDialog">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-hover>
</template>

<script>
    export default {
        name: 'PopupCard',
        props: {
            title: String,
            msg: String,
        },
        methods: {
            closeDialog() {
                this.$emit('closeDialog')
            }
        }
    }
</script>