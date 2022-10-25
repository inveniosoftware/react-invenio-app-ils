# Changes

Version 1.0.0-alpha.74 (released 2022-10-25)

- upgrade to RSK@2.x

Version 1.0.0-alpha.72 (released 2022-10-24)

- eitems: increase vocabulary source size to 60

Version 1.0.0-alpha.71 (released 2022-10-07)

- series: improve search tip popup and fix searchbar autofocus
- covers: fix alignment in front page
- covers: add box shadows to small and large sizes

Version 1.0.0-alpha.70 (released 2022-08-24)

- disable Google fonts
- improve the no results search page suggesting to request the literature
  to the library

Version 1.0.0-alpha.69 (released 2022-08-12)

- series: add tooltip on volumes search (details page)
- add covers in relation modal

Version 1.0.0-alpha.68 (released 2022-03-10)

- backoffice: fix series details volumes search phrase

Version 1.0.0-alpha.67 (released 2022-03-09)

- series details: search for exact pid for volumes list

Version 1.0.0-alpha.66 (released 2022-02-24)

- DocumentConference: pass needed props to overridable context so users
  can access the props when they override the component

Version 1.0.0-alpha.65 (released 2022-02-21)

- other authors: fix `et al.` display across the site

Version 1.0.0-alpha.64 (released 2022-02-07)

- update npm dependencies

Version 1.0.0-alpha.63 (released 2022-02-01)

- backoffice: display missing alternate titles for documents

Version 1.0.0-alpha.62 (released 2022-01-18)

- series details: add physical location section (periodicals)
- patron profile: improve pagination and loans display

Version 1.0.0-alpha.61 (released 2022-01-14)

- backoffice patron details: fix automatic item checkout
- series details: fix volumes fetch query
- document details: minor UI updates

Version 1.0.0-alpha.60 (released 2021-12-17)

- RJSF: fix enter key press event
- Axios: align header name with invenio

Version 1.0.0-alpha.59 (released 2021-12-02)

- Validate that vocabulary field values in the form select are valid.
- Ensure that the first loan of each document is the one with the earliest start date.
- Order loans in search by ascending creation date.
- Fix 'See all' button search query in the loans history.
- Allow downloading loans in csv/json file.
- Add warning for the librarian trying to extend an overbooked loan.
- Add error notification for unhandled API errors.

Version 1.0.0-alpha.58 (released 2021-11-11)

- correct acquisition order form prefilling
- change loan restriction label
- show items on loan in 'where to find' section
- fix pagination records table

Version 1.0.0-alpha.57 (released 2021-10-25)

- fix display of content in document details page

Version 1.0.0-alpha.56 (released 2021-10-22)

- add links to the search guide
- disable the bulk extend loans if no loans to extend
- document details page overhaul

Version 1.0.0-alpha.55 (released 2021-10-08)

- fix purchase order assignment to document request

Version 1.0.0-alpha.54 (released 2021-09-30)

- add bulk extension feature

Version 1.0.0-alpha.53 (released 2021-09-28)

- global: notification module integration

Version 1.0.0-alpha.52 (released 2021-08-30)

- document: add purchase orders to display
- check in: improve location display
- loan: show warning on document overbooking

Version 1.0.0-alpha.51 (released 2021-07-29)

- eitem: add source field
- document: required languages field
- document: add more information to display

Version 1.0.0-alpha.50 (released 2021-07-08)

- store: add configuration for dynamically added reducers

Version 1.0.0-alpha.49 (released 2021-07-07)

- series: check dependencies before delete action
- document: reorder form fields

Version 1.0.0-alpha.48 (released 2021-06-07)

- document: fix reference query on delete

Version 1.0.0-alpha.47 (released 2021-06-02)

- document: add all references to delete confirmation modal

Version 1.0.0-alpha.46 (released 2021-05-27)

- add document type to item search facets

Version 1.0.0-alpha.45 (released 2021-05-25)

- fix extension days calculation

Version 1.0.0-alpha.44 (released 2021-05-25)

- fix extension date validation

Version 1.0.0-alpha.43 (released 2021-05-17)

- checkin: clear searchbar on success
- add display title to borrowing request and order

Version 1.0.0-alpha.42 (released 2021-05-07)

- fix loan details checkout
- fix eitems display on document details page
- add other relation to document details metadata

Version 1.0.0-alpha.41 (released 2021-04-28)

- fix open access label for series

Version 1.0.0-alpha.40 (released 2021-04-26)

- routing: fix custom routing frontsite overridable

Version 1.0.0-alpha.39 (released 2021-04-22)

- patron profile: add anchors in statistics
- patron profile: display cancelled loan state
- literature request: overridable missing search results message
- landing page: quick access buttons as anchors

Version 1.0.0-alpha.38 (released 2021-04-15)

- fix display of cancelled loan in
  patron profile

Version 1.0.0-alpha.37 (released 2021-04-13)

- change e-book labels to digital
- add series type in frontsite search results
- display creation date on borrowing requests

Version 1.0.0-alpha.36 (released 2021-04-09)

- do not require order date in acquisition
- display order creation date

Version 1.0.0-alpha.35 (released 2021-04-07)

- add login_required flag to access urls of series
- add volume display to multipart volumes
- add series type field to series objects

Version 1.0.0-alpha.34 (released 2021-03-29)

- fix patron details links
- add display of legacy ids in details page
- add overridable cmp for standard number
- fix date picker for loans and add date sorting

Version 1.0.0-alpha.33 (released 2021-03-23)

- fix authors display in searches
- bugfix delivery method

Version 1.0.0-alpha.32 (released 2021-03-18)

- remove electronic volumes field
- logo changes

Version 1.0.0-alpha.31 (released 2021-03-16)

- replace document form with react-json-schema form
- rename proceedings and ebooks
- small fixes in loan request form in frontsite
- add overridable component for standard number in frontsite

Version 1.0.0-alpha.30 (released 2021-03-12)

- add volume description fields to series
- fix table of content display on document
- change type of conference field of document

Version 1.0.0-alpha.29 (released 2021-03-10)

- replace vendors and external libraries with providers
- improve literature request form
- replace series form with react-json-schema-forms
- fix display of document card in search
- fix cypress test

Version 1.0.0-alpha.28 (released 2021-03-04)

- add overdue reminders counter to emails
- replace forms with react-json-schema forms
- update frontsite document detail page
- restrict IE
- add document type article
- fix truncate titles
- styling fixes

Version 1.0.0-alpha.27 (released 2021-02-16)

- add react-jsonschema-forms
- add backoffice literature request form
- fix physical description fields

Version 1.0.0-alpha.26 (released 2021-02-10)

- fix max search results configuration

Version 1.0.0-alpha.25 (released 2021-02-04)

- add item availability filter to loan search
- bugfixes for literature covers
- update access restrictions for serials providers

Version 1.0.0-alpha.24 (released 2021-01-25)

- fix document and series metadata component

Version 1.0.0-alpha.23 (released 2021-01-18)

- fix `has files` search filter
- add patron extension status
- truncate long titles
- fix email templates
- improve authors display

Version 1.0.0-alpha.22 (released 2021-01-12)

- update RSK
- export media component

Version 1.0.0-alpha.21 (released 2021-01-12)

- fix the way the 404 route can be overridden
- update Cypress tests
- fix visualization of reprint field
- fix checkbox filter that was not clickable
- remove unused facet "related content" in the literature search page
- improve book covers visualization
- update semantic-ui to the latest

Version 1.0.0-alpha.20 (released 2020-11-30)

- bugfix in the literature request workflow
- fix login required url for e-items
- add overridable routes for frontsite and backoffice
- add validation for document pid in item form

Version 1.0.0-alpha.19 (released 2020-10-13)

- fixes filters display on mobile version
- removes cover loading image when no image present

Version 1.0.0-alpha.18 (released 2020-10-11)

- integrated latest changes of RSK
- improved searchbar
- displays the delivery method in the "My loans" section
- updates location form opening hours
- refactors extra fields of the documents
- replaces Travis with GH actions
- adds banner
- adds more cypress tests for the frontsite
- bug fixes

Version 1.0.0-alpha.17 (released 2020-10-27)

- removed contact email from config
- refactor some config vars

Version 1.0.0-alpha.16 (released 2020-10-23)

- form fields fixes
- item medium vocabulary fixes

Version 1.0.0-alpha.15 (released 2020-10-20)

- handle CSRF error on request
- update sorting configuration
- add forms validation
- cypress E2E testing
- add warning on overbooked documents
- fix loan request component

Version 1.0.0-alpha.14 (released 2020-10-13)

- improve error handling
- add publication information to document
- fixe HitSearch component
- minor UI fixes
- add environment labeling
- decrease ES delay
- Refactor SearchBar

Version 1.0.0-alpha.13 (released 2020-09-30)

- add success notification on file upload on e-items
- allow to override Patron metadata information in backoffice
- fix to authors fields
- integrate the location closures module

Version 1.0.0-alpha.12 (released 2020-09-16)

- add error pages
- allow edition of loans start and end dates
- fix error message layout in login page
- bug fixes

Version 1.0.0-alpha.11 (released 2020-09-04)

- add enabled attribute in oauth
- make npm start runs on HTTPS by default

Version 1.0.0-alpha.10 (released 2020-08-14)

- improve UX of the backoffice forms
- fix form validation
- add feauture checkout by scan
- fix layout issues in login page
- disable force checkout for items on loan
- upgrade react-searchkit components
- add sort by title option in search

Version 1.0.0-alpha.9 (released 2020-07-28)

- fix document request config
- display loan request to item details page
- display document subtitle
- add loading state to loan checkout
- add states to loan requests
- add identifiers to e-items
- add checkout page to backoffice
- add npm start:secure for development with https

Version 1.0.0-alpha.8 (released 2020-07-21)

- frontsite document details bugfix

Version 1.0.0-alpha.7 (released 2020-07-20)

- automatic check-in feature
- improved configuration object
- bugfixes

Version 1.0.0-alpha.6 (released 2020-07-08)

- enables overridability of home page background image
- enhances the visualization of packages versions in the backoffice sidebar

Version 1.0.0-alpha.5 (released 2020-07-01)

- fetches the full user profile from REST APIs
- overridable static pages

Version 1.0.0-alpha.4 (released 2020-06-25)

- new exported components
- fix broken state for new literature requests

Version 1.0.0-alpha.3 (released 2020-06-22)

- bugfix for backoffice sidebar

Version 1.0.0-alpha.2 (released 2020-06-19)

- npm publish fix

Version 1.0.0-alpha.1 (released 2020-06-19)

- patron can request extension for ILLs
- ill: create borrowing request from document request
- backoffice: ill accept/decline extension
- overridable extensions components (#58)

Version 1.0.0-alpha.0 (released 2020-06-09)

- Initial public release.
