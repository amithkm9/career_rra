/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

// Add this line to define the studio host
export default defineCliConfig({
  api: {
    projectId: 'dz88krr6',
    dataset: 'production'
  },
  // Add this line to fix the error
  studioHost: 'classment-blog'
})