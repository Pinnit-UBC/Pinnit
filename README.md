<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Pinnit-UBC/Pinnit">
    <img src="./frontend/public/Favicon.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Pinnit</h3>

  <p align="center">
     Pinnit is a platform designed to help students stay informed about various events happening across different clubs and organizations at the University of British Columbia (UBC).
    <br />
    <a href="https://github.com/Pinnit-UBC/Pinnit"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Pinnit-UBC/Pinnit">View Demo</a>
    ·
    <a href="https://github.com/Pinnit-UBC/Pinnit/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Pinnit-UBC/Pinnit/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: -->
<!-- `Pinnit-UBC`, `Pinnit`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_name`, `project_description` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![Express][Express.js]][Express-url]
- [![MongoDB][MongoDB]][MongoDB-url]
- [![Node.js][Node.js]][Node-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Must have Node.js installed on your computer

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo and access the folder
   ```sh
   git clone https://github.com/Pinnit-UBC/Pinnit.git
   cd Pinnit
   ```
2. Install npm packages in the **frontend** directory
   ```sh
   cd frontend
   npm install
   ```
3. Create a .env file

   ```sh
   touch .env
   ```

   and fill in the .env file with the following variables

   ```sh
   REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_KEY_GOOGLE_MAPS_API_KEY
   REACT_APP_DRAWER_MAP_API_KEY=YOUR_DRAWER_MAP_API_KEY
   MONGO_URI=YOUR_MONGO_URI
   ```

4. Install npm packages in the **backend** directory

   ```sh
   cd ../backend
   npm install
   ```

5. Create a .env file

   ```sh
   touch .env
   ```

   and fill in the .env file with the following variables

   ```sh
   GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   MONGO_URI=YOUR_MONGO_URI
   AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
   AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
   S3_BUCKET_NAME=YOUR_S3_BUCKET_NAME
   AWS_REGION=YOUR_AWS_REGION
   CLOUDFRONT_DOMAIN_NAME=YOUR_CLOUDFRONT_DOMAIN_NAME
   ```

6. Start the **backend** server

   ```bash
   npm start
   ```

7. Host the **frontend**
   ```bash
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

TBD

See the [open issues](https://github.com/Pinnit-UBC/Pinnit/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/Pinnit-UBC/Pinnit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Pinnit-UBC/Pinnit" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

TBD

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- []()
- []()
- []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Pinnit-UBC/Pinnit.svg?style=for-the-badge
[contributors-url]: https://github.com/Pinnit-UBC/Pinnit/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Pinnit-UBC/Pinnit.svg?style=for-the-badge
[forks-url]: https://github.com/Pinnit-UBC/Pinnit/network/members
[stars-shield]: https://img.shields.io/github/stars/Pinnit-UBC/Pinnit.svg?style=for-the-badge
[stars-url]: https://github.com/Pinnit-UBC/Pinnit/stargazers
[issues-shield]: https://img.shields.io/github/issues/Pinnit-UBC/Pinnit.svg?style=for-the-badge
[issues-url]: https://github.com/Pinnit-UBC/Pinnit/issues
[license-shield]: https://img.shields.io/github/license/Pinnit-UBC/Pinnit.svg?style=for-the-badge
[license-url]: https://github.com/Pinnit-UBC/Pinnit/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=fff
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Node-url]: https://nodejs.org/en
