// import { TelegramClient } from 'telegram';
// import { StringSession } from 'telegram/sessions';
// // @ts-ignore
// import input from 'input';

const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');
const { NewMessage, NewMessageEvent } = require('telegram/events/index.js');

const apiId = 9840636;
const apiHash = 'a553351096c7e6541f4261c17f80742f';
const token =
  '1BQANOTEuMTA4LjU2LjE5NgG7TKFmvkioAaFL88Vr+vk0328ibm1foO4qXqkgvAbGVGM860u6ePE3quwtlgbtMCnc4m/4ELMIOORPjABbBQB8+QBjQa65tRgErazFG8AFHF92zfAeKw6DzqDK/XN/jhyXt5rTkRvxPqmbINZs6Px6LV2eNZ7T7ivZDQdbISmYuDPLEaluy0hlLJLZwQrP+SqpaVUG8tPtqM02BIEeOVwbjIy7wVynvYPm89ILDA58MP9LqgOLgaYTlTFx9eqoKKyrkI0amThgixh/+lGCAM0n+E2ViiQy13V2mwdlPB7DqAtOcPMBySU4NQmFvjuoanoqbYzeTZHOKE/Z8jCz6Ljpgw==';
const stringSession = new StringSession(token); // fill this later with the value from session.save()

(async () => {
  console.log('Loading interactive example...');
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () => await input.text('Please enter the code you received: '),
    onError: (err) => console.log(err),
  });
  console.log('You should now be connected.');
  console.log(StringSession.decode(token));
  // console.log(client.session.save()); // Save this string to avoid logging in again
  // await client.sendMessage('me', { message: 'Hello!' });

  async function eventPrint(event) {
    const message = event.message;
    const peerId = event.message.peerId;
    console.log('MESSAGE =>', message);
    console.log('PEER ID =>', peerId);
    console.log('-------------------------');
    await client.sendMessage('me', { message: peerId });
    if (peerId.className == 'PeerChannel' && peerId.channelId == 11111111) {
      // Change it
      await client.forwardMessages('-xxxxxxxx', { messages: message }); // change it
    }
  }

  // adds an event handler for new messages
  client.addEventHandler(eventPrint, new NewMessage({}));
})();
