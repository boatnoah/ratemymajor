_RateMyMajor_

Submitted by: **Noah Kim**

This web app: **RateMyMajor is your ultimate resource for exploring academic programs, reading student reviews, and finding the perfect fit for your future.**

Time spent: **20** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **A create form that allows the user to create posts**
- [x] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [x] **A home feed displaying previously created posts**
- [x] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [x] **Clicking on a post shall direct the user to a new page for the selected post**
- [x] **Users can sort posts by either their created time or upvotes count**
- [x] **Users can search for posts by title**
- [x] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [x] **Users can leave comments underneath a post on the post's separate page**
- [x] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [x] **A previously created post can be edited or deleted from its post page**

The following **optional** features are implemented:

- [x] Users can only edit and deleted posts or delete comments by entering the secret key, which is set by the user during post creation
- [x] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [x] Users can customize the interface of the web app
- [x] Display a loading animation whenever data is being fetched

The following **additional** features are implemented:

- [x] User authentication via supabase Oauth and google sign in
- [x] Users can log in and log out limiting or granting them access to the website
- [x] Likes and dislikes for each commenter.
- [x] Each user's post is associated with their gmail
- [x] Fuzzy searching for all universities in the United States
- [x] Light and dark theme

## Video Walkthrough


## Searching

### Searching for Content

![searching](https://github.com/boatnoah/ratemymajor/assets/112355104/1dbc4eb6-5f58-4c97-8865-92b19883b532)

Search for content by keywords or categories.

## User Authentication

### User Login

![user-login](https://github.com/boatnoah/ratemymajor/assets/112355104/c5195f86-08ae-472a-a412-34dfdd62cf46)

Log in to the application with your credentials.

### Logging Out

![loggedoutPOV](https://github.com/boatnoah/ratemymajor/assets/112355104/7acac6e5-2d59-43eb-ac93-eedb3ef4d432)

Log out of the application securely.

## Post Management

### Creating a Post

![createpost](https://github.com/boatnoah/ratemymajor/assets/112355104/ed43c595-b64c-44e9-85b0-88efa08a9e1a)


Create and publish new reviews for your major.

### Editing a Post

![editpost](https://github.com/boatnoah/ratemymajor/assets/112355104/09c711e2-a241-4b55-8b6f-5bfc04a6966e)


Update and modify existing reviews of yours.

### Deleting a Post

![deletepost](https://github.com/boatnoah/ratemymajor/assets/112355104/6f41a8be-a747-426b-b340-34f8627d6a59)

Remove unwanted reviews of yours.

## Viewing Content

### Viewing Content

![viewing](https://github.com/boatnoah/ratemymajor/assets/112355104/2e56c9a7-20f7-45e5-a347-465c4b434a53)

View and read published reviews.


GIF created with LICEcap...

Check out the website live: [ratemymajor.com](https://main--ratemymajor.netlify.app/)

## Notes

Challenges encountered while building the app:

One major challenge I encountered while building this app was implementing an efficient search functionality

for the universities. With thousands of universities in the database, ensuring good performance

for the search bar was crucial. With thousands of universities in the database, ensuring good performance for the search bar was crucial.

To tackle this, I utilized the Fuse.js library, which is designed for fuzzy searching and fast performance.

This was necessary to prevent the application from becoming sluggish or unresponsive when dealing with a large volume of data.

Another area that took some time and effort was setting up user authentication. Reading through the documentation and understanding the

intricacies of secure authentication workflows. While there are pre-built solutions available, I decided to roll my own authentication system to have more control and customization.

On the front-end side, I utilized the Shadcn to help with the styling and overall look and feel of the website.

While this library accelerated the component development process, there was still a learning curve in understanding its design system, customization options,

and making it work seamlessly with my application's specific requirements. Finding the right balance between leveraging the

library's capabilities while maintaining my desired visual aesthetic was a challenge I had to navigate.

## License

    Copyright 2024 Noah Kim
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
