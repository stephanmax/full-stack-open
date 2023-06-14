sequenceDiagram
    participant browser
    participant server

    Note right of browser: The submit input triggers the form’s method and action

    browser->>server: POST [Form data, note: "…"] /new_note
    activate server
    Note left of server: The server stores the new note
    server-->>browser: Redirect 302 /notes
    deactivate server

    browser->>server: GET /notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET /main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET /main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET /data.json
    activate server
    server-->>browser: [{ "content": "…", "date": "2023-06-13" }, …]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
