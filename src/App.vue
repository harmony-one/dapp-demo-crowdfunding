<template>
  <v-app class="grey lighten-3">
    <v-content>
      <v-container>
        <v-layout
          text-xs-center
          wrap
        >
          <v-flex mb-4>
            <h1 class="display-2 font-weight-bold mb-3">
              [Untitled Crowdfunding dApp]
            </h1>
            <p class="subheading font-weight-regular">
              Decentralized Crowdfunding on Harmony (testnet)
            </p>
          </v-flex>
        </v-layout>

        <LoadingScreen v-show="isLoading"></LoadingScreen>

        <v-tabs v-show="!isLoading"
          fixed-tabs
          dark
          :grow=true
        >
          <v-tab
            href=#project-list>
            Project List
          </v-tab>
          <v-tab
            href=#new-project>
            Submit Your Project
          </v-tab>

          <v-tab-item value=project-list>
              <ProjectCard v-for="proj, index in projectList"
                           :key="index"
                           :inputProject="proj"
                           :hmy-extension="hmyExtension"
                           :crowdfunding-instance="crowdfundingInstance"
                           v-on:finishLoad="finishLoad">
              </ProjectCard>
          </v-tab-item>

          <v-tab-item value=new-project>
            <NewProjectForm :hmy-extension="hmyExtension"
                            :crowdfunding-instance="crowdfundingInstance">
            </NewProjectForm>
          </v-tab-item>
        </v-tabs>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// We import our the scripts for the smart contract instantiation, and web3
import LoadingScreen from './components/LoadingScreen.vue'
import ProjectCard from './components/ProjectCard.vue'
import NewProjectForm from './components/NewProjectForm.vue'
import {getCrowdfundingInstance} from '../contracts/crowdfunding'
import {getProjectInstance} from '../contracts/project'
import getExtension from './extension'

export default {
  name: 'App',
  data() {
    return {
      startProjectDialog: false,
      account: null,
      stateMap: [
        { color: 'primary', text: 'Ongoing' },
        { color: 'warning', text: 'Expired' },
        { color: 'success', text: 'Completed' },
      ],
      projectList: [],
      isLoading: true,
      newProject: { isLoading: false },
      chain: {
        id: 2,
        endpoint: "https://api.s0.b.hmny.io",
        shard: 0,
      },
      transaction: {
        gasLimit: 6721900,
        gasPrice: 1000000000
      },
      crowdfundingInstance: null,
      hmyExtension: null,
    };
  },
  components: {
    NewProjectForm,
    ProjectCard,
    LoadingScreen
  },
  mounted() {
    window.addEventListener('load', () => {
      this.hmyExtension = getExtension(this.chain.endpoint, this.chain.shard, this.chain.id)
      this.crowdfundingInstance = getCrowdfundingInstance(this.hmyExtension)
      this.getProjects()
    })
  },
  update() {
    this.getProjects()
  },
  methods: {
    /**
     * Load the projects into the projectList from the given
     * crowdfunding Instance of the contract
     */
    getProjects() {
      this.crowdfundingInstance.methods.returnAllProjects().call().then((projects) => {
        projects.forEach((address) => {
          const projectInstance = getProjectInstance(address,   this.hmyExtension)
          projectInstance.methods.getDetails().call().then((data) => {
            const projectData = data;
            projectData.isLoading = false;
            projectData.contract = projectInstance
            this.projectList.push(projectData)
          })
          console.log(address)
        })
      }).catch(error => {
        console.error(error)
        alert(error.message)
      })
    },
    /*ignore*/
    startProject() {
    },
    /*ignore*/
    fundProject(index) {
    },
    /*ignore*/
    getRefund(index) {
    },
    finishLoad() {
      this.isLoading = false
    }
  },
};
</script>
