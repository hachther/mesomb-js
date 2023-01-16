<h1 align="center">Welcome to js-mesomb 👋</h1>
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

> JavaScript client for MeSomb services.
> 
> You can check the full [documentation of the api here](https://mesomb.hachther.com/en/api/v1.1/schema/)

### 🏠 [Homepage](https://mesomb.com)

## Install

```sh
yarn install @hachther/mesomb
```

## Usage

Check the full documentation [here](docs.md)

Below some quick examples

### Collect money from an account

```JavaScript
import {PaymentOperation, Signature} from '@hachther/mesomb';

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const response = await payment.makeCollect(100, 'MTN', '677550203', new Date(), Signature.nonceGenerator());
console.log(response.isOperationSuccess());
console.log(response.isTransactionSuccess());
```

### Depose money in an account

```JavaScript
import {PaymentOperation, Signature} from '@hachther/mesomb';

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const response = await payment.makeDeposit(100, 'MTN', '677550203', new Date(), Signature.nonceGenerator());
console.log(response.isOperationSuccess());
console.log(response.isTransactionSuccess());
```

### Get application status

```JavaScript
import {PaymentOperation, Signature} from '@hachther/mesomb';

const payment = new PaymentOperation({applicationKey: '<applicationKey>', accessKey: '<AccessKey>', secretKey: '<SecretKey>'});
const application = await payment.getStatus();
console.log(application);
```

### Get transactions by IDs

```JavaScript
import {PaymentOperation, Signature} from '@hachther/mesomb';

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
