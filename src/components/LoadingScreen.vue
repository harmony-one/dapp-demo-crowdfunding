<template>
    <v-container class="grey lighten-3">
        <v-layout>
            <v-flex class="text-xs-center">
                <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'LoadingScreen',
    }
</script>
