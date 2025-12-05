import { __ } from '@wordpress/i18n';

import { BlockControls, MediaReplaceFlow, MediaUpload, InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';

import { Button, FocalPointPicker, ToggleControl, __experimentalVStack as VStack, __experimentalHStack as HStack, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem } from "@wordpress/components";

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
    featuredImageURL
}) => {
    
    const isVideo = mediaAttributes?.media?.mime_type === 'video';
    const hasMedia = !!mediaAttributes?.media?.url || useFeaturedImage;
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
                        hasValue={() => hasMedia}
                        onDeselect={clearMedia}
                        resetAllFilter={clearMedia}
                        panelId={clientId}
                    >
                        
                        {hasMedia ? (
                            
                            <VStack spacing={4}>

                                {!isVideo && !useFeaturedImage && (
                                    <ToggleControl
                                        label={__('Fixed background')}
                                        checked={mediaAttributes?.hasParallax}
                                        onChange={() => toggleParallax(mediaAttributes?.hasParallax)}
                                    />
                                )}

                                {!isVideo && !useFeaturedImage && (
                                    <ToggleControl
                                        label={__('Repeated background')}
                                        checked={mediaAttributes?.isRepeated}
                                        onChange={() => toggleRepeat(mediaAttributes?.isRepeated)}
                                    />
                                )}

                                {!mediaAttributes?.hasParallax && !mediaAttributes?.isRepeated && (
                                    <FocalPointPicker
                                        label={__('Focal point')}
                                        autoPlay={false}
                                        url={displayURL}
                                        value={mediaAttributes?.focalPoint}
                                        onChange={handleFocalPointChange}
                                        __nextHasNoMarginBottom
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

                                {useFeaturedImage && onToggleFeaturedImage && (
                                    <Button
                                        variant="secondary"
                                        onClick={onToggleFeaturedImage}
                                    >
                                        {__( `Disable Featured Image` )}
                                    </Button>
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

            {!useFeaturedImage && (
                <BlockControls group="other">
                    <MediaReplaceFlow
                        mediaId={mediaAttributes?.media?.id}
                        mediaURL={mediaAttributes?.media?.url}
                        allowedTypes={allowedTypes}
                        accept={accept}
                        onSelect={handleMediaSelect}
                        onError={ onError }
                        onToggleFeaturedImage={onToggleFeaturedImage}
                        onRemove={() => setMediaAttributes({ mediaAttributes: { ...mediaAttributes, media: null } })}
                        name={mediaAttributes?.media?.url ? __( `Replace ${label}` ) : __( `Add ${label}` )}
                    />
                </BlockControls>
            )}
        
        </>
    );
};

export default MediaSettings;