## Table of Contents

- [Overview](#overview)
- [Project Components](#project-components)
- [Usage](#usage)
- [License](#license)

## Overview

The main goal of this project is to automate the process of fetching network configurations, validating their correctness, and maintaining an up-to-date repository of validated configurations. The project consists of two Bash scripts, `fetch` and `check`, and a GitHub Action workflow that orchestrates their execution.

## Project Components

- `fetch`: A Bash script responsible for fetching network configuration data from an external source.

- `check`: A Bash script that validates the fetched configurations by testing them using the Xray proxy tool.

- GitHub Action: The repository includes a GitHub Action workflow named "AUTO FETCH & CHECK CONFIGS." This workflow schedules periodic runs of the `fetch` and `check` scripts, ensuring that network configurations are regularly fetched, tested, and updated in the repository.

## Usage

To utilize this project, follow these steps:

1. Clone this repository to your local machine.
2. Modify the `fetch` script to fetch configurations from your desired source.
3. Run the `fetch` script to retrieve configuration data.
4. The GitHub Action workflow will automatically run at the specified schedule, executing the `check` script and validating the configurations using Xray.
5. Valid configurations will be updated and committed to the repository.

<table>
  <thead>
    <tr>
      <th>CONFIG TYPE</th>
      <th>NORMAL SUBSCRIPTION</th>
      <th>BASE64 SUBSCRIPTION</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>MIX OF ALL</td>
      <td>
        <a href="https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/mix">NORMAL SUBSCRIPTION</a>
      </td>
      <td>
        <a href="https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/mix_base64">BASE64 SUBSCRIPTION</a>
      </td>
    </tr>
  </tbody>
</table>

## License

This project is licensed under the [GNU General Public License (GPL)](LICENSE).
