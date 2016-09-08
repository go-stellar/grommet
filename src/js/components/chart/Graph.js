// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { padding, pointSize, debounceDelay } from './utils';
import CSSClassnames from '../../utils/CSSClassnames';
import Intl from '../../utils/Intl';

const CLASS_ROOT = CSSClassnames.CHART_GRAPH;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Graph extends Component {

  constructor(props, context) {
    super(props, context);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._renderA11YTitle = this._renderA11YTitle.bind(this);
    this.state = { height: props.height || 1, width: props.width || 1 };
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  componentWillUnmount () {
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    // delay should be greater than Chart's delay
    this._resizeTimer = setTimeout(this._layout, debounceDelay + 10);
  }

  _layout () {
    const { height, width } = this.props;
    const graph = this.graphRef;
    const rect = graph.parentNode.getBoundingClientRect();
    this.setState({
      height: height || Math.floor(rect.height),
      width: width || Math.floor(rect.width)
    });
  }

  // Determines what the appropriate control coordinates are on
  // either side of the coordinate at the specified index.
  // This calculation is a simplified smoothing function that
  // just looks at whether the line through this coordinate is
  // ascending, descending or not. Peaks, valleys, and flats are
  // treated the same.
  _controlCoordinates (coordinates, index) {
    let current = coordinates[index];
    // Use previous and next coordinates when available, otherwise use
    // the current coordinate for them.
    let previous = current;
    if (index > 0) {
      previous = coordinates[index - 1];
    }
    let next = current;
    if (index < coordinates.length - 1) {
      next = coordinates[index + 1];
    }

    // Put the control X coordinates midway between the coordinates.
    let deltaX = (current[0] - previous[0]) / 2.4;
    let deltaY;

    // Start with a flat slope. This works for peaks, valleys, and flats.
    let first = [current[0] - deltaX, current[1]];
    let second = [current[0] + deltaX, current[1]];

    if (previous[1] < current[1] && current[1] < next[1]) {
      // Ascending, use the minimum positive slope.
      deltaY = Math.min(((current[1] - previous[1]) / 2),
        ((next[1] - current[1]) / 2));
      first[1] = current[1] - deltaY;
      second[1] = current[1] + deltaY;
    } else if (previous[1] > current[1] && current[1] > next[1]) {
      // Descending, use the minimum negative slope.
      deltaY = Math.min(((previous[1] - current[1]) / 2),
        ((current[1] - next[1]) / 2));
      first[1] = current[1] + deltaY;
      second[1] = current[1] - deltaY;
    }
    return [first, second];
  }

  _renderA11YTitle () {
    const { a11yTitle, max, min, type, values } = this.props;
    const { intl } = this.context;

    if (a11yTitle) {
      return a11yTitle;
    }

    const typeLabel = Intl.getMessage(intl, type);

    let minLabel = `, ${Intl.getMessage(intl, 'Min')}: ${min}`;

    let maxLabel = `, ${Intl.getMessage(intl, 'Max')}: ${max}`;

    const valueLabel = Intl.getMessage(intl, 'GraphValues', {
      count: values.length,
      highest: Math.max(...values).toString(),
      smallest: Math.min(...values).toString()
    });

    return `${typeLabel} ${minLabel} ${maxLabel}. ${valueLabel}`;
  }

  render () {
    const { activeIndex, colorIndex, max, min, reverse, smooth, type,
      values, vertical } = this.props;
    const { height, width } = this.state;
    const pad = Math.min(width, height) < (padding * 8) ? 2 : padding;

    let classes = [CLASS_ROOT, `${CLASS_ROOT}--${type}`];
    if (vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    classes.push(`${COLOR_INDEX}-${colorIndex || 'graph-1'}`);

    let scale, step;
    if (vertical) {
      if (values.length <= 1) {
        scale = 1;
        step = height - (2 * pad);
      } else {
        scale = (width - (2 * pad)) / (max - min);
        step = (height - (2 * pad)) / (values.length - 1);
      }
    } else {
      if (values.length <= 1) {
        scale = 1;
        step = width - (2 * pad);
      } else {
        scale = (height - (2 * pad)) / (max - min);
        step = (width - (2 * pad)) / (values.length - 1);
      }
    }

    // Get all coordinates up front so they are available
    // if we are drawing a smooth chart.
    let points = [];
    const coordinates = values.map((value, index) => {
      let coordinate;
      if (undefined !== value) {
        if (vertical) {
          coordinate = [
            ((value - min) * scale) + pad,
            (reverse ? (index * step) :
              (height - (2 * pad)) - (index * step)) + pad
          ];
        } else {
          coordinate = [
            (reverse ? (width - (2 * pad)) - (index * step) :
              index * step) + pad,
            ((height - (2 * pad)) - ((value - min) * scale)) + pad
          ];
        }

        if ((this.props.points || index === activeIndex) &&
          ! this.props.sparkline) {
          const classes = [`${CLASS_ROOT}__point`,
            `${COLOR_INDEX}-${colorIndex || 'graph-1'}`];
          let radius = pointSize / 3;
          if (index === activeIndex) {
            classes.push(`${CLASS_ROOT}__point--active`);
            radius = pointSize / 2;
          }
          points.push(
            <circle key={index} className={classes.join(' ')}
              cx={coordinate[0]} cy={coordinate[1]} r={radius} />
          );
        }
      }

      return coordinate;
    })
    .filter(coordinate => coordinate);

    let path;
    if (coordinates.length > 1) {
      let pathProps = {};
      let commands;

      // Build the commands for this set of coordinates.

      if ('area' === type || 'line' === type) {

        if (smooth) {
          const controlCoordinates = coordinates.map((coord, index) => (
            this._controlCoordinates(coordinates, index)
          ));
          commands = '';
          coordinates.forEach((coord, index) => {
            if (0 === index) {
              commands += `M${coord.join(',')}`;
            } else {
              // Use the previous right control coordinate and the current
              // left control coordinate. We do this because we calculate
              // the left and right sides for a particular index together,
              // so the path is smooth but the SVG C command needs the
              // right one from the previous index and the left one from
              // the current index.
              commands += ` C${controlCoordinates[index-1][1].join(',')}
                ${controlCoordinates[index][0].join(',')} ${coord.join(',')}`;
            }
          });
        } else {
          commands = `M${coordinates.map(c => c.join(',')).join(' L')}`;
        }

        if ('area' === type) {
          if (vertical) {
            if (reverse) {
              // Close the path by drawing to the left
              // and across to the top of where we started.
              commands +=
                `L${pad},${coordinates[coordinates.length - 1][1]}
                L${pad},${coordinates[0][1]} Z`;
            } else {
              // Close the path by drawing to the left
              // and across to the bottom of where we started.
              commands +=
                `L${pad},${coordinates[coordinates.length - 1][1]}
                L${pad},${height - pad} Z`;
            }
          } else {
            // Close the path by drawing down to the bottom
            // and across to the left of where we started.
            commands +=
              `L${coordinates[coordinates.length - 1][0]},${height - pad}
              L${coordinates[0][0]},${height - pad} Z`;
          }
          pathProps.stroke = 'none';
        } else {
          pathProps.fill = 'none';
        }
      } else if ('bar' === type) {
        commands = coordinates.map(c => (
          `M${c.join(',')}L${vertical ? `${pad},${c[1]}` :
            `${c[0]},${height - pad}`}`
        )).join(' ');
        pathProps.fill = 'none';
      }

      path = <path {...pathProps} d={commands} />;
    }

    return (
      <svg ref={ref => this.graphRef = ref} className={classes.join(' ')}
        viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none"
        role="img" aria-label={this._renderA11YTitle()}>
        <g>
          {path}
        </g>
        {points}
      </svg>
    );
  }

};

Graph.contextTypes = {
  intl: PropTypes.object
};

Graph.defaultProps = {
  min: 0,
  max: 100
};

Graph.propTypes = {
  a11yTitle: PropTypes.string,
  activeIndex: PropTypes.number,
  colorIndex: PropTypes.string,
  height: PropTypes.number, // only from Chart
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  points: PropTypes.bool,
  reverse: PropTypes.bool,
  smooth: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  // type comes from extending the component
  type: PropTypes.oneOf(['area', 'line', 'bar']).isRequired,
  vertical: PropTypes.bool,
  width: PropTypes.number // only from Chart
};
