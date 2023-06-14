sequenceDiagram
    participant browser
    participant server

    Note right of browser: Browser executes JavaScript that re-renders the notes<br> and then sends an AJAX request
    
    browser->>server: POST {"content": "…", "date": "2023-06-13"} /new_note_spa
    activate server
    Note left of server: The server stores the new note
    server-->>browser: 201 {"message": "note created" }
    deactivate server
