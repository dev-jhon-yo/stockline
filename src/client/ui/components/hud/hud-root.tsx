import React, { useEffect, useRef } from "@rbxts/react";
import { TweenService } from "@rbxts/services";

import { useRem } from "client/ui/hooks";

import { BottomHud } from "./hud-bottom";
import { CenterHud } from "./hud-center";
import { pulseTweenInfo } from "./hud-data";
import { SideHud } from "./hud-side";
import { hudTheme } from "./hud-theme";
import { TopHud } from "./hud-top";

export function HudRoot(): React.Element {
	const rem = useRem();
	const ctaGlowRef = useRef<UIStroke>();
	const toastGlowRef = useRef<UIStroke>();

	useEffect(() => {
		const ctaGlow = ctaGlowRef.current;
		if (ctaGlow) {
			TweenService.Create(ctaGlow, pulseTweenInfo, {
				Thickness: rem(2.4, "pixel"),
				Transparency: 0.12,
			}).Play();
		}

		const toastGlow = toastGlowRef.current;
		if (toastGlow) {
			TweenService.Create(toastGlow, pulseTweenInfo, {
				Thickness: rem(2, "pixel"),
				Transparency: 0.22,
			}).Play();
		}
	}, [rem]);

	return (
		<frame
			BackgroundColor3={hudTheme.colors.background}
			BorderSizePixel={0}
			Size={new UDim2(1, 0, 1, 0)}
		>
			<TopHud />
			<SideHud toastGlowRef={toastGlowRef} />
			<CenterHud />
			<BottomHud ctaGlowRef={ctaGlowRef} />
		</frame>
	);
}
