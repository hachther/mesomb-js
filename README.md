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

ES6 import

```JavaScript
import {PaymentOperation, RandomGenerator} from '@hachther/mesomb';

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const response = await payment.makeCollect({amount: 100, service: 'MTN', payer: '677550203', nonce: RandomGenerator.nonce()});
console.log(response.isOperationSuccess());
console.log(response.isTransactionSuccess());
```

Modular include

```JavaScript
const {PaymentOperation, RandomGenerator} = require('@hachther/mesomb');

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const response = await payment.makeCollect({amount: 100, service: 'MTN', payer: '677550203', nonce: RandomGenerator.nonce()});
console.log(response.isOperationSuccess());
console.log(response.isTransactionSuccess());
```

### Depose money in an account

ES6 import

```JavaScript
import {PaymentOperation, RandomGenerator} from '@hachther/mesomb';

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const response = await payment.makeDeposit({amount: 100, service: 'MTN', receiver: '677550203', nonce: RandomGenerator.nonce()});
console.log(response.isOperationSuccess());
console.log(response.isTransactionSuccess());
```

Modular include

```JavaScript
const {PaymentOperation, RandomGenerator} = require('@hachther/mesomb');

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const response = await payment.makeDeposit({amount: 100, service: 'MTN', receiver: '677550203', nonce: RandomGenerator.nonce()});
console.log(response.isOperationSuccess());
console.log(response.isTransactionSuccess());
```

### Get application status

ES6 import

```JavaScript
import {PaymentOperation, Signature} from '@hachther/mesomb';

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const application = await payment.getStatus();
console.log(application);
```

Modular include

```JavaScript
const {PaymentOperation, Signature} = require('@hachther/mesomb');

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const application = await payment.getStatus();
console.log(application);
```

### Get transactions by IDs

ES6 import

```JavaScript
import {PaymentOperation, Signature} from '@hachther/mesomb';

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const transactions = await payment.getTransactions(['ID1', 'ID2']);
console.log(transactions);
```

Modular include

```JavaScript
const {PaymentOperation, Signature} = require('@hachther/mesomb');

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const transactions = await payment.getTransactions(['ID1', 'ID2']);
console.log(transactions);
```

## Author

👤 **Hachther LLC <contact@hachther.com>**

* Website: https://www.hachther.com
* Twitter: [@hachther](https://twitter.com/hachther)
* Github: [@hachther](https://github.com/hachther)
* LinkedIn: [@hachther](https://linkedin.com/in/hachther)

## Show your support

Give a ⭐️ if this project helped you!
