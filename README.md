## Table of Contents
- [Usage](#usage)
- [Bypassing Iranian Websites](#bypassing-iranian-websites)
- [Worker](#worker)
- [Distinction from Similar Tools](#distinction-from-similar-tools)

## Usage
Outlines the different types and formats available for usage

| Type     | Format `v2rayNG/v2rayN`                                                                                            |
|----------|--------------------------------------------------------------------------------------------------------------------|
| Normal   | [Base64](https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/base64/mix)                    |
| Balancer | [Custom](https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/json/custom/mix-balancer.json) |
| Fragment | [Custom](https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/json/custom/mix-fragment.json) |

## Bypassing Iranian Websites
Provides a step-by-step guide to bypass Iranian websites in v2rayNG

| Step | Action                                                                                                              |
|------|---------------------------------------------------------------------------------------------------------------------|
| 1    | Copy iran.dat link from [here](https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/iran.dat) | 
| 2    | Go to the Geo asset files section, press +, and select Add URL                                                      |
| 3    | In remarks type `iran.dat` and in URL paste the above address, then press ✔️                                         |
| 4    | Press ⬇️ to download files                                                                                           |
| 5    | Go to Settings and ensure Domain Strategy is set to IpIfNonMatch                                                    |
| 6    | In Custom rules, write `ext:iran.dat:all,geoip:ir` in DIRECT URL OR IP tab, then press ✔️                            |
| 7    | In BLOCKED URL OR IP tab, write `ext:iran.dat:ads` and press ✔️ again                                                |
| 8    | Hit back, and that's it                                                                                             |

Available formats for Balancer and Fragment specific to Iranian configurations

| Type     | Format `v2rayNG/v2rayN`                                                                                                     |
|----------|-----------------------------------------------------------------------------------------------------------------------------|
| Balancer | [Custom](https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/json/custom/mix-balancer-rules-ir.json) |
| Fragment | [Custom](https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/json/custom/mix-fragment-rules-ir.json) |

## Worker
Describes the steps to create and configure a worker in Cloudflare

| Step | Action                                                                                                                                              |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| 1    | Create a new worker in Cloudflare                                                                                                                   |
| 2    | Add a new variable named [UUID](https://www.uuidgenerator.net) and assign a value to it in the environment variables section in the worker settings |
| 3    | Edit the worker code with the contents of the following file                                                                                        |
| 4    | Edit the section at the end of the [worker](https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/cloudflare/worker.js) file   |

## Distinction from Similar Tools
Highlights the key features that differentiate this tool from similar ones

| Feature | Description                                                                                                                      |
|---------|----------------------------------------------------------------------------------------------------------------------------------|
| Output  | Each proxy's output is in JSON format for direct use in the Xray core                                                            |
| Testing | Each file is tested individually with the [Xray](https://xtls.github.io/en/config) core                                          |
| Bypassing | Bypassing Iranian websites in any configuration using [iran-hosted-domains](https://github.com/bootmortis/iran-hosted-domains) |
| Worker  | A worker for organizing and easier access to personal and public proxies                                                         |
