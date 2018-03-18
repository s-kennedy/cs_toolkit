const path = require("path");

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    resolve(
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

        return;
      })
    );
  });
};

exports.modifyBabelrc = ({ babelrc }) => ({
  ...babelrc,
  plugins: babelrc.plugins.concat(['transform-runtime']),
})
