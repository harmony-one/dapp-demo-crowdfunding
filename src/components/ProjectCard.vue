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
                            <v-flex v-if="projectData.currentState === 0" xs12 sm6 class="pr-2">
                                <!--- Figure out how to put text in the center of the bar --->
                                <v-progress-linear
                                        v-model="projectData.percentFunded"
                                        color="primary"
                                        height="20">
                                    <strong style="font-size:12px;color:white">&emsp;&emsp;&emsp;{{ projectData.funded }} / {{ projectData.goal }} ONE</strong>
                                </v-progress-linear>
                            </v-flex>
                            <v-flex v-if="projectData.currentState === 2" xs12 sm6 class="pr-2">
                                <!--- Figure out how to put text in the center of the bar --->
                                <v-progress-linear
                                        v-model="projectData.percentFunded"
                                        color="success"
                                        height="20">
                                    <strong style="font-size:12px;color:white">&emsp;&emsp;&emsp;{{ projectData.goal }} ONE goal reached!</strong>
                                </v-progress-linear>
                            </v-flex>
                            <v-flex v-if="projectData.currentState === 0 && projectData.timeElapsed != null" xs12 sm6 class="pl-2">
                                <v-progress-linear
                                        v-model="projectData.timeElapsed"
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
                    <v-btn v-if="projectData.currentState === 0 && notOwner"
                            color="blue darken-1"
                            flat
                            @click="fundProject">
                        Fund
                    </v-btn>
                    <v-btn v-if="projectData.currentState === 1"
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
    import PopupCard from "./PopupCode.vue";
    export default {
        name: 'ProjectCard',
        components: {
            PopupCard
        },
        props: {
            inputProject: null,
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
        mounted() {
            this.updateProject()
        },
        methods: {
            updateProject() {
                this.projectData.title = inputProject.projectTitle
                this.projectData.description = inputProject.projectDesc
                this.projectData.currentState = inputProject.currentState

                let d = new Date(parseInt(inputProject.deadline))
                this.projectData.endDate = d.format("dd.mm.yyyy hh:MM:ss")
                let date = new Date()
                let n = date.getTime()
                this.projectData.timeRemaining = Math.ceil((d.getTime() - n.getTime()) * (1000 * 3600))
                this.projectData.timeElapsed = null

                this.projectData.goal = parseInt(inputProject.goalAmount)
                this.projectData.funded = parseInt(inputProject.currentAmount)
                this.projectData.percentFunded = Math.ceil((this.projectData.percentFunded / this.projectData.goal) * 100)

                console.log("Updating project!")
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
            }
        },
    }
</script>