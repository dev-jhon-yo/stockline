import React, { useEffect, useState } from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import { objectives } from "./hud-data";
import { ObjectiveItem } from "./hud-primitives";
import type { HudLayoutInfo } from "./hud-root";
import { hudTheme } from "./hud-theme";

interface SideHudProps {
	layout: HudLayoutInfo;
	toastGlowRef: React.RefObject<UIStroke>;
}

export function SideHud({ layout, toastGlowRef }: Readonly<SideHudProps>): React.Element {
	const rem = useRem();

	const [isCollapsed, setIsCollapsed] = useState(() => layout.isPhone);

	useEffect(() => {
		if (layout.isPhone) {
			setIsCollapsed(true);
		}
	}, [layout.isPhone]);

	const topBarHeight = rem(layout.isPhone ? 72 : layout.isUltraCompact ? 78 : 84, "pixel");
	const sectionGap = rem(layout.isShort ? 8 : 14, "pixel");
	const topOffset = topBarHeight + sectionGap;
	const objectivesOffset = topOffset + rem(layout.isShort ? 14 : layout.isCompact ? 52 : 82, "pixel");

	const toastWidth = rem(layout.isPhone ? 240 : layout.isUltraCompact ? 320 : 380, "pixel");
	const toastHeight = rem(layout.isPhone ? 64 : layout.isUltraCompact ? 72 : 82, "pixel");

	const objectivesWidth = rem(layout.isPhone ? 236 : layout.isUltraCompact ? 290 : 338, "pixel");
	const objectivesMinH = rem(layout.isPhone ? 66 : 74, "pixel");
	const objectivesCap = rem(layout.isPhone ? 236 : layout.isUltraCompact ? 280 : 360, "pixel");
	const bottomReserve = rem(layout.isPhone ? 116 : layout.isShort ? 126 : 176, "pixel");
	const maxAllowedByScreen = math.max(
		objectivesMinH,
		layout.safeHeight - objectivesOffset - bottomReserve,
	);
	const objectivesMaxH = math.max(objectivesMinH, math.min(objectivesCap, maxAllowedByScreen));

	const headerHeight = rem(layout.isPhone ? 34 : 38, "pixel");
	const scrollBarThickness = rem(layout.isPhone ? 2 : 4, "pixel");
	const scrollSafePadRight = rem(8, "pixel");

	return (
		<>
			<frame
				AnchorPoint={new Vector2(1, 0)}
				BackgroundColor3={hudTheme.colors.surface}
				BackgroundTransparency={0.14}
				BorderSizePixel={0}
				Position={new UDim2(1, 0, 0, topOffset)}
				Size={new UDim2(0, toastWidth, 0, toastHeight)}
				ZIndex={hudTheme.layers.toast}
			>
				<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
				<uistroke
					ref={toastGlowRef}
					Color={hudTheme.colors.glowBlue}
					Thickness={rem(1.8, "pixel")}
					Transparency={0.45}
				/>
				<uipadding
					PaddingBottom={rem(new UDim(0, 10), "pixel")}
					PaddingLeft={rem(new UDim(0, 12), "pixel")}
					PaddingRight={rem(new UDim(0, 12), "pixel")}
					PaddingTop={rem(new UDim(0, 10), "pixel")}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={rem(new UDim(0, 10), "pixel")}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				<frame
					BackgroundColor3={hudTheme.colors.blue}
					BackgroundTransparency={0.76}
					BorderSizePixel={0}
					Size={rem(new UDim2(0, 32, 0, 32), "pixel")}
				>
					<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamBold}
						Size={new UDim2(1, 0, 1, 0)}
						Text="i"
						TextColor3={hudTheme.colors.blue}
						TextSize={rem(15, "pixel")}
					/>
				</frame>

				<frame BackgroundTransparency={1} Size={new UDim2(1, -74, 1, 0)}>
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamMedium}
						Size={new UDim2(1, 0, 0.5, 0)}
						Text="Welcome to Market Simulator!"
						TextColor3={hudTheme.colors.textPrimary}
						TextSize={rem(layout.isPhone ? 12 : 14, "pixel")}
						TextTruncate={Enum.TextTruncate.AtEnd}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
					{layout.isPhone ? undefined : (
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.Gotham}
							Position={new UDim2(0, 0, 0.48, 0)}
							Size={new UDim2(1, 0, 0.52, 0)}
							Text="Start trading to build your empire"
							TextColor3={hudTheme.colors.textSecondary}
							TextSize={rem(12, "pixel")}
							TextWrapped={true}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
					)}
				</frame>

				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.GothamMedium}
						Size={new UDim2(0, rem(18, "pixel"), 1, 0)}
					Text="✕"
					TextColor3={hudTheme.colors.textSecondary}
					TextSize={rem(14, "pixel")}
					TextXAlignment={Enum.TextXAlignment.Right}
					TextYAlignment={Enum.TextYAlignment.Top}
				/>
			</frame>

			<frame
				BackgroundColor3={hudTheme.colors.surface}
				BackgroundTransparency={0.18}
				BorderSizePixel={0}
				Position={new UDim2(0, 0, 0, objectivesOffset)}
				Size={
					isCollapsed
						? new UDim2(0, objectivesWidth, 0, objectivesMinH)
						: new UDim2(0, objectivesWidth, 0, objectivesMaxH)
				}
				ZIndex={hudTheme.layers.side}
			>
				<uisizeconstraint
					MaxSize={new Vector2(objectivesWidth, objectivesMaxH)}
					MinSize={new Vector2(objectivesWidth, objectivesMinH)}
				/>
				<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
				<uistroke
					Color={hudTheme.colors.stroke}
					Thickness={rem(1.4, "pixel")}
					Transparency={0.25}
				/>
				<uipadding
					PaddingBottom={rem(new UDim(0, 10), "pixel")}
					PaddingLeft={rem(new UDim(0, 10), "pixel")}
					PaddingRight={rem(new UDim(0, 10), "pixel")}
					PaddingTop={rem(new UDim(0, 10), "pixel")}
				/>

				<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 0, headerHeight)}>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={rem(new UDim(0, 8), "pixel")}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>

					<frame
						BackgroundColor3={hudTheme.colors.blue}
						BackgroundTransparency={0.74}
						BorderSizePixel={0}
						Size={rem(new UDim2(0, 24, 0, 24), "pixel")}
					>
						<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBold}
							Size={new UDim2(1, 0, 1, 0)}
							Text="◎"
							TextColor3={hudTheme.colors.blue}
							TextSize={rem(12, "pixel")}
						/>
					</frame>

					<frame BackgroundTransparency={1} Size={new UDim2(1, -66, 1, 0)}>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							Size={new UDim2(1, 0, 0.52, 0)}
							Text="Objectives"
							TextColor3={hudTheme.colors.textPrimary}
							TextSize={rem(15, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.Gotham}
							Position={new UDim2(0, 0, 0.5, 0)}
							Size={new UDim2(1, 0, 0.5, 0)}
							Text="1/4 Complete"
							TextColor3={hudTheme.colors.textSecondary}
							TextSize={rem(11, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
					</frame>

					<textbutton
						AutoButtonColor={false}
						BackgroundColor3={hudTheme.colors.surfaceStrong}
						BackgroundTransparency={0.45}
						BorderSizePixel={0}
						Event={{
							Activated: () => {
								setIsCollapsed((current) => !current);
							},
						}}
						Size={rem(new UDim2(0, 26, 0, 26), "pixel")}
						Text={isCollapsed ? "▾" : "▴"}
						TextColor3={hudTheme.colors.textSecondary}
						TextSize={rem(14, "pixel")}
					>
						<uicorner CornerRadius={rem(hudTheme.radius.sm, "pixel")} />
					</textbutton>
				</frame>

				{isCollapsed ? undefined : (
					<scrollingframe
						Active={true}
						AutomaticCanvasSize={Enum.AutomaticSize.Y}
						BackgroundTransparency={1}
						CanvasSize={new UDim2(0, 0, 0, 0)}
						ScrollBarImageTransparency={0.25}
						ScrollBarThickness={scrollBarThickness}
						Size={new UDim2(1, 0, 1, -headerHeight)}
					>
						<uipadding
							PaddingRight={new UDim(0, scrollSafePadRight + scrollBarThickness)}
						/>
						<uilistlayout
							FillDirection={Enum.FillDirection.Vertical}
							Padding={rem(new UDim(0, 10), "pixel")}
							SortOrder={Enum.SortOrder.LayoutOrder}
							VerticalAlignment={Enum.VerticalAlignment.Top}
						/>
						{objectives.map((objective) => {
							return (
								<ObjectiveItem
									key={objective.title}
									compact={layout.isPhone || layout.isUltraCompact}
									data={objective}
								/>
							);
						})}
					</scrollingframe>
				)}
			</frame>
		</>
	);
}
