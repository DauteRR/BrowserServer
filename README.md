# BrowserServer

Express server for resolving [BrowserClient](https://github.com/DauteRR/BrowserClient)'s petitions. It exposes two endpoints:

- **/ping**: Needed for connectivity testing and information retrieval. Returns the amount of documents of each _MongoDB_ database collection.
- **/search**: Expects a text as parameter and returns

It was created as a part of the final project of Data Acquisition and Integration subject.

## Usage

To start [BrowserServer](https://github.com/DauteRR/BrowserServer) run the comands below:

```bash
$ yarn
$ yarn start
```

or

```bash
$ npm i
$ npm start
```

## About the project

With [BrowserClient](https://github.com/DauteRR/BrowserClient), users are able to search information about registered webpages. The petitions made by [BrowserClient](https://github.com/DauteRR/BrowserClient) are resolved by [BrowserServer](https://github.com/DauteRR/BrowserServer). Webpages information is stored in a _MongoDB_ database using [WebScraper](https://github.com/DauteRR/WebScraper). The database has 3 collections:

- **visited**: Stores information about visited webpages
  - _title_: Webpage title
  - _meta_: Information extracted from webpages meta tags
    - _keywords_
    - _description_
    - _author_
    - _lang_
    - _locality_
    - _organization_
  - _content_: Filtered webpage content
  - _headers_: Webpage headers
  - _lastVisited_: Timestamp
  - _url_: Webpage url
  - _baseDomain_: Flag indicating if the url corresponds to a base domain
- **notVisited**: Stores information about the webpages to be visited
  - _url_: Webpage url
  - _depth_: Recursivity depth, obtained during the document registry process
  - _baseDomain_: Flag indicating if the url corresponds to a base domain
- **error**: Stores information about webpages that were not stored due to an error
  - _lastVisited_: Timestamp
  - _url_: Webpage url
  - _baseDomain_: Flag indicating if the url corresponds to a base domain
  - _errorType_: Error type
  - _message_: Error message

## Usage

To initialize the database it is necessary to execute [WebScraper](https://github.com/DauteRR/WebScraper) specifying -i or --initialize option:

```bash
$ python3 src/main.py --initialize
```

Once the database is initialized, it is possible to start using [WebScraper](https://github.com/DauteRR/WebScraper) for retrieve webpages information. For more details, see README.md file in [WebScraper](https://github.com/DauteRR/WebScraper) repository.

After obtaining and storing information, it's time to start [BrowserServer](https://github.com/DauteRR/BrowserServer) as showed before. In order to perform searches it is necessary to start [BrowserClient](https://github.com/DauteRR/BrowserClient) web application. For more information, visit [BrowserClient](https://github.com/DauteRR/BrowserClient) repository and check README.md file.
