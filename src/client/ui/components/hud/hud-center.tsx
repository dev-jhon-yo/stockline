import React, { useEffect, useRef } from "@rbxts/react";
import { TweenService } from "@rbxts/services";

import { useRem } from "client/ui/hooks";

import type { HudLayoutInfo } from "./hud-root";
import { hudTheme } from "./hud-theme";

interface CenterHudProps {
	layout: HudLayoutInfo;
}

export function CenterHud({ layout }: Readonly<CenterHudProps>): React.Element {
	const rem = useRem();
	const pulseRef = useRef<Frame>();

	useEffect(() => {
		const pulse = pulseRef.current;
		if (!pulse) {
			return;
		}

		const tween = TweenService.Create(
			pulse,
			new TweenInfo(1.5, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true),
			{ BackgroundTransparency: 0.72 },
		);
		tween.Play();
		return () => {
			tween.Cancel();
		};
	}, []);

	const size = rem(layout.isPhone ? 44 : 64, "pixel");
	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			Size={new UDim2(0, size, 0, size)}
			ZIndex={hudTheme.layers.center}
		>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(66, 180, 244)}
				BorderSizePixel={0}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(0, rem(6, "pixel"), 0, rem(6, "pixel"))}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
			</frame>
			<frame
				BackgroundColor3={Color3.fromRGB(66, 180, 244)}
				BackgroundTransparency={0.35}
				BorderSizePixel={0}
				Position={new UDim2(0, 0, 0.5, -rem(1, "pixel"))}
				Size={new UDim2(1, 0, 0, rem(2, "pixel"))}
			/>
			<frame
				BackgroundColor3={Color3.fromRGB(66, 180, 244)}
				BackgroundTransparency={0.35}
				BorderSizePixel={0}
				Position={new UDim2(0.5, -rem(1, "pixel"), 0, 0)}
				Size={new UDim2(0, rem(2, "pixel"), 1, 0)}
			/>
			<frame
				ref={pulseRef}
				BackgroundColor3={Color3.fromRGB(66, 180, 244)}
				BackgroundTransparency={0.84}
				BorderSizePixel={0}
				Size={new UDim2(1, 0, 1, 0)}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
				<uistroke
					Color={Color3.fromRGB(66, 180, 244)}
					Thickness={rem(2, "pixel")}
					Transparency={0.5}
				/>
			</frame>
		</frame>
	);
}
