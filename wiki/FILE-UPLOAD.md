# Remote file uploads

## Web Frontend

- [Input file](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)
  - Attributes
    - Multiple or not
      - Wether the attribute exist or not the result of calling the DOM files will be a FileList
      - The difference is about how many files can be selected by the user at the same time (multiple) or not (single)
    - Accept
- [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList)
  - [File](https://developer.mozilla.org/en-US/docs/Web/API/File)
- Fetch
  -  `referrerPolicy: "unsafe-url"`
### Sending files 

1. Sending a single file with a singular fieldname.
  - Advantages:
    - Simplicity: It's straightforward and easy to implement.
    - Predictability: Backend always expects a single file.
  - Disadvantages:
    - Limited Flexibility: Can't send multiple files without changing the implementation.
2. Sending multiple files with a plural fieldname.
  - Advantages:
    - Flexibility: Can handle multiple files without needing an array notation.
    - Scalability: Can easily scale to accommodate more files.
  - Disadvantages:
    - Complexity: Backend needs to handle the possibility of multiple files even if only one is sent.
3. Sending a single file as an array with a singular fieldname.
  - Advantages:
    - Consistency: Using an array ensures a consistent data structure, whether sending one file or many.
    - Scalability: Can easily scale to accommodate more files without changing the fieldname.
  - Disadvantages:
    -  Overhead: Slightly more complex to handle on the backend as it always expects an array, even for a single file.
4. Sending multiple files as an array with a plural fieldname.
  - Advantages:
    - Clarity: The plural fieldname indicates the possibility of multiple files, and the array structure supports it.
    - Scalability: Can easily scale to accommodate more files.
   - Disadvantages:
    - Redundancy: The use of both plural notation and array might be seen as redundant since either can indicate the possibility of multiple files.

5. Sending files as Base64 encoded strings within a JSON payload.
  - Advantages:
    - Flexibility: Can be embedded within complex JSON structures.
    - Universality: Base64 encoding ensures that the file data is safe for transmission over any text-based protocol.
  - Disadvantages:
    - Size: Base64 encoding increases the size of the file by about 33%.
    - Performance: Encoding and decoding can be CPU-intensive, especially for large files.
6. Using multipart/form-data with mixed content (files and regular form fields with the previous variants).
  - Advantages
    - Versatility: Can send files alongside other form data in a single request.
  - Disadvantages
    - Complexity: Requires proper parsing on the backend to differentiate between files and regular form fields.

### Sending files

### Single Fieldname with Single File

#### Advantages
- **Simplicity**: Easy to implement and understand.
- **Low Overhead**: Minimal metadata required.

#### Disadvantages
- **Limited Scope**: Can only send one file at a time.

---

### Single Fieldname with Multiple Files

#### Advantages
- **Batch Upload**: Allows sending multiple files at once.
  
#### Disadvantages
- **Complexity**: Slightly more complex to handle on the backend.

---

### Single Fieldname as Array with Single File

#### Advantages
- **Flexibility**: Allows for future expansion to multiple files without changing the field name.

#### Disadvantages
- **Overhead**: Slightly more complex to parse on the backend.

---

### Single Fieldname as Array with Multiple Files

#### Advantages
- **Batch Upload**: Allows sending multiple files at once.
- **Flexibility**: Allows for future expansion without changing the field name.

#### Disadvantages
- **Complexity**: More complex to handle on the backend.

---

### Multiple Single Fieldname with Single File

#### Advantages
- **Separation**: Allows sending files under different field names for better organization.

#### Disadvantages
- **Complexity**: Requires more effort to manage multiple field names on the backend.

---

### Multiple Single Fieldname with Multiple Files

#### Advantages
- **Batch Upload**: Allows sending multiple files at once.
- **Separation**: Allows sending files under different field names for better organization.

#### Disadvantages
- **Complexity**: Significantly more complex to handle on the backend.

---

### Multiple Single Fieldname as Array with Single File

#### Advantages
- **Flexibility**: Allows for future expansion to multiple files without changing the field names.
- **Separation**: Allows sending files under different field names for better organization.

#### Disadvantages
- **Complexity**: More complex to handle on the backend.

---

### Multiple Single Fieldname as Array with Multiple Files

#### Advantages
- **Batch Upload**: Allows sending multiple files at once.
- **Flexibility**: Allows for future expansion without changing the field names.
- **Separation**: Allows sending files under different field names for better organization.

#### Disadvantages
- **Complexity**: Significantly more complex to handle on the backend.

---

### Sending Files as Base64 Encoded Strings within a JSON Payload

#### Advantages
- **Uniformity**: Keeps the payload in a single format (JSON).

#### Disadvantages
- **Size**: Increases the file size by approximately 33%.
- **Memory**: Consumes more memory on both frontend and backend.

---

### Using multipart/form-data with Mixed Content

#### Advantages
- **Flexibility**: Can send files along with regular form fields.
  
#### Disadvantages
- **Complexity**: Requires special handling on the backend to parse mixed content.

---

### Sending Files via WebSockets

#### Advantages
- **Real-time**: Allows for real-time data transfer.
- **Efficiency**: Lower overhead compared to HTTP.

#### Disadvantages
- **Complexity**: Requires a WebSocket server and special handling.

---

### Sending Files via Streaming

#### Advantages
- **Efficiency**: Can handle large files without loading them into memory.
  
#### Disadvantages
- **Complexity**: Requires special handling and potentially additional libraries.

## Http Backend

### Upload/Parsing process

### Sending to a storage service process

### Recover from a CDN
