import React, { useState } from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import type { ObjectiveModel } from "./hud-data";
import { Chip, Panel, ProgressBar } from "./hud-primitives";
import type { HudLayoutInfo } from "./hud-root";
import { hudTheme } from "./hud-theme";

interface SideHudProps {
	layout: HudLayoutInfo;
	objectives: ReadonlyArray<ObjectiveModel>;
}

export function SideHud({ layout, objectives }: Readonly<SideHudProps>): React.Element {
	const rem = useRem();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isToastVisible, setIsToastVisible] = useState(true);

	const completed = objectives
		.filter((objective) => objective.current >= objective.target)
		.size();
	const width = rem(isCollapsed ? 256 : 360, "pixel");

	return (
		<frame
			BackgroundTransparency={1}
			Position={new UDim2(0, 0, 0, rem(76, "pixel"))}
			Size={new UDim2(1, 0, 1, -rem(76, "pixel"))}
			ZIndex={hudTheme.layers.side}
		>
			<Panel
				position={new UDim2(0, 0, 0, 0)}
				size={new UDim2(0, width, 0, rem(layout.isPhone ? 220 : 340, "pixel"))}
				zIndex={hudTheme.layers.side}
			>
				<textbutton
					AutoButtonColor={false}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					Event={{
						Activated: () => {
							setIsCollapsed(!isCollapsed);
						},
					}}
					Size={new UDim2(1, 0, 0, rem(54, "pixel"))}
					Text=""
				>
					<uipadding
						PaddingLeft={new UDim(0, rem(12, "pixel"))}
						PaddingRight={new UDim(0, rem(12, "pixel"))}
						PaddingTop={new UDim(0, rem(10, "pixel"))}
					/>
					<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBlack}
							Position={new UDim2(0, 0, 0, 0)}
							Size={new UDim2(0, rem(120, "pixel"), 0, rem(14, "pixel"))}
							Text="OBJECTIVES"
							TextColor3={hudTheme.colors.white}
							TextSize={rem(14, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
						<ProgressBar
							fillColor={hudTheme.colors.green}
							progress={completed / math.max(objectives.size(), 1)}
							text={`${completed}/${objectives.size()}`}
						/>
						<textlabel
							AnchorPoint={new Vector2(1, 0)}
							BackgroundColor3={Color3.fromRGB(61, 66, 112)}
							BorderSizePixel={0}
							Font={Enum.Font.GothamBlack}
							Position={new UDim2(1, 0, 0, 0)}
							Size={new UDim2(0, rem(24, "pixel"), 0, rem(24, "pixel"))}
							Text={isCollapsed ? "▼" : "▲"}
							TextColor3={hudTheme.colors.white}
							TextSize={rem(13, "pixel")}
						>
							<uicorner CornerRadius={new UDim(0, rem(6, "pixel"))} />
							<uistroke Color={hudTheme.colors.stroke} Thickness={rem(2, "pixel")} />
						</textlabel>
					</frame>
				</textbutton>
				{isCollapsed ? undefined : (
					<scrollingframe
						AutomaticCanvasSize={Enum.AutomaticSize.Y}
						BackgroundTransparency={1}
						BorderSizePixel={0}
						CanvasSize={new UDim2()}
						Position={new UDim2(0, 0, 0, rem(58, "pixel"))}
						ScrollBarImageColor3={hudTheme.colors.stroke}
						ScrollBarThickness={rem(4, "pixel")}
						Size={new UDim2(1, 0, 1, -rem(58, "pixel"))}
					>
						<uipadding
							PaddingBottom={new UDim(0, rem(12, "pixel"))}
							PaddingLeft={new UDim(0, rem(12, "pixel"))}
							PaddingRight={new UDim(0, rem(12, "pixel"))}
						/>
						<uilistlayout Padding={new UDim(0, rem(10, "pixel"))} />
						{objectives.map((objective) => {
							const progress = objective.current / objective.target;
							const isComplete = objective.current >= objective.target;
							return (
								<frame
									key={objective.id}
									AutomaticSize={Enum.AutomaticSize.Y}
									BackgroundColor3={Color3.fromRGB(53, 56, 96)}
									BorderSizePixel={0}
									Size={new UDim2(1, 0, 0, 0)}
								>
									<uicorner CornerRadius={new UDim(0, rem(12, "pixel"))} />
									<uistroke
										Color={hudTheme.colors.stroke}
										Thickness={rem(3, "pixel")}
									/>
									<frame
										BackgroundColor3={Color3.fromRGB(255, 233, 64)}
										BorderSizePixel={0}
										Size={new UDim2(1, 0, 0, rem(28, "pixel"))}
									>
										<uigradient
											Color={
												new ColorSequence([
													new ColorSequenceKeypoint(
														0,
														Color3.fromRGB(255, 233, 64),
													),
													new ColorSequenceKeypoint(
														1,
														Color3.fromRGB(255, 204, 0),
													),
												])
											}
										/>
										<uicorner CornerRadius={new UDim(0, rem(10, "pixel"))} />
										<uipadding
											PaddingLeft={new UDim(0, rem(8, "pixel"))}
											PaddingRight={new UDim(0, rem(8, "pixel"))}
										/>
										<textlabel
											BackgroundTransparency={1}
											Font={Enum.Font.GothamBlack}
											Position={new UDim2(0, 0, 0, rem(5, "pixel"))}
											Size={new UDim2(0.7, 0, 0, rem(16, "pixel"))}
											Text={`${objective.icon} ${objective.title}`}
											TextColor3={Color3.fromRGB(42, 45, 74)}
											TextSize={rem(11, "pixel")}
											TextXAlignment={Enum.TextXAlignment.Left}
										/>
										<textlabel
											AnchorPoint={new Vector2(1, 0)}
											BackgroundColor3={
												isComplete
													? hudTheme.colors.green
													: Color3.fromRGB(66, 180, 244)
											}
											BorderSizePixel={0}
											Font={Enum.Font.GothamBlack}
											Position={new UDim2(1, 0, 0, rem(4, "pixel"))}
											Size={
												new UDim2(0, rem(52, "pixel"), 0, rem(18, "pixel"))
											}
											Text={isComplete ? "Claim" : objective.actionLabel}
											TextColor3={hudTheme.colors.white}
											TextSize={rem(9, "pixel")}
										>
											<uicorner CornerRadius={new UDim(0, rem(6, "pixel"))} />
										</textlabel>
									</frame>
									<frame
										AutomaticSize={Enum.AutomaticSize.Y}
										BackgroundTransparency={1}
										Position={
											new UDim2(0, rem(8, "pixel"), 0, rem(34, "pixel"))
										}
										Size={new UDim2(1, -rem(16, "pixel"), 0, 0)}
									>
										<textlabel
											AutomaticSize={Enum.AutomaticSize.Y}
											BackgroundTransparency={1}
											Font={Enum.Font.GothamBold}
											Size={
												new UDim2(1, -rem(80, "pixel"), 0, rem(12, "pixel"))
											}
											Text={objective.description}
											TextColor3={hudTheme.colors.textMuted}
											TextSize={rem(10, "pixel")}
											TextWrapped={true}
											TextXAlignment={Enum.TextXAlignment.Left}
											TextYAlignment={Enum.TextYAlignment.Top}
										/>
										<Chip
											color={Color3.fromRGB(42, 45, 74)}
											label=""
											text={objective.reward}
										/>
										<ProgressBar
											fillColor={hudTheme.colors.green}
											progress={progress}
											text={`${objective.unit ?? ""}${objective.current} / ${objective.unit ?? ""}${objective.target}`}
										/>
										{objective.isOptional === true ? (
											<textlabel
												BackgroundTransparency={1}
												Font={Enum.Font.GothamBold}
												Size={new UDim2(1, 0, 0, rem(12, "pixel"))}
												Text="(Optional)"
												TextColor3={hudTheme.colors.textMuted}
												TextSize={rem(9, "pixel")}
												TextXAlignment={Enum.TextXAlignment.Right}
											/>
										) : undefined}
									</frame>
								</frame>
							);
						})}
					</scrollingframe>
				)}
			</Panel>

			{isToastVisible ? (
				<Panel
					position={new UDim2(1, -rem(288, "pixel"), 0, 0)}
					size={new UDim2(0, rem(272, "pixel"), 0, rem(112, "pixel"))}
					zIndex={hudTheme.layers.toast}
				>
					<frame
						BackgroundColor3={Color3.fromRGB(66, 180, 244)}
						BorderSizePixel={0}
						Position={new UDim2(0, 0, 0, rem(12, "pixel"))}
						Size={new UDim2(0, rem(5, "pixel"), 1, -rem(24, "pixel"))}
					>
						<uicorner CornerRadius={new UDim(0, rem(6, "pixel"))} />
					</frame>
					<textbutton
						AnchorPoint={new Vector2(1, 0)}
						AutoButtonColor={false}
						BackgroundColor3={Color3.fromRGB(61, 66, 112)}
						BorderSizePixel={0}
						Event={{
							Activated: () => {
								setIsToastVisible(false);
							},
						}}
						Position={new UDim2(1, -rem(8, "pixel"), 0, rem(8, "pixel"))}
						Size={new UDim2(0, rem(20, "pixel"), 0, rem(20, "pixel"))}
						Text="✕"
						TextColor3={hudTheme.colors.textMuted}
						TextSize={rem(12, "pixel")}
					>
						<uicorner CornerRadius={new UDim(0, rem(6, "pixel"))} />
					</textbutton>
					<frame
						BackgroundTransparency={1}
						Position={new UDim2(0, rem(12, "pixel"), 0, rem(16, "pixel"))}
						Size={new UDim2(1, -rem(24, "pixel"), 1, -rem(24, "pixel"))}
					>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBlack}
							Size={new UDim2(1, 0, 0, rem(18, "pixel"))}
							Text="ℹ Welcome!"
							TextColor3={hudTheme.colors.white}
							TextSize={rem(14, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBold}
							Position={new UDim2(0, 0, 0, rem(22, "pixel"))}
							Size={new UDim2(1, 0, 0, rem(44, "pixel"))}
							Text="Start trading to build your empire. Monitor demand and optimize stock."
							TextColor3={hudTheme.colors.textMuted}
							TextSize={rem(10, "pixel")}
							TextWrapped={true}
							TextXAlignment={Enum.TextXAlignment.Left}
							TextYAlignment={Enum.TextYAlignment.Top}
						/>
					</frame>
				</Panel>
			) : undefined}
		</frame>
	);
}
