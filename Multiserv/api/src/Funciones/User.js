const { Usuarios } = require("../db");
const { v4: uuidv4 } = require('uuid');

const Users = [
  {
    "uid": "120XIVqAf2axAT0A3nCUe8IwYf63",
    "email": "movilpcsoporte@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Ulises Vargas",
    "phone": "+527581038416",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 07:18:46 GMT"
    },
    "passwordHash": "O62I64sAgW0owKHwQ6RRMlJhkqF81IZRGbmzSyJuBLeOYJ_SZi4v6OP_uRDU2WtHOBBkKuMftv5zxyO3UAj_UQ==",
    "passwordSalt": "_VxFEBO5uI3dtg==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 07:18:46 GMT",
    "providerData": [
      {
        "uid": "+527581038416",
        "providerId": "phone",
        "phone": "+527581038416"
      },
      {
        "uid": "movilpcsoporte@gmail.com",
        "name": "Ulises Vargas",
        "email": "movilpcsoporte@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "18Ixm0v0hsWQDo6lPbYR0SnMPry2",
    "email": "econewd@toplist.cz",
    "lastName": "",
    "emailVerified": false,
    "name": " Gavrielle Colville",
    "photoURL": "http://dummyimage.com/420x600.png/5fa2dd/ffffff",
    "phone": "+33790188415",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Mon, 15 Nov 2021 03:14:55 GMT",
      "creationTime": "Sat, 13 Nov 2021 00:57:41 GMT"
    },
    "passwordHash": "y69vDzg-IeaI2KjyA9ZDpncU9ip-rrseRq5lDPEgFXKvaYSELRX09vBKUZVK0EZ_7qMZhkowsZm_FCM3YKyJsw==",
    "passwordSalt": "CAbGKUxma5-vZQ==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:57:41 GMT",
    "providerData": [
      {
        "uid": "+33790188415",
        "providerId": "phone",
        "phone": "+33790188415"
      },
      {
        "uid": "econewd@toplist.cz",
        "name": " Gavrielle Colville",
        "email": "econewd@toplist.cz",
        "photoURL": "http://dummyimage.com/420x600.png/5fa2dd/ffffff",
        "providerId": "password"
      }]
  },
  {
    "uid": "1kh0flCWktUFAXiauKTP9adr5nX2",
    "email": "kjayne9@cdbaby.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Lurleen Schuler ",
    "photoURL": "http://dummyimage.com/726x600.png/ff4444/ffffff",
    "phone": "+387923314028",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:56:10 GMT"
    },
    "passwordHash": "tGh8a9FySytYTfZLQ-ffFJ1HdYZD4aszy5G8GGYsojZcn4ysggsYonJ0bHobrhnDzSpnJy--4HA4ZO8MgRErWg==",
    "passwordSalt": "XANFoK6daKVMfg==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:56:10 GMT",
    "providerData": [
      {
        "uid": "+387923314028",
        "providerId": "phone",
        "phone": "+387923314028"
      },
      {
        "uid": "kjayne9@cdbaby.com",
        "name": "Lurleen Schuler ",
        "email": "kjayne9@cdbaby.com",
        "photoURL": "http://dummyimage.com/726x600.png/ff4444/ffffff",
        "providerId": "password"
      }]
  },
  {
    "uid": "3LurXDgQOmfcAi5dQdcyPQZENwA3",
    "email": "uli.vargas02@outlook.com",
    "lastName": "",
    "emailVerified": true,
    "name": "Ulises Vargas",
    "phone": "+521234567870",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Mon, 15 Nov 2021 19:09:32 GMT",
      "creationTime": "Mon, 15 Nov 2021 19:07:28 GMT"
    },
    "passwordHash": "KEVeseAlANDqeaKDLxGJ7MrQOwUNyd2ZfaBW8_SWEPutikHTN8gy7b3EdkcdvBcMSb7K7Xxdd_t0mQrkp90H4A==",
    "passwordSalt": "TOTFCn22IZtrOw==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 19:09:05 GMT",
    "providerData": [
      {
        "uid": "+521234567870",
        "providerId": "phone",
        "phone": "+521234567870"
      },
      {
        "uid": "uli.vargas02@outlook.com",
        "name": "Ulises Vargas",
        "email": "uli.vargas02@outlook.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "49KPmJcVR3SikQvSz1tzTSKvpAt1",
    "email": "lbresson0@wsj.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Dorris Youster",
    "photoURL": "http://dummyimage.com/664x600.png/cc0000/ffffff",
    "phone": "+553606386008",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:33:36 GMT"
    },
    "passwordHash": "k9TlDat546IMq4U5C3Df33SRUt5PIWDYK4E_xsh9fICG9xiPNVU8wO7f_OHaid-bqRQk5eNWbGWT2kivj7IB6A==",
    "passwordSalt": "1aUmzMbEoZCrPQ==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:33:36 GMT",
    "providerData": [
      {
        "uid": "+553606386008",
        "providerId": "phone",
        "phone": "+553606386008"
      },
      {
        "uid": "lbresson0@wsj.com",
        "name": "Dorris Youster",
        "email": "lbresson0@wsj.com",
        "photoURL": "http://dummyimage.com/664x600.png/cc0000/ffffff",
        "providerId": "password"
      }]
  },
  {
    "uid": "6eSb268Y1FTMQGUSpL8Wmo7TXK83",
    "email": "bastianmurilloalzate@gmail.com",
    "lastName": "",
    "emailVerified": true,
    "name": "sebastian murillo",
    "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GgE8ziChGgU6Oq0rFjtXUDPalTOfARsKxb3dfBEVg=s96-c",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Wed, 17 Nov 2021 04:05:52 GMT",
      "creationTime": "Wed, 17 Nov 2021 02:48:11 GMT"
    },
    "tokensValidAfterTime": "Wed, 17 Nov 2021 02:48:11 GMT",
    "providerData": [
      {
        "uid": "104520035825201859053",
        "name": "sebastian murillo",
        "email": "bastianmurilloalzate@gmail.com",
        "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GgE8ziChGgU6Oq0rFjtXUDPalTOfARsKxb3dfBEVg=s96-c",
        "providerId": "google.com"
      }]
  },
  {
    "uid": "6wR1QaMH0oQn8J91uuy64W5ZMAq1",
    "email": "espinozalezama@gmail.com",
    "lastName": "",
    "emailVerified": true,
    "name": "Alejandra Espinoza Lezama",
    "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GjQ9L88wJys19mswndj-_zKq8Ei3TbubBC86qtCpJc=s96-c",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Mon, 15 Nov 2021 01:57:03 GMT",
      "creationTime": "Mon, 15 Nov 2021 00:48:20 GMT"
    },
    "tokensValidAfterTime": "Mon, 15 Nov 2021 00:48:20 GMT",
    "providerData": [
      {
        "uid": "116172704185923067693",
        "name": "Alejandra Espinoza Lezama",
        "email": "espinozalezama@gmail.com",
        "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GjQ9L88wJys19mswndj-_zKq8Ei3TbubBC86qtCpJc=s96-c",
        "providerId": "google.com"
      }]
  },
  {
    "uid": "85TbCWA9T6XcTDQ9ZxQ0OBHdk1y1",
    "email": "dowain0@nature.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Lilas Grass",
    "photoURL": "http://dummyimage.com/550x600.png/dddddd/000000",
    "phone": "+11234567890",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:31:47 GMT"
    },
    "passwordHash": "ho0DjyXwnhgu90aP-ZAQoG6JX_6C36Lf6tfJvnXzqQx5W3N3qAEq3-NoF4hOtaPj_kINAdVl1yeqkBekirUEwA==",
    "passwordSalt": "PLR7wMbNv2zPjw==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:31:47 GMT",
    "providerData": [
      {
        "uid": "+11234567890",
        "providerId": "phone",
        "phone": "+11234567890"
      },
      {
        "uid": "dowain0@nature.com",
        "name": "Lilas Grass",
        "email": "dowain0@nature.com",
        "photoURL": "http://dummyimage.com/550x600.png/dddddd/000000",
        "providerId": "password"
      }]
  },
  {
    "uid": "8Jjncs68ayUaPiMvkrlQVx0twXc2",
    "email": "uli.vargas111@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Ulises Flores",
    "phone": "+521234567890",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 07:43:51 GMT"
    },
    "passwordHash": "0znFpADDEZfKtxM4SRtN1NBLlTtH_vfDsz5P7q6SSG04LhZQrRpmBjDMJj7jSideXhZiQ0OT-0-zR_Lf_kSkBQ==",
    "passwordSalt": "SSPBA8s6wLEK4g==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 07:43:51 GMT",
    "providerData": [
      {
        "uid": "+521234567890",
        "providerId": "phone",
        "phone": "+521234567890"
      },
      {
        "uid": "uli.vargas111@gmail.com",
        "name": "Ulises Flores",
        "email": "uli.vargas111@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "8pYN2k171rdXmItOnlBM8oWfMto2",
    "email": "mtullyc@blinklist.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Shandee Hanbury-Brown",
    "photoURL": "http://dummyimage.com/505x600.png/dddddd/000000",
    "phone": "+48681608609",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:57:22 GMT"
    },
    "passwordHash": "zaVoxOpnxxqxFkKhUtqTlF_1LFmIDDwq0T7r4UlzawfqZpMi-f_IftKk_2TnzYMn4Oyhd7YhnxMWP3Jxf_CHaA==",
    "passwordSalt": "Ax-KHhaPhaVW9g==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:57:22 GMT",
    "providerData": [
      {
        "uid": "+48681608609",
        "providerId": "phone",
        "phone": "+48681608609"
      },
      {
        "uid": "mtullyc@blinklist.com",
        "name": "Shandee Hanbury-Brown",
        "email": "mtullyc@blinklist.com",
        "photoURL": "http://dummyimage.com/505x600.png/dddddd/000000",
        "providerId": "password"
      }]
  },
  {
    "uid": "9efBGf2m8EN8plsp2GrFsvYPgrU2",
    "email": "prueba15@email.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Tomás Goyret",
    "phone": "+543874847711",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 15:27:28 GMT"
    },
    "passwordHash": "wSkE0ZTKqVU7kTn08BUt1EacRR4CmifMpirYFP0X9TJTwF-Ue7b7J1rn-l_tvd2I2LLgdKlGFmn10c4YlAzqbg==",
    "passwordSalt": "w9gwoSkQ6rwIUg==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 15:27:28 GMT",
    "providerData": [
      {
        "uid": "+543874847711",
        "providerId": "phone",
        "phone": "+543874847711"
      },
      {
        "uid": "prueba15@email.com",
        "name": "Tomás Goyret",
        "email": "prueba15@email.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "AAyUS14K7dOgx6n4o1Z6jTRxSe12",
    "email": "prueba4@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "bastian alzate",
    "phone": "+573043345431",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 16:01:16 GMT"
    },
    "passwordHash": "w_IppKLGFLynklDZRxl6eKwqaK-kAPgj4_EQClYv7nONE68w30tbjqwjWvSeg3Dr3lULbKMGSvrJ09cIaAYXaA==",
    "passwordSalt": "2dXZ1bjzluI1vQ==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 16:01:16 GMT",
    "providerData": [
      {
        "uid": "+573043345431",
        "providerId": "phone",
        "phone": "+573043345431"
      },
      {
        "uid": "prueba4@gmail.com",
        "name": "bastian alzate",
        "email": "prueba4@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "AKbJM3iYJgMiyXVefx6oYDeDVWv2",
    "email": "demoprueba@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Santa Prueba",
    "phone": "+522222343434",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Mon, 15 Nov 2021 17:37:08 GMT",
      "creationTime": "Mon, 15 Nov 2021 15:40:45 GMT"
    },
    "passwordHash": "tjpyhq7Fkjf5KAsx-WMEYp5UKLyBhphjyft4W20wqRUdIIsNDe3H-RmDm2MKQfql9RA-XY2Ce8Kkrl65SJIAoQ==",
    "passwordSalt": "AdXiSuek9u8W5w==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 15:40:45 GMT",
    "providerData": [
      {
        "uid": "+522222343434",
        "providerId": "phone",
        "phone": "+522222343434"
      },
      {
        "uid": "demoprueba@gmail.com",
        "name": "Santa Prueba",
        "email": "demoprueba@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "ARyejqzqP2ZqLKMjC36DinqKDZB3",
    "email": "maargoesgil@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 00:03:32 GMT"
    },
    "passwordHash": "DyrLHrVObytqqC1D53RiJBLmPY9b2jBD4W6lUDSItRgIzXiwRkHpb8IDCsTsqZOjGL6Q2_OWU-gr5L0z5u31eg==",
    "passwordSalt": "2VVG_pDcPgQF6w==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 00:03:32 GMT",
    "providerData": [
      {
        "uid": "maargoesgil@gmail.com",
        "email": "maargoesgil@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "B37A9bC1XMbhPW11vORVFg9YWY73",
    "email": "bastianalzate1@gmail.com",
    "lastName": "",
    "emailVerified": true,
    "name": "Bastian Alzate",
    "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GiIq0D67iFzemOaFyRn6jeq_jnnxxB2Qw8iuxI8gA=s96-c",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Wed, 17 Nov 2021 04:28:22 GMT",
      "creationTime": "Sat, 13 Nov 2021 17:51:47 GMT"
    },
    "tokensValidAfterTime": "Sat, 13 Nov 2021 17:51:47 GMT",
    "providerData": [
      {
        "uid": "102146263068948061902",
        "name": "Bastian Alzate",
        "email": "bastianalzate1@gmail.com",
        "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GiIq0D67iFzemOaFyRn6jeq_jnnxxB2Qw8iuxI8gA=s96-c",
        "providerId": "google.com"
      }]
  },
  {
    "uid": "B9I519nVrHYPayK8wISGR8yBED12",
    "email": "llarking1@wunderground.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Bondy Eckart",
    "photoURL": "http://dummyimage.com/527x600.png/5fa2dd/ffffff",
    "phone": "+627858477411",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:53:31 GMT"
    },
    "passwordHash": "l1bMKrRZaG1frCCFpAVEF-23Bd6DAX59u99YGVD2q3N0oMKEbjFSTG0omKKkel8dLLZoN9kUuqBSvZPToc2YYg==",
    "passwordSalt": "nOTL058l6y5jeA==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:53:31 GMT",
    "providerData": [
      {
        "uid": "+627858477411",
        "providerId": "phone",
        "phone": "+627858477411"
      },
      {
        "uid": "llarking1@wunderground.com",
        "name": "Bondy Eckart",
        "email": "llarking1@wunderground.com",
        "photoURL": "http://dummyimage.com/527x600.png/5fa2dd/ffffff",
        "providerId": "password"
      }]
  },
  {
    "uid": "D3mD8tiBmPeRr3zjHZBIL9ByFJa2",
    "email": "bastian@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Fri, 12 Nov 2021 15:43:06 GMT",
      "creationTime": "Fri, 12 Nov 2021 15:43:06 GMT"
    },
    "passwordHash": "4aYgeyuhM1tikzNXJcRVXe2r1plpUPvV3JNBserjoNSxJs2yHqlr-BwFEGanzsAi030CklESJHdKMASjJV41vg==",
    "passwordSalt": "Rkpl-2pQP7NMDg==",
    "tokensValidAfterTime": "Fri, 12 Nov 2021 15:43:06 GMT",
    "providerData": [
      {
        "uid": "bastian@gmail.com",
        "email": "bastian@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "DuVMn1lhI4MNwmBznD7sCwCU5bo1",
    "email": "uli.vargas12345@outlook.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Dafne Vargas",
    "phone": "+523216549871",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 07:30:47 GMT"
    },
    "passwordHash": "1c2F4yIGhYVQe2OEkVLdpLAa84eRgsB1cu2mGO-MXQ5OOeVokksU2U5CW5yiU82zj_0s9yvLtDJ2qcnqjh3ldg==",
    "passwordSalt": "Nk5xrfo6YXgSMg==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 07:30:47 GMT",
    "providerData": [
      {
        "uid": "+523216549871",
        "providerId": "phone",
        "phone": "+523216549871"
      },
      {
        "uid": "uli.vargas12345@outlook.com",
        "name": "Dafne Vargas",
        "email": "uli.vargas12345@outlook.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "Jt99gleUHOb5YprmjzWiC0tsVIP2",
    "email": "jesusa@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Jesus Vargas",
    "phone": "+523333058659",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Fri, 12 Nov 2021 03:40:39 GMT"
    },
    "passwordHash": "wsDk1njUEsLD8Mcy-MZ5g9ukIXtuocxNmXkJSHEsFb7DqlIa4Qf2kyw-RsGYrLGQXhkq-kHCzoNke7q48lLMmg==",
    "passwordSalt": "awv-ckYpEX9NtQ==",
    "tokensValidAfterTime": "Fri, 12 Nov 2021 03:40:39 GMT",
    "providerData": [
      {
        "uid": "+523333058659",
        "providerId": "phone",
        "phone": "+523333058659"
      },
      {
        "uid": "jesusa@gmail.com",
        "name": "Jesus Vargas",
        "email": "jesusa@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "K8vLGWhJ80P6vOmymyJTmGt7kdN2",
    "email": "bruno8a108a@gmail.com",
    "lastName": "",
    "emailVerified": true,
    "name": "Bruno Ochoa",
    "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GgdXAqUQc0AqoIxG5bBVtO5EJpy7wh39Z3wC2hmkw=s96-c",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Tue, 16 Nov 2021 04:09:18 GMT",
      "creationTime": "Mon, 15 Nov 2021 02:08:42 GMT"
    },
    "tokensValidAfterTime": "Mon, 15 Nov 2021 02:08:42 GMT",
    "providerData": [
      {
        "uid": "112912602827682572075",
        "name": "Bruno Ochoa",
        "email": "bruno8a108a@gmail.com",
        "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GgdXAqUQc0AqoIxG5bBVtO5EJpy7wh39Z3wC2hmkw=s96-c",
        "providerId": "google.com"
      }]
  },
  {
    "uid": "MgboHmVI3MhXbkM4oOioh7h0Icp2",
    "email": "darkorxis@gmail.com",
    "lastName": "",
    "emailVerified": true,
    "name": "Orxis k",
    "photoURL": "https://lh3.googleusercontent.com/a/AATXAJwvi6lSMGS9nPn-M8DcRZaXjZgyBWtmErvuQhan=s96-c",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Sun, 14 Nov 2021 18:04:09 GMT",
      "creationTime": "Fri, 12 Nov 2021 16:14:37 GMT"
    },
    "tokensValidAfterTime": "Fri, 12 Nov 2021 16:14:37 GMT",
    "providerData": [
      {
        "uid": "114586428180499334117",
        "name": "Orxis k",
        "email": "darkorxis@gmail.com",
        "photoURL": "https://lh3.googleusercontent.com/a/AATXAJwvi6lSMGS9nPn-M8DcRZaXjZgyBWtmErvuQhan=s96-c",
        "providerId": "google.com"
      }]
  },
  {
    "uid": "OT5EWmdv5semxeULjWhDQta2jfr1",
    "email": "dafnegonzalez.tdi2a@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Dafne Gonzalez",
    "phone": "+523312780559",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Mon, 15 Nov 2021 07:46:43 GMT",
      "creationTime": "Mon, 15 Nov 2021 07:14:16 GMT"
    },
    "passwordHash": "ATc9ZdlovPBnx1fS7zL7AaEqiftqVNgoNXrD_b_M5dJ9U5Eb-qiCnyi3gqZAf1VJPzidokXSbPyR2rIiUkfC-g==",
    "passwordSalt": "JmSxAyCF9-D5YQ==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 07:14:16 GMT",
    "providerData": [
      {
        "uid": "+523312780559",
        "providerId": "phone",
        "phone": "+523312780559"
      },
      {
        "uid": "dafnegonzalez.tdi2a@gmail.com",
        "name": "Dafne Gonzalez",
        "email": "dafnegonzalez.tdi2a@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "P0upDcdcC3aLEBzbhQxTC9q1lqC3",
    "email": "prueba13@prueba13.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Tomás Goyret",
    "phone": "+543874847713",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 15:35:56 GMT"
    },
    "passwordHash": "IpPMosdAEFNwtKD9MVnOPC2vqJbmla-_oXNctnQARUYfmIr5bLEKOY6q0nDl6Iepn-Sbd0Iwl21_LxAS0clqfw==",
    "passwordSalt": "jm6oLfUnj8xK4w==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 15:35:56 GMT",
    "providerData": [
      {
        "uid": "+543874847713",
        "providerId": "phone",
        "phone": "+543874847713"
      },
      {
        "uid": "prueba13@prueba13.com",
        "name": "Tomás Goyret",
        "email": "prueba13@prueba13.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "PEg5fwzAYaM3Xr2uZQbLwmAabTU2",
    "email": "santisalxe@gmail.com",
    "lastName": "",
    "emailVerified": true,
    "name": "Santiago Salcedo",
    "photoURL": "https://lh3.googleusercontent.com/a/AATXAJx5MkWBlVW8OY6GnVoK2MHXMYWwpzDOGPMgCHwZ=s96-c",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Mon, 15 Nov 2021 23:27:40 GMT",
      "creationTime": "Sun, 14 Nov 2021 22:03:32 GMT"
    },
    "tokensValidAfterTime": "Sun, 14 Nov 2021 22:03:32 GMT",
    "providerData": [
      {
        "uid": "107328005715108760419",
        "name": "Santiago Salcedo",
        "email": "santisalxe@gmail.com",
        "photoURL": "https://lh3.googleusercontent.com/a/AATXAJx5MkWBlVW8OY6GnVoK2MHXMYWwpzDOGPMgCHwZ=s96-c",
        "providerId": "google.com"
      }]
  },
  {
    "uid": "RjnjO80l0JglWzoS1PVaS7eiZ1Z2",
    "email": "prueba2@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "prueba pruebaa",
    "phone": "+573043345438",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Mon, 15 Nov 2021 18:40:41 GMT",
      "creationTime": "Mon, 15 Nov 2021 15:03:19 GMT"
    },
    "passwordHash": "ZDs-RzAlJLLFKdF3iC4aF8R-H8FT6XW47wBaKnBvvLuRq2_3nM0KcSlW-aUT1DPkctfruSFzF6ZTdGVIiTI_uQ==",
    "passwordSalt": "mKm39ijDCuJ5yA==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 15:03:19 GMT",
    "providerData": [
      {
        "uid": "+573043345438",
        "providerId": "phone",
        "phone": "+573043345438"
      },
      {
        "uid": "prueba2@gmail.com",
        "name": "prueba pruebaa",
        "email": "prueba2@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "TEPzKwoQ5MPd09QNVNGbQbOJm8m1",
    "email": "agodson5@prweb.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Amalea Godson",
    "photoURL": "http://dummyimage.com/502x600.png/dddddd/000000",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:54:53 GMT"
    },
    "passwordHash": "Cgh7r9z4x13aJ9T64blLHsZYwztWkC5BQ342sTkn-GkSXgLMg47bWkyZiUq74y-gIHl7deN6thGm6pmh3G_Fiw==",
    "passwordSalt": "xRzPvpmmBdRIkg==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:54:53 GMT",
    "providerData": [
      {
        "uid": "agodson5@prweb.com",
        "name": "Amalea Godson",
        "email": "agodson5@prweb.com",
        "photoURL": "http://dummyimage.com/502x600.png/dddddd/000000",
        "providerId": "password"
      }]
  },
  {
    "uid": "UDXJxstpoSfaipf6eVdVVkP3Qt52",
    "email": "margoesgil@gmail.com",
    "lastName": "",
    "emailVerified": true,
    "name": "Abril Gil",
    "photoURL": "https://lh3.googleusercontent.com/a/AATXAJz3p_NnasRh6R18HH0b_dpQXwT3shgwt8iBq5Il=s96-c",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Tue, 16 Nov 2021 13:47:00 GMT",
      "creationTime": "Tue, 16 Nov 2021 13:47:00 GMT"
    },
    "passwordHash": "cqB2qdqJiuKDIOkCxSEBwm_mwBca0pjP2A1jTjPtFAYwNx9bSsdlGCvUwMQuqiYDiXTokQK3K4cIxaH0Ow81-g==",
    "passwordSalt": "lSouLa8qj-iBVA==",
    "tokensValidAfterTime": "Tue, 16 Nov 2021 14:05:39 GMT",
    "providerData": [
      {
        "uid": "margoesgil@gmail.com",
        "name": "Abril Gil",
        "email": "margoesgil@gmail.com",
        "photoURL": "https://lh3.googleusercontent.com/a/AATXAJz3p_NnasRh6R18HH0b_dpQXwT3shgwt8iBq5Il=s96-c",
        "providerId": "password"
      }]
  },
  {
    "uid": "V2hJmouZzPhsgnAFV2Wrps8kIYb2",
    "email": "tomas@tomas.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Tomás Goyret",
    "phone": "+543874847789",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 14:12:34 GMT"
    },
    "passwordHash": "SqC56OeWX7RmbLcvAcSkalBB_0LachzlssXJsHhCi8X_05RcbtbmGXk9-_IcOO4tOOhQQZ_Mt1jDEwjZcHQRVg==",
    "passwordSalt": "KL2cMJ-eVu8pjQ==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 14:12:34 GMT",
    "providerData": [
      {
        "uid": "+543874847789",
        "providerId": "phone",
        "phone": "+543874847789"
      },
      {
        "uid": "tomas@tomas.com",
        "name": "Tomás Goyret",
        "email": "tomas@tomas.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "WJ7c4YIiX4WJIkt5iVWGQuppOjW2",
    "email": "uli.vargas548@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Ulises Vargas",
    "phone": "+521234565891",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 07:33:38 GMT"
    },
    "passwordHash": "DFcKDSgfKOkSWaND50Pf9FcMl9x1iP241m0WhGIjA1qZDZe2qjRrDR0OXP2PiA9LRjSNa9iPwgYg5RBgF4OjXA==",
    "passwordSalt": "9jjbdxB9mppyyw==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 07:33:38 GMT",
    "providerData": [
      {
        "uid": "+521234565891",
        "providerId": "phone",
        "phone": "+521234565891"
      },
      {
        "uid": "uli.vargas548@gmail.com",
        "name": "Ulises Vargas",
        "email": "uli.vargas548@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "XDtH2itrYEgDBKnzyysj1CahVdw2",
    "email": "tomasgoyretsola@gmail.com",
    "lastName": "",
    "emailVerified": true,
    "name": "Tomás Goyret Solá",
    "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GirGhjxU3ukVuSjqRT_jeKrJpRc1_v_b6fn8gp6gg=s96-c",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Tue, 16 Nov 2021 18:22:59 GMT",
      "creationTime": "Sat, 13 Nov 2021 01:06:57 GMT"
    },
    "passwordHash": "8f9goHG2gW_RD4tjC9ngVGlTrHPY7B9omhUIDuYUzC2z9k82fyt502JmBX0ykfgjd7LtC7ktC2374b0sntHsCA==",
    "passwordSalt": "UcO_WtgyH07PEA==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 03:47:02 GMT",
    "providerData": [
      {
        "uid": "103280461379750292745",
        "name": "Tomás Goyret Solá",
        "email": "tomasgoyretsola@gmail.com",
        "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GirGhjxU3ukVuSjqRT_jeKrJpRc1_v_b6fn8gp6gg=s96-c",
        "providerId": "google.com"
      },
      {
        "uid": "tomasgoyretsola@gmail.com",
        "name": "Tomás Goyret Solá",
        "email": "tomasgoyretsola@gmail.com",
        "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GirGhjxU3ukVuSjqRT_jeKrJpRc1_v_b6fn8gp6gg=s96-c",
        "providerId": "password"
      }]
  },
  {
    "uid": "YYCtHMRJHfaEmqSk8ENNoZSFe1i1",
    "email": "prueba14@email.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Tomás Goyret",
    "phone": "+543874847710",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 15:26:36 GMT"
    },
    "passwordHash": "2xzOutOs3BbTMbOpcBaTuAZ7W1i1XnRSiOmWarGuAc0izoU7rzMOPPyBrY067m8sb72anlo1cMMbCopHztW_bw==",
    "passwordSalt": "HOCirhQ9Ov9LXw==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 15:26:36 GMT",
    "providerData": [
      {
        "uid": "+543874847710",
        "providerId": "phone",
        "phone": "+543874847710"
      },
      {
        "uid": "prueba14@email.com",
        "name": "Tomás Goyret",
        "email": "prueba14@email.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "aek3mVCThCbCJrHsFG7sHgtjNQF2",
    "email": "beckart6@goodreads.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Linell Larking",
    "photoURL": "http://dummyimage.com/648x600.png/5fa2dd/ffffff",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:55:09 GMT"
    },
    "passwordHash": "oeNWo6Wz9pz8513lolBVjSk7fzikGO1lL_Mq02jggIOejEJvcGKB5kYnjnReKXw6hWaB_Joem2KX-HtE1buGfA==",
    "passwordSalt": "02CIy7H1UsL7LQ==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:55:09 GMT",
    "providerData": [
      {
        "uid": "beckart6@goodreads.com",
        "name": "Linell Larking",
        "email": "beckart6@goodreads.com",
        "photoURL": "http://dummyimage.com/648x600.png/5fa2dd/ffffff",
        "providerId": "password"
      }]
  },
  {
    "uid": "bNIPIC49wkcn2YfmyBKv0DXh50P2",
    "email": "colo_goyret@hotmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Tomás Goyret",
    "phone": "+543874847715",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Tue, 16 Nov 2021 18:22:44 GMT",
      "creationTime": "Sat, 13 Nov 2021 19:58:57 GMT"
    },
    "passwordHash": "KHcJCBJ0RIKc0T6qcTzGkqK8CTO6MYuIrvqrchGOFpG5mJYuhin7nx1Gyt1XTBhiO1XLwbdz0ZiLziPSWHupRA==",
    "passwordSalt": "OibP9y_VaR1OsA==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 19:58:57 GMT",
    "providerData": [
      {
        "uid": "+543874847715",
        "providerId": "phone",
        "phone": "+543874847715"
      },
      {
        "uid": "colo_goyret@hotmail.com",
        "name": "Tomás Goyret",
        "email": "colo_goyret@hotmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "eK7xM4QxffNSO51JafCb1yiB9u02",
    "email": "uli.vargas123@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Ulises Gonzalez",
    "phone": "+521234567891",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 07:28:08 GMT"
    },
    "passwordHash": "LUvCBugzHS1iNI27m675Obo4VtuBEv7q2PYuTUAK1U8HLj5f63850sE_qbdmrv9ltBDYvleKKvsPQ3lUkDRIog==",
    "passwordSalt": "76P5xX7oQpLyTA==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 07:28:08 GMT",
    "providerData": [
      {
        "uid": "+521234567891",
        "providerId": "phone",
        "phone": "+521234567891"
      },
      {
        "uid": "uli.vargas123@gmail.com",
        "name": "Ulises Gonzalez",
        "email": "uli.vargas123@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "fCK6wjtRHweXfjQPMtVCXsAqogs2",
    "email": "tomas.goyret@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Tomás Goyret",
    "phone": "+543874847719",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 04:23:24 GMT"
    },
    "passwordHash": "b4Jn9WP1sXkcRr915mcYY9RMqLb6EWRpmfpCmIRwjn2Xx8Q3pILL1Ccl8dOHeR3NnLZ3HGidzMm682b9mSZgCQ==",
    "passwordSalt": "-aKzrUwXtxUaPg==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 04:23:24 GMT",
    "providerData": [
      {
        "uid": "+543874847719",
        "providerId": "phone",
        "phone": "+543874847719"
      },
      {
        "uid": "tomas.goyret@gmail.com",
        "name": "Tomás Goyret",
        "email": "tomas.goyret@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "kMe67U3R59RqmpgG59IvKoZwTCH2",
    "email": "multiserv@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Mon, 15 Nov 2021 02:51:05 GMT",
      "creationTime": "Fri, 12 Nov 2021 13:22:39 GMT"
    },
    "passwordHash": "wHaA5EukLu3PQi0lPoqFV3YW0sROjE16Ki_ko6Uj1ugwSVdMy1fFgGt_fXY8gqgHt09cr6jw5_-Ad4DLyBLc6g==",
    "passwordSalt": "Iz-tnbZQrieB9Q==",
    "tokensValidAfterTime": "Fri, 12 Nov 2021 13:22:39 GMT",
    "providerData": [
      {
        "uid": "multiserv@gmail.com",
        "email": "multiserv@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "kNSNWwN8Q4PGIj627FBQHQLkC203",
    "email": "shanburybrown8@devhub.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Murdock Tully",
    "photoURL": "http://dummyimage.com/543x600.png/cc0000/ffffff",
    "phone": "+546477250902",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:55:58 GMT"
    },
    "passwordHash": "cDGR-QdRwa7xatlhiQTkWnGDviBLbFNGL90FPEH8i1so21bLNrs_FV8uOUR0iwT7AkR7Ksn1KB8tXujZzbpI6g==",
    "passwordSalt": "9yETjpyGK4fclA==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:55:58 GMT",
    "providerData": [
      {
        "uid": "+546477250902",
        "providerId": "phone",
        "phone": "+546477250902"
      },
      {
        "uid": "shanburybrown8@devhub.com",
        "name": "Murdock Tully",
        "email": "shanburybrown8@devhub.com",
        "photoURL": "http://dummyimage.com/543x600.png/cc0000/ffffff",
        "providerId": "password"
      }]
  },
  {
    "uid": "lF1FABrqj9bYS4wRn0UKJD1PYOL2",
    "email": "pgmultiserv@gmail.com",
    "lastName": "",
    "emailVerified": true,
    "name": "Multi Serv",
    "photoURL": "https://lh3.googleusercontent.com/a/AATXAJxzuEY1TqCVMgmIrQcisD5G0xg8Ec_art3ZYgR0=s96-c",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Mon, 15 Nov 2021 01:02:49 GMT",
      "creationTime": "Sat, 13 Nov 2021 19:41:24 GMT"
    },
    "passwordHash": "mhzuNqM7dWnwXp6Y_C7hPRQVuj__M-Q34esaRqxalCNEhwYNzMXQ4lZqbc1EFe373XJggM0k_Bhk8Vaan9-ebQ==",
    "passwordSalt": "6G5ndNyBrHkNLw==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 01:02:07 GMT",
    "providerData": [
      {
        "uid": "pgmultiserv@gmail.com",
        "name": "Multi Serv",
        "email": "pgmultiserv@gmail.com",
        "photoURL": "https://lh3.googleusercontent.com/a/AATXAJxzuEY1TqCVMgmIrQcisD5G0xg8Ec_art3ZYgR0=s96-c",
        "providerId": "password"
      }]
  },
  {
    "uid": "mFP156omuPNdtbUDT3w6ggci3Ox1",
    "email": "ulivargas.02@gmail.com",
    "lastName": "",
    "emailVerified": true,
    "name": "Ulises Vargas Flores",
    "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GjliENmTgMpKfYLUqvw6t1bz9bDNHgT8NUSHrH5dQ=s96-c",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Mon, 15 Nov 2021 19:12:36 GMT",
      "creationTime": "Fri, 12 Nov 2021 17:36:37 GMT"
    },
    "tokensValidAfterTime": "Fri, 12 Nov 2021 17:36:37 GMT",
    "providerData": [
      {
        "uid": "107388326810291152629",
        "name": "Ulises Vargas Flores",
        "email": "ulivargas.02@gmail.com",
        "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GjliENmTgMpKfYLUqvw6t1bz9bDNHgT8NUSHrH5dQ=s96-c",
        "providerId": "google.com"
      }]
  },
  {
    "uid": "rt9lOCJzuuOHyvzVQL2EsWbqeVf2",
    "email": "lgrassa@devhub.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Domenico Owain",
    "photoURL": "http://dummyimage.com/519x600.png/ff4444/ffffff",
    "phone": "+423633543705",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:56:24 GMT"
    },
    "passwordHash": "OkYli3pb4ixvxtOmXo-tx0qDCSnx2m8Q3nnF8lSObyoBo6UyQILhtTfp5nI4mIBGy_mr0OAZ3k95bZE2wj-fuA==",
    "passwordSalt": "8pLiIKg3R-LaCg==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:56:24 GMT",
    "providerData": [
      {
        "uid": "+423633543705",
        "providerId": "phone",
        "phone": "+423633543705"
      },
      {
        "uid": "lgrassa@devhub.com",
        "name": "Domenico Owain",
        "email": "lgrassa@devhub.com",
        "photoURL": "http://dummyimage.com/519x600.png/ff4444/ffffff",
        "providerId": "password"
      }]
  },
  {
    "uid": "ryVoXVOqdrbdLNZev1m8THjAhW63",
    "email": "dyousterb@latimes.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Lin Bresson ",
    "photoURL": "http://dummyimage.com/704x600.png/ff4444/ffffff",
    "phone": "+608314423112",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:57:03 GMT"
    },
    "passwordHash": "WSpLhGmw-2V42SCeNW7UrDO1pT75O5rcwXSFLTmMuW1K3n4PBIkcNt46JHUDueey-sChLoBXhzpPJRUkLOvttw==",
    "passwordSalt": "syzHgaFEOoRLtg==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:57:03 GMT",
    "providerData": [
      {
        "uid": "+608314423112",
        "providerId": "phone",
        "phone": "+608314423112"
      },
      {
        "uid": "dyousterb@latimes.com",
        "name": "Lin Bresson ",
        "email": "dyousterb@latimes.com",
        "photoURL": "http://dummyimage.com/704x600.png/ff4444/ffffff",
        "providerId": "password"
      }]
  },
  {
    "uid": "v84FmOA8tZVeWMwXR5Jclihnt5C2",
    "email": "luisenriqueaguilar6@gmail.com",
    "lastName": "",
    "emailVerified": true,
    "name": "Luis Aguilar",
    "phone": "+529721160467",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Wed, 17 Nov 2021 11:17:44 GMT",
      "creationTime": "Wed, 17 Nov 2021 11:09:22 GMT"
    },
    "passwordHash": "FOMlX816tatJOLXwryl05mmy2Nd1tLF4Y_h7gFI8mYdMAZskgOKA_d5IG-iJtwTd-BBmhY0_-QGc2RCbzNeNEw==",
    "passwordSalt": "tX1Zs1A_MvI2xg==",
    "tokensValidAfterTime": "Wed, 17 Nov 2021 11:09:22 GMT",
    "providerData": [
      {
        "uid": "+529721160467",
        "providerId": "phone",
        "phone": "+529721160467"
      },
      {
        "uid": "luisenriqueaguilar6@gmail.com",
        "name": "Luis Aguilar",
        "email": "luisenriqueaguilar6@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "vl9IIVwDSue0XSrYWkCLn31hCN02",
    "email": "movilpc.soporte@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Ulises Vargas",
    "phone": "+523312878378",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Mon, 15 Nov 2021 01:25:58 GMT"
    },
    "passwordHash": "8uBvxuBdQENhoe7HcPpCEppg5OSObiXyfKD2lN58e6rJzPishO54wRMHCfZQbuuP7lmBlz7XkbvZoYneT2KKAw==",
    "passwordSalt": "-mSFTkRdVJKmyg==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 01:25:58 GMT",
    "providerData": [
      {
        "uid": "+523312878378",
        "providerId": "phone",
        "phone": "+523312878378"
      },
      {
        "uid": "movilpc.soporte@gmail.com",
        "name": "Ulises Vargas",
        "email": "movilpc.soporte@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "xgSmCViIZcbLv9k6IrekcXCBr0E2",
    "email": "uli.vargas@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Ulises Vargas",
    "phone": "+523333208416",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Mon, 15 Nov 2021 07:46:18 GMT",
      "creationTime": "Mon, 15 Nov 2021 01:32:24 GMT"
    },
    "passwordHash": "7-iIe7Cce4LFxs5UTgpfJht4APGj5vOgjmtv_3gA9bCDrp4zmtuzPWo3_5xNimIzgh3DULjwzuzz7xafFjcs6w==",
    "passwordSalt": "ZDPce5IUlwP6HQ==",
    "tokensValidAfterTime": "Mon, 15 Nov 2021 01:32:24 GMT",
    "providerData": [
      {
        "uid": "+523333208416",
        "providerId": "phone",
        "phone": "+523333208416"
      },
      {
        "uid": "uli.vargas@gmail.com",
        "name": "Ulises Vargas",
        "email": "uli.vargas@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "xikCYZABF5XrgDvpRWwH9vdAhNy2",
    "email": "lschuler7@gnu.org",
    "lastName": "",
    "emailVerified": false,
    "name": "Kalli Jayne",
    "photoURL": "http://dummyimage.com/718x600.png/dddddd/000000",
    "phone": "+355244707314",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:55:41 GMT"
    },
    "passwordHash": "7vUPVS7PfuSH_xueb856COP2th3F1ap05TdbeJLql2P5z5hym6NGH_7hT889iRg_bigVyGsnKscpKSWV5buPmQ==",
    "passwordSalt": "UPov_MJutYckEQ==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:55:41 GMT",
    "providerData": [
      {
        "uid": "+355244707314",
        "providerId": "phone",
        "phone": "+355244707314"
      },
      {
        "uid": "lschuler7@gnu.org",
        "name": "Kalli Jayne",
        "email": "lschuler7@gnu.org",
        "photoURL": "http://dummyimage.com/718x600.png/dddddd/000000",
        "providerId": "password"
      }]
  },
  {
    "uid": "xxAiEz9j4uThTHcCmpDuwqkvPst2",
    "email": "bastianalzate@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "bastian alzate",
    "phone": "+573043345434",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Wed, 17 Nov 2021 04:19:54 GMT",
      "creationTime": "Wed, 17 Nov 2021 01:23:38 GMT"
    },
    "passwordHash": "MDoh5ZiHjriZwGFumoh8jUDVMKte7exP_UzEYBwRjG6c-MPSVrXlXhZMGWVJHDNiSF7TH2YXxdpcTfyRzo40Hg==",
    "passwordSalt": "9LOyvpQYePr4VQ==",
    "tokensValidAfterTime": "Wed, 17 Nov 2021 01:23:38 GMT",
    "providerData": [
      {
        "uid": "+573043345434",
        "providerId": "phone",
        "phone": "+573043345434"
      },
      {
        "uid": "bastianalzate@gmail.com",
        "name": "bastian alzate",
        "email": "bastianalzate@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "yusOXdPOqGUrgSWENMeHUV8j5an2",
    "email": "uli.vargas02@gmail.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Ulises Vargas",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Fri, 12 Nov 2021 03:22:17 GMT"
    },
    "passwordHash": "5Bl9UkjLRgwMfjLY7O76rojQIYJntM6sL0oEGAzEulxRDoV12Z_lx2uE5H6QbHlO0bBKf3YJ5-nug1_lG9hvRw==",
    "passwordSalt": "cCmF2h6aD8nQIQ==",
    "tokensValidAfterTime": "Fri, 12 Nov 2021 03:22:17 GMT",
    "providerData": [
      {
        "uid": "uli.vargas02@gmail.com",
        "name": "Ulises Vargas",
        "email": "uli.vargas02@gmail.com",
        "providerId": "password"
      }]
  },
  {
    "uid": "yyoSUvSMbFbJc48iAfL2bNj6chk1",
    "email": "gcolville4@skype.com",
    "lastName": "",
    "emailVerified": false,
    "name": "Emmy Conew",
    "photoURL": "http://dummyimage.com/750x600.png/5fa2dd/ffffff",
    "phone": "+989652356648",
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Nov 2021 00:54:29 GMT"
    },
    "passwordHash": "0o-UYk6ZXHFmnjg0kPP5QRV71qQUgvFKg3O3E1vw32lTniqDhlnb73Zdknlrtz1z14YPUuuSsmFqU-jMEuqVNw==",
    "passwordSalt": "vb3QeDA4sRdGxg==",
    "tokensValidAfterTime": "Sat, 13 Nov 2021 00:54:29 GMT",
    "providerData": [
      {
        "uid": "+989652356648",
        "providerId": "phone",
        "phone": "+989652356648"
      },
      {
        "uid": "gcolville4@skype.com",
        "name": "Emmy Conew",
        "email": "gcolville4@skype.com",
        "photoURL": "http://dummyimage.com/750x600.png/5fa2dd/ffffff",
        "providerId": "password"
      }]
  }
]

const LlamadoUsers = async (usuarios) => {
for (let index = 0; index < usuarios.length; index++) {
  const user = usuarios[index];
     await Usuarios.create({
      uidClient: user.uid,
      photoURL: user.photoURL,
      phoneNumber: user.phone,
      displayName: `${user.name} ${user.lastName}`,
      provider: false,
      uidProvider: uuidv4(),
      disabled: false,
    })
}
}

module.exports = {
  LlamadoUsers,
  Users
};