const { SMTPServer } = require("smtp-server");

const server = new SMTPServer({
  // Configure server options here
  // For example, to enable authentication:
  // authMethods: ['PLAIN', 'LOGIN'],
   onAuth(auth, session, callback) {
     if (auth.username === 'test' && auth.password === 'test') {
       return callback(null, { user: 'test' });
     }
     return callback(new Error('Invalid username or password'));
   },

  // To handle incoming emails:
  onData(stream, session, callback) {
    console.log('New email received!');
    let emailData = '';
    stream.on('data', (chunk) => {
      emailData += chunk.toString();
    });
    stream.on('end', () => {
      console.log('Email content:', emailData);
      callback(); // Signal successful receipt
    });
  },

  // Important: Call callbacks in onMailFrom and onRcptTo
  onMailFrom(address, session, callback) {
    console.log('Mail from:', address.address);
    return callback();
  },
  onRcptTo(address, session, callback) {
    console.log('Recipient:', address.address);
    return callback();
  }
});

server.listen(2525, '0.0.0.0', () => {
  console.log('SMTP Server listening on localhost:25');
});

server.on('error', (err) => {
  console.error('SMTP Server Error:', err);
});