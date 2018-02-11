const path = require('path')
const webpack = require('webpack')

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `pages`) {
    const nodeContent = JSON.parse(node.internal.content);
    const { template, slug, title, category } = nodeContent;

    createNodeField({ node, name: 'template', value: template });
    createNodeField({ node, name: 'slug', value: slug });
    createNodeField({ node, name: 'title', value: title });
    createNodeField({ node, name: 'category', value: category });
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
      `{
          allPages {
            edges {
              node {
                internal {
                  content
                }
                fields {
                  slug
                  template
                  title
                  category
                }
                childPagesContent {
                  internal {
                    content
                  }
                }
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.allPages.edges.forEach(edge => {
          const template = path.resolve(`src/templates/${edge.node.fields.template}`);
          createPage({
            path: edge.node.fields.slug, // required
            component: template,
            layout: 'index',
            context: {
              slug: edge.node.fields.slug,
            }
          })
        })

        return
      })
    )
  })
};

