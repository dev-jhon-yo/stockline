import React, { useState } from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import type { InventorySlot } from "./hud-data";
import { ActionButton, Panel } from "./hud-primitives";
import type { HudLayoutInfo } from "./hud-root";
import { hudTheme } from "./hud-theme";

interface BottomHudProps {
	inventory: ReadonlyArray<InventorySlot>;
	layout: HudLayoutInfo;
	onPurchase?: (() => void) | undefined;
}

export function BottomHud({
	inventory,
	layout,
	onPurchase,
}: Readonly<BottomHudProps>): React.Element {
	const rem = useRem();
	const [hoveredSlot, setHoveredSlot] = useState<number | undefined>(undefined);
	const slotSize = rem(layout.isPhone ? 50 : 56, "pixel");

	return (
		<frame
			AutomaticSize={Enum.AutomaticSize.XY}
			BackgroundTransparency={1}
			Size={new UDim2(0, 0, 0, 0)}
			ZIndex={hudTheme.layers.bottom}
		>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={new UDim(0, rem(hudTheme.tokens.gap3, "pixel"))}
				VerticalAlignment={Enum.VerticalAlignment.Bottom}
			/>
			<frame
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				Size={new UDim2(0, 0, 0, 0)}
			>
				<textlabel
					BackgroundColor3={hudTheme.colors.strokeBottom}
					BackgroundTransparency={hoveredSlot !== undefined ? 0.08 : 1}
					BorderSizePixel={0}
					Position={new UDim2(0.5, -rem(52, "pixel"), 0, 0)}
					Size={new UDim2(0, rem(104, "pixel"), 0, rem(18, "pixel"))}
					Text={
						hoveredSlot !== undefined
							? (inventory.find((slotData) => slotData.id === hoveredSlot)?.name ??
								"")
							: ""
					}
					TextColor3={Color3.fromRGB(66, 180, 244)}
					TextSize={rem(10, "pixel")}
				>
					<uicorner CornerRadius={new UDim(0, rem(6, "pixel"))} />
					<uistroke
						Color={Color3.fromRGB(66, 180, 244)}
						Thickness={rem(1, "pixel")}
						Transparency={0.5}
					/>
				</textlabel>
				<Panel
					position={new UDim2(0, 0, 0, rem(24, "pixel"))}
					size={
						new UDim2(0, rem(layout.isPhone ? 390 : 456, "pixel"), 0, rem(78, "pixel"))
					}
					zIndex={hudTheme.layers.bottom}
				>
					<uisizeconstraint
						MaxSize={
							new Vector2(rem(layout.isPhone ? 430 : 500, "pixel"), rem(90, "pixel"))
						}
						MinSize={
							new Vector2(rem(layout.isPhone ? 320 : 410, "pixel"), rem(72, "pixel"))
						}
					/>
					<uipadding
						PaddingLeft={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
						PaddingRight={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
						PaddingTop={new UDim(0, rem(hudTheme.tokens.pad2, "pixel"))}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={new UDim(0, rem(hudTheme.tokens.gap2, "pixel"))}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>
					{inventory.map((slot) => {
						const isPrimary = slot.id === 2;
						return (
							<textbutton
								key={`slot-${slot.id}`}
								AutoButtonColor={false}
								BackgroundColor3={Color3.fromRGB(58, 63, 92)}
								BorderSizePixel={0}
								Event={{
									MouseEnter: () => {
										setHoveredSlot(slot.id);
									},
									MouseLeave: () => {
										setHoveredSlot(undefined);
									},
								}}
								Size={new UDim2(0, slotSize, 0, slotSize)}
								Text=""
							>
								<uicorner
									CornerRadius={
										new UDim(0, rem(hudTheme.tokens.radiusSm, "pixel"))
									}
								/>
								<uigradient
									Color={
										new ColorSequence([
											new ColorSequenceKeypoint(
												0,
												Color3.fromRGB(58, 63, 92),
											),
											new ColorSequenceKeypoint(
												1,
												Color3.fromRGB(45, 50, 80),
											),
										])
									}
									Rotation={90}
								/>
								<uistroke
									Color={
										isPrimary
											? Color3.fromRGB(255, 215, 0)
											: hudTheme.colors.stroke
									}
									Thickness={rem(3, "pixel")}
								/>
								<textlabel
									BackgroundTransparency={1}
									Font={Enum.Font.GothamBlack}
									Position={new UDim2(0, rem(4, "pixel"), 0, 0)}
									Size={new UDim2(0, rem(10, "pixel"), 0, rem(10, "pixel"))}
									Text={`${slot.id}`}
									TextColor3={hudTheme.colors.white}
									TextSize={rem(9, "pixel")}
								/>
								<textlabel
									AnchorPoint={new Vector2(0.5, 0.5)}
									BackgroundTransparency={1}
									Font={Enum.Font.GothamBold}
									Position={new UDim2(0.5, 0, 0.5, 0)}
									Size={new UDim2(0, rem(30, "pixel"), 0, rem(30, "pixel"))}
									Text={slot.icon}
									TextColor3={hudTheme.colors.white}
									TextSize={rem(24, "pixel")}
								/>
								{slot.quantity !== undefined ? (
									<textlabel
										AnchorPoint={new Vector2(1, 1)}
										BackgroundColor3={hudTheme.colors.panel}
										BorderSizePixel={0}
										Font={Enum.Font.GothamBlack}
										Position={new UDim2(1, rem(4, "pixel"), 1, rem(4, "pixel"))}
										Size={new UDim2(0, rem(20, "pixel"), 0, rem(14, "pixel"))}
										Text={`${slot.quantity}`}
										TextColor3={hudTheme.colors.white}
										TextSize={rem(9, "pixel")}
									>
										<uicorner CornerRadius={new UDim(0, rem(4, "pixel"))} />
										<uistroke
											Color={Color3.fromRGB(90, 95, 128)}
											Thickness={rem(2, "pixel")}
										/>
									</textlabel>
								) : undefined}
								{slot.hasNotification === true ? (
									<frame
										AnchorPoint={new Vector2(1, 0)}
										BackgroundColor3={
											slot.notificationColor ?? Color3.fromRGB(66, 180, 244)
										}
										BorderSizePixel={0}
										Position={
											new UDim2(1, rem(4, "pixel"), 0, -rem(4, "pixel"))
										}
										Size={new UDim2(0, rem(12, "pixel"), 0, rem(12, "pixel"))}
									>
										<uicorner CornerRadius={new UDim(1, 0)} />
										<uistroke
											Color={hudTheme.colors.panel}
											Thickness={rem(2, "pixel")}
										/>
									</frame>
								) : undefined}
							</textbutton>
						);
					})}
				</Panel>
			</frame>
			<ActionButton
				icon="🛒"
				label="Purchase"
				size={
					new UDim2(
						0,
						rem(layout.isPhone ? 212 : 276, "pixel"),
						0,
						rem(layout.isPhone ? 84 : 92, "pixel"),
					)
				}
				subtitle="Ion Battery · $150"
				zIndex={hudTheme.layers.bottom}
				onClick={onPurchase}
			/>
		</frame>
	);
}
