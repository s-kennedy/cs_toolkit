const firebaseConfig = require("./config/firebase-config.json")

module.exports = {
  siteMetadata: {
    title: `Save the Children Toolkit website`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Child Sensitivity in Poverty Alleviation Programming",
        short_name: "Child Sensitivity Toolkit",
        start_url: "/",
        background_color: "#01b4aa", //teal
        theme_color: "#e70094", // pink
        display: "minimal-ui",
        icon: "static/icon.png" // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-firebase",
      options: {
        credential: firebaseConfig.serviceAccountKey,
        databaseURL: firebaseConfig.databaseURL,
        types: [
          {
            type: "Pages",
            path: "pages",
            map: node => {
              node.content = JSON.stringify(node.content);
              if (node.navigation.nested) {
                node.navigation.nested = Object.keys(node.navigation.nested).map(key => {
                  return { id: key }
                })
              }

              return node
            },
          },
          {
            type: "Comments",
            path: "comments"
          },
          {
            type: "ToolPages",
            path: "tool_pages"
          },
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    }
  ]
};
