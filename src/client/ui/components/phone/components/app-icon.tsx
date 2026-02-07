// cspell:disable
import React from "@rbxts/react";

export interface AppConfig {
	readonly color: Color3;
	readonly icon: string;
	readonly id: string;
	readonly name: string;
}

interface AppIconProps {
	readonly config: AppConfig;
	readonly isSelected: boolean;
	readonly onActivated: () => void;
	readonly onMouseEnter: () => void;
}

export function AppIcon({
	config,
	isSelected,
	onActivated,
	onMouseEnter,
}: AppIconProps): React.Element {
	return (
		<imagebutton
			key={config.id}
			BackgroundColor3={config.color}
			BorderSizePixel={0}
			Event={{
				Activated: onActivated,
				MouseEnter: onMouseEnter,
			}}
			Size={new UDim2(1, 0, 1, 0)}
		>
			<uicorner key="Corner" CornerRadius={new UDim(0, 20)} />
			<uiaspectratioconstraint key="AspectRatio" AspectRatio={1} />

			{isSelected && (
				<frame
					key="SelectionStroke"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(1, 10, 1, 10)}
				>
					<uistroke
						key="Stroke"
						ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
						Color={Color3.fromRGB(255, 255, 255)}
						Thickness={3}
					/>
					<uicorner key="Corner" CornerRadius={new UDim(0, 24)} />
				</frame>
			)}

			<imagelabel
				key="Icon"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image={config.icon}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(0.7, 0, 0.7, 0)}
			/>

			<uiscale key="Scale" Scale={isSelected ? 1.1 : 1} />
		</imagebutton>
	);
}
