"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsWrapper = ChartsWrapper;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = require("@mui/material/styles");
var _createStyled = require("@mui/system/createStyled");
var _useChartRootRef = require("../hooks/useChartRootRef");
var _useStore = require("../internals/store/useStore");
var _useSelector = require("../internals/store/useSelector");
var _useChartDimensions = require("../internals/plugins/corePlugins/useChartDimensions");
var _Toolbar = require("../Toolbar");
var _jsxRuntime = require("react/jsx-runtime");
const getJustifyItems = position => {
  if (position?.horizontal === 'start') {
    return 'start';
  }
  if (position?.horizontal === 'end') {
    return 'end';
  }
  return 'center';
};
const getAlignItems = position => {
  if (position?.vertical === 'top') {
    return 'flex-start';
  }
  if (position?.vertical === 'bottom') {
    return 'flex-end';
  }
  return 'center';
};
const getGridTemplateAreas = (hideLegend, direction, position) => {
  if (hideLegend) {
    return `"chart"`;
  }
  if (direction === 'vertical') {
    if (position?.horizontal === 'start') {
      return `"legend chart"`;
    }
    return `"chart legend"`;
  }
  if (position?.vertical === 'bottom') {
    return `"chart"
            "legend"`;
  }
  return `"legend"
          "chart"`;
};
const getTemplateColumns = (hideLegend = false, direction = 'horizontal', horizontalPosition = 'end', width = undefined) => {
  const drawingAreaColumn = width ? 'auto' : '1fr';
  if (direction === 'horizontal') {
    return drawingAreaColumn;
  }
  if (hideLegend) {
    return drawingAreaColumn;
  }
  return horizontalPosition === 'start' ? `auto ${drawingAreaColumn}` : `${drawingAreaColumn} auto`;
};
const getTemplateRows = (hideLegend = false, direction = 'horizontal', verticalPosition = 'top') => {
  const drawingAreaRow = '1fr';
  if (direction === 'vertical') {
    return drawingAreaRow;
  }
  if (hideLegend) {
    return drawingAreaRow;
  }
  return verticalPosition === 'bottom' ? `${drawingAreaRow} auto` : `auto ${drawingAreaRow}`;
};
const Root = (0, _styles.styled)('div', {
  name: 'MuiChartsWrapper',
  slot: 'Root',
  shouldForwardProp: prop => (0, _createStyled.shouldForwardProp)(prop) && prop !== 'extendVertically' && prop !== 'width'
})(({
  ownerState,
  width
}) => {
  const gridTemplateColumns = getTemplateColumns(ownerState.hideLegend, ownerState.legendDirection, ownerState.legendPosition?.horizontal, width);
  const gridTemplateRows = getTemplateRows(ownerState.hideLegend, ownerState.legendDirection, ownerState.legendPosition?.vertical);
  const gridTemplateAreas = getGridTemplateAreas(ownerState.hideLegend, ownerState.legendDirection, ownerState.legendPosition);
  return {
    variants: [{
      props: {
        extendVertically: true
      },
      style: {
        height: '100%'
      }
    }],
    flex: 1,
    display: 'grid',
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,
    [`&:has(.${_Toolbar.chartsToolbarClasses.root})`]: {
      // Add a row for toolbar if there is one.
      gridTemplateRows: `auto ${gridTemplateRows}`,
      gridTemplateAreas: `"${gridTemplateColumns.split(' ').map(() => 'toolbar').join(' ')}"
        ${gridTemplateAreas}`
    },
    [`& .${_Toolbar.chartsToolbarClasses.root}`]: {
      gridArea: 'toolbar',
      justifySelf: 'center'
    },
    justifyContent: 'center',
    justifyItems: getJustifyItems(ownerState.legendPosition),
    alignItems: getAlignItems(ownerState.legendPosition)
  };
});

/**
 * Wrapper for the charts components.
 * Its main purpose is to position the HTML legend in the correct place.
 */
function ChartsWrapper(props) {
  const {
    children,
    sx,
    extendVertically
  } = props;
  const chartRootRef = (0, _useChartRootRef.useChartRootRef)();
  const store = (0, _useStore.useStore)();
  const {
    width: propsWidth,
    height: propsHeight
  } = (0, _useSelector.useSelector)(store, _useChartDimensions.selectorChartPropsSize);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Root, {
    ref: chartRootRef,
    ownerState: props,
    sx: sx,
    extendVertically: extendVertically ?? propsHeight === undefined,
    width: propsWidth,
    children: children
  });
}
process.env.NODE_ENV !== "production" ? ChartsWrapper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: _propTypes.default.node,
  /**
   * If `true`, the chart wrapper set `height: 100%`.
   * @default `false` if the `height` prop is set. And `true` otherwise.
   */
  extendVertically: _propTypes.default.bool,
  /**
   * If `true`, the legend is not rendered.
   * @default false
   */
  hideLegend: _propTypes.default.bool,
  /**
   * The direction of the legend.
   * @default 'horizontal'
   */
  legendDirection: _propTypes.default.oneOf(['horizontal', 'vertical']),
  /**
   * The position of the legend.
   * @default { horizontal: 'center', vertical: 'bottom' }
   */
  legendPosition: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOf(['center', 'end', 'start']),
    vertical: _propTypes.default.oneOf(['bottom', 'middle', 'top'])
  }),
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;