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

	// Safe-area padding (device inset aware)
	const safePadX = rem(layout.isPhone ? 12 : 20, "pixel");
	const safePadTop = viewport.insets.top + rem(layout.isPhone ? 12 : 16, "pixel");
	const safePadBottom = viewport.insets.bottom + rem(layout.isPhone ? 12 : 16, "pixel");

	// Spacing between rows
	const topMargin = rem(6, "pixel");
	const sideTop = rem(82, "pixel");

	// --- TopRow column system ---
	// These are SCALE widths so the center block stays truly centered,
	// independent of left/right content. Tune these ratios if you want more/less
	// space for Objectives vs top center pills.
	const leftCol = layout.isPhone ? 0.56 : 0.4;
	const rightCol = layout.isPhone ? 0.44 : 0.28;
	const centerCol = 1 - leftCol - rightCol;

	return (
		<frame
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Size={new UDim2(1, 0, 1, 0)}
			ZIndex={hudTheme.layers.base}
		>
			<UltraWideContainer>
				<frame BackgroundTransparency={1} BorderSizePixel={0} Size={new UDim2(1, 0, 1, 0)}>
					<uipadding
						PaddingBottom={new UDim(0, safePadBottom)}
						PaddingLeft={new UDim(0, viewport.insets.left + safePadX)}
						PaddingRight={new UDim(0, viewport.insets.right + safePadX)}
						PaddingTop={new UDim(0, safePadTop)}
					/>

					{/* =========================
						TOP ROW (3-COLUMN GRID)
						Left / Center / Right
						This prevents "visual drift" caused by autosized left/right content.
						========================= */}
					<frame
						AutomaticSize={Enum.AutomaticSize.Y}
						BackgroundTransparency={1}
						Position={new UDim2(0, 0, 0, topMargin)}
						Size={new UDim2(1, 0, 0, 0)}
					>
						<uilistlayout
							FillDirection={Enum.FillDirection.Horizontal}
							HorizontalAlignment={Enum.HorizontalAlignment.Left}
							SortOrder={Enum.SortOrder.LayoutOrder}
							VerticalAlignment={Enum.VerticalAlignment.Top}
						/>

						{/* LEFT COL */}
						<frame
							AutomaticSize={Enum.AutomaticSize.Y}
							BackgroundTransparency={1}
							LayoutOrder={1}
							Size={new UDim2(leftCol, 0, 0, 0)}
						>
							{/* Keep content pinned left */}
							<frame
								AutomaticSize={Enum.AutomaticSize.XY}
								BackgroundTransparency={1}
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
						</frame>

						{/* CENTER COL */}
						<frame
							AutomaticSize={Enum.AutomaticSize.Y}
							BackgroundTransparency={1}
							LayoutOrder={2}
							Size={new UDim2(centerCol, 0, 0, 0)}
						>
							{/* Center content within the column */}
							{layout.isPhone ? undefined : (
								<frame
									AnchorPoint={new Vector2(0.5, 0)}
									AutomaticSize={Enum.AutomaticSize.XY}
									BackgroundTransparency={1}
									Position={new UDim2(0.5, 0, 0, 0)}
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
						</frame>

						{/* RIGHT COL */}
						<frame
							AutomaticSize={Enum.AutomaticSize.Y}
							BackgroundTransparency={1}
							LayoutOrder={3}
							Size={new UDim2(rightCol, 0, 0, 0)}
						>
							{/* Keep content pinned right */}
							<frame
								AnchorPoint={new Vector2(1, 0)}
								AutomaticSize={Enum.AutomaticSize.XY}
								BackgroundTransparency={1}
								Position={new UDim2(1, 0, 0, 0)}
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
						</frame>
					</frame>

					{/* LEFT PANEL (Objectives) */}
					<frame
						AnchorPoint={new Vector2(0, 0)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Position={new UDim2(0, 0, 0, sideTop)}
						Size={new UDim2(0, 0, 0, 0)}
					>
						<SideHud layout={layout} objectives={mockObjectives} section="left" />
					</frame>

					{/* RIGHT TOAST */}
					<frame
						AnchorPoint={new Vector2(1, 0)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Position={new UDim2(1, 0, 0, sideTop)}
						Size={new UDim2(0, 0, 0, 0)}
					>
						<SideHud layout={layout} objectives={mockObjectives} section="right" />
					</frame>

					{/* CENTER CROSSHAIR */}
					<frame
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundTransparency={1}
						Position={new UDim2(0.5, 0, 0.5, 0)}
						Size={new UDim2(0, 0, 0, 0)}
					>
						<CenterHud layout={layout} />
					</frame>

					{/* BOTTOM */}
					<frame
						AnchorPoint={new Vector2(0.5, 1)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Position={new UDim2(0.5, 0, 1, -rem(6, "pixel"))}
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
