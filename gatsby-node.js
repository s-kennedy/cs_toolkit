const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
      graphql(
        `
          {
            allPages {
              edges {
                node {
                  id
                  title
                  slug
                  template
                  page_type
                  navigation {
                    group
                    order
                    displayTitle
                  }
                  page_header {
                    image
                    range_title
                    subtitle
                    title
                  }
                  content
                }
              }
            }
            allToolPages {
              edges {
                node {
                  id
                  title
                  header
                  paragraph
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log("ERROR CREATING PAGES", result.errors);
          reject(result.errors);
        }

        result.data.allPages.edges.forEach(edge => {
          const template = path.resolve(
            `src/templates/${edge.node.template}`
          );
          createPage({
            path: edge.node.slug, // required
            component: template,
            layout: "index",
            context: {
              slug: edge.node.slug
            }
          });
        });

        result.data.allToolPages.edges.forEach(edge => {
          const template = path.resolve(
            `src/templates/interactiveTool.jsx`
          );
          createPage({
            path: `interactive/${edge.node.id}`, // required
            component: template,
            layout: "index",
            context: {
              id: edge.node.id
            }
          });
        });

        resolve();
      })
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-rte/,
            use: loaders.null(),
          },
          {
            test: /surveyjs-editor/,
            use: loaders.null(),
          },
          {
            test: /survey-react/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}