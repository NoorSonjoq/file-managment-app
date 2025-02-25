const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const getFilePath = (fileName) => path.join(__dirname, '..', 'storage', path.basename(fileName));


//PDF
const isPDF = (fileName) => fileName.endsWith('.pdf');


// read
router.get('/read', async (req, res) => {
  const fileName = req.query.fileName;
  if (!isPDF(fileName)) { // check
    return res.status(400).json({ error: 'Invalid file type. Only PDF files are allowed.' });
  }
  try {
    const data = await fs.readFile(getFilePath(fileName), 'utf8');
    res.json({ content: data });
  } catch (err) {
    res.status(404).json({ error: 'File not found' });
  }
});


// write
router.post('/write', async (req, res) => {
  const { fileName, content } = req.body;
  if (!isPDF(fileName)) {
    return res.status(400).json({ error: 'Invalid file type. Only PDF files are allowed.' });
  }
  try {
    await fs.writeFile(getFilePath(req.body.fileName), req.body.content, 'utf8');
    res.json({ message: 'File written successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Append 
router.post('/append', async (req, res) => {
  const { fileName, content } = req.body;

  if (!isPDF(fileName)) {
    return res.status(400).json({ error: 'Invalid file type. Only PDF files are allowed.' });
  }

  try {
    await fs.appendFile(getFilePath(fileName), content, 'utf8');
    res.json({ message: 'Content appended successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

 
// Delete
router.delete('/delete', async (req, res) => {
  const fileName = req.query.fileName;

  if (!isPDF(fileName)) {
    return res.status(400).json({ error: 'Invalid file type. Only PDF files are allowed.' });
  }

  try {
    await fs.unlink(getFilePath(fileName));
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Rename
router.put('/rename', async (req, res) => {
  const { oldName, newName } = req.body;

  if (!isPDF(oldName) || !isPDF(newName)) {
    return res.status(400).json({ error: 'Invalid file type. Only PDF files are allowed.' });
  }

  const oldFilePath = getFilePath(oldName);
  const newFilePath = getFilePath(newName);

  try {
    await fs.access(oldFilePath);
    await fs.rename(oldFilePath, newFilePath);
    res.json({ message: 'File renamed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/create-dir', async (req, res) => {
  const { dirName } = req.body;

  if (!dirName) {
    return res.status(400).json({ error: 'Directory name is required' });
  }

  const dirPath = getFilePath(dirName);

  try {
    await fs.mkdir(dirPath, { recursive: true }); 
    res.json({ message: 'Directory created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete-dir', async (req, res) => {
  const { dirName } = req.query;

  if (!dirName) {
    return res.status(400).json({ error: 'Directory name is required' });
  }

  const dirPath = getFilePath(dirName);

  try {
    await fs.rm(dirPath, { recursive: true, force: true }); 
    res.json({ message: 'Directory deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
