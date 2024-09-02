        "network": "tcp",
        "tcpSettings": {
          "header": {
            "type": "http",
            "request": {
              "headers": {
                "Connection": ["keep-alive"],
                "Host": ["[HOST]"],
                "Pragma": "no-cache",
                "Accept-Encoding": ["gzip, deflate"],
                "User-Agent": [
                  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
                  "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_2 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/53.0.2785.109 Mobile/14A456 Safari/601.1.46"
                ]
              },
              "method": "GET",
              "path": ["[PATH]"],
              "version": "1.1"
            }
          }
        }