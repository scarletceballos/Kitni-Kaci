# Web Development Project 4 - *Kitni Kaci*

Submitted by: **Scarlet Ceballos**

This web app: This cat discovery app that fetches random cat breeds from the Cat API and lets users explore and filter by breed, origin, and temperament. Users can ban specific attributes to customize their discoveries, build up a favorites list, and see potential vibe matches for compatibility.

Time spent: **7** hours spent in total

## Required Features

The following **required** functionality is completed: 

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The type of attribute displayed for each image should be consistent across API calls (i.e. if you are using a cat API, and display the color, breed, and age in response to an initial API call, subsequent button clicks should also result in the color, breed, and age being displayed)
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single result of an API call is displayed at a time 
  - Displayed attributes should match the displayed image (i.e., if showing a picture of a Siamese cat and the attribute breed, the displayed breed should be 'Siamese' not 'Ragdoll' or another breed that doesn't match)
  - There is at least one image per API call
- [x] **API call response results should appear random to the user**
  - Clicking on the API call button should generate a seemingly random new result each time
  - Note: Repeat results are permitted but the API used should have a reasonably large amount of data and repeats should not be frequent
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban **list**
  - At least one attribute for each API result should be clickable
  - Clicking on a clickable attribute not on the ban list, should imnmediately add it to the ban list 
  - Clicking on an attribute in the ban list should immediately remove it from the ban list 
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Clicking on the API call button should not result in any image/attributes with attribute values in the ban list being displayed (ex. Using a cat API, if the ban list includes the value 'Siberian' for the breed attribute, clicking on the Discover button should never result in a Siberian cat being displayed)
  - Note: More attribute values on the ban list may result in a higher frequency of repeat results
  -  [x] _To ensure an accurate grade, your recording **must** show that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes_


The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
- [x] Users can see a stored history of their previously displayed  results from this session
  - A dedicated section of the application displays all the previous images/attributes seen before
  - Each time the API call button is clicked, the history updates with the newest API result

The following **additional** features are implemented:

* [x] **Favorites list** — click ☆ Favorite on any cat card to save it to a persistent Favorites section. Favorites can be removed individually with the × button.
* [x] **Vibe Match** — each discovered cat is paired with a randomly generated, cute "compatibility" message to make each result feel more personal and fun.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='veni-vici/gif/catpreview.gif' title='Video Walkthrough' width='850' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with [N-Studio](https://nicke.tech/n-studio) for Windows

## Notes

**Challenges Encountered & Lessons:**

- The Cat API response contains breeds data within arrays. Initially filtering by attributes required careful null-checking and validation to avoid crashes when breed data is missing or incomplete.
- The history feature had a subtle bug where the current cat wasn't being added to history on the first fetch (because `cat` state hadn't updated yet). Required using the setter function's callback pattern to access the previous cat before updating state.
- Managing favorites with localStorage required careful error handling and type validation to ensure graceful fallbacks if storage is unavailable or corrupted.
- Trying to layer multiple blurred elements with `backdrop-filter` and fixed-position animated blobs can impact performance on weaker devices.
- Ensuring the history/favorites grid adapts smoothly across device sizes while maintaining minimum card sizes and proper spacing required careful media queries and flexbox/grid tuning.

## License

    Copyright [2026] [Scarlet Ceballos]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
