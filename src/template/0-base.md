{
  "dns": {
    "hosts": {
      "domain:googleapis.cn": "googleapis.com",
      "dns.alidns.com": ["223.5.5.5", "223.6.6.6", "2400:3200::1", "2400:3200:baba::1"],
      "one.one.one.one": ["1.1.1.1", "1.0.0.1", "2606:4700:4700::1111", "2606:4700:4700::1001"],
      "dot.pub": ["1.12.12.12", "120.53.53.53"],
      "dns.google": ["8.8.8.8", "8.8.4.4", "2001:4860:4860::8888", "2001:4860:4860::8844"],
      "dns.quad9.net": ["9.9.9.9", "149.112.112.112", "2620:fe::fe", "2620:fe::9"],
      "common.dot.dns.yandex.net": ["77.88.8.8", "77.88.8.1", "2a02:6b8::feed:0ff", "2a02:6b8:0:1::feed:0ff"],
      "dns.403.online": ["10.202.10.202", "10.202.10.102"],
      "free.shecan.ir": ["178.22.122.100", "185.51.200.2"]
    },
    "servers": ["https://94.140.14.14/dns-query", "https://free.shecan.ir/dns-query", "https://dns.403.online/dns-query", "10.202.10.11", "10.202.10.10", "85.15.1.15", "85.15.1.14", "1.1.1.1"],
    "tag": "dns"
  },
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "port": 10808,
      "protocol": "socks",
      "settings": {
        "auth": "noauth",
        "udp": true,
        "userLevel": 8
      },
      "sniffing": {
        "destOverride": ["http", "tls"],
        "enabled": true,
        "routeOnly": true
      },
      "tag": "socks-in"
    },
    {
      "listen": "127.0.0.1",
      "port": 10809,
      "protocol": "http",
      "settings": {
        "userLevel": 8
      },
      "tag": "http-in"
    },
    {
      "listen": "127.0.0.1",
      "port": 10853,
      "protocol": "dokodemo-door",
      "settings": {
        "address": "1.1.1.1",
        "network": "tcp,udp",
        "port": 53
      },
      "tag": "dns-in"
    }
  ],
  "log": {
    "loglevel": "warning"
  },
  "outbounds": [
    {
      "mux": {
        "concurrency": -1,
        "enabled": false,
        "xudpConcurrency": 8,
        "xudpProxyUDP443": ""
      },
[PROTOCOL],
      "streamSettings": {
[NETWORK],
[SECURITY]
      },
      "tag": "proxy"
    },
    {
      "protocol": "dns",
      "tag": "dns-out"
    },
    {
      "protocol": "freedom",
      "settings": {
        "domainStrategy": "UseIP"
      },
      "tag": "direct"
    },
    {
      "protocol": "blackhole",
      "settings": {
        "response": {
          "type": "http"
        }
      },
      "tag": "block"
    }
  ],
  "policy": {
    "levels": {
      "8": {
        "connIdle": 300,
        "downlinkOnly": 1,
        "handshake": 4,
        "uplinkOnly": 1
      }
    },
    "system": {
      "statsOutboundUplink": true,
      "statsOutboundDownlink": true
    }
  },
  "routing": {
    "domainStrategy": "IPIfNonMatch",
    "rules": [
      {
        "inboundTag": ["dns-in"],
        "outboundTag": "dns-out"
      },
      {
        "ip": ["8.8.8.8"],
        "outboundTag": "direct",
        "port": "53"
      },
      {
        "domain": ["ext:iran.dat:ir", "ext:iran.dat:other"],
        "outboundTag": "direct"
      },
      {
        "ip": ["geoip:ir"],
        "outboundTag": "direct"
      },
      {
        "domain": ["ext:iran.dat:ads"],
        "outboundTag": "block"
      },
      {
        "outboundTag": "proxy",
        "network": "tcp,udp"
      }
    ]
  }
}
