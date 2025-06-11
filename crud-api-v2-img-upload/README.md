> 11 - June - 2025

## CRUD API - Img Uploading

- Basic API Practicing

### 🖼️ Image Handling Rules || Key Points

- ✅ On Student Creation
  - The uploaded image file is saved to the file system.
  - & `profile_pic` stor just file name

- ✅ On Student Deletion
  - If the student has an image file, it is deleted from the file system
  - & `profile_pic` deleted along with the database record.

- ✅ On Student Update
  - If a new image is uploaded:
    - The old image (if it exists) is deleted from the file system.
    - The new image replaces it.
  - If the provided `id` is invalid (student not found):
    - The already uploaded image by middleware, need deleted to avoid unused files.
