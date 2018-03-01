module.exports = {
  siteMetadata: {
    title: `Save the Children Toolkit website`,
  },
  pathPrefix: `/stc_toolkit_cms`,
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-firebase",
      options: {
        credential: require("./firebaseServiceAccountKey.json"),
        databaseURL: "https://stc-toolkit.firebaseio.com",
        types: [
          {
            type: "Pages",
            path: "pages",
            map: node => {
              node.content = JSON.stringify(node.content);

              return node
            },
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    }
  ]
};
