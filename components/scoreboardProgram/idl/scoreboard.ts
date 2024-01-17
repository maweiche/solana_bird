export type Scoreboard = {
  "version": "0.1.0",
  "name": "scoreboard",
  "instructions": [
    {
      "name": "initializeScoreboard",
      "accounts": [
        {
          "name": "scoreboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addScore",
      "accounts": [
        {
          "name": "scoreboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "score",
          "type": "u64"
        },
        {
          "name": "timestamp",
          "type": "i64"
        }
      ]
    },
    {
      "name": "resetScoreboard",
      "accounts": [
        {
          "name": "scoreboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "Scoreboard",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "scores",
            "type": {
              "vec": {
                "defined": "Score"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Score",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "type": "publicKey"
          },
          {
            "name": "score",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "WrongSigner",
      "msg": "Signer does not match player."
    },
    {
      "code": 6002,
      "name": "ScoreboardFull",
      "msg": "Scoreboard is full."
    }
  ],
  "metadata": {
    "address": "5avBkwggqfVGFiuVf7jucTX2vzsCmMZ8ikxMgFknY1eJ"
  }
}
  
  export const IDL: Scoreboard = {
    "version": "0.1.0",
    "name": "scoreboard",
    "instructions": [
      {
        "name": "initializeScoreboard",
        "accounts": [
          {
            "name": "scoreboard",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "addScore",
        "accounts": [
          {
            "name": "scoreboard",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          }
        ],
        "args": [
          {
            "name": "score",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      },
      {
        "name": "resetScoreboard",
        "accounts": [
          {
            "name": "scoreboard",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "Scoreboard",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "authority",
              "type": "publicKey"
            },
            {
              "name": "scores",
              "type": {
                "vec": {
                  "defined": "Score"
                }
              }
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "Score",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "player",
              "type": "publicKey"
            },
            {
              "name": "score",
              "type": "u64"
            },
            {
              "name": "timestamp",
              "type": "i64"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "Unauthorized",
        "msg": "You are not authorized to perform this action."
      },
      {
        "code": 6001,
        "name": "WrongSigner",
        "msg": "Signer does not match player."
      },
      {
        "code": 6002,
        "name": "ScoreboardFull",
        "msg": "Scoreboard is full."
      }
    ],
    "metadata": {
      "address": "5avBkwggqfVGFiuVf7jucTX2vzsCmMZ8ikxMgFknY1eJ"
    }
  }
  