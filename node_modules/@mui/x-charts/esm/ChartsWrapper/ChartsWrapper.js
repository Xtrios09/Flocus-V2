import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system/createStyled';
import { useChartRootRef } from "../hooks/useChartRootRef.js";
import { useStore } from "../internals/store/useStore.js";
import { useSelector } from "../internals/store/useSelector.js";
import { selectorChartPropsSize } from "../internals/plugins/corePlugins/useChartDimensions/index.js";
import { chartsToolbarClasses } from "../Toolbar/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
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
const Root = styled('div', {
  name: 'MuiChartsWrapper',
  slot: 'Root',
  shouldForwardProp: prop => shouldForwardProp(prop) && prop !== 'extendVertically' && prop !== 'width'
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
    [`&:has(.${chartsToolbarClasses.root})`]: {
      // Add a row for toolbar if there is one.
      gridTemplateRows: `auto ${gridTemplateRows}`,
      gridTemplateAreas: `"${gridTemplateColumns.split(' ').map(() => 'toolbar').join(' ')}"
        ${gridTemplateAreas}`
    },
    [`& .${chartsToolbarClasses.root}`]: {
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
  const chartRootRef = useChartRootRef();
  const store = useStore();
  const {
    width: propsWidth,
    height: propsHeight
  } = useSelector(store, selectorChartPropsSize);
  return /*#__PURE__*/_jsx(Root, {
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
  children: PropTypes.node,
  /**
   * If `true`, the chart wrapper set `height: 100%`.
   * @default `false` if the `height` prop is set. And `true` otherwise.
   */
  extendVertically: PropTypes.bool,
  /**
   * If `true`, the legend is not rendered.
   * @default false
   */
  hideLegend: PropTypes.bool,
  /**
   * The direction of the legend.
   * @default 'horizontal'
   */
  legendDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The position of the legend.
   * @default { horizontal: 'center', vertical: 'bottom' }
   */
  legendPosition: PropTypes.shape({
    horizontal: PropTypes.oneOf(['center', 'end', 'start']),
    vertical: PropTypes.oneOf(['bottom', 'middle', 'top'])
  }),
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export { ChartsWrapper };