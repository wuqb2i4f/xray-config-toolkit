{
  "remarks": "mix-balancer",
  "dns": {
    "hosts": {
      "domain:googleapis.cn": "googleapis.com"
    },
    "servers": ["1.1.1.1"]
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
        "routeOnly": false
      },
      "tag": "socks"
    },
    {
      "listen": "127.0.0.1",
      "port": 10809,
      "protocol": "http",
      "settings": {
        "userLevel": 8
      },
      "tag": "http"
    }
  ],
  "log": {
    "loglevel": "warning"
  },
  "outbounds": [
    [PUBLICPROXY]
    {
      "protocol": "freedom",
      "settings": {},
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
  "routing": {
    "domainStrategy": "IPIfNonMatch",
    "rules": [
      {
        "ip": ["1.1.1.1"],
        "outboundTag": "direct",
        "port": "53"
      },
      {
        "ip": ["223.5.5.5"],
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
        "balancerTag": "balancer",
        "network": "tcp,udp"
      }
    ],
    "balancers": [
      {
        "tag": "balancer",
        "selector": ["proxy"],
        "strategy": {
          "type": "leastPing"
        }
      }
    ]
  },
  "observatory": {
    "probeInterval": "60s",
    "probeURL": "https://api.github.com/_private/browser/stats",
    "subjectSelector": ["proxy"],
    "EnableConcurrency": true
  }
}
