const crypto = require(`crypto`);
const firebase = require(`firebase`)
const axios = require('axios')
const config = require('../../firebase-config.json')

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
          const navNodeId = `${resourceType}-${doc.key}-navigation`

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
          const navNodeContent = {
            group: resource.navigation.group,
            order: resource.navigation.order,
            slug: resource.slug,
            anchor: resource.navigation.displayTitle || resource.title
          }

          const parentNode = {
            id: parentNodeId,
            parent: null,
            children: [contentNodeId, navNodeId],
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

          const navNode = {
            id: navNodeId,
            parent: parentNodeId,
            children: [],
            internal: {
              type: `${resourceType}_nav`,
              contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(navNodeContent))
                .digest(`hex`),
              mediaType: `application/json`,
              content: JSON.stringify(navNodeContent)
            }
          }
          createNode(parentNode);
          createNode(contentNode);
          createNode(navNode);
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


