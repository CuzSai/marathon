import { getLore } from './lore.js';
import { getAsciiArt } from './ascii.js';
import { setCurrentUser } from './users.js';

export const commands = {
    help: {
        access: 'standard',
        execute: (args, print, user) => {
          print('Available commands:');
          print('- help   : Display this help message');
          print('- lore   : Uncover hidden legends');
          print('- ascii  : Reveal unexpected art');
          print('- hint   : Get a subtle nudge');
          print('');
          print('Note: Secrets are shrouded in mystery. Sometimes the answer isn’t in the help but hidden in lore or even in plain sight in ASCII.');
          print('Explore each command carefully.');
        },
      },
      hint: {
        access: 'standard',
        execute: (args, print, user) => {
          print('Hint: Some users have special privileges. Try logging in as different users.');
          print('Hint: Certain files can be unlocked if you know their names.');
        },
      },
      list: {
        access: 'standard',
        execute: (args, print, user) => {
          print('Available files:');
          print('- gherritt_white.log');
          print('- alpha_protocol.txt');
          print('Some files may require special access to unlock.');
        },
      },
      
      lore: {
        access: 'standard',
        execute: (args, print, user) => {
          const entry = getLore(user.name);
          print(entry);
        },
      },
      
  sudo: {
    access: 'standard',
    execute: (args, print, user) => {
      if (user.name === 'Durandal') {
        user.hasAccess = true;
        print('Access granted. Elevated privileges enabled.');
      } else {
        print('Access denied. Insufficient privileges.');
      }
    },
  },
  unlock: {
    access: 'restricted',
    execute: (args, print, user) => {
      if (args[0] === 'gherritt_white') {
        print("Decrypting 'gherritt_white.log'...");
        setTimeout(() => {
          print("Decryption complete. Displaying contents:");
          print("Gherritt White's log: [REDACTED]..."); // Replace with actual content
        }, 2000);
      } else {
        print('Unknown unlock target.');
      }
    },
  },
  ascii: {
    access: 'standard',
    execute: (args, print, user) => {
      const art = getAsciiArt();
      print(art);
    },
  },
  login: {
    access: 'standard',
    execute: (args, print, user, promptPassword) => {
      const username = args[0];
      if (!username) {
        print('Usage: login [username] [password]');
        return;
      }
      // If password is provided as second argument, use it.
      if (args.length >= 2) {
        const password = args[1];
        const success = setCurrentUser(username, password);
        if (success) {
          print(`Logged in as ${username}.`);
        } else {
          print('Authentication failed. Incorrect username or password.');
        }
      } else {
        // Otherwise prompt for password.
        promptPassword(`Password for ${username}: `, (password) => {
          const success = setCurrentUser(username, password);
          if (success) {
            print(`Logged in as ${username}.`);
          } else {
            print('Authentication failed. Incorrect username or password.');
          }
        });
      }
    },
  },
  
};
