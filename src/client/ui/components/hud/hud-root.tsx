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

	const safePadX = rem(layout.isPhone ? 12 : 16, "pixel");
	const safePadTop = viewport.insets.top + rem(layout.isPhone ? 10 : 14, "pixel");
	const safePadBottom = viewport.insets.bottom + rem(layout.isPhone ? 12 : 16, "pixel");

	const viewportScale = math.clamp(
		math.min(layout.safeWidth / 1920, layout.safeHeight / 1080),
		0.75,
		1.05,
	);

	const topMargin = rem(4, "pixel");
	const sideTop = rem(76, "pixel");

	return (
		<frame
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Size={new UDim2(1, 0, 1, 0)}
			ZIndex={hudTheme.layers.base}
		>
			<UltraWideContainer>
				<frame BackgroundTransparency={1} BorderSizePixel={0} Size={new UDim2(1, 0, 1, 0)}>
					<uiscale Scale={viewportScale} />
					<uipadding
						PaddingBottom={new UDim(0, safePadBottom)}
						PaddingLeft={new UDim(0, viewport.insets.left + safePadX)}
						PaddingRight={new UDim(0, viewport.insets.right + safePadX)}
						PaddingTop={new UDim(0, safePadTop)}
					/>

					{/* TopLeftWrap */}
					<frame
						AnchorPoint={new Vector2(0, 0)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Position={new UDim2(0, 0, 0, topMargin)}
						Size={new UDim2(0, 0, 0, 0)}
					>
						<TopHud
							balance={balance}
							dayTime={mockDayTime}
							layout={layout}
							market={mockMarketMetrics}
							section="left"
						/>
					</frame>

					{/* TopCenterWrap */}
					{layout.isPhone ? undefined : (
						<frame
							AnchorPoint={new Vector2(0.5, 0)}
							AutomaticSize={Enum.AutomaticSize.XY}
							BackgroundTransparency={1}
							Position={new UDim2(0.5, 0, 0, topMargin)}
							Size={new UDim2(0, 0, 0, 0)}
						>
							<TopHud
								balance={balance}
								dayTime={mockDayTime}
								layout={layout}
								market={mockMarketMetrics}
								section="center"
							/>
						</frame>
					)}

					{/* TopRightWrap */}
					<frame
						AnchorPoint={new Vector2(1, 0)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Position={new UDim2(1, 0, 0, topMargin)}
						Size={new UDim2(0, 0, 0, 0)}
					>
						<TopHud
							balance={balance}
							dayTime={mockDayTime}
							layout={layout}
							market={mockMarketMetrics}
							section="right"
						/>
					</frame>

					{/* LeftColumnWrap */}
					<frame
						AnchorPoint={new Vector2(0, 0)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Position={new UDim2(0, 0, 0, sideTop)}
						Size={new UDim2(0, 0, 0, 0)}
					>
						<SideHud layout={layout} objectives={mockObjectives} section="left" />
					</frame>

					{/* RightToastWrap */}
					<frame
						AnchorPoint={new Vector2(1, 0)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Position={new UDim2(1, 0, 0, sideTop)}
						Size={new UDim2(0, 0, 0, 0)}
					>
						<SideHud layout={layout} objectives={mockObjectives} section="right" />
					</frame>

					{/* CenterWrap */}
					<frame
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundTransparency={1}
						Position={new UDim2(0.5, 0, 0.5, 0)}
						Size={new UDim2(0, 0, 0, 0)}
					>
						<CenterHud layout={layout} />
					</frame>

					{/* BottomDockWrap */}
					<frame
						AnchorPoint={new Vector2(0.5, 1)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Position={new UDim2(0.5, 0, 1, -rem(4, "pixel"))}
						Size={new UDim2(0, 0, 0, 0)}
					>
						<BottomHud
							inventory={mockInventory}
							layout={layout}
							onPurchase={() => {
								print("Purchase initiated");
							}}
						/>
					</frame>
				</frame>
			</UltraWideContainer>
		</frame>
	);
}
