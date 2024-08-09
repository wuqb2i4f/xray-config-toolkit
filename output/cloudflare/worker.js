/* github.com/wuqb2i4f/xray-config-toolkit - v1.4.1 */

export default {
  async fetch(request, env, ctx) {
    const uuid = env.UUID || '20cf4d65-f3ac-4266-8148-76de9e1eac6e';
    const url = new URL(request.url);
    const path = url.pathname;
    const [, uuidPath, keyword] = path.split('/');
    const redirectLink = `${url.origin}/${uuidPath}/configs?sub=list`;
    const queryParams = url.searchParams;
    const sub = queryParams.get('sub');

    if (uuidPath !== uuid) {
      return handleAccessForbidden();
    }

    if (keyword !== "configs") {
      return handleRedirect(redirectLink);
    }

    const handlerMapping = {
      'url': (proxy) => () => handleUrlType(proxy.data),
      'uri': (proxy) => () => handleUriType(proxy.data),
      'json': (proxy) => () => handleJsonType(proxy.data)
    };

    const handlers = proxiesList.reduce((accumulator, proxy) => {
      accumulator[proxy.name] = handlerMapping[proxy.type](proxy);
      return accumulator;
    }, {
      'list': () => handleDashboard(url, uuidPath, keyword)
    });

    return handlers[sub] ? handlers[sub]() : handleRedirect(redirectLink);
  },
};

const STATUS_CODES = {
  SUCCESS: 200,
  REDIRECT: 301,
  FORBIDDEN: 403,
  INTERNAL_ERROR: 500
};

const CONTENT_TYPE = {
  TEXT_PLAIN: 'text/plain',
  TEXT_HTML: 'text/html'
};

const styleHtml = `
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #121212; color: #fff; }
    .toast { background-color: #ffcccb; color: black; padding: 16px; position: fixed; top: 20px; left: 50%; transform: translateX(-50%); width: 60%; border: 1px solid #f44336; border-radius: 5px; text-align: center; }
    .container { text-align: center; position: relative; width: 60%; margin: auto; }
    .card { background-color: #333; padding: 20px; margin-bottom: 20px; border-radius: 5px; }
    .button-container { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; }
    .config-button { flex-basis: calc(33.33% - 10px); margin-bottom: 2.5px ; padding: 10px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-size: 20px; box-sizing: border-box; }
    h1 { font-size: 32px; color: #fff; }
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
      .config-button { flex-basis: calc(50% - 10px); }
    }
    @media (max-width: 640px) {
      .container { width: 100%; }
      .toast { width: 100%; }
      .config-button { flex-basis: calc(50% - 10px); }
    }
    @media (max-width: 480px) {
      .container { width: 100%; }
      .toast { width: 100%; }
      .config-button { flex-basis: calc(100% - 10px); }
    }
  </style>
`;

function createResponse(content, status, contentType) {
  let fullContent = content;
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
    `;
  }

  return new Response(fullContent, {
    status: status,
    headers: { 'Content-Type': contentType }
  });
}

function handleSuccess(content, contentType = CONTENT_TYPE.TEXT_PLAIN) {
  return createResponse(content, STATUS_CODES.SUCCESS, contentType);
}

function handleRedirect(url) {
  return Response.redirect(url, STATUS_CODES.REDIRECT);
}

function handleAccessForbidden() {
  const htmlContent = `<div class="toast">Permission Denied: Check your UUID and try again.</div>`;
  return createResponse(htmlContent, STATUS_CODES.FORBIDDEN, CONTENT_TYPE.TEXT_HTML);
}

function handleInternalError() {
  const htmlContent = `<div class="toast">Internal Server Error: Unable to process the request.</div>`;
  return createResponse(htmlContent, STATUS_CODES.INTERNAL_ERROR, CONTENT_TYPE.TEXT_HTML);
}

function handleDashboard(url, uuidPath, keyword) {
  const listType = proxiesList.map(proxy => proxy.name);
  const uniqueListType = [...new Set(listType)];
  const links = uniqueListType.map(type => {
    return `<a href="${url.origin}/${uuidPath}/${keyword}?sub=${type}" class="config-button">${type}</a>`;
  });
  const htmlLinks = links.join('');
  const htmlContent = `
    <div class="container">
      <div class="card">
        <h1>Subscription Links</h1>
        <div class="button-container">${htmlLinks}</div>
      </div>
    </div>
  `;
  return handleSuccess(htmlContent, CONTENT_TYPE.TEXT_HTML);
}

function handleUriType(list) {
  const combinedText = list.join("\n");
  const encodedText = btoa(combinedText);
  return handleSuccess(encodedText);
}

function handleJsonType(list) {
  const jsonString = JSON.stringify(list, null, 2);
  return handleSuccess(jsonString);
}

async function handleUrlType(list) {
  try {
    const response = await fetch(list);
    const content = await response.text();
    return handleSuccess(content);
  } catch (error) {
    return handleInternalError();
  }
}

const proxiesList = [
  {
    name: 'wuqb2i4f',
    type: 'url',
    data: 'https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/base64/mix'
  },
  {
    name: 'wuqb2i4f-custom',
    type: 'url',
    data: 'https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/fragment/mix.json'
  },
  {
    name: 'yebekhe',
    type: 'url',
    data: 'https://raw.githubusercontent.com/yebekhe/TelegramV2rayCollector/main/sub/base64/mix'
  },
  {
    name: 'mfuu',
    type: 'url',
    data: 'https://raw.githubusercontent.com/mfuu/v2ray/master/v2ray'
  },
  {
    name: 'mahdibland',
    type: 'url',
    data: 'https://raw.githubusercontent.com/mahdibland/ShadowsocksAggregator/master/Eternity'
  },
  {
    name: 'Leon406',
    type: 'url',
    data: 'https://raw.githubusercontent.com/Leon406/SubCrawler/master/sub/share/vless'
  },
  {
    name: 'a2470982985',
    type: 'url',
    data: 'https://raw.githubusercontent.com/a2470982985/getNode/main/v2ray.txt'
  },
  {
    name: 'sample-list-uri',
    type: 'uri',
    data: [
      "vless://87f7cb00-a064-4173-9c04-70ab944b2ace@118.103.136.245:443?encryption=none&type=ws&host=esna.serveirc.com&path=%2F%40v2ray_configs_pool&security=tls&sni=esna.serveirc.com&alpn=http%2F1.1#%E9%98%B2%E5%A4%B1%E6%95%88github+SubCrawler%E4%B8%8D%E4%B8%B9_051318001",
      "trojan://wkmY1R4EcP@45.76.228.197:443?security=tls&sni=z-v2-003263.kailib.com#%F0%9F%87%BA%F0%9F%87%B8US-45.76.228.197-1665",
      "vmess://ewogICAgImFkZCI6ICJobXMwNC54bWl2aWRlby5jZmQiLAogICAgImFpZCI6IDAsCiAgICAiaG9zdCI6ICJ4bWl2aWRlby5jZmQiLAogICAgImlkIjogIjkzZWE0ODZhLWJhZGEtNDJhNC1hYzM4LWQwODhiMzIwZmExZSIsCiAgICAibmV0IjogIndzIiwKICAgICJwYXRoIjogIi9saW5rd3MiLAogICAgInBvcnQiOiA0NDMsCiAgICAicHMiOiAi8J+PgVJFTEFZLTEwNC4yMS40NC4xMDYtMjcyNyIsCiAgICAidGxzIjogInRscyIsCiAgICAidHlwZSI6ICJhdXRvIiwKICAgICJzZWN1cml0eSI6ICJhdXRvIiwKICAgICJza2lwLWNlcnQtdmVyaWZ5IjogdHJ1ZSwKICAgICJzbmkiOiAiIgp9",
      "ss://Y2hhY2hhMjAtaWV0Zi1wb2x5MTMwNTozZmJlYjY2OGY0ODQxNGY2@us.sptnk.space:57456#%F0%9F%87%BA%F0%9F%87%B8US-104.167.197.23-0605"
    ]
  },
  {
    name: 'sample-list-json',
    type: 'json',
    data: [
      {"remarks":"[us] [vl-tl-ws] [11pm-0732987]","dns":{"hosts":{"domain:googleapis.cn":"googleapis.com"},"servers":["8.8.8.8"]},"inbounds":[{"listen":"127.0.0.1","port":10808,"protocol":"socks","settings":{"auth":"noauth","udp":true,"userLevel":8},"sniffing":{"destOverride":["http","tls"],"enabled":true},"tag":"socks"},{"listen":"127.0.0.1","port":10809,"protocol":"http","settings":{"userLevel":8},"tag":"http"}],"log":{"loglevel":"warning"},"outbounds":[{"mux":{"concurrency":8,"enabled":false},"protocol":"vless","settings":{"vnext":[{"address":"iranserver.com","port":443,"users":[{"encryption":"none","flow":"","id":"5007dc3f-0270-4ed8-a210-1a1d7952756d","level":8,"security":"auto"}]}]},"streamSettings":{"sockopt":{"dialerProxy":"fragment","tcpKeepAliveIdle":100,"mark":255},"network":"ws","wsSettings":{"headers":{"Host":"bIA-paiN-BaCHE.pAGES.Dev"},"path":"/"},"security":"tls","tlsSettings":{"allowInsecure":false,"alpn":["http/1.1"],"fingerprint":"randomized","serverName":"bIA-paIn-bacHE.PAGeS.DEv","show":false}},"tag":"proxy"},{"protocol":"freedom","settings":{"fragment":{"packets":"tlshello","length":"5-30","interval":"10-20"}},"streamSettings":{"sockopt":{"TcpNoDelay":true,"tcpKeepAliveIdle":100,"mark":255}},"tag":"fragment"},{"protocol":"freedom","settings":{},"tag":"direct"},{"protocol":"blackhole","settings":{"response":{"type":"http"}},"tag":"block"}],"routing":{"domainStrategy":"IPIfNonMatch","rules":[{"ip":["8.8.8.8"],"outboundTag":"proxy","port":"53","type":"field"},{"domain":["ext:iran.dat:ir","ext:iran.dat:other"],"outboundTag":"direct","type":"field"},{"ip":["geoip:ir"],"outboundTag":"direct","type":"field"},{"domain":["ext:iran.dat:ads"],"outboundTag":"block","type":"field"}]}},
      {"remarks":"[de] [vl-no-ws] [01pm-0821203]","dns":{"hosts":{"domain:googleapis.cn":"googleapis.com"},"servers":["8.8.8.8"]},"inbounds":[{"listen":"127.0.0.1","port":10808,"protocol":"socks","settings":{"auth":"noauth","udp":true,"userLevel":8},"sniffing":{"destOverride":["http","tls"],"enabled":true},"tag":"socks"},{"listen":"127.0.0.1","port":10809,"protocol":"http","settings":{"userLevel":8},"tag":"http"}],"log":{"loglevel":"warning"},"outbounds":[{"mux":{"concurrency":8,"enabled":false},"protocol":"vless","settings":{"vnext":[{"address":"iranserver.com","port":8080,"users":[{"encryption":"none","flow":"","id":"65855cda-b08a-4738-9c5c-9588fc91f68e","level":8,"security":"auto"}]}]},"streamSettings":{"sockopt":{"dialerProxy":"fragment","tcpKeepAliveIdle":100,"mark":255},"network":"ws","wsSettings":{"headers":{"Host":"cloudflare.cdn.discord.telegram.zula.ir.fars.ir.iranserver.bazaar.ir.dontbow.store."},"path":"/melov2ray/melov2ray/melov2ray/melov2ray/melov2ray/melov2ray/melov2ray"},"security":"none"},"tag":"proxy"},{"protocol":"freedom","settings":{"fragment":{"packets":"1-1","length":"3-5","interval":"5"}},"streamSettings":{"sockopt":{"TcpNoDelay":true,"tcpKeepAliveIdle":100,"mark":255}},"tag":"fragment"},{"protocol":"freedom","settings":{},"tag":"direct"},{"protocol":"blackhole","settings":{"response":{"type":"http"}},"tag":"block"}],"routing":{"domainStrategy":"IPIfNonMatch","rules":[{"ip":["8.8.8.8"],"outboundTag":"proxy","port":"53","type":"field"},{"domain":["ext:iran.dat:ir","ext:iran.dat:other"],"outboundTag":"direct","type":"field"},{"ip":["geoip:ir"],"outboundTag":"direct","type":"field"},{"domain":["ext:iran.dat:ads"],"outboundTag":"block","type":"field"}]}}
    ]
  }
];
