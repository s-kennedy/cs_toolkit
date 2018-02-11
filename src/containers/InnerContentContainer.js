import React from 'react'
import { map } from 'lodash'

import Header from '../components/display/Header'
import Paragraph from '../components/display/Paragraph'
import Image from '../components/display/Image'
import CustomButton from '../components/display/CustomButton'
import Name from '../components/display/Name'
import Action from '../components/display/Action'

import CallToActionContainer from '../containers/CallToActionContainer'
import SectionContainer from '../containers/SectionContainer'
import ReferenceContainer from '../containers/ReferenceContainer'

const generateContentComponents = (contentJson=[]) => {
  return map(contentJson, (obj, index) => {
    switch (obj.type) {
      case 'section':
        return <SectionContainer key={index} content={obj.content} />
      case 'call_to_action':
        return <SectionContainer key={index} content={obj.content} cta={true} />
      case 'reference':
        return <ReferenceContainer key={index} content={obj.content} />
      case 'header':
        return <Header key={index} text={obj.text} />;
      case 'paragraph':
        return <Paragraph key={index} text={obj.text} />;
      case 'image':
        return <Image key={index} source={obj.source} caption={obj.caption} />
      case 'button':
        return <CustomButton key={index} anchor={obj.anchor} link={obj.link} />
      case 'name':
        return <Name key={index} text={obj.text} />
      case 'action':
        return <Action key={index} anchor={obj.anchor} link={obj.link} />
    }
  })
}


const InnerContentContainer = (props) => {
    return (
      <div className="inner-content">
        { generateContentComponents(props.content) }
      </div>
    );
}

export default InnerContentContainer;