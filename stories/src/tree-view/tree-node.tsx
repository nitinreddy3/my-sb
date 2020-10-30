import React from 'react';
import styled from '@emotion/styled';
import { get, includes, isEqual, isFunction } from 'lodash';
import { ArrowRight, ArrowDropDown } from '@material-ui/icons'


const getPaddingLeft = (level, type) => ((level * 20));

const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px 5px ${props => getPaddingLeft(props.level, props.type)}px;
  cursor: pointer;
  &:hover {
    background: lightgray;
  }
`;

const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: 0;
  cursor: pointer
`;


const TreeNode = props => {
  const {
    node,
    getChildNodes,
    level,
    onToggle,
    onNodeSelect,
    selectedProfile,
    treeLoading,
    handleDrawerOpen,
    handleClick,
    onDragStart,
    isMenu,
    setSelectedCurrentItem
  } = props;
  return (
    <>
      <StyledTreeNode
        level={level}
        type={get(node, 'type')}
        onDragStart={(e) => onDragStart(e, node)}
        // style={
        //   isEqual(get(node, 'uniqId'), get(selectedProfile, 'uniqId'))
        //     ? { background: '#F5F5F5', cursor: 'context-menu' }
        //     : { cursor: 'context-menu' }
        // }
        onContextMenu={(e) => {
          handleClick(e, node)
          setSelectedCurrentItem(e, node)
        }}
      >
        <NodeIcon marginRight={0} onClick={e => onToggle(e, node)}>
          {
            get(node, 'isOpen') === true) && <ArrowDropDown />}
          {
            !get(node, 'isOpen')) && <ArrowRight />}
        </NodeIcon>
        <span
          role="button"
          onClick={(e) => {
            onNodeSelect(node);
            onToggle(e, node);
            if (isFunction(handleDrawerOpen)) {
              handleDrawerOpen(e, node);
            }
          }}
          onKeyDown={() => {
            onNodeSelect(node);
          }}
          type="submit"
          tabIndex={get(node, 'type')}
          style={{ cursor: 'pointer' }}
        >
          {get(node, 'label')}
        </span>
      </StyledTreeNode>

      {
        get(node, 'isOpen') &&
        getChildNodes(node).map(childNode => (
          <TreeNode {...props} node={childNode} level={level + 1} key={get(childNode, 'path')} />
        ))
      }

    </>
  )
}

export default TreeNode;