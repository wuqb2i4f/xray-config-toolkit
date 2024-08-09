## Table of Contents
- [Usage](#usage)
- [Worker](#worker)
- [Distinction from Similar Tools](#distinction-from-similar-tools)


## Usage
**Normal**<br>
In Base64 format
```
https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/base64/mix
```
**Balancer**<br>
In custom config format usable in [v2rayNG](https://github.com/2dust/v2rayNG)
```
https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/json/custom/mix-balancer.json
```
**Fragment**<br>
In custom configs usable in [v2rayNG](https://github.com/2dust/v2rayNG)
```
https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/json/custom/mix-fragment.json
```


## Worker
- Create a new worker in Cloudflare.
- Add a new variable named `UUID` and assign a value to it in the environment variables section in the worker settings [(optional)](https://www.uuidgenerator.net).
- Edit the worker code with the contents of the following file.
- Edit the section related to proxies at the end of the worker file according to personal needs.
```
https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/cloudflare/worker.js
```


## Distinction from Similar Tools
- Each proxy's output is in JSON format for direct use in the Xray core.
- Each file is tested individually with the [Xray](https://xtls.github.io/en/config) core.
- Bypassing Iranian websites in any configuration using [iran-hosted-domains](https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/iran.dat).
- A worker for organizing and easier access to personal and public proxies.
