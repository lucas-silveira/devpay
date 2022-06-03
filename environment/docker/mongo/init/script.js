// Authenticating
db.auth('admin', 'secure');

// Creating devpay db
db = db.getSiblingDB('devpay');
db.createUser({
  user: 'root',
  pwd: 'secure',
  roles: [
    {
      role: 'readWrite',
      db: 'devpay',
    },
  ],
});

// Creating devpay_test db
db = db.getSiblingDB('devpay_test');
db.createUser({
  user: 'root',
  pwd: 'secure',
  roles: [
    {
      role: 'readWrite',
      db: 'devpay_test',
    },
  ],
});
