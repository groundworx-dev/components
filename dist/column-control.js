import { __ } from '@wordpress/i18n';
import { __experimentalNumberControl as NumberControl, RangeControl, BaseControl, Flex, FlexItem, __experimentalSpacer as Spacer } from '@wordpress/components';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ColumnControl({
  label = __('Columns'),
  onChange,
  value,
  min = 1,
  max = 16,
  help = ''
}) {
  return /*#__PURE__*/_jsx("fieldset", {
    className: "block-editor-width-control",
    children: /*#__PURE__*/_jsx(BaseControl, {
      as: "legend",
      label: label,
      help: help,
      children: /*#__PURE__*/_jsxs(Flex, {
        children: [/*#__PURE__*/_jsx(FlexItem, {
          isBlock: true,
          children: /*#__PURE__*/_jsx(NumberControl, {
            label: label,
            value: value,
            min: min,
            max: max,
            onChange: onChange,
            size: "__unstable-large",
            hideLabelFromVision: true
          })
        }), /*#__PURE__*/_jsx(FlexItem, {
          isBlock: true,
          children: /*#__PURE__*/_jsx(Spacer, {
            marginX: 2,
            marginBottom: 0,
            children: /*#__PURE__*/_jsx(RangeControl, {
              label: label,
              value: value,
              min: min,
              max: max,
              onChange: onChange,
              __next40pxDefaultSize: true,
              withInputField: false,
              hideLabelFromVision: true
            })
          })
        })]
      })
    })
  });
}