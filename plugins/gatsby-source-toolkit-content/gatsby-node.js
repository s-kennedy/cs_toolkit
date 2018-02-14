const crypto = require(`crypto`);
const firebase = require(`firebase`)

const config = {
  apiKey: "AIzaSyDV7lnBOhAucGoJZdY_m6IqdMXAs6buyB8",
  authDomain: "stc-toolkit.firebaseapp.com",
  databaseURL: "https://stc-toolkit.firebaseio.com",
  projectId: "stc-toolkit",
  storageBucket: "",
  messagingSenderId: "117348823057"
};

firebase.initializeApp(config);
const db = firebase.database()
const pagesRef = db.ref('pages');

const url = `https://toolkit.sharonkennedy.ca/${resourceType}`;

console.log("Sourcing content from " + url)

axios.get(url)
  .then((response) => {
    const resources = response.data;

    resources.map((resource) => {
      const page = {
        title: resource.title,
        slug: resource.slug,
        template: resource.template,
        page_type: resource.page_type,
        page_header: resource.page_header,
        content: resource.content
      }
      console.log("Saving page: ", page.title)
      pagesRef.push(page)
    })
  })


exports.sourceNodes = ({ boundActionCreators }, { resourceType }) => {
  const { createNode } = boundActionCreators


  return new Promise((resolve, reject) => {
    try {
      pagesRef.once('value', (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const resource = doc.data();
          const parentNodeId = `${resourceType}-${doc.id}`
          const contentNodeId = `${resourceType}-${doc.id}-content`
          const parentNodeContent = {
            id: doc.id,
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
      })
      resolve()

    } catch(error) {
      console.log(error);
      process.exit(1)
      reject()
    }
  })
};


