
---
# Deploy

## Instructions

Using Terminal/CMD: Download all project dependencies using the command...

``` npm
$ npm install
```

Using Terminal/CMD: Spin up a server to allow the website to be developed locally

``` npm
$ npm run dev
```

Using Terminal/CMD: Watch the files for any updates and changes. Download [Livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei//go) to the changes can be viewed instantly while developing.

``` gulp
$ gulp watch
```


Using Terminal/CMD: Build a production version of the site.

``` gulp
$ gulp --production
```

Download [gcloud SDK](https://cloud.google.com/sdk/) Then login to the provided gcloud account with the command below. Or [login](https://console.cloud.google.com/home/dashboard?project=nectarbeverages-205303&authuser=2&_ga=2.124982862.-531562479.1527669920) to the provided nectar gcloud account and use the "Activate Google Cloud Shell" to login.

``` 
$ gcloud auth login
```

Using Terminal/CMD: To deploy the website to nectarbeverages.co.nz

``` gulp
$ gcloud app deploy
```
---


