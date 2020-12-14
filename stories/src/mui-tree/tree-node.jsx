import React from 'react';
import {
  FaCodeBranch,
  FaUsersCog,
  FaTag,
  FaRegDotCircle,
  FaSourcetree,
  FaSearch,
  FaProductHunt,
} from 'react-icons/fa';
//Elements
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { BsCircle } from 'react-icons/bs';
import { GiHumanPyramid } from 'react-icons/gi';
import { AiFillContainer } from 'react-icons/ai';
import { makeStyles } from '@material-ui/core/styles';
import {
  GoRepo,
  GoGitCommit,
  GoIssueOpened,
  GoDiff,
  GoGear
} from 'react-icons/go';
import styled from 'styled-components';
import { last, includes, isEqual, get, isFunction } from 'lodash';
import PropTypes from 'prop-types';
import {
  ChevronRightIcon,
  ExpandMoreIcon,
  Code,
  Description,
  CircularProgress,
} from '../../materialLib';
import { ICON_TYPES, ICON_TYPES_EXCEPTION } from '../../constants';
import { getNodeLabel } from '../../utils/CommonUtils'

const IconWrapper = ({ icon }) => (
  <img src={icon} style={{ width: 20 }} alt={icon} />
);

const useStyles = makeStyles(theme => ({
  progress: {
    marginRight: 5,
    color: 'black',
  },
}));

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
  const classes = useStyles();

  return (
    <React.Fragment>
      <StyledTreeNode
        level={level}
        type={get(node, 'type')}
        onDragStart={(e) => onDragStart(e, node)}
        style={
          isEqual(get(node, 'uniqId'), get(selectedProfile, 'uniqId'))
            ? { background: '#F5F5F5', cursor: 'context-menu' }
            : { cursor: 'context-menu' }
        }
        onContextMenu={(e) => {
          handleClick(e, node)
          setSelectedCurrentItem(e, node)
        }}
      >
        <NodeIcon marginRight={0} onClick={e => onToggle(e, node)}>
          {(includes(
            ICON_TYPES,
            get(node, 'type'),
          ) &&
            !get(node, 'isOpen')) && <ChevronRightIcon />}
          {includes(
            ICON_TYPES_EXCEPTION,
            get(node, 'iconType'),
          ) &&
            !get(node, 'apiUrl') ? <span style={{ display: 'inline-block', width: 24, height: 24 }}></span> : null}
        </NodeIcon>
        <NodeIcon style={{ marginRight: 5 }}>{selectIcon(get(node, 'iconType'))}</NodeIcon>

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
          {get(node, 'type') === 'defaultMode' ? get(node, 'label') : getNodeLabel(node)}
        </span>
      </StyledTreeNode>

      {
        get(node, 'isOpen') &&
        getChildNodes(node).map(childNode => (
          <TreeNode {...props} node={childNode} level={level + 1} key={get(childNode, 'path')} />
        ))
      }


    </React.Fragment >
  );
};

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  getChildNodes: PropTypes.func.isRequired,
  level: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isMenu: PropTypes.bool,
};

TreeNode.defaultProps = {
  level: 0,
  isMenu: false,
};

export default TreeNode;
