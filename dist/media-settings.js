import { __ } from '@wordpress/i18n';
import { BlockControls, MediaReplaceFlow, MediaUpload, InspectorControls, MediaPlaceholder, __experimentalGetGradientClass as __experimentalUseGradient } from '@wordpress/block-editor';
import { Button, FocalPointPicker, ToggleControl, __experimentalVStack as VStack, __experimentalHStack as HStack, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem } from "@wordpress/components";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export const MediaSettings = ({
  label,
  mediaAttributes,
  setMediaAttributes,
  clearMedia,
  toggleParallax,
  toggleRepeat,
  handleMediaSelect,
  handleFocalPointChange,
  isShownByDefault = false,
  accept,
  allowedTypes,
  onError,
  multiple = false,
  displayElement = true,
  clientId
}) => {
  const isVideo = mediaAttributes?.media?.mime_type === 'video';
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(ToolsPanel, {
        label: label,
        panelId: clientId,
        children: /*#__PURE__*/_jsx(ToolsPanelItem, {
          label: __(`${label} Settings`),
          isShownByDefault: isShownByDefault,
          hasValue: () => !!mediaAttributes?.media?.url,
          onDeselect: clearMedia,
          resetAllFilter: clearMedia,
          panelId: clientId,
          children: !!mediaAttributes?.media?.url ? /*#__PURE__*/_jsxs(VStack, {
            spacing: 4,
            children: [!isVideo && /*#__PURE__*/_jsx(ToggleControl, {
              label: __('Fixed background'),
              checked: mediaAttributes?.hasParallax,
              onChange: () => toggleParallax(mediaAttributes?.hasParallax)
            }), !isVideo && /*#__PURE__*/_jsx(ToggleControl, {
              label: __('Repeated background'),
              checked: mediaAttributes?.isRepeated,
              onChange: () => toggleRepeat(mediaAttributes?.isRepeated)
            }), !mediaAttributes?.hasParallax && !mediaAttributes?.isRepeated && /*#__PURE__*/_jsx(FocalPointPicker, {
              label: __('Focal point'),
              autoPlay: false,
              url: mediaAttributes?.media?.url,
              value: mediaAttributes?.focalPoint,
              onChange: handleFocalPointChange,
              __nextHasNoMarginBottom: true
            }), /*#__PURE__*/_jsxs(HStack, {
              spacing: 4,
              children: [/*#__PURE__*/_jsx(MediaUpload, {
                onSelect: handleMediaSelect,
                allowedTypes: allowedTypes,
                render: ({
                  open
                }) => /*#__PURE__*/_jsx(Button, {
                  variant: "secondary",
                  onClick: open,
                  children: __(`Replace`)
                }),
                onError: onError
              }), /*#__PURE__*/_jsx(Button, {
                isDestructive: true,
                variant: "secondary",
                onClick: clearMedia,
                children: __(`Remove`)
              })]
            })]
          }) : /*#__PURE__*/_jsx(_Fragment, {
            children: displayElement && /*#__PURE__*/_jsx(MediaPlaceholder, {
              icon: "format-image",
              labels: {
                title: `${label}`,
                instructions: __('Upload an image or video for the media.', 'groundworx')
              },
              onSelect: handleMediaSelect,
              accept: accept,
              allowedTypes: allowedTypes,
              multiple: multiple,
              onError: onError
            })
          })
        })
      })
    }), /*#__PURE__*/_jsx(BlockControls, {
      group: "other",
      children: /*#__PURE__*/_jsx(MediaReplaceFlow, {
        mediaId: mediaAttributes?.media?.id,
        mediaURL: mediaAttributes?.media?.url,
        allowedTypes: allowedTypes,
        accept: accept,
        onSelect: handleMediaSelect,
        onError: onError,
        onRemove: () => setMediaAttributes({
          mediaAttributes: {
            ...mediaAttributes,
            media: null
          }
        }),
        name: mediaAttributes?.media?.url ? __(`Replace ${label}`) : __(`Add ${label}`)
      })
    })]
  });
};