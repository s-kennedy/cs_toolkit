import React from "react";

import { connect } from "react-redux";
import { map } from "lodash";

import SectionContainer from "../containers/SectionContainer";

const generateContentComponents = (contentJson = [], pageId) => {
  return map(contentJson, (obj, index) => {
    if (!obj) {
      return console.log("Obj is undefined (PageContentContainer)");
    }
    switch (obj.type) {
      case "section":
        return (
          <SectionContainer
            key={index}
            index={index}
            content={obj.content}
            sectionType="section"
            pageId={pageId}
          />
        );
      case "call_to_action":
        return (
          <SectionContainer
            key={index}
            index={index}
            content={obj.content}
            sectionType="cta"
          />
        );
      case "reference":
        return (
          <SectionContainer
            key={index}
            index={index}
            content={obj.content}
            sectionType="section"
          />
        );
      case "page_navigation":
        return (
          <SectionContainer
            key={index}
            index={index}
            content={obj.content}
            sectionType="pageNav"
          />
        );
      default:
        console.log("No section container defined for " + obj.type);
        return null;
    }
  });
};

const PageContentContainer = props => {
  return (
    <div style={{ position: "relative" }}>
      {generateContentComponents(props.content, props.pageId)}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    content: state.content.body
  };
};

export default connect(mapStateToProps, null)(PageContentContainer);
