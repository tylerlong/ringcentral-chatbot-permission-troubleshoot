import RingCentral from '@rc-ex/core';
import DebugExtension from '@rc-ex/debug';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
});
const debugExtension = new DebugExtension();

rc.token = {
  access_token: process.env.RINGCENTRAL_ACCESS_TOKEN,
};

(async () => {
  await rc.installExtension(debugExtension);
  await rc.post('/restapi/v1.0/subscription', {
    eventFilters: ['/restapi/v1.0/glip/posts'],
    deliveryMode: {
      transportType: 'PubNub',
    },
  });
})();
