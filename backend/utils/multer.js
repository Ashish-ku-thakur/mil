import multer from 'multer';

// Configure Multer to store files in memory
const storage = multer.memoryStorage();

// Initialize Multer with memory storage
const upload = multer({ storage: storage });
export default upload