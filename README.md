## kozmos-js-sdk

JavaScript SDK for interacting with Kozmos' APIs. Supports both NodeJS and browsers.
See Also: [likedb](https://github.com/kozmos/likedb)

Index of Contents:

* [Initialize API Client](#initialize-api-client)
* [Search](#search)
* [Create A Bookmark](#create-bookmark)
* [Tagging](#tagging)
* [Sync](#sync)
  * [Update Objects](#update-objects)
  * [Receive Updates](#receive-updates)
  * [Send Updates](#send-updates)
* [Testing](#testing)

## Install

```bash
$ yarn install kozmos/kozmos-js-sdk
```

## Manual

### Initialize API Client

Initialize an API client using your personal [API keys](https://getkozmos.com/settings/account):

```js
import Kozmos from 'kozmos-js-sdk'

const kozmos = new Kozmos({
  key: 'API KEY',
  secret: 'API SECRET'
})
```

To test whether the client works, simply call the `version` method:

```js
kozmos.version((err, version) => {
  err
  // => undefined

  version
  // => 5.1.0
})
```

Congrats, you've just made your first request to Kozmos servers!

### Search

Available options;

* query <string>
* from <int>
* size <int>
* sort_by_date <bool>
* sort_by_popularity <bool>
* filter_by_user <bool>
* filter_by_tag <bool>
* filter_by_homepage <bool>
* filter_by_typo <bool>
* filter_by_media <bool>
* filter_by_nonmedia <bool>

Options for an example request:

```js
const options = {
  query: "art",
  from: 0,
  size: 25,
  filter_by_user: true // If you skip this, Kozmos will return public search results
}
```

Call `kozmos.search` method once options are defined:

```js
kozmos.search(options, (err, resp) => {
  err
  // => undefined

  resp.results.total_rows
  // => 25

  resp.results.likes[0]
  // => { title: "...", "url": "..." }
```

### Create A Bookmark

You should use [likedb](https://github.com/kozmos/likedb) if you build a Kozmos client.
If you want to keep things as minimal as possible, then here is how you can create a bookmark with one request;

```js
kozmos.like('http://github.com', err => {
  err
  // => undefined
})
```

You can delete a bookmark by calling `unlike` method:

```js
kozmos.unlike('http://github.com', err => {
  err
  // => undefined
})
```

### Tagging

Tag a bookmark you've created previously:

```js
kozmos.tag('github.com', ['eggs', 'yolo', 'etc'], err => {
  err
  // => undefined
})
```

Delete a tag:

```js
kozmos.untag('github.com', "etc", err => {
  err
  // => undefined
})
```

### Sync

Kozmos provides a sync API for sending / receiving batch updates. This endpoint is consumed by
the offline bookmarking database [likedb](https://github.com/kozmos/likedb).

#### Update Objects

Sync API exchanges update objects with following properties:

* Store <string>
* DocumentId <string>
* Action <string>
* Like <string>

Action property tells Kozmos server the type of the update. It can be one of following:

* add
* update
* delete

#### Receive Updates

You can request Kozmos server to give you list of updates since certain time.

```js
let lastUpdateTS = 0

kozmos.pull(lastUpdateTS, (err, updates) => {
  err
  // => undefined

  updates.until
  // => The timestamp of the newest update in the list

  // next time we ask for request, we'll get updates
  // beginning from the newest update in this b
  lastUpdateTS = updates.until

  updates.has_more
  // => true

  updates.content.length
  // => 250

  updates
  // => updates[*Update]
})
```

#### Send Updates

You can post batch of update objects to Kozmos server to sync updates. Here is an example update:

```
const likeYoutube = {
  store: 'likes',
  action: 'add',
  documentId: 'youtube.com',
  doc: {
    title: 'A lot of videos on internet',
    url: 'youtube.com',
    raw_url: 'https://youtube.com?ref=foobar',
    liked_at: 1519376833139,
  }
}
```

This is what Kozmos' browser extension sends to the server when you create a new bookmark.
Note that there is an extra attachment called `doc` in the update we define above; it contains
the personal title for the bookmark, the raw & trimmed URL and the time user created it.

As mentoined, you can post batch of updates. Let's create another update:

```
const unlikeAmazon = {
  store: 'likes',
  action: 'delete',
  documentId: 'amazon.com'
}
```

We got two updates now. Let's send them to the server:

```js
kozmos.push([likeYoutube, unlikeAmazon], err => {
  console.error(err)
})
```

## Testing

Set following environment variables:

* API_KEY
* API_SECRET

Then you can run the tests.

On Node:

```bash
$ yarn run tests
```

On headless browser:

```node
$ yarn run browser-tests
```
