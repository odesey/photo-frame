const NCClient = require("nextcloud-node-client").NCClient;
const dotenv = require("dotenv");

dotenv.config();

let client;



const init = async () => {
  // service instance name from VCAP_SERVICES environment - "user-provided" section
  const credentials = NCClient.getCredentialsFromEnv("eCloud");
  try {
      // service instance name from VCAP_SERVICES environment - "user-provided" section
      client = new NCClient(credentials.url, credentials.basicAuth);
      //  do cool stuff with the client
  } catch (e) {
    console.log('------------------------------------');
    console.log('ERROR: ***', e);
    console.log('------------------------------------');
        // some error handling
  }
};

const getFolders = async function() {
  const folder = await client.getFolder("/");

  const subfolders = await folder.getSubFolders()

  // console.log('------------------------------------');
  // console.log('FOLDERS: ***', subfolders.response);
  // console.log('------------------------------------');
  // await folder.delete();

  return subfolders;
}

const getFiles = async function() {
  const folder = await client.getFolder("/Photos");

  const files = await folder.getFiles();

  return files;
}

const getFileUrl = async function(file) {
  const ncfile = await client.getFile(file);
  const url = await ncfile.getUrl();

  return url;
}



module.exports = { init, client, getFolders, getFiles, getFileUrl };
// exports = client;
