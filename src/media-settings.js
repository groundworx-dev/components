import { __ } from '@wordpress/i18n';

import { BlockControls, MediaReplaceFlow, MediaUpload, InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';

import { Button, FocalPointPicker, ToggleControl, SelectControl, __experimentalVStack as VStack, __experimentalHStack as HStack, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem } from "@wordpress/components";

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

    return (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={label}
                    panelId={clientId}
                >
                    <ToolsPanelItem
                        label={__(`${label} Settings`)}
                        isShownByDefault={isShownByDefault}
                        hasValue={() => hasContent}
                        onDeselect={() => {
                            if (useFeaturedImage && onToggleFeaturedImage) {
                                onToggleFeaturedImage();
                            } else {
                                clearMedia();
                            }
                        }}
                        resetAllFilter={() => {
                            if (useFeaturedImage && onToggleFeaturedImage) {
                                onToggleFeaturedImage();
                            } else {
                                clearMedia();
                            }
                        }}
                        panelId={clientId}
                    >

                        {hasContent ? (

                            <VStack spacing={4}>

                                {!isVideo && (
                                    <ToggleControl
                                        label={__('Fixed background')}
                                        checked={mediaAttributes?.hasParallax}
                                        onChange={() => toggleParallax(mediaAttributes?.hasParallax)}
                                    />
                                )}

                                {!isVideo && (
                                    <ToggleControl
                                        label={__('Repeated background')}
                                        checked={mediaAttributes?.isRepeated}
                                        onChange={() => toggleRepeat(mediaAttributes?.isRepeated)}
                                    />
                                )}

                                {displayURL && !mediaAttributes?.hasParallax && !mediaAttributes?.isRepeated && (
                                    <FocalPointPicker
                                        label={__('Focal point')}
                                        autoPlay={false}
                                        url={displayURL}
                                        value={mediaAttributes?.focalPoint}
                                        onChange={handleFocalPointChange}
                                        __nextHasNoMarginBottom
                                    />
                                )}

                                {!isVideo && !!imageSizeOptions?.length && (
                                    <SelectControl
                                        __nextHasNoMarginBottom
                                        label={__('Resolution')}
                                        value={sizeSlug || 'full'}
                                        options={imageSizeOptions}
                                        onChange={onSizeChange}
                                        help={__('Select the size of the source image.')}
                                    />
                                )}

                                {!useFeaturedImage && (
                                    <HStack spacing={4}>

                                        <MediaUpload
                                            onSelect={handleMediaSelect}
                                            allowedTypes={allowedTypes}
                                            render={({ open }) => (
                                                <Button
                                                    variant="secondary"
                                                    onClick={open}
                                                >
                                                    {__( `Replace` )}
                                                </Button>
                                            )}
                                            onError={ onError }
                                        />

                                        <Button
                                            isDestructive
                                            variant="secondary"
                                            onClick={clearMedia}
                                        >
                                            {__( `Remove` )}
                                        </Button>

                                    </HStack>
                                )}
                            </VStack>

                        ) : (
                            <>
                            {displayElement && (
                            <MediaPlaceholder
                                icon="format-image"
                                labels={{
                                    title: `${label}`,
                                    instructions: __('Upload an image or video for the media.', 'groundworx'),
                                }}
                                onSelect={handleMediaSelect}
                                onToggleFeaturedImage={onToggleFeaturedImage}
                                accept={accept}
                                allowedTypes={allowedTypes}
                                multiple={multiple}
                                onError={ onError }
                            />
                            )}
                            </>
                        )}

                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>

            <BlockControls group="other">
                <MediaReplaceFlow
                    mediaId={useFeaturedImage ? undefined : mediaAttributes?.media?.id}
                    mediaURL={useFeaturedImage ? featuredImageURL : mediaAttributes?.media?.url}
                    allowedTypes={allowedTypes}
                    accept={accept}
                    onSelect={handleMediaSelect}
                    onError={ onError }
                    onToggleFeaturedImage={onToggleFeaturedImage}
                    useFeaturedImage={useFeaturedImage}
                    onReset={useFeaturedImage ? onToggleFeaturedImage : (hasMedia ? clearMedia : undefined)}
                    onRemove={useFeaturedImage ? undefined : clearMedia}
                    name={useFeaturedImage ? label : (hasMedia ? __( `Replace ${label}` ) : __( `Add ${label}` ))}
                />
            </BlockControls>

        </>
    );
};

export default MediaSettings;