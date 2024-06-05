# Ithaca Protocol - Frontend Engineering Assessment

## Project description

This is a simple React application that displays user posts fetched from the JSONPlaceholder API. The app allows filtering posts by a specific user and expands to show all comments when a specific post is clicked. The application is built from scratch without using any component library and employs a functional component-based approach using React Hooks.

## Features

- Post List Component: displays all posts sorted by ID in a card-like structure.
  Each post displays the title, body, and name of the user who made the post.

- Filter Component: allows filtering the posts by a specific user.
  Uses a dropdown to allow selection of user for filtering.

- Comment Component: expands a post to display all comments associated with that post when clicked. Includes a close button to allow the post component to return to its original state.

- Summary Component: displays a summary of the total number of posts and the total number of users. The total number of posts updates based on the filter component.

## Additional Requirements

- Implemented with a functional component-based approach using React Hooks.
- The app includes basic styles for clarity and readability.
- Tested to ensure the app updates correctly when filtering.
- Ensured code quality with clear comments, descriptive variable names, and proper use of React Hooks.

## Getting Started

### Prerequisistes

- Node.js (version 12 or higher)
- pnpm (npm or yarn works too)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/gzkdev/ithaca-protocol-test.git
```

2. Navigate to the project directory:

```bash
cd ithacal-protocol-test
```

3. Install dependencies:

```bash
pnpm install
```

### Running the App

1. Start the development server:

```bash
pnpm dev
```

2. Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/)

## Design decisions and technical choices

- ### State management with `useReducer`:

  No external libraries were used for data fetching which means that there's a number of state to handle. The `useReducer` hook simplifies the handling of the `loading`, the `error` and `data` states while fetching `users` and `posts` data. This was an intuitive decision using the `useState` warrant me to track the different states separately - introducing more complexity

- ### Custom hooks:

  In the absence of libraries like `useQuery` and `useSWR`, custom hooks were used to manage some of the complex states of the App. They following includes hooks were used:

  - - `useQueryUrlResource`: designed to fetch data from a given URL and handle loading and error states. it uses an `AbortController` to prevent memory leaks by canceling ongoing requests when the housing component unmounts or the URL changes.

  - - `useQueryAppData`: designed to fetch posts and users data and manages the state of the filtered data used to render on the UI. It uses `useReducer` bts

  - - `useOnClickOutside`: this is a utility custom hook designed to remove the dropdown once the user tries to click or focus on an element outside the `dropdown`.

  - - `useExpandedView`: designed to track whether a post has been opened to view its comment or not. It helped to isolate the logic from the component code

- ### Components:

  - - `App`: the main component that integrates the `post` list, `filter`, `summary`, and handles data fetching using the `useQueryAppData` hook. The app data (`posts` and `users` lists) are fetched here and distributed to child components

  - - `PostItemExapndedView`: displays a `post` along with its commments. The `useQueryUrlResource` is used to fetch the `comments` data with the provided `number postId` here. The hook handles the `loading` and `error` states too

## Data set

This application used data from the following endppints provided by JSONPlaceholder

- Posts: [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)

- Users: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

- Comments: [https://jsonplaceholder.typicode.com/comments](https://jsonplaceholder.typicode.com/comments)

## Deliverables

- Github Repository: [View](https://github.com/gzkdev/ithaca-protocol-test.git)

- README file on how to run project locally: [you just passed it :)](#getting-started)

- Explanation of design decisons: [View](#design-decisions-and-technical-choices)

## What would I do differently?

- Use a library like `useSwr` or `useQuery` to handle data fetching logic

- Use a ui library like `Radix` or `Shadcn` to implement the `PostItemExpandedView` and `DropDown` components

- Use `framer-motion` library to add some feedback animations where necessary

## Conclusion

This project demonstrates a functional approach to building a React application with hooks, ensuring code quality and performance optimization. The use of custom hooks and useReducer for state management allows for scalable and maintainable code. By following the requirements and best practices, this app provides a clear and responsive user experience for viewing and filtering posts and comments.
