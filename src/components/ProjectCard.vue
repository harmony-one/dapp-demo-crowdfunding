<template>
    <div class="card">
        <v-container>
            <v-card>
                <v-card-title>
                    <div class="headline font-weight-bold">
                        <v-chip
                                label
                                :color="stateMap[projectData.currentState].color"
                                text-color="white" class="mt-0">
                            {{ stateMap[projectData.currentState].text }}
                        </v-chip>
                        {{ projectData.title }}
                    </div>
                </v-card-title>
                <v-card-text class="pt-0" grid-list-md>
                    <v-container class="pt-0">
                        <v-layout wrap>
                            <v-flex xs12 class="pb-2">
                                <span>{{ projectData.description }}</span>
                            </v-flex>
                            <v-flex xs12>
                                <span>End date: {{ projectData.endDate }}</span>
                                <span v-if="projectData.timeElapsed == null">
                                    <br>Time remaining: {{ projectData.timeRemaining }} hour(s)
                                </span>
                            </v-flex>
                            <v-flex v-if="projectData.currentState == 0" xs12 sm6 class="pr-2">
                                <!--- Figure out how to put text in the center of the bar --->
                                <v-progress-linear
                                        v-model="projectData.percentFunded"
                                        color="primary"
                                        height="20">
                                    <strong style="font-size:12px;color:white">&emsp;&emsp;&emsp;&emsp;{{ projectData.funded }} / {{ projectData.goal }} ONE</strong>
                                </v-progress-linear>
                            </v-flex>
                            <v-flex v-if="projectData.currentState == 2" xs12 sm6 class="pr-2">
                                <!--- Figure out how to put text in the center of the bar --->
                                <v-progress-linear
                                        v-model="projectData.percentFunded"
                                        persistent
                                        color="success"
                                        height="20">
                                    <strong style="font-size:12px;color:white">&emsp;&emsp;&emsp;{{ projectData.goal }} ONE goal reached!</strong>
                                </v-progress-linear>
                            </v-flex>
                            <v-flex v-if="projectData.currentState === 0 && projectData.timeElapsed != null" xs12 sm6 class="pl-2">
                                <v-progress-linear
                                        v-model="projectData.timeElapsed"
                                        persistent
                                        color="primary"
                                        height="20">
                                    <strong style="font-size:12px;color:white">&emsp;&emsp;&emsp;{{ projectData.timeRemaining }} day(s)</strong>
                                </v-progress-linear>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="projectData.currentState == 0 && notOwner"
                            color="blue darken-1"
                            flat
                            @click="fundProject">
                        Fund
                    </v-btn>
                    <v-btn v-if="projectData.currentState == 1"
                           color="blue darken-1"
                           flat
                           @click="requestRefund">
                        Refund
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
        <v-layout row justify-center>
            <v-dialog
                    v-model="displayError"
                    max-width="600px"
                    persistent>
                <PopupCard :title="popupTitle" :msg="popupMsg" v-on:closeDialog="closeDialog"></PopupCard>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    let date = require("date-and-time")
    import PopupCard from "./PopupCard.vue";
    export default {
        name: 'ProjectCard',
        components: {
            PopupCard
        },
        props: {
            inputProject: Object,
        },
        data() {
            return {
                projectData: {
                    title: "Project Name",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sapien velit, dapibus et tempor ut, consectetur convallis augue. Vestibulum id elementum nibh. Suspendisse potenti. Mauris in mi in sapien bibendum tincidunt. Aliquam erat volutpat. Maecenas sed dictum turpis. Morbi tristique elit nec est ullamcorper lobortis. Maecenas in varius orci. Suspendisse bibendum neque ac nisi semper, in bibendum massa vehicula. Sed non nisi ut tellus porta mollis et nec lorem.",
                    endDate: "11:05AM 06/16/2004",
                    timeElapsed: null,
                    timeRemaining: 3,
                    percentFunded: (9000 / 10000) * 100,
                    funded: 9000,
                    goal: 10000,
                    currentState: 0,
                },
                stateMap: [
                    { color: 'primary', text: 'Ongoing' },
                    { color: 'warning', text: 'Expired' },
                    { color: 'success', text: 'Completed' },
                ],
                notOwner: true,
                popupTitle: "Error",
                popupMsg: "Unable to complete transaction to fund project.",
                displayError: false,
            };
        },
        created() {
            this.updateProject()
        },
        methods: {
            updateProject() {
                console.log(this.inputProject)
                const pattern = date.compile('HH:mm:ss, MMM DD YYYY');
                this.projectData.title = this.inputProject.projectTitle
                this.projectData.description = this.inputProject.projectDesc
                this.projectData.currentState = this.inputProject.currentState

                let d = new Date(parseInt(this.inputProject.deadline) * 1000)
                this.projectData.endDate = date.format(d, pattern)
                let n = new Date()
                this.projectData.timeRemaining = Math.ceil((d.getTime() - n.getTime()) / (1000 * 3600))
                this.projectData.timeElapsed = null

                this.projectData.goal = parseInt(this.inputProject.goalAmount) / 10**18
                this.projectData.funded = parseInt(this.inputProject.currentAmount) / 10**18
                this.projectData.percentFunded = Math.ceil((this.projectData.funded / this.projectData.goal) * 100)

                this.finishLoad()
            },
            fundProject() {
                console.log("Funding project!")
                this.displayError = true
            },
            requestRefund() {
                console.log("Requesting refund!")
            },
            closeDialog() {
                this.displayError = false
            },
            finishLoad() {
                this.$emit("finishLoad")
            }
        },
    }
</script>