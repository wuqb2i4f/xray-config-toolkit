name: Stage-2-[NUM]

on:
  workflow_run:
    workflows: ["Stage-1"]
    types:
      - completed

jobs:
  run-script:
    runs-on: ubuntu-latest

    steps:
      - name: Step 1 - Fetch Repository Code
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.WORKFLOW_TOKEN }}

      - name: Step 2 - Filter and Cleanup Configs
        run: src/bash/main check [NUM]

      - name: Step 3 - Commit and Push Changes
        uses: nick-fields/retry@v3
        with:
          max_attempts: 3
          retry_on: error
          timeout_seconds: 5
          command: src/bash/main gitupdate
