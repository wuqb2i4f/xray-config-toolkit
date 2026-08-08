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

      - name: Step 2 - Create and Checkout New Branch
        run: git checkout -b stage-2-[NUM]

      - name: Step 3 - Filter and Cleanup Configs
        run: src/bash/main check [NUM]

      - name: Step 4 - Commit and Push Changes
        run: src/bash/main git update stage-2-[NUM]
