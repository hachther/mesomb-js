<h1 style="text-align: center">Welcome to js-mesomb 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://mesomb.hachther.com/en/api/v1.1/schema/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/hachther" target="_blank">
    <img alt="Twitter: hachther" src="https://img.shields.io/twitter/follow/hachther.svg?style=social" />
  </a>
</p>

> JavaScript client for mobile payment (Orange Money, Mobile Money ...) with MeSomb services.
> 
> You can check the full [documentation of the api here](https://mesomb.hachther.com/en/api/v1.1/schema/)

### 🏠 [Homepage](https://mesomb.com)

## Install

```sh
yarn add @hachther/mesomb
# or
npm install @hachther/mesomb
```

## Usage

Check the full documentation [here](docs.md)

Below some quick examples

### Collect money from an account

```JavaScript
import {PaymentOperation, RandomGenerator} from '@hachther/mesomb';

// or Modular import
// const {PaymentOperation} = require('@hachther/mesomb');

const applicationKey = '<your application key>'
const accessKey = '<your access key>'
const secretKey = '<your secret key>'
const client = new PaymentOperation({applicationKey, accessKey, secretKey});

const response = await client.makeCollect({
  payer: '670000000',
  amount: 10000,
  service: 'MTN',
  country: 'CM',
  currency: 'XAF',
  customer: {
    email: 'email@gmail.com',
    firstName: 'Dan',
    lastName: 'Fisher',
    town: 'Douala',
    region: 'Littoral',
    country: 'CM',
    address: 'Bepanda',
  },
  location: {town: 'Douala', region: 'Littoral', country: 'CM'},
  products: [
    {name: 'Sac a Main SM', category: 'Sac a Main', quantity: 1, amount: 10000}
  ],
});
```

### Depose money in an account

```JavaScript
import {PaymentOperation} from '@hachther/mesomb';

// Modular import
// const {PaymentOperation} = require('@hachther/mesomb');

const applicationKey = '<your application key>'
const accessKey = '<your access key>'
const secretKey = '<your secret key>'
const client = new PaymentOperation({applicationKey, accessKey, secretKey});

const response = await client.makeDeposit({
  receiver: '670000000',
  amount: 10000,
  service: 'MTN',
  country: 'CM',
  currency: 'XAF',
  customer: {
    email: 'email@gmail.com',
    first_name: 'Dan',
    last_name: 'Fisher',
    town: 'Douala',
    region: 'Littoral',
    country: 'CM',
    address: 'Bepanda',
  },
  location: {town: 'Douala', region: 'Littoral', country: 'CM'},
  products: [
    {name: 'Sac a Main SM', category: 'Sac a Main', quantity: 1, 'amount': 10000}
  ],
});

response.isOperationSuccess()
response.isTransactionSuccess()
```

### Get application status

```JavaScript
import {PaymentOperation} from '@hachther/mesomb';
// Modular import
// const {PaymentOperation} = require('@hachther/mesomb');

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const application = await payment.getStatus();
console.log(application);
```

### Get transactions by IDs

```JavaScript
import {PaymentOperation} from '@hachther/mesomb';
// Modular import
// const {PaymentOperation} = require('@hachther/mesomb');

const applicationKey = '<your application key>'
const accessKey = '<your access key>'
const secretKey = '<your secret key>'
const client = new PaymentOperation({applicationKey, accessKey, secretKey});

const transactions = await client.getTransactions(['a483a9e8-51d7-44c9-875b-1305b1801274']);

console.log(transactions)
```


## Author

👤 **Hachther LLC <contact@hachther.com>**

* Website: https://www.hachther.com
* Twitter: [@hachther](https://twitter.com/hachther)
* Github: [@hachther](https://github.com/hachther)
* LinkedIn: [@hachther](https://linkedin.com/in/hachther)

## Show your support

Give a ⭐️ if this project helped you!
