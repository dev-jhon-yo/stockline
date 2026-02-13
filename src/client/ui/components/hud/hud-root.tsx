import React, { useMemo } from "@rbxts/react";
import { Players } from "@rbxts/services";

import { useRem, useViewport } from "client/ui/hooks";
import { useRootSelector } from "client/ui/hooks/use-selector";
import { selectPlayerBalance } from "shared/store/persistent/persistent-selectors";

import { UltraWideContainer } from "../ultra-wide-container";
import { BottomHud } from "./hud-bottom";
import { CenterHud } from "./hud-center";
import { mockDayTime, mockInventory, mockMarketMetrics, mockObjectives } from "./hud-data";
import { SideHud } from "./hud-side";
import { hudTheme } from "./hud-theme";
import { TopHud } from "./hud-top";

const MAX_ASPECT_RATIO = 19 / 9;

export interface HudLayoutInfo {
	isCompact: boolean;
	isPhone: boolean;
	isUltraCompact: boolean;
	safeHeight: number;
	safeWidth: number;
}

export function HudRoot(): React.Element {
	const rem = useRem();
	const viewport = useViewport();
	const localPlayer = Players.LocalPlayer;
	const playerId = tostring(localPlayer.UserId);

	const playerBalance = useRootSelector(selectPlayerBalance(playerId));
	/**
	 * TODO: replace fallback once gameplay economy is finalized for HUD
	 * bootstrap.
	 */
	const balance = playerBalance?.currency ?? 12_450;

	const layout = useMemo((): HudLayoutInfo => {
		const safeWidth = math.min(viewport.safeWidth, viewport.safeHeight * MAX_ASPECT_RATIO);
		const { safeHeight } = viewport;
		const isPhone =
			safeWidth <= hudTheme.breakpoints.phoneWidth ||
			safeHeight <= hudTheme.breakpoints.phoneHeight;
		const isUltraCompact = safeWidth <= hudTheme.breakpoints.ultraCompactWidth;
		const isCompact = safeWidth <= hudTheme.breakpoints.compactWidth;
		return { isCompact, isPhone, isUltraCompact, safeHeight, safeWidth };
	}, [viewport]);

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
					BackgroundColor3={hudTheme.colors.background}
					BorderSizePixel={0}
					Size={new UDim2(1, 0, 1, 0)}
				>
					<uigradient
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, Color3.fromRGB(74, 79, 108)),
								new ColorSequenceKeypoint(1, Color3.fromRGB(58, 63, 92)),
							])
						}
						Rotation={45}
					/>
					<uipadding
						PaddingBottom={new UDim(0, viewport.insets.bottom + padY)}
						PaddingLeft={new UDim(0, viewport.insets.left + padX)}
						PaddingRight={new UDim(0, viewport.insets.right + padX)}
						PaddingTop={new UDim(0, viewport.insets.top + padY)}
					/>

					<TopHud
						balance={balance}
						dayTime={mockDayTime}
						layout={layout}
						market={mockMarketMetrics}
					/>
					<SideHud layout={layout} objectives={mockObjectives} />
					<CenterHud layout={layout} />
					<BottomHud
						inventory={mockInventory}
						layout={layout}
						onPurchase={() => {
							print("Purchase initiated");
						}}
					/>
				</frame>
			</UltraWideContainer>
		</frame>
	);
}
