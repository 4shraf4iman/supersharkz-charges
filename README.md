# Supersharkz Charge Management Subsystem
Built with React, TypeScript, Vite, and Tailwind CSS.

## How to Run

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:5173` in your browser

## Engineering Decisions

* **Assumptions Made:** I assumed that charge and paid amounts should be handled as precise floats to two decimal places (RM currency standard). I also assumed the admin would prefer a unified modal for both adding and editing charges to keep the main table clean.
* **Trade-offs Chosen:** I chose to hold state in a simple React `useState` custom hook rather than introducing Redux or Zustand. For a single-page CRUD app, local state is sufficient and keeps the architecture simple and maintainable.
* **What I would improve next:** I would add pagination or infinite scrolling to the table, as well as filtering (e.g., filtering by Student ID or Date Range) to handle scale when thousands of records exist.

## UX Reflection

Here are 3 realistic mistakes a non-technical admin might make and how this UI prevents them:
1. **Accidentally entering negative amounts:** The UI uses strict form validation to ensure `charge_amount` must be > 0 and `paid_amount` must be >= 0. 
2. **Entering a paid amount greater than the charge amount:** The `zod` schema actively compares the two fields and prevents form submission if `paid_amount` > `charge_amount`, providing a clear inline error message.
3. **Date formatting errors:** By utilizing a native date picker (`<input type="date">`), the admin selects dates visually, but the system always processes and stores the strict ISO 8601 (YYYY-MM-DD) format under the hood.

## Deletion Handling

To avoid accidental removal, clicking the "Delete" icon does not instantly drop the record. It triggers a distinct Confirmation Modal. The user must explicitly read the destructive warning (which includes the specific Charge ID context) and click a red "Confirm Delete" button. The primary focus remains on a safe "Cancel" action.