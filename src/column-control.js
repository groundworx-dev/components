import { __ } from '@wordpress/i18n';
import {
	__experimentalNumberControl as NumberControl,
	RangeControl,
	BaseControl,
	Flex,
	FlexItem,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

export default function ColumnControl({
	label = __( 'Columns' ),
	onChange,
	value,
	min = 1,
	max = 16,
	help = '',
}) {

	return (
		<fieldset className="block-editor-width-control">
			<BaseControl as="legend" label={ label } help={help}>
				
				<Flex>
					<FlexItem isBlock>
						<NumberControl
							label={ label }
							value={ value }
							min={min}
							max={max}
							onChange={ onChange }
							size="__unstable-large"
							hideLabelFromVision
						/>
					</FlexItem>
					<FlexItem isBlock>
						<Spacer marginX={2} marginBottom={0}>
							<RangeControl
								label={ label }
								value={ value }
								min={min}
								max={max}
								onChange={ onChange }
								__next40pxDefaultSize
								withInputField={ false }
								hideLabelFromVision
							/>
						</Spacer>
					</FlexItem>
				</Flex>
			</BaseControl>
		</fieldset>
	);
}
