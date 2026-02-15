import React, { useMemo, useState } from "@rbxts/react";

import { springs } from "client/ui/constants/springs";
import { useMotion, useRem } from "client/ui/hooks";

import { Frame, TextLabel } from "../primitive";
import type { InventorySlot } from "./hud-data";
import { ActionButton, Panel } from "./hud-primitives";
import type { HudLayoutInfo } from "./hud-root";
import { hudTheme } from "./hud-theme";

interface BottomHudProps {
	inventory: ReadonlyArray<InventorySlot>;
	layout: HudLayoutInfo;
	onPurchase?: (() => void) | undefined;
}

interface HotbarSlotProps {
	hoveredSlot: number | undefined;
	isSelected: boolean;
	rem: (value: number, mode?: "pixel" | "unit") => number;
	setHoveredSlot: (id: number | undefined) => void;
	slot: InventorySlot;
	slotSize: number;
}

/**
 * Individual hotbar slot matching Figma design EXACTLY.
 *
 * - Individual depth shadow (dark blue-gray)
 * - NO inner highlight (doesn't exist in Figma)
 * - Larger notification dots positioned outside/above
 * - Selected outline as thick yellow overlay.
 */
function HotbarSlot({
	hoveredSlot,
	isSelected,
	rem,
	setHoveredSlot,
	slot,
	slotSize,
}: Readonly<HotbarSlotProps>): React.Element {
	const [isPressed, setIsPressed] = useState(false);
	const isHovered = hoveredSlot === slot.id;

	// Scale animation only
	const [scaleBinding, scaleMotion] = useMotion(1);

	// Update scale based on interaction
	useMemo(() => {
		if (isPressed) {
			scaleMotion.spring(0.95, springs.responsive);
		} else if (isHovered) {
			scaleMotion.spring(1.05, springs.gentle);
		} else {
			scaleMotion.spring(1, springs.gentle);
		}
	}, [isPressed, isHovered, scaleMotion]);

	/** Figma slots have ~10-12px radius. */
	const cornerRadius = rem(10, "pixel");

	// Depth offset: static shadow always visible
	const depthOffset = rem(4, "pixel");

	return (
		<frame
			key={`slot-${slot.id}`}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Size={new UDim2(0, slotSize, 0, slotSize)}
		>
			{/* OVERLAY: Individual slot depth shadow (MUST be visible like in Figma) */}
			<frame
				BackgroundColor3={Color3.fromRGB(28, 31, 52)}
				BorderSizePixel={0}
				Position={new UDim2(0, 0, 0, depthOffset)}
				Size={new UDim2(1, 0, 1, 0)}
				ZIndex={1}
			>
				<uicorner CornerRadius={new UDim(0, cornerRadius)} />
			</frame>

			{/* Main interactive button with scale animation */}
			<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)} ZIndex={2}>
				<uiscale Scale={scaleBinding} />

				<textbutton
					AutoButtonColor={false}
					BackgroundColor3={Color3.fromRGB(52, 56, 87)}
					BorderSizePixel={0}
					Event={{
						MouseButton1Down: () => {
							setIsPressed(true);
						},
						MouseButton1Up: () => {
							setIsPressed(false);
						},
						MouseEnter: () => {
							setHoveredSlot(slot.id);
						},
						MouseLeave: () => {
							setHoveredSlot(undefined);
							setIsPressed(false);
						},
					}}
					Size={new UDim2(1, 0, 1, 0)}
					Text=""
					ZIndex={2}
				>
					<uicorner CornerRadius={new UDim(0, cornerRadius)} />

					{/* VERY subtle gradient (Figma doesn't have strong gradient) */}
					<uigradient
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, Color3.fromRGB(56, 60, 92)),
								new ColorSequenceKeypoint(1, Color3.fromRGB(50, 54, 84)),
							])
						}
						Rotation={90}
					/>

					{/* Dark stroke matching Figma */}
					<uistroke Color={Color3.fromRGB(35, 38, 62)} Thickness={rem(3, "pixel")} />

					{/* NO INNER HIGHLIGHT - doesn't exist in Figma reference */}

					{/* Slot ID number (top left, subtle) */}
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamBlack}
						Position={new UDim2(0, rem(6, "pixel"), 0, rem(4, "pixel"))}
						Size={new UDim2(0, rem(14, "pixel"), 0, rem(14, "pixel"))}
						Text={`${slot.id}`}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextSize={rem(11, "pixel")}
						TextTransparency={0.5}
						ZIndex={4}
					/>

					{/* Icon (centered, colorful and vibrant) */}
					<textlabel
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundTransparency={1}
						Font={Enum.Font.GothamBold}
						Position={new UDim2(0.5, 0, 0.5, rem(2, "pixel"))}
						Size={new UDim2(0, rem(36, "pixel"), 0, rem(36, "pixel"))}
						Text={slot.icon}
						TextColor3={hudTheme.colors.white}
						TextSize={rem(30, "pixel")}
						ZIndex={4}
					/>

					{/* Quantity badge (bottom right INSIDE, matching Figma) */}
					{slot.quantity !== undefined ? (
						<textlabel
							AnchorPoint={new Vector2(1, 1)}
							BackgroundColor3={Color3.fromRGB(45, 48, 75)}
							BorderSizePixel={0}
							Font={Enum.Font.GothamBlack}
							Position={new UDim2(1, -rem(5, "pixel"), 1, -rem(5, "pixel"))}
							Size={new UDim2(0, rem(26, "pixel"), 0, rem(20, "pixel"))}
							Text={`${slot.quantity}`}
							TextColor3={Color3.fromRGB(220, 220, 230)}
							TextSize={rem(12, "pixel")}
							ZIndex={5}
						>
							<uicorner CornerRadius={new UDim(0, rem(6, "pixel"))} />
							<uistroke
								Color={Color3.fromRGB(65, 70, 100)}
								Thickness={rem(2, "pixel")}
							/>
						</textlabel>
					) : undefined}

					{/* Notification dot (LARGE, positioned OUTSIDE/above like Figma) */}
					{slot.hasNotification === true ? (
						<frame
							AnchorPoint={new Vector2(1, 0)}
							BackgroundColor3={
								slot.notificationColor ?? Color3.fromRGB(66, 180, 244)
							}
							BorderSizePixel={0}
							Position={new UDim2(1, rem(5, "pixel"), 0, -rem(5, "pixel"))}
							Size={new UDim2(0, rem(14, "pixel"), 0, rem(14, "pixel"))}
							ZIndex={5}
						>
							<uicorner CornerRadius={new UDim(1, 0)} />
							<uistroke
								Color={Color3.fromRGB(255, 255, 255)}
								Thickness={rem(3, "pixel")}
								Transparency={0.15}
							/>
						</frame>
					) : undefined}
				</textbutton>
			</frame>

			{/* OVERLAY: Selected outline (THICK yellow, positioned OUTSIDE like Figma) */}
			{isSelected ? (
				<frame
					BackgroundTransparency={1}
					BorderSizePixel={0}
					Position={new UDim2(0, -rem(4, "pixel"), 0, -rem(4, "pixel"))}
					Size={new UDim2(1, rem(8, "pixel"), 1, rem(8, "pixel"))}
					ZIndex={6}
				>
					<uicorner CornerRadius={new UDim(0, cornerRadius + rem(4, "pixel"))} />
					<uistroke
						Color={Color3.fromRGB(255, 215, 0)}
						Thickness={rem(6, "pixel")}
						Transparency={0}
					/>

					{/* Outer glow for extra prominence */}
					<frame
						BackgroundTransparency={1}
						BorderSizePixel={0}
						Position={new UDim2(0, -rem(2, "pixel"), 0, -rem(2, "pixel"))}
						Size={new UDim2(1, rem(4, "pixel"), 1, rem(4, "pixel"))}
						ZIndex={5}
					>
						<uicorner CornerRadius={new UDim(0, cornerRadius + rem(6, "pixel"))} />
						<uistroke
							Color={Color3.fromRGB(255, 215, 0)}
							Thickness={rem(4, "pixel")}
							Transparency={0.5}
						/>
					</frame>
				</frame>
			) : undefined}
		</frame>
	);
}

export function BottomHud({
	inventory,
	layout,
	onPurchase,
}: Readonly<BottomHudProps>): React.Element {
	const rem = useRem();
	const [hoveredSlot, setHoveredSlot] = useState<number | undefined>(undefined);

	const { isPhone } = layout;
	const { isUltraCompact } = layout;

	// --- Tunables (match Figma feeling) ---
	const bottomInset = rem(isPhone ? 16 : 22, "pixel");
	const stackGap = rem(isPhone ? 10 : 12, "pixel");

	// Hotbar sizing
	const slotSize = rem(isPhone ? 50 : 56, "pixel");
	const hotbarH = rem(isPhone ? 72 : 78, "pixel");
	const hotbarW = rem(isPhone ? 390 : 456, "pixel");
	const hotbarMaxW = rem(isPhone ? 430 : 500, "pixel");
	const hotbarMinW = rem(isPhone ? 320 : 410, "pixel");

	// Tooltip above hotbar
	const tooltipH = rem(18, "pixel");
	const tooltipGap = rem(8, "pixel");
	const tooltipW = rem(isUltraCompact ? 180 : 220, "pixel");

	// Purchase sizing (centered above hotbar)
	const purchaseW = rem(isPhone ? 212 : 276, "pixel");
	const purchaseH = rem(isPhone ? 84 : 92, "pixel");

	// Container total height so parent layout doesn't "jump"
	const containerH = useMemo(() => {
		const hotbarBlock = hotbarH + tooltipGap + tooltipH;
		return bottomInset + hotbarBlock + stackGap + purchaseH;
	}, [hotbarH, tooltipGap, tooltipH, stackGap, purchaseH, bottomInset]);

	return (
		<Frame
			Native={{
				AnchorPoint: new Vector2(0.5, 1),
				BackgroundTransparency: 1,
				Position: new UDim2(0.5, 0, 1, -bottomInset),
				Size: new UDim2(1, 0, 0, containerH),
				ZIndex: hudTheme.layers.bottom,
			}}
		>
			<uilistlayout
				FillDirection={Enum.FillDirection.Vertical}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={new UDim(0, stackGap)}
				VerticalAlignment={Enum.VerticalAlignment.Bottom}
			/>

			{/* Purchase (TOP in the stack, sits ABOVE hotbar) */}
			<frame BackgroundTransparency={1} Size={new UDim2(0, purchaseW, 0, purchaseH)}>
				<ActionButton
					icon="🛒"
					label="Purchase"
					size={new UDim2(1, 0, 1, 0)}
					subtitle="Ion Battery · $150"
					zIndex={hudTheme.layers.bottom}
					onClick={onPurchase}
				/>
			</frame>

			{/* Hotbar block (tooltip + panel) */}
			<frame
				BackgroundTransparency={1}
				Size={new UDim2(0, hotbarW, 0, hotbarH + tooltipGap + tooltipH)}
			>
				{/* Tooltip */}
				<TextLabel
					CornerRadius={new UDim(0, rem(6, "pixel"))}
					Native={{
						AnchorPoint: new Vector2(0.5, 0),
						BackgroundColor3: hudTheme.colors.strokeBottom,
						BackgroundTransparency: hoveredSlot !== undefined ? 0.08 : 1,
						BorderSizePixel: 0,
						Position: new UDim2(0.5, 0, 0, 0),
						Size: new UDim2(0, tooltipW, 0, tooltipH),
					}}
					Text={
						hoveredSlot !== undefined
							? (inventory.find((slot) => slot.id === hoveredSlot)?.name ?? "")
							: ""
					}
					TextColor={Color3.fromRGB(66, 180, 244)}
					TextSize={rem(10, "pixel")}
				>
					<uistroke
						Color={Color3.fromRGB(66, 180, 244)}
						Thickness={rem(1, "pixel")}
						Transparency={0.5}
					/>
				</TextLabel>

				{/* Hotbar Panel */}
				<Panel
					position={new UDim2(0, 0, 0, tooltipH + tooltipGap)}
					size={new UDim2(0, hotbarW, 0, hotbarH)}
					zIndex={hudTheme.layers.bottom}
				>
					<uisizeconstraint
						MaxSize={new Vector2(hotbarMaxW, rem(90, "pixel"))}
						MinSize={new Vector2(hotbarMinW, rem(72, "pixel"))}
					/>
					<uipadding
						PaddingLeft={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
						PaddingRight={new UDim(0, rem(hudTheme.tokens.pad3, "pixel"))}
						PaddingTop={new UDim(0, rem(hudTheme.tokens.pad2, "pixel"))}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						Padding={new UDim(0, rem(hudTheme.tokens.gap2, "pixel"))}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>

					{inventory.map((slot) => {
						const isSelected = slot.id === 2;

						return (
							<HotbarSlot
								key={`slot-${slot.id}`}
								hoveredSlot={hoveredSlot}
								isSelected={isSelected}
								rem={rem}
								setHoveredSlot={setHoveredSlot}
								slot={slot}
								slotSize={slotSize}
							/>
						);
					})}
				</Panel>
			</frame>
		</Frame>
	);
}
