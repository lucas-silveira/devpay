db.auth('admin', 'secure');

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
