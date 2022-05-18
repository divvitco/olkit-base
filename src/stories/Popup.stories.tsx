import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Popup from '../components/Popup/Popup'

export default {
    title: 'Example/Popup',
    component: Popup,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof Popup>
  
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />;