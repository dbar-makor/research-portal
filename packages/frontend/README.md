# Comments on the Project

## 1. Login Details

One can login as:

1 <b>Admin</b>

- <u>username</u>: amoshaev
- <u>password</u>: 12345678

2 <b>Salesperson</b>

- <u>username</u>: statarinova
- <u>password</u>: 12345678

3 <b>Author</b>

- <u>username:</u> ehilel
- <u>password:</u> 12345678

4 <b>Member (client)</b>

- <u>username:</u> brefaeli
- <u>password:</u> 12345678

5 <b>Member (prospect)</b>

- <u>username:</u> ryakovy
- <u>password:</u> 12345678

## 2. Author Flow

### Description:

- The first page after logging in presents all authors' publications (published tab/drafts tab), as well as authors' statistics. The "New" buttos allows to add a new publication. Once clicked, one can add a "live" publication ("write an article") or a "dead" publication ("upload files").
- Live publication- enables the author to write the article in a rich text editor (created with the mui-rte package,based on draft.js package). Mandatory fields: title, article text, categories (at least one), cover image.
- The user can save the form as draft at any stage or click "done" to mark it as published if all required fields are filled. All this logic is working.
- There is also a "preview" button that presents the article as a member would see it.

### Bugs:

- when coming back from preview screen and making further changes to the form, the validation state controlling the "Done" button doesn't behave properly (the button remains disabled even when it should not) (**Generally, it would be better to open the preview in a new tab and separate the states of form and preview.**)
- **Important addition in the future: auto-save** (maybe in local storage, not in server), as it is a form that takes a while to complete and info shouldn't be lost upon refresh or accidentally closing the tab.
-  Dead article- similar to the above. The user does not type in the article, but attaches a PDF file or a video link instead. **Same issue when coming back from preview**, and here to an auto-save could be helpful, but not as important as in the live publication case.
-  Back to the main sceen. When hovering over one of the publications, two buttons appear - for deleting and editing. Editing takes the user to the same form that was
  used to add the publication in the first place- either dead or live publicaton. Validation for this case works ok, **except for the same bug involving the preview** (when going to preview, coming back to form and then making further changes - the Done button is disabled when it shouldn’t).
- Missing page - user settings page for authors (design is not fully ready yet we think).

## 3. Salesperson Flow
### Description: 
-	The first page after logging in shows a table listing all existing companies. The table is filterable and searchable
-	When clicking the New button in this screen, a modal form appears that enables the salesperson to add a new company. The form is built as a stepper with two steps. First step for general company data, the second one for adding members. After adding a member, the user should click the + button (_is it clear enough for the user?_). The member is being added to the table. One can submit the form once there is at least one member. When submitting the
 form, each member receives a validation email. The new company is being added to the list.
-	When clicking a single company row in the table, a side view appears with info on the company. Here one can delete the company, edit its details, edit members' details inline. When clicking the "sign a contract" button (for companies without contract - prospects), the user is taken to another page (maybe modal is preferable) with a contract form. Minimal members no. is taken from the company data that was created once the company was added. When clicking done, a second view appears that allows for visualizing the contract as a PDF.
-	**A required addition: creating a signable contract**. It was agrred that the PDF should arrive from the server as a url (now the front recieves thedata and creats a blob), be presented in an iframe, with a canvas signature pad below to allow for signing it.  We prepared the canvas separately outside the project as a test in CodeSandBox: [https://codesandbox.io/s/react-canvas-for-signature-michal-gvpuv]
-	Still in this screen, the salesperson can choose a company's member to send the form to for signing. Once "Send Link" button is clicked, An email with a link to the contract is being sent (should transfer the recipient to the signable contract mention in the previous comment).
-	- A single company's side view also allows the salesperson to view contracts, if they already exist. A table appears when clicking "Contracts and Invoices".At the table, for each contract, one can click the three dots button and then to choose "edit" or "delete" for each company. **Missing actions: Download contract, download invoices**
-	 **Small parts missing: separate editnig for members and categories in a small modal** (screens 8,9 in xd   [https://xd.adobe.com/view/8c2e7e49-86e6-4641-a9af-581f9e92b9fe-d97d/screen/2c2e09b1-805e-495d-92aa-a287ba5290a7/specs/] - not sure how they fit in the flow].
-	Using the topbar, the salesperson can navigate to a table presenting all he contracts, and to another page presenting all the invoice.**Paginating on Scroll should be added to both tables**
-	 **Missing page** - user settings page for salesmen (design is not fully ready yet we think).
-	**Miising section**: user monitoring (there is an icon for each member in the single company side view, but for now it leads to nothing) no design yet


## 4. Admin flow:

### Description:

- First page is showing the list of companies that have contract / sign to makor X research portal.
  Each click will show company summery and allows to edit ; contract, company name, delete
- Press on “contracts & invoices will show the company contract and contracts invoices if there is any. At this page/modal also can filter by status(signed/not signed)
- Sales page – showing all salesman and their info. Can be edit and delete.
- Authors Page – showing all authors info and summarized their work. Can be edit and delete.

  ### Todos:

1. All Search field need to change to onKeyDown event search && when press on the “magnifier” icon
2. At Authors page need to do the Search author by name
3. Logs to all needs to be done
4. Enigma X at TopBar – needs to refer to CTO for more information
5. Admin supposed to decide which publication/Categories will be presented at the upcoming makor-x publication widget – Need to build the screen + integration with enigma-x team.

## 5. Members – client & prospect

### Description:

- The first page shows all the latest publication. Click on the publication thumbnail will redirect to the publication itself (FullPublication comp).
- In FullPublication you can see the content, comments, share section
- At the bottom of the article you can see 3 publications from the same category
- User of type “prospect” cant comment
- ‘/setting’ route : you can see all user settings, for now only notification settings is shown. Allows the user to chose if to receive notification and which of them to receive

  ### Todos:

1. At “AllNotificiation” comp should change to pagination on Scroll / infinite scroll
2. 2.1 At “AccountSettings” comp, both “Edit” and “ContractAndTrails” comps need to be built
   2.2 The “Settings” comp should be Reusable due to the fact that both Authors, Admins And sales users supposed to have settings (didn’t programed due to requirements and lack of design)
   2.3 Logout button functionality
3. ‘PublicationGrid’ comp:
   A. in each one of the publications thumbnails necessary to add the publication categories and the #tags badges.
   Each Click on #Tag badge will Show all the publication where this #tag name is appear.
   B. As written above – needs to program as well at “FullPublication” comp

4. Footer – all footer links and data should refer to CTO to get the actual content
5. Share to social media – Should be test at production/deployment on live. Presume it will be necessary to Create a “Guests” route to allow NOT Register users to see the publication was shared.

## 6. General Comments

Todos:

1. The “Settings” comp should be Reusable due to the fact that both Authors, Admins And sales users supposed to have settings (didn’t programed due to requirements and lack of design)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get Started

### 1.`npm install`

to install all project neccessary packages

### 2.`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
