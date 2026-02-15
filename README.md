# COLORS Lab 

## Description
A website created for Professor Yadavally's Spring 2026 Processes of Object Oriented Software Development (COP 4331). Implementing a LAMP stack, this website allows users to log in to their account (with creditials located in a remote database) and add/search for various colors.


## Technologies Used
* **HTML5**: Core page structure and content. (located in the `/public` directory).
* **CSS3**: Custom styling and responsive layouts (located in the `/public/css` directory).
* **JavaScript**: Interactive functionality and color logic (located in the `/public/js` directory).
* **PHP**: Server-side scripting used to create the API endpoints for user authentication and color management (located in the `/api` directory).
* **mySQL**: Relational database management system used for storing, managing, and querying user credentials and colors.
* **LAMP Stack Droplet**: Virtual private server (VPS) pre-configured with Linux, Apache, MySQL/MariaDB, and PHP to host the website.
* **DigitalOcean**: Allows access to Linux-based virtual machine used for hosting the website (also referred to as Droplets).
* **Namecheap**: Domain registrar used to create the domain [simonechrastek.online](simonechrastek,online "simonechrastek.online")
* **Git**: Version control used to track code changes.

## Repository Management

**Version Control:** Git is used to track development.

**Environment Hygiene:** A .gitignore file is included to prevent environment-specific files (such as macOS .DS_Store or local configuration files) from cluttering the repository. This ensures the codebase remains clean and portable across different operating systems (Mac, Linux, and Windows).

## Remote Database Structure
The project utilizes a MySQL relational database (COP4331) with the following schema:

* **Users**
ID (Int), FirstName (Varchar), LastName (Varchar), Login (Varchar), Password (Varchar)
* **Colors**
	Name (Varchar), UserID (Int)


## High-Level Setup Instructions
1. **Clone the Repository**:
   ```
   git clone https://github.com/simone-c18/COP4331-ColorsLab
   ```
2. **Navigate to directory**:
  ```
   cd public
   ```
3. **Ensure Asset Paths:** Verify that index.html and color.html correctly links to the files within the css/, js/, images/, and /api folders.


## How to Run and Access
**Local Access (Frontend Only):**
For UI/UX evaluation, you can open index.html directly in a browser. *Note: Database features (Login/Search) will not function locally without a configured local PHP/MySQL environment.*

**Remote Access:**
The application is designed to run on a Linux-based VPS. While the droplet is currently inactive, the production environment was configured at http://simonechrastek.online/.

## Project Details
#### Assumptions
The application assumes a modern web browser with JavaScript enabled.

Assumes a standard directory structure where assets are relative to the root public folder.

------------



#### Limitations
**Accessibility**: The application currently lacks a high-contrast mode and full keyboard navigation (TAB indexing), which may limit accessibility for users with visual or motor impairments.

**Single Server Instance:** The application is hosted on a single-node DigitalOcean Droplet with 1GB RAM. It is not configured for high availability or load balancing and may experience downtime during high traffic.

**Security Limitation:** The current implementation uses basic authentication; for a production environment, SSL/TLS (HTTPS) and more robust password hashing would be required.


------------



#### AI Usage Disclosure
**AI Tools Used:** Gemini

**Purpose:** In the development of this project, AI (Gemini 3 Flash) was utilized as a collaborative tool for technical documentation and system troubleshooting. Specifically, AI assisted in structuring and drafting the project's README.md file to ensure all required technical specifications were clearly communicated. Additionally, AI was used to debug configuration issues and command-line errors encountered while setting up the project on a DigitalOcean Droplet. All AI-generated suggestions were reviewed, manually implemented, and verified for accuracy to ensure the final deployment met project standards and followed class integrity policies.

**Compliance:** This usage follows the specific AI policies outlined for this course.
