const apiUrl = 'http://localhost:3000/api';
const isPDF = (fileName) => fileName.endsWith('.pdf');

// Read file
async function readFile() {
  const fileName = document.getElementById('readFileName').value;
  const response = await fetch(`${apiUrl}/read?fileName=${fileName}`);
  const data = await response.json();
  document.getElementById('readContent').textContent = data.content || data.error;
}




// Write file
async function writeFile() {
  const fileName = document.getElementById('writeFileName').value;
  const content = document.getElementById('writeContent').value;
  
  const status = await fetch(`${apiUrl}/write`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, content })
  });

  const result = await status.json();
  if (status.status === 200) {
    alert(result.message);  
  } else {
    alert(result.error);  
  }
}



// Append file
async function appendFile() {
  const fileName = document.getElementById('appendFileName').value;
  const content = document.getElementById('appendContent').value;
  
  const status = await fetch(`${apiUrl}/append`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, content })
  });

  const result = await status.json();
  if (status.status === 200) {
    alert(result.message);  
  } else {
    alert(result.error);  
  }
}



// Delete file
async function deleteFile() {
  const fileName = document.getElementById('deleteFileName').value;
  
  const status = await fetch(`${apiUrl}/delete?fileName=${fileName}`, { method: 'DELETE' });
  
  const result = await status.json();
  if (status.status === 200) {
    alert(result.message);  
  } else {
    alert(result.error);  
  }
}



// Rename file
async function renameFile() {
  const oldName = document.getElementById('oldFileName').value;
  const newName = document.getElementById('newFileName').value;
  
  const status = await fetch(`${apiUrl}/rename`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oldName, newName })
  });
  const result = await status.json();
  if (status.status === 200) {
    alert(result.message); 
  } else {
    alert(result.error);  
  }
}



// Create directory
async function createDirectory() {
  const dirName = document.getElementById('createDirName').value;
  await fetch(`${apiUrl}/create-dir`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dirName })
  });
}

// Delete directory
async function deleteDirectory() {
  const dirName = document.getElementById('deleteDirName').value;
  await fetch(`${apiUrl}/delete-dir?dirName=${dirName}`, { method: 'DELETE' });
}
