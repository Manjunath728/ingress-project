const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const fetch = require('node-fetch');  // ✅ You missed this import!
const { app, dbReady, db } = require('./index');

const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}`;
let server;

test.before(async () => {
  await dbReady;
  server = http.createServer(app);
  await new Promise(resolve => server.listen(port, resolve));
  console.log(`Test server running on ${baseUrl}`);
});

test.after(async () => {
  await new Promise(resolve => server.close(resolve));
  db.end();
  console.log(`Test server stopped`);
});

test('Health check', async () => {
  const response = await fetch(`${baseUrl}/`);
  assert.equal(response.status, 200, 'Expected 200 OK');
});

test('CRUD person', async () => {
  let res = await fetch(`${baseUrl}/api/person`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' })
  });
  assert.equal(res.status, 201, 'Expected 201 Created');
  const data = await res.json();
  const id = data.id;
  assert.ok(id, 'Should have an ID');

  res = await fetch(`${baseUrl}/api/person/${id}`);
  assert.equal(res.status, 200);
  let person = await res.json();
  if (Array.isArray(person)) {
    person = person[0];
  }
  assert.equal(person.name, 'John Doe');
  assert.equal(person.email, 'john@example.com');

  res = await fetch(`${baseUrl}/api/person/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Jane Doe', email: 'jane@example.com' })
  });
  assert.equal(res.status, 200);

  res = await fetch(`${baseUrl}/api/person/${id}`);
  assert.equal(res.status, 200);
  person = await res.json();
  if (Array.isArray(person)) {
    person = person[0];
  }
  assert.equal(person.name, 'Jane Doe');
  assert.equal(person.email, 'jane@example.com');

  res = await fetch(`${baseUrl}/api/person/${id}`, { method: 'DELETE' });
  assert.equal(res.status, 200);
});

test('Get all persons', async () => {
    // First insert a person (optional if you already have data from other tests)
    await fetch(`${baseUrl}/api/person`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'test@example.com' })
    });
  
    const res = await fetch(`${baseUrl}/api/person`);
    assert.equal(res.status, 200, 'Expected 200 OK');
    const people = await res.json();
    assert.ok(Array.isArray(people), 'Expected response to be an array');
    assert.ok(people.length >= 1, 'Expected at least one person in the array');
  });