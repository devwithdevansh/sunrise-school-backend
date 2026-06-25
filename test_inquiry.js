const http = require('http');

const data = JSON.stringify({
  studentName: 'Test Student',
  parentName: 'Test Parent',
  phone: '9876543210',
  email: 'test@example.com',
  class: 'KG',
  message: 'This is a test inquiry message'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/inquiries',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log('RESPONSE BODY:', JSON.stringify(JSON.parse(body), null, 2));
  });
});

req.on('error', (e) => {
  console.error('ERROR:', e.message);
  console.error('Make sure the backend is running on port 5000.');
});

req.write(data);
req.end();
