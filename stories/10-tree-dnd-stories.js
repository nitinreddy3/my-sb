// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import TaskApp from './src/tree-view/task-app';

storiesOf('Tree View', module).add('pattern', () => <TaskApp />);
