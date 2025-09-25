/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { isContentPositionCenter, getPositionClassName, mediaPosition } from '@groundworx/utils';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const MediaComponent = ({
  mediaProps,
  autoPlay = false,
  controls = false,
  muted = true,
  loop = true,
  lazyLoad = false
}) => {
  const {
    media,
    focalPoint,
    hasParallax,
    isRepeated
  } = mediaProps;
  const {
    alt,
    mime_type,
    url
  } = media || {};
  const isImgElement = !(hasParallax || isRepeated);
  const backgroundImage = url ? `url(${url})` : undefined;
  const backgroundPosition = mediaPosition(focalPoint);
  const mediaStyle = {
    objectPosition: focalPoint ? mediaPosition(focalPoint) : undefined
  };
  const videoAttributes = {
    className: 'video-background',
    controls,
    muted,
    autoPlay,
    loop,
    [lazyLoad ? 'data-src' : 'src']: url,
    style: mediaStyle
  };
  const classes = clsx({
    'has-parallax': hasParallax,
    'is-repeated': isRepeated,
    'has-custom-content-position': !isContentPositionCenter(focalPoint)
  }, getPositionClassName(focalPoint));
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [url && mime_type === 'image' && (isImgElement ? /*#__PURE__*/_jsx("img", {
      className: "image-object",
      alt: alt,
      src: url,
      style: mediaStyle
    }) : /*#__PURE__*/_jsx("div", {
      role: alt ? 'img' : undefined,
      "aria-label": alt ? alt : undefined,
      className: clsx(classes, 'image-background'),
      style: {
        backgroundImage,
        backgroundPosition
      }
    })), url && mime_type === 'video' && /*#__PURE__*/_jsx("video", {
      ...videoAttributes
    })]
  });
};
export default MediaComponent;