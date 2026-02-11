import React, { useState } from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import { objectives } from "./hud-data";
import { ObjectiveItem } from "./hud-primitives";
import { hudTheme } from "./hud-theme";

interface SideHudProps {
	toastGlowRef: React.RefObject<UIStroke>;
}

export function SideHud({
	toastGlowRef,
}: Readonly<SideHudProps>): React.Element {
	const rem = useRem();
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<>
			<frame
				AnchorPoint={new Vector2(1, 0)}
				BackgroundColor3={hudTheme.colors.surface}
				BackgroundTransparency={0.14}
				BorderSizePixel={0}
				Position={rem(new UDim2(0.988, 0, 0.16, 0), "pixel")}
				Size={rem(new UDim2(0.19, 0, 0.088, 0), "pixel")}
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
					PaddingLeft={rem(new UDim(0, 16), "pixel")}
					PaddingRight={rem(new UDim(0, 16), "pixel")}
					PaddingTop={rem(new UDim(0, 10), "pixel")}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={rem(new UDim(0, 10), "pixel")}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<frame
					BackgroundColor3={hudTheme.colors.blue}
					BackgroundTransparency={0.75}
					BorderSizePixel={0}
					Size={rem(new UDim2(0, 38, 0, 38), "pixel")}
				>
					<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamBold}
						Size={new UDim2(1, 0, 1, 0)}
						Text="i"
						TextColor3={hudTheme.colors.blue}
						TextSize={rem(18, "pixel")}
					/>
				</frame>
				<frame
					BackgroundTransparency={1}
					Size={rem(new UDim2(1, -60, 1, 0), "pixel")}
				>
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamMedium}
						Size={new UDim2(1, 0, 0.5, 0)}
						Text={"Welcome to Market\nSimulator!"}
						TextColor3={hudTheme.colors.textPrimary}
						TextSize={rem(16, "pixel")}
						TextWrapped={true}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.Gotham}
						Position={new UDim2(0, 0, 0.54, 0)}
						Size={new UDim2(1, 0, 0.44, 0)}
						Text="Start trading to build your empire"
						TextColor3={hudTheme.colors.textSecondary}
						TextSize={rem(13, "pixel")}
						TextWrapped={true}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
				</frame>
				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.GothamMedium}
					Size={rem(new UDim2(0, 20, 1, 0), "pixel")}
					Text="✕"
					TextColor3={hudTheme.colors.textSecondary}
					TextSize={rem(18, "pixel")}
					TextXAlignment={Enum.TextXAlignment.Right}
					TextYAlignment={Enum.TextYAlignment.Top}
				/>
			</frame>

			<frame
				BackgroundColor3={hudTheme.colors.surface}
				BackgroundTransparency={0.18}
				BorderSizePixel={0}
				Position={rem(new UDim2(0.02, 0, 0.25, 0), "pixel")}
				Size={
					isCollapsed
						? rem(new UDim2(0.205, 0, 0, 68), "pixel")
						: rem(new UDim2(0.205, 0, 0.42, 0), "pixel")
				}
			>
				<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
				<uistroke
					Color={hudTheme.colors.stroke}
					Thickness={rem(1.4, "pixel")}
					Transparency={0.25}
				/>
				<uipadding
					PaddingBottom={rem(new UDim(0, 14), "pixel")}
					PaddingLeft={rem(new UDim(0, 14), "pixel")}
					PaddingRight={rem(new UDim(0, 14), "pixel")}
					PaddingTop={rem(new UDim(0, 12), "pixel")}
				/>
				<frame
					BackgroundTransparency={1}
					Size={rem(new UDim2(1, 0, 0, 34), "pixel")}
				>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={rem(new UDim(0, 8), "pixel")}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>
					<frame
						BackgroundColor3={hudTheme.colors.blue}
						BackgroundTransparency={0.74}
						BorderSizePixel={0}
						Size={rem(new UDim2(0, 28, 0, 28), "pixel")}
					>
						<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBold}
							Size={new UDim2(1, 0, 1, 0)}
							Text="◎"
							TextColor3={hudTheme.colors.blue}
							TextSize={rem(13, "pixel")}
						/>
					</frame>
					<frame BackgroundTransparency={1} Size={new UDim2(1, -72, 1, 0)}>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							Position={rem(new UDim2(0, 0, 0, -1), "pixel")}
							Size={new UDim2(1, 0, 0.52, 0)}
							Text="Objectives"
							TextColor3={hudTheme.colors.textPrimary}
							TextSize={rem(22, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						>
							<uitextsizeconstraint
								MaxTextSize={rem(16, "pixel")}
								MinTextSize={rem(11, "pixel")}
							/>
						</textlabel>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.Gotham}
							Position={new UDim2(0, 0, 0.5, 0)}
							Size={new UDim2(1, 0, 0.5, 0)}
							Text="1/4 Complete"
							TextColor3={hudTheme.colors.textSecondary}
							TextSize={rem(16, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						>
							<uitextsizeconstraint
								MaxTextSize={rem(14, "pixel")}
								MinTextSize={rem(10, "pixel")}
							/>
						</textlabel>
					</frame>
					<textbutton
						AutoButtonColor={false}
						BackgroundColor3={hudTheme.colors.surfaceStrong}
						BackgroundTransparency={0.5}
						BorderSizePixel={0}
						Event={{
							Activated: () => {
								setIsCollapsed((previous) => !previous);
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
					<>
						<uilistlayout
							FillDirection={Enum.FillDirection.Vertical}
							Padding={rem(new UDim(0, 10), "pixel")}
							SortOrder={Enum.SortOrder.LayoutOrder}
							VerticalAlignment={Enum.VerticalAlignment.Top}
						/>
						{objectives.map((objective) => {
							return <ObjectiveItem key={objective.title} data={objective} />;
						})}
					</>
				)}
			</frame>
		</>
	);
}
