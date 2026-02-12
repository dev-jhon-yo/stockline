import React, { useEffect, useMemo, useRef } from "@rbxts/react";
import { TweenService } from "@rbxts/services";

import type { ViewportClass } from "client/ui/hooks";
import { useRem, useViewport } from "client/ui/hooks";

import { UltraWideContainer } from "../ultra-wide-container";
import { BottomHud } from "./hud-bottom";
import { CenterHud } from "./hud-center";
import { pulseTweenInfo } from "./hud-data";
import { SideHud } from "./hud-side";
import { hudTheme } from "./hud-theme";
import { TopHud } from "./hud-top";

const MAX_ASPECT_RATIO = 19 / 9;

export interface HudLayoutInfo {
	class: ViewportClass;
	isCompact: boolean;
	isPhone: boolean;
	isShort: boolean;
	isUltraCompact: boolean;
	safeHeight: number;
	safeWidth: number;
}

export function HudRoot(): React.Element {
	const rem = useRem();
	const viewport = useViewport();
	const ctaGlowRef = useRef<UIStroke>();
	const toastGlowRef = useRef<UIStroke>();

	const layout = useMemo((): HudLayoutInfo => {
		const safeWidth = math.min(viewport.safeWidth, viewport.safeHeight * MAX_ASPECT_RATIO);
		const safeHeight = viewport.safeHeight;

		const isPhone =
			viewport.class === "tall" ||
			safeWidth <= hudTheme.breakpoints.phoneWidth ||
			safeHeight <= hudTheme.breakpoints.phoneHeight;
		const isUltraCompact = safeWidth <= hudTheme.breakpoints.ultraCompactWidth;
		const isCompact = safeWidth <= hudTheme.breakpoints.compactWidth;
		const isShort = safeHeight <= hudTheme.breakpoints.shortHeight;

		return {
			class: viewport.class,
			isCompact,
			isPhone,
			isShort,
			isUltraCompact,
			safeHeight,
			safeWidth,
		};
	}, [viewport]);

	useEffect(() => {
		const activeTweens = new Array<Tween>();

		const ctaGlow = ctaGlowRef.current;
		if (ctaGlow) {
			const ctaTween = TweenService.Create(ctaGlow, pulseTweenInfo, {
				Thickness: rem(2.4, "pixel"),
				Transparency: 0.12,
			});
			ctaTween.Play();
			activeTweens.push(ctaTween);
		}

		const toastGlow = toastGlowRef.current;
		if (toastGlow) {
			const toastTween = TweenService.Create(toastGlow, pulseTweenInfo, {
				Thickness: rem(2, "pixel"),
				Transparency: 0.22,
			});
			toastTween.Play();
			activeTweens.push(toastTween);
		}

		return () => {
			activeTweens.forEach((tween) => {
				tween.Cancel();
			});
		};
	}, [rem]);

	const padX = rem(layout.isPhone ? 12 : 16, "pixel");
	const padY = rem(layout.isPhone ? 10 : 14, "pixel");

	return (
		<frame
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Size={new UDim2(1, 0, 1, 0)}
			ZIndex={hudTheme.layers.base}
		>
			<UltraWideContainer>
				<frame
					BackgroundTransparency={1}
					Size={new UDim2(1, 0, 1, 0)}
					ZIndex={hudTheme.layers.base}
				>
					<uipadding
						PaddingBottom={new UDim(0, viewport.insets.bottom + padY)}
						PaddingLeft={new UDim(0, viewport.insets.left + padX)}
						PaddingRight={new UDim(0, viewport.insets.right + padX)}
						PaddingTop={new UDim(0, viewport.insets.top + padY)}
					/>

					<TopHud layout={layout} />
					<SideHud layout={layout} toastGlowRef={toastGlowRef} />
					<CenterHud layout={layout} />
					<BottomHud ctaGlowRef={ctaGlowRef} layout={layout} />
				</frame>
			</UltraWideContainer>
		</frame>
	);
}
