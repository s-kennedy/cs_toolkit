const crypto = require(`crypto`);
const firebase = require(`firebase`)
const axios = require('axios')

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database()
const pagesRef = db.ref('pages');

// const url = `https://toolkit.sharonkennedy.ca/pages`;

// console.log("Sourcing content from " + url)

// axios.get(url)
//   .then((response) => {
//     const resources = response.data;

//     resources.map((resource) => {
//       const page = {
//         title: resource.title,
//         slug: resource.slug,
//         template: resource.template,
//         page_type: resource.page_type,
//         page_header: resource.page_header,
//         content: resource.content
//       }
//       pagesRef.push(page)
//       console.log("Saving page: ", page.title)
//     })
//   })


exports.sourceNodes = ({ boundActionCreators }, { resourceType }) => {
  const { createNode } = boundActionCreators

  return new Promise((resolve, reject) => {
    try {
      pagesRef.once('value', (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const resource = doc.val();
          const parentNodeId = `${resourceType}-${doc.key}`
          const contentNodeId = `${resourceType}-${doc.key}-content`
          const parentNodeContent = {
            id: doc.key,
            title: resource.title,
            slug: resource.slug,
            template: resource.template,
            category: resource.page_type
          }
          const contentNodeContent = {
            header: resource.page_header,
            body: resource.content
          }

          const parentNode = {
            id: parentNodeId,
            parent: null,
            children: [contentNodeId],
            internal: {
              type: `${resourceType}`,
              contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(parentNodeContent))
                .digest(`hex`),
              mediaType: `application/json`,
              content: JSON.stringify(parentNodeContent)
            }
          };

          const contentNode = {
            id: contentNodeId,
            parent: parentNodeId,
            children: [],
            internal: {
              type: `${resourceType}_content`,
              contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(contentNodeContent))
                .digest(`hex`),
              mediaType: `application/json`,
              content: JSON.stringify(contentNodeContent)
            }
          }
          createNode(parentNode);
          createNode(contentNode);
        })
      resolve()
      })

    } catch(error) {
      console.log(error);
      process.exit(1)
      reject()
    }
  })
};


