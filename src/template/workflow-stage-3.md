name: Stage-3-[NUM]

on:
  workflow_run:
    workflows: ["Stage-2"]
    types:
      - completed

jobs:
  run-script:
    if: github.ref == 'refs/heads/dev'
    runs-on: ubuntu-latest

    steps:
      - name: Step 1 - Fetch Repository Code
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.WORKFLOW_TOKEN }}
          ref: dev

      - name: Step 2 - Filter and Cleanup Configs
        run: src/bash/main check [NUM]

      - name: Step 3 - Commit and Push Changes
        uses: nick-fields/retry@v3
        with:
          max_attempts: 3
          retry_on: error
          timeout_seconds: 15
          command: src/bash/main gitupdate