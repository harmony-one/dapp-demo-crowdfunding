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
    import PopupCard from "./PopupCard.vue";
    import app from '../App'
    import {getProjectInstance} from "../../contracts/project";
    import getExtension from "../extension";
    import {getCrowdfundingInstance} from "../../contracts/crowdfunding";


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
                hmyExtension: null,
                crowdfundingInstance: null,
                account: null,
                appData: null
            };
        },
        computed: {
            form() {
                return {
                    title: this.newProject.title,
                    description: this.newProject.description,
                    amount: this.newProject.amount,
                    duration: this.newProject.duration,
                }
            },
        },
        mounted() {
            // Need to executed after page load because extension may not appear in window.
            window.addEventListener('load', () => {
                this.appData = app.data()
                this.hmyExtension = getExtension(this.appData.chain.endpoint, this.appData.chain.shard, this.appData.chain.id)
                this.crowdfundingInstance = getCrowdfundingInstance(this.hmyExtension)
            })
        },
        methods: {

            /**
             * Internal method, to add a project with a given account.
             *
             * @param account - address of account
             * @private
             */
            _addProjectWithAccount(account) {
                this.newProject.isLoading = true;
                this.crowdfundingInstance.methods.startProject(
                    this.newProject.title,
                    this.newProject.description,
                    this.newProject.duration,
                    this.hmyExtension.utils.toWei(this.newProject.amount, 'ether')
                ).send({
                    from: account,
                    gasPrice: this.appData.transaction.gasPrice,
                    gasLimit: this.appData.transaction.gasLimit
                }).then((response) => {
                    console.log("Project submitted!")
                    console.log("New Project Contract address: " + response.address)
                    console.log(response.transaction)
                    const projectInstance = getProjectInstance(response.address, this.hmyExtension)
                    console.log(projectInstance)
                    this.newProject = {isLoading: false};
                    window.location.reload(false);
                }).catch(error => {
                    this.newProject = {isLoading: false};
                    console.error(error)
                    this.popupTitle = "Add Project Error"
                    this.popupMsg = error.message
                    this.displayError = true
                })
            },

            /**
             * Add a project with the given wallet extension.
             */
            addProject() {
                this.canSubmit = true
                Object.keys(this.form).forEach(f => {
                    if (!this.form[f]) this.canSubmit = false
                    this.$refs[f].validate(true)
                })

                console.log("Adding Project!")
                if (this.account != null) {
                    this._addProjectWithAccount(this.account)
                } else {
                    this.hmyExtension.login().then((acc) => {
                        this.account = acc.account
                        this._addProjectWithAccount(acc.account)
                    }).catch(error => {
                        this.newProject = {isLoading: false};
                        console.error(error)
                        this.popupTitle = "Wallet Login Error"
                        this.popupMsg = error.message
                        this.displayError = true
                    })
                }
            },

            /**
             * Close any open error window
             */
            closeDialog() {
                this.displayError = false
            }
        }
    }
</script>