import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux'
import { values, get, map, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TreeNode from '../TreeNode';
import useScroll from '../../lib/useScroll';
import {
  CircularProgress, Fade, Drawer, Grid, ArrowForward, ArrowBack,
  IconButton,
  ArrowDownwardIcon
} from '../../materialLib';
import CustomDrawer from '../CustomDrawer';

const Tree = props => {
  const { selectedProfile,
    nodes,
    setNodes,
    onToggle,
    onNodeSelect,
    treeLoading,
    isMenu,
    open,
    handleDrawerOpen,
    handleClick,
    handleCloseMenu,
    onDragStart,
    handleDrawerClose,
    fetchRelations,
    relations,
    handleClickOpenEdge,
    relationTableHeaders,
    setSelectedCurrentItem
  } = props;

  const [drawerWidth, setDrawerWidth] = useState(0)

  const useStyles2 = makeStyles(theme => ({
    root: {
      height: 216,
      flexGrow: 1,
      maxWidth: 400,
    },
    margin: {
      margin: theme.spacing(1),
    },
    paper: {
      // position: 'relative',
    },
    progress: {
      margin: `50px auto`,
      textAlign: 'center',
      display: 'block',
    },
    slider: {
      lineHeight: "100%",
      width: 1,
      border: "0px solid #e6e3e3",
      cursor: "col-resize",
      userSelect: "none",
      textAlign: "center",
    },
    //
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      position: 'fixed',
      top: 168,
      borderTop: "1px solid #e6e3e3",
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
  }));

  const classes = useStyles2();
  const theme = useTheme();
  const drawerRef = useRef(0)

  const [isLoading, setIsLoading] = useState(false);
  useScroll(isLoading);

  let onMouseMove = e => {
    let currentRef = drawerRef.current;
    let dragX = e.clientX;
    currentRef.style.width = currentRef.offsetWidth + e.clientX - dragX + "px";
    dragX = e.clientX;
  };
  const drag = (e) => {
    e.persist();
    let currentRef = drawerRef.current;
    let dragX = e.clientX;
    document.onmousemove = onMouseMove = e => {
      currentRef.style.width =
        currentRef.offsetWidth + e.clientX - dragX + "px";
      dragX = e.clientX;
    };
    // remove mouse-move listener on mouse-up
    document.onmouseup = () =>
      (document.onmousemove = document.onmouseup = null);
  };

  const getRootNodes = () => values(nodes).filter(node => node.isRoot === true);

  const getChildNodes = node => {
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  };

  const handleDrawOpen = (e, node) => {
    handleDrawerOpen()
    setDrawerWidth(500);
    fetchRelations(node)
  }

  const handleDrawClose = () => {
    handleDrawerClose()
    setDrawerWidth(0);
  };

  const rootNodes = getRootNodes();
  return (
    <div className={classes.paper}>
      <Grid item xs="auto" sm="auto" style={{ flex: 1, paddingLeft: 0 }}>
        {rootNodes.length && !isLoading ? (
          rootNodes.map((node, i) => (
            <><TreeNode
              node={node}
              getChildNodes={getChildNodes}
              onToggle={onToggle}
              onDragStart={onDragStart}
              onNodeSelect={onNodeSelect}
              isLoading={isLoading}
              key={node.id}
              selectedProfile={selectedProfile}
              treeLoading={treeLoading}
              isMenu={isMenu}
              handleDrawerOpen={handleDrawOpen}
              handleClick={handleClick}
              handleCloseMenu={handleCloseMenu}
              setSelectedCurrentItem={setSelectedCurrentItem}
            /></>
          ))
        ) : (
            <>
              <Fade
                in={isLoading}
                style={{
                  transitionDelay: isLoading ? '800ms' : '0ms',
                }}
                unmountOnExit
              >
                <CircularProgress />
              </Fade>
              <p>No repository is selected</p>
            </>
          )}

      </Grid>
    </div>
  );
};

Tree.propTypes = {
  onSelect: PropTypes.func,
  isMenu: PropTypes.bool,
  handleDrawerOpen: PropTypes.func,
};

Tree.defaultProps = {
  onSelect: () => { },
  isMenu: false,
  handleDrawerOpen: () => { }
};

export default Tree;
