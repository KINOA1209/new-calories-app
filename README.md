# Simple Calories App

This is a simple calorie-tracking application designed to demonstrate basic functionalities and good development practices. The application allows users to manage their food entries, track daily calorie intake, and includes an admin role for additional capabilities.

## Project Overview

The Simple Calories App is a web application that allows users to:

- Add, view, and manage food entries.
- Track their daily calorie intake with a warning for exceeding a limit.
- Utilize an autocomplete feature for food names and calorie values using the Nutritionix API.
- Filter food entries by date.

Admins have additional capabilities to:

- View and manage all users' food entries.
- Access a reporting screen with statistics on food entries and average calorie intake.

## Features

### User Features

- **Add Food Entry:** Users can add new food entries with a date/time, food name, and calorie value.
- **View Food Entries:** The first screen displays a list of existing food entries.
- **Calorie Limit Warning:** Users receive a warning when they exceed the daily calorie limit of 2,100 calories. This limit is configurable in the code.
- **Date Filtering:** Users can filter entries by date range.
- **Autocomplete:** Uses Nutritionix API to autocomplete food names and calorie values.

### Admin Features

- **Manage All Entries:** Admins can read, update, create, and delete any food entries.
- **Reporting:** Admins can view:
  - The number of entries added in the last 7 days compared to the preceding week.
  - The average number of calories added per user in the last 7 days.

### Authentication

- **Token-Based Authentication:** Uses predefined user-specific tokens for authentication and authorization.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** MySQL
- **API:** REST APIs
- **Styling:** Basic styling with MaterialUI

## Getting Started

### Prerequisites

- Node.js
- NPM or Yarn


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KINOA1209/new-calories-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd new-calories-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
   ```bash
   bun install
   ```
### Running the Application

1. Start the backend server:
   ```bash
   bun dev
   ```
2. Start the frontend development server:
   ```bash
   bun dev
   ```

3. Access the application at `http://localhost:5173`.

### API Setup

- Ensure you have access to the Nutritionix API and update the API keys in your environment configuration.

### Sample Data

- The application includes sample data for demonstration purposes.

## Configuration

- Modify the calorie limit and user tokens in the configuration file as needed.


## Contributing

- Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

- This project is licensed under the MIT License.

