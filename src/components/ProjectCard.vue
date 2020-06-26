<template>
    <div class="card">
        <v-container>
            <v-card>
                <v-card-title>
                    <h2>Project Name</h2>
                </v-card-title>
                <v-card-text class="pt-0" grid-list-md>
                    <v-container class="pt-0">
                        <v-layout wrap>
                            <v-flex xs12 class="pb-2">
                                <span>{{ sample }}</span>
                            </v-flex>
                            <v-flex xs12>
                                <span>End date: {{ endtime }}</span>
                            </v-flex>
                            <v-flex xs12 sm6 class="pr-2">
                                <!--- Figure out how to put text in the center of the bar --->
                                <v-progress-linear
                                        :value="(current / goal) * 100"
                                        color="amber"
                                        height="20">
                                    <strong style="font-size:11px">{{ current }} / {{ goal }} ONE</strong>
                                </v-progress-linear>
                            </v-flex>
                            <v-flex xs12 sm6 class="pl-2">
                                <v-progress-linear
                                        :value="((duration - remaining)/duration) * 100"
                                        color="amber"
                                        height="20"
                                        reverse="true">
                                    <strong style="font-size:11px">{{ Math.ceil(remaining) }} day(s)</strong>
                                </v-progress-linear>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue darken-1"
                            flat
                            @click="fundProject">
                        Fund
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'ProjectCard',
        data() {
            return {
                endtime: '11AM 12/25/2000',
                current: 40,
                goal: 100,
                remaining: 1,
                duration: 6,
                sample: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sapien velit, dapibus et tempor ut, consectetur convallis augue. Vestibulum id elementum nibh. Suspendisse potenti. Mauris in mi in sapien bibendum tincidunt. Aliquam erat volutpat. Maecenas sed dictum turpis. Morbi tristique elit nec est ullamcorper lobortis. Maecenas in varius orci. Suspendisse bibendum neque ac nisi semper, in bibendum massa vehicula. Sed non nisi ut tellus porta mollis et nec lorem.",
            };
        },
        methods: {
            updateProject() {
                console.log("Updating project!")
            },
            fundProject() {
                console.log("Funding project!")
            },
        },
    };
</script>