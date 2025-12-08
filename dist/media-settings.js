import { __ } from '@wordpress/i18n';
import { BlockControls, MediaReplaceFlow, MediaUpload, InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import { Button, FocalPointPicker, ToggleControl, SelectControl, __experimentalVStack as VStack, __experimentalHStack as HStack, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem } from "@wordpress/components";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const MediaSettings = ({
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
  clientId,
  onToggleFeaturedImage,
  useFeaturedImage,
  featuredImageURL,
  imageSizeOptions,
  sizeSlug,
  onSizeChange
}) => {
  const isVideo = mediaAttributes?.media?.mime_type === 'video';
  const hasMedia = !!mediaAttributes?.media?.url;
  const hasContent = hasMedia || useFeaturedImage;
  const displayURL = useFeaturedImage ? featuredImageURL : mediaAttributes?.media?.url;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(ToolsPanel, {
        label: label,
        panelId: clientId,
        children: /*#__PURE__*/_jsx(ToolsPanelItem, {
          label: __(`${label} Settings`),
          isShownByDefault: isShownByDefault,
          hasValue: () => hasContent,
          onDeselect: () => {
            if (useFeaturedImage && onToggleFeaturedImage) {
              onToggleFeaturedImage();
            } else {
              clearMedia();
            }
          },
          resetAllFilter: () => {
            if (useFeaturedImage && onToggleFeaturedImage) {
              onToggleFeaturedImage();
            } else {
              clearMedia();
            }
          },
          panelId: clientId,
          children: hasContent ? /*#__PURE__*/_jsxs(VStack, {
            spacing: 4,
            children: [!isVideo && /*#__PURE__*/_jsx(ToggleControl, {
              label: __('Fixed background'),
              checked: mediaAttributes?.hasParallax,
              onChange: () => toggleParallax(mediaAttributes?.hasParallax)
            }), !isVideo && /*#__PURE__*/_jsx(ToggleControl, {
              label: __('Repeated background'),
              checked: mediaAttributes?.isRepeated,
              onChange: () => toggleRepeat(mediaAttributes?.isRepeated)
            }), displayURL && !mediaAttributes?.hasParallax && !mediaAttributes?.isRepeated && /*#__PURE__*/_jsx(FocalPointPicker, {
              label: __('Focal point'),
              autoPlay: false,
              url: displayURL,
              value: mediaAttributes?.focalPoint,
              onChange: handleFocalPointChange,
              __nextHasNoMarginBottom: true
            }), !isVideo && !!imageSizeOptions?.length && /*#__PURE__*/_jsx(SelectControl, {
              __nextHasNoMarginBottom: true,
              label: __('Resolution'),
              value: sizeSlug || 'full',
              options: imageSizeOptions,
              onChange: onSizeChange,
              help: __('Select the size of the source image.')
            }), !useFeaturedImage && /*#__PURE__*/_jsxs(HStack, {
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
              onToggleFeaturedImage: onToggleFeaturedImage,
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
        mediaId: useFeaturedImage ? undefined : mediaAttributes?.media?.id,
        mediaURL: useFeaturedImage ? featuredImageURL : mediaAttributes?.media?.url,
        allowedTypes: allowedTypes,
        accept: accept,
        onSelect: handleMediaSelect,
        onError: onError,
        onToggleFeaturedImage: onToggleFeaturedImage,
        useFeaturedImage: useFeaturedImage,
        onReset: useFeaturedImage ? onToggleFeaturedImage : hasMedia ? clearMedia : undefined,
        onRemove: useFeaturedImage ? undefined : clearMedia,
        name: useFeaturedImage ? label : hasMedia ? __(`Replace ${label}`) : __(`Add ${label}`)
      })
    })]
  });
};
export default MediaSettings;