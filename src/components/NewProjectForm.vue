<template>
    <div class="form">
        <v-container>
            <v-card>
                <v-card-title>
                    <h2>Submit New Project</h2>
                </v-card-title>
                <v-card-text class="pt-0" grid-list-md>
                    <v-container class="pt-0">
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field
                                    label="Title"
                                    ref="title"
                                    placeholder="Awesome Project"
                                    counter
                                    maxlength="50"
                                    :rules="[rules.required]"
                                    v-model="newProject.title">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea
                                    label="Description"
                                    ref="description"
                                    placeholder="This is why my project is awesome & you should fund it!"
                                    counter
                                    maxlength="280"
                                    :rules="[rules.required]"
                                    v-model="newProject.description">
                                </v-textarea>
                            </v-flex>
                            <v-flex xs12 sm6 class="pr-2">
                                <v-text-field
                                    label="Goal"
                                    ref="amount"
                                    placeholder="1"
                                    type="number"
                                    min="1"
                                    max="100000"
                                    step="1"
                                    suffix="ONE"
                                    :rules="[rules.required, rules.tokenAmount]"
                                    v-model="newProject.amount">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 class="pl-2">
                                <v-text-field
                                    label="Duration"
                                    ref="duration"
                                    placeholder="1"
                                    type="number"
                                    min="1"
                                    max="14"
                                    step="1"
                                    suffix="days"
                                    :rules="[rules.required, rules.durationLength]"
                                    v-model="newProject.duration">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue darken-1"
                            flat
                            dark
                            large
                            @click="addProject"
                            :loading="newProject.isLoading">
                        Submit
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
        name: 'NewProjectForm',
        components: {
            PopupCard
        },
        data() {
            return {
                newProject: {
                    isLoading: false,
                },
                rules: {
                    required: value => !!value || "Required.",
                    tokenAmount: value => value > 0 && value <= 100000 || "Max 100000 ONE goal.",
                    durationLength: value => value > 0 && value <= 14 || "Max 2 week duration.",
                },
                canSubmit: true,
                popupTitle: "Error",
                popupMsg: "Unable to load wallet extension.",
                displayError: false,
            };
        },
        computed: {
            form () {
                return {
                    title: this.newProject.title,
                    description: this.newProject.description,
                    amount: this.newProject.amount,
                    duration: this.newProject.duration,
                }
            },
        },
        methods: {
            addProject() {
                this.canSubmit = true

                Object.keys(this.form).forEach(f => {
                    if (!this.form[f]) this.canSubmit = false

                    this.$refs[f].validate(true)
                })

                if (this.canSubmit) {
                    console.log('Submitting Project!')
                } else {
                    console.log('Invalid form input!')
                    this.displayError = true
                }
            },
            closeDialog() {
                this.displayError = false
            }
        }
    }
</script>