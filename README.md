# Project Name
axiom-weather-app

## Branch Workflow
- **`master`**: Contains the initial setup of the project.
- **`development`**: Active development branch where new features are implemented. I tried to replicate usual flows that I've been working with. Master branch is clean and all the features are being made in the development branch and merged into the master branch only after thorough testing and validation, ensuring that the master branch remains stable and production-ready at all times.

## Setup Instructions
* 1. Clone the Repository ~ `git clone https://github.com/sasazikic/axiom-test-project.git`
* 2. Navigate to the root folder with `cd` command
* 3. Switch to development branch with `git checkout development`
* 4. Install Dependencies with `npm install`
* 5. Start development server with `ng serve`


## Project features and explanation
` Dashboard `
- Initial page is also considered as dashboard page, there are routes handlers that will return to dashboard page if url is mismatching. 

- Dashboard table. Initial table configuration is being fetched from weatherAPI. In order to get multiple cities API require bulk request
with cities as query. Initial 10 cities are hardcoded. Initial metrics are also hardcoded but can be changed in form.

- Widget in right top angle is calculating certain metrics based on present data in table. If table changes due to form data will be calculated according to form.

- Clicking on any row in the table (or card if it's layoutOption=card) will triger chart below and user would be scrolled down to chart.

- Initial chart will be started as line but can also be changed in form

`Form`
- Form has 3 steps and all steps are on the same page but each one is disabled till previous one is filled (first one is enabled)

- First step choosing a city. There are 30 cities retrieved from ninjaAPI. User can search for the cities using input field with suggestion feature, and also using a select option below. Cities can't be just typed, user have to choose them from dropdown. Selecting them will store them and display in form of buttons and user can delete/deselect them by clicking on them.

- Second step is metric preference, as simple as that, those metrics will be displayed in table/card once the form is confirmed (can't proceed until at least one checkbox is selected)

- Third step are radio buttons for chart option and layout option. Can't proceed until both radio groups have selected button

- When all 3 steps are valid formGroup will become valid and user will be able to submit

- Clicking on submit button will spawn a popup with all the selected data and once user confirms he will be redirected to dashboard page but with different setup since it will take a setup stored in formService. On confirmation data is being stored in formService.

- Note: Bulk request which I am using from weatherAPI will last for 14 days since that's free period.



