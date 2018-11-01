import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { FirstPage, LastPage, ChevronLeft, ChevronRight } from '@material-ui/icons';
import Utils from '../../utils';

const propTypes = {
  currentPage: PropTypes.number,
  count: PropTypes.number.isRequired,
  onBackward: PropTypes.func,
  onForward: PropTypes.func,
  onPageClick: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  currentPage: 1,
  onBackward: () => {},
  onForward: () => {},
  onPageClick: () => {},
};

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  row: {
    display: 'flex',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    listStyleType: 'none',
  },
  page: {
    width: '28px',
    fontSize: '16px',
    padding: '4px 8px',
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    marginLeft: '8px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.text,
    },
    '&:first-child': {
      marginLeft: 0,
    },
  },
  activePage: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.text,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  button: {
    marginRight: '15px',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:nth-child(2n)': {
      marginRight: 0,
    },
  },
});

function Pagination(props) {
  const {
    currentPage, count, onBackward,
    onForward, onPageClick, classes,
  } = props;
  const pages = Utils.getPages(count);

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          onClick={() => onPageClick(1)}
          disabled={currentPage === 1}
        >
          <FirstPage className={classes.icon} />
        </Button>
        <Button
          variant="fab"
          mini
          className={classes.button}
          onClick={onBackward}
          disabled={currentPage === 1}
        >
          <ChevronLeft className={classes.icon} />
        </Button>
      </div>
      <ul className={classes.center}>
        {pages.map((page) => {
          const pageClassName = cn(classes.page, {
            [classes.activePage]: currentPage === page,
          });

          return (
            <button
              key={page}
              className={pageClassName}
              onClick={() => onPageClick(page)}
            >
              {page}
            </button>
          );
        })}
      </ul>
      <div className={classes.row}>
        <Button
          variant="fab"
          mini
          className={classes.button}
          onClick={onForward}
          disabled={currentPage === pages.length}
        >
          <ChevronRight className={classes.icon} />
        </Button>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          onClick={() => onPageClick(pages.length)}
          disabled={currentPage === pages.length}
        >
          <LastPage className={classes.icon} />
        </Button>
      </div>
    </div>
  );
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

const enhance = withStyles(styles);

export default enhance(Pagination);
