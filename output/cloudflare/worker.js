/* github.com/wuqb2i4f/xray-config-toolkit - v1.9.0 */

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const uuid = globalThis.UUID || '20cf4d65-f3ac-4266-8148-76de9e1eac6e'
  const url = new URL(request.url)
  const path = url.pathname
  const [, uuidPath, keyword] = path.split('/')
  const redirectLink = `${url.origin}/${uuidPath}/configs?sub=list`
  const queryParams = url.searchParams
  const sub = queryParams.get('sub')

  if (uuidPath !== uuid) {
    return handleAccessForbidden()
  }

  if (keyword !== 'configs') {
    return handleRedirect(redirectLink)
  }

  const handlerMapping = {
    uri: (proxy) => () => handleUriType(proxy.data),
    json: (proxy) => () => handleJsonType(proxy.data),
  }

  const handlers = proxiesList.reduce(
    (accumulator, proxy) => {
      accumulator[proxy.name] = handlerMapping[proxy.type](proxy)
      return accumulator
    },
    {
      list: () => handleDashboard(url, uuidPath, keyword),
    }
  )

  return handlers[sub] ? handlers[sub]() : handleRedirect(redirectLink)
}

const STATUS_CODES = {
  SUCCESS: 200,
  REDIRECT: 301,
  FORBIDDEN: 403,
  INTERNAL_ERROR: 500,
}

const CONTENT_TYPE = {
  TEXT_PLAIN: 'text/plain',
  TEXT_HTML: 'text/html',
}

const styleHtml = `
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      margin: 0; 
      padding: 20px; 
      background-color: #121212; 
      color: #fff; 
    }
    .toast { 
      background-color: #ffcccb; 
      color: black; 
      padding: 16px; 
      position: fixed; 
      top: 20px; 
      left: 50%; 
      transform: translateX(-50%); 
      width: 60%; 
      border: 1px solid #f44336; 
      border-radius: 5px; 
      text-align: center; 
    }
    .container { 
      text-align: center; 
      position: relative; 
      width: 60%; 
      margin: auto; 
    }
    .card { 
      background-color: #333; 
      padding: 20px; 
      margin-bottom: 20px; 
      border-radius: 10px; 
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    }
    .link-container { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      padding: 10px; 
      border-bottom: 1px solid #444; 
      cursor: pointer; 
      transition: background-color 0.3s ease; 
    }
    .link-container:hover { 
      background-color: #444; 
    }
    .link-title { 
      font-size: 18px; 
      color: #fff; 
      font-weight: 500; 
      letter-spacing: 0.5px; 
    }
    .copy-button { 
      background-color: #007BFF; 
      color: #fff; 
      border: none; 
      padding: 8px 16px; 
      border-radius: 5px; 
      cursor: pointer; 
      font-size: 14px; 
      transition: background-color 0.3s ease, transform 0.2s ease; 
      width: 80px; /* Fixed width for the button */
      text-align: center; /* Center text inside the button */
    }
    .copy-button:hover { 
      background-color: #0056b3; 
    }
    .copy-button:active { 
      transform: scale(0.95); 
    }
    h1 { 
      font-size: 28px; 
      color: #fff; 
      margin-bottom: 20px; 
      font-weight: 600; 
      letter-spacing: 1px; 
    }
    @media (max-width: 1280px) {
      .container { width: 70%; }
      .toast { width: 70%; }
    }
    @media (max-width: 1024px) {
      .container { width: 80%; }
      .toast { width: 80%; }
    }
    @media (max-width: 768px) {
      .container { width: 90%; }
      .toast { width: 90%; }
    }
    @media (max-width: 640px) {
      .container { width: 100%; }
      .toast { width: 100%; }
    }
    @media (max-width: 480px) {
      .container { width: 100%; }
      .toast { width: 100%; }
    }
  </style>
`

function createResponse(content, status, contentType) {
  let fullContent = content
  if (contentType === CONTENT_TYPE.TEXT_HTML) {
    fullContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${styleHtml}
        <title>Dashboard</title>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `
  }

  return new Response(fullContent, {
    status: status,
    headers: { 'Content-Type': contentType },
  })
}

function handleSuccess(content, contentType = CONTENT_TYPE.TEXT_PLAIN) {
  return createResponse(content, STATUS_CODES.SUCCESS, contentType)
}

function handleRedirect(url) {
  return Response.redirect(url, STATUS_CODES.REDIRECT)
}

function handleAccessForbidden() {
  const htmlContent = `<div class="toast">Permission Denied: Check your UUID and try again.</div>`
  return createResponse(htmlContent, STATUS_CODES.FORBIDDEN, CONTENT_TYPE.TEXT_HTML)
}

function handleInternalError() {
  const htmlContent = `<div class="toast">Internal Server Error: Unable to process the request.</div>`
  return createResponse(htmlContent, STATUS_CODES.INTERNAL_ERROR, CONTENT_TYPE.TEXT_HTML)
}

function handleDashboard(url, uuidPath, keyword) {
  const listType = proxiesList.map((proxy) => proxy.name)
  const uniqueListType = [...new Set(listType)]
  const links = uniqueListType.map((type) => {
    return `
      <div class="link-container" onclick="copyToClipboard('${url.origin}/${uuidPath}/${keyword}?sub=${type}', this)">
        <span class="link-title">${type}</span>
        <button class="copy-button">Copy</button>
      </div>
    `
  })
  const htmlLinks = links.join('')
  const htmlContent = `
    <div class="container">
      <div class="card">
        <h1>Subscription Links</h1>
        <div class="link-list">${htmlLinks}</div>
      </div>
    </div>
    <script>
      function copyToClipboard(text, container) {
        navigator.clipboard.writeText(text).then(() => {
          const button = container.querySelector('.copy-button');
          button.textContent = 'Copied'; // Change button text
          button.style.backgroundColor = '#28a745'; // Change button color
          setTimeout(() => {
            button.textContent = 'Copy'; // Reset button text
            button.style.backgroundColor = '#007BFF'; // Reset button color
          }, 1500); // Reset after 1.5 seconds
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      }
    </script>
  `
  return handleSuccess(htmlContent, CONTENT_TYPE.TEXT_HTML)
}

function decodeBase64(base64) {
  const binaryString = atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

async function handleUriType(list) {
  const uriList = []
  const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/
  for (const item of list) {
    try {
      const isUrl = item.startsWith('http://') || item.startsWith('https://')
      if (isUrl) {
        const response = await fetch(item)
        const content = await response.text()
        const lines = content.split('\n').map((line) => line.trim()).filter((line) => line)
        for (const line of lines) {
          if (base64Regex.test(line)) {
            const decodedLine = decodeBase64(line)
            uriList.push(decodedLine)
          } else {
            uriList.push(line)
          }
        }
      } else {
        uriList.push(item)
      }
    } catch (error) {
      console.error(`Error fetching ${item}:`, error)
    }
  }
  const combinedText = uriList.join('\n')
  return handleSuccess(combinedText)
}

async function handleJsonType(list) {
  const jsonList = []
  for (const item of list) {
    try {
      if (typeof item === 'string' && (item.startsWith('http://') || item.startsWith('https://'))) {
        const response = await fetch(item)
        if (!response.ok) {
          throw new Error(`Failed to fetch ${item}: ${response.status} ${response.statusText}`)
        }
        const content = await response.text()
        if (content.trim().startsWith('{')) {
          const jsonObject = JSON.parse(content)
          jsonList.push(jsonObject)
        } else if (content.trim().startsWith('[')) {
          const jsonArray = JSON.parse(content)
          jsonArray.forEach((obj) => {
            jsonList.push(obj)
          })
        }
      } else if (typeof item === 'object') {
        jsonList.push(item)
      }
    } catch (error) {
      console.error(`Error processing item ${item}:`, error)
    }
  }
  const combinedJson = jsonList.join('\n')
  return handleSuccess(JSON.stringify(jsonList, null, 2), CONTENT_TYPE.APPLICATION_JSON)
}

const proxiesList = [
  {
    name: 'sample-list-uri',
    type: 'uri',
    data: [
      'https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/base64/mix-uri',
      'vless://87f7cb00-a064-4173-9c04-70ab944b2ace@118.103.136.245:443?encryption=none&type=ws&host=esna.serveirc.com&path=%2F%40v2ray_configs_pool&security=tls&sni=esna.serveirc.com&alpn=http%2F1.1#%E9%98%B2%E5%A4%B1%E6%95%88github+SubCrawler%E4%B8%8D%E4%B8%B9_051318001',
      'trojan://wkmY1R4EcP@45.76.228.197:443?security=tls&sni=z-v2-003263.kailib.com#%F0%9F%87%BA%F0%9F%87%B8US-45.76.228.197-1665',
      'vmess://ewogICAgImFkZCI6ICJobXMwNC54bWl2aWRlby5jZmQiLAogICAgImFpZCI6IDAsCiAgICAiaG9zdCI6ICJ4bWl2aWRlby5jZmQiLAogICAgImlkIjogIjkzZWE0ODZhLWJhZGEtNDJhNC1hYzM4LWQwODhiMzIwZmExZSIsCiAgICAibmV0IjogIndzIiwKICAgICJwYXRoIjogIi9saW5rd3MiLAogICAgInBvcnQiOiA0NDMsCiAgICAicHMiOiAi8J+PgVJFTEFZLTEwNC4yMS40NC4xMDYtMjcyNyIsCiAgICAidGxzIjogInRscyIsCiAgICAidHlwZSI6ICJhdXRvIiwKICAgICJzZWN1cml0eSI6ICJhdXRvIiwKICAgICJza2lwLWNlcnQtdmVyaWZ5IjogdHJ1ZSwKICAgICJzbmkiOiAiIgp9',
      'ss://Y2hhY2hhMjAtaWV0Zi1wb2x5MTMwNTozZmJlYjY2OGY0ODQxNGY2@us.sptnk.space:57456#%F0%9F%87%BA%F0%9F%87%B8US-104.167.197.23-0605',
    ],
  },
  {
    name: 'sample-list-json',
    type: 'json',
    data: [
      { "remarks": "[us] [vl-tl-ws] [11pm-0732987]", "dns": { "hosts": { "domain:googleapis.cn": "googleapis.com" }, "servers": ["8.8.8.8"] }, "inbounds": [{ "listen": "127.0.0.1", "port": 10808, "protocol": "socks", "settings": { "auth": "noauth", "udp": true, "userLevel": 8 }, "sniffing": { "destOverride": ["http", "tls"], "enabled": true }, "tag": "socks" }, { "listen": "127.0.0.1", "port": 10809, "protocol": "http", "settings": { "userLevel": 8 }, "tag": "http" }], "log": { "loglevel": "warning" }, "outbounds": [{ "mux": { "concurrency": 8, "enabled": false }, "protocol": "vless", "settings": { "vnext": [{ "address": "iranserver.com", "port": 443, "users": [{ "encryption": "none", "flow": "", "id": "5007dc3f-0270-4ed8-a210-1a1d7952756d", "level": 8, "security": "auto" }] }] }, "streamSettings": { "sockopt": { "dialerProxy": "fragment", "tcpKeepAliveIdle": 100, "mark": 255 }, "network": "ws", "wsSettings": { "headers": { "Host": "bIA-paiN-BaCHE.pAGES.Dev" }, "path": "/" }, "security": "tls", "tlsSettings": { "allowInsecure": false, "alpn": ["http/1.1"], "fingerprint": "randomized", "serverName": "bIA-paIn-bacHE.PAGeS.DEv", "show": false } }, "tag": "proxy" }, { "protocol": "freedom", "settings": { "fragment": { "packets": "tlshello", "length": "5-30", "interval": "10-20" } }, "streamSettings": { "sockopt": { "TcpNoDelay": true, "tcpKeepAliveIdle": 100, "mark": 255 } }, "tag": "fragment" }, { "protocol": "freedom", "settings": {}, "tag": "direct" }, { "protocol": "blackhole", "settings": { "response": { "type": "http" } }, "tag": "block" }], "routing": { "domainStrategy": "IPIfNonMatch", "rules": [{ "ip": ["8.8.8.8"], "outboundTag": "proxy", "port": "53", "type": "field" }, { "domain": ["ext:iran.dat:ir", "ext:iran.dat:other"], "outboundTag": "direct", "type": "field" }, { "ip": ["geoip:ir"], "outboundTag": "direct", "type": "field" }, { "domain": ["ext:iran.dat:ads"], "outboundTag": "block", "type": "field" }] } },
      { "remarks": "[de] [vl-no-ws] [01pm-0821203]", "dns": { "hosts": { "domain:googleapis.cn": "googleapis.com" }, "servers": ["8.8.8.8"] }, "inbounds": [{ "listen": "127.0.0.1", "port": 10808, "protocol": "socks", "settings": { "auth": "noauth", "udp": true, "userLevel": 8 }, "sniffing": { "destOverride": ["http", "tls"], "enabled": true }, "tag": "socks" }, { "listen": "127.0.0.1", "port": 10809, "protocol": "http", "settings": { "userLevel": 8 }, "tag": "http" }], "log": { "loglevel": "warning" }, "outbounds": [{ "mux": { "concurrency": 8, "enabled": false }, "protocol": "vless", "settings": { "vnext": [{ "address": "iranserver.com", "port": 8080, "users": [{ "encryption": "none", "flow": "", "id": "65855cda-b08a-4738-9c5c-9588fc91f68e", "level": 8, "security": "auto" }] }] }, "streamSettings": { "sockopt": { "dialerProxy": "fragment", "tcpKeepAliveIdle": 100, "mark": 255 }, "network": "ws", "wsSettings": { "headers": { "Host": "cloudflare.cdn.discord.telegram.zula.ir.fars.ir.iranserver.bazaar.ir.dontbow.store." }, "path": "/melov2ray/melov2ray/melov2ray/melov2ray/melov2ray/melov2ray/melov2ray" }, "security": "none" }, "tag": "proxy" }, { "protocol": "freedom", "settings": { "fragment": { "packets": "1-1", "length": "3-5", "interval": "5" } }, "streamSettings": { "sockopt": { "TcpNoDelay": true, "tcpKeepAliveIdle": 100, "mark": 255 } }, "tag": "fragment" }, { "protocol": "freedom", "settings": {}, "tag": "direct" }, { "protocol": "blackhole", "settings": { "response": { "type": "http" } }, "tag": "block" }], "routing": { "domainStrategy": "IPIfNonMatch", "rules": [{ "ip": ["8.8.8.8"], "outboundTag": "proxy", "port": "53", "type": "field" }, { "domain": ["ext:iran.dat:ir", "ext:iran.dat:other"], "outboundTag": "direct", "type": "field" }, { "ip": ["geoip:ir"], "outboundTag": "direct", "type": "field" }, { "domain": ["ext:iran.dat:ads"], "outboundTag": "block", "type": "field" }] } },
      "https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/json/custom/mix-balancer.json",
      "https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/json/custom/mix-fragment.json"
    ],
  },
];
