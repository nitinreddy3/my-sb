import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Grid from '@material-ui/core/Grid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const MuiTree = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  return (
    <div className={classes.root}>
      <DragDropContext>
        <Grid container spacing={3}>
          <Droppable droppableId="characters">
            {(provided) => (
              <Grid item xs={3}>
                <TreeView
                  className={classes.root}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  expanded={expanded}
                  selected={selected}
                  onNodeToggle={handleToggle}
                  onNodeSelect={handleSelect}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <TreeItem nodeId="1" label="Applications">
                    <TreeItem nodeId="2" label="Calendar" />
                    <TreeItem nodeId="3" label="Chrome" />
                    <TreeItem nodeId="4" label="Webstorm" />
                  </TreeItem>
                  <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="6" label="Material-UI">
                      <TreeItem nodeId="7" label="src">
                        <TreeItem nodeId="8" label="index.js" />
                        <TreeItem nodeId="9" label="tree-view.js" />
                      </TreeItem>
                    </TreeItem>
                  </TreeItem>
                </TreeView>
              </Grid>
            )}
          </Droppable>
          <Droppable droppableId="characters">
            {(provided) => (
              <Grid item xs={3}>
                <TreeView
                  className={classes.root}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  expanded={expanded}
                  selected={selected}
                  onNodeToggle={handleToggle}
                  onNodeSelect={handleSelect}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <TreeItem nodeId="11" label="Applications">
                    <TreeItem nodeId="12" label="Calendar" />
                    <TreeItem nodeId="13" label="Chrome" />
                    <TreeItem nodeId="14" label="Webstorm" />
                  </TreeItem>
                  <TreeItem nodeId="15" label="Documents">
                    <TreeItem nodeId="16" label="Material-UI">
                      <TreeItem nodeId="17" label="src">
                        <TreeItem nodeId="18" label="index.js" />
                        <TreeItem nodeId="19" label="tree-view.js" />
                      </TreeItem>
                    </TreeItem>
                  </TreeItem>
                </TreeView>
              </Grid>
            )}
          </Droppable>
        </Grid>
      </DragDropContext>
    </div>
  );
}

export default MuiTree;