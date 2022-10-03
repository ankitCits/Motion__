import {Linking} from 'react-native';
import qs from 'qs';

export const validateStepsourceAuth = () => {
  return new Promise(async (resolve, reject) => {
    Linking.addEventListener('url', handleUrl);
    async function handleUrl(event) {
      if (event.url !== null) {
        if (event.url.includes('motion://stepsource')) {
          let fitbit_auth = event.url.replace('motion://stepsource#', '');
        }
      }
      Linking.removeEventListener('url', handleUrl);
      const [, query_string] = event.url.match(/\#(.*)/);
      const query = qs.parse(query_string);
      console.log(`query: ${JSON.stringify(query)}`);
      console.log('FITBIT_AUTH_TOKEN>', query.access_token);
      resolve(query.access_token);
    }
    const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
      client_id: '238QLL',
      response_type: 'token',
      scope: 'activity',
      redirect_uri: 'motion://stepsource',
      expires_in: '31536000',
    })}`;
    console.log('Url Auth', oauthurl);
    Linking.openURL(oauthurl).then(res => {
      if (res) {
        Linking.openURL(oauthurl).catch(err => {
          reject(err);
          console.log('Error processing linking', err);
        });
      }
    });
  });
};


