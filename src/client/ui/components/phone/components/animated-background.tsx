import React, { useEffect, useState } from "@rbxts/react";
import { RunService } from "@rbxts/services";

import { Frame } from "../../primitive";

const TILE_SIZE = 90;

interface AnimatedBackgroundProps {
	readonly color: Color3;
	readonly icon: string;
}

export function AnimatedBackground({ color, icon }: AnimatedBackgroundProps): React.Element {
	const [offset, setOffset] = useState(() => new Vector2(0, 0));

	useEffect(() => {
		let currentPosition = 0;

		const connection = RunService.RenderStepped.Connect((dt) => {
			currentPosition += dt * 40;

			const resetPosition = currentPosition % TILE_SIZE;
			setOffset(new Vector2(resetPosition, resetPosition));
		});

		return () => {
			connection.Disconnect();
		};
	}, [icon]);

	return (
		<Frame
			key="FullscreenBackground"
			Native={{
				AnchorPoint: new Vector2(0.5, 0.5),
				BackgroundColor3: color,
				BorderSizePixel: 0,
				ClipsDescendants: true,
				Position: new UDim2(0.5, 0, 0.5, 0),
				Size: new UDim2(1, 2500, 1, 2500),
				ZIndex: -1,
			}}
		>
			<imagelabel
				key="MovingPattern"
				BackgroundTransparency={1}
				Image={icon}
				ImageTransparency={0.9}
				Position={new UDim2(0, -offset.X, 0, -offset.Y)}
				ScaleType={Enum.ScaleType.Tile}
				Size={new UDim2(1, TILE_SIZE * 2, 1, TILE_SIZE * 2)}
				TileSize={new UDim2(0, TILE_SIZE, 0, TILE_SIZE)}
			/>
		</Frame>
	);
}
