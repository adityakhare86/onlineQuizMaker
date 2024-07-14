# QuizCraft

## Introduction

A simple and minimalist quiz building and participating application. After building quiz, a quiz code will be generated for sharing. User can participate in the quiz with this code.

## Technologies Used

### Back-end System

- ExpressJS (NodeJS web framework)
- Mongoose (MongoDB ODM)

### Front-end System

- ReactJS (Front-end Library)
- HTML
- CSS
- Bootstrap

### Other NPM Dependencies

- BCrypt (Password hashing)
- JSON Web Token - JWT (Authentication token)
- Axios (HTTP client)

### Database System

- MongoDB (NoSQL database, Mongoose ODM used for queries)

### UI Elements

- The Logo is an Icon from [IconScout](https://iconscout.com/icon/cube-1957280)
- The Emojis are from Emojipedia, Getemoji etc.
- Everything else is custom made

## Screenshots

### Landing Page

A minimal landing page

![landing](https://github.com/user-attachments/assets/e72bb4d8-1336-48dd-a181-c6c809d6964a)

### Dashboard

List of quizzes created by the user is listed here with sharable codes. User can both build and attend quizzes. Can see statistics of him/herself and for every quizzes curated by him/her.

![dashboard](https://github.com/user-attachments/assets/070f4632-74cc-43f9-842a-74611e9639ad)

### Quiz Builder

User can add questions and for every question, indefinite number of options can be added. One of the option has to be selected as correct answer.

![quiz-builder](https://github.com/user-attachments/assets/d2e055b4-76d3-42a7-a487-971b778310f6)

### Quiz Code

User will see this page after creating a quiz successfully.

![quiz created](https://github.com/user-attachments/assets/d25b722c-f17a-425d-bcda-82b720a1e6a9)

### Find Quiz

User can paste quiz code to find quiz. The quiz title and description will be shown if found.

![find quiz](https://github.com/user-attachments/assets/b826f30c-2ade-4bfa-b912-b9926aa050c2)

### Quiz Taker

User can take the quiz after finding it using the code. Similar to the building interface, but nothing can be edited here. User can only select the options.

![quiz taker](https://github.com/user-attachments/assets/e786968d-2111-4b89-8cc4-1c333e6bcef5)

## Quiz Result

User will see this page after taking a quiz successfully. The attendance count will increase by one. And the perfect score count will be increased by one if they answer all correctly.

![quiz done](https://github.com/user-attachments/assets/5f56a530-504e-46b8-81db-100b1ccd0c6c)

