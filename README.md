# My Flask App

This is a simple Flask web application that demonstrates the basic structure and functionality of a Flask project.

## Project Structure

```
my-flask-app
├── app.py               # Main entry point of the Flask application
├── static
│   ├── style.css        # CSS styles for the application
│   └── script.js        # JavaScript code for interactivity
├── templates
│   └── index.html       # Main HTML template
└── README.md            # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd my-flask-app
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. **Install the required packages:**
   ```
   pip install Flask
   ```

## Running the Application

To run the Flask application, execute the following command:

```
python app.py
```

The application will be accessible at `http://127.0.0.1:5000/`.

## Usage

Open your web browser and navigate to the URL above to view the application. You can interact with the web page and see the styles and scripts in action.